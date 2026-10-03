import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteContentSettings from "@/models/SiteContentSettings";
import { defaultSpotlightReels } from "@/lib/reels-data";

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteContentSettings.findOne({ key: "homepage" }).lean();
    
    const dbVideoUrls: string[] = Array.isArray(settings?.spotlightVideoUrls) && settings.spotlightVideoUrls.length > 0
      ? settings.spotlightVideoUrls.filter((u: any) => typeof u === "string" && u.trim().length > 0 && !u.includes("instagram.com"))
      : [];

    const dbSingleVideo = typeof settings?.spotlightVideoUrl === "string" && !settings.spotlightVideoUrl.includes("instagram.com")
      ? settings.spotlightVideoUrl.trim()
      : "";

    const rawReels = Array.isArray(settings?.spotlightReels) && settings.spotlightReels.length > 0
      ? settings.spotlightReels
      : defaultSpotlightReels;

    const dbReels = rawReels.map((reel: any, idx: number) => {
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
      reels: dbReels,
    });
  } catch (error: any) {
    console.error("Error fetching spotlight reels:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch reels" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if bulk update
    if (Array.isArray(body.reels)) {
      await SiteContentSettings.updateOne(
        { key: "homepage" },
        {
          $set: {
            spotlightReels: body.reels,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: "Spotlight reels updated successfully",
        reels: body.reels,
      });
    }

    // Single item add/update
    const newReel = {
      id: body.id || `reel-${Date.now()}`,
      title: (body.title || "").trim(),
      category: (body.category || "Culture").trim(),
      duration: (body.duration || "0:30").trim(),
      thumbnailUrl: (body.thumbnailUrl || "").trim(),
      videoUrl: (body.videoUrl || "").trim(),
      reelUrl: (body.reelUrl || "").trim(),
      isActive: body.isActive !== false,
      order: Number(body.order) || 0,
    };

    const settings = await SiteContentSettings.findOne({ key: "homepage" });
    const currentReels = Array.isArray(settings?.spotlightReels) && settings.spotlightReels.length > 0
      ? settings.spotlightReels
      : [...defaultSpotlightReels];

    const existingIndex = currentReels.findIndex((r: any) => r.id === newReel.id);
    if (existingIndex >= 0) {
      currentReels[existingIndex] = newReel;
    } else {
      currentReels.push(newReel);
    }

    await SiteContentSettings.updateOne(
      { key: "homepage" },
      {
        $set: {
          spotlightReels: currentReels,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Reel saved successfully",
      reel: newReel,
      reels: currentReels,
    });
  } catch (error: any) {
    console.error("Error saving spotlight reel:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save reel" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing reel id" }, { status: 400 });
    }

    const settings = await SiteContentSettings.findOne({ key: "homepage" });
    const currentReels = Array.isArray(settings?.spotlightReels) ? settings.spotlightReels : [];
    const filtered = currentReels.filter((r: any) => r.id !== id);

    await SiteContentSettings.updateOne(
      { key: "homepage" },
      {
        $set: {
          spotlightReels: filtered,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Reel deleted successfully",
      reels: filtered,
    });
  } catch (error: any) {
    console.error("Error deleting spotlight reel:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete reel" },
      { status: 500 }
    );
  }
}
