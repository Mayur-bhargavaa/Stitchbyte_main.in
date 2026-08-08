import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";

const BASE_URL = "https://stitchbyte.in";

// ── Check if product exists ──────────────────────────────────────────────────
async function checkProductExists(slug: string) {
    try {
        const { db } = await connectToDatabase();
        const product = await db.collection("prebuilt_products").findOne({ id: slug, isActive: true });
        return product;
    } catch {
        return null;
    }
}

// ── SEO Metadata (server-rendered) ─────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const product = await checkProductExists(slug);

    if (!product) {
        return {
            title: "Product Not Found | StitchByte",
            robots: { index: false },
        };
    }

    const canonicalUrl = `${BASE_URL}/prebuilt/${slug}`;

    return {
        title: `${product.name} | Prebuilt Software Solutions by StitchByte`,
        description: product.description || `View features and live demo of ${product.name} — ready to deploy software by StitchByte.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${product.name} — Prebuilt by StitchByte`,
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "website",
        },
    };
}

// ── Layout (Server Component) ────────────────────────────────────────────────
// If product doesn't exist, we call notFound() on the server to return a real 404
export default async function PrebuiltProductLayout(
    { children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const product = await checkProductExists(slug);

    if (!product) {
        notFound();
    }

    return <>{children}</>;
}
