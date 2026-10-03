"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Play,
  ExternalLink,
  Heart,
  Share2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Loader2,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressiveImageModalViewer from "@/components/ProgressiveImageModalViewer";

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  ratioClass: string;
  aspectRatio: string;
}

const PAGE_SIZE = 24;

// Cloudinary URL optimizer — serves WebP/AVIF, right-sized thumbnails
function getThumbUrl(src: string, width = 600): string {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_scale/`);
  }
  return src;
}

// Tiny blur placeholder (20px wide, heavy blur)
function getBlurDataUrl(src: string): string {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", "/upload/w_20,q_10,e_blur:800,f_jpg/");
  }
  return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=";
}

// Skeleton card for loading state
function SkeletonCard({ tall }: { tall?: boolean }) {
  return (
    <div className={`break-inside-avoid mb-4 sm:mb-6 rounded-3xl overflow-hidden bg-slate-100 animate-pulse ${tall ? "aspect-[3/4]" : "aspect-square"}`} />
  );
}

// Lazy video card — only loads video src when visible in viewport
function VideoCard({ item, onSelect }: { item: MediaItem; onSelect: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Observe when card enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="break-inside-avoid mb-4 sm:mb-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
    >
      <div className={`relative w-full ${item.ratioClass} bg-slate-900`}>
        {/* Only set src when visible */}
        {isVisible ? (
          <video
            ref={videoRef}
            src={item.src}
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 animate-pulse" />
        )}

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-800">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
            {item.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
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

// Lazy image card — observes viewport before loading image
function ImageCard({ item, onSelect, priority }: { item: MediaItem; onSelect: () => void; priority: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority); // priority items show immediately

  useEffect(() => {
    if (priority) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: "300px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={containerRef}
      onClick={onSelect}
      className="break-inside-avoid mb-4 sm:mb-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
    >
      <div className={`relative w-full ${item.ratioClass} bg-slate-50`}>
        {isVisible ? (
          <Image
            src={getThumbUrl(item.src, 600)}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(item.src)}
            priority={priority}
          />
        ) : (
          // Placeholder before image loads into view
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        )}

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
            {item.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
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

const getDetailedDescription = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("reel")) return "High-converting video reel engineered for the social media segment. Designed to maximize visual brand authority, drive high-retention user engagement, and optimize click-through conversion across modern platforms.";
  if (cat.includes("beauty")) return "Premium packaging and visual branding design tailored for the cosmetics segment. Crafted to project a clean, high-end organic aesthetic and elevate product appeal on retail shelves.";
  if (cat.includes("clothing") || cat.includes("apparel")) return "Modern apparel display concept and minimalist showcase designed for the fashion retail segment. Engineered to maximize layout elegance and drive customer conversion.";
  if (cat.includes("event")) return "Sophisticated banquet layout and wedding setup design optimized for the event management segment. Crafted to emphasize layout flow and brand prestige for luxury hospitality.";
  if (cat.includes("food") || cat.includes("restro") || cat.includes("restaurant")) return "High-fidelity gourmet showcase for the restaurant segment. Focused on mouth-watering visual presentation and digital menu conversions.";
  if (cat.includes("gym") || cat.includes("fitness")) return "High-impact boutique fitness space and equipment layout design. Engineered to inspire active lifestyle energy and optimize membership sales.";
  if (cat.includes("interior") || cat.includes("architect")) return "Premium architectural portfolio mockup and stationery design layout. Crafted to showcase structural precision and professional brand trust.";
  if (cat.includes("jwellery") || cat.includes("jewelry") || cat.includes("watch")) return "Elite chronometer and luxury jewellery advertising layout. Engineered to highlight premium materials and high-value conversion rates.";
  if (cat.includes("perfume")) return "Premium cosmetic bottle showcase designed for fragrance brands. Engineered to project refreshing, high-end elegance and drive customer desirability.";
  if (cat.includes("estate")) return "Designed as a premium branding asset for the real estate segment. Engineered to maximize visual brand authority and optimize customer lead generation.";
  return `Designed as a premium branding asset for the ${category} segment. Engineered to maximize visual brand authority and customer conversion.`;
};

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.scrollTop = 0;
    if (activeMedia) setImageLoading(true);
  }, [activeMedia]);

  // Fetch all items once
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
      } catch {
        setError("Failed to fetch gallery items.");
      } finally {
        setLoading(false);
      }
    };
    fetchSamples();
  }, []);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory]);

  const activeCategories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [items]);

  // URL query param category sync
  useEffect(() => {
    if (typeof window !== "undefined" && activeCategories.length > 0) {
      const cat = new URLSearchParams(window.location.search).get("category");
      if (cat) {
        const matched = activeCategories.find(c => c.toLowerCase() === cat.toLowerCase());
        setSelectedCategory(matched || (cat.toLowerCase() === "all" ? "All" : "All"));
      }
    }
  }, [activeCategories]);

  const filteredItems = useMemo(() =>
    selectedCategory === "All"
      ? items
      : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase()),
    [items, selectedCategory]
  );

  // Items currently visible (paginated)
  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);
  const hasMore = visibleCount < filteredItems.length;

  // Auto-load more when load-more sentinel enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + PAGE_SIZE);
            setLoadingMore(false);
          }, 300);
        }
      },
      { rootMargin: "400px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  // Escape key closes lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveMedia(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-red-500/20 relative">
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors font-medium">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 leading-[1.1] mb-4">
              Graphics & Media Showcase
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-normal leading-relaxed">
              Browse our creative portfolios and marketing graphics across various industries.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
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

        {/* Gallery count */}
        {!loading && !error && filteredItems.length > 0 && (
          <p className="text-center text-xs text-slate-400 font-mono mb-6">
            Showing {Math.min(visibleCount, filteredItems.length)} of {filteredItems.length} assets
          </p>
        )}

        {loading ? (
          // Skeleton grid
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} tall={i % 3 === 0} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-red-50/30 rounded-3xl border border-dashed border-red-200 w-full max-w-xl mx-auto">
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          </div>
        ) : (
          <>
            {/* Pinterest Masonry Grid — only visibleItems rendered */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 [column-fill:_balance] w-full">
              {visibleItems.map((item, index) =>
                item.type === "video" ? (
                  <VideoCard key={item.id} item={item} onSelect={() => setActiveMedia(item)} />
                ) : (
                  <ImageCard
                    key={item.id}
                    item={item}
                    onSelect={() => setActiveMedia(item)}
                    priority={index < 8} // Only first 8 images load eagerly
                  />
                )
              )}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-semibold">No assets found in this category yet.</p>
              </div>
            )}

            {/* Infinite scroll sentinel */}
            <div ref={loadMoreRef} className="mt-10 flex justify-center">
              {loadingMore && (
                <div className="flex items-center gap-3 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-xs font-mono tracking-wider">LOADING MORE...</span>
                </div>
              )}
              {!hasMore && filteredItems.length > PAGE_SIZE && (
                <p className="text-xs text-slate-300 font-mono tracking-wider">ALL {filteredItems.length} ASSETS LOADED</p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-fade-in">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-50 shadow-md"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-5xl w-full h-[85vh] flex flex-col md:flex-row bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-scale-up">
            {/* Left: Media viewer */}
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
                <ProgressiveImageModalViewer
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  thumbnailSrc={getThumbUrl(activeMedia.src, 600)}
                />
              )}
            </div>

            {/* Right: Details */}
            <div ref={detailsRef} className="w-full md:w-[380px] bg-white p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-150 text-[10px] font-bold tracking-wider uppercase rounded-full text-slate-800">
                    {activeMedia.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert("Liked!")}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert("Link copied to clipboard!")}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">{activeMedia.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{getDetailedDescription(activeMedia.category)}</p>
                </div>

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
