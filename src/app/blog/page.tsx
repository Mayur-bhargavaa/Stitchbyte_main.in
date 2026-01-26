"use client";

import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Calendar,
    Clock,
    User,
    Tag,
    ChevronRight,
} from "lucide-react";
import Footer from "@/components/Footer";

// Sample blog posts - Replace with actual data from MongoDB later
const blogPosts = [
    {
        id: "1",
        title: "How to Choose the Right Tech Stack for Your Startup",
        excerpt: "Choosing the right technology stack is crucial for your startup's success. Learn about the key factors to consider when making this important decision.",
        author: "StitchByte Team",
        date: "January 20, 2026",
        readTime: "5 min read",
        category: "Technology",
        image: "/logo-stitchbyte.png",
    },
    {
        id: "2",
        title: "The Rise of AI in Web Development",
        excerpt: "Artificial Intelligence is transforming how we build websites and applications. Discover the latest trends and how AI can benefit your projects.",
        author: "StitchByte Team",
        date: "January 15, 2026",
        readTime: "7 min read",
        category: "AI & ML",
        image: "/logo-stitchbyte.png",
    },
    {
        id: "3",
        title: "Why Pre-built Solutions Are Perfect for Startups",
        excerpt: "Learn why pre-built solutions can save you time and money while still delivering a professional and scalable product for your business.",
        author: "StitchByte Team",
        date: "January 10, 2026",
        readTime: "4 min read",
        category: "Business",
        image: "/logo-stitchbyte.png",
    },
    {
        id: "4",
        title: "Building Scalable E-commerce Platforms",
        excerpt: "From small shops to enterprise solutions, learn the best practices for building e-commerce platforms that can grow with your business.",
        author: "StitchByte Team",
        date: "January 5, 2026",
        readTime: "6 min read",
        category: "E-commerce",
        image: "/logo-stitchbyte.png",
    },
];

export default function BlogPage() {
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

                {/* Hero Section */}
                <section className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
                    <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        Our Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Insights & Updates
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest trends in technology, development tips, and insights from our team.
                    </p>
                </section>

                {/* Blog Posts Grid */}
                <section className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="grid md:grid-cols-2 gap-8">
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all group"
                            >
                                {/* Post Header */}
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                            </div>
                                        </div>

                                        <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                            Read More
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-gray-100 text-gray-900 font-medium rounded-full border border-gray-200 hover:bg-gray-200 transition-all">
                            Load More Articles
                        </button>
                    </div>
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
