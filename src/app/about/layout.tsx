import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Alwar Web & Marketing Agency | StitchByte",
  description:
    "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
  alternates: {
    canonical: "https://stitchbyte.in/about",
  },
  openGraph: {
    title: "About Stitchbyte | SEO, Web Development & UX/UI Team",
    description:
      "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
    type: "website",
    url: "https://stitchbyte.in/about",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "About Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stitchbyte | SEO, Web Development & UX/UI Team",
    description:
      "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Stitchbyte",
    description:
      "Meet the Stitchbyte team helping brands grow through SEO strategy, digital presence, modern web development, and intuitive UX/UI.",
    url: "https://stitchbyte.in/about",
    mainEntity: {
      "@type": "Organization",
      name: "Stitchbyte",
      url: "https://stitchbyte.in",
      logo: "https://stitchbyte.in/logo-stitchbyte.png",
      foundingDate: "2024",
      founder: [
        {
          "@type": "Person",
          name: "Mayur Bhargava",
          jobTitle: "Founder & CTO",
          url: "https://github.com/Mayur-bhargavaa",
        },
        {
          "@type": "Person",
          name: "Vinita Bhargava",
          jobTitle: "Co-Founder & CEO",
          url: "https://www.linkedin.com/in/vinita-bhargava-46a533390/",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Alwar",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      knowsAbout: [
        "SEO",
        "Web Development",
        "UX/UI Design",
        "Digital Marketing",
        "Next.js",
        "React",
        "TypeScript",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      {children}
    </>
  );
}
