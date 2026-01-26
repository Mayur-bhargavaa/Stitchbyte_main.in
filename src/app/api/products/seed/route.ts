import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// Initial product data to seed
const initialProducts = [
    {
        id: "qr-restaurant",
        order: 1,
        name: "QR Restaurant Ordering System",
        tagline: "App + Web + Admin Panel",
        shortDescription: "Start Your Restaurant Digital Journey",
        heroTitle: "Smart Restaurant QR Ordering System",
        heroDescription: "Transform your restaurant with our complete digital ordering solution. Customers scan, order, and pay seamlessly while you manage everything from a powerful dashboard.",
        price: "₹45,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-orange-500 to-rose-600",
        gradient: "bg-gradient-to-br from-orange-500 to-rose-600",
        trustedCount: "50+",
        images: [
            "/products/qr-restaurant/screenshot1.png",
            "/products/qr-restaurant/screenshot2.png",
            "/products/qr-restaurant/screenshot3.png",
            "/products/qr-restaurant/screenshot4.png",
            "/products/qr-restaurant/screenshot5.png"
        ],
        offerings: [
            {
                icon: "Smartphone",
                title: "Customer App",
                description: "A sleek mobile experience where customers can scan QR codes, browse menus, customize orders, and track order status in real-time.",
                type: "download"
            },
            {
                icon: "Monitor",
                title: "Admin Dashboard",
                description: "Comprehensive control center for managing menus, orders, tables, analytics, staff accounts, and real-time notifications.",
                type: "checkout"
            },
            {
                icon: "UtensilsCrossed",
                title: "Kitchen Display",
                description: "Dedicated kitchen view for chefs to see incoming orders, manage prep times, and update order statuses efficiently.",
                type: "checkout"
            },
            {
                icon: "Users",
                title: "Waiter App",
                description: "Mobile app for waiters to take orders tableside, manage reservations, and provide personalized service to guests.",
                type: "download"
            }
        ],
        whyChooseTitle: "Why Choose Our QR Restaurant System?",
        whyChooseDescription: "Built for modern restaurants that want to deliver exceptional dining experiences while streamlining operations.",
        features: [
            { icon: "MapPin", title: "Multi-Location Support", description: "Manage multiple restaurant branches from a single dashboard with location-specific menus and pricing." },
            { icon: "Shield", title: "Complete Solution", description: "Everything you need - customer app, admin panel, kitchen display, and waiter app - all integrated seamlessly." },
            { icon: "Zap", title: "Real-time Sync", description: "Orders sync instantly across all devices. Kitchen gets notified the moment a customer places an order." },
            { icon: "CreditCard", title: "Multiple Payments", description: "Accept UPI, cards, wallets, and cash. Integrated with Razorpay and other popular gateways." },
            { icon: "BarChart3", title: "Smart Analytics", description: "Track best-selling items, peak hours, revenue trends, and customer preferences with detailed reports." },
            { icon: "LayoutGrid", title: "Menu Flexibility", description: "Create categories, add modifiers, set availability schedules, and manage pricing with ease." }
        ],
        highlights: [
            { icon: "QrCode", label: "QR Menus" },
            { icon: "Smartphone", label: "Mobile App" },
            { icon: "BarChart3", label: "Analytics" },
            { icon: "Bell", label: "Real-time Orders" }
        ],
        techStack: ["Next.js", "React Native", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
        faqs: [
            { question: "How quickly can I deploy this system?", answer: "We provide complete deployment support. Most restaurants go live within 24-48 hours after initial setup." },
            { question: "Do I get the complete source code?", answer: "Yes! You receive 100% source code ownership with full rights to customize and modify as needed." },
            { question: "What's included in the package?", answer: "Customer-facing QR ordering app, Admin dashboard, Kitchen display system, Waiter mobile app, and complete documentation." },
            { question: "Do you provide customization services?", answer: "Absolutely! We offer custom branding, feature additions, and integration services at additional costs." },
            { question: "What kind of support do you provide?", answer: "We provide 3 months of free technical support, deployment assistance, and documentation for self-maintenance." }
        ],
        demoLink: "/restaurant/signin",
        isActive: true,
        comingSoon: false
    },
    {
        id: "ecommerce",
        order: 2,
        name: "Multi-vendor E-Commerce Platform",
        tagline: "App + Web + Admin Panel",
        shortDescription: "Start Your Online Marketplace Business",
        heroTitle: "Multi-Vendor Marketplace Platform",
        heroDescription: "Launch your own Amazon or Flipkart-style marketplace. Connect multiple sellers with customers through a powerful e-commerce ecosystem.",
        price: "₹75,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-emerald-500 to-teal-600",
        gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
        trustedCount: "30+",
        images: [
            "/products/ecommerce/screenshot1.png",
            "/products/ecommerce/screenshot2.png",
            "/products/ecommerce/screenshot3.png",
            "/products/ecommerce/screenshot4.png",
            "/products/ecommerce/screenshot5.png"
        ],
        offerings: [
            {
                icon: "Smartphone",
                title: "Customer App",
                description: "Beautiful shopping app with product discovery, cart management, order tracking, and multiple payment options.",
                type: "download"
            },
            {
                icon: "Monitor",
                title: "Super Admin Panel",
                description: "Complete marketplace control - manage vendors, commissions, orders, payments, and platform-wide analytics.",
                type: "checkout"
            },
            {
                icon: "Store",
                title: "Vendor Dashboard",
                description: "Dedicated portal for sellers to manage products, inventory, orders, and view their sales analytics.",
                type: "checkout"
            },
            {
                icon: "Truck",
                title: "Delivery App",
                description: "Mobile app for delivery partners with route optimization, proof of delivery, and earnings tracking.",
                type: "download"
            }
        ],
        whyChooseTitle: "Why Choose Our E-Commerce Platform?",
        whyChooseDescription: "A complete marketplace solution that scales from startup to enterprise with powerful multi-vendor capabilities.",
        features: [
            { icon: "Store", title: "Multi-Vendor Ready", description: "Onboard unlimited sellers with approval workflows, commission structures, and individual dashboards." },
            { icon: "Shield", title: "Secure Transactions", description: "PCI-compliant payment processing with escrow, refunds, and fraud detection built-in." },
            { icon: "Truck", title: "Delivery Management", description: "Integrated logistics with delivery partner apps, real-time tracking, and automated assignments." },
            { icon: "CreditCard", title: "Split Payments", description: "Automatic commission deduction and vendor payouts with detailed transaction history." },
            { icon: "BarChart3", title: "Advanced Analytics", description: "GMV, seller performance, product trends, and customer insights at your fingertips." },
            { icon: "LayoutGrid", title: "Catalog Management", description: "Bulk uploads, variant management, inventory sync, and automated stock alerts." }
        ],
        highlights: [
            { icon: "Store", label: "Multi-vendor" },
            { icon: "CreditCard", label: "Payments" },
            { icon: "Truck", label: "Delivery" },
            { icon: "Users", label: "Customers" }
        ],
        techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "TypeScript", "Redis"],
        faqs: [
            { question: "Can I customize the commission structure?", answer: "Yes, you can set category-wise, seller-wise, or product-wise commission rates with full flexibility." },
            { question: "Does it support COD and prepaid orders?", answer: "Absolutely! The platform supports Cash on Delivery, online payments, wallets, and EMI options." },
            { question: "How many vendors can be onboarded?", answer: "Unlimited vendors! The platform is built to scale with proper database optimization and caching." },
            { question: "Is delivery partner management included?", answer: "Yes, complete delivery ecosystem with partner apps, automatic assignment, and tracking is included." },
            { question: "Can I add my own features later?", answer: "With full source code access, you can customize and extend the platform as your business grows." }
        ],
        demoLink: "https://trishaaya.com/",
        isActive: true,
        comingSoon: false
    },
    {
        id: "education",
        order: 3,
        name: "Online Learning & LMS Platform",
        tagline: "Web + App + Admin",
        shortDescription: "Transform Education with Digital Learning",
        heroTitle: "Complete E-Learning Management System",
        heroDescription: "Build your own Udemy or Coursera. Create, sell, and manage online courses with our powerful learning management platform.",
        price: "₹55,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-blue-500 to-indigo-600",
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
        trustedCount: "25+",
        images: [],
        offerings: [
            {
                icon: "Smartphone",
                title: "Student App",
                description: "Immersive learning app with video courses, quizzes, progress tracking, and offline download capabilities.",
                type: "download"
            },
            {
                icon: "Monitor",
                title: "Admin Dashboard",
                description: "Manage courses, instructors, students, payments, and view detailed learning analytics.",
                type: "checkout"
            },
            {
                icon: "GraduationCap",
                title: "Instructor Panel",
                description: "Dedicated portal for teachers to create courses, upload content, manage students, and track earnings.",
                type: "checkout"
            },
            {
                icon: "Globe",
                title: "Student Portal",
                description: "Web-based learning platform with course library, live classes, discussion forums, and certificates.",
                type: "checkout"
            }
        ],
        whyChooseTitle: "Why Choose Our LMS Platform?",
        whyChooseDescription: "Designed for educators, coaching institutes, and businesses who want to deliver world-class online learning experiences.",
        features: [
            { icon: "GraduationCap", title: "Course Builder", description: "Intuitive drag-and-drop course creation with video, PDF, quiz, and assignment modules." },
            { icon: "Shield", title: "Content Protection", description: "DRM-enabled videos, screen recording prevention, and secure content delivery." },
            { icon: "Users", title: "Live Classes", description: "Integrated video conferencing for live sessions with recording and replay features." },
            { icon: "CreditCard", title: "Monetization", description: "Sell courses with one-time, subscription, or bundle pricing with coupon support." },
            { icon: "BarChart3", title: "Learning Analytics", description: "Track student progress, completion rates, quiz scores, and engagement metrics." },
            { icon: "FileText", title: "Certifications", description: "Auto-generate branded certificates upon course completion with verification." }
        ],
        highlights: [
            { icon: "GraduationCap", label: "Courses" },
            { icon: "Users", label: "Students" },
            { icon: "BarChart3", label: "Progress" },
            { icon: "Smartphone", label: "Mobile App" }
        ],
        techStack: ["Next.js", "React Native", "Node.js", "MongoDB", "WebRTC", "AWS S3"],
        faqs: [
            { question: "Can instructors upload their own courses?", answer: "Yes! Instructors have dedicated dashboards to create and manage courses with revenue sharing." },
            { question: "Is video streaming included?", answer: "Yes, with adaptive bitrate streaming, DRM protection, and offline download capabilities." },
            { question: "Does it support live classes?", answer: "Integrated WebRTC-based live classes with recording, chat, and whiteboard features." },
            { question: "Can I issue certificates?", answer: "Automated certificate generation with QR-code verification and custom branding." },
            { question: "What payment options are supported?", answer: "One-time purchase, subscriptions, course bundles, and installment options are all supported." }
        ],
        demoLink: "",
        isActive: true,
        comingSoon: true
    },
    {
        id: "healthcare",
        order: 4,
        name: "Healthcare & Telemedicine Platform",
        tagline: "Web + App + Dashboard",
        shortDescription: "Digital Healthcare Solutions Made Easy",
        heroTitle: "Complete Telemedicine & Healthcare Solution",
        heroDescription: "Launch your digital healthcare platform with video consultations, appointment booking, and electronic health records management.",
        price: "₹85,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-cyan-500 to-blue-600",
        gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
        trustedCount: "15+",
        images: [],
        offerings: [
            {
                icon: "Smartphone",
                title: "Patient App",
                description: "Book appointments, consult doctors via video, access prescriptions, and manage health records securely.",
                type: "download"
            },
            {
                icon: "Monitor",
                title: "Clinic Dashboard",
                description: "Manage doctors, appointments, patients, billing, and view comprehensive healthcare analytics.",
                type: "checkout"
            },
            {
                icon: "Stethoscope",
                title: "Doctor App",
                description: "Mobile app for doctors to manage schedules, conduct video consultations, and write e-prescriptions.",
                type: "download"
            },
            {
                icon: "Globe",
                title: "Patient Portal",
                description: "Web platform for patients to book appointments, view reports, and communicate with healthcare providers.",
                type: "checkout"
            }
        ],
        whyChooseTitle: "Why Choose Our Healthcare Platform?",
        whyChooseDescription: "HIPAA-ready telemedicine solution designed for clinics, hospitals, and healthcare startups.",
        features: [
            { icon: "Stethoscope", title: "Video Consultations", description: "HD video calls with screen sharing, prescription writing, and session recording." },
            { icon: "Shield", title: "HIPAA Compliant", description: "End-to-end encryption, secure data storage, and compliance-ready infrastructure." },
            { icon: "Calendar", title: "Smart Scheduling", description: "Intelligent appointment booking with doctor availability, reminders, and rescheduling." },
            { icon: "FileText", title: "E-Prescriptions", description: "Digital prescriptions with medicine database, dosage instructions, and pharmacy integration." },
            { icon: "CreditCard", title: "Payment Integration", description: "Consultation fees, lab payments, and insurance claim management in one place." },
            { icon: "BarChart3", title: "Health Analytics", description: "Patient health trends, consultation reports, and practice management insights." }
        ],
        highlights: [
            { icon: "Stethoscope", label: "Consultations" },
            { icon: "Calendar", label: "Appointments" },
            { icon: "FileText", label: "Records" },
            { icon: "Bell", label: "Reminders" }
        ],
        techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
        faqs: [
            { question: "Is the platform HIPAA compliant?", answer: "The platform is designed with HIPAA compliance in mind with encrypted data storage and secure communications." },
            { question: "Can patients book lab tests?", answer: "Yes, with optional lab integration for booking tests and viewing reports digitally." },
            { question: "Does it support multiple doctors?", answer: "Unlimited doctors with individual schedules, specializations, and consultation fees." },
            { question: "Is video consultation included?", answer: "Yes, WebRTC-based HD video calls with recording and e-prescription capabilities." },
            { question: "Can this be used for hospitals?", answer: "The platform scales from individual clinics to multi-specialty hospitals with department management." }
        ],
        demoLink: "",
        isActive: true,
        comingSoon: true
    },
    {
        id: "realestate",
        order: 5,
        name: "Real Estate & Property Platform",
        tagline: "Web + App + CRM",
        shortDescription: "Digitize Your Property Business",
        heroTitle: "Complete Real Estate Property Platform",
        heroDescription: "Build your own 99acres or MagicBricks. List properties, connect buyers with sellers, and manage your real estate business digitally.",
        price: "₹65,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-amber-500 to-orange-600",
        gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
        trustedCount: "20+",
        images: [],
        offerings: [
            {
                icon: "Smartphone",
                title: "Buyer/Renter App",
                description: "Search properties, schedule visits, save favorites, and connect with agents directly from mobile.",
                type: "download"
            },
            {
                icon: "Monitor",
                title: "Admin Dashboard",
                description: "Manage listings, agents, leads, subscriptions, and view detailed property and user analytics.",
                type: "checkout"
            },
            {
                icon: "Building",
                title: "Agent Portal",
                description: "Dedicated CRM for agents to manage listings, leads, client communications, and track commissions.",
                type: "checkout"
            },
            {
                icon: "Globe",
                title: "Property Website",
                description: "SEO-optimized property listing website with advanced search, filters, and virtual tour support.",
                type: "checkout"
            }
        ],
        whyChooseTitle: "Why Choose Our Real Estate Platform?",
        whyChooseDescription: "Built for property dealers, real estate agencies, and proptech startups looking to digitize their operations.",
        features: [
            { icon: "Building", title: "Advanced Listings", description: "Rich property listings with photos, videos, floor plans, amenities, and neighborhood info." },
            { icon: "MapPin", title: "Map Integration", description: "Google Maps integration with nearby places, commute times, and area insights." },
            { icon: "Users", title: "Lead Management", description: "Capture, track, and nurture leads with automated follow-ups and conversion tracking." },
            { icon: "Home", title: "Virtual Tours", description: "360° virtual property tours and video walkthroughs for remote buyers." },
            { icon: "CreditCard", title: "Subscription Plans", description: "Monetize with agent subscriptions, featured listings, and premium placements." },
            { icon: "BarChart3", title: "Market Analytics", description: "Property trends, price comparisons, and demand-supply insights for informed decisions." }
        ],
        highlights: [
            { icon: "Building", label: "Listings" },
            { icon: "Users", label: "Agents" },
            { icon: "Home", label: "Virtual Tours" },
            { icon: "BarChart3", label: "Analytics" }
        ],
        techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Google Maps API", "Elasticsearch"],
        faqs: [
            { question: "Can agents list their own properties?", answer: "Yes, agents have dedicated dashboards to add, edit, and manage their property listings." },
            { question: "Does it support rental and sale listings?", answer: "Both! With separate filters, pricing models, and lead management for each type." },
            { question: "Is map search included?", answer: "Yes, with Google Maps integration, polygon search, and nearby amenities display." },
            { question: "Can I charge agents for listings?", answer: "Flexible monetization with agent subscriptions, pay-per-listing, and featured placements." },
            { question: "Is lead verification included?", answer: "OTP-based lead verification with spam protection and duplicate detection." }
        ],
        demoLink: "",
        isActive: true,
        comingSoon: true
    },
    {
        id: "portfolio",
        order: 6,
        name: "Portfolio & Agency Website Builder",
        tagline: "Web + CMS + Analytics",
        shortDescription: "Launch Your Professional Online Presence",
        heroTitle: "Professional Portfolio & Agency Builder",
        heroDescription: "Create stunning portfolio websites for agencies, freelancers, and businesses. Built-in CMS, blog, and analytics for your professional web presence.",
        price: "₹25,000",
        priceNote: "One-time payment • Lifetime license",
        color: "from-violet-500 to-purple-600",
        gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
        trustedCount: "40+",
        images: [],
        offerings: [
            {
                icon: "Globe",
                title: "Portfolio Website",
                description: "Stunning, responsive portfolio website with project showcases, team pages, and contact forms.",
                type: "checkout"
            },
            {
                icon: "Monitor",
                title: "CMS Dashboard",
                description: "Easy-to-use content management system to update projects, blogs, team members, and testimonials.",
                type: "checkout"
            },
            {
                icon: "FileText",
                title: "Blog System",
                description: "SEO-optimized blog with categories, tags, rich text editor, and social sharing capabilities.",
                type: "checkout"
            },
            {
                icon: "BarChart3",
                title: "Analytics Dashboard",
                description: "Track visitors, page views, popular content, and lead generation with detailed insights.",
                type: "checkout"
            }
        ],
        whyChooseTitle: "Why Choose Our Portfolio Builder?",
        whyChooseDescription: "Perfect for creative agencies, freelancers, and businesses who want a professional online presence.",
        features: [
            { icon: "Palette", title: "Beautiful Templates", description: "Multiple professionally designed templates with easy customization options." },
            { icon: "Code", title: "Custom Sections", description: "Add unlimited sections for services, case studies, testimonials, and more." },
            { icon: "Globe", title: "Custom Domain", description: "Connect your own domain with SSL certificate and professional email setup." },
            { icon: "FileText", title: "SEO Optimized", description: "Built-in SEO tools with meta tags, sitemaps, and structured data support." },
            { icon: "BarChart3", title: "Lead Capture", description: "Contact forms, newsletter signup, and CRM integration for lead management." },
            { icon: "Zap", title: "Fast & Responsive", description: "Lightning-fast loading with responsive design that looks great on all devices." }
        ],
        highlights: [
            { icon: "Layers", label: "Templates" },
            { icon: "Globe", label: "Custom Domain" },
            { icon: "FileText", label: "Blog" },
            { icon: "BarChart3", label: "Analytics" }
        ],
        techStack: ["Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Vercel"],
        faqs: [
            { question: "Can I customize the design?", answer: "Absolutely! Full source code access means unlimited customization possibilities." },
            { question: "Is hosting included?", answer: "Deployment guides for Vercel, Netlify, or your own server. Hosting is separate." },
            { question: "Can I add a blog?", answer: "Yes, fully integrated blog system with SEO optimization and social sharing." },
            { question: "Does it include contact forms?", answer: "Yes, with email notifications, spam protection, and optional CRM integration." },
            { question: "Can I sell services through it?", answer: "The platform focuses on portfolios, but we can add e-commerce features on request." }
        ],
        demoLink: "",
        isActive: true,
        comingSoon: true
    }
];

// This endpoint seeds the initial product data
export async function POST() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("prebuilt_products");

        // Check if products already exist
        const existingCount = await collection.countDocuments();
        if (existingCount > 0) {
            return NextResponse.json({
                success: false,
                message: `Products already exist (${existingCount} products). Use PUT to update.`
            });
        }

        // Insert all products
        const result = await collection.insertMany(initialProducts);

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${result.insertedCount} products`,
            insertedIds: result.insertedIds
        });

    } catch (error) {
        console.error("Error seeding products:", error);
        return NextResponse.json(
            { error: "Failed to seed products" },
            { status: 500 }
        );
    }
}
