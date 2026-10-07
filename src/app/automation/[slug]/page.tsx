"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageCircle,
  Play,
  Pause,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AUTOMATION_ITEMS } from "@/data/automation-items";

export default function AutomationDetailPage() {
  const { slug } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const item = AUTOMATION_ITEMS.find((a) => a.slug === slug);

  if (!item) {
    notFound();
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const otherAutomations = AUTOMATION_ITEMS.filter((a) => a.slug !== item.slug);

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/automation"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Automations</span>
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{item.tagline}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
            {item.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {item.shortDescription}
          </p>
        </div>

        {/* Featured Video Player Card */}
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
            {/* Top Bar inside video player */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white text-xs font-semibold tracking-wide">
                  Live System Walkthrough
                </span>
              </div>
              <div className="flex items-center gap-3 pointer-events-auto">
                {item.videoDuration && (
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                    {item.videoDuration}
                  </span>
                )}
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors"
                  aria-label="Toggle mute"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Video element */}
            <div
              className="relative aspect-video w-full cursor-pointer group flex items-center justify-center"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={item.videoUrl}
                poster={item.videoPoster}
                className="w-full h-full object-cover"
                loop
                playsInline
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play Overlay if paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-2xl group-hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-6 py-4 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
              <span>
                Demonstrating production workflow for <strong className="text-white">{item.title}</strong>
              </span>
              <span className="text-emerald-400 font-semibold">{item.metric}</span>
            </div>
          </div>
        </section>

        {/* Content Details: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left / Main Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* System Overview */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-4 flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-neutral-700" />
                <span>System Overview & Business Impact</span>
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-600 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{item.fullDescription}</p>
              </div>
            </div>

            {/* Key Capabilities / Features */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-5 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Engineered Capabilities</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {item.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-800 font-medium leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Architecture Flow */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-neutral-700" />
                <span>How the Pipeline Executes</span>
              </h2>
              <div className="space-y-4">
                {item.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Use Cases */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-5 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Common Industry Use Cases</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {item.useCases.map((uc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs sm:text-sm text-neutral-700 font-medium flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-neutral-600" />
                <span>Core Frameworks & Tools</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 text-xs font-medium shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column / Sticky Deployment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Primary Action Card */}
              <div className="rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Ready to Deploy
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">
                  Deploy {item.title}
                </h3>
                <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                  We configure, test, and hand over the complete pipeline within your cloud accounts with zero vendor lock-in.
                </p>

                {/* Primary CTA button */}
                <Link
                  href={`/contact?service=${encodeURIComponent(item.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] mb-3"
                >
                  <span>Request Custom Deployment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* WhatsApp Chat button */}
                <a
                  href={`https://wa.me/919461330819?text=${encodeURIComponent(
                    `Hi StitchByte! I watched the video for ${item.title} and want to deploy this for my business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium text-xs hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                </a>

                {/* What's included checklist */}
                <div className="mt-6 pt-6 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Full Source Code Ownership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Rapid Deployment (3 to 7 Days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>30 Days Free Post-Launch Engineering</span>
                  </div>
                </div>
              </div>

              {/* Business Outcomes Stats */}
              <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-7 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Expected ROI
                </span>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {item.businessBenefits.map((ben, idx) => (
                    <div key={idx} className="border-t border-neutral-800 pt-3">
                      <div className="text-2xl font-bold tracking-tight text-white">
                        {ben.stat}
                      </div>
                      <div className="text-xs font-medium text-neutral-300 mt-0.5">
                        {ben.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Other Automations Section */}
        <section className="mt-24 pt-16 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                More Video Walkthroughs
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Explore Other Automation Systems
              </h2>
            </div>
            <Link
              href="/automation"
              className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 inline-flex items-center gap-1.5"
            >
              <span>View All Systems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherAutomations.slice(0, 3).map((other) => (
              <Link
                key={other.slug}
                href={`/automation/${other.slug}`}
                className="group rounded-2xl bg-white border border-neutral-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      {other.tagline}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                    {other.shortDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 mt-5 space-y-2.5">
                  <div className="flex items-center">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                      ⚡ {other.metric}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-neutral-700 pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Walkthrough</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
