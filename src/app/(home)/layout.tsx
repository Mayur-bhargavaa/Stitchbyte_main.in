import { Metadata } from "next";

// Sets the canonical specifically for the homepage (https://stitchbyte.in/)
// This is needed because the page.tsx is "use client" and cannot export metadata.
export const metadata: Metadata = {
    alternates: {
        canonical: "https://stitchbyte.in",
    },
    openGraph: {
        title: "Stitchbyte | Custom Software & Digital Agency",
        description:
            "Stitchbyte is a premier software development agency building high-performance web applications, mobile apps, custom AI solutions, and SEO campaigns.",
        url: "https://stitchbyte.in",
        siteName: "Stitchbyte",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Stitchbyte — Custom Software & Digital Agency",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stitchbyte | Custom Software & Digital Agency",
        description:
            "Stitchbyte is a premier software development agency building high-performance web applications, mobile apps, custom AI solutions, and SEO campaigns.",
        images: ["/og-image.png"],
    },
};

export default function HomeMetadataLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
