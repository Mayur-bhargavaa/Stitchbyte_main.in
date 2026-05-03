"use client";

import Link from "next/link";
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

    CheckCircle2,
    Award,
    TrendingUp,
    Users2,
    Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {

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
                <Navbar />

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
                            At StitchByte, we believe digital success is more than just code — it&apos;s SEO visibility, strong brand presence,
                            reliable web development, and intuitive UX/UI. We&apos;re a focused team helping businesses grow with clarity.
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
                                            <p className="text-gray-400 text-sm">SEO, Developers, Designers & Strategists</p>
                                        </div>
                                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                            <Code2 className="w-8 h-8 text-emerald-600 mb-3" />
                                            <div className="font-semibold text-gray-900">Growth-Ready Development</div>
                                            <p className="text-xs text-gray-500 mt-1">Fast, scalable web builds</p>
                                        </div>
                                        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                                            <Palette className="w-8 h-8 text-violet-600 mb-3" />
                                            <div className="font-semibold text-gray-900">Simple UX/UI</div>
                                            <p className="text-xs text-gray-500 mt-1">Clear and easy experiences</p>
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
                                    A Team for Growth & Experience
                                </h2>
                                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        We are a team of SEO specialists, developers, designers, and strategists focused on real business outcomes.
                                    </p>
                                    <p>
                                        Our strength lies in understanding your audience and building the right digital journey — from discoverability
                                        and trust to conversion-ready websites and products.
                                    </p>
                                    <p>
                                        We deliver both <strong>pre-built solutions</strong> (for fast launches) and <strong>custom development</strong>, with SEO and UX/UI
                                        integrated from the start.
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
                                What Makes StitchByte Different
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Rocket,
                                    title: "Fast + Reliable Delivery",
                                    description: "We move quickly while keeping performance, quality, and usability strong.",
                                    iconBg: "bg-orange-100",
                                    iconColor: "text-orange-600"
                                },
                                {
                                    icon: Lightbulb,
                                    title: "SEO + Digital Strategy",
                                    description: "We improve your visibility to reach more customers.",
                                    iconBg: "bg-amber-100",
                                    iconColor: "text-amber-600"
                                },
                                {
                                    icon: Handshake,
                                    title: "User-First UX/UI",
                                    description: "We create simple designs that people trust.",
                                    iconBg: "bg-emerald-100",
                                    iconColor: "text-emerald-600"
                                },
                                {
                                    icon: Package,
                                    title: "End-to-End Execution",
                                    description: "From strategy and design to development and optimization — we handle all stages.",
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
                                    To be the go-to growth partner for businesses worldwide — helping them strengthen
                                    digital presence through SEO, high-quality web platforms, and user-friendly experiences.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="group bg-white border border-gray-200 rounded-3xl p-10 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                                    <Heart className="w-7 h-7 text-violet-600" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To make digital growth simple, scalable, and measurable by combining strategy,
                                    design, and engineering into practical solutions that deliver real business results.
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
                                Benefits of Working With Us
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

                {/* SEO Content Section */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                A Leading Digital Agency in Jaipur
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                                What does a full-service digital agency do? At StitchByte, we help your business grow. We are based in Jaipur and offer complete digital solutions. We build websites, create mobile apps, and manage SEO. We also handle marketing and design. By putting everything under one roof, we save you time. Our goal is to help your brand succeed with clear results.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                                Why is this approach good for Jaipur businesses? Jaipur is a fast-growing city for business and tech. Local competition is increasing every day. You cannot afford to have separate teams for design, SEO, and development. We bring everyone together to work as one. This leads to faster websites and better marketing results for you.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                                We work with you every step of the way. We start by learning about your industry and your goals. We do not use generic templates. Instead, we build custom solutions that fit your needs. Whether you need an e-commerce site or a local SEO boost, we are here to help. We provide regular updates so you always know where your project stands.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Our mission is to help you scale your business. We combine expert engineering with creative marketing. This means your website will look great and attract more customers. You will have full ownership of your code with no hidden fees. StitchByte is a trusted partner for businesses in Jaipur looking to grow in the digital world.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                Core Pillars of Our Agency
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Strategic Digital Consulting", desc: "We study your business model and recommend the best tech and marketing for your goals." },
                                    { title: "Full-Stack Engineering Excellence", desc: "Our team builds fast and secure apps using modern tech like React and Next.js." },
                                    { title: "Data-Driven Marketing & SEO", desc: "We find new customers and leads through SEO and smart ad campaigns." },
                                    { title: "Human-Centric UI/UX Design", desc: "We design beautiful interfaces that are easy to use and help you get more sales." },
                                    { title: "Long-Term Growth Partnerships", desc: "We provide ongoing support to make sure your platform grows with your business." },
                                ].map((item) => (
                                    <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
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
                                    Ready to Build Your Digital Future?
                                </h2>
                                <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
                                    Let&apos;s grow your business with SEO, stronger digital presence, web development, and easy-to-use UX/UI built for real users.
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
