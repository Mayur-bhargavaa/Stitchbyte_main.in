"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    ExternalLink,
    Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Project {
    id: string;
    title: string;
    slug: string;
    description?: string;
    image: string;
    features: string[];
    link: string;
    category: 'websites' | 'applications';
    technologies: string[];
}

const marqueeItems = [
    "Built for Your Brand",
    "Designed to Convert",
    "SEO + UX from Day One",
    "Grow Your Digital Presence",
];

export default function CustomizedPage() {
    const [activeTab, setActiveTab] = useState<"websites" | "applications">("websites");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects from MongoDB
    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const response = await fetch(`/api/custom-projects?category=${activeTab}`);
                const data = await response.json();

                if (data.success) {
                    setProjects(data.data);
                } else {
                    setError('Failed to load projects');
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-white text-gray-900">

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section - White Theme with Modern Grid */}
                <section className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
                    {/* Modern Grid Background */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Larger Grid Overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '240px 240px'
                        }}
                    />

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-20 left-10 w-40 h-40">
                        <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
                        <div className="absolute top-4 left-4 w-full h-full border border-gray-300 rounded-3xl rotate-12 opacity-30" />
                    </div>
                    <div className="absolute bottom-32 right-10 w-32 h-32">
                        <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
                        <div className="absolute top-3 left-3 w-full h-full border border-gray-300 rounded-full opacity-30" />
                    </div>
                    <div className="absolute top-1/3 right-20 w-4 h-4 bg-gray-900 rounded-full opacity-20" />
                    <div className="absolute top-1/2 left-16 w-3 h-3 bg-gray-900 rounded-full opacity-15" />
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gray-900 rounded-full opacity-10" />
                    {/* Main Content */}
                    <div className="relative z-10 text-center max-w-4xl">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Customized Development
                            <br />
                            for Business Growth
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            We build tailored platforms from scratch with SEO-ready architecture, conversion-focused UX/UI,
                            and clear user journeys aligned to your business goals.
                        </p>
                    </div>

                    {/* Scrolling Marquee */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-4 overflow-hidden">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                                <span key={i} className="mx-8 text-lg font-medium text-white flex items-center gap-3">
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="max-w-6xl mx-auto px-6 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
                            Projects
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                            Customized Software Projects
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Explore selected builds focused on digital presence, better engagement, and measurable business outcomes.
                        </p>

                        {/* Tabs */}
                        <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-full">
                            <button
                                onClick={() => setActiveTab("websites")}
                                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${activeTab === "websites"
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Websites
                            </button>
                            <button
                                onClick={() => setActiveTab("applications")}
                                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${activeTab === "applications"
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Applications
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            <span className="ml-3 text-gray-500">Loading projects...</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-16">
                            <p className="text-red-500">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Project Cards */}
                    {!loading && !error && (
                        <div className="space-y-16">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        } gap-8 md:gap-12 items-center`}
                                >
                                    {/* Project Image */}
                                    <div className="w-full md:w-1/2">
                                        <div className="bg-gray-50/80 rounded-[32px] p-5 sm:p-7 aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200/40 shadow-sm">
                                            <div className="bg-white rounded-[24px] p-3 sm:p-4 shadow-lg border border-gray-100/80 w-full h-full flex flex-col justify-between">
                                                {/* Browser Chrome Header */}
                                                <div className="bg-gray-50/80 border-b border-gray-100/80 px-3 py-2 flex items-center justify-between select-none rounded-t-xl mb-3">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                                                        <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                                                        <div className="w-2 h-2 rounded-full bg-green-400/80" />
                                                    </div>
                                                    <div className="h-4.5 w-32 bg-white border border-gray-100 rounded-md text-[8px] font-mono text-gray-400 flex items-center justify-center">
                                                        {project.slug}.in
                                                    </div>
                                                    <div className="w-6" />
                                                </div>
                                                
                                                {/* Image Container */}
                                                <div className="relative flex-1 w-full bg-white flex items-center justify-center overflow-hidden rounded-lg border border-gray-100">
                                                    {project.image && project.image !== '/projects/lal-sweets.png' ? (
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover object-top"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-400">
                                                            <span className="text-xs sm:text-sm">Project Preview</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="w-full md:w-1/2">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                            {project.title}
                                        </h3>

                                        {/* Technologies */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {project.features.map((feature, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <p className="text-gray-600 leading-relaxed">{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {project.link && project.link !== '#' && (
                                            <Link
                                                href={`/customized/${project.slug}`}
                                                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                        {(!project.link || project.link === '#') && (
                                            <Link href={`/customized/${project.slug}`} className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !error && projects.length === 0 && (
                        <div className="py-20">
                            {/* Animated Empty State */}
                            <div className="relative max-w-md mx-auto">
                                {/* Floating animated icons */}
                                <div className="relative h-48 flex items-center justify-center">
                                    {/* Central pulsing circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-gray-100 rounded-full animate-pulse" />
                                        <div className="absolute w-24 h-24 bg-gray-200 rounded-full animate-ping opacity-20" />
                                    </div>

                                    {/* Floating cards */}
                                    <div className="absolute top-0 left-1/4 w-16 h-12 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '0ms', animationDuration: '2s' }}>
                                        <div className="p-2">
                                            <div className="w-8 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-6 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute top-4 right-1/4 w-14 h-10 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '300ms', animationDuration: '2.5s' }}>
                                        <div className="p-2">
                                            <div className="w-6 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-4 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-1/3 w-12 h-10 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '600ms', animationDuration: '2.2s' }}>
                                        <div className="p-2">
                                            <div className="w-5 h-1.5 bg-gray-200 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-1/3 w-14 h-12 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '900ms', animationDuration: '1.8s' }}>
                                        <div className="p-2">
                                            <div className="w-6 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-8 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    {/* Center icon */}
                                    <div className="relative z-10 w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
                                        <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Text content */}
                                <div className="text-center mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
                                    <p className="text-gray-500 mb-6">We're working on amazing {activeTab} projects. Check back soon!</p>

                                    {/* Animated progress bar */}
                                    <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
                                        <div className="h-full bg-gray-900 rounded-full animate-loading-bar" style={{
                                            animation: 'loading-bar 2s ease-in-out infinite'
                                        }} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">Coming soon...</p>
                                </div>
                            </div>

                            {/* CSS for loading bar animation */}
                            <style jsx>{`
                                @keyframes loading-bar {
                                    0% { width: 0%; margin-left: 0; }
                                    50% { width: 60%; margin-left: 20%; }
                                    100% { width: 0%; margin-left: 100%; }
                                }
                            `}</style>
                        </div>
                    )}
                </section>

                {/* SEO Content Section */}
                <section className="max-w-5xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Custom Web Development in Alwar
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                What is custom web development? Basic templates might work for some, but your brand needs a unique digital experience. Customized development is the best path forward for growth. At StitchByte, we build tailored websites and web apps from scratch in Alwar. We design software around your specific business needs and long-term goals.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Why is this important for Alwar businesses? Jaipur is a busy hub for business and tech. Local competition is growing fast. You need a fast and secure website to stand out. Customers expect smooth online experiences today. A slow website can drive clients to your competitors. Custom development helps you automate sales and provide a great user experience. It helps Alwar businesses compete on a global scale.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We focus on transparency and results. Every project starts with a clear plan. We learn about your audience and your goals before we write any code. Our team then creates designs for you to review. Once you approve, we build the site using modern tech like Next.js. We test everything thoroughly on all devices before we launch.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We build in SEO and mobile support from the start. You will own 100% of your code with no hidden fees. We help with corporate sites, e-commerce stores, and complex apps. Our Jaipur team provides ongoing support as your business grows. We make sure your platform stays updated and fast.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                What Our Custom Builds Include
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "SEO-First Architecture", desc: "Clean URL structures, semantic HTML, structured data, and fast page loads built into the foundation — not bolted on later." },
                                    { title: "Conversion-Focused UX", desc: "User journeys designed to reduce friction at every step. We optimize forms, CTAs, navigation, and content flow for measurable outcomes." },
                                    { title: "Scalable Tech Stack", desc: "We use modern frameworks like Next.js, React, and Node.js to build platforms that handle growth without performance compromise." },
                                    { title: "Full Code Ownership", desc: "You own 100% of the source code. No vendor lock-in, no recurring license fees, and full freedom to modify or extend your platform." },
                                    { title: "Post-Launch Support", desc: "We provide ongoing maintenance, performance monitoring, and iterative improvements based on real user data and analytics." },
                                ].map((item) => (
                                    <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Ready for a Custom Development Solution?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Let&apos;s plan a customized solution that improves visibility, user experience, and conversions.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Start Your Strategy
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>

                {/* Shared Footer Component */}
                <Footer />
            </div>
        </div>
    );
}
