"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  BarChart3,
  Globe,
  TrendingUp,
  CheckCircle2,
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
}

type FilterCategory = "all" | "performance" | "seo";

const filterOptions: Array<{ value: FilterCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "performance", label: "Performance Marketing" },
  { value: "seo", label: "SEO" },
];

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<MarketingCaseStudy[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/marketing-case-studies");
        const data = await res.json();
        if (res.ok && data.success) {
          setStudies(data.studies || []);
        } else {
          setError(data.error || "Failed to load case studies.");
        }
      } catch {
        setError("Failed to fetch case studies.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudies();
  }, []);

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") return studies;
    return studies.filter((s) => s.category === activeFilter);
  }, [studies, activeFilter]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500/20">
      {/* Background Grid Pattern */}
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

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-40 h-40 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
      </div>
      <div className="fixed bottom-32 right-10 w-32 h-32 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[55vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-teal-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-blue-300/20 rounded-full blur-3xl" />

          <div className="relative max-w-4xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-lg mb-8">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Client Success Stories
            </span>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Case Studies</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10 rounded" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Real results from real businesses. See how we help brands grow
              through performance marketing, SEO, and strategic digital
              execution.
            </p>
          </div>
        </section>

        {/* Filter Pills + Content */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {filterOptions.map((option) => {
              const isSelected = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 select-none ${
                    isSelected
                      ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 text-gray-200 animate-spin" />
              <p className="text-gray-400 font-mono text-xs tracking-wider uppercase">
                Loading case studies...
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center py-24 bg-red-50/30 rounded-3xl border border-dashed border-red-200 max-w-xl mx-auto">
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            </div>
          ) : filteredStudies.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto">
              <p className="text-gray-400 text-sm font-semibold">
                No case studies found in this category yet.
              </p>
            </div>
          ) : (
            /* Case Study Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredStudies.map((study) => {
                const isPerformance = study.category === "performance";
                const CategoryIcon = isPerformance ? BarChart3 : Globe;
                const categoryLabel = isPerformance
                  ? "Performance Marketing"
                  : "SEO";
                const categoryDotColor = isPerformance
                  ? "bg-emerald-500"
                  : "bg-violet-500";
                const categoryBgColor = isPerformance
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-violet-50 text-violet-700 border-violet-100";
                const iconBg = isPerformance
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-violet-100 text-violet-600";

                return (
                  <Link
                    key={study.id || study.slug}
                    href={`/marketing/${study.slug}`}
                    className="group bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1.5"
                  >
                    {/* Card Header */}
                    <div className="p-8 pb-0">
                      <div className="flex items-start justify-between mb-6">
                        {/* Industry Badge */}
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-wider uppercase rounded-full border border-gray-200">
                          {study.industry}
                        </span>
                        {/* Category Badge */}
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${categoryBgColor}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${categoryDotColor} animate-pulse`}
                          />
                          {categoryLabel}
                        </span>
                      </div>

                      {/* Title & Icon Row */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                          {study.brand}
                        </h3>
                        <div
                          className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <CategoryIcon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {study.summary}
                      </p>
                    </div>

                    {/* Highlights Tags */}
                    <div className="px-8 pb-4">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.highlights.slice(0, 4).map((highlight, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600 border border-gray-100"
                          >
                            <TrendingUp className="w-3 h-3 text-gray-400" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcome Metrics */}
                    {study.outcomeMetrics &&
                      study.outcomeMetrics.length > 0 && (
                        <div className="mx-8 mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-3">
                            Key Outcomes
                          </p>
                          <div className="space-y-2.5">
                            {study.outcomeMetrics
                              .slice(0, 3)
                              .map((metric, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2.5"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-700 leading-snug">
                                    {metric}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                    {/* Card Footer CTA */}
                    <div className="px-8 pb-8">
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          Read Full Case Study
                        </span>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 via-teal-200/50 to-cyan-200/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Want Results Like These?
                </h2>
                <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
                  Let&apos;s discuss how our proven strategies can help your
                  business achieve similar growth and digital success.
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
                    href="/marketing"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
