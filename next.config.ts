import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    unoptimized: true, // For static export compatibility
  },
};

export default nextConfig;
