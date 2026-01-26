"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ArrowRight,
    Send,
    CheckCircle,
    Loader2,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    DollarSign,
    LinkIcon,
    FileText,
    MessageSquare,
    GraduationCap,
    Check,
    Plus,
    Trash2,
    AlertCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Education {
    qualification: string;
    university: string;
    graduationYear: string;
}

interface Job {
    _id: string;
    title: string;
    department: string;
    location: string;
}

const defaultJobs: { [key: string]: Job } = {
    "full-stack-developer": {
        _id: "full-stack-developer",
        title: "Full Stack Developer",
        department: "Engineering",
        location: "Remote / Jaipur, Rajasthan",
    },
    "ui-ux-designer": {
        _id: "ui-ux-designer",
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote / Jaipur, Rajasthan",
    },
    "business-development-executive": {
        _id: "business-development-executive",
        title: "Business Development Executive",
        department: "Sales",
        location: "Jaipur, Rajasthan",
    },
};

const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Professional", icon: Briefcase },
    { id: 3, title: "Education", icon: GraduationCap },
    { id: 4, title: "Links", icon: LinkIcon },
    { id: 5, title: "Additional", icon: MessageSquare },
    { id: 6, title: "Review", icon: FileText },
];

export default function ApplyPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;
    const [job, setJob] = useState<Job | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [educationList, setEducationList] = useState<Education[]>([
        { qualification: '', university: '', graduationYear: '' }
    ]);

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        currentCity: "",
        currentState: "",
        permanentAddress: "",

        // Professional Information
        totalExperience: "",
        relevantExperience: "",
        currentCompany: "",
        currentDesignation: "",
        noticePeriod: "",
        currentSalary: "",
        expectedSalary: "",

        // Education
        highestQualification: "",
        university: "",
        graduationYear: "",

        // Links
        linkedinUrl: "",
        portfolioUrl: "",
        githubUrl: "",
        resumeUrl: "",

        // Additional
        willingToRelocate: "",
        preferredWorkMode: "",
        howDidYouHear: "",
        referralName: "",
        coverLetter: "",
        additionalInfo: "",

        // Declaration
        termsAccepted: false,
    });

    useEffect(() => {
        if (defaultJobs[jobId]) {
            setJob(defaultJobs[jobId]);
        }
    }, [jobId]);

    const handleSubmit = async () => {
        if (!job || !formData.termsAccepted) return;

        setSubmitting(true);

        try {
            const response = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobId: job._id,
                    jobTitle: job.title,
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`,
                    educationList: educationList,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Error submitting application:", error);
        }

        setSubmitting(false);
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Validation function for each step
    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
            if (!formData.currentCity.trim()) newErrors.currentCity = 'Current city is required';
            if (!formData.currentState.trim()) newErrors.currentState = 'Current state is required';
        }

        if (step === 2) {
            if (!formData.totalExperience.trim()) newErrors.totalExperience = 'Total experience is required';
            if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period is required';
            if (!formData.expectedSalary.trim()) newErrors.expectedSalary = 'Expected salary is required';
        }

        if (step === 3) {
            if (educationList.length === 0 || !educationList[0].qualification) {
                newErrors.education = 'At least one qualification is required';
            }
        }

        if (step === 4) {
            if (!formData.resumeUrl.trim()) newErrors.resumeUrl = 'Resume URL is required';
            else if (!/^https?:\/\/.+/.test(formData.resumeUrl)) newErrors.resumeUrl = 'Invalid URL format';
        }

        if (step === 5) {
            if (!formData.willingToRelocate) newErrors.willingToRelocate = 'Please select an option';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Education list management
    const addEducation = () => {
        setEducationList([...educationList, { qualification: '', university: '', graduationYear: '' }]);
    };

    const removeEducation = (index: number) => {
        if (educationList.length > 1) {
            setEducationList(educationList.filter((_, i) => i !== index));
        }
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const updated = [...educationList];
        updated[index][field] = value;
        setEducationList(updated);
        if (errors.education) setErrors(prev => ({ ...prev, education: '' }));
    };

    const nextStep = () => {
        if (validateStep(currentStep) && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToStep = (step: number) => {
        if (step <= currentStep) {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!job) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white text-gray-900">
                {/* Grid Background */}
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
                    <Navbar />

                    <div className="min-h-screen flex items-center justify-center px-6">
                        <div className="max-w-xl text-center">
                            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Application Submitted!
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                Thank you for applying for the <strong>{job.title}</strong> position at StitchByte.
                                We have received your application and our team will review it carefully.
                            </p>
                            <p className="text-gray-500 mb-8">
                                You will receive a confirmation email at <strong>{formData.email}</strong>.
                                We typically respond within 5-7 business days.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/careers"
                                    className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800"
                                >
                                    View More Jobs
                                </Link>
                                <Link
                                    href="/"
                                    className="px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Global Grid Background */}
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
                <Navbar />

                {/* Header */}
                <section className="pt-32 pb-8">
                    <div className="max-w-7xl mx-auto px-6">
                        <Link href={`/careers/${job._id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Job Details
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            Apply for {job.title}
                        </h1>
                        <p className="text-gray-600">{job.department} • {job.location}</p>
                    </div>
                </section>

                {/* Progress Steps */}
                <section className="pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        {/* Mobile: Current step indicator */}
                        <div className="sm:hidden mb-4 text-center">
                            <span className="text-sm text-gray-500">Step {currentStep} of {steps.length}</span>
                            <h3 className="font-semibold text-gray-900">{steps[currentStep - 1]?.title}</h3>
                        </div>

                        {/* Progress bar for mobile */}
                        <div className="sm:hidden mb-6">
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gray-900 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                {steps.map((step) => (
                                    <button
                                        key={step.id}
                                        onClick={() => goToStep(step.id)}
                                        disabled={step.id > currentStep}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step.id < currentStep
                                            ? 'bg-gray-900 text-white'
                                            : step.id === currentStep
                                                ? 'bg-gray-900 text-white ring-2 ring-gray-300'
                                                : 'bg-gray-100 text-gray-400'
                                            } ${step.id > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                    >
                                        {step.id < currentStep ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <step.icon className="w-4 h-4" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop: Full progress steps */}
                        <div className="hidden sm:flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => goToStep(step.id)}
                                        disabled={step.id > currentStep}
                                        className={`flex flex-col items-center gap-2 transition-all ${step.id > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${step.id < currentStep
                                            ? 'bg-gray-900 text-white'
                                            : step.id === currentStep
                                                ? 'bg-gray-900 text-white ring-4 ring-gray-200'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {step.id < currentStep ? (
                                                <Check className="w-4 h-4 md:w-5 md:h-5" />
                                            ) : (
                                                <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                                            )}
                                        </div>
                                        <span className={`text-xs font-medium ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 rounded ${step.id < currentStep ? 'bg-gray-900' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Form Content */}
                <section className="pb-12">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                        <p className="text-sm text-gray-500">Tell us about yourself</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <User className="w-4 h-4" />
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="John"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <User className="w-4 h-4" />
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="john.doe@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="+91 9876543210"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4" />
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            Current City *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.currentCity}
                                            onChange={(e) => handleInputChange('currentCity', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.currentCity ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="Jaipur"
                                        />
                                        {errors.currentCity && <p className="text-red-500 text-xs mt-1">{errors.currentCity}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            Current State *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.currentState}
                                            onChange={(e) => handleInputChange('currentState', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.currentState ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="Rajasthan"
                                        />
                                        {errors.currentState && <p className="text-red-500 text-xs mt-1">{errors.currentState}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Permanent Address</label>
                                        <textarea
                                            value={formData.permanentAddress}
                                            onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                            rows={2}
                                            placeholder="Street address, City, State, PIN Code"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Professional Information */}
                        {currentStep === 2 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Professional Information</h2>
                                        <p className="text-sm text-gray-500">Your work experience and expectations</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Briefcase className="w-4 h-4" />
                                            Total Experience (Years) *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.totalExperience}
                                            onChange={(e) => handleInputChange('totalExperience', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="e.g., 3 years"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Briefcase className="w-4 h-4" />
                                            Relevant Experience (Years)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.relevantExperience}
                                            onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="e.g., 2 years"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Current Company</label>
                                        <input
                                            type="text"
                                            value={formData.currentCompany}
                                            onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="ABC Technologies Pvt Ltd"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Current Designation</label>
                                        <input
                                            type="text"
                                            value={formData.currentDesignation}
                                            onChange={(e) => handleInputChange('currentDesignation', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="Software Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4" />
                                            Notice Period *
                                        </label>
                                        <select
                                            required
                                            value={formData.noticePeriod}
                                            onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                        >
                                            <option value="">Select Notice Period</option>
                                            <option value="Immediate">Immediate / Not Working</option>
                                            <option value="15 days">15 Days</option>
                                            <option value="30 days">30 Days (1 Month)</option>
                                            <option value="60 days">60 Days (2 Months)</option>
                                            <option value="90 days">90 Days (3 Months)</option>
                                            <option value="Negotiable">Negotiable</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <DollarSign className="w-4 h-4" />
                                            Current CTC (Annual)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.currentSalary}
                                            onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="e.g., ₹5,00,000"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <DollarSign className="w-4 h-4" />
                                            Expected CTC (Annual) *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.expectedSalary}
                                            onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="e.g., ₹8,00,000"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Education */}
                        {currentStep === 3 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">3</div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Education</h2>
                                            <p className="text-sm text-gray-500">Add your qualifications (you can add multiple)</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addEducation}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Qualification
                                    </button>
                                </div>

                                {errors.education && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.education}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {educationList.map((edu, index) => (
                                        <div key={index} className="relative border border-gray-200 rounded-2xl p-6 bg-gray-50/50">
                                            {educationList.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEducation(index)}
                                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove qualification"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            <div className="text-sm font-medium text-gray-500 mb-4">
                                                Qualification {index + 1}
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                        Qualification *
                                                    </label>
                                                    <select
                                                        value={edu.qualification}
                                                        onChange={(e) => updateEducation(index, 'qualification', e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="10th">10th</option>
                                                        <option value="12th">12th</option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Bachelor's">Bachelor's Degree</option>
                                                        <option value="Master's">Master's Degree</option>
                                                        <option value="PhD">PhD</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                        University / College
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.university}
                                                        onChange={(e) => updateEducation(index, 'university', e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                                                        placeholder="University name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                        Graduation Year
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.graduationYear}
                                                        onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                                                        placeholder="2021"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Links & Documents */}
                        {currentStep === 4 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Links & Documents</h2>
                                        <p className="text-sm text-gray-500">Share your profile links and resume</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <LinkIcon className="w-4 h-4" />
                                            LinkedIn Profile
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.linkedinUrl}
                                            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <LinkIcon className="w-4 h-4" />
                                            Portfolio Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.portfolioUrl}
                                            onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="https://yourportfolio.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <LinkIcon className="w-4 h-4" />
                                            GitHub Profile
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.githubUrl}
                                            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="https://github.com/yourusername"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <FileText className="w-4 h-4" />
                                            Resume URL (Google Drive/Dropbox) *
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={formData.resumeUrl}
                                            onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="https://drive.google.com/file/..."
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Please share a publicly accessible link</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Additional Information */}
                        {currentStep === 5 && (
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">5</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Additional Information</h2>
                                        <p className="text-sm text-gray-500">Help us know you better</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Willing to Relocate to Jaipur? *</label>
                                        <select
                                            required
                                            value={formData.willingToRelocate}
                                            onChange={(e) => handleInputChange('willingToRelocate', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Yes">Yes, I can relocate</option>
                                            <option value="Already in Jaipur">Already in Jaipur</option>
                                            <option value="No">No</option>
                                            <option value="Remote preferred">Prefer remote work</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Work Mode</label>
                                        <select
                                            value={formData.preferredWorkMode}
                                            onChange={(e) => handleInputChange('preferredWorkMode', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="On-site">On-site (Office)</option>
                                            <option value="Remote">Fully Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Flexible">Flexible / Any</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">How did you hear about us?</label>
                                        <select
                                            value={formData.howDidYouHear}
                                            onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Indeed">Indeed</option>
                                            <option value="Naukri">Naukri.com</option>
                                            <option value="Referral">Employee Referral</option>
                                            <option value="Website">Company Website</option>
                                            <option value="Google">Google Search</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Referral Name (if any)</label>
                                        <input
                                            type="text"
                                            value={formData.referralName}
                                            onChange={(e) => handleInputChange('referralName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="Name of the person who referred you"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Cover Letter / Why do you want to join StitchByte?
                                        </label>
                                        <textarea
                                            value={formData.coverLetter}
                                            onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                            rows={4}
                                            placeholder="Tell us about yourself, your motivations, and why you're interested in this role..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Review & Submit */}
                        {currentStep === 6 && (
                            <div className="space-y-6">
                                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold">✓</div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Review Your Application</h2>
                                            <p className="text-sm text-gray-500">Please verify all information before submitting</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Personal Info Summary */}
                                        <div className="border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Personal Information
                                                </h3>
                                                <button onClick={() => setCurrentStep(1)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                                <p><span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}</p>
                                                <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                                                <p><span className="text-gray-500">Phone:</span> {formData.phone}</p>
                                                <p><span className="text-gray-500">Location:</span> {formData.currentCity}, {formData.currentState}</p>
                                            </div>
                                        </div>

                                        {/* Professional Info Summary */}
                                        <div className="border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4" />
                                                    Professional Information
                                                </h3>
                                                <button onClick={() => setCurrentStep(2)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                                <p><span className="text-gray-500">Experience:</span> {formData.totalExperience}</p>
                                                <p><span className="text-gray-500">Current Company:</span> {formData.currentCompany || 'N/A'}</p>
                                                <p><span className="text-gray-500">Notice Period:</span> {formData.noticePeriod}</p>
                                                <p><span className="text-gray-500">Expected CTC:</span> {formData.expectedSalary}</p>
                                            </div>
                                        </div>

                                        {/* Education Summary */}
                                        <div className="border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4" />
                                                    Education ({educationList.length} qualification{educationList.length > 1 ? 's' : ''})
                                                </h3>
                                                <button onClick={() => setCurrentStep(3)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                {educationList.map((edu, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <span className="text-gray-500">{index + 1}.</span>
                                                        <span>{edu.qualification || 'N/A'} - {edu.university || 'N/A'} ({edu.graduationYear || 'N/A'})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links Summary */}
                                        <div className="border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <LinkIcon className="w-4 h-4" />
                                                    Links & Documents
                                                </h3>
                                                <button onClick={() => setCurrentStep(4)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                                <p><span className="text-gray-500">LinkedIn:</span> {formData.linkedinUrl ? 'Provided' : 'N/A'}</p>
                                                <p><span className="text-gray-500">Portfolio:</span> {formData.portfolioUrl ? 'Provided' : 'N/A'}</p>
                                                <p><span className="text-gray-500">GitHub:</span> {formData.githubUrl ? 'Provided' : 'N/A'}</p>
                                                <p><span className="text-gray-500">Resume:</span> {formData.resumeUrl ? 'Provided' : 'Not Provided'}</p>
                                            </div>
                                        </div>

                                        {/* Additional Info Summary */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4" />
                                                    Additional Information
                                                </h3>
                                                <button onClick={() => setCurrentStep(5)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                                <p><span className="text-gray-500">Willing to Relocate:</span> {formData.willingToRelocate}</p>
                                                <p><span className="text-gray-500">Preferred Work Mode:</span> {formData.preferredWorkMode || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Submit */}
                                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-start gap-3 mb-6">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            required
                                            checked={formData.termsAccepted}
                                            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                            className="w-5 h-5 mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                        <label htmlFor="terms" className="text-gray-600">
                                            I hereby declare that all the information provided above is true and accurate to the best of my knowledge.
                                            I understand that any false information may lead to disqualification of my application.
                                            I agree to the <Link href="/privacy" className="text-gray-900 underline">Privacy Policy</Link> and
                                            <Link href="/terms" className="text-gray-900 underline"> Terms & Conditions</Link>.
                                        </label>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting || !formData.termsAccepted}
                                        className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-6 h-6" />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Previous
                            </button>

                            {currentStep < steps.length && (
                                <button
                                    onClick={nextStep}
                                    className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 flex items-center gap-2"
                                >
                                    Next Step
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
