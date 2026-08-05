"use client";

import Link from "next/link";
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
                        <FileText className="w-4 h-4 text-gray-900" />
                        Enterprise Service Agreement
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Terms & Conditions
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 animate-fade-in" style={{ fontFamily: 'Georgia, serif' }}>
                                1. Corporate Identity and Data of Entity
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                These Terms & Conditions (hereinafter referred to as "Terms" or "Agreement") constitute a legally binding service agreement between <strong>STITCHBYTE LLP</strong> (hereinafter referred to as the "Company", "we", "us", or "our") and the corporate entity, business entity, client, or individual representative (hereinafter referred to as the "Client" or "you") receiving custom development, SaaS products, web design, Search Engine Optimization (SEO), digital marketing, social media management, AI automations, and consulting services.
                            </p>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Corporate Registration details</p>
                                    <p>Entity: STITCHBYTE LLP</p>
                                    <p>LLPIN: ACJ-8283</p>
                                    <p>Date of Incorporation: Oct 08, 2024</p>
                                    <p>Registrar: ROC - Jaipur</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Registered Headquarters Address</p>
                                    <p>446, Inside Delhi Gate, near Jain Dispensary,</p>
                                    <p>Bhargava Bhawan, Alwar, Rajasthan, 301001, India</p>
                                    <p>Email: info@stitchbyte.in</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                2. Definitions & Interpretation Rules
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Throughout this Agreement, the following terms shall have the defined meanings:
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li>
                                    <strong className="text-gray-900">Services:</strong> Custom software engineering, React/Next.js frontend development, UX/UI product layout design, SEO, digital campaigns, social media management, and administrative portal setups.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Deliverables:</strong> Source code packages, Figma layouts, software builds, deployment repositories, graphics, and strategies generated under a specific Statement of Work.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Statement of Work (SOW):</strong> The formal proposal, contract, digital quotation, roadmap, or invoice detail specifying the service tasks, timelines, and milestones.
                                </li>
                                <li>
                                    <strong className="text-gray-900">Confidential Information:</strong> Proprietary data, database access parameters, source code, strategy roadmap files, SSH keys, trade secrets, and API credentials shared under an NDA.
                                </li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                3. Proposal Acceptance & Communication Channels
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Client acceptance of a project proposal, Statement of Work (SOW), contract, or corporate invoice does not require physical ink signatures to be legally valid. Electronic acceptances, click-through confirmations, emails, digital signature portals, and written approvals exchanged via instant messaging platforms (such as WhatsApp, Slack, or corporate Telegram threads) constitute mutual consent and bind both parties to these Terms.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                4. Scope of Work and Change Request Management
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Custom engineering, SEO setups, digital marketing campaigns, and social media management operations are strictly bounded by the definitions listed in the approved SOW or project proposal. Any request for new features, extra graphics, campaign modifications, post extensions, or layout alterations outside the documented SOW is classified as a "Change Request." Change Requests require a separate written evaluation, budget adjustments, and extension of milestone timelines before execution commences. StitchByte is under no obligation to execute extra-SOW requests without revised payment terms.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                5. Mandatory Client Responsibilities
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                The timely and successful completion of any project milestone requires the active cooperation of the Client. The Client agrees to be responsible for:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li>Providing brand logos, copy text, layout preferences, and media assets in high-definition formats.</li>
                                <li>Providing clean, valid credentials, host portal keys, DNS configuration files, database connections, and API tokens.</li>
                                <li>Delivering feedback, wireframe approvals, and review feedback within three (3) business days of submittal.</li>
                                <li>Ensuring complete legal ownership or right of usage for all text, assets, fonts, graphics, and branding assets supplied to StitchByte.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                6. Timeline Extensions & Project Delays
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Project milestone timelines and delivery dates are estimated targets. If the Client delays in delivering required content, server credentials, or milestone payments, or fails to review deliverables within the agreed periods, the delivery timelines will automatically extend. The extended time will, at a minimum, equal the duration of the Client's delay plus five (5) business days for development rescheduling. StitchByte is not liable for delayed launches caused by Client inactivity.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                7. Suspension of Services for Non-Payment
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Failure to settle project invoices or milestone payments beyond their due dates grants STITCHBYTE LLP the unilateral right to suspend all services immediately. Suspension includes, but is not limited to: pausing server hosting, stopping active code development, restricting Git repository branches, suspending support tickets, and pausing digital advertising campaigns. Suspended services will only be resumed once all outstanding fees, interest, and reinstatement surcharges are settled in full.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                8. Cancellation Fees & Refund Restrictions
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Project cancellation requests must be filed in writing. In the event of project termination:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li>All initial deposits and retainer payments are strictly non-refundable.</li>
                                <li>The Client will be billed pro-rata for all engineering, design, and project management hours logged up to the formal date of cancellation.</li>
                                <li>Any third-party subscriptions, hosting infrastructure setups, or domain name registry fees purchased on behalf of the Client must be paid in full by the Client.</li>
                                <li>All refund structures are governed by our formal <Link href="/refund-policy" className="underline font-semibold text-gray-900">Cancellation & Refund Policy</Link>.</li>
                            </ul>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                9. Intellectual Property & Pre-Payment Source Code Ownership
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                **Pre-Payment Security:** All source code, Git repositories, Figma mockups, configuration files, and software designs created by StitchByte remain the exclusive property of STITCHBYTE LLP until the Client has paid all invoices for the project in full. The Client has no license or permission to use, deploy, reproduce, or modify any project assets before full financial settlement. Upon full payment, complete IP and custom code ownership is transferred to the Client.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                10. Open Source Software & Third-Party Licensing
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our development solutions make use of open-source frameworks (including React, Next.js, Tailwind CSS, Node.js, and third-party libraries). These components remain subject to their respective open-source licenses (such as MIT, Apache, or GNU GPL). Transfer of custom IP does not override, alter, or replace the terms of open-source licenses or the licensing requirements of third-party platforms.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                11. Third-Party Infrastructure Exclusions
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                StitchByte designs, tests, and deploys software utilizing third-party infrastructure tools (including AWS, Vercel, Netlify, DigitalOcean, MongoDB Atlas, Razorpay, Brevo, and OpenAI/Gemini platforms). STITCHBYTE LLP accepts no liability for third-party service outages, network down times, API deprecations, data processing errors, or security breaches originating from these external platforms. Third-party utility bills and API costs are the sole responsibility of the Client.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                12. Client Content Warranty & Indemnification
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Client represents and warrants that all copy, designs, images, databases, and trademarks supplied to StitchByte do not infringe upon any third-party intellectual property or copyright. The Client agrees to fully defend, indemnify, and hold harmless STITCHBYTE LLP, its partners, and engineers against any legal claims, damages, court costs, or settlement fees arising from copyright disputes involving the supplied materials.
                            </p>
                        </div>

                        {/* Section 13 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                13. Portfolio and Promotional Rights
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                StitchByte reserves the right to show mockups, screenshots, case study details, and corporate logos of the completed client project in our design portfolio, website catalog, and social media channels to showcase our engineering capabilities. This right is granted permanently, unless a signed Non-Disclosure Agreement (NDA) or Master Service Agreement (MSA) explicitly restricts marketing disclosures.
                            </p>
                        </div>

                        {/* Section 14 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                14. Domain and Hosting Handover
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Upon project completion and final payment settlement, all login details and ownership credentials for domain names, DNS registers, cloud hosting accounts, and SSL certificates will be handed over to the Client. StitchByte does not manage, monitor, or renew domain configurations or hosted profiles unless actively retained under a signed maintenance contract. The Client is solely responsible for billing updates to prevent host suspension.
                            </p>
                        </div>

                        {/* Section 15 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                15. Maintenance, Support Hours & Bug Warranty
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                **30-Day Bug Warranty:** StitchByte warrants custom-developed code modules against functional bugs or deployment defects for a period of **thirty (30) calendar days** following project handover. This warranty is limited to resolving deviations from the original SOW specs. Bug resolution excludes new feature additions or changes caused by user error or browser updates. Extended support, operational maintenance, and feature changes require an active Service Level Agreement (SLA). Support operations run on standard business hours (IST).
                            </p>
                        </div>

                        {/* Section 16 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                16. Disclaimers: No Guarantee of Commercial Outcomes
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                STITCHBYTE LLP delivers technical systems, search engine optimization (SEO) configurations, and social media setups to current industry standards. However, we make no guarantees, warranties, or representations regarding Google search rankings, click-through ratios, sales volumes, lead generation metrics, or viral social media reach. All digital marketing campaigns run at the Client's business risk.
                            </p>
                        </div>

                        {/* Section 17 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                17. Artificial Intelligence (AI) Services Disclaimer
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For projects integrating generative AI API modules (including OpenAI, Anthropic, or Google Gemini nodes): the Client acknowledges that AI outputs are generated dynamically by probabilistic models and may occasionally contain inaccuracies, hallucinations, or bias. StitchByte is not responsible for the performance or semantic accuracy of AI-generated content. All AI outputs must be reviewed by the Client before business use.
                            </p>
                        </div>

                        {/* Section 18 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                18. Security Post-Handover & Backup Responsibilities
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Following formal project handover, the Client assumes full responsibility for securing their systems. This includes: changing administrative passwords, rotating database access keys, configuring Multi-Factor Authentication (MFA), and setting up database backup cron jobs. StitchByte is not responsible for data loss, server breaches, or database corruption occurring post-delivery.
                            </p>
                        </div>

                        {/* Section 19 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                19. Abandoned Projects Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If the Client stops communication, fails to deliver required content, or is inactive for **sixty (60) calendar days** without a written extension request, the project will be deemed "Abandoned" and closed. In such events, all deposits paid are forfeited, and outstanding balances for work completed become due. Resuming an abandoned project requires a new cost evaluation, scheduler availability checks, and a project restoration fee.
                            </p>
                        </div>

                        {/* Section 20 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                20. Acceptance Testing & Review Period
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Client has **seven (7) calendar days** from the date of staging delivery to perform testing and verify compliance with SOW specifications. If no functional defects are reported in writing within this 7-day period, the deliverables will be deemed accepted, and the corresponding milestone payment invoice will be raised.
                            </p>
                        </div>

                        {/* Section 21 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                21. Limitation of Liability and Indirect Damages
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL STITCHBYTE LLP BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION) ARISING OUT OF THIS AGREEMENT. THE TOTAL AGGREGATE LIABILITY OF STITCHBYTE LLP FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY THE CLIENT FOR THE SPECIFIC SERVICE OR MILESTONE GIVING RISE TO THE CLAIM.
                            </p>
                        </div>

                        {/* Section 22 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                22. Force Majeure
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Neither party shall be liable for delays or failure to perform obligations resulting from events beyond their control (including acts of God, strikes, wars, pandemics, telecom failures, government regulations, or major cloud infrastructure crashes). The delayed party must notify the other in writing, and delivery dates will extend for the duration of the Force Majeure event.
                            </p>
                        </div>

                        {/* Section 23 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                23. Dispute Resolution and Governing Jurisdiction
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                In the event of a dispute, both parties agree to first seek resolution through friendly negotiation. If negotiation fails, the dispute shall be resolved through binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996, with the venue of arbitration in Alwar, Rajasthan. This Agreement shall be governed by the laws of India, and any legal actions must be filed in the competent courts located in **Alwar, Rajasthan, India**.
                            </p>
                        </div>

                        {/* Section 24 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                24. General Provisions (Severability & Entire Agreement)
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                **Severability:** If any provision of these Terms is found to be invalid or unenforceable, the remaining sections will continue in full force. **Entire Agreement:** These Terms, together with the approved Proposal, Statement of Work (SOW), and Privacy Policy, constitute the complete agreement between the parties and supersede all prior verbal or written understandings.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
