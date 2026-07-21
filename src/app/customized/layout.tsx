import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Development in Alwar | StitchByte",
  description:
    "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
  alternates: {
    canonical: "https://stitchbyte.in/customized",
  },
  openGraph: {
    title: "Customized Development | SEO, Web & UX/UI Services - Stitchbyte",
    description:
      "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
    type: "website",
    url: "https://stitchbyte.in/customized",
    images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: "Customized Development by Stitchbyte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized Development | SEO, Web & UX/UI Services - Stitchbyte",
    description:
      "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
    images: ["/logo-stitchbyte.png"],
  },
};

export default function CustomizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
