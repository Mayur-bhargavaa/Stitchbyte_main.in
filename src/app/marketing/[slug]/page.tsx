"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MarketingCaseStudy {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  category: "performance" | "seo";
  summary: string;
  highlights: string[];
  goal: string;
  approach: string;
  result: string;
  outcomeMetrics: string[];
  companySize?: string;
  businessModel?: string;
  targetAudience?: string;
  problem?: string;
  objectives?: string[];
  solutionDetails?: string;
  challenges?: string;
  implementationProcess?: string;
  resultsMetrics?: string[];
  visualProof?: string[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialDesignation?: string;
  businessImpact?: string;
}

export default function MarketingCaseStudyDetailPage() {
  const { slug } = useParams();
  const [study, setStudy] = useState<MarketingCaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudy = async () => {
      if (!slug || typeof slug !== "string") return;
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/marketing-case-studies/${slug}`);
        const data = await response.json();
        if (response.ok && data.success && data.study) {
          setStudy(data.study);
        } else {
          setError(data.error || "Case study not found.");
        }
      } catch {
        setError("Failed to load case study.");
      } finally {
        setLoading(false);
      }
    };
    loadStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-mono text-xs tracking-wider uppercase">Loading case study...</span>
        </div>
      </div>
    );
  }

  if (error || !study) {
    notFound();
  }

  const allMetrics = [
    ...(study.resultsMetrics || []),
    ...(study.outcomeMetrics || []),
  ];
  const hasVisualProof = study.visualProof && study.visualProof.length > 0;
  const hasHighlights = study.highlights && study.highlights.length > 0;
  const hasObjectives = study.objectives && study.objectives.length > 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500/20">
      {/* Global Grid Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "240px 240px",
        }}
      />

      {/* Decorative Corner Elements */}
      <div className="fixed top-20 left-10 w-40 h-40 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
      </div>
      <div className="fixed bottom-32 right-10 w-32 h-32 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">

          {/* ─── Back Link ─── */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-gray-400 text-sm mb-12 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>

          {/* ─── Hero ─── */}
          <div className="mb-16">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium tracking-wider uppercase text-gray-500">
                {study.industry} Case Study
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 max-w-3xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {study.brand}
            </h1>

            {/* Summary */}
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl">
              {study.summary}
            </p>
          </div>

          {/* ─── Hero Visual ─── */}
          {hasVisualProof && (
            <div className="mb-16">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50">
                <img
                  src={study.visualProof![0]}
                  alt={`${study.brand} — Primary Visual`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* ─── Key Metrics Row ─── */}
          {allMetrics.length > 0 && (
            <div className="mb-20">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-8 border-t border-b border-gray-200 py-8">
                {allMetrics.slice(0, 4).map((metric, index) => {
                  const match = metric.match(/^([\d\+\-\%\,\.\sx]+[a-zA-Z]*)\s+(.*)$/);
                  const isSplit = match && match[1];
                  const numPart = isSplit ? match[1].trim() : "";
                  const textPart = isSplit ? match[2].trim() : metric;

                  return (
                    <div key={index}>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                        {textPart || `Metric ${index + 1}`}
                      </span>
                      {isSplit ? (
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                          {numPart}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">{textPart}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── The Challenge ─── */}
          {(study.problem || study.goal) && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    The Challenge
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line">
                    {study.problem || study.goal}
                  </p>

                  {/* Objectives inline */}
                  {hasObjectives && (
                    <div className="mt-8 space-y-3">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-3">Core Objectives</span>
                      {study.objectives!.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 mb-20" />

          {/* ─── The Strategy / Solution ─── */}
          {(study.solutionDetails || study.approach) && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    The Strategy
                  </h2>
                </div>
                <div className="md:col-span-8">
                  {study.solutionDetails && (
                    <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line mb-8">
                      {study.solutionDetails}
                    </p>
                  )}
                  {study.approach && (
                    <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line">
                      {study.approach}
                    </p>
                  )}

                  {/* Highlights as callout cards */}
                  {hasHighlights && (
                    <div className="mt-10 space-y-4">
                      {study.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                          <span className="text-gray-700 text-sm leading-relaxed font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          {(study.challenges || study.implementationProcess) && <div className="border-t border-gray-100 mb-20" />}

          {/* ─── Challenges & Implementation ─── */}
          {study.challenges && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Challenges
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line">
                    {study.challenges}
                  </p>
                </div>
              </div>
            </div>
          )}

          {study.implementationProcess && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Implementation
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line">
                    {study.implementationProcess}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 mb-20" />

          {/* ─── The Result ─── */}
          {study.result && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    The Result
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-700 text-sm sm:text-base leading-[1.8] whitespace-pre-line font-medium">
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── All Metrics (remaining beyond the top 4) ─── */}
          {allMetrics.length > 4 && (
            <div className="mb-20">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 border-t border-b border-gray-200 py-8">
                {allMetrics.slice(4).map((metric, index) => {
                  const match = metric.match(/^([\d\+\-\%\,\.\sx]+[a-zA-Z]*)\s+(.*)$/);
                  const isSplit = match && match[1];
                  const numPart = isSplit ? match[1].trim() : "";
                  const textPart = isSplit ? match[2].trim() : metric;

                  return (
                    <div key={index}>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                        {isSplit ? textPart : `Metric`}
                      </span>
                      {isSplit ? (
                        <span className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                          {numPart}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">{textPart}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── Visual Proof Gallery ─── */}
          {hasVisualProof && study.visualProof!.length > 1 && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-8">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Visual Proof
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-500 text-sm leading-relaxed">Screenshots and dashboards from the project.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {study.visualProof!.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                    <img
                      src={imgUrl}
                      alt={`${study.brand} Screenshot ${idx + 2}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {study.businessImpact && <div className="border-t border-gray-100 mb-20" />}

          {/* ─── Business Impact ─── */}
          {study.businessImpact && (
            <div className="mb-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Business Impact
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-gray-500 text-sm sm:text-base leading-[1.8] whitespace-pre-line">
                    {study.businessImpact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Client Background Info Row ─── */}
          {(study.companySize || study.businessModel || study.targetAudience) && (
            <div className="mb-20">
              <h2
                className="text-xl font-bold text-gray-900 text-center mb-10"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Client Profile
              </h2>
              <div className="border-t border-gray-200" />
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {study.companySize && (
                  <div className="py-6 sm:px-8 text-center">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Company Size</span>
                    <span className="text-base font-semibold text-gray-900">{study.companySize}</span>
                  </div>
                )}
                {study.businessModel && (
                  <div className="py-6 sm:px-8 text-center">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Business Model</span>
                    <span className="text-base font-semibold text-gray-900">{study.businessModel}</span>
                  </div>
                )}
                {study.targetAudience && (
                  <div className="py-6 sm:px-8 text-center">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Target Audience</span>
                    <span className="text-base font-semibold text-gray-900">{study.targetAudience}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200" />
            </div>
          )}

          {/* ─── Testimonial ─── */}
          {study.testimonialQuote && (
            <div className="mb-20">
              <div className="border-t border-gray-200 pt-16 pb-8">
                <blockquote className="max-w-3xl mx-auto text-center">
                  <p
                    className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 leading-snug italic mb-8"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    &ldquo;{study.testimonialQuote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                      {(study.testimonialAuthor || "C")[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm">
                        {study.testimonialAuthor || "Client Spokesperson"}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {study.testimonialDesignation || `Partner, ${study.brand}`}
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          )}

          {/* ─── CTA ─── */}
          <div className="border-t border-gray-200 pt-16 text-center">
            <h3
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ready for similar results?
            </h3>
            <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
              Let&apos;s discuss how our proven strategies can help your business achieve similar growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
              >
                View More Case Studies
              </Link>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}
