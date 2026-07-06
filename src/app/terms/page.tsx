"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
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
                        <FileText className="w-4 h-4" />
                        Legal
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Terms & Conditions
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
                                Agreement to Terms & Conditions
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing or using the services provided by StitchByte ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Description of Services
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                StitchByte provides website development, application development, and digital solutions including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Pre-built website and application solutions</li>
                                <li>Custom website and application development</li>
                                <li>UI/UX design services</li>
                                <li>Maintenance and support services</li>
                                <li>Consulting and digital strategy</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                StitchByte Intellectual Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Upon full payment of all agreed fees:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Clients receive full ownership of custom-developed code and assets</li>
                                <li>Pre-built solutions are licensed for use as specified in the purchase agreement</li>
                                <li>Third-party components remain subject to their respective licenses</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                StitchByte retains the right to showcase completed projects in our portfolio unless otherwise agreed in writing.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Terms of Payment
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Payment terms will be specified in individual project proposals or agreements</li>
                                <li>A deposit may be required before work commences</li>
                                <li>Final deliverables will be released upon full payment</li>
                                <li>Late payments may incur additional charges as specified in the agreement</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Project Delivery
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Delivery timelines are estimated and may vary based on:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Project complexity and scope</li>
                                <li>Client feedback and revision cycles</li>
                                <li>Availability of required content and assets from client</li>
                                <li>Third-party dependencies</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Revisions and Changes
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                The number of revisions included will be specified in project proposals. Additional revisions or scope changes may incur extra charges. Major changes to project scope after work has begun will require a revised proposal and timeline.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Limitation of Liability
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                StitchByte shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Confidentiality
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the project. This includes but is not limited to business strategies, technical specifications, and financial information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Termination
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Either party may terminate services with written notice. Upon termination, the client will pay for all work completed up to the termination date. Any deposits paid are non-refundable unless otherwise specified.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Governing Law
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Contact Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For any questions regarding these Terms and Conditions, please contact us:
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
