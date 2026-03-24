import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MarketingCaseStudy from "@/models/MarketingCaseStudy";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;
    const study = await MarketingCaseStudy.findOne({ slug, isActive: true }).lean();

    if (!study) {
      return NextResponse.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, study });
  } catch (error) {
    console.error("Error fetching marketing case study:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch marketing case study" },
      { status: 500 }
    );
  }
}
