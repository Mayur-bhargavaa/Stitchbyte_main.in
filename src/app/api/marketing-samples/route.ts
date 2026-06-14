import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MarketingSample from "@/models/MarketingSample";

const initialSamples = [
  {
    id: "sample-beauty",
    type: "image",
    src: "/marketing/samples/sample-2.png",
    title: "Organic Leaf Eco Cosmetics Packaging Design",
    category: "Beauty",
    ratioClass: "aspect-[4/5]",
    aspectRatio: "4/5",
    isActive: true,
    order: 1
  },
  {
    id: "sample-clothing",
    type: "image",
    src: "/marketing/samples/clothing_brand.png",
    title: "Minimalist Linen Clothing Apparel Rack Showcase",
    category: "Clothing brand",
    ratioClass: "aspect-[3/4]",
    aspectRatio: "3/4",
    isActive: true,
    order: 2
  },
  {
    id: "sample-event",
    type: "image",
    src: "/marketing/samples/event_management.png",
    title: "Grand Banquet Wedding Hall Table Setting Design",
    category: "Event management",
    ratioClass: "aspect-[16/9]",
    aspectRatio: "16/9",
    isActive: true,
    order: 3
  },
  {
    id: "sample-food",
    type: "image",
    src: "/marketing/samples/food_restro.png",
    title: "Gourmet Woodfired Italian Pizza Platter Design",
    category: "food and restro",
    ratioClass: "aspect-[4/3]",
    aspectRatio: "4/3",
    isActive: true,
    order: 4
  },
  {
    id: "sample-gym",
    type: "image",
    src: "/marketing/samples/gym.png",
    title: "Premium Boutique Gym Interior & Weight Rack Design",
    category: "GYM",
    ratioClass: "aspect-[3/4]",
    aspectRatio: "3/4",
    isActive: true,
    order: 5
  },
  {
    id: "sample-interior",
    type: "image",
    src: "/marketing/samples/sample-3.png",
    title: "Aethel Architect Portfolio & Stationery Mockup",
    category: "interior design",
    ratioClass: "aspect-square",
    aspectRatio: "1/1",
    isActive: true,
    order: 6
  },
  {
    id: "sample-luxury-clothing",
    type: "image",
    src: "/marketing/samples/sample-6.png",
    title: "Creative Agency Typographic Neon Art Banner",
    category: "luxury clothing",
    ratioClass: "aspect-[3/4]",
    aspectRatio: "3/4",
    isActive: true,
    order: 7
  },
  {
    id: "sample-jewellery",
    type: "image",
    src: "/marketing/samples/sample-4.png",
    title: "Aurum Luxury Chronograph Watch Advertisement",
    category: "luxury jwellery",
    ratioClass: "aspect-[3/4]",
    aspectRatio: "3/4",
    isActive: true,
    order: 8
  },
  {
    id: "sample-perfume",
    type: "image",
    src: "/marketing/samples/perfume.png",
    title: "Oceane Luxe Splash Perfume Glass Mockup",
    category: "Perfume brands",
    ratioClass: "aspect-[3/4]",
    aspectRatio: "3/4",
    isActive: true,
    order: 9
  },
  {
    id: "sample-real-estate",
    type: "image",
    src: "/marketing/samples/real_estate.png",
    title: "Modern Architectural Villa Infinity Pool Facade",
    category: "real estate",
    ratioClass: "aspect-[4/5]",
    aspectRatio: "4/5",
    isActive: true,
    order: 10
  },
  {
    id: "video-reels-1",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4",
    title: "StitchByte Neon Kinetic Light Wave Reel Loop",
    category: "REELS",
    ratioClass: "aspect-[9/16]",
    aspectRatio: "9/16",
    isActive: true,
    order: 11
  },
  {
    id: "video-reels-2",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-particles-floating-in-a-dark-background-loop-41852-large.mp4",
    title: "Floating Ambient Particle System Cinematic Reel",
    category: "REELS",
    ratioClass: "aspect-[4/3]",
    aspectRatio: "4/3",
    isActive: true,
    order: 12
  }
];

export async function GET() {
  try {
    await connectDB();

    const samples = await MarketingSample.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, samples });
  } catch (error) {
    console.error("Error fetching marketing samples:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch marketing samples" },
      { status: 500 }
    );
  }
}
