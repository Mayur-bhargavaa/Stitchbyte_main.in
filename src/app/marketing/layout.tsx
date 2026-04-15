import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
  description:
    "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
  alternates: {
    canonical: "https://stitchbyte.in/marketing",
  },
  openGraph: {
    title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
    description:
      "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
    type: "website",
    url: "https://stitchbyte.in/marketing",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Marketing Case Studies by Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Case Studies | Performance Marketing & SEO - Stitchbyte",
    description:
      "Explore Stitchbyte marketing case studies across performance marketing and SEO, with real growth outcomes for digital businesses.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
