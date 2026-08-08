import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongoose";
import MarketingCaseStudy from "@/models/MarketingCaseStudy";

const BASE_URL = "https://stitchbyte.in";

// ── Check if marketing case study exists ──────────────────────────────────────
async function checkStudyExists(slug: string) {
    try {
        await connectDB();
        const study = await MarketingCaseStudy.findOne({ slug, isActive: true }).select("brand summary").lean() as { brand: string; summary?: string } | null;
        return study;
    } catch {
        return null;
    }
}

// ── SEO Metadata (server-rendered) ─────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const study = await checkStudyExists(slug);

    if (!study) {
        return {
            title: "Case Study Not Found | StitchByte",
            robots: { index: false },
        };
    }

    const canonicalUrl = `${BASE_URL}/marketing/${slug}`;

    return {
        title: `${study.brand} Case Study | StitchByte Marketing`,
        description: study.summary || `Marketing case study detailing the strategy, optimization, and ROI results for ${study.brand} by StitchByte.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${study.brand} Case Study`,
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "website",
        },
    };
}

// ── Layout (Server Component) ────────────────────────────────────────────────
// If study doesn't exist, we call notFound() on the server to return a real 404
export default async function MarketingStudyLayout(
    { children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const study = await checkStudyExists(slug);

    if (!study) {
        notFound();
    }

    return <>{children}</>;
}
