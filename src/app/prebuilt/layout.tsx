import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prebuilt SaaS Solutions in Alwar | StitchByte",
  description:
    "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
  alternates: {
    canonical: "https://stitchbyte.in/prebuilt",
  },
  openGraph: {
    title: "Prebuilt Solutions | Fast Launch Websites & Apps - Stitchbyte",
    description:
      "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
    type: "website",
    url: "https://stitchbyte.in/prebuilt",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Prebuilt Solutions by Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prebuilt Solutions | Fast Launch Websites & Apps - Stitchbyte",
    description:
      "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function PrebuiltLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
