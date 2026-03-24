import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Stitchbyte | Build SEO, Web & UX/UI Products",
  description:
    "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
  openGraph: {
    title: "Careers at Stitchbyte | Build SEO, Web & UX/UI Products",
    description:
      "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Stitchbyte | Build SEO, Web & UX/UI Products",
    description:
      "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
  },
};

export default function CareersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
