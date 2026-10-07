"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Calendar,
    Clock,
    User,
    Tag,
    ChevronRight,
    Loader2,
    FileText
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    createdAt: string;
    readTime: string;
    category: string;
    coverImage?: string;
    pdfUrl?: string;
}

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);
    const [loading, setLoading] = useState(true);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();
                    setBlogPosts(data);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Modern Grid Background */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(200, 200, 200, 0.5) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(200, 200, 200, 0.5) 1px, transparent 1px)
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

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <section className="max-w-4xl mx-auto px-6 pt-40 sm:pt-48 md:pt-52 pb-12 sm:pb-16 text-center">
                    <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        Our Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 text-center leading-[1.1] mb-6">
                        Insights & Updates
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-500 font-normal max-w-2xl mx-auto leading-relaxed mb-10 text-center">
                        Stay updated with the latest trends in technology, development tips, and insights from our team.
                    </p>
                </section>

                {/* Blog Posts Grid */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        </div>
                    ) : blogPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No blog posts found.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {blogPosts.slice(0, visibleCount).map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                                    <article className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
                                        {/* Image Section */}
                                        {post.coverImage && (
                                            <div className="w-full aspect-[16/9] relative overflow-hidden bg-neutral-100">
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            </div>
                                        )}

                                        {/* Post Header */}
                                        <div className="p-6 sm:p-7 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                    {post.category}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-medium text-gray-900">{post.author}</p>
                                                        <p className="text-[11px] text-gray-500">
                                                            {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                                                    Read More
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {visibleCount < blogPosts.length && (
                        <div className="text-center mt-12 sm:mt-16">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-full border border-gray-200 transition-all shadow-xs hover:shadow-sm text-sm sm:text-base cursor-pointer active:scale-95"
                            >
                                Load More Articles
                                <span className="text-xs text-gray-500 font-normal">
                                    ({blogPosts.length - visibleCount} more)
                                </span>
                            </button>
                        </div>
                    )}
                </section>

                {/* Newsletter CTA */}
                <section className="max-w-4xl mx-auto px-6 pb-24">
                    <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Get the latest articles and insights delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                            />
                            <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
