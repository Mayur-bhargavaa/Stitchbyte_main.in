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
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
  reviewTitle?: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
  serviceType?: string;
  projectMonth?: string;
  projectYear?: string;
  projectSize?: string;
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
    question: "How long does it take to deliver a pre-built application or website?",
    answer: "Our pre-built solutions are typically ready for deployment within 24-48 hours. For custom integrations, the timeline extends to 1-2 weeks depending on complexity."
  },
  {
    question: "Do you provide the complete source code after development?",
    answer: "Yes, absolutely! You receive full ownership of the source code, including all assets, documentation, and deployment scripts."
  },
  {
    question: "What's the difference between a pre-built and a custom development project?",
    answer: "Pre-built projects use our existing templates and can be quickly customized. Custom development is built from scratch according to your unique specifications."
  },
  {
    question: "Do you provide maintenance and support after delivery?",
    answer: "Yes, we offer various support packages including bug fixes, feature updates, and 24/7 technical support options."
  },
  {
    question: "What technologies do you use for development?",
    answer: "We use modern technologies including Next.js, React, TypeScript, Tailwind CSS, and various databases like PostgreSQL and MongoDB."
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

function SpotlightVideoCard({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div 
      className="w-full aspect-[9/16] rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-black relative group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
      />
      {/* Premium Glassmorphic Play/Pause Button Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-300 ${
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      }`}>
        <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white/40">
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [spotlightVideoUrls, setSpotlightVideoUrls] = useState<string[]>([]);

  const activeVideos = spotlightVideoUrls.length > 0 
    ? spotlightVideoUrls 
    : ["https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-at-night-40342-large.mp4"];

  const [homeWorkCards, setHomeWorkCards] = useState<HomeWorkCard[]>([]);
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);
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
              .map((item: ReviewCard) => ({
                name: typeof item?.name === "string" ? item.name.trim() : "",
                reviewTitle: typeof item?.reviewTitle === "string" ? item.reviewTitle.trim() : "",
                reviewText: typeof item?.reviewText === "string" ? item.reviewText.trim() : "",
                rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
                avatarUrl: typeof item?.avatarUrl === "string" ? item.avatarUrl.trim() : "",
                serviceType: typeof item?.serviceType === "string" ? item.serviceType.trim() : "",
                projectMonth: typeof item?.projectMonth === "string" ? item.projectMonth.trim() : "",
                projectYear: typeof item?.projectYear === "string" ? item.projectYear.trim() : "",
                projectSize: typeof item?.projectSize === "string" ? item.projectSize.trim() : "",
              }))
              .filter((item: ReviewCard) => item.name && item.reviewText);
            setReviewCards(incomingCards);
          }
          if (data.spotlightVideoUrls && Array.isArray(data.spotlightVideoUrls) && data.spotlightVideoUrls.length > 0) {
            setSpotlightVideoUrls(data.spotlightVideoUrls);
          } else if (data.spotlightVideoUrl) {
            setSpotlightVideoUrls([data.spotlightVideoUrl]);
          }
        }
      } catch (err) {
        console.error('Error fetching review cards:', err);
      }
    };

    fetchReviewCards();
  }, []);

  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [displayReviewCards.length]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleReviewCount(1);
      } else if (window.innerWidth < 1280) {
        setVisibleReviewCount(2);
      } else {
        setVisibleReviewCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (displayReviewCards.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentReviewIndex((current) => (current + 1) % displayReviewCards.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [displayReviewCards.length]);

  const reviewTrackCards =
    displayReviewCards.length > visibleReviewCount
      ? [...displayReviewCards, ...displayReviewCards.slice(0, visibleReviewCount)]
      : displayReviewCards;

  const tailoredProducts = [
    {
      id: "marketing",
      title: "Strategic Marketing",
      subtitle: "Live Campaigns",
      description: "High-impact marketing systems designed to scale your reach and conversion through data-driven precision.",
      href: "/marketing",
      number: "01",
    },
    {
      id: "seo",
      title: "Advanced SEO",
      subtitle: "SEO Strategy",
      description: "Commanding the first page of search results with surgical keyword targeting.",
      href: "/marketing",
      number: "02",
      icon: BarChart3,
    },
    {
      id: "uiux",
      title: "UI/UX Craft",
      subtitle: "UI/UX Design",
      description: "Immersive user journeys that blend aesthetic purity with conversion psychology.",
      href: "/ui-ux",
      number: "03",
      icon: Layers,
    },
    {
      id: "web",
      title: "Modern Web Infrastructure",
      subtitle: "Web Development",
      description: "Fast, secure, and accessible web experiences built on the industry's most robust tech stacks.",
      href: "/customized",
      number: "04",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500/20">
      {/* Global Grid Background - Same as Prebuilt */}
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

      {/* Content */}
      <div className="relative z-10">
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

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-lg">
                <Sparkles className="w-4 h-4 text-orange-500" />
                SEO, Digital Presence, Web Development & UX/UI
              </span>
            </div>

            {/* Floating Feature Icons */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
              {/* Left Icon - Code/Development */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
                </div>
              </div>

              {/* Center Icon - Startup/Growth - Larger */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Zap className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500" />
                </div>
              </div>

              {/* Right Icon - Globe/Web */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Main Headline - Large & Bold */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              <span className="block text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Let&apos;s Build Something
              </span>
              <span className="block text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="relative inline-block">
                  <span className="relative z-10">Extraordinary</span>
                  <span className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10 rounded" />
                </span>{' '}
                together
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
              We help brands grow online with SEO, stronger digital presence, modern web development,
              and easy-to-use UX/UI experiences—all in the same trusted StitchByte workflow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <a
                href="#apps"
                className="group px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center gap-3"
              >
                Let&apos;s Explore
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all shadow-lg flex items-center gap-3"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <a href="#apps" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-xs mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Service Offerings Marquee Section */}
        <section className="py-8 overflow-hidden bg-gradient-to-b from-transparent to-slate-50/50">
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
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  Our Tailored Products
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
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
            </div>            {/* Bento App Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tailoredProducts.map((card, index) => {
                const layoutIndex = index % 4;

                if (layoutIndex === 0) {
                  // Wide Card (Strategic Marketing)
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between md:col-span-2 min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      {/* Header Area */}
                      <div className="flex justify-between items-start mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100/50 text-[10px] font-semibold tracking-wider uppercase rounded-full">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          {card.subtitle}
                        </span>
                        <span className="text-sm font-mono text-slate-350 font-semibold">{card.number}</span>
                      </div>
                      {/* Title and Description */}
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-auto">
                        <div className="max-w-md">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">{card.title}</h3>
                          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{card.description}</p>
                          </div>
                        </div>
                        {/* Sound/Megaphone Illustration */}
                        <div className="hidden sm:flex w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0 items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-500 relative">
                          <Megaphone className="w-10 h-10 text-slate-400/80" />
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-slate-300 rounded-full animate-ping" />
                        </div>
                      </div>
                    </Link>
                  );
                } else if (layoutIndex === 1) {
                  // Narrow Card (Advanced SEO)
                  const IconComponent = card.icon || BarChart3;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      {/* Header Area */}
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-sm font-mono text-slate-355 font-semibold">{card.number}</span>
                        <div className="w-9 h-9 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      {/* Title and Description */}
                      <div className="mt-auto">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">{card.title}</h3>
                        <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{card.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                } else if (layoutIndex === 2) {
                  // Narrow Card (UI/UX Craft)
                  const IconComponent = card.icon || Layers;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      {/* Header Area */}
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-sm font-mono text-slate-355 font-semibold">{card.number}</span>
                        <div className="w-9 h-9 rounded-xl border border-violet-100 bg-violet-50/50 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      {/* Title and Description */}
                      <div className="mt-auto">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">{card.title}</h3>
                        <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{card.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  // Wide Card (Modern Web Infrastructure)
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between md:col-span-2 min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      {/* Header Area */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2">
                          <span className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] font-mono text-slate-500 font-semibold">&lt;/&gt;</span>
                          <span className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                          </span>
                        </div>
                        <span className="text-sm font-mono text-slate-350 font-semibold">{card.number}</span>
                      </div>
                      {/* Title and Description */}
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-auto">
                        <div className="max-w-md">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">{card.title}</h3>
                          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{card.description}</p>
                          </div>
                        </div>
                        {/* Code/Terminal Illustration */}
                        <div className="hidden sm:block w-40 h-28 bg-slate-900 rounded-xl p-3.5 shadow-inner relative overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <div className="flex gap-1.5 mb-2.5">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          </div>
                          <span className="font-mono text-[11px] text-emerald-400">&gt; _</span>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </section>
        {/* Why StitchByte Section */}
        <section id="features" className="relative py-24 overflow-hidden bg-white">
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
            <div className="text-center mb-20 flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Why StitchByte?
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                We don&apos;t just build websites; we build growth engines that operate on autopilot.
              </p>
            </div>

            {/* Three Column Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Speed of Thought</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Our workflow is optimized for rapid deployment without ever sacrificing quality or design integrity.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                  <BrainCog className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Strategic Depth</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Every pixel and line of code is measured against your primary business goals and KPIs.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Trusted Partner</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Over 1.3k+ clients rely on our ecosystem for their daily digital operations and growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The StitchByte Execution Model Section */}
        <section id="how-we-work" className="relative py-24 overflow-hidden bg-white">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column - Title & Image Mockup */}
              <div className="lg:col-span-5 flex flex-col">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.15]">
                  The StitchByte <br /> Execution Model
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mb-12 max-w-md leading-relaxed">
                  A transparent, four-stage process refined over hundreds of successful deployments.
                </p>
                
                {/* Custom Browser Mockup wrapping Team Illustration */}
                <div className="bg-[#1c1c1f] rounded-[2.5rem] p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Browser Top Bar */}
                  <div className="flex items-center justify-between bg-[#18181b] border-b border-slate-800/80 px-4 py-3 rounded-t-xl mb-4">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#ef4444] rounded-full" />
                      <span className="w-2.5 h-2.5 bg-[#eab308] rounded-full" />
                      <span className="w-2.5 h-2.5 bg-[#22c55e] rounded-full" />
                    </div>
                    <div className="flex-1 max-w-[240px] mx-auto bg-[#27272a]/60 text-[#a1a1aa] text-[10px] font-mono py-1 px-3 rounded-md text-center border border-slate-800/50 truncate">
                      stitchbyte.com/about-us
                    </div>
                    <div className="w-12" /> {/* Spacer to balance dots */}
                  </div>
                  
                  {/* Viewport Content */}
                  <div className="relative bg-[#FAF6F0] rounded-b-xl overflow-hidden aspect-[4/3] flex items-center justify-center border-t border-slate-800/20">
                    <Image
                      src="/team-illustration-gray.png"
                      alt="StitchByte Team"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Steps */}
              <div className="lg:col-span-7 flex flex-col justify-center h-full">
                {[
                  {
                    number: "01",
                    title: "Discovery & Audit",
                    description: "We dive deep into your brand's existing ecosystem to identify bottlenecks and growth opportunities."
                  },
                  {
                    number: "02",
                    title: "Architecture & Design",
                    description: "Low-fidelity wireframes evolve into pixel-perfect prototypes that prioritize user flow and brand identity."
                  },
                  {
                    number: "03",
                    title: "Technical Development",
                    description: "Clean code meets high-performance hosting. We build scalable engines optimized for lightning speed."
                  },
                  {
                    number: "04",
                    title: "Launch & Scale",
                    description: "Post-launch monitoring and iterative marketing campaigns to ensure your new product reaches its full potential."
                  }
                ].map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex items-start gap-6 py-8 border-slate-100 ${index === 0 ? 'border-t border-b' : 'border-b'}`}
                  >
                    <div className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center font-mono text-sm text-slate-500 flex-shrink-0 shadow-sm">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Reels Showcase */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-100/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FAF6F0] border border-[#eee0cb] text-[#b37a3c] text-xs font-semibold rounded-full mb-3 shadow-xs">
                <Instagram className="w-3.5 h-3.5" />
                Featured Reel
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                Behind the Scenes at StitchByte
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Watch our latest spotlight video.
              </p>
            </div>
          </div>

          {/* Mobile: Horizontal Carousel */}
          <div className="sm:hidden">
            <div
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {activeVideos.map((videoUrl) => (
                <div key={videoUrl} className="snap-center flex-shrink-0" style={{ width: "75vw", maxWidth: "320px" }}>
                  <SpotlightVideoCard videoUrl={videoUrl} />
                </div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            {activeVideos.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {activeVideos.map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-gray-300" />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden sm:flex w-full items-center justify-center">
            <div className={`grid gap-8 w-full justify-center items-center ${
              activeVideos.length === 1 
                ? "grid-cols-1 max-w-[320px]" 
                : activeVideos.length === 2 
                  ? "grid-cols-2 max-w-[640px]" 
                  : activeVideos.length === 3 
                    ? "grid-cols-2 lg:grid-cols-3 max-w-[960px]" 
                    : "grid-cols-2 lg:grid-cols-4 max-w-6xl"
            }`}>
              {activeVideos.map((videoUrl) => (
                <SpotlightVideoCard key={videoUrl} videoUrl={videoUrl} />
              ))}
            </div>
          </div>
        </section>

        {/* Client Reviews */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
                Client Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                What Clients Shared
              </h2>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:border-gray-900 transition-all self-start"
            >
              View All Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {displayReviewCards.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                {displayReviewCards.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentReviewIndex((current) =>
                        current === 0 ? displayReviewCards.length - 1 : current - 1,
                      )
                    }
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center flex-shrink-0"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="flex-1 overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${(currentReviewIndex * 100) / visibleReviewCount}%)` }}
                  >
                    {reviewTrackCards.map((review, index) => (
                      <div key={`${review.name}-${index}`} className="px-2" style={{ minWidth: `${100 / visibleReviewCount}%` }}>
                        <div className="bg-white border border-gray-200 rounded-3xl px-7 py-6 hover:shadow-md transition-all">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-5 h-5 ${starIndex < review.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-3 mt-6 text-gray-700">
                        <div className="w-7 h-7 rounded-full border border-gray-400/60 flex items-center justify-center overflow-hidden text-gray-500">
                          {review.avatarUrl ? (
                            <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </div>
                        <p className="text-lg sm:text-xl font-semibold tracking-tight lowercase">{review.name}</p>
                      </div>

                      <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl text-gray-900 line-clamp-1" style={{ fontFamily: "Georgia, serif" }}>
                        {review.reviewTitle || "Great experience"}
                      </h3>

                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">{review.reviewText}</p>

                          {(review.serviceType || review.projectMonth || review.projectYear || review.projectSize) && (
                            <p className="mt-4 text-xs text-gray-500">
                              Project Context: {[review.serviceType, [review.projectMonth, review.projectYear].filter(Boolean).join(" "), review.projectSize]
                                .filter(Boolean)
                                .join(" • ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {displayReviewCards.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentReviewIndex((current) => (current + 1) % displayReviewCards.length)
                    }
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center flex-shrink-0"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {displayReviewCards.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="flex items-center gap-2">
                    {displayReviewCards.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => setCurrentReviewIndex(dotIndex)}
                        className={`h-2.5 rounded-full transition-all ${
                          dotIndex === currentReviewIndex ? "w-6 bg-gray-900" : "w-2.5 bg-gray-300"
                        }`}
                        aria-label={`Go to review ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No reviews added yet. Add text review cards from Admin Panel → Homepage Reviews.</p>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-24 bg-white">
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
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
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
