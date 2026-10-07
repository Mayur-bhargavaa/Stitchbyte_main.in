import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI & Workflow Automation Services | StitchByte",
  description:
    "Scale your business operations with StitchByte intelligent automation. Custom AI agents, WhatsApp business workflows, CRM integrations, and automated pipelines.",
  keywords: [
    "AI automation",
    "workflow automation",
    "WhatsApp automation",
    "CRM automation",
    "AI agents",
    "business automation",
    "Stitchbyte",
  ],
  alternates: {
    canonical: "https://stitchbyte.in/automation",
  },
  openGraph: {
    title: "AI & Workflow Automation Services | StitchByte",
    description:
      "Scale your business operations with StitchByte intelligent automation. Custom AI agents, WhatsApp business workflows, and automated pipelines.",
    type: "website",
    url: "https://stitchbyte.in/automation",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Automation by StitchByte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Workflow Automation Services | StitchByte",
    description:
      "Scale your business operations with StitchByte intelligent automation.",
    images: ["/og-image.png"],
  },
};

export default function AutomationLayout({ children }: { children: ReactNode }) {
  return children;
}
