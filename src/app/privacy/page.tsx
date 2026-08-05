"use client";

import Link from "next/link";
import { Shield, MapPin, Scale } from "lucide-react";
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
                        <Shield className="w-4 h-4 text-gray-900" />
                        Enterprise Legal Compliance
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Privacy Policy
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
                                1. Corporate Identity and Data Controller
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                This Privacy Policy is issued by <strong>STITCHBYTE LLP</strong> (herein referred to as the "Company", "we", "us", or "our"). Under global data protection regulations—including the General Data Protection Regulation (GDPR - Regulation (EU) 2016/679) and the Digital Personal Data Protection Act, 2023 (DPDP Act - India)—STITCHBYTE LLP acts as the <strong>Data Controller</strong> and <strong>Data Fiduciary</strong> for the personal information processed through our main site (https://stitchbyte.in), our cloud-hosted administrative panels, pre-built web solutions, social media management channels, and direct B2B consulting services.
                            </p>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Corporate Registrations</p>
                                    <p>Entity: STITCHBYTE LLP</p>
                                    <p>LLPIN: ACJ-8283</p>
                                    <p>Date of Incorporation: Oct 08, 2024</p>
                                    <p>Registrar: ROC - Jaipur</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Registered Address</p>
                                    <p>446, Inside Delhi Gate, near Jain Dispensary,</p>
                                    <p>Bhargava Bhawan, Alwar, Rajasthan, 301001, India</p>
                                    <p>Email: info@stitchbyte.in</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                2. Categories of Information We Collect
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We gather the following categories of data in accordance with the principles of data minimization and purpose limitation:
                            </p>
                            <ul className="space-y-4 text-gray-600">
                                <li>
                                    <strong className="text-gray-900">A. Personal Data & Identifiers:</strong> Name, professional email address, mobile number, job title, and company brand details.
                                </li>
                                <li>
                                    <strong className="text-gray-900">B. Billing & Transactional Information:</strong> Legal company name, billing address, tax identification numbers (such as GSTIN, VAT, or PAN), corporate banking receipts, transaction logs, and billing contact details.
                                </li>
                                <li>
                                    <strong className="text-gray-900">C. Client Credentials & API Secrets:</strong> For development operations, clients may securely share hosting portal keys, domain registrar credentials, database connection strings, SSH keys, API keys, or Firebase configurations.
                                </li>
                                <li>
                                    <strong className="text-gray-900">D. Technical & Log Data:</strong> Internet Protocol (IP) address, geographic region, browser user-agent, operating system, referrer URL, pages visited, timestamp, error codes, and server security event logs.
                                </li>
                                <li>
                                    <strong className="text-gray-900">E. Sensitive Personal Data:</strong> We do not knowingly collect, parse, or process biometrics, health records, genetic data, or government-issued national identity numbers (except tax IDs required specifically for legal billing compliance).
                                </li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                3. Google API Services & OAuth Consent Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                STITCHBYTE LLP's internal administrative portal integrates Google OAuth (via Google Sign-In) to verify staff and administrators.
                            </p>
                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200/80 space-y-4">
                                <p className="text-sm font-semibold text-gray-900">Scopes Requested & Justifications:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 pl-2">
                                    <li><strong>openid:</strong> Used to establish a secure unique session ID for the logging administrator.</li>
                                    <li><strong>email:</strong> Retrieved to check the user against the whitelist of authorized administrative emails in our database.</li>
                                    <li><strong>profile:</strong> Used to render the administrator's name and profile avatar on the internal command dashboard.</li>
                                </ul>
                                <p className="text-sm text-gray-600">
                                    <strong>Google API Services User Data Policy Compliance:</strong> Our use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-gray-900">Google API Services User Data Policy</a>, including the Limited Use requirements.
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Sharing & Advertising Restrictions:</strong> Google user profile data is never sold, leased, shared with third parties, or used to build marketing profiles or display targeted advertising blocks.
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Access Revocation:</strong> Users can revoke our application's access to their Google profile data at any time via the <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-gray-900">Google Account Security Permissions</a> management page.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                4. Fees, Billing, and Transaction Security
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Engaging STITCHBYTE LLP for custom development milestone work or digital asset subscriptions involves strict billing compliance protocols:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Payment Gateways:</strong> All payment transactions are executed via industry-certified, PCI-DSS compliant third-party payment processors, including <strong>Razorpay</strong>, <strong>Stripe</strong>, <strong>PayPal</strong>, and <strong>PhonePe</strong>. We do not store or process debit card, credit card, net-banking passwords, or CVV codes on our servers.</li>
                                <li><strong>GST & Invoicing:</strong> System-generated invoices will be raised on each project milestone or subscription renewal. All invoices are compliant with Indian GST (CGST/SGST/IGST) and regional corporate registry statutes, noting transactional milestones, GSTINs, corporate addresses, and fees.</li>
                                <li><strong>Non-Refundability:</strong> Milestone payments, deposits, discovery hours, and license purchases are non-refundable once work commences, except as explicitly detailed in signed Master Service Agreements (MSAs) or NDAs.</li>
                                <li><strong>Non-Payment & Account Deletion:</strong> If any client, partner, or subscriber fails to settle their outstanding invoices or milestone payments when due (including fees for custom development, digital marketing, SEO, or social media management), STITCHBYTE LLP reserves the unilateral right to suspend services, restrict code repository branches, and/or delete associated accounts, databases, hosted files, and campaigns with immediate effect. STITCHBYTE LLP assumes no liability for any data loss, server downtime, or disruptions resulting from deletion due to non-payment.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                5. Cookies & Tracking Consent Management
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our website implements a cookie consent mechanism located at the bottom-left of the viewport. We classify our cookies into the following functional groupings:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Necessary Cookies (First-party):</strong> Essential for core website operations, session state monitoring, and storing your consent preferences. These do not gather tracking details.</li>
                                <li><strong>Analytics & Performance (Third-party):</strong> Managed via <strong>Google Analytics</strong> and <strong>Google Tag Manager</strong> to evaluate user interaction patterns and optimize load performance.</li>
                                <li><strong>Marketing & Retargeting (Third-party):</strong> Managed via <strong>Facebook Pixel (Meta)</strong> to measure conversion rates of digital advertisements.</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                <strong>Opt-Out & Do Not Track (DNT):</strong> No third-party analytics or marketing scripts run, nor do they write database keys to your local storage, unless you explicitly select "Accept All" on the consent banner. We respect your browser's "Do Not Track" (DNT) headers.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                6. Disclosed Third-Party Subprocessors
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We share personal, transactional, or technical data only with trusted third-party service providers (Subprocessors) to maintain our operational channels:
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600 border border-gray-100 rounded-2xl overflow-hidden">
                                    <thead className="bg-gray-50 text-gray-900 font-semibold">
                                        <tr>
                                            <th className="p-4">Subprocessor / Service</th>
                                            <th className="p-4">Purpose</th>
                                            <th className="p-4">Primary Storage Region</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Vercel & Netlify</td>
                                            <td className="p-4">Frontend Deployment & Serverless Functions Hosting</td>
                                            <td className="p-4">United States / Global CDN</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">AWS (Amazon Web Services)</td>
                                            <td className="p-4">Cloud Infrastructure & Secure S3 Storage Asset hosting</td>
                                            <td className="p-4">India (Mumbai) / United States</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">DigitalOcean</td>
                                            <td className="p-4">Virtual Private Servers (VPS) hosting and backend staging</td>
                                            <td className="p-4">India (Bangalore) / Singapore</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Oracle Cloud Infrastructure (OCI)</td>
                                            <td className="p-4">Virtual Private Servers (VPS) hosting and backend computation databases</td>
                                            <td className="p-4">India (Mumbai / Hyderabad)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">MongoDB Atlas</td>
                                            <td className="p-4">Database Cluster Storage</td>
                                            <td className="p-4">India (Mumbai) / Singapore</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Razorpay, Stripe & PayPal</td>
                                            <td className="p-4">Secure Financial Transactions Processing & Billing</td>
                                            <td className="p-4">India / United States</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Brevo, Resend & SMTP services</td>
                                            <td className="p-4">Transactional Email and Newsletter Delivery</td>
                                            <td className="p-4">Europe (France) / United States</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Cloudinary</td>
                                            <td className="p-4">Optimized Image and Video Asset Hosting</td>
                                            <td className="p-4">United States</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">OpenAI & Google Gemini</td>
                                            <td className="p-4">Artificial Intelligence content & text processing helpers</td>
                                            <td className="p-4">United States</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-gray-900">Cloudflare & Google Fonts/reCAPTCHA</td>
                                            <td className="p-4">DNS management, Web Security Shielding & spam mitigation</td>
                                            <td className="p-4">Global Anycast Network</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                7. Legal Bases & Purpose of Processing
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Under Chapter II of the Indian DPDP Act 2023 and Article 6 of GDPR, we process personal details under the following legal bases:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Consent:</strong> When you subscribe to our newsletter, accept cookies, or submit Career and Contact Us forms. Consent can be revoked at any time.</li>
                                <li><strong>Contractual Obligation:</strong> To execute Master Service Agreements (MSAs), fulfill client code milestones, manage SSH access, and hand over source code repository packages.</li>
                                <li><strong>Legal Obligation:</strong> Mandated data retention for accounting registry auditing, tax compliance (GSTIN filing, Company Audit compliance), and cooperation with legal regulatory bodies.</li>
                                <li><strong>Legitimate Interests:</strong> To inspect server logs, prevent security breaches, mitigate spam submissions, and optimize our digital product catalogs.</li>
                            </ul>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                8. Strict Data Retention Schedule
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We retain personal, billing, and transactional data only as long as necessary to fulfill the original purpose of collection or comply with statutory requirements:
                            </p>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-600">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Financial Invoices & Tax Logs</p>
                                    <p className="mt-1"><strong>8 Years</strong> (Statutory requirement under Indian Income Tax Act & GST Act)</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Client Project Files & Backups</p>
                                    <p className="mt-1"><strong>2 Years</strong> following formal project sign-off and milestone closure</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Administrative Portal Security Logs</p>
                                    <p className="mt-1"><strong>180 Days</strong> for active threat and server performance detection</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Support Communications & Emails</p>
                                    <p className="mt-1"><strong>3 Years</strong> to support recurrent troubleshooting requests</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Google OAuth Administrative Access</p>
                                    <p className="mt-1"><strong>Immediate deletion</strong> upon account removal or access revocation</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="font-semibold text-gray-900">Analytics Logs (GA / GTM)</p>
                                    <p className="mt-1"><strong>26 Months</strong> following user session activity closure</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                9. Data Protection Rights (GDPR, DPDP Act & CCPA)
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You hold the following rights regarding the personal information we process:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Right to Access:</strong> You can request a copy of all personal details we hold about you.</li>
                                <li><strong>Right to Rectification & Correction:</strong> You can request updates to correct inaccurate or incomplete contact, identity, or billing records.</li>
                                <li><strong>Right to Portability:</strong> You can request that we export your data in a structured, machine-readable format.</li>
                                <li><strong>Right to Erasure (Deletion):</strong> You can request that we delete your personal details. <strong>Legal Exclusion:</strong> This right does not apply to transactional billing records, invoices, or signatures on Master Service Agreements (MSAs) which STITCHBYTE LLP is legally bound to retain for tax audit purposes.</li>
                                <li><strong>Right to Lodge Complaints:</strong> You have the right to file grievances with local data authorities—such as the <strong>Data Protection Board of India</strong> or EU-recognized **Supervisory Authorities**—if you believe your data has been handled in breach of compliance laws.</li>
                            </ul>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                10. Protection of Sensitive Client Credentials & Credentials Management
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                During deployment phases, clients routinely share server access, domain registrar logins, Firebase keys, or API tokens:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 pl-2">
                                <li><strong>Storage and Encryption:</strong> All shared credentials are stored in encrypted vaults utilizing Role-Based Access Controls (RBAC). No credentials are cached in plain text files or shared in unencrypted communication channels.</li>
                                <li><strong>Mandatory Deletion:</strong> Upon project sign-off and successful server deployment, we enforce a mandatory deletion schedule where staging keys and shared root credentials are removed from our systems. Clients are instructed to rotate staging passwords post-deployment.</li>
                                <li><strong>NDAs & B2B Data Processing:</strong> We sign Mutual Non-Disclosure Agreements (NDAs) for custom engineering contracts. Where required, we can execute custom <strong>Data Processing Agreements (DPAs)</strong>.</li>
                            </ul>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                11. International Transfers & Data Safeguards
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                STITCHBYTE LLP operates cloud database nodes and utilizes subprocessors situated outside of India (including in the United States, Singapore, and Europe). Consequently, your information may be processed in regions with varying data privacy standards. To ensure safety, we execute Standard Contractual Clauses (SCCs), enforce SSL/TLS encrypted pipelines, and utilize certified enterprise cloud providers that guarantee compliance with international data transfer frameworks.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                12. Children's Privacy
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our development, design, and SEO services are not structured for, nor marketed to, individuals under the age of 18. We do not knowingly collect personal data from minors. If we discover that personal details from an individual under 18 have been collected without parental consent, we will delete that data from our database servers immediately.
                            </p>
                        </div>

                        {/* Section 13 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                13. Data Breach and Incident Response
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                STITCHBYTE LLP maintains active server monitoring for security threat detection. In the unlikely event of a data breach compromising personal, transactional, or client credentials, we will notify affected individuals and regulatory authorities (such as CERT-In or supervisory bodies) within 72 hours of verification, outlining the containment strategies and corrective protocols.
                            </p>
                        </div>

                        {/* Section 14 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                14. Changes to This Privacy Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify this Privacy Policy to reflect regulatory changes or software updates. When modifications are made, we will update the "Last Updated" date at the top of the policy page. Registered clients and active users will receive notice via email regarding material modifications.
                            </p>
                        </div>

                        {/* Section 15 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                15. Contact Us & Grievance Officer
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                For inquiries concerning your data rights, cookie consents, or billing invoices, please contact our designated Grievance and Compliance Officer:
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="border border-gray-100 bg-gray-50/50 p-6 rounded-3xl space-y-4">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Scale className="w-5 h-5 text-gray-900" />
                                        <span className="font-semibold text-gray-900 text-sm">Grievance & Privacy Officer</span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>Officer Name:</strong> Mayur Bhargava</p>
                                        <p><strong>Title:</strong> Head of Compliance & Legal Affairs</p>
                                        <p><strong>Email:</strong> info@stitchbyte.in</p>
                                        <p><strong>Response Timeline:</strong> Within 30 calendar days</p>
                                    </div>
                                </div>

                                <div className="border border-gray-100 bg-gray-50/50 p-6 rounded-3xl space-y-4">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 text-gray-900" />
                                        <span className="font-semibold text-gray-900 text-sm">StitchByte Headquarters</span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>STITCHBYTE LLP</p>
                                        <p>446, Inside Delhi Gate, near Jain Dispensary,</p>
                                        <p>Bhargava Bhawan, Alwar, Rajasthan, 301001, India</p>
                                        <p>Email: info@stitchbyte.in</p>
                                    </div>
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
