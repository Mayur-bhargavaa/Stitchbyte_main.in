"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
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
                <section className="max-w-4xl mx-auto px-6 pt-32 pb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        <Shield className="w-4 h-4" />
                        Legal
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600">
                        Last updated: January 26, 2026
                    </p>
                </section>

                {/* Content */}
                <section className="max-w-4xl mx-auto px-6 pb-24">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 space-y-8">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Privacy Policy Introduction
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                At StitchByte ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Information We Collect at StitchByte
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may collect information about you in a variety of ways. The information we may collect includes:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact details you provide.</li>
                                <li><strong>Business Information:</strong> Company name, project requirements, and business details shared during consultations.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
                                <li><strong>Communication Data:</strong> Records of correspondence when you contact us via forms, email, or chat.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                How We Use Collected Data
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Provide, operate, and maintain our services</li>
                                <li>Process and complete transactions</li>
                                <li>Send administrative information and updates</li>
                                <li>Respond to inquiries and offer support</li>
                                <li>Improve our website and services</li>
                                <li>Send marketing and promotional communications (with your consent)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Security of Your Data
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Third-Party Services
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting services. These providers are obligated to protect your information and may only use it for the purposes we specify.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Your Rights
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent where applicable</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Contact Us
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions or concerns about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-gray-900 font-medium">StitchByte</p>
                                <p className="text-gray-600">Email: <span>info</span><span>&#64;</span><span>stitchbyte&#46;in</span></p>
                                <p className="text-gray-600">Phone: +91 94613 30819</p>
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
