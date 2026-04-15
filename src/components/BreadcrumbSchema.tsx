"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const pathLabels: Record<string, string> = {
  about: "About Us",
  blog: "Blog",
  contact: "Contact Us",
  careers: "Careers",
  customized: "Customized Development",
  prebuilt: "Prebuilt Solutions",
  marketing: "Marketing Case Studies",
  "ui-ux": "UI & UX Design",
  work: "All Work",
  reviews: "Client Reviews",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  restaurant: "Restaurant",
};

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://stitchbyte.in",
    },
    ...segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      item: `https://stitchbyte.in/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}
