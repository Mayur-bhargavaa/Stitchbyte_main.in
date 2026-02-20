"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Share2, Loader2, Link as LinkIcon, Download } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    createdAt: string;
    category: string;
    readTime: string;
    tags: string[];
    status: string;
    coverImage?: string;
    pdfUrl?: string;
    pdfName?: string;
}

export default function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const resolvedParams = use(params);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/${resolvedParams.slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                }
            } catch (error) {
                console.error("Failed to fetch blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [resolvedParams.slug]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog?.title,
                    url: url,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
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
                        {/* <Link href="/blog" className="px-4 py-2 text-sm text-gray-900 font-medium bg-gray-100 rounded-full transition-colors">
                            Blog
                        </Link> */}
                        <Link href="/about" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </nav>
            </header>

            {loading ? (
                <div className="flex justify-center items-center min-h-screen pt-20">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            ) : !blog ? (
                <div className="flex flex-col justify-center items-center min-h-screen pt-20">
                    <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
                    <Link href="/blog" className="text-indigo-600 hover:underline flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Blogs
                    </Link>
                </div>
            ) : (
                <>
                    {/* Main Content */}
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

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
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
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        {copied ? <LinkIcon className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-gray-600" />}
                                        <span className="text-sm font-medium text-gray-700">{copied ? "Copied!" : "Share"}</span>
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image/PDF */}
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
                                    <Download className="w-5 h-5" /> Download PDF {blog.pdfName ? `(${blog.pdfName})` : ''}
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

                        {/* Article Content */}
                        <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed">
                            {/* If content is HTML, dangerouslySetInnerHTML. If it's markdown, we'd use a markdown parser. 
                  Assuming HTML/plain text for now based on schema */}
                            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
                        </div>

                        {/* Bottom Share */}
                        <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
                            <p className="font-medium text-gray-900">Share this article</p>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 justify-center transition-colors"
                                aria-label="Share"
                            >
                                {copied ? <LinkIcon className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-gray-600" />}
                            </button>
                        </div>
                    </article>
                    <Footer />
                </>
            )}
        </div>
    );
}
