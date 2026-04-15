import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Stitchbyte",
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
