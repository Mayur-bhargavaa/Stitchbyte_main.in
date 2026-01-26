"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Briefcase,
    MapPin,
    Clock,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Loader2,
    Building,
    Users,
    DollarSign,
    GraduationCap,
    FileText,
    Target,
    Lightbulb,
    Award,
} from "lucide-react";
import Footer from "@/components/Footer";

interface Job {
    _id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    aboutCompany: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    benefits: string[];
    salary?: string;
    workSchedule?: string;
    reportingTo?: string;
}

// Default job openings with more details
const defaultJobs: { [key: string]: Job } = {
    "full-stack-developer": {
        _id: "full-stack-developer",
        title: "Full Stack Developer",
        department: "Engineering",
        location: "Remote / Jaipur, Rajasthan",
        type: "Full-time",
        workSchedule: "Monday to Friday, Flexible Hours",
        reportingTo: "Tech Lead / CTO",
        aboutCompany: "StitchByte is a fast-growing digital solutions company based in Jaipur, Rajasthan. We specialize in creating pre-built and custom web applications for startups and businesses across India, Dubai, Canada, and the US. Our mission is to make technology accessible and affordable for businesses of all sizes.",
        description: "We are looking for a talented Full Stack Developer to join our engineering team. You will be responsible for building innovative web applications using modern technologies like Next.js, React, and Node.js. This is an excellent opportunity to work on diverse projects ranging from restaurant management systems to e-commerce platforms and SaaS applications. You'll be working directly with clients and our design team to bring ideas to life.",
        responsibilities: [
            "Design, develop, and maintain responsive web applications using Next.js, React, and Node.js",
            "Collaborate closely with UI/UX designers to implement pixel-perfect, accessible interfaces",
            "Write clean, maintainable, and well-documented code following best practices",
            "Participate in code reviews and provide constructive feedback to team members",
            "Optimize applications for maximum speed, scalability, and SEO",
            "Work with MongoDB, PostgreSQL, and other databases to design efficient data models",
            "Integrate third-party APIs and services (payment gateways, authentication, etc.)",
            "Troubleshoot and debug issues across the full stack",
            "Mentor junior developers and share knowledge with the team",
            "Stay updated with the latest technologies and industry trends",
        ],
        requirements: [
            "3+ years of professional experience in full-stack web development",
            "Strong proficiency in React.js and Next.js (App Router experience preferred)",
            "Solid experience with Node.js and Express.js",
            "Experience with MongoDB and/or PostgreSQL databases",
            "Understanding of RESTful APIs and API design principles",
            "Proficiency in TypeScript",
            "Experience with Git version control and collaborative workflows",
            "Good understanding of responsive design and mobile-first development",
            "Strong problem-solving skills and attention to detail",
            "Excellent communication skills in English (written and verbal)",
        ],
        niceToHave: [
            "Experience with GraphQL",
            "Knowledge of AWS, Vercel, or other cloud platforms",
            "Experience with Docker and containerization",
            "Familiarity with CI/CD pipelines",
            "Experience with Prisma or other ORMs",
            "Knowledge of testing frameworks (Jest, React Testing Library)",
            "Previous experience in a startup environment",
        ],
        benefits: [
            "Competitive salary based on experience (₹6,00,000 - ₹15,00,000 per annum)",
            "Performance-based bonuses and incentives",
            "Flexible work hours - we trust you to manage your time",
            "Remote work options - work from anywhere in India",
            "Health insurance coverage for you and your family",
            "Annual learning and development budget",
            "Paid time off and holidays",
            "Modern tech stack and tools",
            "Collaborative and innovative work environment",
            "Direct exposure to international clients",
            "Career growth opportunities in a fast-growing company",
        ],
        salary: "₹6,00,000 - ₹15,00,000 per annum",
    },
    "ui-ux-designer": {
        _id: "ui-ux-designer",
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote / Jaipur, Rajasthan",
        type: "Full-time",
        workSchedule: "Monday to Friday, Flexible Hours",
        reportingTo: "Design Lead / CEO",
        aboutCompany: "StitchByte is a fast-growing digital solutions company based in Jaipur, Rajasthan. We specialize in creating pre-built and custom web applications for startups and businesses across India, Dubai, Canada, and the US. Our mission is to make technology accessible and affordable for businesses of all sizes.",
        description: "Join our design team to create beautiful, intuitive user experiences for our pre-built and custom solutions. You will work closely with developers and clients to bring ideas to life through stunning visual designs and seamless user flows. This role offers the opportunity to work on diverse projects across different industries and make a real impact on how users interact with digital products.",
        responsibilities: [
            "Create wireframes, prototypes, and high-fidelity designs using Figma",
            "Conduct user research, interviews, and usability testing",
            "Develop and maintain comprehensive design systems and style guides",
            "Collaborate with developers to ensure pixel-perfect design implementation",
            "Present design concepts to clients and stakeholders effectively",
            "Iterate on designs based on user feedback and analytics",
            "Create responsive designs for web and mobile applications",
            "Optimize user flows for better conversion and engagement",
            "Stay updated with the latest UI/UX trends, tools, and best practices",
            "Contribute to the company's brand identity and marketing materials",
        ],
        requirements: [
            "2+ years of professional experience in UI/UX design",
            "Expert proficiency in Figma (required)",
            "Strong portfolio showcasing web and mobile design projects",
            "Deep understanding of responsive design principles",
            "Experience creating and maintaining design systems",
            "Knowledge of user research methodologies",
            "Understanding of accessibility standards (WCAG)",
            "Excellent visual design skills and attention to detail",
            "Strong communication and presentation skills",
            "Ability to work in a fast-paced, collaborative environment",
        ],
        niceToHave: [
            "Basic understanding of HTML, CSS, and JavaScript",
            "Experience with motion design and micro-interactions",
            "Knowledge of Framer or other prototyping tools",
            "Experience with user testing platforms",
            "Photography or illustration skills",
            "Experience working with international clients",
        ],
        benefits: [
            "Competitive salary based on experience (₹4,00,000 - ₹10,00,000 per annum)",
            "Performance-based bonuses and incentives",
            "Flexible work hours",
            "Remote work options",
            "Health insurance coverage",
            "Creative freedom and autonomy in your work",
            "Access to premium design tools and resources",
            "Learning and development opportunities",
            "Collaborative and supportive team culture",
            "Work on diverse, exciting projects",
        ],
        salary: "₹4,00,000 - ₹10,00,000 per annum",
    },
    "business-development-executive": {
        _id: "business-development-executive",
        title: "Business Development Executive",
        department: "Sales",
        location: "Jaipur, Rajasthan",
        type: "Full-time",
        workSchedule: "Monday to Saturday",
        reportingTo: "Business Head / CEO",
        aboutCompany: "StitchByte is a fast-growing digital solutions company based in Jaipur, Rajasthan. We specialize in creating pre-built and custom web applications for startups and businesses across India, Dubai, Canada, and the US. Our mission is to make technology accessible and affordable for businesses of all sizes.",
        description: "We are seeking a driven Business Development Executive to help us expand our client base and drive revenue growth. You will identify new business opportunities, build lasting client relationships, and help position StitchByte as the go-to digital partner for startups and businesses. This is an exciting opportunity to be part of a growing team and make a significant impact on the company's growth trajectory.",
        responsibilities: [
            "Identify and pursue new business opportunities through various channels (LinkedIn, cold outreach, networking, referrals)",
            "Build and maintain strong relationships with potential and existing clients",
            "Understand client requirements and present suitable solutions",
            "Prepare and deliver compelling sales presentations and proposals",
            "Negotiate contracts and close deals to meet and exceed targets",
            "Maintain accurate records of leads, opportunities, and sales activities in CRM",
            "Collaborate with the technical team to scope projects and prepare quotes",
            "Attend industry events, conferences, and networking opportunities",
            "Provide feedback to the team on market trends and client needs",
            "Achieve monthly and quarterly sales targets consistently",
        ],
        requirements: [
            "2+ years of experience in B2B sales or business development",
            "Proven track record of meeting or exceeding sales targets",
            "Excellent verbal and written communication skills in English and Hindi",
            "Experience with CRM tools (HubSpot, Salesforce, Zoho, etc.)",
            "Understanding of IT services, web development, or digital solutions",
            "Strong negotiation and presentation skills",
            "Self-motivated with the ability to work independently",
            "Comfortable with cold outreach and lead generation",
            "Professional demeanor and client-facing skills",
            "Based in or willing to relocate to Jaipur",
        ],
        niceToHave: [
            "Experience selling to international clients (US, Canada, Dubai)",
            "Network in the startup ecosystem",
            "Knowledge of web technologies and digital marketing",
            "MBA or relevant business degree",
            "Experience with proposal writing and pitching",
        ],
        benefits: [
            "Competitive base salary (₹3,00,000 - ₹8,00,000 per annum)",
            "Attractive commission structure on closed deals",
            "Performance-based incentives and bonuses",
            "Health insurance coverage",
            "Travel allowance for client meetings",
            "Phone and internet reimbursement",
            "Growth opportunities within the company",
            "Supportive and energetic team culture",
            "Training and skill development",
            "Direct interaction with founders and leadership",
        ],
        salary: "₹3,00,000 - ₹8,00,000 per annum + Commission",
    },
};

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            try {
                // First try to fetch from MongoDB
                const response = await fetch(`/api/jobs/${jobId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data) {
                        // Map MongoDB data to Job interface with defaults for missing fields
                        const mongoJob = data.data;
                        setJob({
                            _id: mongoJob.slug || mongoJob._id,
                            title: mongoJob.title,
                            department: mongoJob.department,
                            location: mongoJob.location,
                            type: mongoJob.type,
                            description: mongoJob.description,
                            aboutCompany: "StitchByte is a fast-growing digital solutions company based in Jaipur, Rajasthan. We specialize in creating pre-built and custom web applications for startups and businesses across India, Dubai, Canada, and the US. Our mission is to make technology accessible and affordable for businesses of all sizes.",
                            responsibilities: mongoJob.responsibilities || [],
                            requirements: mongoJob.requirements || [],
                            niceToHave: mongoJob.niceToHave || [],
                            benefits: mongoJob.benefits || [],
                            salary: mongoJob.salaryRange ? `₹${(mongoJob.salaryRange.min / 100000).toFixed(0)}L - ₹${(mongoJob.salaryRange.max / 100000).toFixed(0)}L per annum` : undefined,
                            workSchedule: mongoJob.workMode === 'On-site' ? 'Monday to Saturday' : 'Monday to Friday, Flexible Hours',
                            reportingTo: mongoJob.department === 'Engineering' ? 'Tech Lead / CTO' : mongoJob.department === 'Design' ? 'Design Lead / CEO' : 'Business Head / CEO',
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error("Error fetching job from API:", error);
            }

            // Fall back to hardcoded defaults if API fails
            if (defaultJobs[jobId]) {
                setJob(defaultJobs[jobId]);
            }
            setLoading(false);
        };

        fetchJob();
    }, [jobId]);

    if (!job) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

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
                                <Image src="/logo-stitchbyte.png" alt="StitchByte" width={120} height={32} className="h-8 w-auto" />
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

                {/* Hero Header - Full Width */}
                <section className="pt-32 pb-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <Link href="/careers" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Jobs
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">{job.department}</span>
                                    <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">{job.type}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        {job.workSchedule || job.type}
                                    </span>
                                    {job.salary && (
                                        <span className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5" />
                                            {job.salary}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Link
                                href={`/careers/${job._id}/apply`}
                                className="flex-shrink-0 inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold text-lg rounded-2xl hover:bg-gray-800 transition-all hover:shadow-2xl"
                            >
                                Apply for this Position
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>


                {/* Quick Info Bar */}
                <section className="border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                            <div className="flex flex-wrap items-center gap-6">
                                {job.reportingTo && (
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        Reports to: <strong className="text-gray-900">{job.reportingTo}</strong>
                                    </span>
                                )}
                                <span className="flex items-center gap-2 text-gray-600">
                                    <Building className="w-4 h-4" />
                                    Team: <strong className="text-gray-900">{job.department}</strong>
                                </span>
                            </div>
                            <span className="text-gray-500">Posted: Recently</span>
                        </div>
                    </div>
                </section>

                {/* Main Content - Full Width Layout */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Left Content - 2 columns */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* About Company */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <Building className="w-6 h-6 text-gray-400" />
                                        About StitchByte
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">{job.aboutCompany}</p>
                                </div>

                                {/* About Role */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <FileText className="w-6 h-6 text-gray-400" />
                                        About this Role
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">{job.description}</p>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <Target className="w-6 h-6 text-gray-400" />
                                        Key Responsibilities
                                    </h2>
                                    <ul className="space-y-4">
                                        {job.responsibilities.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 text-gray-600">
                                                <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                                    {i + 1}
                                                </span>
                                                <span className="pt-1">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <GraduationCap className="w-6 h-6 text-gray-400" />
                                        Requirements
                                    </h2>
                                    <ul className="grid md:grid-cols-2 gap-3">
                                        {job.requirements.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                                                <CheckCircle className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Nice to Have */}
                                {job.niceToHave && job.niceToHave.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <Lightbulb className="w-6 h-6 text-gray-400" />
                                            Nice to Have
                                        </h2>
                                        <ul className="grid md:grid-cols-2 gap-3">
                                            {job.niceToHave.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                                    <span className="text-gray-400">+</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Right Sidebar */}
                            <div className="space-y-8">
                                {/* Benefits Card */}
                                <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-32">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <Award className="w-6 h-6" />
                                        Benefits & Perks
                                    </h2>
                                    <ul className="space-y-4">
                                        {job.benefits.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                <span className="text-white text-lg">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 pt-6 border-t border-gray-700">
                                        <Link
                                            href={`/careers/${job._id}/apply`}
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Share Job */}
                                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                                    <p className="text-gray-600 mb-2">Know someone perfect for this role?</p>
                                    <p className="text-gray-900 font-medium">Share this job with them!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Ready to Join Our Team?
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Take the first step towards an exciting career at StitchByte.
                        </p>
                        <Link
                            href={`/careers/${job._id}/apply`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all hover:shadow-2xl"
                        >
                            Apply for {job.title}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </div >
    );
}
