import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { auth } from "@/lib/auth";
import { notifyNewLead } from "@/lib/lead-notify";
import { scoreLead } from "@/lib/lead-score";
import { sendCapiEvent, buildFbc } from "@/lib/meta-capi";

const BUDGETS = ["Under ₹25k", "₹25k–₹50k", "₹50k–₹1L", "₹1L–₹3L", "₹3L+"] as const;

const EnquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(5, "Phone number is too short").max(20),
  email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  brand: z.string().trim().max(100).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  productId: z.string().trim().max(100).optional().nullable(),
  productName: z.string().trim().max(100).optional().nullable(),
  // Qualification fields (all optional so existing forms keep working)
  budget: z.enum(BUDGETS).optional().nullable(),
  timeline: z.string().trim().max(60).optional().nullable(),
  businessType: z.string().trim().max(100).optional().nullable(),
  website: z.string().trim().max(200).optional().nullable(),
  location: z.string().trim().max(100).optional().nullable(),
  isDecisionMaker: z.boolean().optional().nullable(),
  // Meta dedup id + whether the visitor accepted marketing cookies
  eventId: z.string().trim().max(100).optional().nullable(),
  marketingConsent: z.boolean().optional().nullable(),
  tracking: z.object({
    utmSource: z.string().trim().max(100).optional().nullable(),
    utmMedium: z.string().trim().max(100).optional().nullable(),
    utmCampaign: z.string().trim().max(100).optional().nullable(),
    utmTerm: z.string().trim().max(100).optional().nullable(),
    utmContent: z.string().trim().max(100).optional().nullable(),
    referrer: z.string().trim().max(500).optional().nullable(),
    fbclid: z.string().trim().max(200).optional().nullable(),
    fbclidAt: z.number().int().positive().optional().nullable(),
    landingPage: z.string().trim().max(500).optional().nullable(),
  }).optional().nullable(),
});

export async function POST(request: NextRequest) {
    try {
        // Rate Limiting: max 5 requests per minute per IP
        const ip = getClientIp(request);
        const rateLimitResult = checkRateLimit(ip, 5, 60000);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again in a minute." },
                { status: 429 }
            );
        }

        const body = await request.json();
        
        // Zod validation
        const validation = EnquirySchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const {
            name, phone, email, brand, message, productId, productName, tracking,
            budget, timeline, businessType, website, location, isDecisionMaker,
            eventId, marketingConsent,
        } = validation.data;
        const isNewsletter = productName === "Newsletter Subscription";
        const scored = scoreLead({
            budget, timeline, isDecisionMaker, website, businessType, brand, email, phone, message,
            productName, utmSource: tracking?.utmSource,
        });

        // Connect to MongoDB
        const { db } = await connectToDatabase();
        const collection = db.collection("product_enquiries");

        // Create enquiry document
        const enquiry = {
            name,
            phone,
            email: email || null,
            brand: brand || null,
            message: message || null,
            productId: productId || null,
            productName: productName || null,
            utmSource: tracking?.utmSource || null,
            utmMedium: tracking?.utmMedium || null,
            utmCampaign: tracking?.utmCampaign || null,
            utmTerm: tracking?.utmTerm || null,
            utmContent: tracking?.utmContent || null,
            referrer: tracking?.referrer || null,
            landingPage: tracking?.landingPage || null,
            budget: budget || null,
            timeline: timeline || null,
            businessType: businessType || null,
            website: website || null,
            location: location || null,
            isDecisionMaker: isDecisionMaker ?? null,
            leadType: isNewsletter ? "newsletter" : "enquiry",
            leadScore: isNewsletter ? null : scored.score,
            leadGrade: isNewsletter ? null : scored.grade,
            leadScoreReasons: isNewsletter ? [] : scored.reasons,
            priority: scored.grade === "hot" ? "high" : "normal",
            // Needed later: CRM-stage events are only sent to Meta for leads who accepted marketing cookies
            marketingConsent: marketingConsent === true,
            fbp: request.cookies.get("_fbp")?.value || null,
            fbclid: tracking?.fbclid || null,
            // Prefer the browser cookie; otherwise build it from the ad click id captured on the landing page
            fbc: request.cookies.get("_fbc")?.value || buildFbc(tracking?.fbclid, tracking?.fbclidAt),
            // Pipeline: new → contacted → qualified → meeting_booked → proposal_sent → negotiation → won | lost
            status: "new",
            statusHistory: [{ status: "new", at: new Date() }],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert into database
        const result = await collection.insertOne(enquiry);

        // Notify + Meta CAPI after the lead is safely stored. Failures are logged, never surfaced.
        if (!isNewsletter) {
            const leadId = String(result.insertedId);
            const referer = request.headers.get("referer");
            const task = (async () => {
                const sent = await notifyNewLead({
                    id: leadId, name, phone, email, brand, message, productName,
                    budget, timeline, businessType, website, location, isDecisionMaker,
                    utmSource: tracking?.utmSource, utmCampaign: tracking?.utmCampaign,
                    landingPage: tracking?.landingPage,
                    priority: scored.grade === "hot" ? "high" : "normal",
                    score: scored.score,
                    grade: scored.grade,
                });
                await collection.updateOne(
                    { _id: result.insertedId },
                    { $set: { notifiedInternalAt: sent.internal ? new Date() : null, confirmationSentAt: sent.confirmation ? new Date() : null } }
                );
                if (marketingConsent && eventId) {
                    await sendCapiEvent({
                        eventName: "Lead", eventId, sourceUrl: referer || tracking?.landingPage,
                        email, phone, name, ip,
                        userAgent: request.headers.get("user-agent"),
                        fbp: enquiry.fbp, fbc: enquiry.fbc,
                    });
                }
            })().catch((e) => console.error("[enquiry] post-save tasks failed", e));
            // Long-running Node server (VPS): fire-and-forget keeps the response fast.
            void task;
        }

        return NextResponse.json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiryId: result.insertedId
        });

    } catch (error) {
        console.error("Error saving enquiry:", error);
        return NextResponse.json(
            { error: "Failed to submit enquiry. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Authenticate the request
        const session = await auth();
        const user = session?.user as any;
        if (!user || !["ADMIN", "MERCHANT"].includes(user.role)) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const { db } = await connectToDatabase();
        const collection = db.collection("product_enquiries");

        const enquiries = await collection
            .find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .toArray();

        return NextResponse.json({ enquiries });

    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return NextResponse.json(
            { error: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}
