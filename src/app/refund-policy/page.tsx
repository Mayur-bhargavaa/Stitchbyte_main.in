"use client";

import Link from "next/link";
import { HelpCircle, Scale, ShieldAlert } from "lucide-react";
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
                        linear-gradient(to right, rgba(200, 200, 200, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(200, 200, 200, 0.4) 1px, transparent 1px)
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
                <section className="max-w-7xl mx-auto px-6 pt-32 pb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        <HelpCircle className="w-4 h-4 text-gray-900" />
                        Legal Compliance
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Cancellation & Refund Policy
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                        <p><strong>Effective Date:</strong> August 5, 2026</p>
                        <span className="hidden sm:inline">•</span>
                        <p><strong>Last Updated:</strong> August 5, 2026</p>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 space-y-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">

                        {/* Section 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                1. Corporate Identity & Application of Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                This Cancellation & Refund Policy governs the cancellation processes, invoice settlements, and refund conditions for services rendered by <strong>STITCHBYTE LLP</strong> (herein referred to as the "Company", "we", "us", or "our"). Because we design and engineer bespoke custom software, digital marketing campaigns, SEO structures, and social media management frameworks, our refund rules are structured around completed milestones and resource allocation.
                            </p>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Corporate Details</p>
                                    <p>Entity: STITCHBYTE LLP</p>
                                    <p>LLPIN: ACJ-8283</p>
                                    <p>Date of Incorporation: Oct 08, 2024</p>
                                    <p>Registrar: ROC - Jaipur</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Registered Office</p>
                                    <p>446, Inside Delhi Gate, near Jain Dispensary,</p>
                                    <p>Bhargava Bhawan, Alwar, Rajasthan, 301001, India</p>
                                    <p>Email: info@stitchbyte.in</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                2. Custom Software & Web Development Projects
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Custom engineering, UX/UI layouts, API integrations, and code solutions are billed based on the milestones defined in the Statement of Work (SOW):
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Retainer & Advance Deposits:</strong> The initial project deposit or retainer payment is strictly non-refundable once work (such as requirements discovery, Figma styling, design layout, or code setup) has started.</li>
                                <li><strong>Completed Milestones:</strong> Payments made upon the approval of specific project milestones (e.g., database architecture approval, front-end staging approval, user acceptance testing) are completely non-refundable.</li>
                                <li><strong>Objective Partial Completion Terms:</strong> If a project is cancelled during an active milestone phase, no refunds are given for the deposit. A pro-rata billing evaluation will be conducted based on the engineering and design hours logged up to the official date of written cancellation. If the accumulated hours exceed the advance deposit, the Client will be invoiced for the difference. If the hours are less than the deposit, the remaining funds—minus non-recoverable payment gateway fees, taxes, and third-party costs—will be returned to the Client.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                3. SEO, Digital Marketing & Social Media Management Subscriptions
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Strategic SEO, ad campaigns, and monthly social media management services involve ongoing monthly retainer commitments and constant resource allocations:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Monthly Fees:</strong> Monthly retainer invoices are billed in advance and are non-refundable.</li>
                                <li><strong>Cancellation Notice:</strong> Clients may cancel monthly support, SEO, or social media management services by giving at least **thirty (30) calendar days** written notice to info@stitchbyte.in. Services will continue through the end of the current billing cycle, and no further invoices will be raised.</li>
                                <li><strong>Direct Advertising Spend:</strong> Budgets paid to advertising networks (including Google Ads, Meta Ads, LinkedIn Ads, or TikTok Ads) are governed by the respective networks' terms. StitchByte is not responsible for issuing refunds or managing charge disputes for direct ad platform spends.</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-905 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                4. Prebuilt Software Products, Themes & Templates
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For licenses to prebuilt software solutions, ready-made codebases, or digital templates purchased directly, refunds are only issued if the product is proven to be functionally defective and our support team is unable to resolve the issue within **ten (10) business days** of reporting. Refund claims must be submitted in writing within **seven (7) calendar days** of the purchase date. Custom styling or content additions are non-refundable.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                5. Non-Refundability of Third-Party Expenses & Government Taxes
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Payments made for third-party infrastructure components, setup fees, or statutory government charges are **100% non-refundable** under all circumstances. These include:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li>Domain name registrations, SSL renewals, and Google Workspace setups.</li>
                                <li>Cloud hosting infrastructure invoices (AWS, Vercel, Netlify, DigitalOcean, Oracle Cloud).</li>
                                <li>Third-party software licenses, API subscriptions, themes, and plugins.</li>
                                <li>Statutory taxes, including Indian GST (CGST/SGST/IGST), which are paid directly to tax authorities.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                6. Client Delays & Abandoned Projects
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                **No Refunds for Client Delays:** Refunds are not available for project delays caused by Client inactivity, delayed approvals, slow content delivery, or late payment settlements.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                **Abandoned Projects:** If a client becomes unresponsive or fails to provide required credentials or assets for **sixty (60) calendar days**, the project will be deemed abandoned and closed. All deposits paid will be forfeited. Resuming an abandoned project will require a new cost evaluation, current developer scheduling checks, and a project restoration fee.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                7. Chargebacks, Disputes, and Payment Integrity
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Client agrees to contact our billing team at **info@stitchbyte.in** to resolve billing issues before initiating a formal chargeback dispute with their bank or payment processor. If an unauthorized or fraudulent chargeback is filed, STITCHBYTE LLP reserves the right to immediately suspend all services (including production hosting, Git code repositories, design setups, and campaigns) and pursue legal recovery actions to reclaim the outstanding balances, payment gateway penalties, and legal representation costs.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                8. Withholding of Source Code and Deliverables
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Under no circumstances will StitchByte hand over source code, Figma design files, staging environments, ZIP archives, database keys, or production deployments if there are outstanding invoices, pro-rata cancellation fees, or pending milestone payments. STITCHBYTE LLP retains full intellectual property rights and physical control of all deliverables until all financial obligations are met by the Client.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                9. Refund Processing, Currencies, and Exchange Differences
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                **Processing Timeline:** Approved refunds will be processed within **7 to 14 business days** and returned via the original payment method where feasible.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                **Currency and Bank Fees:** Refunds are issued in the original transaction currency (e.g., INR or USD). STITCHBYTE LLP is not responsible for exchange rate fluctuations, conversion fees, or non-recoverable payment gateway fees charged by banks or transaction processors.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                10. Force Majeure & Limitation of Outcome Guarantees
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                **Force Majeure:** Refunds or cancellations are not owed for project delays or service interruptions caused by events outside our reasonable control (including acts of God, natural disasters, government regulations, or major cloud hosting outages).
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                **Disclaimers:** We do not issue refunds based on commercial outcomes (such as search engine rankings, sales volumes, conversion ratios, or social media engagement). All marketing and SEO setups are executed at the Client's business risk.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                11. Governing Law & Dispute Resolution
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                This Cancellation & Refund Policy is governed by the laws of India. Any disputes arising from billing, cancellations, or refund requests shall be resolved in accordance with the dispute resolution procedures detailed in our <Link href="/terms" className="underline font-semibold text-gray-900">Terms & Conditions</Link>, under the exclusive jurisdiction of the competent courts in **Alwar, Rajasthan, India**.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                12. Contact Billing & Financial Support
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                To submit a formal cancellation request or request a billing review, please contact our financial support department:
                            </p>
                            <div className="mt-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 max-w-xl">
                                <p className="text-gray-900 font-semibold mb-2">STITCHBYTE LLP Billing Department</p>
                                <p className="text-sm text-gray-600">Email: <strong>info@stitchbyte.in</strong></p>
                                <p className="text-sm text-gray-600">Support helpline: +91 94142 92675</p>
                                <p className="text-sm text-gray-600">Registered Office: 446, Inside Delhi Gate, near Jain Dispensary, Bhargava Bhawan, Alwar, Rajasthan, 301001, India</p>
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
