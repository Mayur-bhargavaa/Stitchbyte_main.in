import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Digital Portfolio in Jaipur | StitchByte",
  description:
    "Explore all StitchByte work in one place across Marketing, SEO, UI/UX, Prebuilt products, and Customized projects.",
  keywords: ["marketing", "seo", "ui ux", "prebuilt", "customized", "case studies"],
};

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
