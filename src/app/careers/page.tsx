"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Briefcase,
    MapPin,
    Clock,
    ArrowRight,
    Users,
    Rocket,
    Heart,
    Coffee,
} from "lucide-react";
import Footer from "@/components/Footer";

interface Job {
    _id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    experienceRequired?: string;
    workMode?: string;
    isActive?: boolean;
    isFeatured?: boolean;
}



const benefits = [
    { icon: Rocket, title: "Growth", description: "Fast career progression" },
    { icon: Users, title: "Team", description: "Collaborative culture" },
    { icon: Heart, title: "Health", description: "Medical insurance" },
    { icon: Coffee, title: "Perks", description: "Flexible hours" },
];

export default function CareersPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/jobs");
                const data = await response.json();
                if (data.success && data.data && data.data.length > 0) {
                    setJobs(data.data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                // Keep default jobs on error
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Global Grid Background - Same as Main Website */}
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
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        <Briefcase className="w-4 h-4" />
                        We're Hiring
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Join Our Team
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Be part of a team that's building the future of digital solutions.
                        We're always looking for passionate individuals to join our journey from Jaipur, Rajasthan.
                    </p>
                </section>

                {/* Benefits */}
                <section className="max-w-4xl mx-auto px-6 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <benefit.icon className="w-6 h-6 text-gray-700" />
                                </div>
                                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                                <p className="text-sm text-gray-500">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Job Listings */}
                <section className="max-w-4xl mx-auto px-6 pb-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Open Positions
                    </h2>

                    {jobs.length === 0 ? (
                        /* Beautiful Empty State */
                        <div className="text-center py-16">
                            {/* Animated Illustration */}
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                {/* Background circles */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-100" />
                                </div>

                                {/* Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <Briefcase className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Floating elements */}
                                <div className="absolute top-8 right-8 w-6 h-6 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="absolute bottom-12 left-8 w-4 h-4 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                <div className="absolute top-16 left-12 w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                No Open Positions Right Now
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
                                We're always looking for talented individuals to join our team.
                                Check back soon or send us your resume for future opportunities!
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Send Your Resume
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Explore Our Work
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Subscribe Section */}
                            <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl max-w-lg mx-auto">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Get Notified</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Be the first to know when new positions open up
                                </p>
                                <Link
                                    href="/contact"
                                    className="text-gray-900 font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
                                >
                                    Contact us to stay updated →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="w-4 h-4" />
                                                    {job.department}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {job.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mt-3 text-sm">{job.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {job.requirements.map((req, i) => (
                                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/careers/${job.slug || job._id}`}
                                            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
