import type { Metadata } from "next";
import { metaDescription, withBrand } from "@/lib/seo";
import type { ReactNode } from "react";
import { AUTOMATION_ITEMS } from "@/data/automation-items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = AUTOMATION_ITEMS.find((a) => a.slug === slug);

  if (!item) {
    return {
      title: "Automation System",
      description: "Explore our intelligent automation and AI systems at StitchByte.",
    };
  }

  return {
    title: withBrand(`${item.title} — Video Walkthrough & Architecture`),
    description: metaDescription(item.shortDescription),
    alternates: {
      canonical: `https://stitchbyte.in/automation/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} — Video Walkthrough | StitchByte`,
      description: metaDescription(item.shortDescription),
      url: `https://stitchbyte.in/automation/${item.slug}`,
      type: "video.other",
      images: [
        {
          url: item.videoPoster || "/og-image.png",
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
  };
}

export default function AutomationDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
