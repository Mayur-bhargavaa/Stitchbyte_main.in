import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies - Client Success Stories",
  description: "Explore our case studies showcasing real results in performance marketing and SEO. See how StitchByte helps businesses grow with proven digital strategies.",
  alternates: {
    canonical: "https://stitchbyte.in/case-studies",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
