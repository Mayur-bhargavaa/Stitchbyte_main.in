import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join Our Jaipur Digital Agency | StitchByte",
  description:
    "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
  alternates: {
    canonical: "https://stitchbyte.in/careers",
  },
  openGraph: {
    title: "Careers at Stitchbyte | Build SEO, Web & UX/UI Products",
    description:
      "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
    type: "website",
    url: "https://stitchbyte.in/careers",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Careers at Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Stitchbyte | Build SEO, Web & UX/UI Products",
    description:
      "Join Stitchbyte and build impactful SEO, digital presence, web development, and UX/UI solutions for growing businesses.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function CareersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
