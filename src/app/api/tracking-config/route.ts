import { NextResponse } from "next/server";
import { getIntegrationSettings } from "@/lib/integration-settings";

// Public on purpose: the Meta Pixel ID is visible in page source anyway. Nothing secret here.
export async function GET() {
    const { metaPixelId } = await getIntegrationSettings();
    return NextResponse.json(
        { pixelId: metaPixelId || null },
        { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } }
    );
}
