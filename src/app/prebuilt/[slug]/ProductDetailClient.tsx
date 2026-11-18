"use client";

import { useState } from "react";
import { newEventId, hasMarketingConsent, trackMeta } from "@/lib/meta-events";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Smartphone,
    Globe,
    Settings,
    ShoppingCart,
    Users,
    BarChart3,
    CreditCard,
    Truck,
    Package,
    Store,
    UtensilsCrossed,
    QrCode,
    Clock,
    Bell,
    FileText,
    Layers,
    GraduationCap,
    Stethoscope,
    Home,
    Calendar,
    Briefcase,
    Building,
    Sparkles,
    Shield,
    Zap,
    Target,
    Send,
    Monitor,
    Palette,
    Code,
    Database,
    CheckCircle,
    MapPin,
    LayoutGrid,
    MessageCircle,
    LucideIcon,
    Loader2,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Smartphone, Globe, Settings, ShoppingCart, Users, BarChart3, CreditCard, Truck, Package,
    Store, UtensilsCrossed, QrCode, Clock, Bell, FileText, Layers, GraduationCap, Stethoscope,
    Home, Calendar, Briefcase, Building, Sparkles, Shield, Zap, Target, Send, Monitor, Palette,
    Code, Database, CheckCircle, MapPin, LayoutGrid,
};
const getIcon = (iconName: string): LucideIcon => iconMap[iconName] || Sparkles;

interface ProductOffering {
    icon: string;
    title: string;
    description: string;
    type: "download" | "checkout";
}

interface ProductFeature {
    icon: string;
    title: string;
    description: string;
}

interface FAQ {
    question: string;
    answer: string;
}

export interface ProductData {
    id: string;
    name: string;
    tagline: string;
    heroTitle: string;
    heroDescription: string;
    price: string;
    originalPrice?: string;
    priceNote: string;
    color: string;
    gradient: string;
    trustedCount: string;
    images: string[];
    offerings: ProductOffering[];
    whyChooseTitle: string;
    whyChooseDescription: string;
    features: ProductFeature[];
    techStack: string[];
    faqs: FAQ[];
    demoLink?: string;
    category?: string;
}

const WHATSAPP = "https://wa.me/919461330819";
const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

const categoryLabel = (c: string) =>
    c.toLowerCase() === "saas" ? "SaaS" : c.toLowerCase() === "ecommerce" ? "E-commerce" : c.charAt(0).toUpperCase() + c.slice(1);

