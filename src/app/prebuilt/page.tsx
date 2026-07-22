"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    ArrowRight,
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
    Loader2,
    LucideIcon
} from "lucide-react";

// Icon mapping for dynamic rendering from MongoDB
const iconMap: Record<string, LucideIcon> = {
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
    Sparkles
};

// Helper function to get icon component
const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Smartphone;
};

// Interface for MongoDB product data
interface ProductHighlight {
    icon: string;
    label: string;
}

interface Product {
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
}

// Marquee text items
const marqueeItems = ["Launch Faster", "SEO-Ready Foundation", "Build Trust Online", "Convert More Users"];

export default function PrebuiltPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch products from MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/products');
                const data = await response.json();

                if (response.ok && data.products) {
                    setProducts(data.products);
                } else {
                    setError(data.error || "Failed to load products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Generate feature texts from product data
    const getProductFeatures = (product: Product): string[] => {
        // Use offerings descriptions if available, otherwise use default features
        if (product.offerings && product.offerings.length > 0) {
            return product.offerings.slice(0, 3).map(o => o.description);
        }
        return [
            `Launch your ${product.name.toLowerCase()} with a ready-to-use solution built for speed, trust, and growth.`,
            `Start with an SEO-friendly structure and conversion-focused experience to improve digital visibility.`,
            `Manage everything from one platform with integrated apps and admin controls for better user journeys.`
        ];
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section - White Theme with Modern Grid */}
            <section className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
                {/* Modern Grid Background */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Larger Grid Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '240px 240px'
                    }}
                />

                {/* Decorative Corner Elements */}
                <div className="absolute top-20 left-10 w-40 h-40">
                    <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
                    <div className="absolute top-4 left-4 w-full h-full border border-gray-300 rounded-3xl rotate-12 opacity-30" />
                </div>
                <div className="absolute bottom-32 right-10 w-32 h-32">
                    <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
                    <div className="absolute top-3 left-3 w-full h-full border border-gray-300 rounded-full opacity-30" />
                </div>
                <div className="absolute top-1/3 right-20 w-4 h-4 bg-gray-900 rounded-full opacity-20" />
                <div className="absolute top-1/2 left-16 w-3 h-3 bg-gray-900 rounded-full opacity-15" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gray-900 rounded-full opacity-10" />

                {/* Main Content */}
                <div className="relative z-10 text-center max-w-4xl">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-8 border border-gray-200">
                        <Sparkles className="w-4 h-4" />
                        Ready-to-Deploy Marketing + Product Solutions
                    </span>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        Prebuilt Saas Software for
                        <br />
                        <span className="text-gray-900">Growth-Focused Brands</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                        Skip long timelines and launch with confidence. Our prebuilt platforms combine
                        web quality, SEO readiness, and user-friendly UX/UI to help you grow faster.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="#products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Explore Products
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                                {loading ? (
                                    <span className="animate-pulse">...</span>
                                ) : (
                                    products.length
                                )}
                                +
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Product Categories</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gray-900">24h - 48h</p>
                            <p className="text-sm text-gray-500 mt-1">Fast Go-to-Market</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gray-900">100%</p>
                            <p className="text-sm text-gray-500 mt-1">Source Code Ownership</p>
                        </div>
                    </div>
                </div>

                {/* Scrolling Marquee */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-4 overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="mx-8 text-lg font-medium text-white flex items-center gap-3">
                                <span className="w-2 h-2 bg-white rounded-full" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section - White Background, Black Text */}
            <section id="products" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                            SaaS Products
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Explore Our{' '}
                            {loading ? (
                                <span className="animate-pulse inline-block w-8 h-8 bg-gray-200 rounded-lg translate-y-1"></span>
                            ) : (
                                products.length
                            )}{' '}
                            Categories
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Choose ready-to-deploy solutions designed to attract, engage, and convert users across industries.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Product Cards */}
                    {!loading && !error && (
                        <div className="space-y-32">
                            {products.map((product, index) => {
                                const features = getProductFeatures(product);
                                return (
                                    <div
                                        key={product.id}
                                        className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Product Preview Card */}
                                        <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                            <div className={`${product.gradient} rounded-3xl p-8 shadow-2xl`}>
                                                {/* Header */}
                                                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-4">
                                                    <span className="text-sm font-semibold text-gray-800">{product.name}</span>
                                                </div>

                                                {/* Tagline */}
                                                <p className="text-white/90 font-medium mb-2">{product.tagline}</p>
                                                <p className="text-white font-bold text-lg mb-6">{product.shortDescription}</p>

                                                {/* Preview Area */}
                                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                                                        {product.highlights && product.highlights.map((highlight) => {
                                                            const IconComponent = getIcon(highlight.icon);
                                                            return (
                                                                <div key={highlight.label} className="bg-white/30 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
                                                                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto mb-1" />
                                                                    <span className="text-[10px] sm:text-xs text-white/90 leading-tight block">{highlight.label}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                                                {product.name}
                                            </h3>

                                            {/* Numbered Features */}
                                            <div className="space-y-6 mb-8">
                                                {features.map((feature, i) => (
                                                    <div key={i} className="flex gap-4">
                                                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <p className="text-gray-600 leading-relaxed">{feature}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA Button */}
                                            {product.comingSoon ? (
                                                <button
                                                    disabled
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 rounded-full font-medium cursor-not-allowed"
                                                >
                                                    Coming Soon
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/prebuilt/${product.id}`}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Explore Solution
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Empty State - when no products */}
                    {!loading && !error && products.length === 0 && (
                        <div className="py-20">
                            {/* Animated Empty State */}
                            <div className="relative max-w-md mx-auto">
                                {/* Floating animated icons */}
                                <div className="relative h-48 flex items-center justify-center">
                                    {/* Central pulsing circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-gray-100 rounded-full animate-pulse" />
                                        <div className="absolute w-24 h-24 bg-gray-200 rounded-full animate-ping opacity-20" />
                                    </div>

                                    {/* Floating cards */}
                                    <div className="absolute top-0 left-1/4 w-16 h-12 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '0ms', animationDuration: '2s' }}>
                                        <div className="p-2">
                                            <div className="w-8 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-6 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute top-4 right-1/4 w-14 h-10 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '300ms', animationDuration: '2.5s' }}>
                                        <div className="p-2">
                                            <div className="w-6 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-4 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-1/3 w-12 h-10 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '600ms', animationDuration: '2.2s' }}>
                                        <div className="p-2">
                                            <div className="w-5 h-1.5 bg-gray-200 rounded" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-1/3 w-14 h-12 bg-white border border-gray-200 rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '900ms', animationDuration: '1.8s' }}>
                                        <div className="p-2">
                                            <div className="w-6 h-1.5 bg-gray-200 rounded mb-1" />
                                            <div className="w-8 h-1 bg-gray-100 rounded" />
                                        </div>
                                    </div>

                                    {/* Center icon */}
                                    <div className="relative z-10 w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
                                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                                    </div>
                                </div>

                                {/* Text content */}
                                <div className="text-center mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Yet</h3>
                                    <p className="text-gray-500 mb-6">We're working on amazing prebuilt solutions. Check back soon!</p>

                                    {/* Animated progress bar */}
                                    <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
                                        <div className="h-full bg-gray-900 rounded-full" style={{
                                            animation: 'loading-bar 2s ease-in-out infinite'
                                        }} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">Coming soon...</p>
                                </div>
                            </div>

                            {/* CSS for loading bar animation */}
                            <style jsx>{`
                                @keyframes loading-bar {
                                    0% { width: 0%; margin-left: 0; }
                                    50% { width: 60%; margin-left: 20%; }
                                    100% { width: 0%; margin-left: 100%; }
                                }
                            `}</style>
                        </div>
                    )}
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            Prebuilt SaaS Solutions in Alwar
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            What are prebuilt SaaS solutions? Building a product from scratch can take months and cost a lot. At StitchByte, we offer production-ready platforms in Alwar. Our solutions can be ready in just 48 hours. They come with SEO and mobile design built in. This helps you launch faster and save money.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Why is this good for Alwar businesses? Alwar is a fast-paced market across the Delhi NCR region. Speed is very important here. A restaurant or clinic that waits too long to launch loses money. Our prebuilt tools help you get online instantly. You get a high-quality platform without the high cost of custom work. This lets you compete with global brands right away.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our process is fast and clear. First, you pick a platform that fits your business. We have tools for restaurants, shops, and clinics. Next, we customize the design to match your brand. We test everything to make sure it works on all devices. Finally, we handle the launch for you. Your platform can be live in under two days.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our products include more than just design. They come with full backend logic and admin panels. You can manage your orders and users easily. You also own 100% of the source code. There are no hidden fees or monthly licenses. This gives you the freedom to grow your Alwar business your way.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            What Every Prebuilt Product Includes
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: "SEO-Ready Foundation", desc: "We use clean links and meta tags so your site ranks well on Google. Your site is ready for search engines from day one." },
                                { title: "Mobile-First Design", desc: "Every screen is built for phones, tablets, and desktops. Your users will have a smooth experience on any device." },
                                { title: "Admin Dashboard", desc: "Manage your content and orders from a simple panel. You do not need a developer for day-to-day work." },
                                { title: "Payment & Auth Integration", desc: "We include secure login and payment tools out of the box. Your business is ready to take orders safely." },
                                { title: "Full Source Code", desc: "You own all the code. You can host it on your own servers and grow your platform without any limits." },
                            ].map((item) => (
                                <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Ready to Launch Your Prebuilt Software?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Get started with our prebuilt solutions and launch your business faster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shared Footer Component */}
            <Footer />
        </div>
    );
}
