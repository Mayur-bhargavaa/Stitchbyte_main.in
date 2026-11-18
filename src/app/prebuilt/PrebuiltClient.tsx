"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    ArrowRight,
    ArrowUpRight,
    Smartphone,
    Globe,
    Users,
    BarChart3,
    CreditCard,
    Truck,
    Store,
    QrCode,
    Bell,
    FileText,
    Layers,
    GraduationCap,
    Stethoscope,
    Home,
    Calendar,
    Building,
    Sparkles,
    Check,
    Code2,
    Rocket,
    BadgeCheck,
    MessageCircle,
    ChevronDown,
    LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Smartphone, Globe, Users, BarChart3, CreditCard, Truck, Store, QrCode,
    Bell, FileText, Layers, GraduationCap, Stethoscope, Home, Calendar, Building, Sparkles,
};
const getIcon = (name: string): LucideIcon => iconMap[name] || Sparkles;

interface ProductHighlight {
    icon: string;
    label: string;
}

export interface Product {
    id: string;
    name: string;
    tagline: string;
    shortDescription: string;
    price?: string;
    originalPrice?: string;
    gradient: string;
    highlights: ProductHighlight[];
    comingSoon?: boolean;
    features?: { description: string }[];
    offerings?: { description: string }[];
    images?: string[];
    category?: string;
    demoLink?: string;
}

const WHATSAPP = "https://wa.me/919461330819";
const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

const categoryLabel = (c: string) =>
    c === "All" ? c : c.toLowerCase() === "saas" ? "SaaS" : c.toLowerCase() === "ecommerce" ? "E-commerce" : c.charAt(0).toUpperCase() + c.slice(1);

const getProductFeatures = (product: Product): string[] => {
    if (product.offerings && product.offerings.length > 0) {
        return product.offerings.slice(0, 3).map((o) => o.description);
    }
    return [
        `Launch your ${product.name.toLowerCase()} with a ready-to-use solution built for speed, trust, and growth.`,
        "Start with an SEO-friendly structure and conversion-focused experience to improve digital visibility.",
        "Manage everything from one platform with integrated apps and admin controls.",
    ];
};

