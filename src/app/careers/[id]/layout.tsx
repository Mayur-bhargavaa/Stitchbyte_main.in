import { Metadata } from "next";
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

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params;

    let title = staticJobTitles[id] || null;
    let description = `Apply for ${title || id.replace(/-/g, " ")} at StitchByte. Join our growing team in Alwar, Rajasthan.`;

    // Try to fetch live job from DB
    try {
        await connectDB();
        const job = await JobPosition.findOne({ slug: id }).select("title description isActive").lean() as { title: string; description: string; isActive: boolean } | null;
        if (job) {
            title = job.title;
            description = (job.description || description).slice(0, 160);

            // If job is no longer active, set noindex
            if (!job.isActive) {
                return {
                    title: `${title} | Careers at StitchByte`,
                    robots: { index: false },
                    alternates: { canonical: `${BASE_URL}/careers` },
                };
            }
        }
    } catch {
        // DB unavailable — use static fallback
    }

    // If no job found at all → redirect to /careers handled by next.config.ts
    if (!title) {
        return {
            title: "Career Opportunity | StitchByte",
            robots: { index: false },
            alternates: { canonical: `${BASE_URL}/careers` },
        };
    }

    const canonicalUrl = `${BASE_URL}/careers/${id}`;

    return {
        title: `${title} | Careers at StitchByte`,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${title} — Join StitchByte`,
            description,
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "website",
        },
        twitter: {
            card: "summary",
            title: `${title} | StitchByte Careers`,
            description,
        },
    };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
