"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import {
    ArrowRight,
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
    LucideIcon,
    Loader2
} from "lucide-react";

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
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
    LayoutGrid
};

// Helper function to get icon component from string name
const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Smartphone;
};

// Interfaces for MongoDB data
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

interface ProductData {
    id: string;
    name: string;
    tagline: string;
    heroTitle: string;
    heroDescription: string;
    price: string;
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
}

// Helper function to get product-specific content for the phone mockup
const getProductContent = (productId: string) => {
    const contentMap: Record<string, {
        menuTitle: string;
        promoTitle: string;
        promoText: string;
        items: string[];
        cartItems: { emoji: string; name: string; price: number }[];
        statusLabel: string;
        statusSteps: string[];
    }> = {
        'qr-restaurant': {
            menuTitle: 'Popular Items',
            promoTitle: "Today's Special",
            promoText: '20% off on all combos!',
            items: ['🍕', '🍔', '🍜', '🍣'],
            cartItems: [{ emoji: '🍕', name: 'Pizza', price: 299 }, { emoji: '🥤', name: 'Drink', price: 99 }],
            statusLabel: 'Order Status',
            statusSteps: ['Received', 'Cooking', 'Ready']
        },
        'ecommerce': {
            menuTitle: 'Trending Products',
            promoTitle: 'Flash Sale',
            promoText: 'Up to 50% off on electronics!',
            items: ['👕', '👟', '📱', '💻'],
            cartItems: [{ emoji: '👕', name: 'T-Shirt', price: 599 }, { emoji: '👟', name: 'Shoes', price: 1299 }],
            statusLabel: 'Delivery Status',
            statusSteps: ['Confirmed', 'Shipped', 'Delivered']
        },
        'education': {
            menuTitle: 'Popular Courses',
            promoTitle: 'New Course',
            promoText: 'Enroll now & get certificate!',
            items: ['📚', '💡', '🎓', '✏️'],
            cartItems: [{ emoji: '📚', name: 'Course 1', price: 999 }, { emoji: '🎓', name: 'Course 2', price: 1499 }],
            statusLabel: 'Course Progress',
            statusSteps: ['Enrolled', 'In Progress', 'Completed']
        },
        'healthcare': {
            menuTitle: 'Available Doctors',
            promoTitle: 'Book Consultation',
            promoText: 'First consultation free!',
            items: ['🩺', '💊', '🏥', '❤️'],
            cartItems: [{ emoji: '🩺', name: 'Consultation', price: 500 }, { emoji: '💊', name: 'Medicines', price: 250 }],
            statusLabel: 'Appointment Status',
            statusSteps: ['Booked', 'Confirmed', 'Completed']
        },
        'realestate': {
            menuTitle: 'Featured Properties',
            promoTitle: 'Hot Deal',
            promoText: 'Premium locations available!',
            items: ['🏠', '🏢', '🏘️', '🏡'],
            cartItems: [{ emoji: '🏠', name: '2BHK Flat', price: 4500000 }, { emoji: '🏢', name: 'Office', price: 2500000 }],
            statusLabel: 'Inquiry Status',
            statusSteps: ['Submitted', 'Viewing', 'Negotiating']
        },
        'portfolio': {
            menuTitle: 'Templates',
            promoTitle: 'Premium Theme',
            promoText: 'Professional designs!',
            items: ['🎨', '✨', '📄', '🖼️'],
            cartItems: [{ emoji: '🎨', name: 'Theme 1', price: 2999 }, { emoji: '✨', name: 'Theme 2', price: 4999 }],
            statusLabel: 'Project Status',
            statusSteps: ['Draft', 'Review', 'Published']
        }
    };
    return contentMap[productId] || contentMap['qr-restaurant'];
};

