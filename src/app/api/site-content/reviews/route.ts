// StitchByte Site Content Reviews API Endpoint
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteContentSettings from "@/models/SiteContentSettings";
import { defaultSpotlightReels } from "@/lib/reels-data";

export async function GET() {
  try {
    await connectDB();

    const settings = await SiteContentSettings.findOne({ key: "homepage" }).lean();
    const mappedDbReviews = Array.isArray(settings?.reviewCards) && settings.reviewCards.length > 0
      ? settings.reviewCards
          .map((item: any) => ({
            name: typeof item?.name === "string" ? item.name.trim() : "",
            role: typeof item?.role === "string" ? item.role.trim() : "",
            reviewTitle: typeof item?.reviewTitle === "string" ? item.reviewTitle.trim() : "",
            reviewText: typeof item?.reviewText === "string" ? item.reviewText.trim() : "",
            rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
            avatarUrl: typeof item?.avatarUrl === "string" ? item.avatarUrl.trim() : "",
            serviceType: typeof item?.serviceType === "string" ? item.serviceType.trim() : "",
            projectMonth: typeof item?.projectMonth === "string" ? item.projectMonth.trim() : "",
            projectYear: typeof item?.projectYear === "string" ? item.projectYear.trim() : "",
            projectSize: typeof item?.projectSize === "string" ? item.projectSize.trim() : "",
            isVerified: typeof item?.isVerified === "boolean" ? item.isVerified : true,
            tags: Array.isArray(item?.tags) ? item.tags.filter((t: any) => typeof t === "string" && t.trim()) : [],
            projectDuration: typeof item?.projectDuration === "string" ? item.projectDuration.trim() : "",
          }))
          .filter((item: any) => item.name && item.reviewText)
      : [];

    const defaultReviews = [
      {
        name: "Ritika Sharma",
        role: "Founder, Basikali",
        reviewTitle: "Amazing website delivery",
        reviewText: "StitchByte delivered an amazing website for our brand. The design, speed and overall experience exceeded our expectations. Highly recommended!",
        rating: 5,
        isVerified: true,
        tags: ["Website Development", "UI/UX Design", "SEO"],
        projectDuration: "Project completed in 2 weeks",
      },
      {
        name: "Aman Khurana",
        role: "Founder, The Urban Kart",
        reviewTitle: "High-quality Shopify store",
        reviewText: "Working with StitchByte was one of the best decisions for our business. They understood our requirements deeply and delivered a high-quality Shopify store with complete brand setup. The team was responsive, professional and delivered on time.",
        rating: 5,
        isVerified: true,
        tags: ["Shopify Development", "Branding", "Performance Marketing"],
        projectDuration: "Project completed in 3 weeks",
      },
      {
        name: "Karan Mehta",
        role: "Director, Shivam Garden",
        reviewTitle: "End-to-end digital growth",
        reviewText: "Great experience with StitchByte! They handled our social media, ad campaigns and website development end-to-end. We saw a significant growth in leads within the first month itself.",
        rating: 5,
        isVerified: true,
        tags: ["Social Media Management", "Meta Ads", "Website"],
        projectDuration: "Project completed in 1 month",
      },
      {
        name: "Rohit Sharma",
        role: "CEO, TechNova Solutions",
        reviewTitle: "Exceptional UI/UX and code quality",
        reviewText: "The team at StitchByte transformed our SaaS platform with top-notch design and lightning-fast web performance. Incredible attention to detail!",
        rating: 5,
        isVerified: true,
        tags: ["Full Stack Dev", "Next.js", "UI/UX Redesign"],
        projectDuration: "Project completed in 4 weeks",
      },
      {
        name: "Sarah Jenkins",
        role: "Operations Head, Aura Living",
        reviewTitle: "Scalable e-commerce infrastructure",
        reviewText: "From discovery to final deployment, communication was crystal clear. Our conversions increased by over 40% after the store redesign.",
        rating: 5,
        isVerified: true,
        tags: ["E-Commerce", "CRO", "Custom Integration"],
        projectDuration: "Project completed in 3 weeks",
      },
    ];

    const reviewCards = mappedDbReviews.length > 0 ? mappedDbReviews : defaultReviews;

    const dbVideoUrls: string[] = Array.isArray(settings?.spotlightVideoUrls) && settings.spotlightVideoUrls.length > 0
      ? settings.spotlightVideoUrls.filter((u: any) => typeof u === "string" && u.trim().length > 0 && !u.includes("instagram.com"))
      : [];

    const dbSingleVideo = typeof settings?.spotlightVideoUrl === "string" && !settings.spotlightVideoUrl.includes("instagram.com")
      ? settings.spotlightVideoUrl.trim()
      : "";

    const rawReels = Array.isArray(settings?.spotlightReels) && settings.spotlightReels.length > 0
      ? settings.spotlightReels
      : defaultSpotlightReels;

    const spotlightReels = rawReels.map((reel: any, idx: number) => {
      let resolvedVideo = "";
      if (typeof reel.videoUrl === "string" && reel.videoUrl.trim().length > 0 && !reel.videoUrl.includes("instagram.com")) {
        resolvedVideo = reel.videoUrl.trim();
      } else if (dbVideoUrls[idx]) {
        resolvedVideo = dbVideoUrls[idx];
      } else if (dbSingleVideo) {
        resolvedVideo = dbSingleVideo;
      } else if (dbVideoUrls[0]) {
        resolvedVideo = dbVideoUrls[0];
      } else {
        resolvedVideo = defaultSpotlightReels[idx % defaultSpotlightReels.length]?.videoUrl || defaultSpotlightReels[0]?.videoUrl || "";
      }

      return {
        ...reel,
        videoUrl: resolvedVideo,
      };
    });

    return NextResponse.json({
      success: true,
      reviewCards,
      reviewImages: settings?.reviewImages || [],
      instagramReelUrl: settings?.instagramReelUrl || "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
      spotlightVideoUrl: dbSingleVideo || (dbVideoUrls[0] || ""),
      mediaType: "uploaded",
      spotlightVideoUrls: dbVideoUrls.length > 0 ? dbVideoUrls : spotlightReels.map((r: any) => r.videoUrl),
      spotlightReels,
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
