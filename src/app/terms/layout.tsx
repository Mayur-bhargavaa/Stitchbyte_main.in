import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | StitchByte Jaipur",
  description:
    "Read the Stitchbyte terms and conditions covering SEO, web development, UX/UI design, payment terms, IP rights, and project delivery.",
  alternates: {
    canonical: "https://stitchbyte.in/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Service Agreement - Stitchbyte",
    description:
      "Read the Stitchbyte terms and conditions covering SEO services, web development, UX/UI design, payment terms, intellectual property, and project delivery.",
    type: "website",
    url: "https://stitchbyte.in/terms",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Stitchbyte Terms & Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Stitchbyte",
    description:
      "Read the Stitchbyte terms and conditions for services including SEO, web development, and UX/UI design.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
