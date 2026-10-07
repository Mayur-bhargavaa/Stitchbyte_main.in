import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Sparkles,
    CheckCircle2,
    ArrowUpRight,
    MessageCircle,
    Building2,
    ShieldCheck,
    Zap,
    ChevronRight,
    Share2,
    FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPrisma } from "@/lib/prisma";
import { parseMarkdownToHtml, extractHeadings } from "@/lib/markdown";
import ReadingProgressBar from "./ReadingProgressBar";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogShareBar from "./BlogShareBar";

const BASE_URL = "https://stitchbyte.in";

// ─── Server-side data fetch ──────────────────────────────────────────────────
async function getBlog(slug: string) {
    try {
        const blog = await blogPrisma.blog.findFirst({
            where: { slug, status: "published" },
        });
        return blog;
    } catch {
        return null;
    }
}

async function getRelatedBlogs(currentSlug: string, category?: string) {
    try {
        const related = await blogPrisma.blog.findMany({
            where: {
                status: "published",
                slug: { not: currentSlug },
            },
            take: 3,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                readTime: true,
                coverImage: true,
                createdAt: true,
                author: true,
            },
        });
        return related;
    } catch {
        return [];
    }
}

// ─── SEO Metadata (server-rendered) ─────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Article Not Found | StitchByte Blog",
            robots: { index: false },
        };
    }

    const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;

    return {
        title: `${blog.title} | StitchByte Blog`,
        description: blog.excerpt || `Read ${blog.title} on the StitchByte blog.`,
        authors: [{ name: blog.author }],
        keywords: blog.tags?.join(", "),
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: blog.title,
            description: blog.excerpt || "",
            url: canonicalUrl,
            siteName: "StitchByte",
            type: "article",
            publishedTime: blog.createdAt.toISOString(),
            modifiedTime: blog.updatedAt?.toISOString() || blog.createdAt.toISOString(),
            authors: [blog.author],
            images: [{ url: blog.coverImage || "/og-image.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.excerpt || "",
            images: [blog.coverImage || "/og-image.png"],
        },
    };
}

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default async function SingleBlogPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) notFound();

    const relatedBlogs = await getRelatedBlogs(slug, blog.category);
    const headings = extractHeadings(blog.content);
    const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt,
        author: {
            "@type": "Person",
            name: blog.author,
            url: `${BASE_URL}/about`,
        },
        publisher: {
            "@type": "Organization",
            name: "StitchByte",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/logo-stitchbyte.png`,
            },
        },
        datePublished: blog.createdAt.toISOString(),
        dateModified: blog.updatedAt?.toISOString() || blog.createdAt.toISOString(),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },
        url: canonicalUrl,
        ...(blog.coverImage && blog.coverImage !== "" ? { image: blog.coverImage } : {}),
        articleSection: blog.category,
        keywords: blog.tags?.join(", "),
        wordCount: blog.content?.split(/\s+/).length || 0,
        inLanguage: "en",
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
            {/* Real-time Reading Progress Bar */}
            <ReadingProgressBar />

            {/* JSON-LD — rendered server-side, visible to Googlebot */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Modern StitchByte Grid Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(200, 200, 200, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(200, 200, 200, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* White Radial Blend */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 0) 80%)'
                }}
            />

            {/* Main Header / Navigation */}
            <Navbar />

            {/* Article Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Breadcrumbs & Back link */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{blog.category}</span>
                    </nav>

                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors bg-gray-50/80 hover:bg-indigo-50/60 px-3.5 py-1.5 rounded-full border border-gray-200/80"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
                    </Link>
                </div>

                {/* Article Hero Section */}
                <header className="mb-10 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                            {blog.category}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            <Clock className="w-3.5 h-3.5 text-gray-400" /> {blog.readTime}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(blog.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-gray-950 mb-6 leading-[1.15]">
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal mb-8">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Author & Share Bar Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-y border-gray-200/80">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                                {blog.author.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{blog.author}</h3>
                                <p className="text-xs text-gray-500">StitchByte Engineering & Research</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <BlogShareBar title={blog.title} slug={blog.slug} />
                        </div>
                    </div>
                </header>

                {/* Key Takeaways / Executive Summary Highlight Box */}
                <div className="mb-10 max-w-4xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 border border-indigo-100 rounded-3xl p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-950 tracking-tight">
                            Key Takeaways & Quick Overview
                        </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                        {blog.excerpt || "A comprehensive breakdown by the StitchByte engineering team covering industry standards, architectural considerations, and transparent cost factors in India for 2026."}
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs text-gray-600 border-t border-indigo-100/60">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Transparent 2026 Price Ranges</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Freelancer vs Agency Comparison</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Modern Next.js & Tech Stack</span>
                        </div>
                    </div>
                </div>

                {/* Cover Image or Attached Document */}
                {blog.pdfUrl && blog.pdfUrl !== "" ? (
                    <div className="mb-12 border border-gray-200 bg-white rounded-3xl p-8 text-center shadow-sm max-w-4xl">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Attached Document</h3>
                        <p className="text-gray-500 mb-6 font-medium">This article includes a PDF document for you to download.</p>
                        <a
                            href={blog.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={blog.pdfName || "document.pdf"}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-sm text-sm"
                        >
                            Download PDF {blog.pdfName ? `(${blog.pdfName})` : ""}
                        </a>
                    </div>
                ) : blog.coverImage && blog.coverImage !== "" ? (
                    <figure className="mb-12 rounded-3xl overflow-hidden border border-gray-200/80 bg-neutral-100/40 shadow-xs max-w-5xl">
                        <div className="w-full flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gradient-to-b from-neutral-50 to-neutral-100/30">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-auto max-h-[600px] object-contain rounded-2xl mx-auto"
                                loading="eager"
                            />
                        </div>
                    </figure>
                ) : null}

                {/* 2-Column Layout: Main Content + Sticky Sidebar */}
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                    {/* Main Content Column */}
                    <article className="lg:col-span-8 min-w-0">
                        {/* Mobile Table of Contents (Shown on mobile/tablet) */}
                        {headings.length > 0 && (
                            <div className="lg:hidden mb-10">
                                <BlogTableOfContents headings={headings} collapsible={true} />
                            </div>
                        )}

                        {/* Article Body Content */}
                        <div
                            className="blog-content font-sans text-gray-800 leading-relaxed max-w-none text-base sm:text-[17px]"
                            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(blog.content) }}
                        />

                        {/* In-Article Conversion Card */}
                        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white relative overflow-hidden shadow-lg border border-gray-800">
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
                                    <Zap className="w-3.5 h-3.5" /> Direct Technical Consultation
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                                    Planning a Custom Website or Web App in 2026?
                                </h3>
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                                    Avoid agency markups and hidden renewal fees. Speak with our lead architects for a transparent, itemized scope and architectural proposal tailored to your business goals.
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all text-sm shadow-sm"
                                    >
                                        Request Free Proposal <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                    <a
                                        href="https://wa.me/919461330819?text=Hi%20StitchByte%2C%20I%20am%20looking%20for%20a%20website%20consultation"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all text-sm shadow-sm"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Tags Section */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="pt-8 pb-6 border-t border-gray-200">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                                    Related Topics & Tags
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-medium rounded-full transition-colors cursor-default"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Article Footer Share Strip */}
                        <div className="py-6 border-t border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-gray-900">Enjoyed this article?</p>
                                <p className="text-xs text-gray-500">Share it with your teammates or network.</p>
                            </div>
                            <BlogShareBar title={blog.title} slug={blog.slug} />
                        </div>

                        {/* Author Bio Box — E-E-A-T */}
                        <div className="mt-10 p-6 sm:p-8 bg-neutral-50 rounded-3xl border border-gray-200/80">
                            <div className="flex flex-col sm:flex-row items-start gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white font-extrabold text-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                    {blog.author.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-base font-bold text-gray-950">{blog.author}</h4>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">Author</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        Published by the StitchByte engineering & design team. We build high-performance web applications, AI automation agents, and modern digital platforms for scaling businesses across India and globally.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-semibold text-indigo-600">
                                        <Link href="/about" className="hover:underline flex items-center gap-1">
                                            About StitchByte <ChevronRight className="w-3 h-3" />
                                        </Link>
                                        <Link href="/contact" className="hover:underline flex items-center gap-1">
                                            Work With Us <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Right Column: Sticky Sidebar (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 self-start">
                        {/* Table of Contents */}
                        {headings.length > 0 && (
                            <BlogTableOfContents headings={headings} />
                        )}

                        {/* Free Project Estimate Widget */}
                        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 border border-indigo-100 rounded-3xl p-6 shadow-sm">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
                                <Zap className="w-3.5 h-3.5 text-indigo-600" /> Free Estimate
                            </div>
                            <h4 className="text-lg font-extrabold text-gray-950 tracking-tight mb-2">
                                Planning a Website in 2026?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                                Tell us your idea. We provide a complete tech architecture roadmap and upfront quote within 24 hours.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-2xl transition-colors shadow-sm mb-2.5"
                            >
                                Request Free Proposal →
                            </Link>
                            <a
                                href="https://wa.me/919461330819?text=Hi%20StitchByte%2C%20I%20want%20a%20website%20cost%20estimate"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs sm:text-sm font-semibold rounded-2xl transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 text-emerald-600" /> Chat on WhatsApp
                            </a>
                        </div>

                        {/* Agency Trust Credentials Widget */}
                        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Why Build With StitchByte
                            </h4>
                            <div className="space-y-3 text-xs text-gray-600">
                                <div className="flex items-start gap-2.5">
                                    <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <span>Zero hidden agency fees or vendor lock-in</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Building2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <span>Production-tested Next.js & TypeScript architecture</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Zap className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <span>Under 2-hour technical support response</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Articles Section */}
                {relatedBlogs.length > 0 && (
                    <section className="mt-24 pt-16 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                    Continue Reading
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-3 tracking-tight">
                                    Related Articles & Guides
                                </h2>
                            </div>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                View all articles <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {relatedBlogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white border border-gray-200/90 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all flex flex-col h-full"
                                >
                                    {post.coverImage && (
                                        <div className="w-full aspect-[16/9] relative overflow-hidden bg-neutral-100">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                                            <span>{post.author}</span>
                                            <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                                                Read Guide →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </div>
    );
}
