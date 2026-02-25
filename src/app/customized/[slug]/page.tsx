"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
    id: string;
    title: string;
    slug: string;
    description?: string;
    image: string;
    videoUrl?: string;
    features: string[];
    link: string;
    category: 'websites' | 'applications';
    technologies: string[];
}

export default function CustomizedAppDetailPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                setLoading(true);
                // We'll fetch all projects and find the matching slug.
                // Alternatively, if there's a specific endpoint for slug, we could use it, 
                // but fetching the category matching one or all is quick enough for now.
                const response = await fetch(`/api/custom-projects`);
                const data = await response.json();

                if (data.success) {
                    const found = data.data.find((p: Project) => p.slug === slug);
                    if (found) {
                        setProject(found);
                    } else {
                        setError("Project not found.");
                    }
                } else {
                    setError("Failed to load project details.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load project details.");
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Navbar />
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                    <p className="text-gray-500 font-medium">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Navbar />
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <Link href="/customized" className="px-6 py-3 bg-gray-900 text-white rounded-full">
                    Back to Customized Apps
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 relative z-10">
                {/* Background Grid */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-50"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <Link href="/customized" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Details */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    {project.title}
                                </h1>
                                {project.description && (
                                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                        {project.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
                                <div className="space-y-4">
                                    {project.features?.map((feature, i) => (
                                        <div key={i} className="flex gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                                            <p className="text-gray-600 leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {project.link && project.link !== '#' && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
                                >
                                    Visit Live App
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>

                        {/* Right Column: Media */}
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                {project.videoUrl ? (
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 relative">
                                        <video
                                            src={project.videoUrl}
                                            controls
                                            className="w-full h-full object-cover"
                                            poster={project.image}
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                                        {project.image && project.image !== '/projects/lal-sweets.png' ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                No preview available
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
