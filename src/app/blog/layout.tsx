import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stitchbyte Blog | SEO, Web Development & UX/UI Insights",
  description:
    "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
  openGraph: {
    title: "Stitchbyte Blog | SEO, Web Development & UX/UI Insights",
    description:
      "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitchbyte Blog | SEO, Web Development & UX/UI Insights",
    description:
      "Read Stitchbyte insights on SEO, digital presence, web development, and UX/UI to help businesses grow online with practical strategies.",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
