import { NextRequest, NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/lead-notify";
import { getIntegrationSettings } from "@/lib/integration-settings";

// Called by the admin panel's "Send test email" button. Protected by the shared CRON_SECRET.
export async function POST(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.get("x-cron-secret") !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Always test with the latest saved values, not the 60 second cache
    const cfg = await getIntegrationSettings({ fresh: true });
    const error = await sendTestEmail(cfg.leadNotifyTo);
    if (error) return NextResponse.json({ ok: false, error }, { status: 200 });
    return NextResponse.json({ ok: true, sentTo: cfg.leadNotifyTo });
}
