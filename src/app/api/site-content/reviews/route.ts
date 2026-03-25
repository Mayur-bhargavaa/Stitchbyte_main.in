import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteContentSettings from "@/models/SiteContentSettings";

export async function GET() {
  try {
    await connectDB();

    const settings = await SiteContentSettings.findOne({ key: "homepage" }).lean();
    const reviewCards = Array.isArray(settings?.reviewCards)
      ? settings.reviewCards
          .map((item: any) => ({
            name: typeof item?.name === "string" ? item.name.trim() : "",
            reviewTitle: typeof item?.reviewTitle === "string" ? item.reviewTitle.trim() : "",
            reviewText: typeof item?.reviewText === "string" ? item.reviewText.trim() : "",
            rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
            avatarUrl: typeof item?.avatarUrl === "string" ? item.avatarUrl.trim() : "",
            serviceType: typeof item?.serviceType === "string" ? item.serviceType.trim() : "",
            projectMonth: typeof item?.projectMonth === "string" ? item.projectMonth.trim() : "",
            projectYear: typeof item?.projectYear === "string" ? item.projectYear.trim() : "",
            projectSize: typeof item?.projectSize === "string" ? item.projectSize.trim() : "",
          }))
          .filter((item: any) => item.name && item.reviewText)
      : [];

    return NextResponse.json({
      success: true,
      reviewCards,
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
