import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Growth & SEO Insights in Jaipur | StitchByte",
  description:
    "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
  keywords: ["SEO blog", "web development insights", "UX/UI tips", "digital marketing blog", "Stitchbyte blog"],
  alternates: {
    canonical: "https://stitchbyte.in/blog",
  },
  openGraph: {
    title: "Stitchbyte Blog | SEO, Web Development & UX/UI Insights",
    description:
      "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
    type: "website",
    url: "https://stitchbyte.in/blog",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Stitchbyte Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitchbyte Blog | SEO, Web Development & UX/UI Insights",
    description:
      "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
