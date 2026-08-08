import { Metadata } from "next";

// Sets the canonical specifically for the homepage (https://stitchbyte.in/)
// This is needed because the page.tsx is "use client" and cannot export metadata.
export const metadata: Metadata = {
    alternates: {
        canonical: "https://stitchbyte.in",
    },
};

export default function HomeMetadataLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
