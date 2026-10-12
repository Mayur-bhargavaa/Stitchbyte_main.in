import { cache } from "react";
import connectDB from "@/lib/mongoose";
import CustomProject from "@/models/CustomProject";
import MarketingCaseStudy from "@/models/MarketingCaseStudy";
import { connectToDatabase } from "@/lib/mongodb";
import { blogPrisma } from "@/lib/prisma";

// Server-side content readers for the detail and listing pages.
// Each returns plain JSON (safe to pass to client components) and falls back to
// an empty result if the database is unreachable, so builds never hard-fail.

const plain = <T,>(doc: unknown): T => JSON.parse(JSON.stringify(doc)) as T;

export interface CustomProjectData {
    id: string;
    title: string;
    slug: string;
    description?: string;
    image: string;
    videoUrl?: string;
    features: string[];
    link: string;
    category: "websites" | "applications";
    technologies: string[];
}

export const getCustomProjects = cache(async (category?: string): Promise<CustomProjectData[]> => {
    try {
        await connectDB();
        const query: Record<string, unknown> = { isActive: true };
        if (category && category !== "all") query.category = category;
        const docs = await CustomProject.find(query).sort({ order: 1, createdAt: -1 }).lean();
        return plain<CustomProjectData[]>(docs);
    } catch (error) {
        console.error("getCustomProjects failed:", error);
        return [];
    }
});

export const getCustomProject = cache(async (slug: string): Promise<CustomProjectData | null> => {
    try {
        await connectDB();
        const doc = await CustomProject.findOne({ slug, isActive: true }).lean();
        return doc ? plain<CustomProjectData>(doc) : null;
    } catch (error) {
        console.error("getCustomProject failed:", error);
        return null;
    }
});

export interface MarketingStudyData {
    id: string;
    slug: string;
    brand: string;
    industry: string;
    category: "performance" | "seo";
    summary: string;
    highlights: string[];
    goal: string;
    approach: string;
    result: string;
    outcomeMetrics: string[];
    companySize?: string;
    businessModel?: string;
    targetAudience?: string;
    problem?: string;
    objectives?: string[];
    solutionDetails?: string;
    challenges?: string;
    implementationProcess?: string;
    resultsMetrics?: string[];
    visualProof?: string[];
    testimonialQuote?: string;
    testimonialAuthor?: string;
    testimonialDesignation?: string;
    businessImpact?: string;
}

export const getMarketingStudies = cache(async (): Promise<MarketingStudyData[]> => {
    try {
        await connectDB();
        const docs = await MarketingCaseStudy.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
        return plain<MarketingStudyData[]>(docs);
    } catch (error) {
        console.error("getMarketingStudies failed:", error);
        return [];
    }
});

export const getMarketingStudy = cache(async (slug: string): Promise<MarketingStudyData | null> => {
    try {
        await connectDB();
        const doc = await MarketingCaseStudy.findOne({ slug, isActive: true }).lean();
        return doc ? plain<MarketingStudyData>(doc) : null;
    } catch (error) {
        console.error("getMarketingStudy failed:", error);
        return null;
    }
});

// Prebuilt products live in a raw MongoDB collection (no Mongoose model). Callers type the result.
export const getPrebuiltProducts = cache(async <T = Record<string, unknown>,>(): Promise<T[]> => {
    try {
        const { db } = await connectToDatabase();
        const docs = await db.collection("prebuilt_products").find({ isActive: true }).sort({ order: 1 }).toArray();
        return plain<T[]>(docs);
    } catch (error) {
        console.error("getPrebuiltProducts failed:", error);
        return [];
    }
});

export const getPrebuiltProduct = cache(async <T = Record<string, unknown>,>(slug: string): Promise<T | null> => {
    try {
        const { db } = await connectToDatabase();
        const doc = await db.collection("prebuilt_products").findOne({ id: slug, isActive: true });
        return doc ? plain<T>(doc) : null;
    } catch (error) {
        console.error("getPrebuiltProduct failed:", error);
        return null;
    }
});

export interface BlogListItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    createdAt: string;
    readTime: string;
    category: string;
    coverImage?: string | null;
    pdfUrl?: string | null;
}

export const getBlogPosts = cache(async (): Promise<BlogListItem[]> => {
    try {
        const blogs = await blogPrisma.blog.findMany({
            where: { status: "published" },
            orderBy: { createdAt: "desc" },
            select: {
                id: true, title: true, slug: true, excerpt: true, author: true,
                createdAt: true, readTime: true, category: true, coverImage: true, pdfUrl: true,
            },
        });
        return plain<BlogListItem[]>(blogs);
    } catch (error) {
        console.error("getBlogPosts failed:", error);
        return [];
    }
});
