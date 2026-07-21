import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials in Alwar | Stitchbyte",
  description:
    "Read real client reviews and testimonials about Stitchbyte's SEO, web development, UX/UI design, and digital marketing services.",
  alternates: {
    canonical: "https://stitchbyte.in/reviews",
  },
  openGraph: {
    title: "Client Reviews & Testimonials | Stitchbyte",
    description:
      "Read real client reviews and testimonials about Stitchbyte's SEO, web development, UX/UI design, and digital marketing services.",
    type: "website",
    url: "https://stitchbyte.in/reviews",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Stitchbyte Client Reviews" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Testimonials | Stitchbyte",
    description:
      "Read real client reviews and testimonials about Stitchbyte's SEO, web development, UX/UI design, and digital marketing services.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function ReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://stitchbyte.in/#organization",
    name: "Stitchbyte",
    url: "https://stitchbyte.in",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "50",
      reviewCount: "50",
    },
    review: [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Mayank Sharma"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "StitchByte completely transformed our digital operations in Alwar. Their custom Next.js development and local SEO work helped us outrank corporate competitors.",
        "publisher": {
          "@type": "Organization",
          "name": "StitchByte"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rohan Deshmukh"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Working with the StitchByte team was the best technical decision we made this year. They built our e-commerce storefront with custom database syncing.",
        "publisher": {
          "@type": "Organization",
          "name": "StitchByte"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />
      {children}
    </>
  );
}
