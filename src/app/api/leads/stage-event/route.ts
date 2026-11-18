import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { sendCapiEvent } from "@/lib/meta-capi";

// Called by the admin panel when a lead moves to a new pipeline stage.
// Sends the matching event to Meta (offline conversion) so campaigns can optimise
// for qualified leads, meetings and sales, not only form fills.
// Stages that map to an event: qualified, meeting_booked, won.
const STAGE_EVENTS = {
    qualified: "QualifiedLead",
    meeting_booked: "Schedule",
    won: "Purchase",
} as const;

export async function POST(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.get("x-cron-secret") !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { id?: string; status?: string; dealValue?: number | null };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const { id, status } = body;
    const eventName = status ? STAGE_EVENTS[status as keyof typeof STAGE_EVENTS] : undefined;
    if (!id || !ObjectId.isValid(id) || !eventName) {
        return NextResponse.json({ sent: false, reason: "no event for this stage" });
    }

    const { db } = await connectToDatabase();
    const col = db.collection("product_enquiries");
    const lead = await col.findOne({ _id: new ObjectId(id) });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Respect consent, and send each stage at most once per lead
    if (lead.marketingConsent !== true) return NextResponse.json({ sent: false, reason: "no marketing consent" });
    if (lead.capiStageSent?.[status as string]) return NextResponse.json({ sent: false, reason: "already sent" });

    const value = Number(body.dealValue ?? lead.dealValue);
    await sendCapiEvent({
        eventName,
        eventId: `${id}-${status}`,
        actionSource: "system_generated",
        email: lead.email,
        phone: lead.phone,
        name: lead.name,
        fbp: lead.fbp,
        fbc: lead.fbc,
        // event_source / lead_event_source mark these as CRM stage updates (Meta's "Conversions API for CRM" format)
        customData: {
            event_source: "crm",
            lead_event_source: "Stitchbyte CRM",
            ...(eventName === "Purchase" && Number.isFinite(value) && value > 0
                ? { value, currency: "INR" }
                : { lead_stage: status }),
        },
    });

    await col.updateOne({ _id: lead._id }, { $set: { [`capiStageSent.${status}`]: new Date() } });
    return NextResponse.json({ sent: true, event: eventName });
}
