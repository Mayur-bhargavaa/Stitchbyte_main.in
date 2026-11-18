import { NextResponse } from "next/server";
import { getIntegrationSettings } from "@/lib/integration-settings";

// Public on purpose: the Meta Pixel ID and the booking link are visible on the site anyway. Nothing secret here.
export async function GET() {
    const { metaPixelId, strategyCallUrl } = await getIntegrationSettings();
    return NextResponse.json(
        { pixelId: metaPixelId || null, strategyCallUrl: strategyCallUrl || null },
        { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } }
    );
}
