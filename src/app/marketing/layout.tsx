import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
  description:
    "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
  openGraph: {
    title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
    description:
      "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
    description:
      "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