export default function ProductDetailClient({ product }: { product: ProductData }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", brand: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const images = (product.images || []).filter(Boolean);
    const hasDemo = Boolean(product.demoLink);
    const demoIsExternal = /^https?:/.test(product.demoLink || "");
    const nextSlide = () => setCurrentSlide((s) => (s + 1) % images.length);
    const prevSlide = () => setCurrentSlide((s) => (s - 1 + images.length) % images.length);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const eventId = newEventId();
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    productId: product.id,
                    productName: product.name,
                    eventId,
                    marketingConsent: hasMarketingConsent(),
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                trackMeta("Lead", eventId, { source: "product_enquiry", product: product.name });
                setSubmitSuccess(true);
                setFormData({ name: "", phone: "", email: "", brand: "", message: "" });
                setTimeout(() => setSubmitSuccess(false), 8000);
            } else {
                alert(data.error || "Failed to submit enquiry. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting enquiry:", err);
            alert("Failed to submit enquiry. Please try again.");
        }

        setIsSubmitting(false);
    };

    const demoButtonProps = demoIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20 sm:pb-0">
            {/* Navigation */}
            <header className="fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50">
                <nav className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-2 sm:px-3 py-2 shadow-lg shadow-black/5">
                    <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2">
                        <Link href="/prebuilt" className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1">
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                        <Link href="/" className="px-2 sm:px-3 py-1 flex items-center">
                            <Image src="/logo-stitchbyte.png" alt="StitchByte" width={120} height={32} className="h-6 sm:h-8 w-auto" />
                        </Link>
                        <Link href="/contact" className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            <span className="hidden sm:inline">Contact Us</span>
                            <span className="sm:hidden">Contact</span>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* HERO */}
            <section className="relative overflow-hidden px-6 pt-32 pb-16 sm:pt-36 sm:pb-20">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className={`absolute top-10 right-0 w-96 h-96 ${product.gradient} rounded-full blur-[120px] opacity-20 pointer-events-none`} />

                <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 ${product.gradient} text-white text-sm font-medium rounded-full`}>
                                <Sparkles className="w-4 h-4" />
                                {product.category ? categoryLabel(product.category) : "Prebuilt solution"}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-5" style={{ fontFamily: "Georgia, serif" }}>
                            {product.heroTitle}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">{product.heroDescription}</p>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="flex items-end gap-3 flex-wrap">
                                <span className="text-5xl font-bold text-gray-900">{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{product.priceNote}</p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            {hasDemo && (
                                <a
                                    href={product.demoLink}
                                    {...demoButtonProps}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    Live Demo
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-700 transition-colors"
                            >
                                Contact Us
                            </Link>
                            <a
                                href={waLink(`Hi StitchByte, I am interested in ${product.name}.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-gray-700 font-medium rounded-full hover:text-gray-950 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp us
                            </a>
                        </div>

                        <p className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-emerald-600" />
                            Deploy in 48 hours
                        </p>
                    </div>

                    {/* Hero preview */}
                    <div className="w-full">
                        <div className="bg-gray-50/80 rounded-[32px] p-5 sm:p-7 aspect-[4/3] flex items-center justify-center border border-gray-200/40 shadow-sm">
                            <div className="bg-white rounded-[24px] p-3 sm:p-4 shadow-lg border border-gray-100/80 w-full h-full flex flex-col">
                                <div className="bg-gray-50/80 border-b border-gray-100/80 px-3 py-2 flex items-center justify-between select-none rounded-t-xl mb-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                                        <div className="w-2 h-2 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="h-5 w-36 bg-white border border-gray-100 rounded-md text-[9px] font-mono text-gray-400 flex items-center justify-center">
                                        {product.id}.stitchbyte.in
                                    </div>
                                    <div className="w-6" />
                                </div>
                                <div className="relative flex-1 bg-white overflow-hidden rounded-lg border border-gray-100">
                                    {images[0] ? (
                                        <Image src={images[0]} alt={`${product.name} screenshot`} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                                    ) : (
                                        <div className={`absolute inset-0 ${product.gradient} flex items-center justify-center`}>
                                            <span className="text-white font-bold text-xl px-6 text-center">{product.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT'S INCLUDED */}
            {product.offerings?.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-3" style={{ fontFamily: "Georgia, serif" }}>
                                What you get
                            </h2>
                            
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.offerings.map((o, i) => {
                                const Icon = getIcon(o.icon);
                                return (
                                    <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200">
                                        <div className={`w-11 h-11 rounded-xl ${product.gradient} text-white flex items-center justify-center mb-4`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">{o.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{o.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* SCREENSHOTS */}
            {images.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-3" style={{ fontFamily: "Georgia, serif" }}>
                                See it in action
                            </h2>
                            
                        </div>
                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
                            <Image
                                key={currentSlide}
                                src={images[currentSlide]}
                                alt={`${product.name} screen ${currentSlide + 1}`}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 1024px) 100vw, 960px"
                            />
                            {images.length > 1 && (
                                <>
                                    <button onClick={prevSlide} aria-label="Previous screenshot" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextSlide} aria-label="Next screenshot" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                {images.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        aria-label={`Show screenshot ${i + 1}`}
                                        className={`relative shrink-0 w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${i === currentSlide ? "border-gray-900" : "border-transparent opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image src={src} alt="" fill className="object-cover object-top" sizes="112px" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {hasDemo && (
                            <div className="text-center mt-8">
                                <a href={product.demoLink} {...demoButtonProps} className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-700 transition-colors">
                                    Try the Live Demo
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* WHY CHOOSE */}
            {product.features?.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                                {product.whyChooseTitle}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">{product.whyChooseDescription}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {product.features.map((f, i) => {
                                const Icon = getIcon(f.icon);
                                return (
                                    <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-200">
                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* TECH STACK */}
            {product.techStack?.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-950 mb-6">Built with modern technology</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {product.techStack.map((t) => (
                                <span key={t} className="px-5 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {product.faqs?.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 text-center mb-10" style={{ fontFamily: "Georgia, serif" }}>
                            Frequently asked questions
                        </h2>
                        <div className="space-y-3">
                            {product.faqs.map((faq, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium text-gray-900"
                                    >
                                        {faq.question}
                                        <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                                    </button>
                                    {openFaq === i && <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ENQUIRY */}
            <section id="enquiry" className="py-20 bg-gray-900 text-white scroll-mt-4">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
                            Ready to launch {product.name}?
                        </h2>
                        <p className="text-white/70 mb-8 leading-relaxed">
                            Tell us your brand and requirements and our team will get back to you.
                        </p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold">{product.price}</span>
                            {product.originalPrice && <span className="ml-3 text-white/40 line-through">{product.originalPrice}</span>}
                            <p className="text-sm text-white/60 mt-1">{product.priceNote}</p>
                        </div>
                        <p className="flex items-center gap-2 text-white/80 mb-8">
                            <Check className="w-4 h-4 text-emerald-400" />
                            Deploy in 48 hours
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={waLink(`Hi StitchByte, I am interested in ${product.name}.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                            {hasDemo && (
                                <a href={product.demoLink} {...demoButtonProps} className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                                    Live Demo
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8">
                        {submitSuccess ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-green-800 mb-2">Thank you!</h3>
                                <p className="text-green-700">Your enquiry has been submitted. Our team will contact you.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { key: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
                                    { key: "phone", label: "Contact Number", type: "tel", required: true, placeholder: "Your phone / WhatsApp number" },
                                    { key: "email", label: "Email", type: "email", required: false, placeholder: "you@company.com" },
                                    { key: "brand", label: "Brand / Business Name", type: "text", required: false, placeholder: "Your brand name" },
                                ].map((f) => (
                                    <div key={f.key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {f.label} {f.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type={f.type}
                                            required={f.required}
                                            value={formData[f.key as keyof typeof formData]}
                                            onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                                            placeholder={f.placeholder}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (optional)</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Get My Quote
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />

            {/* Sticky mobile CTA (right padding leaves room for the floating WhatsApp bubble) */}
            <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 p-3 pr-20 flex gap-2">
                {hasDemo && (
                    <a href={product.demoLink} {...demoButtonProps} className="flex-1 inline-flex items-center justify-center py-3 border border-gray-300 text-gray-900 rounded-full font-medium text-sm">
                        Live Demo
                    </a>
                )}
                <Link href="#enquiry" className="flex-1 inline-flex items-center justify-center py-3 bg-gray-900 text-white rounded-full font-medium text-sm">
                    Get a Quote
                </Link>
            </div>
        </div>
    );
}
