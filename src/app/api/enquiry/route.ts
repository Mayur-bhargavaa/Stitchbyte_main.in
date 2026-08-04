import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { auth } from "@/lib/auth";

const EnquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(5, "Phone number is too short").max(20),
  email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  brand: z.string().trim().max(100).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  productId: z.string().trim().max(100).optional().nullable(),
  productName: z.string().trim().max(100).optional().nullable(),
  tracking: z.object({
    utmSource: z.string().trim().max(100).optional().nullable(),
    utmMedium: z.string().trim().max(100).optional().nullable(),
    utmCampaign: z.string().trim().max(100).optional().nullable(),
    utmTerm: z.string().trim().max(100).optional().nullable(),
    utmContent: z.string().trim().max(100).optional().nullable(),
    referrer: z.string().trim().max(500).optional().nullable(),
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

        const { name, phone, email, brand, message, productId, productName, tracking } = validation.data;

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
            status: "new",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert into database
        const result = await collection.insertOne(enquiry);

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
