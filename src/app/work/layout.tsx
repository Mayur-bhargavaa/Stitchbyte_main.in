import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All Work | Marketing, SEO, UI/UX, Prebuilt & Custom Projects - StitchByte",
  description:
    "Explore all StitchByte work in one place across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
  keywords: ["marketing", "seo", "ui ux", "prebuilt", "customized", "case studies", "portfolio", "web development"],
  alternates: {
    canonical: "https://stitchbyte.in/work",
  },
  openGraph: {
    title: "All Work | Marketing, SEO, UI/UX, Prebuilt & Custom Projects - StitchByte",
    description:
      "Explore all StitchByte work in one place across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
    type: "website",
    url: "https://stitchbyte.in/work",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "StitchByte Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Work | StitchByte Portfolio",
    description:
      "Explore all StitchByte work in one place across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
