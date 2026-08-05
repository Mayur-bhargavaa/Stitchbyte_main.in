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
      instagramReelUrl: settings?.instagramReelUrl || "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
      spotlightVideoUrl: settings?.spotlightVideoUrl || "",
      mediaType: settings?.mediaType || "instagram",
      spotlightVideoUrls: settings?.spotlightVideoUrls || [],
    });
  } catch (error) {
    console.error("Error fetching site content review images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch review images" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.instagramReelUrl || typeof body.instagramReelUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "instagramReelUrl is required as a string" },
        { status: 400 }
      );
    }

    const reelUrl = body.instagramReelUrl.trim();

    const updateFields: any = {
      instagramReelUrl: reelUrl,
      mediaType: "instagram",
      updatedAt: new Date()
    };

    const updateResult = await SiteContentSettings.updateOne(
      { key: "homepage" },
      {
        $set: updateFields,
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Featured Reel URL updated successfully via open API push",
      instagramReelUrl: reelUrl,
      result: updateResult
    });
  } catch (error: any) {
    console.error("Error pushing featured reel url:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update featured reel url" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
