"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RefundPolicyPage() {
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
                        <HelpCircle className="w-4 h-4" />
                        Legal
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Cancellation & Refund Policy
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
                                Introduction
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                At StitchByte, we strive to provide high-quality custom software development, digital marketing, web design, and SEO services. Since we deliver bespoke intellectual properties and customized campaign strategies, our refund and cancellation policy is structured to reflect the resource allocation, engineering time, and mutual commitments required for these services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                1. Custom Software & Web Development Projects
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our custom software, React/Next.js development, and UX/UI design services are billed on a milestone basis:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li><strong>Advance / Retainer Payments:</strong> The initial retainer or advance payment is non-refundable once project kickoff, requirements gathering, or design discovery sessions have commenced.</li>
                                <li><strong>Milestone Payments:</strong> Payments made upon the approval of specific project milestones (e.g., wireframe sign-off, frontend integration, UAT phase acceptance) are non-refundable. Work on the subsequent milestone begins only after the client approves and settles the current milestone invoice.</li>
                                <li><strong>Project Halts & Cancellation:</strong> If a project is cancelled or halted by the client mid-milestone, the client will be billed pro-rata for all engineering and design hours completed up to the date of cancellation. Any surplus funds from that specific milestone, if applicable, may be refunded at the discretion of management.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                2. SEO & Digital Marketing Services
                            </h2>
                            <p className="text-gray-650 leading-relaxed mb-4">
                                Marketing services, paid campaigns (Google & Meta Ads), and SEO strategies involve continuous monthly resource allocation and campaign management:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li><strong>Monthly Retainers:</strong> Monthly retainer payments for SEO and digital marketing services are billed in advance and are non-refundable.</li>
                                <li><strong>Cancellation Notice:</strong> Clients may cancel their monthly marketing or SEO subscriptions by providing a written notice of at least thirty (30) calendar days. Services will continue to be delivered through the end of the paid billing cycle, and no further invoices will be raised.</li>
                                <li><strong>Ad Spend:</strong> Any advertising budget paid directly to networks (Meta, Google, etc.) is governed by the respective networks' terms. StitchByte is not responsible for issuing refunds for direct ad platform spends.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                3. Prebuilt Products & Templates
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For any prebuilt software solutions, ready-made codebases, or digital templates purchased directly, refunds are only issued if the product is proven to be functionally defective and our support team is unable to resolve the issue within ten (10) business days of reporting. Refund claims must be submitted within seven (7) calendar days of the purchase date.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                4. Cancellation Procedure
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                To request a project cancellation or request a refund evaluation, you must submit a formal request in writing to our billing department at <strong>billing&#64;stitchbyte&#46;in</strong> or email your account manager. Your email must include your contract reference number, client details, and a clear description of the cancellation request.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Contact Billing Support
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions regarding our billing structures, active project invoices, or cancellation terms, please feel free to reach out to us:
                            </p>
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <p className="text-gray-900 font-medium">StitchByte billing division</p>
                                <p className="text-gray-600">Email: <span>billing</span><span>&#64;</span><span>stitchbyte&#46;in</span></p>
                                <p className="text-gray-600">Phone: +91 94142 92675</p>
                                <p className="text-gray-600">Address: Alwar, Rajasthan, Delhi NCR (Operating exclusively from Alwar)</p>
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
