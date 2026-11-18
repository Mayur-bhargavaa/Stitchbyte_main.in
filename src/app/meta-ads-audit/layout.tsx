import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Meta Ads Funnel Audit | Stitchbyte",
  description: "Spending on Meta Ads but not getting customers? Get a free audit of your campaign, creative, landing page and tracking.",
  alternates: { canonical: "https://stitchbyte.in/meta-ads-audit" },
  // Paid-traffic landing page: keep out of search results until it has unique indexable content.
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
