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
    default: "Stitchbyte | SEO, Digital Presence, Web Development & UX/UI",
    template: "%s | Stitchbyte",
  },
  description:
    "Stitchbyte helps businesses grow with SEO, stronger digital presence, modern web development, and easy-to-use UX/UI experiences. Launch your brand online with expert strategy, design, and execution.",
  keywords: [
    "SEO services",
    "web development",
    "UX/UI design",
    "digital presence",
    "digital marketing",
    "website development",
    "Stitchbyte",
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
    title: "Stitchbyte | SEO, Digital Presence, Web Development & UX/UI",
    description:
      "Stitchbyte helps businesses grow with SEO, stronger digital presence, modern web development, and easy-to-use UX/UI experiences.",
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
    title: "Stitchbyte | SEO, Digital Presence, Web Development & UX/UI",
    description:
      "Stitchbyte helps businesses grow with SEO, stronger digital presence, modern web development, and easy-to-use UX/UI experiences.",
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
    title: "Stitchbyte | SEO, Web Development & UX/UI",
  },
  formatDetection: {
    telephone: true,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
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
    url: "https://stitchbyte.in",
    logo: "https://stitchbyte.in/logo-stitchbyte.png",
    description:
      "Stitchbyte helps businesses grow with SEO, stronger digital presence, modern web development, and easy-to-use UX/UI experiences.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@stitchbyte.in",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61563772072392",
      "https://github.com/Mayur-bhargavaa",
      "https://www.instagram.com/stitchbyte.in/",
      "https://www.linkedin.com/in/vinita-bhargava-46a533390/",
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
        url: "https://stitchbyte.in/marketing?category=seo",
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

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
        {/* Services Schema */}
        <Script
          id="services-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
