"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    images?: string[];
    category?: string;
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

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 text-center leading-[1.1] mb-6">
                        Prebuilt Saas Software for
                        <br />
                        Startups
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-500 font-normal max-w-2xl mx-auto leading-relaxed mb-10 text-center">
                        Skip the long wait and high costs. Our prebuilt platforms help you go digital faster without compromising on quality.
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
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 text-center mb-4">
                            Explore Our{' '}
                            {loading ? (
                                <span className="animate-pulse inline-block w-8 h-8 bg-gray-200 rounded-lg translate-y-1"></span>
                            ) : (
                                products.length
                            )}{' '}
                            Categories
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 font-normal max-w-2xl mx-auto leading-relaxed text-center">
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
                                        <div className={`${index % 2 === 1 ? 'md:order-2' : ''} w-full`}>
                                            <div className="bg-gray-50/80 rounded-[32px] p-5 sm:p-7 aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200/40 shadow-sm">
                                                <div className="bg-white rounded-[24px] p-3 sm:p-4 shadow-lg border border-gray-100/80 w-full h-full flex flex-col justify-between">
                                                    {/* Browser Chrome Header */}
                                                    <div className="bg-gray-50/80 border-b border-gray-100/80 px-3 py-2 flex items-center justify-between select-none rounded-t-xl mb-3">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-2 h-2 rounded-full bg-red-400/80" />
                                                            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                                                            <div className="w-2 h-2 rounded-full bg-green-400/80" />
                                                        </div>
                                                        <div className="h-4.5 w-32 bg-white border border-gray-100 rounded-md text-[8px] font-mono text-gray-400 flex items-center justify-center">
                                                            {product.id}.stitchbyte.in
                                                        </div>
                                                        <div className="w-6" />
                                                    </div>
                                                    
                                                    {/* Image Container / Preview Area */}
                                                    <div className="relative flex-1 w-full bg-white flex items-center justify-center overflow-hidden rounded-lg border border-gray-100">
                                                        {product.images && product.images.length > 0 && product.images[0] ? (
                                                            <Image
                                                                src={product.images[0]}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover object-top"
                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className={`absolute inset-0 ${product.gradient || 'bg-gradient-to-br from-indigo-500 to-violet-600'} p-6 flex flex-col justify-between text-white`}>
                                                                <div>
                                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                                                                        {product.category || 'Saas'}
                                                                    </span>
                                                                    <h4 className="text-sm font-bold mt-2 leading-tight">{product.name}</h4>
                                                                    <p className="text-[10px] text-white/80 line-clamp-2 mt-1 leading-normal">{product.tagline}</p>
                                                                </div>
                                                                
                                                                <div className="grid grid-cols-2 gap-1.5 w-full mt-2">
                                                                    {product.highlights && product.highlights.slice(0, 2).map((highlight) => {
                                                                        const IconComponent = getIcon(highlight.icon);
                                                                        return (
                                                                            <div key={highlight.label} className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
                                                                                <IconComponent className="w-3.5 h-3.5 text-white mx-auto mb-0.5" />
                                                                                <span className="text-[8px] text-white/90 leading-tight block truncate">{highlight.label}</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
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
