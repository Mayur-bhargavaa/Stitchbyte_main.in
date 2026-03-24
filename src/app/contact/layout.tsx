import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Stitchbyte | SEO, Web Development & UX/UI Support",
  description:
    "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
  openGraph: {
    title: "Contact Stitchbyte | SEO, Web Development & UX/UI Support",
    description:
      "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Stitchbyte | SEO, Web Development & UX/UI Support",
    description:
      "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
