import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Jaipur Digital Agency | StitchByte",
  description:
    "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
  alternates: {
    canonical: "https://stitchbyte.in/contact",
  },
  openGraph: {
    title: "Contact Stitchbyte | SEO, Web Development & UX/UI Support",
    description:
      "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
    type: "website",
    url: "https://stitchbyte.in/contact",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Contact Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Stitchbyte | SEO, Web Development & UX/UI Support",
    description:
      "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions. Share your goals and get a clear execution plan.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Stitchbyte",
    description:
      "Contact Stitchbyte for SEO, digital presence, web development, and UX/UI solutions.",
    url: "https://stitchbyte.in/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Stitchbyte",
      email: "info@stitchbyte.in",
      telephone: "+919461330819",
      url: "https://stitchbyte.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      {children}
    </>
  );
}
