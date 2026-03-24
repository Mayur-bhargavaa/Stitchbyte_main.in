import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews | Stitchbyte",
  description:
    "Explore all client review screenshots managed from the Stitchbyte admin panel.",
  openGraph: {
    title: "Client Reviews | Stitchbyte",
    description:
      "Explore all client review screenshots managed from the Stitchbyte admin panel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews | Stitchbyte",
    description:
      "Explore all client review screenshots managed from the Stitchbyte admin panel.",
  },
};

export default function ReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
