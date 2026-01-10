import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Base path - app will be accessible at demo.stitchbyte.in/restaurant
  basePath: "/restaurant",
  
  // Ensure assets are also served from the base path
  assetPrefix: "/restaurant",
  
  // Image optimization
  images: {
    unoptimized: true, // For static export compatibility
  },
};

export default nextConfig;
