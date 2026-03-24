import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteContentSettings from "@/models/SiteContentSettings";

export async function GET() {
  try {
    await connectDB();

    const settings = await SiteContentSettings.findOne({ key: "homepage" }).lean();

    return NextResponse.json({
      success: true,
      reviewImages: settings?.reviewImages || [],
    });
  } catch (error) {
    console.error("Error fetching site content review images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch review images" },
      { status: 500 }
    );
  }
}
