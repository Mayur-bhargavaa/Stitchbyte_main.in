import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Business Automation Audit | Stitchbyte",
  description: "Find the repetitive work, WhatsApp bottlenecks and slow lead follow-up you can automate. Free audit from Stitchbyte.",
  alternates: { canonical: "https://stitchbyte.in/free-automation-audit" },
  // Paid-traffic landing page: keep out of search results until it has unique indexable content.
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
