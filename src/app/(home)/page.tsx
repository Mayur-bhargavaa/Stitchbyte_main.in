"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  UtensilsCrossed,
  ShoppingCart,
  ShoppingBag,
  Briefcase,
  FileText,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Github,
  Mail,
  QrCode,
  BarChart3,
  Users,
  Clock,
  Sparkles,
  Layers,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MessageCircle,
  CreditCard,
  Truck,
  Store,
  Bell,
  GraduationCap,
  Stethoscope,
  Home,
  Calendar,
  Building,
  Loader2,
  Star,
  User,
  LucideIcon,
  Megaphone,
  ArrowUpRight,
  Rocket,
  Brain,
  BrainCog,
  BadgeCheck,
  Play,
  Pause,
  Settings,
  ShieldCheck,
  Search,
  Code,
  Volume2,
  VolumeX,
  Maximize2,
  X,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomepageFAQSchema from "@/components/HomepageFAQSchema";
import { defaultSpotlightReels } from "@/lib/reels-data";

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
  Sparkles,
  UtensilsCrossed,
  ShoppingCart,
  Briefcase,
  Clock,
  Shield,
  Zap,
};

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
  gradient: string;
  highlights: ProductHighlight[];
  comingSoon?: boolean;
}

interface CustomProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
}

interface MarketingCaseStudy {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  category: "performance" | "seo";
  summary: string;
  highlights: string[];
}

interface UiUxProject {
  id: string;
  title: string;
  brand: string;
  projectType: "figma" | "pdf" | "website" | "other";
  summary: string;
  tags: string[];
  projectUrl: string;
}

interface ReviewCard {
  name: string;
  role?: string;
  reviewTitle?: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
  serviceType?: string;
  projectMonth?: string;
  projectYear?: string;
  projectSize?: string;
  isVerified?: boolean;
  tags?: string[];
  projectDuration?: string;
}

type WorkSource = "marketing" | "seo" | "uiux" | "prebuilt" | "customized";

interface HomeWorkCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  source: WorkSource;
  isExternal?: boolean;
}

const faqs = [
  {
    question: "What is Stitchbyte?",
    answer: "Stitchbyte is a global custom software development agency and digital transformation partner specializing in web development, native mobile app engineering, e-commerce systems, and cognitive artificial intelligence (AI) solutions. Under the tagline 'Where Code Meets Commerce', we design and build secure, scalable digital products that connect software engineering with business targets."
  },
  {
    question: "What services does Stitchbyte provide?",
    answer: "Stitchbyte provides custom software development, full-stack web development (React, Next.js, Node.js), mobile app engineering (iOS & Android via React Native and Flutter), e-commerce systems (headless commerce platforms), SaaS product design, artificial intelligence integration (custom LLMs and workflow automation), UI/UX atomic design systems, and digital marketing including Generative Engine Optimization (GEO)."
  },
  {
    question: "Where is Stitchbyte located?",
    answer: "Stitchbyte serves clients globally with key markets and target locations in the United States, the United Arab Emirates (UAE), and India (including our engineering center in Alwar). This multi-region setup enables us to provide local business strategy consulting alongside cost-effective offshore custom software engineering."
  },
  {
    question: "Why should businesses choose Stitchbyte as their technology partner?",
    answer: "Stitchbyte bridges the gap between premium design aesthetics and robust, enterprise-grade engineering. We create custom solutions that load instantly, scale smoothly, and maintain high security, while embedding SEO and AI discoverability (Generative Engine Optimization) directly into the code."
  },
  {
    question: "How long does it take to deliver a pre-built application or website?",
    answer: "Our pre-built web solutions are typically deployed within 24 to 48 hours. For custom enterprise integrations, native apps, or AI implementations, the timeline usually ranges from 2 to 6 weeks depending on product scope and feature complexity."
  },
  {
    question: "Do you provide the complete source code after development?",
    answer: "Yes. You receive complete ownership of the source code, databases, design assets, and cloud deployment scripts upon project delivery, ensuring zero vendor lock-in."
  },
  {
    question: "Does Stitchbyte use Google user data or Google OAuth?",
    answer: "Yes, Stitchbyte administrative portals and control hubs support secure login using Google OAuth authentication. We request access only to your basic Google profile details (name and email address) solely to verify administrator identity, authorize access to admin consoles, and manage site content (such as blogs, client reviews, and job listings). We do not share, sell, or use this data for any other purposes."
  }
];

