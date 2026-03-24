import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Stitchbyte | SEO, Web Development & UX/UI Team",
  description:
    "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
  openGraph: {
    title: "About Stitchbyte | SEO, Web Development & UX/UI Team",
    description:
      "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stitchbyte | SEO, Web Development & UX/UI Team",
    description:
      "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
