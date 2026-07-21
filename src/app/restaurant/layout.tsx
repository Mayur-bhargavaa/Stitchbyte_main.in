import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Management System in Alwar | StitchByte",
  description:
    "Launch your restaurant online with StitchByte's restaurant management system featuring QR-based menus, real-time ordering, and merchant dashboards.",
  alternates: {
    canonical: "https://stitchbyte.in/restaurant",
  },
  openGraph: {
    title: "Restaurant Management System | QR Menu & Online Ordering - StitchByte",
    description:
      "Launch your restaurant online with StitchByte's restaurant management system featuring QR-based menus, real-time ordering, and merchant dashboards.",
    type: "website",
    url: "https://stitchbyte.in/restaurant",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "StitchByte Restaurant System" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Management System | StitchByte",
    description:
      "Launch your restaurant online with StitchByte's restaurant management system featuring QR-based menus, real-time ordering, and merchant dashboards.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StitchByte Restaurant Management System",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Complete restaurant management solution with QR-based digital menus, online ordering, merchant dashboards, and real-time analytics.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: "Stitchbyte",
      url: "https://stitchbyte.in",
    },
    url: "https://stitchbyte.in/restaurant",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      {children}
    </>
  );
}
