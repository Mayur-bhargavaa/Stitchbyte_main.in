import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization — enabled for automatic WebP/AVIF serving
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // 301 redirects — fix Google Search Console 404 errors
  async redirects() {
    return [
      // /faq → homepage (FAQ section is on homepage)
      {
        source: "/faq",
        destination: "/#faq",
        permanent: true,
      },
      // /product-workflow → homepage "How We Work" section
      {
        source: "/product-workflow",
        destination: "/#how-we-work",
        permanent: true,
      },
      // /case-studies → /work
      {
        source: "/case-studies",
        destination: "/work",
        permanent: true,
      },
      // /product/?id=mastering-crm-guide → /blog
      {
        source: "/product",
        has: [{ type: "query", key: "id", value: "mastering-crm-guide" }],
        destination: "/blog",
        permanent: true,
      },
      // /product/?id=navigating-crm-excellence → /blog
      {
        source: "/product",
        has: [{ type: "query", key: "id", value: "navigating-crm-excellence" }],
        destination: "/blog",
        permanent: true,
      },
      // /product → /prebuilt (generic catch-all for /product)
      {
        source: "/product",
        destination: "/prebuilt",
        permanent: true,
      },
      // /services → /customized
      {
        source: "/services",
        destination: "/customized",
        permanent: true,
      },
      // /cookie-policy → /privacy
      {
        source: "/cookie-policy",
        destination: "/privacy",
        permanent: true,
      },
      // /projects → /work
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      // /support → /contact
      {
        source: "/support",
        destination: "/contact",
        permanent: true,
      },
    ];
  },

  // Security headers for better SEO and security score
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

