import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
    ArrowLeft, 
    ExternalLink, 
    CheckCircle2,
    Smartphone,
    Shield,
    Zap,
    Sparkles,
    Clock,
    Layers,
    Cpu,
    Code
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import ExpandableText from "@/components/ExpandableText";
import { getCustomProject, getCustomProjects } from "@/lib/content";

const featureIcons = [Smartphone, Shield, Zap, Sparkles, Clock, Layers, Cpu, Code];

const splitFeature = (featureText: string) => {
    let title = featureText;
    let description = "";

    if (featureText.includes(" — ")) {
        const parts = featureText.split(" — ");
        title = parts[0].trim();
        description = parts.slice(1).join(" — ").trim();
    } else if (featureText.includes(" - ")) {
        const parts = featureText.split(" - ");
        title = parts[0].trim();
        description = parts.slice(1).join(" - ").trim();
    } else if (featureText.includes(": ")) {
        const parts = featureText.split(": ");
        title = parts[0].trim();
        description = parts.slice(1).join(": ").trim();
    } else if (featureText.includes(" (")) {
        const parts = featureText.split(" (");
        title = parts[0].trim();
        description = parts.slice(1).join(" (").replace(")", "").trim();
    }

    return { title, description };
};


export const revalidate = 3600;

export async function generateStaticParams() {
    const projects = await getCustomProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function CustomizedAppDetailPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug: rawSlug } = await params;
    const project = await getCustomProject(decodeURIComponent(rawSlug));

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Customized Development", path: "/customized" },
                { name: project.title, path: `/customized/${project.slug}` },
            ])} />
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
                                    <ExpandableText text={project.description} />
                                )}

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                            {tech}
                                        </span>
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

                    {/* Why Choose Section */}
                    <section className="mt-24 pt-20 border-t border-gray-100">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                                Why Us
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                Why Choose {project.title.trim()}?
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                {project.description ? `${project.description.slice(0, 150)}...` : "A complete custom-engineered solution built to match standard business processes and user requirements."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-16">
                            {/* Left Column of Features */}
                            <div className="lg:col-span-4 space-y-12">
                                {project.features?.slice(0, Math.ceil((project.features?.length || 0) / 2)).map((featureText, idx) => {
                                    const { title, description } = splitFeature(featureText);
                                    const IconComponent = featureIcons[idx % featureIcons.length];
                                    return (
                                        <div key={idx} className="flex flex-col items-start text-left">
                                            <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-5 shadow-xs">
                                                <IconComponent className="w-5 h-5 text-gray-700" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
                                                {description ? (
                                                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                                                ) : (
                                                    <p className="text-gray-500 text-sm leading-relaxed">Engineered with high performance, scalability, and clean code best practices.</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Center Column with Mockup Image */}
                            <div className="lg:col-span-4 flex justify-center items-center py-6">
                                <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none">
                                    {/* Browser Mockup Window */}
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 bg-gray-50/50 shadow-lg">
                                        {/* Browser Chrome Header */}
                                        <div className="bg-gray-100/80 border-b border-gray-200/80 px-4 py-2.5 flex items-center justify-between select-none">
                                            {/* Window controls */}
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                            </div>
                                            {/* Simulated address bar */}
                                            <div className="h-5 w-40 bg-white border border-gray-200/80 rounded-md text-[8px] font-mono text-gray-400 flex items-center justify-center tracking-wide">
                                                {project.slug}.in
                                            </div>
                                            <div className="w-8" />
                                        </div>

                                        {/* Image Container */}
                                        <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 30vw"
                                                />
                                            ) : (
                                                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                    No Preview Available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Right Column of Features */}
                            <div className="lg:col-span-4 space-y-12">
                                {project.features?.slice(Math.ceil((project.features?.length || 0) / 2)).map((featureText, idx) => {
                                    const offset = Math.ceil((project.features?.length || 0) / 2);
                                    const { title, description } = splitFeature(featureText);
                                    const IconComponent = featureIcons[(idx + offset) % featureIcons.length];
                                    return (
                                        <div key={idx} className="flex flex-col items-start text-left">
                                            <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-5 shadow-xs">
                                                <IconComponent className="w-5 h-5 text-gray-700" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
                                                {description ? (
                                                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                                                ) : (
                                                    <p className="text-gray-500 text-sm leading-relaxed">Engineered with high performance, scalability, and clean code best practices.</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
