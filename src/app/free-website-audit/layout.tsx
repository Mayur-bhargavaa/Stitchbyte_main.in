import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Conversion Audit | Stitchbyte",
  description: "Find out why your website is not turning visitors into enquiries. Get a free conversion audit from Stitchbyte.",
  alternates: { canonical: "https://stitchbyte.in/free-website-audit" },
  // Paid-traffic landing page: keep out of search results until it has unique indexable content.
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