// Marquee items
const marqueeItems = ["Built with Excellence", "Deploy in 48 Hours", "100% Source Code", "Lifetime License", "Free Updates"];

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        brand: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Fetch product data from MongoDB
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products?slug=${slug}`);
                const data = await response.json();

                if (response.ok && data.product) {
                    setProduct(data.product);
                } else {
                    setError(data.error || "Product not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    productId: product?.id,
                    productName: product?.name
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitSuccess(true);
                setFormData({ name: "", phone: "", email: "", brand: "", message: "" });
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                alert(data.error || "Failed to submit enquiry. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting enquiry:", err);
            alert("Failed to submit enquiry. Please try again.");
        }

        setIsSubmitting(false);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
                    <Link href="/prebuilt" className="px-6 py-3 bg-gray-900 text-white rounded-full">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    // Get product images or use placeholders
    const productImages = product.images && product.images.length > 0
        ? product.images
        : ["/placeholder-1.png", "/placeholder-2.png", "/placeholder-3.png", "/placeholder-4.png", "/placeholder-5.png"];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Navigation */}
            <header className="fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50">
                <nav className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-2 sm:px-3 py-2 shadow-lg shadow-black/5">
                    <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2">
                        <Link href="/prebuilt" className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1">
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                        <Link href="/" className="px-2 sm:px-3 py-1 flex items-center">
                            <Image
                                src="/logo-stitchbyte.png"
                                alt="StitchByte"
                                width={120}
                                height={32}
                                className="h-6 sm:h-8 w-auto"
                            />
                        </Link>
                        <Link href="/contact" className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            <span className="hidden sm:inline">Contact Us</span>
                            <span className="sm:hidden">Contact</span>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Gradient Orbs */}
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${product.gradient} rounded-full blur-[120px] opacity-20`} />
                <div className={`absolute bottom-1/4 left-1/4 w-64 h-64 ${product.gradient} rounded-full blur-[100px] opacity-15`} />

                <div className="relative z-10 text-center max-w-4xl">
                    {/* Badge */}
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 ${product.gradient} text-white text-sm font-medium rounded-full mb-8`}>
                        <Sparkles className="w-4 h-4" />
                        {product.tagline}
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {product.heroTitle}
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        {product.heroDescription}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                        <p className="text-gray-500 text-sm mb-2">Software worth Lakhs at just</p>
                        <p className="text-5xl font-bold text-gray-900">{product.price}/-</p>
                        <p className="text-sm text-gray-500 mt-2">{product.priceNote}</p>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="#enquiry"
                        className={`inline-flex items-center gap-2 px-8 py-4 ${product.gradient} text-white font-medium rounded-full hover:opacity-90 transition-all hover:shadow-xl hover:-translate-y-0.5`}
                    >
                        Get this Software
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                    <Users className="w-5 h-5 text-gray-500" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Trusted by <span className="font-bold text-gray-900">{product.trustedCount}</span> Businesses
                        </p>
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

            {/* What We Offer Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                            What's Included
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Everything You Need to Launch
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Our complete package comes with all the tools and applications you need to start your digital business
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {product.offerings.map((offering, index) => {
                            const IconComponent = getIcon(offering.icon);
                            return (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className={`w-16 h-16 ${product.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{offering.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{offering.description}</p>
                                    <button className={`inline-flex items-center gap-2 px-4 py-2 ${offering.type === 'download' ? product.gradient + ' text-white' : 'bg-gray-100 text-gray-700'} rounded-full text-sm font-medium hover:opacity-90 transition-all`}>
                                        {offering.type === 'download' ? 'App Included' : 'Web Included'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Phone Mockup Showcase */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                            Preview
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Beautiful on Every Device
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Experience seamless performance across mobile, tablet, and desktop platforms
                        </p>
                    </div>

                    {/* Device Showcase */}
                    <div className="relative flex items-center justify-center py-8">
                        {/* Left Navigation Button */}
                        <button
                            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                            className="absolute left-4 lg:left-20 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg hover:scale-110"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Phone Mockup */}
                        <div className="relative z-20">
                            <div className={`w-64 h-[520px] ${product.gradient} rounded-[3rem] p-2 shadow-2xl transform hover:scale-105 transition-all duration-500`}>
                                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                                    {/* Phone Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10" />
                                    {/* Phone Content - Changes based on currentSlide */}
                                    <div className="h-full pt-10 pb-6 px-4 bg-gradient-to-b from-gray-100 to-white transition-all duration-300">
                                        {/* Header - Dynamic based on slide and product type */}
                                        <div className={`${product.gradient} rounded-xl p-3 mb-4`}>
                                            <p className="text-white text-xs font-medium text-center">
                                                {currentSlide === 0 && `Welcome to ${product.name.split(' ')[0]}`}
                                                {currentSlide === 1 && (
                                                    product.id === 'qr-restaurant' ? 'Browse Menu' :
                                                        product.id === 'ecommerce' ? 'Browse Products' :
                                                            product.id === 'education' ? 'Browse Courses' :
                                                                product.id === 'healthcare' ? 'Find Doctors' :
                                                                    product.id === 'realestate' ? 'Browse Properties' :
                                                                        'Browse Items'
                                                )}
                                                {currentSlide === 2 && 'Your Cart'}
                                                {currentSlide === 3 && getProductContent(product.id).statusLabel}
                                                {currentSlide === 4 && 'Settings'}
                                            </p>
                                        </div>

                                        {/* Dynamic Content Cards based on slide */}
                                        <div className="space-y-3">
                                            {currentSlide === 0 && product.offerings.slice(0, 3).map((offering, i) => {
                                                const Icon = getIcon(offering.icon);
                                                return (
                                                    <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 animate-fadeIn">
                                                        <div className={`w-10 h-10 ${product.gradient} rounded-lg flex items-center justify-center`}>
                                                            <Icon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-900">{offering.title}</p>
                                                            <p className="text-[10px] text-gray-500">{offering.type === 'download' ? 'Mobile App' : 'Web Panel'}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {currentSlide === 1 && (() => {
                                                const content = getProductContent(product.id);
                                                return (
                                                    <>
                                                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-xs font-bold text-gray-900">{content.menuTitle}</span>
                                                                <span className="text-[10px] text-gray-500">View All</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {content.items.map((emoji, i) => (
                                                                    <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                                                                        <span className="text-2xl">{emoji}</span>
                                                                        <p className="text-[9px] text-gray-600 mt-1">Item {i + 1}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className={`${product.gradient} rounded-xl p-3 text-white`}>
                                                            <p className="text-xs font-semibold">{content.promoTitle}</p>
                                                            <p className="text-[10px] opacity-80">{content.promoText}</p>
                                                        </div>
                                                    </>
                                                );
                                            })()}

                                            {currentSlide === 2 && (() => {
                                                const content = getProductContent(product.id);
                                                const total = content.cartItems.reduce((sum, item) => sum + item.price, 0);
                                                return (
                                                    <>
                                                        {content.cartItems.map((item, index) => (
                                                            <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                                    {item.emoji}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                                                                    <p className="text-[10px] text-gray-500">₹{item.price.toLocaleString()}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button className="w-6 h-6 bg-gray-100 rounded-full text-xs">−</button>
                                                                    <span className="text-xs">1</span>
                                                                    <button className={`w-6 h-6 ${product.gradient} rounded-full text-xs text-white`}>+</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className={`${product.gradient} rounded-xl p-3 text-white text-center`}>
                                                            <p className="text-sm font-bold">Total: ₹{total.toLocaleString()}</p>
                                                        </div>
                                                    </>
                                                );
                                            })()}

                                            {currentSlide === 3 && (() => {
                                                const content = getProductContent(product.id);
                                                return (
                                                    <>
                                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                                                            <div className={`w-16 h-16 ${product.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
                                                                <Clock className="w-8 h-8 text-white" />
                                                            </div>
                                                            <p className="text-sm font-bold text-gray-900">{content.statusLabel}</p>
                                                            <p className="text-[10px] text-gray-500">Processing...</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            {content.statusSteps.map((step, i) => (
                                                                <div key={step} className="text-center">
                                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${i <= 1 ? product.gradient + ' text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                                        {i < 1 ? '✓' : i + 1}
                                                                    </div>
                                                                    <p className="text-[8px] text-gray-500">{step}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                );
                                            })()}

                                            {currentSlide === 4 && (
                                                <>
                                                    {['Profile', 'Notifications', 'Help & Support'].map((setting, i) => (
                                                        <div key={setting} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                {[Users, Bell, FileText][i] && (() => {
                                                                    const Icon = [Users, Bell, FileText][i];
                                                                    return <Icon className="w-5 h-5 text-gray-600" />;
                                                                })()}
                                                            </div>
                                                            <p className="text-xs font-semibold text-gray-900">{setting}</p>
                                                            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="absolute bottom-4 left-4 right-4 bg-gray-900 rounded-2xl p-3 flex justify-around">
                                            {[Smartphone, LayoutGrid, Users, Settings].map((Icon, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentSlide(i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 4)}
                                                    className="transition-all"
                                                >
                                                    <Icon className={`w-5 h-5 ${(i === 0 && currentSlide === 0) || (i === 1 && currentSlide === 1) || (i === 2 && (currentSlide === 2 || currentSlide === 3)) || (i === 3 && currentSlide === 4) ? 'text-white' : 'text-gray-500'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Navigation Button */}
                        <button
                            onClick={() => setCurrentSlide(Math.min(4, currentSlide + 1))}
                            className="absolute right-4 lg:right-20 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg hover:scale-110"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Left Dashboard Preview */}
                        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
                            <div className="w-80 h-48 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    </div>
                                    <span className="text-[10px] text-gray-400 ml-2">Admin Dashboard</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {['₹45K', '128', '98%'].map((stat, i) => (
                                        <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                                            <p className="text-sm font-bold text-gray-900">{stat}</p>
                                            <p className="text-[8px] text-gray-500">{['Revenue', 'Orders', 'Rating'][i]}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <div className={`flex-1 h-12 ${product.gradient} rounded-lg opacity-80`} />
                                    <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Right Dashboard Preview */}
                        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
                            <div className="w-80 h-48 bg-gray-900 rounded-2xl shadow-xl p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    </div>
                                    <span className="text-[10px] text-gray-400 ml-2">Analytics Panel</span>
                                </div>
                                <div className="flex items-end gap-1 h-20 mb-2">
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                                        <div key={i} className={`flex-1 ${product.gradient} rounded-t opacity-80`} style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-500 text-center">Weekly Performance</p>
                            </div>
                        </div>
                    </div>

                    {/* Carousel Navigation Dots */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div className="flex gap-2">
                            {['Home', 'Menu', 'Cart', 'Orders', 'Settings'].map((label, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentSlide === i ? `${product.gradient} text-white shadow-lg` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots Gallery Section - Shows actual images from MongoDB */}
            {productImages.length > 0 && productImages[0] && (
                <section className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                                Screenshots
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                See It In Action
                            </h2>
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                Real screenshots from our live application showcasing the beautiful interface and features
                            </p>
                        </div>

                        {/* Main Image Display */}
                        <div className="relative mb-8">
                            <div className="relative w-full max-w-4xl mx-auto aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                                <Image
                                    src={productImages[currentSlide] || productImages[0]}
                                    alt={`${product.name} screenshot ${currentSlide + 1}`}
                                    fill
                                    className="object-cover transition-all duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-screenshot.png';
                                    }}
                                />
                                {/* Overlay with image number */}
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                                    {currentSlide + 1} / {productImages.length}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setCurrentSlide(currentSlide === 0 ? productImages.length - 1 : currentSlide - 1)}
                                className="absolute left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg hover:scale-110 z-10"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setCurrentSlide(currentSlide === productImages.length - 1 ? 0 : currentSlide + 1)}
                                className="absolute right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg hover:scale-110 z-10"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex justify-center gap-3 flex-wrap">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentSlide === index
                                        ? 'border-gray-900 shadow-lg scale-105 ring-2 ring-gray-900/20'
                                        : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        width={96}
                                        height={64}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder-thumb.png';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {productImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? `w-8 ${product.gradient.includes('orange') ? 'bg-orange-500' : product.gradient.includes('emerald') ? 'bg-emerald-500' : 'bg-gray-900'}`
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                            Why Us
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            {product.whyChooseTitle}
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            {product.whyChooseDescription}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {product.features.map((feature, index) => {
                            const IconComponent = getIcon(feature.icon);
                            return (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What's Included Table */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                            Complete Package
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Everything Included
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            No hidden costs. Get everything you need to launch and run your business successfully.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className={`${product.gradient} px-8 py-6`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-xl">{product.name}</h3>
                                    <p className="text-white/80 text-sm">{product.tagline}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/80 text-sm">One-time payment</p>
                                    <p className="text-white font-bold text-2xl">{product.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="divide-y divide-gray-100">
                            {[
                                { item: "Complete Source Code", included: true },
                                { item: "Mobile App (Android & iOS)", included: true },
                                { item: "Web Dashboard / Admin Panel", included: true },
                                { item: "Database Setup & Configuration", included: true },
                                { item: "API Documentation", included: true },
                                { item: "Deployment Guide", included: true },
                                { item: "3 Months Technical Support", included: true },
                                { item: "Free Updates (No new features)", included: true },
                                { item: "Custom Branding", included: true },
                                { item: "Lifetime License", included: true },
                            ].map((row, i) => (
                                <div key={i} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <span className="text-gray-700">{row.item}</span>
                                    {row.included ? (
                                        <div className={`w-6 h-6 ${product.gradient} rounded-full flex items-center justify-center`}>
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer CTA */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-gray-600 text-sm">
                                    Ready to get started? Contact us now!
                                </p>
                                <Link
                                    href="#enquiry"
                                    className={`px-6 py-3 ${product.gradient} text-white font-medium rounded-full hover:opacity-90 transition-all flex items-center gap-2`}
                                >
                                    Get this Package
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
                            Tech Stack
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                            Built with Modern Technology
                        </h2>
                        <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                            Our platform is designed to run seamlessly across web, Android, and iOS — so your customers can access it anytime, anywhere.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {product.techStack.map((tech, index) => (
                            <div
                                key={index}
                                className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Code className="w-5 h-5 text-white/70" />
                                    <span className="font-medium">{tech}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 mt-4">
                                Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {product.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-medium text-gray-900 flex items-center gap-3">
                                            <span className={`w-1 h-6 ${product.gradient} rounded-full`} />
                                            {faq.question}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enquiry Form Section */}
            <section id="enquiry" className="py-24 bg-gray-50">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="w-12 h-1 bg-gray-900 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Send us your Enquiry
                        </h2>
                        <p className="text-gray-600 mt-4">
                            Fill out the form below and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    {submitSuccess ? (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                            <p className="text-green-600">Your enquiry has been submitted successfully. We'll get back to you soon!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter your contact number"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Brand Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    placeholder="Enter your brand name"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    rows={4}
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
                                        Submit
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Ready to Launch Your {product.name.split(' ')[0]} Business?
                    </h2>
                    <p className="text-lg text-white/60 mb-10">
                        Get started today and deploy your platform within 48 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#enquiry"
                            className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
                        >
                            Get Started Now
                        </Link>
                        {product.demoLink && (
                            <Link
                                href={product.demoLink}
                                className="px-8 py-4 bg-transparent text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-colors"
                            >
                                View Live Demo
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
