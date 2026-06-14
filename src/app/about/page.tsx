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
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '240px 240px'
                }}
            />

            {/* Decorative Corner Elements */}
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
                <section className="relative min-h-[45vh] flex items-center justify-center px-6 pt-36 pb-12 overflow-hidden">
                    {/* Decorative Blurs */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-200/40 to-purple-300/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-300/30 rounded-full blur-3xl pointer-events-none" />

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

                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            At StitchByte, we believe digital success is more than just code — it&apos;s SEO visibility, strong brand presence,
                            reliable web development, and intuitive UX/UI. We&apos;re a focused team helping businesses grow with clarity.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 border-t border-gray-100 bg-slate-50/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            {/* Left - Story Narrative */}
                            <div className="lg:col-span-7">
                                <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                                    Who We Are
                                </span>
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    A Team Dedicated to Growth & Digital Experience
                                </h2>
                                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        We are a team of SEO specialists, developers, designers, and strategists focused on real business outcomes. We cut through the noise to build websites and products that solve practical problems.
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

                                <div className="mt-10 flex flex-wrap gap-2.5">
                                    {["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map((tech) => (
                                        <span key={tech} className="px-4.5 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200 shadow-xs hover:border-gray-350 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Expertise DNA Grid */}
                            <div className="lg:col-span-5 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-violet-100/50 rounded-3xl blur-2xl scale-95 pointer-events-none" />
                                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-200/80">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 bg-gradient-to-br from-gray-950 to-gray-900 rounded-2xl p-6 text-white">
                                            <Users2 className="w-10 h-10 mb-4 text-emerald-400 animate-pulse" />
                                            <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>Creative Team</div>
                                            <p className="text-gray-400 text-xs leading-relaxed">SEO Analysts, Developers, Visual Designers & Launch Strategists working together.</p>
                                        </div>
                                        {[
                                            {
                                                title: "Growth Development",
                                                desc: "Fast, scalable web builds",
                                                icon: Code2,
                                                bg: "bg-emerald-50/50",
                                                border: "border-emerald-100",
                                                iconColor: "text-emerald-600"
                                            },
                                            {
                                                title: "Simple UX/UI",
                                                desc: "Clear visual systems",
                                                icon: Palette,
                                                bg: "bg-violet-50/50",
                                                border: "border-violet-100",
                                                iconColor: "text-violet-600"
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className={`rounded-2xl p-5 border ${item.border} ${item.bg} hover:shadow-xs transition-shadow`}>
                                                <item.icon className={`w-8 h-8 ${item.iconColor} mb-3`} />
                                                <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                                                <p className="text-xs text-gray-500 mt-1 leading-normal">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="py-24 border-t border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Section Header */}
                        <div className="text-center mb-16 space-y-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-100">
                                <Users className="w-4 h-4 text-emerald-600" />
                                Our Team
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                Meet the Minds Behind StitchByte
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                                A focused collective of founders, creators, and specialists engineering premium digital experiences.
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    name: "Mayur Bhargava",
                                    role: "Founder & CEO",
                                    image: "/mayur.jpg",
                                    bio: "Leading the long-term vision, strategic execution, technology roadmap, and agency operations at StitchByte to build conversion-centric web and product infrastructure."
                                },
                                {
                                    name: "Dhruv",
                                    role: "Co-founder & AI/ML Specialist",
                                    image: "/dhruv.jpg",
                                    bio: "Architecting advanced AI implementations, search engines, machine learning pipelines, and smart automation to power scalable solutions."
                                },
                                {
                                    name: "Mayank",
                                    role: "Designing Head",
                                    image: "/mayank.jpg",
                                    bio: "Shaping the visual identity, premium user interfaces, and intuitive user experiences built to command brand trust and client success."
                                }
                            ].map((member, i) => (
                                <div key={i} className="group bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-500 flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden w-full">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-103"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            priority={i === 0}
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    {/* Info Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <span className="text-xs font-bold text-emerald-650 tracking-wider uppercase mb-2 block">
                                            {member.role}
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-650 text-sm leading-relaxed mb-6 flex-1">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Philosophy & Bento Grid for Core Values and Mission */}
                <section className="py-24 border-t border-gray-100 bg-slate-50/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-6 border border-amber-100">
                                Philosophy
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                What Makes StitchByte Different
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Card 1: Our Vision & Mission (Merged Column) */}
                            <div className="md:col-span-1 bg-gradient-to-br from-gray-950 to-gray-900 text-white border border-gray-800 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-emerald-450 border border-white/5 text-[10px] font-bold tracking-wider uppercase rounded-full mb-8">
                                        <Target className="w-3.5 h-3.5" />
                                        Core Focus
                                    </span>
                                    <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Our Vision & Mission</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                        To be the go-to growth partner for businesses worldwide — strengthening digital presence through search visibility, engineering excellence, and design purity.
                                    </p>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        We make digital growth simple, scalable, and measurable by combining strategy, design, and engineering into practical solutions that deliver real business results.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-8">
                                    <p className="text-xs text-gray-400">Founded on transparency and real business outcomes.</p>
                                </div>
                            </div>

                            {/* Values Cards */}
                            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: Rocket,
                                        title: "Fast + Reliable Delivery",
                                        desc: "We move quickly while keeping performance, accessibility, and clean architecture strong.",
                                        bg: "hover:border-orange-200/80 hover:shadow-orange-500/[0.02]",
                                        iconBg: "bg-orange-50",
                                        iconColor: "text-orange-600"
                                    },
                                    {
                                        icon: Lightbulb,
                                        title: "SEO-First Approach",
                                        desc: "We integrate discoverability and organic search logic directly into the foundation of everything we build.",
                                        bg: "hover:border-amber-200/80 hover:shadow-amber-500/[0.02]",
                                        iconBg: "bg-amber-50",
                                        iconColor: "text-amber-600"
                                    },
                                    {
                                        icon: Handshake,
                                        title: "User-First UX/UI Design",
                                        desc: "We create simple, conversion-ready designs that command trust and feel effortless.",
                                        bg: "hover:border-emerald-200/80 hover:shadow-emerald-500/[0.02]",
                                        iconBg: "bg-emerald-50",
                                        iconColor: "text-emerald-600"
                                    },
                                    {
                                        icon: Package,
                                        title: "End-to-End Execution",
                                        desc: "From blueprint strategy and visual assets to technical build-out and ongoing support.",
                                        bg: "hover:border-violet-200/80 hover:shadow-violet-500/[0.02]",
                                        iconBg: "bg-violet-50",
                                        iconColor: "text-violet-600"
                                    }
                                ].map((val, i) => (
                                    <div key={i} className={`bg-white border border-gray-200 rounded-3xl p-6.5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between hover:border-gray-300 ${val.bg}`}>
                                        <div>
                                            <div className={`w-12 h-12 rounded-2xl ${val.iconBg} flex items-center justify-center mb-5`}>
                                                <val.icon className={`w-6 h-6 ${val.iconColor}`} />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 border-t border-gray-100 bg-white">
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
                                { icon: CheckCircle2, text: "100% Source Code Ownership", desc: "No licensing lock-in or hidden monthly fees." },
                                { icon: Award, text: "Premium Quality Standards", desc: "Clean TypeScript and optimized Next.js frameworks." },
                                { icon: Globe, text: "Global Client Base", desc: "Delivering solutions across multiple time zones." },
                                { icon: Zap, text: "Fast Turnaround Time", desc: "Deployment ready prebuilts and rapid custom builds." },
                                { icon: TrendingUp, text: "Scalable Solutions", desc: "Architecture prepared for high traffic spikes." },
                                { icon: Users, text: "Dedicated Support Team", desc: "Ongoing partnership to monitor and scale your project." },
                            ].map((item, i) => (
                                <div key={i} className="group p-6 bg-white border border-gray-200 rounded-3xl hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                                            <item.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base mb-1.5">{item.text}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Jaipur SEO Editorial Section */}
                <section className="py-24 border-t border-gray-100 bg-slate-50/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            {/* Left block - Editorial Text */}
                            <div className="lg:col-span-7 space-y-6">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    A Leading Digital Agency in Jaipur
                                </h2>
                                <div className="space-y-6 text-gray-650 text-base leading-relaxed">
                                    <p>
                                        What does a full-service digital agency do? At StitchByte, we help your business grow. We are based in Jaipur and offer complete digital solutions. We build websites, create mobile apps, and manage SEO. We also handle marketing and design. By putting everything under one roof, we save you time. Our goal is to help your brand succeed with clear results.
                                    </p>
                                    <p>
                                        Why is this approach good for Jaipur businesses? Jaipur is a fast-growing city for business and tech. Local competition is increasing every day. You cannot afford to have separate teams for design, SEO, and development. We bring everyone together to work as one. This leads to faster websites and better marketing results for you.
                                    </p>
                                    <p>
                                        We work with you every step of the way. We start by learning about your industry and your goals. We do not use generic templates. Instead, we build custom solutions that fit your needs. Whether you need an e-commerce site or a local SEO boost, we are here to help. We provide regular updates so you always know where your project stands.
                                    </p>
                                    <p>
                                        Our mission is to help you scale your business. We combine expert engineering with creative marketing. This means your website will look great and attract more customers. You will have full ownership of your code with no hidden fees. StitchByte is a trusted partner for businesses in Jaipur looking to grow in the digital world.
                                    </p>
                                </div>
                            </div>

                            {/* Right block - Core Pillars */}
                            <div className="lg:col-span-5 space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    Core Pillars of Our Agency
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Strategic Digital Consulting", desc: "We study your business model and recommend the best tech and marketing for your goals." },
                                        { title: "Full-Stack Engineering Excellence", desc: "Our team builds fast and secure apps using modern tech like React and Next.js." },
                                        { title: "Data-Driven Marketing & SEO", desc: "We find new customers and leads through SEO and smart ad campaigns." },
                                        { title: "Human-Centric UI/UX Design", desc: "We design beautiful interfaces that are easy to use and help you get more sales." },
                                        { title: "Long-Term Growth Partnerships", desc: "We provide ongoing support to make sure your platform grows with your business." },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs hover:border-gray-300 transition-all duration-350">
                                            <div className="flex items-start gap-4">
                                                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5 mt-0.5">
                                                    0{idx + 1}
                                                </span>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1 text-base">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 border-t border-gray-100 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 via-teal-200/50 to-cyan-200/50 rounded-[2.5rem] blur-3xl pointer-events-none" />
                            <div className="relative bg-white rounded-[2.5rem] p-12 sm:p-16 shadow-2xl border border-gray-100 overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
                                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

                                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    Ready to Build Your Digital Future?
                                </h2>
                                <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
                                    Let&apos;s grow your business with SEO, stronger digital presence, web development, and easy-to-use UX/UI built for real users.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1"
                                    >
                                        Get in Touch
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/prebuilt"
                                        className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all"
                                    >
                                        Explore Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
