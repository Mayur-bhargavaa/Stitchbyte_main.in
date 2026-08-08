import type { Metadata } from "next";
import { parseSlug } from "@/data/pseo-registry";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const match = parseSlug(slug);

  if (!match) {
    return {
      title: "Premium Digital Agency | StitchByte",
      description: "StitchByte is a premier custom software, SEO, and digital marketing agency serving global clients.",
    };
  }

  let titleText = "";
  let descText = "";

  if (match.type === "city") {
    const { city } = match;
    titleText = `Digital Marketing & Software Agency in ${city.name} | StitchByte`;
    descText = `Looking for a top digital marketing, web development, and SEO agency in ${city.name}? StitchByte delivers high-performance custom solutions tailored for ${city.name} businesses.`;
  } else if (match.type === "service-city") {
    const { service, city } = match;
    titleText = `${service.name} in ${city.name} | Best ${service.name} ${city.name} - StitchByte`;
    descText = `Looking for the best ${service.name} in ${city.name}? StitchByte delivers premium custom solutions designed to address ${city.name} market challenges and drive growth.`;
  } else if (match.type === "service-national") {
    const { service, locationName } = match;
    titleText = `${service.name} | Best ${service.name} in ${locationName} - StitchByte`;
    descText = `Looking for a premier ${service.name} in ${locationName}? StitchByte delivers high-performance custom software and marketing solutions designed to drive growth.`;
  }

  return {
    title: titleText,
    description: descText,
    alternates: {
      canonical: `https://stitchbyte.in/${slug}`,
      languages: {
        "en": `https://stitchbyte.in/${slug}`,
        "x-default": `https://stitchbyte.in/${slug}`,
      },
    },
    openGraph: {
      title: titleText,
      description: descText,
      type: "website",
      url: `https://stitchbyte.in/${slug}`,
      images: [{ url: "/logo-stitchbyte.png", width: 1200, height: 630, alt: titleText }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: ["/logo-stitchbyte.png"],
    },
  };
}

export default function SlugLayout({ children }: Props) {
  return <>{children}</>;
}
