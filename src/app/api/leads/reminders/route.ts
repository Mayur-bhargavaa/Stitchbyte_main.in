import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendNoResponseReminder, sendLeadFollowUp } from "@/lib/lead-notify";
import { getIntegrationSettings } from "@/lib/integration-settings";

// Called by a cron job on the server every few minutes. Crontab line:
//   every 5 minutes: curl -s -H "x-cron-secret: $CRON_SECRET" https://stitchbyte.in/api/leads/reminders
// Emails sales once for each lead still "new" after REMINDER_AFTER_MINUTES (default 5).
export async function GET(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.get("x-cron-secret") !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cfg = await getIntegrationSettings();
    const after = cfg.reminderAfterMinutes;
    const cutoff = new Date(Date.now() - after * 60_000);
    // Ignore very old leads so a first run does not spam about historical backlog
    const oldest = new Date(Date.now() - 24 * 60 * 60_000);

    const { db } = await connectToDatabase();
    const col = db.collection("product_enquiries");
    const due = await col
        .find({
            status: { $in: ["new", "Pending"] },
            leadType: "enquiry",
            reminderSentAt: { $exists: false },
            createdAt: { $lte: cutoff, $gte: oldest },
        })
        .limit(50)
        .toArray();

    let remindedCount = 0;
    let emailSent = false;
    if (cfg.remindersEnabled && due.length > 0) {
    const sent = await sendNoResponseReminder(
        due.map((l) => ({
            id: String(l._id),
            name: l.name,
            phone: l.phone,
            productName: l.productName,
            grade: l.leadGrade,
            minutes: Math.round((Date.now() - new Date(l.createdAt).getTime()) / 60_000),
        }))
    );

    if (sent) {
        await col.updateMany({ _id: { $in: due.map((l) => l._id) } }, { $set: { reminderSentAt: new Date() } });
    }
    remindedCount = sent ? due.length : 0;
    emailSent = sent;
    }

    // Follow-up emails to leads who have not progressed past "contacted".
    // Step 1 after ~24h, step 2 after ~72h; each at most once; skipped if they opted out or have no email.
    const followed = { step1: 0, step2: 0 };
    const recent = new Date(Date.now() - 7 * 24 * 60 * 60_000);
    for (const [step, hours, field] of (cfg.followUpsEnabled ? [
        [1, 24, "followUp1SentAt"],
        [2, 72, "followUp2SentAt"],
    ] : []) as ReadonlyArray<readonly [1 | 2, number, "followUp1SentAt" | "followUp2SentAt"]>) {
        const candidates = await col
            .find({
                leadType: "enquiry",
                status: { $in: ["new", "Pending", "contacted", "Contacted"] },
                email: { $nin: [null, ""] },
                followUpOptOut: { $ne: true },
                [field]: { $exists: false },
                createdAt: { $lte: new Date(Date.now() - hours * 60 * 60_000), $gte: recent },
            })
            .limit(20)
            .toArray();
        for (const l of candidates) {
            const ok = await sendLeadFollowUp({ name: l.name, email: l.email, productName: l.productName }, step);
            if (ok) {
                await col.updateOne({ _id: l._id }, { $set: { [field]: new Date() } });
                if (step === 1) followed.step1++; else followed.step2++;
            }
        }
    }

    return NextResponse.json({ reminded: remindedCount, emailSent, followUps: followed });
}
