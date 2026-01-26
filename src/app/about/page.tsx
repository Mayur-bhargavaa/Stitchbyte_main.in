"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Users,
    ArrowRight,
    Rocket,
    Lightbulb,
    Handshake,
    Package,
    Target,
    Heart,
    Zap,
    Globe,
    Code2,
    Palette,
    Menu,
    X,
    CheckCircle2,
    Award,
    TrendingUp,
    Users2,
    Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500/20">
            {/* Global Grid Background - Same as Home Page */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '240px 240px'
                }}
            />

            {/* Decorative Corner Elements - Same as Home Page */}
            <div className="fixed top-20 left-10 w-40 h-40 z-0 pointer-events-none">
                <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
                <div className="absolute top-4 left-4 w-full h-full border border-gray-300 rounded-3xl rotate-12 opacity-30" />
            </div>
            <div className="fixed bottom-32 right-10 w-32 h-32 z-0 pointer-events-none">
                <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
                <div className="absolute top-3 left-3 w-full h-full border border-gray-300 rounded-full opacity-30" />
            </div>
            <div className="fixed top-1/3 right-20 w-4 h-4 bg-gray-900 rounded-full opacity-20 z-0 pointer-events-none" />
            <div className="fixed top-1/2 left-16 w-3 h-3 bg-gray-900 rounded-full opacity-15 z-0 pointer-events-none" />
            <div className="fixed bottom-1/3 right-1/4 w-2 h-2 bg-gray-900 rounded-full opacity-10 z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
                    {/* Mobile Nav */}
                    <nav className="md:hidden bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-4 py-3 shadow-lg shadow-black/5 flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo-stitchbyte.png"
                                alt="StitchByte"
                                width={100}
                                height={28}
                                className="h-7 w-auto"
                            />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                        </button>
                    </nav>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex justify-center">
                        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-2 py-2 shadow-lg shadow-black/5">
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
                                <Link href="/about" className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-full font-medium">
                                    About Us
                                </Link>
                                <Link href="/contact" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-xl z-40 animate-fade-in">
                            <div className="flex flex-col items-center justify-center h-full gap-6 -mt-16">
                                <Link href="/prebuilt" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                    Prebuilt
                                </Link>
                                <Link href="/customized" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                    Customized
                                </Link>
                                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                    About Us
                                </Link>
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-200/40 to-purple-300/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-300/30 rounded-full blur-3xl" />

                    <div className="relative max-w-5xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-lg mb-8">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            About StitchByte
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            Building the{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10">Digital Future</span>
                                <span className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10 rounded" />
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                            At StitchByte, we believe technology isn&apos;t just about code — it&apos;s about creating possibilities,
                            building trust, and driving growth. We&apos;re a passionate team turning ideas into powerful digital products.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {[
                                { value: "50+", label: "Projects Delivered" },
                                { value: "4+", label: "Years Experience" },
                                { value: "15+", label: "Countries Served" },
                                { value: "100%", label: "Client Satisfaction" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left - Image/Visual */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-cyan-200/50 rounded-3xl blur-3xl scale-95" />
                                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Team Visual */}
                                        <div className="col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                                            <Users2 className="w-10 h-10 mb-4 text-emerald-400" />
                                            <div className="text-2xl font-bold mb-1">Creative Team</div>
                                            <p className="text-gray-400 text-sm">Developers, Designers & Strategists</p>
                                        </div>
                                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                            <Code2 className="w-8 h-8 text-emerald-600 mb-3" />
                                            <div className="font-semibold text-gray-900">Clean Code</div>
                                            <p className="text-xs text-gray-500 mt-1">Modern tech stacks</p>
                                        </div>
                                        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                                            <Palette className="w-8 h-8 text-violet-600 mb-3" />
                                            <div className="font-semibold text-gray-900">Great Design</div>
                                            <p className="text-xs text-gray-500 mt-1">User-centric UI/UX</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Content */}
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                                    Who We Are
                                </span>
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                    A Team of Innovators
                                </h2>
                                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        We are a team of creative developers, designers, and strategists who blend innovation with execution.
                                    </p>
                                    <p>
                                        Our strength lies in understanding every client&apos;s vision deeply and turning it into a digital reality —
                                        whether it&apos;s an e-commerce app, food delivery system, SaaS platform, or a complete business ecosystem.
                                    </p>
                                    <p>
                                        We specialize in both <strong>pre-built solutions</strong> (for fast and affordable launches) and <strong>custom development</strong>
                                        (for unique, tailor-made platforms).
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map((tech) => (
                                        <span key={tech} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What Makes Us Different Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-6 border border-amber-100">
                                Our Approach
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                What Makes Us Different
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Rocket,
                                    title: "Speed + Quality",
                                    description: "We deliver fast without compromising on performance or design.",
                                    iconBg: "bg-orange-100",
                                    iconColor: "text-orange-600"
                                },
                                {
                                    icon: Lightbulb,
                                    title: "Innovation First",
                                    description: "We stay ahead with modern tech stacks and creative problem-solving.",
                                    iconBg: "bg-amber-100",
                                    iconColor: "text-amber-600"
                                },
                                {
                                    icon: Handshake,
                                    title: "Client-Centric",
                                    description: "Your success is our priority. We listen, understand, and build accordingly.",
                                    iconBg: "bg-emerald-100",
                                    iconColor: "text-emerald-600"
                                },
                                {
                                    icon: Package,
                                    title: "End-to-End",
                                    description: "From idea to launch and beyond — we handle it all with care.",
                                    iconBg: "bg-violet-100",
                                    iconColor: "text-violet-600"
                                },
                            ].map((item, i) => (
                                <div key={i} className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Vision */}
                            <div className="group bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                                    <Target className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To be the go-to digital partner for startups and businesses worldwide —
                                    enabling them to build, launch, and scale with confidence. We envision a future
                                    where every business, big or small, has access to world-class technology and design.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="group bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                                    <Heart className="w-7 h-7 text-violet-600" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To make technology simple, scalable, and impactful. We&apos;re driven by passion
                                    to create digital products that not only look stunning but also deliver real
                                    business results for our clients across the globe.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Work With Us Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full mb-6 border border-cyan-100">
                                Benefits
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                Why Work With Us
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: CheckCircle2, text: "100% Source Code Ownership" },
                                { icon: Award, text: "Premium Quality Standards" },
                                { icon: Globe, text: "Global Client Base" },
                                { icon: Zap, text: "Fast Turnaround Time" },
                                { icon: TrendingUp, text: "Scalable Solutions" },
                                { icon: Users, text: "Dedicated Support Team" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-gray-900 transition-colors">
                                        <item.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="font-semibold text-gray-900">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 via-teal-200/50 to-cyan-200/50 rounded-3xl blur-3xl" />
                            <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    Ready to Build Something Amazing?
                                </h2>
                                <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
                                    Let&apos;s turn your idea into reality. Whether you need a prebuilt solution or custom development, we&apos;re here to help you succeed.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1"
                                    >
                                        Get in Touch
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/prebuilt"
                                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
                                    >
                                        Explore Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shared Footer Component */}
                <Footer />
            </div>
        </div >
    );
}
