import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Digital Portfolio | Stitchbyte",
  description:
    "Explore all Stitchbyte work across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
  alternates: {
    canonical: "https://stitchbyte.in/work",
  },
  openGraph: {
    title: "Our Digital Portfolio | Stitchbyte",
    description:
      "Explore all Stitchbyte work across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
    type: "website",
    url: "https://stitchbyte.in/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Stitchbyte Digital Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Digital Portfolio | Stitchbyte",
    description:
      "Explore all Stitchbyte work across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
    images: ["/og-image.png"],
  },
  keywords: ["marketing", "seo", "ui ux", "prebuilt", "customized", "case studies"],
};

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
