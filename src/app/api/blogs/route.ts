import { NextResponse } from "next/server";
import { blogPrisma } from "@/lib/prisma";

export async function GET() {
    try {
        const blogs = await blogPrisma.blog.findMany({
            where: { status: "published" },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
