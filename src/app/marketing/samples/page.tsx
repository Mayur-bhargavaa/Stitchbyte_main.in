"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Play,
  Pause,
  ExternalLink,
  Bookmark,
  Heart,
  Share2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  ratioClass: string; // Tailored aspect-ratio classes for masonry diversity
  aspectRatio: string;
}



// Video player card that handles autoplay on hover
function VideoCard({ item, onSelect }: { item: MediaItem; onSelect: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked or interrupted", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="break-inside-avoid mb-4 sm:mb-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
    >
      <div className={`relative w-full ${item.ratioClass} bg-slate-900`}>
        <video
          ref={videoRef}
          src={item.src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Play indicator icon in the center */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-800">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
            {item.category}
          </span>
        </div>

        {/* Pinterest Dark Hover Overlay */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
          {/* Bottom Row: Text Info & Action Icon */}
          <div className="flex items-end justify-between gap-4 w-full mt-auto">
            <div className="text-white">
              <h4 className="font-bold text-sm sm:text-base leading-tight line-clamp-2">{item.title}</h4>
              <p className="text-slate-200 text-xs mt-1.5 font-medium">{item.category}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md flex-shrink-0 hover:scale-110 transition-transform">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Image Card Component
function ImageCard({ item, onSelect }: { item: MediaItem; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="break-inside-avoid mb-4 sm:mb-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
    >
      <div className={`relative w-full ${item.ratioClass} bg-slate-50`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          priority
        />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
            {item.category}
          </span>
        </div>

        {/* Pinterest Dark Hover Overlay */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
          {/* Bottom Row: Text Info & Action Icon */}
          <div className="flex items-end justify-between gap-4 w-full mt-auto">
            <div className="text-white">
              <h4 className="font-bold text-sm sm:text-base leading-tight line-clamp-2">{item.title}</h4>
              <p className="text-slate-200 text-xs mt-1.5 font-medium">{item.category}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md flex-shrink-0 hover:scale-110 transition-transform">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getDetailedDescription = (category: string, title: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("reel")) {
    return "High-converting video reel engineered for the social media segment. Designed to maximize visual brand authority, drive high-retention user engagement, and optimize click-through conversion across modern platforms.";
  }
  if (cat.includes("beauty")) {
    return "Premium packaging and visual branding design tailored for the cosmetics segment. Crafted to project a clean, high-end organic aesthetic, build visual brand authority, and elevate product appeal on retail shelves.";
  }
  if (cat.includes("clothing") || cat.includes("apparel")) {
    return "Modern apparel display concept and minimalist showcase designed for the fashion retail segment. Engineered to maximize layout elegance, draw attention to premium product details, and drive customer conversion.";
  }
  if (cat.includes("event")) {
    return "Sophisticated banquet layout and wedding setup design optimized for the event management segment. Crafted to emphasize layout flow, elegant table styling, and brand prestige for luxury hospitality.";
  }
  if (cat.includes("food") || cat.includes("restro") || cat.includes("restaurant")) {
    return "High-fidelity gourmet showcase and pizza display design for the restaurant segment. Focused on mouth-watering visual presentation, food brand authority, and digital menu conversions.";
  }
  if (cat.includes("gym") || cat.includes("fitness")) {
    return "High-impact boutique fitness space and equipment layout design. Engineered to inspire active lifestyle energy, project premium facility quality, and optimize membership sales.";
  }
  if (cat.includes("interior") || cat.includes("architect")) {
    return "Premium architectural portfolio mockup and stationery design layout. Crafted to showcase structural precision, minimal layout aesthetics, and professional brand trust.";
  }
  if (cat.includes("jwellery") || cat.includes("jewelry") || cat.includes("watch")) {
    return "Elite chronometer and luxury jewellery advertising layout. Engineered to highlight premium materials, micro-details, status symbol aesthetics, and high-value conversion rates.";
  }
  if (cat.includes("perfume")) {
    return "Premium cosmetic bottle showcase and splash mockup designed for fragrance brands. Engineered to project refreshing, high-end elegance and drive customer desirability.";
  }
  if (cat.includes("estate")) {
    return "Designed as a premium branding asset for the real estate segment. Engineered to maximize visual brand authority, showcase architectural scale, and optimize customer lead generation.";
  }
  return `Designed as a premium branding asset for the ${category} segment. Engineered to maximize visual brand authority and customer conversion.`;
};

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
  }, [activeMedia]);

  useEffect(() => {
    const fetchSamples = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/marketing-samples");
        const data = await res.json();
        if (res.ok && data.success) {
          setItems(data.samples || []);
        } else {
          setError(data.error || "Failed to load gallery items.");
        }
      } catch (err) {
        setError("Failed to fetch gallery items.");
      } finally {
        setLoading(false);
      }
    };
    fetchSamples();
  }, []);

  const activeCategories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  // Close Lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMedia(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-red-500/20 relative">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fade-in">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Creative Asset Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Graphics & Media <span className="text-slate-400 font-light italic">Showcase</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Browse our creative portfolios and marketing graphics across various industries. Click a category pill to filter the showcase below.
            </p>
          </div>
        </div>

        {/* Premium Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-5xl mx-auto animate-fade-in">
          {["All", ...activeCategories].map((category) => {
            const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-xs font-mono font-medium rounded-full border transition-all duration-300 select-none ${
                  isSelected
                    ? "bg-black border-black text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:text-black hover:border-slate-400"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>



        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-12 h-12 text-slate-200 animate-spin" />
            <p className="text-slate-400 font-mono text-xs tracking-wider">LOADING SHOWCASE...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-red-50/30 rounded-3xl border border-dashed border-red-200 w-full col-span-full max-w-xl mx-auto">
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          </div>
        ) : (
          <>
            {/* Pinterest Masonry Grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 [column-fill:_balance] w-full">
              {filteredItems.map((item) => (
                item.type === "video" ? (
                  <VideoCard
                    key={item.id}
                    item={item}
                    onSelect={() => setActiveMedia(item)}
                  />
                ) : (
                  <ImageCard
                    key={item.id}
                    item={item}
                    onSelect={() => setActiveMedia(item)}
                  />
                )
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 w-full col-span-full">
                <p className="text-slate-400 text-sm font-semibold">No assets found in this category yet.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Lightbox Overlay Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-fade-in">
          {/* Close button top-right */}
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-50 shadow-md"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <div className="max-w-5xl w-full h-[85vh] flex flex-col md:flex-row bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-scale-up">
            {/* Left side: Media Viewer */}
            <div className="w-full h-[45vh] md:h-auto bg-black flex items-center justify-center p-2 md:flex-1 relative">
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    fill
                    className="object-contain p-4 rounded-3xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>

            {/* Right side: Media Details */}
            <div 
              ref={detailsRef}
              className="w-full md:w-[380px] bg-white p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Header Meta Actions */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-150 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
                    {activeMedia.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert("Liked!")}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                      title="Like Graphic"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert("Link copied to clipboard!")}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                      title="Share Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title and Descriptions */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                    {activeMedia.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {getDetailedDescription(activeMedia.category, activeMedia.title)}
                  </p>
                </div>

                {/* Specifications List */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Format</span>
                    <span className="text-slate-800 font-semibold">{activeMedia.type === "video" ? "Video (MP4)" : "Image (PNG)"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Dimensions</span>
                    <span className="text-slate-800 font-semibold">{activeMedia.aspectRatio} Aspect Ratio</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Delivery</span>
                    <span className="text-slate-800 font-semibold">Bespoke Production</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Turnaround</span>
                    <span className="text-slate-800 font-semibold">24 - 48 Hours</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-8 border-t border-slate-100 flex gap-3 mt-12 md:mt-0">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-4 px-6 rounded-full transition-colors shadow-md shadow-slate-900/10"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
