import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongoose";
import CustomProject from "@/models/CustomProject";

const BASE_URL = "https://stitchbyte.in";

// ── Check if project exists ──────────────────────────────────────────────────
async function checkProjectExists(slug: string) {
    try {
        await connectDB();
        const project = await CustomProject.findOne({ slug, isActive: true }).select("title description").lean() as { title: string; description?: string } | null;
        return project;
    } catch {
        return null;
    }
}

// ── SEO Metadata (server-rendered) ─────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const project = await checkProjectExists(slug);

    if (!project) {
        return {
            title: "Project Not Found | StitchByte",
            robots: { index: false },
        };
    }

    const canonicalUrl = `${BASE_URL}/customized/${slug}`;

    return {
        title: `${project.title} | Custom Software Case Study - StitchByte`,
        description: project.description || `Case study detailing how StitchByte designed and built the custom digital platform ${project.title}.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: project.title,
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "website",
        },
    };
}

// ── Layout (Server Component) ────────────────────────────────────────────────
// If project doesn't exist, we call notFound() on the server to return a real 404
export default async function CustomizedProjectLayout(
    { children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const project = await checkProjectExists(slug);

    if (!project) {
        notFound();
    }

    return <>{children}</>;
}
