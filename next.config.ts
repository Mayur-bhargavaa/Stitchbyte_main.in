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
      // Old pSEO path redirects to flat URLs
      {
        source: "/services/seo-company-in-:city",
        destination: "/seo-company-:city",
        permanent: true,
      },
      {
        source: "/services/digital-marketing-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/website-development-in-:city",
        destination: "/website-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/shopify-development-in-:city",
        destination: "/shopify-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/wordpress-development-in-:city",
        destination: "/wordpress-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/ai-automation-in-:city",
        destination: "/ai-automation-company-:city",
        permanent: true,
      },
      {
        source: "/services/social-media-agency-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/google-ads-agency-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/meta-ads-agency-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/ui-ux-design-in-:city",
        destination: "/ui-ux-design-company-:city",
        permanent: true,
      },
      {
        source: "/services/mobile-app-development-in-:city",
        destination: "/mobile-app-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/ecommerce-development-in-:city",
        destination: "/shopify-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/branding-agency-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/lead-generation-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      {
        source: "/services/react-development-in-:city",
        destination: "/react-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/mern-stack-development-in-:city",
        destination: "/mern-stack-development-:city",
        permanent: true,
      },
      {
        source: "/services/custom-software-in-:city",
        destination: "/custom-software-:city",
        permanent: true,
      },
      {
        source: "/services/nextjs-development-in-:city",
        destination: "/react-development-company-:city",
        permanent: true,
      },
      {
        source: "/services/node-development-in-:city",
        destination: "/custom-software-:city",
        permanent: true,
      },
      {
        source: "/services/performance-marketing-in-:city",
        destination: "/digital-marketing-agency-:city",
        permanent: true,
      },
      // Catch-all fallback for any unmapped /services/ path
      {
        source: "/services/:path*",
        destination: "/customized",
        permanent: true,
      },
      // Catch-all fallback for /product/:path*
      {
        source: "/product/:path*",
        destination: "/prebuilt",
        permanent: true,
      },
      // Catch-all fallback for /projects/:path* and /case-studies/:path*
      {
        source: "/projects/:path*",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/work",
        permanent: true,
      },
      // Catch-all fallback for legacy blog path aliases
      {
        source: "/blog-posts/:path*",
        destination: "/blog",
        permanent: true,
      },
      // Common legacy aliases
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/refunds",
        destination: "/refund-policy",
        permanent: true,
      },
      // /cookie-policy → /privacy
      {
        source: "/cookie-policy",
        destination: "/privacy",
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

