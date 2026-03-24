import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MarketingCaseStudy from "@/models/MarketingCaseStudy";

export async function GET() {
  try {
    await connectDB();

    const studies = await MarketingCaseStudy.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, studies });
  } catch (error) {
    console.error("Error fetching marketing case studies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch marketing case studies" },
      { status: 500 }
    );
  }
}
