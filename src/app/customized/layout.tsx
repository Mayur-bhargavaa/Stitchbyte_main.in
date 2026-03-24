import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customized Development | SEO, Web & UX/UI Services - Stitchbyte",
  description:
    "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
  openGraph: {
    title: "Customized Development | SEO, Web & UX/UI Services - Stitchbyte",
    description:
      "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized Development | SEO, Web & UX/UI Services - Stitchbyte",
    description:
      "Get tailored digital solutions from Stitchbyte with SEO strategy, strong digital presence, custom web development, and intuitive UX/UI design.",
  },
};

export default function CustomizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
