import { NextResponse } from "next/server";
import { blogPrisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const blog = await blogPrisma.blog.findFirst({
            where: { slug: slug, status: "published" },
        });

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}
