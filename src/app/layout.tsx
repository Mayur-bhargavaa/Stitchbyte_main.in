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
    default: "StitchByte | SEO & Web Development Agency in Jaipur",
    template: "%s | StitchByte",
  },
  description:
    "Grow your business with Stitchbyte, a top digital marketing agency in Jaipur. We deliver custom web development, UX/UI design, and proven SEO strategies.",
  keywords: [
    "Stitchbyte",
    "Stitch",
    "Stitch agency",
    "Stitch Jaipur",
    "Stitch Rajasthan",
    "Stitch web development",
    "Stitch SEO",
    "SEO services Jaipur",
    "web development agency Jaipur",
    "UX/UI design Rajasthan",
    "digital marketing agency Jaipur",
    "best digital agency in Rajasthan",
    "website development Jaipur",
    "SEO agency India",
    "custom web development",
    "prebuilt websites",
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
    locale: "en_IN",
    url: "https://stitchbyte.in",
    siteName: "Stitchbyte",
    title: "StitchByte | SEO & Web Development Agency in Jaipur",
    description:
      "Grow your business with Stitchbyte, a top digital marketing agency in Jaipur. We deliver custom web development, UX/UI design, and proven SEO strategies.",
    images: [
      {
        url: "/logo-stitchbyte.png",
        width: 1200,
        height: 630,
        alt: "Stitchbyte — SEO, Web Development & UX/UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StitchByte | SEO & Web Development Agency in Jaipur",
    description:
      "Grow your business with Stitchbyte, a top digital marketing agency in Jaipur. We deliver custom web development, UX/UI design, and proven SEO strategies.",
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
    title: "StitchByte | SEO & Web Development Agency in Jaipur",
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
    "geo.position": "26.9124;75.7873",
    "ICBM": "26.9124, 75.7873"
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
    name: "Stitchbyte",
    alternateName: ["Stitch", "Stitch Byte", "Stitch Agency", "Stitch Jaipur"],
    url: "https://stitchbyte.in",
    logo: "https://stitchbyte.in/logo-stitchbyte.png",
    description:
      "Grow your business with Stitchbyte, a top digital marketing agency in Jaipur. We deliver custom web development, UX/UI design, and proven SEO strategies.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@stitchbyte.in",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61563772072392",
      "https://wa.me/919414292675",
      "https://www.instagram.com/stitchbyte/",
      "https://www.linkedin.com/company/stitchbyte1",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stitchbyte",
    url: "https://stitchbyte.in",
    description:
      "SEO, Digital Presence, Web Development & UX/UI services for growing businesses.",
    publisher: {
      "@type": "Organization",
      name: "Stitchbyte",
      logo: {
        "@type": "ImageObject",
        url: "https://stitchbyte.in/logo-stitchbyte.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://stitchbyte.in/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "SEO Services",
        description:
          "Track rankings, traffic, and audience behavior to improve visibility and growth decisions.",
        provider: { "@type": "Organization", name: "Stitchbyte" },
        url: "https://stitchbyte.in/marketing",
      },
      {
        "@type": "Service",
        position: 2,
        name: "Web Development",
        description:
          "Build reliable websites and platforms tailored to your goals, users, and operations.",
        provider: { "@type": "Organization", name: "Stitchbyte" },
        url: "https://stitchbyte.in/customized",
      },
      {
        "@type": "Service",
        position: 3,
        name: "UX/UI Design",
        description:
          "Create clean interfaces and simple user journeys that improve engagement and retention.",
        provider: { "@type": "Organization", name: "Stitchbyte" },
        url: "https://stitchbyte.in/ui-ux",
      },
      {
        "@type": "Service",
        position: 4,
        name: "Digital Marketing",
        description:
          "Align your website, content, and conversion flow so customers find and trust your brand.",
        provider: { "@type": "Organization", name: "Stitchbyte" },
        url: "https://stitchbyte.in/marketing",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "StitchByte",
    "alternateName": ["Stitch", "Stitch Byte", "Stitch Agency", "Stitch Jaipur"],
    "image": "https://stitchbyte.in/logo-stitchbyte.png",
    "@id": "https://stitchbyte.in/#localbusiness",
    "url": "https://stitchbyte.in",
    "telephone": "+919414292675",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jaipur, Rajasthan",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.9124,
      "longitude": 75.7873
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
