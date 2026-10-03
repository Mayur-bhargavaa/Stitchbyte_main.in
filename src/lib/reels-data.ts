export interface SpotlightReelItem {
  id: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  reelUrl?: string;
  isActive?: boolean;
  order?: number;
}

export const defaultSpotlightReels: SpotlightReelItem[] = [
  {
    id: "reel-1",
    title: "StitchByte dhaba pe yeh sab milega 👨‍🍳🍲",
    category: "Culture",
    duration: "0:15",
    thumbnailUrl: "/reels/reel-culture-dhaba.jpg",
    videoUrl: "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728136/stitchbyte/blogs/g3mhltvai7bjp2qtyg32.mp4",
    reelUrl: "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
    isActive: true,
    order: 0,
  },
  {
    id: "reel-2",
    title: "What we provide at StitchByte",
    category: "Our Process",
    duration: "0:18",
    thumbnailUrl: "/reels/reel-process-services.jpg",
    videoUrl: "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728230/stitchbyte/blogs/sfvcj6wmonfra3tezpr6.mp4",
    reelUrl: "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
    isActive: true,
    order: 1,
  },
  {
    id: "reel-3",
    title: "Chai, Ideas & Real Projects",
    category: "Client Stories",
    duration: "0:15",
    thumbnailUrl: "/reels/reel-chai-tapri.jpg",
    videoUrl: "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728283/stitchbyte/blogs/tx54dycgk1b8iy5jewoj.mp4",
    reelUrl: "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
    isActive: true,
    order: 2,
  },
  {
    id: "reel-4",
    title: "From Ideas to Impact",
    category: "Work Life",
    duration: "0:20",
    thumbnailUrl: "/reels/reel-worklife-code.jpg",
    videoUrl: "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728346/stitchbyte/blogs/f2sksk826vsm1iiyx41n.mp4",
    reelUrl: "https://www.instagram.com/reel/DZW7Qa8RDfc/?igsh=Zno2OWN2Y3E5OHBj",
    isActive: true,
    order: 3,
  },
];
