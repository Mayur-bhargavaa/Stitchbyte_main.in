import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prebuilt Solutions | Fast Launch Websites & Apps - Stitchbyte",
  description:
    "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
  openGraph: {
    title: "Prebuilt Solutions | Fast Launch Websites & Apps - Stitchbyte",
    description:
      "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prebuilt Solutions | Fast Launch Websites & Apps - Stitchbyte",
    description:
      "Explore Stitchbyte prebuilt solutions for faster digital launches with modern web development, SEO-ready foundations, and user-friendly UX/UI.",
  },
};

export default function PrebuiltLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
