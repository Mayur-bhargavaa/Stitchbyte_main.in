import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotVisibility from "@/components/ChatbotVisibility";
import TrackingProvider from "@/components/TrackingProvider";
import { Suspense } from "react";
import Script from "next/script";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stitchbyte.in"),
  title: {
    default: "Stitchbyte | Custom Software Development & Digital Transformation Agency",
    template: "%s | Stitchbyte",
  },
  description:
    "Stitchbyte is a global technology partner and software development agency. We build high-performance web applications, native mobile apps, cognitive AI solutions, and performance SEO campaigns. Let's Build Something Extraordinary together.",
  keywords: [
    "Stitchbyte",
    "software development agency",
    "web development company",
    "AI development agency",
    "digital transformation partner",
    "e-commerce development agency",
    "Next.js development company",
    "React Native developers",
    "SaaS application development",
    "UI/UX design agency",
    "enterprise software solutions",
    "custom software Dubai",
    "software development USA",
    "web developers India",
    "headless commerce development"
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://stitchbyte.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stitchbyte.in",
    siteName: "Stitchbyte",
    title: "Stitchbyte | Custom Software Development & Digital Transformation Agency",
    description:
      "Stitchbyte is a global technology partner and software development agency. We build high-performance web applications, native mobile apps, cognitive AI solutions, and performance SEO campaigns. Let's Build Something Extraordinary together.",
    images: [
      {
        url: "/logo-stitchbyte.png",
        width: 1200,
        height: 630,
        alt: "Stitchbyte — Custom Software Development & Digital Transformation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitchbyte | Custom Software Development & Digital Transformation Agency",
    description:
      "Stitchbyte is a global technology partner and software development agency. We build high-performance web applications, native mobile apps, cognitive AI solutions, and performance SEO campaigns. Let's Build Something Extraordinary together.",
    images: ["/logo-stitchbyte.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stitchbyte | Custom Software Development & Digital Transformation Agency",
  },
  formatDetection: {
    telephone: true,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.8530;75.8047",
    "ICBM": "26.8530, 75.8047"
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization + WebSite JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://stitchbyte.in/#organization",
    "name": "Stitchbyte",
    "alternateName": ["Stitch", "Stitch Byte", "Stitch Agency", "Stitch Jaipur"],
    "url": "https://stitchbyte.in",
    "logo": "https://stitchbyte.in/logo-stitchbyte.png",
    "slogan": "Let's Build Something Extraordinary together",
    "description": "Stitchbyte is a global custom software development agency and digital transformation partner. We build web applications, native mobile apps, and enterprise AI solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-94142-92675",
      "contactType": "sales",
      "email": "info@stitchbyte.in",
      "areaServed": ["IN", "AE", "US"],
      "availableLanguage": ["English", "Hindi", "Arabic"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61563772072392",
      "https://wa.me/919414292675",
      "https://www.instagram.com/stitchbyte/",
      "https://www.linkedin.com/company/stitchbyte1"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stitchbyte",
    "url": "https://stitchbyte.in",
    "description": "Custom Software Development, Web Development, Mobile Apps & Cognitive AI Solutions.",
    "publisher": {
      "@id": "https://stitchbyte.in/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://stitchbyte.in/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://stitchbyte.in/#custom-software-service",
        "serviceType": "Custom Software Development",
        "provider": {
          "@id": "https://stitchbyte.in/#organization"
        },
        "areaServed": ["IN", "AE", "US"],
        "description": "Custom enterprise software engineering, database design, API integrations, and cloud infrastructure management."
      },
      {
        "@type": "Service",
        "@id": "https://stitchbyte.in/#web-development-service",
        "serviceType": "Web Development",
        "provider": {
          "@id": "https://stitchbyte.in/#organization"
        },
        "areaServed": ["IN", "AE", "US"],
        "description": "Full-stack web application engineering utilizing React, Next.js, and Node.js for high-performance storefronts and platforms."
      },
      {
        "@type": "Service",
        "@id": "https://stitchbyte.in/#ai-solutions-service",
        "serviceType": "AI Solutions and Integration",
        "provider": {
          "@id": "https://stitchbyte.in/#organization"
        },
        "areaServed": ["IN", "AE", "US"],
        "description": "Custom Large Language Model (LLM) integrations, machine learning analytics, and cognitive workflow automation."
      },
      {
        "@type": "Service",
        "@id": "https://stitchbyte.in/#ui-ux-design-service",
        "serviceType": "UI/UX Design Systems",
        "provider": {
          "@id": "https://stitchbyte.in/#organization"
        },
        "areaServed": ["IN", "AE", "US"],
        "description": "Atomic design systems, custom wireframes, interactive Figma prototypes, and conversion-focused interfaces."
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://stitchbyte.in/#localbusiness",
    "name": "Stitchbyte",
    "image": "https://stitchbyte.in/logo-stitchbyte.png",
    "priceRange": "$$$",
    "telephone": "+91-94142-92675",
    "url": "https://stitchbyte.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Malviya Nagar",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302017",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8530,
      "longitude": 75.8047
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61563772072392",
      "https://wa.me/919414292675",
      "https://www.instagram.com/stitchbyte/",
      "https://www.linkedin.com/company/stitchbyte1"
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Jaipur"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Dubai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "United States"
      }
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Local Business Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NHK75XLK');
            `,
          }}
        />
        {/* Services Schema */}
        <Script
          id="services-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-H27QKB00PJ`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H27QKB00PJ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHK75XLK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <BreadcrumbSchema />
        <ChatbotVisibility />
        <Suspense fallback={null}>
          <TrackingProvider />
        </Suspense>
      </body>
    </html>
  );
}
