import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotVisibility from "@/components/ChatbotVisibility";
import TrackingProvider from "@/components/TrackingProvider";
import CookieConsent from "@/components/CookieConsent";
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
    default: "Stitchbyte | Custom Software & Digital Agency",
    template: "%s | Stitchbyte",
  },
  description:
    "Stitchbyte is a premier software development agency building high-performance web applications, mobile apps, custom AI solutions, and SEO campaigns.",
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
    "headless commerce development",
    "Alwar",
    "Digital Marketing Agency India",
    "Best Digital Marketing Agency",
    "SEO Agency India",
    "Website Development Company India",
    "Web Design Company India",
    "Shopify Experts India",
    "Shopify Development Company",
    "WordPress Agency",
    "React Development Company",
    "MERN Stack Development",
    "AI Automation Company",
    "AI Development Company",
    "Mobile App Development Company",
    "Ecommerce Development Company",
    "Branding Agency",
    "UI UX Design Agency",
    "Performance Marketing Agency",
    "Google Ads Agency",
    "Meta Ads Agency",
    "Lead Generation Company"
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
  // NOTE: Do NOT set a global canonical here — each page sets its own via generateMetadata.
  // A global canonical pointing to the homepage causes Google to mark all other pages
  // as "Alternate page with proper canonical tag" and refuse to index them.
  // The homepage sets its own canonical via the (home)/layout.tsx wrapper below.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stitchbyte.in",
    siteName: "Stitchbyte",
    title: "Stitchbyte | Custom Software & Digital Agency",
    description:
      "Stitchbyte is a premier software development agency building high-performance web applications, mobile apps, custom AI solutions, and SEO campaigns.",
    images: [
      {
        url: "/logo-stitchbyte.png",
        width: 1200,
        height: 630,
        alt: "Stitchbyte — Custom Software & Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitchbyte | Custom Software & Digital Agency",
    description:
      "Stitchbyte is a premier software development agency building high-performance web applications, mobile apps, custom AI solutions, and SEO campaigns.",
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
    title: "Stitchbyte | Custom Software & Digital Agency",
  },
  formatDetection: {
    telephone: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Alwar",
    "geo.position": "27.5530;76.6346",
    "ICBM": "27.5530, 76.6346"
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
    "alternateName": ["Stitch", "Stitch Byte", "Stitch Agency", "Stitch Alwar", "Stitch Delhi NCR"],
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
      "streetAddress": "MIA Area",
      "addressLocality": "Alwar",
      "addressRegion": "Rajasthan",
      "postalCode": "301030",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.5530,
      "longitude": 76.6346
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
        "name": "Alwar"
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
              
              var initialConsent = 'denied';
              try {
                if (localStorage.getItem('stitchbyte_cookie_consent') === 'accepted') {
                  initialConsent = 'granted';
                }
              } catch (e) {}
              
              gtag('consent', 'default', {
                'ad_storage': initialConsent,
                'analytics_storage': initialConsent,
                'ad_user_data': initialConsent,
                'ad_personalization': initialConsent
              });
              
              gtag('js', new Date());
              gtag('config', 'G-H27QKB00PJ');
              
              window.addEventListener('cookieConsentChanged', function() {
                try {
                  var updatedConsent = localStorage.getItem('stitchbyte_cookie_consent') === 'accepted' ? 'granted' : 'denied';
                  gtag('consent', 'update', {
                    'ad_storage': updatedConsent,
                    'analytics_storage': updatedConsent,
                    'ad_user_data': updatedConsent,
                    'ad_personalization': updatedConsent
                  });
                } catch (e) {}
              });
            `,
          }}
        />
        {/* Facebook Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              var fbConsent = 'revoke';
              try {
                if (localStorage.getItem('stitchbyte_cookie_consent') === 'accepted') {
                  fbConsent = 'grant';
                }
              } catch (e) {}
              
              fbq('consent', fbConsent);
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1234567890"}');
              fbq('track', 'PageView');
              
              window.addEventListener('cookieConsentChanged', function() {
                try {
                  var updatedFb = localStorage.getItem('stitchbyte_cookie_consent') === 'accepted' ? 'grant' : 'revoke';
                  fbq('consent', updatedFb);
                } catch (e) {}
              });
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
        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1234567890"}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <BreadcrumbSchema />
        <ChatbotVisibility />
        <Suspense fallback={null}>
          <TrackingProvider />
          <CookieConsent />
        </Suspense>
      </body>
    </html>
  );
}
