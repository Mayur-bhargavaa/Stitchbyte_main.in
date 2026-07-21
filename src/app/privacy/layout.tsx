import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StitchByte Alwar",
  description:
    "Read the Stitchbyte privacy policy to understand how we collect, use, and protect your personal data across our SEO, web development, and UX/UI services.",
  alternates: {
    canonical: "https://stitchbyte.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Your Data Protection Rights - Stitchbyte",
    description:
      "Read the Stitchbyte privacy policy to understand how we collect, use, and protect your personal data when using our SEO, web development, and UX/UI services.",
    type: "website",
    url: "https://stitchbyte.in/privacy",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Stitchbyte Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Stitchbyte",
    description:
      "Read the Stitchbyte privacy policy to understand how we collect, use, and protect your personal data.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
