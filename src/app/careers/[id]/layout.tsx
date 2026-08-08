import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongoose";
import JobPosition from "@/models/JobPosition";

const BASE_URL = "https://stitchbyte.in";

// Static fallback titles for known slugs (used when DB is unavailable)
const staticJobTitles: Record<string, string> = {
    "full-stack-developer": "Full Stack Developer",
    "ui-ux-designer": "UI/UX Designer",
    "business-development-executive": "Business Development Executive",
    "digital-marketing-manager": "Digital Marketing Manager",
    "content-intern": "Content Intern",
    "frontend-developer": "Frontend Developer",
    "frontend-intern": "Frontend Intern",
    "react-developer": "React Developer",
    "seo-specialist": "SEO Specialist",
    "social-media-manager": "Social Media Manager",
};

// ── Check if a job exists ────────────────────────────────────────────────────
async function checkJobExists(id: string) {
    if (staticJobTitles[id]) return { title: staticJobTitles[id], isActive: true };

    try {
        await connectDB();
        const job = await JobPosition.findOne({ slug: id }).select("title isActive").lean() as { title: string; isActive: boolean } | null;
        return job;
    } catch {
        return null;
    }
}

// ── SEO Metadata (server-rendered) ─────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params;
    const job = await checkJobExists(id);

    if (!job) {
        return {
            title: "Career Opportunity Not Found | StitchByte",
            robots: { index: false },
        };
    }

    if (!job.isActive) {
        return {
            title: `${job.title} (Closed) | StitchByte`,
            robots: { index: false },
        };
    }

    const canonicalUrl = `${BASE_URL}/careers/${id}`;

    return {
        title: `${job.title} | Careers at StitchByte`,
        description: `Apply for the ${job.title} position at StitchByte. Join our growing team in Alwar, Rajasthan.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${job.title} — Join StitchByte`,
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "website",
        },
    };
}

// ── Layout (Server Component) ────────────────────────────────────────────────
// If job doesn't exist, we call notFound() on the server to return a real 404
export default async function CareerLayout(
    { children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const job = await checkJobExists(id);

    if (!job) {
        notFound();
    }

    return <>{children}</>;
}
