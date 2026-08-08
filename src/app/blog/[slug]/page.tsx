import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Footer from "@/components/Footer";
import { blogPrisma } from "@/lib/prisma";
import BlogClientActions from "./BlogClientActions";

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
            ...(blog.coverImage ? { images: [{ url: blog.coverImage, width: 1200, height: 630 }] } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.excerpt || "",
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
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* JSON-LD — rendered server-side, visible to Googlebot */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navigation */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <nav className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-2 py-2 shadow-lg shadow-black/5">
                    <div className="flex items-center gap-1">
                        <Link href="/prebuilt" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            Prebuilt
                        </Link>
                        <Link href="/customized" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            Customized
                        </Link>
                        <Link href="/" className="px-3 py-1 flex items-center">
                            <Image
                                src="/logo-stitchbyte.png"
                                alt="StitchByte"
                                width={120}
                                height={32}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <Link href="/about" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </nav>
            </header>

            <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                            {blog.category}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {blog.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                        {blog.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-t border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{blog.author}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                                </p>
                            </div>
                        </div>

                        {/* Client-only: share button */}
                        <BlogClientActions title={blog.title} />
                    </div>
                </header>

                {/* Cover image or PDF — server-rendered */}
                {blog.pdfUrl && blog.pdfUrl !== "" ? (
                    <div className="mb-12 border border-gray-100 bg-white rounded-3xl p-8 text-center shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Attached Document</h3>
                        <p className="text-gray-500 mb-6 font-medium">This article includes a PDF document for you to download.</p>
                        <a
                            href={blog.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={blog.pdfName || "document.pdf"}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Download PDF {blog.pdfName ? `(${blog.pdfName})` : ""}
                        </a>
                    </div>
                ) : blog.coverImage && blog.coverImage !== "" ? (
                    <figure className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                        <div className="relative w-full aspect-[21/9]">
                            <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </figure>
                ) : null}

                {/* Article content — server-rendered, fully crawlable */}
                <div
                    className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br/>") }}
                />

                {/* Bottom share */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
                    <p className="font-medium text-gray-900">Share this article</p>
                    <BlogClientActions title={blog.title} iconOnly />
                </div>

                {/* Author bio — E-E-A-T */}
                <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Written by</p>
                            <h4 className="text-lg font-bold text-gray-900">{blog.author}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Content published by the StitchByte team — experts in SEO, web development, UX/UI design, and digital marketing.
                                We share insights from real projects to help businesses grow online.
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                                <Link href="/about" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                                    About our team →
                                </Link>
                                <span className="text-gray-300">|</span>
                                <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                                    More articles →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
}