const toNumber = (v?: string) => {
    const n = parseInt((v || "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
};
const savingPercent = (p: Product) => {
    const price = toNumber(p.price);
    const orig = toNumber(p.originalPrice);
    return price > 0 && orig > price ? Math.round(((orig - price) / orig) * 100) : 0;
};

const benefits = [
    { icon: Code2, title: "100% source code", text: "You own the code. One-time payment, no per-seat or monthly licence." },
    { icon: Rocket, title: "Deploy in 48 hours", text: "We set it up on your domain and hosting so you can start selling or serving quickly." },
    { icon: BadgeCheck, title: "Lifetime licence", text: "Use it for as long as your business runs." },
];

const steps = [
    { n: "01", title: "Pick a solution", text: "Open the live demo and try the user and admin sides yourself." },
    { n: "02", title: "Talk to us", text: "Tell us your brand, domain and what you want changed. We reply on WhatsApp." },
    { n: "03", title: "We deploy and hand over", text: "We launch it on your domain and give you the source code and admin access." },
];

const faqs = [
    {
        q: "Do I really get the source code?",
        a: "Yes. Every prebuilt solution includes the full source code with a one-time payment and a lifetime licence.",
    },
    {
        q: "How fast can it go live?",
        a: "We aim to deploy within 48 hours of confirming your requirements, domain and hosting details.",
    },
    {
        q: "Can I see it before I buy?",
        a: "Yes. Every product has a live demo. Open it from the card, then message us if you want a walkthrough.",
    },
    {
        q: "What if I need changes or something different?",
        a: "Tell us what you need. We also build fully customized software, so we can adapt a prebuilt product or build from scratch.",
    },
];

export default function PrebuiltClient({ products }: { products: Product[] }) {
    const [category, setCategory] = useState("All");
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const categories = useMemo(() => {
        const set = new Set<string>();
        products.forEach((p) => p.category && set.add(p.category));
        return ["All", ...Array.from(set)];
    }, [products]);

    const visible = category === "All" ? products : products.filter((p) => p.category === category);

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20 sm:pb-0">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                        <Sparkles className="w-4 h-4" />
                        Ready-made software, your brand
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-950 leading-[1.1] mb-5">
                        Prebuilt SaaS software.
                        <br />
                        <span className="text-gray-500">Live in 48 hours. You own the code.</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                        Skip months of development and the agency price tag. Pick a production-ready platform, try the live demo, and we launch it on your domain.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
                        <Link
                            href="#products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-xl"
                        >
                            Browse Solutions
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={waLink("Hi StitchByte, I want to know more about your prebuilt software.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Talk to an Expert on WhatsApp
                        </a>
                    </div>
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                        {["One-time payment", "100% source code", "Lifetime licence"].map((t) => (
                            <li key={t} className="inline-flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-600" />
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* PRODUCTS */}
            <section id="products" className="py-16 bg-white scroll-mt-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-2">
                                Choose your solution
                            </h2>
                            <p className="text-gray-500">
                                {products.length} ready-to-deploy platforms. Open any live demo before you decide.
                            </p>
                        </div>
                        {categories.length > 2 && (
                            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
                                {categories.map((c) => (
                                    <button
                                        key={c}
                                        role="tab"
                                        aria-selected={category === c}
                                        onClick={() => setCategory(c)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                            category === c
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                        }`}
                                    >
                                        {categoryLabel(c)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {visible.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
                            <p className="text-gray-500 mb-4">New solutions are on the way. Tell us what you need and we will build it.</p>
                            <Link href="/contact" className="inline-flex px-6 py-3 bg-gray-900 text-white rounded-full font-medium">
                                Contact Us
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-24 sm:space-y-32">
                            {visible.map((product, index) => {
                                const saving = savingPercent(product);
                                const image = product.images?.[0];
                                const features = getProductFeatures(product);
                                const flip = index % 2 === 1;
                                return (
                                    <article key={product.id} className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                                        {/* Preview: left on even rows, right on odd rows */}
                                        <div className={`w-full ${flip ? "md:order-2" : ""}`}>
                                            <div className="bg-gray-50/80 rounded-[32px] p-5 sm:p-7 aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200/40 shadow-sm">
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
                                                    <div className="relative flex-1 w-full bg-white overflow-hidden rounded-lg border border-gray-100">
                                                        {image ? (
                                                            <Image
                                                                src={image}
                                                                alt={`${product.name} screenshot`}
                                                                fill
                                                                className="object-cover object-top"
                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                            />
                                                        ) : (
                                                            <div className={`absolute inset-0 ${product.gradient || "bg-gradient-to-br from-indigo-500 to-violet-600"} flex items-center justify-center`}>
                                                                <span className="text-white/90 font-bold text-xl px-6 text-center">{product.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className={flip ? "md:order-1" : ""}>
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                {product.category && (
                                                    <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 rounded-full">
                                                        {categoryLabel(product.category)}
                                                    </span>
                                                )}
                                                {saving > 0 && !product.comingSoon && (
                                                    <span className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">
                                                        {saving}% off
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-500 mb-6">{product.tagline}</p>

                                            <div className="space-y-5 mb-8">
                                                {features.map((feature, i) => (
                                                    <div key={i} className="flex gap-4">
                                                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                                                            {String(i + 1).padStart(2, "0")}
                                                        </span>
                                                        <p className="text-gray-600 leading-relaxed">{feature}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {product.price && !product.comingSoon && (
                                                <div className="flex items-baseline gap-2 mb-6">
                                                    <span className="text-xs uppercase tracking-wider text-gray-400">From</span>
                                                    <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                                    )}
                                                </div>
                                            )}

                                            {product.comingSoon ? (
                                                <a
                                                    href={waLink(`Hi StitchByte, notify me when ${product.name} is ready.`)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                                                >
                                                    Coming soon. Get notified
                                                </a>
                                            ) : (
                                                <div className="flex flex-wrap gap-3">
                                                    <Link
                                                        href={`/prebuilt/${product.id}`}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                                    >
                                                        Explore Solution
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                    {product.demoLink && (
                                                        <a
                                                            href={product.demoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-6 py-3 border border-gray-300 text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                                        >
                                                            Live Demo
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 text-center mb-12">
                        Why buy prebuilt instead of building from scratch
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="p-6 rounded-2xl border border-gray-200 bg-gray-50/60">
                                <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((s) => (
                            <div key={s.n}>
                                <span className="text-5xl font-bold text-white/20">{s.n}</span>
                                <h3 className="text-xl font-bold mt-2 mb-2">{s.title}</h3>
                                <p className="text-white/60 leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 text-center mb-10">
                        Common questions
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((f, i) => (
                            <div key={f.q} className="border border-gray-200 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium text-gray-900"
                                >
                                    {f.q}
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === i && <p className="px-5 pb-5 text-gray-600 leading-relaxed">{f.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-4">
                        Not sure which one fits your business?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Tell us what you are building. We will point you to the right solution, or build something custom.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={waLink("Hi StitchByte, can you help me choose the right prebuilt software?")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Talk to an Expert on WhatsApp
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/customized"
                            className="inline-flex items-center justify-center px-8 py-4 text-gray-700 font-medium hover:text-gray-950 transition-colors"
                        >
                            Need custom software?
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Sticky mobile CTA (right padding leaves room for the floating WhatsApp bubble) */}
            <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 p-3 pr-20">
                <Link
                    href="/contact"
                    className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-full font-medium text-sm"
                >
                    Get a Quote
                </Link>
            </div>
        </div>
    );
}
