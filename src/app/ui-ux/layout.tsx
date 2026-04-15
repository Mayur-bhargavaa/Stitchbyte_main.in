import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "UI & UX Design Services | User-First Digital Experiences - StitchByte",
  description:
    "Design user-first digital experiences with StitchByte UI & UX services, from research and flows to modern interface systems.",
  keywords: ["UI design", "UX design", "user experience", "interface design", "product design", "Stitchbyte"],
  alternates: {
    canonical: "https://stitchbyte.in/ui-ux",
  },
  openGraph: {
    title: "UI & UX Design Services | StitchByte",
    description:
      "Design user-first digital experiences with StitchByte UI & UX services, from research and flows to modern interface systems.",
    type: "website",
    url: "https://stitchbyte.in/ui-ux",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "UI & UX Design by StitchByte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI & UX Design Services | StitchByte",
    description:
      "Design user-first digital experiences with StitchByte UI & UX services.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function UiUxLayout({ children }: { children: ReactNode }) {
  return children;
}
