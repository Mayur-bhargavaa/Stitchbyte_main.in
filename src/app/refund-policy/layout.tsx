import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | StitchByte",
  description:
    "Read the StitchByte Cancellation and Refund Policy to understand project cancellation, milestones, refunds, and service terms.",
  alternates: {
    canonical: "https://stitchbyte.in/refund-policy",
  },
  openGraph: {
    title: "Cancellation & Refund Policy - StitchByte",
    description:
      "Understand the cancellation and refund terms for web development, design, and SEO services at StitchByte.",
    type: "website",
    url: "https://stitchbyte.in/refund-policy",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "StitchByte Refund Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy | StitchByte",
    description:
      "Understand the cancellation and refund terms for web development, design, and SEO services at StitchByte.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function RefundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