const workTimeline = [
  {
    phase: "Discovery",
    duration: "3-5 days",
    details: "We align on goals, audience, scope, and constraints through a focused kickoff process.",
  },
  {
    phase: "Strategy",
    duration: "4-7 days",
    details: "We define the roadmap, information architecture, and channel priorities before production.",
  },
  {
    phase: "Build",
    duration: "2-6 weeks",
    details: "Design, development, SEO/ads setup, and QA move in clear sprint milestones.",
  },
  {
    phase: "Launch",
    duration: "2-4 days",
    details: "We handle deployment, analytics verification, and go-live checks for a stable release.",
  },
  {
    phase: "Optimization",
    duration: "Ongoing",
    details: "We monitor performance, iterate with data, and continuously improve business outcomes.",
  },
];

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="w-1 h-6 bg-gray-900 rounded-full flex-shrink-0 mt-0.5" />
        <span className="flex-1 text-gray-900 font-medium pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-900 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 pl-5 pr-8 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function SpotlightReelCard({
  reel,
}: {
  reel: {
    id: string;
    title: string;
    category?: string;
    duration?: string;
    thumbnailUrl: string;
    videoUrl?: string;
    reelUrl?: string;
  };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const fallbackVideo = "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728136/stitchbyte/blogs/g3mhltvai7bjp2qtyg32.mp4";
  const videoSrc = (reel.videoUrl && !reel.videoUrl.includes("instagram.com"))
    ? reel.videoUrl
    : fallbackVideo;

  useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== reel.id && videoRef.current && isPlaying) {
        videoRef.current.pause();
      }
    };
    window.addEventListener("sb-reel-play", handleOtherPlay);
    return () => window.removeEventListener("sb-reel-play", handleOtherPlay);
  }, [reel.id, isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 1.0;
    }
  }, [isMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      window.dispatchEvent(new CustomEvent("sb-reel-play", { detail: reel.id }));
      videoRef.current.play().catch(() => {
        // Fallback muted if browser audio autoplay blocked
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;

    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);

    // If user unmuted while paused, start playing so they immediately hear the audio
    if (!nextMuted && videoRef.current.paused) {
      window.dispatchEvent(new CustomEvent("sb-reel-play", { detail: reel.id }));
      videoRef.current.play().catch((err) => {
        console.warn("Could not play on unmute:", err);
      });
    }
  };

  return (
    <div
      onClick={togglePlay}
      className="relative aspect-[9/15.5] rounded-[28px] overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer bg-slate-950 flex flex-col justify-between select-none"
    >
      {/* Background Video (plays directly inside card) */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isPlaying ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
        }`}
        loop
        playsInline
        preload="metadata"
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Background Thumbnail (visible when paused or before start) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src={reel.thumbnailUrl}
          alt={reel.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 50vw, 300px"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none z-10" />

      {/* Top Bar: Category, Sound, Duration (z-30 above center overlays) */}
      <div className="relative z-30 p-4 flex items-center justify-between pointer-events-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-xs">
          {reel.category || "Culture"}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all border cursor-pointer shadow-md hover:scale-110 active:scale-95 ${
              isMuted
                ? "bg-black/70 border-white/20 text-white hover:bg-black/90"
                : "bg-red-600 border-red-500 text-white shadow-red-600/40 hover:bg-red-700"
            }`}
            title={isMuted ? "Click to Unmute" : "Click to Mute"}
            aria-label={isMuted ? "Click to Unmute" : "Click to Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
            )}
          </button>

          <span className="text-xs font-mono text-white/90 font-medium tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {reel.duration || "0:15"}
          </span>
        </div>
      </div>

      {/* Center Play/Pause Glassmorphic Button (pointer-events-none on full wrapper) */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-black/75 transition-all duration-300 pointer-events-auto cursor-pointer"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Bottom Info: Title, Underline, and Playback Status (z-30) */}
      <div className="relative z-30 p-5 pointer-events-auto">
        <h3 className="text-white text-base sm:text-[17px] font-bold leading-snug mb-3 line-clamp-2 drop-shadow-sm">
          {reel.title}
        </h3>
        <div className="w-8 h-[2px] bg-white/70 rounded-full mb-2.5" />
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 group-hover:text-white transition-all">
            {isPlaying ? "Pause Video" : "Play Video"} <ArrowRight className="w-3.5 h-3.5" />
          </span>
          {isPlaying && (
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-white font-mono uppercase tracking-wider">Playing</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultClientReviews: ReviewCard[] = [
  {
    name: "Ritika Sharma",
    role: "Founder, Basikali",
    reviewTitle: "Amazing website delivery",
    reviewText: "StitchByte delivered an amazing website for our brand. The design, speed and overall experience exceeded our expectations. Highly recommended!",
    rating: 5,
    isVerified: true,
    tags: ["Website Development", "UI/UX Design", "SEO"],
    projectDuration: "Project completed in 2 weeks",
  },
  {
    name: "Aman Khurana",
    role: "Founder, The Urban Kart",
    reviewTitle: "High-quality Shopify store",
    reviewText: "Working with StitchByte was one of the best decisions for our business. They understood our requirements deeply and delivered a high-quality Shopify store with complete brand setup. The team was responsive, professional and delivered on time.",
    rating: 5,
    isVerified: true,
    tags: ["Shopify Development", "Branding", "Performance Marketing"],
    projectDuration: "Project completed in 3 weeks",
  },
  {
    name: "Karan Mehta",
    role: "Director, Shivam Garden",
    reviewTitle: "End-to-end digital growth",
    reviewText: "Great experience with StitchByte! They handled our social media, ad campaigns and website development end-to-end. We saw a significant growth in leads within the first month itself.",
    rating: 5,
    isVerified: true,
    tags: ["Social Media Management", "Meta Ads", "Website"],
    projectDuration: "Project completed in 1 month",
  },
  {
    name: "Rohit Sharma",
    role: "CEO, TechNova Solutions",
    reviewTitle: "Exceptional UI/UX and code quality",
    reviewText: "The team at StitchByte transformed our SaaS platform with top-notch design and lightning-fast web performance. Incredible attention to detail!",
    rating: 5,
    isVerified: true,
    tags: ["Full Stack Dev", "Next.js", "UI/UX Redesign"],
    projectDuration: "Project completed in 4 weeks",
  },
  {
    name: "Sarah Jenkins",
    role: "Operations Head, Aura Living",
    reviewTitle: "Scalable e-commerce infrastructure",
    reviewText: "From discovery to final deployment, communication was crystal clear. Our conversions increased by over 40% after the store redesign.",
    rating: 5,
    isVerified: true,
    tags: ["E-Commerce", "CRO", "Custom Integration"],
    projectDuration: "Project completed in 3 weeks",
  },
];

function ClientReviewCard({
  review,
  isCenter = false,
}: {
  review: ReviewCard;
  isCenter?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between h-full group ${
        isCenter
          ? "border-slate-300 shadow-xl shadow-slate-200/80 lg:scale-[1.03] z-10 ring-1 ring-slate-900/5 -translate-y-1"
          : "border-slate-200/90 shadow-sm opacity-90 sm:opacity-95 hover:opacity-100 hover:shadow-md"
      }`}
    >
      <div>
        {/* Top Header: Quote Mark, Star Rating, Verified Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Red circular quote mark */}
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-serif text-2xl font-black select-none flex-shrink-0">
              “
            </div>
            {/* 5 Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, sIdx) => (
                <Star
                  key={sIdx}
                  className={`w-4 h-4 ${
                    sIdx < (review.rating || 5)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Verified Client Badge */}
          {review.isVerified !== false && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Client
            </span>
          )}
        </div>

        {/* Review Text */}
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal my-4 min-h-[90px]">
          "{review.reviewText}"
        </p>

        {/* Author: Default User Avatar + Client Details */}
        <div className="flex items-center gap-3 mt-4 pt-2">
          {/* Default user avatar icon */}
          <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200/90 flex items-center justify-center text-slate-600 shadow-2xs flex-shrink-0">
            <User className="w-5 h-5 text-slate-600" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base truncate">
                {review.name}
              </span>
              <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50 flex-shrink-0" />
            </div>
            <p className="text-xs text-slate-500 font-medium truncate">
              {review.role || review.serviceType || "Client"}
            </p>
          </div>
        </div>

        {/* Tags Row */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {review.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Project Duration & Circular Arrow Action */}
      <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{review.projectDuration || "Project completed in 3 weeks"}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

const whyStitchByteAdvantages = [
  {
    step: "01",
    title: "Speed of Thought",
    description: "Our workflow is optimized for rapid deployment without ever sacrificing quality or design integrity.",
    image: "/why-speed.jpg",
    alt: "Speed of Thought - Laptop with Build Grow Scale",
    badgeIcon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />,
    blobClass: "rounded-[55%_45%_60%_40%_/_50%_60%_40%_50%] transform -rotate-2 scale-95",
    containerClass: "rounded-[45px_65px_40px_60px]",
    badgePosition: "-top-3.5 -left-2.5 sm:-top-4 sm:-left-3.5",
  },
  {
    step: "02",
    title: "Strategic Depth",
    description: "Every pixel and line of code is measured against your primary business goals and KPIs.",
    image: "/why-strategic.jpg",
    alt: "Strategic Depth - Concrete Bar Graph with Upward Arrow",
    badgeIcon: <Settings className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />,
    blobClass: "-left-3 top-2 w-[85%] h-[92%] rounded-full bg-slate-100/70 border border-slate-200/40",
    containerClass: "rounded-[55%_45%_50%_50%_/_50%_50%_50%_50%]",
    badgePosition: "-bottom-3.5 -right-2.5 sm:-bottom-4 sm:-right-3.5",
  },
  {
    step: "03",
    title: "Trusted Partner",
    description: "We are committed to delivering reliable, results-driven digital solutions that support your long-term growth.",
    image: "/why-trusted.jpg",
    alt: "Trusted Partner - Professional Partnership Handshake",
    badgeIcon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />,
    blobClass: "-left-2 -bottom-2 w-[90%] h-[90%] rounded-full bg-slate-100/60",
    containerClass: "rounded-[50%_50%_55%_45%_/_45%_55%_45%_55%]",
    badgePosition: "-top-3.5 -right-2.5 sm:-top-4 sm:-right-3.5",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [spotlightVideoUrls, setSpotlightVideoUrls] = useState<string[]>([]);
  const [spotlightReels, setSpotlightReels] = useState<Array<{
    id: string;
    title: string;
    category?: string;
    duration?: string;
    thumbnailUrl: string;
    videoUrl?: string;
    reelUrl?: string;
    isActive?: boolean;
  }>>(defaultSpotlightReels);
  const [reelStartIndex, setReelStartIndex] = useState(0);

  const nextReel = () => {
    setReelStartIndex((prev) => (prev + 1) % (spotlightReels.length || 1));
  };

  const prevReel = () => {
    setReelStartIndex((prev) => (prev - 1 + (spotlightReels.length || 1)) % (spotlightReels.length || 1));
  };

  const activeVideos = spotlightVideoUrls.length > 0 
    ? spotlightVideoUrls 
    : ["https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-at-night-40342-large.mp4"];

  const [homeWorkCards, setHomeWorkCards] = useState<HomeWorkCard[]>([]);
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>(defaultClientReviews);
  const [activeReviewIndex, setActiveReviewIndex] = useState(1);
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [whyMobileIndex, setWhyMobileIndex] = useState(0);
  const [whyTouchStartX, setWhyTouchStartX] = useState<number | null>(null);

  const handleWhyTouchStart = (e: React.TouchEvent) => {
    setWhyTouchStartX(e.touches[0].clientX);
  };

  const handleWhyTouchEnd = (e: React.TouchEvent) => {
    if (whyTouchStartX === null) return;
    const diff = whyTouchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      setWhyMobileIndex((prev) => (prev + 1) % 3);
    } else if (diff < -45) {
      setWhyMobileIndex((prev) => (prev - 1 + 3) % 3);
    }
    setWhyTouchStartX(null);
  };

  const [workLoading, setWorkLoading] = useState(true);
  const [workError, setWorkError] = useState<string | null>(null);
  const displayReviewCards = reviewCards.filter((item) => item.name && item.reviewText);

  // Fetch mixed work cards from different sections
  useEffect(() => {
    const fetchHomeWorkCards = async () => {
      try {
        setWorkLoading(true);
        setWorkError(null);

        const [productsResponse, customResponse, marketingResponse, uiuxResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/custom-projects?category=all'),
          fetch('/api/marketing-case-studies'),
          fetch('/api/ui-ux-projects'),
        ]);

        const productsData = await productsResponse.json();
        const customData = await customResponse.json();
        const marketingData = await marketingResponse.json();
        const uiuxData = await uiuxResponse.json();

        const products: Product[] = Array.isArray(productsData.products) ? productsData.products : [];
        const customProjects: CustomProject[] = Array.isArray(customData.data) ? customData.data : [];
        const marketingStudies: MarketingCaseStudy[] = Array.isArray(marketingData.studies) ? marketingData.studies : [];
        const uiuxProjects: UiUxProject[] = Array.isArray(uiuxData.projects) ? uiuxData.projects : [];

        const firstMarketing = marketingStudies.find((item) => item.category === "performance");
        const firstSeo = marketingStudies.find((item) => item.category === "seo");
        const firstUiUx = uiuxProjects[0];
        const firstPrebuilt = products[0];
        const firstCustomized = customProjects[0];

        const cards: HomeWorkCard[] = [];

        if (firstMarketing) {
          cards.push({
            id: `marketing-${firstMarketing.id}`,
            title: firstMarketing.brand,
            subtitle: "Marketing Case Study",
            description: firstMarketing.summary,
            tags: firstMarketing.highlights || [],
            href: `/marketing/${firstMarketing.slug}`,
            source: "marketing",
          });
        }

        if (firstUiUx) {
          cards.push({
            id: `uiux-${firstUiUx.id}`,
            title: firstUiUx.title,
            subtitle: "UI & UX Project",
            description: firstUiUx.summary,
            tags: firstUiUx.tags || [],
            href: firstUiUx.projectUrl,
            source: "uiux",
            isExternal: true,
          });
        }

        if (firstSeo) {
          cards.push({
            id: `seo-${firstSeo.id}`,
            title: firstSeo.brand,
            subtitle: "SEO Case Study",
            description: firstSeo.summary,
            tags: firstSeo.highlights || [],
            href: `/marketing/${firstSeo.slug}`,
            source: "seo",
          });
        }

        if (firstPrebuilt) {
          cards.push({
            id: `prebuilt-${firstPrebuilt.id}`,
            title: firstPrebuilt.name,
            subtitle: "Prebuilt Solution",
            description: firstPrebuilt.shortDescription || firstPrebuilt.tagline,
            tags: (firstPrebuilt.highlights || []).map((item) => item.label),
            href: `/prebuilt/${firstPrebuilt.id}`,
            source: "prebuilt",
          });
        } else if (firstCustomized) {
          cards.push({
            id: `customized-${firstCustomized.id}`,
            title: firstCustomized.title,
            subtitle: "Customized Project",
            description: firstCustomized.description,
            tags: firstCustomized.technologies || [],
            href: `/customized/${firstCustomized.slug}`,
            source: "customized",
          });
        }

        if (cards.length === 0) {
          setWorkError("No work items available yet.");
        }

        setHomeWorkCards(cards.slice(0, 4));
      } catch (err) {
        console.error("Error fetching home work cards:", err);
        setWorkError("Failed to load work cards");
      } finally {
        setWorkLoading(false);
      }
    };

    fetchHomeWorkCards();
  }, []);

  useEffect(() => {
    const fetchReviewCards = async () => {
      try {
        const response = await fetch('/api/site-content/reviews');
        const data = await response.json();

        if (response.ok && data.success) {
          if (Array.isArray(data.reviewCards)) {
            const incomingCards = data.reviewCards
              .map((item: any) => ({
                name: typeof item?.name === "string" ? item.name.trim() : "",
                role: typeof item?.role === "string" ? item.role.trim() : "",
                reviewTitle: typeof item?.reviewTitle === "string" ? item.reviewTitle.trim() : "",
                reviewText: typeof item?.reviewText === "string" ? item.reviewText.trim() : "",
                rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
                avatarUrl: typeof item?.avatarUrl === "string" ? item.avatarUrl.trim() : "",
                serviceType: typeof item?.serviceType === "string" ? item.serviceType.trim() : "",
                projectMonth: typeof item?.projectMonth === "string" ? item.projectMonth.trim() : "",
                projectYear: typeof item?.projectYear === "string" ? item.projectYear.trim() : "",
                projectSize: typeof item?.projectSize === "string" ? item.projectSize.trim() : "",
                isVerified: typeof item?.isVerified === "boolean" ? item.isVerified : true,
                tags: Array.isArray(item?.tags) ? item.tags.filter((t: any) => typeof t === "string") : [],
                projectDuration: typeof item?.projectDuration === "string" ? item.projectDuration.trim() : "",
              }))
              .filter((item: ReviewCard) => item.name && item.reviewText);
            if (incomingCards.length > 0) {
              setReviewCards(incomingCards);
            }
          }
          const dbVideos: string[] = (data.spotlightVideoUrls && Array.isArray(data.spotlightVideoUrls))
            ? data.spotlightVideoUrls.filter((u: any) => typeof u === "string" && u.trim().length > 0 && !u.includes("instagram.com"))
            : [];

          if (data.spotlightVideoUrl && typeof data.spotlightVideoUrl === "string" && !data.spotlightVideoUrl.includes("instagram.com")) {
            if (!dbVideos.includes(data.spotlightVideoUrl.trim())) {
              dbVideos.push(data.spotlightVideoUrl.trim());
            }
          }

          if (dbVideos.length > 0) {
            setSpotlightVideoUrls(dbVideos);
          }

          if (data.spotlightReels && Array.isArray(data.spotlightReels) && data.spotlightReels.length > 0) {
            const activeOnly = data.spotlightReels.filter((r: any) => r.isActive !== false);
            if (activeOnly.length > 0) {
              const enrichedReels = activeOnly.map((reel: any, idx: number) => {
                const validVideo = (reel.videoUrl && typeof reel.videoUrl === "string" && !reel.videoUrl.includes("instagram.com"))
                  ? reel.videoUrl
                  : (dbVideos[idx] || dbVideos[0] || defaultSpotlightReels[idx % defaultSpotlightReels.length]?.videoUrl);
                return {
                  ...reel,
                  videoUrl: validVideo,
                };
              });
              setSpotlightReels(enrichedReels);
            }
          } else if (dbVideos.length > 0) {
            setSpotlightReels((prev) =>
              prev.map((reel, idx) => ({
                ...reel,
                videoUrl: (reel.videoUrl && !reel.videoUrl.includes("instagram.com"))
                  ? reel.videoUrl
                  : (dbVideos[idx] || dbVideos[0] || reel.videoUrl),
              }))
            );
          }
        }
      } catch (err) {
        console.error('Error fetching review cards:', err);
      }
    };

    fetchReviewCards();
  }, []);

  // Autoplay review rotation when not hovered
  useEffect(() => {
    if (displayReviewCards.length <= 1 || isReviewHovered) return;

    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % displayReviewCards.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [displayReviewCards.length, isReviewHovered]);

  const handleNextReview = () => {
    if (displayReviewCards.length <= 1) return;
    setActiveReviewIndex((prev) => (prev + 1) % displayReviewCards.length);
  };

  const handlePrevReview = () => {
    if (displayReviewCards.length <= 1) return;
    setActiveReviewIndex((prev) => (prev - 1 + displayReviewCards.length) % displayReviewCards.length);
  };

  const tailoredProducts = [
    {
      id: "marketing",
      title: "Strategic Marketing",
      subtitle: "Live Campaigns",
      isLive: true,
      description: "High-impact marketing systems designed to scale your reach and conversion through data-driven precision.",
      href: "/marketing",
      number: "01",
      image: "/tailored-marketing.jpg",
      tags: ["Meta Ads", "Growth Strategy", "Brand Positioning"],
    },
    {
      id: "seo",
      title: "Advanced SEO",
      subtitle: "SEO Strategy",
      isLive: false,
      description: "Commanding the first page of search results with surgical keyword targeting and technical expertise.",
      href: "/marketing",
      number: "02",
      image: "/tailored-seo.jpg",
      tags: ["On-Page SEO", "Technical SEO", "Content Strategy"],
    },
    {
      id: "uiux",
      title: "UI/UX Craft",
      subtitle: "UI/UX Design",
      isLive: false,
      description: "Human-centered designs that turn visitors into loyal customers.",
      href: "/ui-ux",
      number: "03",
      image: "/tailored-uiux.jpg",
      tags: ["UI Design", "UX Research", "Prototyping"],
    },
    {
      id: "web",
      title: "Modern Web Infrastructure",
      subtitle: "Web Development",
      isLive: false,
      description: "Scalable, secure and high-performance web solutions built for tomorrow.",
      href: "/customized",
      number: "04",
      image: "/tailored-web.jpg",
      tags: ["Web Development", "Cloud Setup", "Performance"],
    },
  ];

  const executionSteps = [
    {
      number: "01",
      title: "Discovery & Audit",
      description: "We dive deep into your brand's existing ecosystem to identify bottlenecks and growth opportunities.",
      icon: <Search className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-50/90 border border-red-100",
      image: "/process-discovery.jpg",
    },
    {
      number: "02",
      title: "Architecture & Design",
      description: "Low-fidelity wireframes evolve into pixel-perfect prototypes that prioritize user flow and brand identity.",
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-50/90 border border-blue-100",
      image: "/process-design.jpg",
    },
    {
      number: "03",
      title: "Technical Development",
      description: "Clean code meets high-performance hosting. We build scalable engines optimized for lightning speed.",
      icon: <Code className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-50/90 border border-emerald-100",
      image: "/process-dev.jpg",
    },
    {
      number: "04",
      title: "Launch & Scale",
      description: "Post-launch monitoring and iterative marketing campaigns to ensure your new product reaches its full potential.",
      icon: <Rocket className="w-5 h-5 text-amber-500" />,
      iconBg: "bg-amber-50/90 border border-amber-100",
      image: "/process-launch.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-neutral-900 selection:text-white">
      {/* Global Clean Square Grid Background matching reference */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section - Matching Reference Screenshot */}
        <section className="relative min-h-0 sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 sm:pt-32 pb-8 sm:pb-16 overflow-hidden">
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center w-full">
            
            {/* Team Portrait Image with smooth bottom fade */}
            <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex justify-center -mb-2 sm:-mb-4 md:-mb-6">
              <Image
                src="/stitchbyte-team.png"
                alt="Stitchbyte Founders & Team"
                width={1100}
                height={680}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 82%, transparent 99%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 99%)',
                }}
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 text-center leading-[1.08] mb-6 sm:mb-8">
              Build your Startup <br />
              with Stitchbyte
            </h1>

            {/* Call to Action Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-8">
              <a
                href="#apps"
                className="px-7 sm:px-8 py-3 sm:py-3.5 bg-black text-white text-sm md:text-base font-medium rounded-full hover:bg-neutral-800 transition-all shadow-sm hover:shadow"
              >
                Let&apos;s Explore
              </a>
              <Link
                href="/contact"
                className="px-7 sm:px-8 py-3 sm:py-3.5 bg-white text-gray-950 text-sm md:text-base font-medium rounded-full border border-gray-200/90 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </section>

        {/* Service Offerings Marquee Section */}
        <section className="py-4 sm:py-8 overflow-hidden bg-gradient-to-b from-transparent to-slate-50/50">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[
                { text: "Web Development", color: "bg-indigo-500" },
                { text: "UX/UI Design", color: "bg-violet-500" },
                { text: "Marketing Systems", color: "bg-amber-500" },
                { text: "Digital Presence", color: "bg-emerald-500" },
                { text: "SEO Strategy", color: "bg-cyan-500" },
              ].map((item, i) => (
                <span key={i} className="mx-12 text-2xl font-medium text-slate-500 tracking-wide inline-flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  {item.text}
                </span>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                { text: "Web Development", color: "bg-indigo-500" },
                { text: "UX/UI Design", color: "bg-violet-500" },
                { text: "Marketing Systems", color: "bg-amber-500" },
                { text: "Digital Presence", color: "bg-emerald-500" },
                { text: "SEO Strategy", color: "bg-cyan-500" },
              ].map((item, i) => (
                <span key={`dup-${i}`} className="mx-12 text-2xl font-medium text-slate-500 tracking-wide inline-flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  {item.text}
                </span>
              ))}
              {/* Triple to ensure smooth screen loop */}
              {[
                { text: "Web Development", color: "bg-indigo-500" },
                { text: "UX/UI Design", color: "bg-violet-500" },
                { text: "Marketing Systems", color: "bg-amber-500" },
                { text: "Digital Presence", color: "bg-emerald-500" },
                { text: "SEO Strategy", color: "bg-cyan-500" },
              ].map((item, i) => (
                <span key={`trip-${i}`} className="mx-12 text-2xl font-medium text-slate-500 tracking-wide inline-flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Grid - Tailored Bento Grid Theme */}
        <section id="apps" className="relative py-24 overflow-hidden bg-white">
          {/* Subtle Grid Backdrop matching the screenshot */}
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

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-3">
                  Our Tailored Products
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-normal leading-relaxed">
                  Precision-engineered digital solutions designed to elevate your brand&apos;s presence in the competitive landscape.
                </p>
              </div>
              
              <Link
                href="/work"
                className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 hover:scale-110 active:scale-95 transition-all shadow-md self-start md:self-auto"
                aria-label="View all work"
              >
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>            {/* Tailored Products Masonry / Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {tailoredProducts.map((card, index) => {
                const isWide = index === 0 || index === 3;
                const isFirstCard = card.id === "marketing";

                if (isWide) {
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group relative bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 overflow-hidden md:col-span-2 min-h-[380px]"
                    >
                      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 sm:gap-8 h-full">
                        {/* Left: Info Column */}
                        <div className="flex-1 flex flex-col justify-between z-10 min-w-0">
                          <div>
                            {/* Number & Live badge */}
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`text-sm font-semibold tracking-wide font-mono ${
                                  isFirstCard ? "text-red-500" : "text-gray-800"
                                }`}
                              >
                                {card.number}
                              </span>
                              <span className="w-5 h-[1.5px] bg-slate-300/80 inline-block" />
                              {isFirstCard && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 text-red-500 border border-red-100/80 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-full">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                  LIVE CAMPAIGNS
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-950 tracking-tight mb-2 sm:mb-2.5 group-hover:text-black transition-colors">
                              {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mb-6 line-clamp-3">
                              {card.description}
                            </p>
                          </div>

                          {/* Bottom Row: Arrow button + tags */}
                          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                                isFirstCard
                                  ? "border-red-200 bg-red-50/70 text-red-500 group-hover:bg-red-500 group-hover:text-white"
                                  : "border-slate-200 bg-white text-slate-700 group-hover:bg-black group-hover:text-white"
                              }`}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </div>

                            {card.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 sm:px-3 py-1 bg-slate-50/90 border border-slate-200/80 rounded-full text-[11px] sm:text-xs font-medium text-slate-600 whitespace-nowrap"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: 3D Illustration / Mockup image */}
                        <div className="w-full sm:w-[220px] md:w-[230px] lg:w-[260px] xl:w-[280px] aspect-[4/3] sm:aspect-auto flex-shrink-0 relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-inner self-stretch sm:self-auto min-h-[220px] sm:min-h-0">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                }

                // Compact Card (1 col)
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group relative bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 overflow-hidden md:col-span-1 min-h-[380px]"
                  >
                    {/* Top: Header Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold tracking-wide font-mono text-gray-800">
                          {card.number}
                        </span>
                        <span className="w-5 h-[1.5px] bg-slate-300/80 inline-block" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2 group-hover:text-black transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Middle: 3D Illustration / Mockup Image */}
                    <div className="w-full h-44 sm:h-48 md:h-40 lg:h-48 relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-inner my-2 flex-shrink-0">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                    </div>

                    {/* Bottom: Arrow button + tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white text-slate-700 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>

                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 sm:px-3 py-1 bg-slate-50/90 border border-slate-200/80 rounded-full text-[11px] sm:text-xs font-medium text-slate-600 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        {/* Why StitchByte Section */}
        <section id="features" className="relative py-24 sm:py-32 overflow-hidden bg-white">
          {/* Subtle flowing wave vectors in the background matching reference */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none opacity-40 overflow-hidden">
            <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-slate-200">
              <path d="M400,0 C300,100 200,80 150,200 C100,320 50,300 0,400" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M400,50 C320,130 230,120 180,230 C130,340 70,330 20,400" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M400,100 C340,160 260,160 210,260 C160,360 100,350 40,400" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] pointer-events-none opacity-30 overflow-hidden">
            <svg viewBox="0 0 350 350" fill="none" className="w-full h-full text-slate-200">
              <path d="M0,350 C100,280 120,200 80,100 C50,20 20,0 0,0" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M30,350 C120,290 140,220 100,120 C70,40 30,0 0,0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-24 flex flex-col items-center">
              <div className="flex items-center justify-center gap-2.5 mb-3.5">
                <span className="w-7 h-[1px] bg-slate-400/90" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
                  Our Advantage
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold text-gray-950 mb-4 tracking-tight">
                Why Stitch<span className="text-[#E11D48]">Byte</span>?
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
                We don&apos;t just build websites; we build growth engines that operate on autopilot.
              </p>
            </div>

            {/* Mobile Carousel (mobile device only) */}
            <div className="block md:hidden">
              <div
                className="relative overflow-hidden touch-pan-y"
                onTouchStart={handleWhyTouchStart}
                onTouchEnd={handleWhyTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${whyMobileIndex * 100}%)` }}
                >
                  {whyStitchByteAdvantages.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 px-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Step Indicator Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="w-8 h-8 rounded-full border border-slate-200/90 bg-white text-xs font-semibold text-slate-500 flex items-center justify-center">
                            {item.step}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            0{idx + 1} / 0{whyStitchByteAdvantages.length}
                          </span>
                        </div>

                        {/* Organic image cutout with floating Badge */}
                        <div className="relative w-full aspect-[4/3] mb-6 flex items-center justify-center">
                          {/* Background faint layered blob */}
                          <div className={`absolute inset-0 bg-slate-100/60 ${item.blobClass}`} />

                          {/* Main Image Container */}
                          <div className={`relative w-full h-full overflow-hidden ${item.containerClass} border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white group`}>
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          </div>

                          {/* Floating Badge */}
                          <div className={`absolute ${item.badgePosition} z-20 w-13 h-13 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-slate-800`}>
                            {item.badgeIcon}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl font-bold text-gray-950 mb-3 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Dual-Tone Progress Line */}
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="w-10 h-[2.5px] bg-black rounded-full" />
                        <span className="w-10 h-[2.5px] bg-slate-200/80 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls: Arrows & Indicator Dots */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setWhyMobileIndex((prev) => (prev - 1 + 3) % 3)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs active:scale-95 flex items-center justify-center cursor-pointer hover:border-slate-400"
                  aria-label="Previous advantage"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {whyStitchByteAdvantages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setWhyMobileIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === whyMobileIndex ? "w-6 bg-slate-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setWhyMobileIndex((prev) => (prev + 1) % 3)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs active:scale-95 flex items-center justify-center cursor-pointer hover:border-slate-400"
                  aria-label="Next advantage"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Three Column Features Grid with Vertical Dividers */}
            <div className="hidden md:grid md:grid-cols-3 divide-x divide-slate-200/80">
              {/* Column 1: Speed of Thought */}
              <div className="pb-12 md:pb-0 md:pr-8 lg:pr-12 flex flex-col justify-between">
                <div>
                  {/* Organic image cutout with floating Rocket badge */}
                  <div className="relative w-full aspect-[4/3] mb-8 flex items-center justify-center">
                    {/* Background faint layered blob */}
                    <div className="absolute inset-0 bg-slate-100/60 rounded-[55%_45%_60%_40%_/_50%_60%_40%_50%] transform -rotate-2 scale-95" />

                    {/* Main Image Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-[45px_65px_40px_60px] border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white group">
                      <Image
                        src="/why-speed.jpg"
                        alt="Speed of Thought - Laptop with Build Grow Scale"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>

                    {/* Floating Rocket Badge */}
                    <div className="absolute -top-3.5 -left-2.5 sm:-top-4 sm:-left-3.5 z-20 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-slate-800 transition-transform duration-300 hover:scale-110">
                      <Rocket className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 tracking-tight">
                    Speed of Thought
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                    Our workflow is optimized for rapid deployment without ever sacrificing quality or design integrity.
                  </p>
                </div>

                {/* Bottom Dual-Tone Progress Line */}
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-10 h-[2.5px] bg-black rounded-full" />
                  <span className="w-10 h-[2.5px] bg-slate-200/80 rounded-full" />
                </div>
              </div>

              {/* Column 2: Strategic Depth */}
              <div className="py-12 md:py-0 md:px-8 lg:px-12 flex flex-col justify-between">
                <div>
                  {/* Top 02 indicator */}
                  <div className="w-8 h-8 rounded-full border border-slate-200/90 bg-white text-xs font-semibold text-slate-500 flex items-center justify-center mb-4">
                    02
                  </div>

                  {/* Layered disks cutout with floating Settings badge */}
                  <div className="relative w-full aspect-[4/3] mb-8 flex items-center justify-center">
                    {/* Layered concentric disk behind */}
                    <div className="absolute -left-3 top-2 w-[85%] h-[92%] rounded-full bg-slate-100/70 border border-slate-200/40" />

                    {/* Main Image Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-[55%_45%_50%_50%_/_50%_50%_50%_50%] border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white group">
                      <Image
                        src="/why-strategic.jpg"
                        alt="Strategic Depth - Concrete Bar Graph with Upward Arrow"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>

                    {/* Floating Gear / Settings Badge */}
                    <div className="absolute -bottom-3.5 -right-2.5 sm:-bottom-4 sm:-right-3.5 z-20 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-slate-800 transition-transform duration-300 hover:scale-110">
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 tracking-tight">
                    Strategic Depth
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                    Every pixel and line of code is measured against your primary business goals and KPIs.
                  </p>
                </div>

                {/* Bottom Dual-Tone Progress Line */}
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-10 h-[2.5px] bg-black rounded-full" />
                  <span className="w-10 h-[2.5px] bg-slate-200/80 rounded-full" />
                </div>
              </div>

              {/* Column 3: Trusted Partner */}
              <div className="pt-12 md:pt-0 md:pl-8 lg:pl-12 flex flex-col justify-between">
                <div>
                  {/* Top 03 indicator */}
                  <div className="w-8 h-8 rounded-full border border-slate-200/90 bg-white text-xs font-semibold text-slate-500 flex items-center justify-center mb-4">
                    03
                  </div>

                  {/* Oval cutout with floating ShieldCheck badge */}
                  <div className="relative w-full aspect-[4/3] mb-8 flex items-center justify-center">
                    {/* Background subtle offset curve */}
                    <div className="absolute -left-2 -bottom-2 w-[90%] h-[90%] rounded-full bg-slate-100/60" />

                    {/* Main Image Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-[50%_50%_55%_45%_/_45%_55%_45%_55%] border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white group">
                      <Image
                        src="/why-trusted.jpg"
                        alt="Trusted Partner - Professional Partnership Handshake"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>

                    {/* Floating Shield Check Badge */}
                    <div className="absolute -top-3.5 -right-2.5 sm:-top-4 sm:-right-3.5 z-20 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-slate-800 transition-transform duration-300 hover:scale-110">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 tracking-tight">
                    Trusted Partner
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                    We are committed to delivering reliable, results-driven digital solutions that support your long-term growth.
                  </p>
                </div>

                {/* Bottom Dual-Tone Progress Line */}
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-10 h-[2.5px] bg-black rounded-full" />
                  <span className="w-10 h-[2.5px] bg-slate-200/80 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The StitchByte Execution Model Section */}
        <section id="how-we-work" className="relative py-24 sm:py-32 overflow-hidden bg-white">
          {/* Subtle Grid Backdrop */}
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

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column - Title & Pedestal Laptop Mockup */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-[1.5px] bg-[#EF4444]" />
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#EF4444] uppercase">
                    Our Process
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-950 mb-4 tracking-tight leading-[1.12]">
                  The StitchByte <br />
                  <span className="text-[#EF4444]">Execution</span> Model
                </h2>

                <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-md leading-relaxed font-normal">
                  A transparent, four-stage process refined over hundreds of successful deployments.
                </p>

                {/* Realistic 3D Pedestal Laptop Mockup Scene */}
                <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.06)] border border-slate-100 bg-white group">
                  <Image
                    src="/execution-laptop-pedestal.jpg"
                    alt="StitchByte Execution Model Laptop and Metrics"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 550px"
                  />
                </div>
              </div>

              {/* Right Column - Timeline & Process Step Cards */}
              <div className="lg:col-span-7 relative">
                {/* Central Connecting Dotted Line */}
                <div className="hidden sm:block absolute left-5 top-7 bottom-7 w-0 border-l-2 border-dashed border-slate-200 z-0" />

                <div className="space-y-4 sm:space-y-5 relative z-10">
                  {executionSteps.map((step) => (
                    <div key={step.number} className="flex items-center gap-3.5 sm:gap-5">
                      {/* Numbered timeline pill */}
                      <div className="w-10 h-10 rounded-full border border-slate-200/90 bg-white shadow-xs font-mono text-xs font-semibold text-slate-700 flex items-center justify-center flex-shrink-0 z-10">
                        {step.number}
                      </div>

                      {/* Step Card */}
                      <div className="flex-1 bg-white rounded-[24px] border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden group">
                        {/* Left: Icon + Content */}
                        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${step.iconBg}`}>
                            {step.icon}
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-base sm:text-[17px] font-bold text-gray-950 tracking-tight mb-1 group-hover:text-black transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-sm line-clamp-2">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Right: Mockup Preview Image */}
                        <div className="w-full sm:w-36 md:w-40 lg:w-44 aspect-[16/10] rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-50 border border-slate-100 shadow-inner">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 180px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Scenes at StitchByte (Spotlight Reels) */}
        <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28 relative overflow-hidden">
          {/* Section Header */}
          <div className="relative text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF6F0] border border-[#f0dfc8] text-[#c06728] text-xs font-semibold rounded-full mb-3.5 shadow-2xs">
              <Instagram className="w-3.5 h-3.5" />
              <span>FEATURED REEL</span>
            </div>

            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950">
                Behind the Scenes at Stitch<span className="text-[#EF4444]">Byte</span>
              </h2>
              <span className="absolute -top-3 -right-6 text-[#EF4444] text-xl font-bold select-none rotate-12" aria-hidden="true">
                {'//'}
              </span>
            </div>

            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mt-2.5 font-normal">
              Watch our latest spotlight video and see how ideas turn into real digital experiences.
            </p>

            {/* Hand-drawn decorative sketch on the right */}
            <div className="hidden lg:flex flex-col items-center absolute right-4 top-2 text-slate-400 select-none pointer-events-none">
              <div className="font-serif italic text-xs leading-tight tracking-wide text-slate-400/90 text-right">
                Ideas<br />People<br />Process<br />Impact
              </div>
              <svg className="w-7 h-7 text-slate-300 mt-1 transform -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 4 C16 12 10 16 4 18 M4 18 L8 18 M4 18 L4 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Desktop Left / Right Arrow Buttons */}
            <div className="hidden xl:flex items-center justify-between absolute -left-6 -right-6 top-1/2 -translate-y-1/2 pointer-events-none z-20">
              <button
                onClick={prevReel}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg hover:shadow-xl flex items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
                aria-label="Previous Reel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextReel}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg hover:shadow-xl flex items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
                aria-label="Next Reel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile: Horizontal Carousel */}
            <div className="sm:hidden">
              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              >
                {spotlightReels.map((reel) => (
                  <div key={reel.id} className="snap-center flex-shrink-0 w-[78vw] max-w-[300px]">
                    <SpotlightReelCard reel={reel} />
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet & Desktop: 4 Cards Row matching reference */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {(spotlightReels.length > 4
                ? Array.from({ length: 4 }).map((_, i) => spotlightReels[(reelStartIndex + i) % spotlightReels.length])
                : spotlightReels.slice(0, 4)
              ).map((reel) => (
                <SpotlightReelCard key={reel.id} reel={reel} />
              ))}
            </div>

            {/* Pagination Indicator Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {spotlightReels.slice(0, Math.min(spotlightReels.length, 6)).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReelStartIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === (reelStartIndex % Math.max(1, spotlightReels.length)) ? "w-6 bg-black" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to reel ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Client Reviews Section */}
        <section
          className="relative py-20 px-6 bg-slate-50/50 overflow-hidden border-t border-b border-slate-100"
          onMouseEnter={() => setIsReviewHovered(true)}
          onMouseLeave={() => setIsReviewHovered(false)}
        >
          {/* Subtle Square Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header: Badge, Title, View All Reviews button */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-full shadow-2xs mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Client Reviews
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
                  What Clients Shared
                </h2>
              </div>

              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-full border border-slate-300 hover:border-slate-900 hover:shadow-xs transition-all self-start sm:self-auto"
              >
                View All Reviews
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {displayReviewCards.length > 0 ? (
              <div className="relative">
                {/* Previous Button */}
                {displayReviewCards.length > 1 && (
                  <button
                    onClick={handlePrevReview}
                    className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md hover:shadow-lg hover:border-slate-400 hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* 3-Card Responsive Grid with Featured Center Card */}
                {(() => {
                  const N = displayReviewCards.length;
                  const leftCard = displayReviewCards[(activeReviewIndex - 1 + N) % N];
                  const centerCard = displayReviewCards[activeReviewIndex % N];
                  const rightCard = displayReviewCards[(activeReviewIndex + 1) % N];

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch py-2">
                      <div className="hidden lg:block h-full">
                        <ClientReviewCard review={leftCard} isCenter={false} />
                      </div>
                      <div className="h-full">
                        <ClientReviewCard review={centerCard} isCenter={true} />
                      </div>
                      <div className="hidden md:block h-full">
                        <ClientReviewCard review={rightCard} isCenter={false} />
                      </div>
                    </div>
                  );
                })()}

                {/* Next Button */}
                {displayReviewCards.length > 1 && (
                  <button
                    onClick={handleNextReview}
                    className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md hover:shadow-lg hover:border-slate-400 hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Pagination Indicator Dots */}
                {displayReviewCards.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {displayReviewCards.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => setActiveReviewIndex(dotIndex)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          dotIndex === (activeReviewIndex % displayReviewCards.length)
                            ? "w-6 bg-slate-900"
                            : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to review ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto text-center bg-white border border-slate-200 rounded-3xl p-8">
                <p className="text-slate-500">No reviews available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-24 bg-white">
          <HomepageFAQSchema />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left - Title */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
                  Frequently Asked <br /> Questions
                </h2>
              </div>

              {/* Right - FAQ Items */}
              <div>
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shared Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
