"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type MarketingCategory = "performance" | "seo";

interface MarketingCaseStudy {
  id: string;
  slug: string;
  brand: string;
  industry: string;
  category: MarketingCategory;
  summary: string;
  highlights: string[];
}

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<MarketingCategory>("performance");
  const [caseStudies, setCaseStudies] = useState<MarketingCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get("category");
    if (category === "seo" || category === "performance") {
      setActiveTab(category);
    }
  }, []);

  useEffect(() => {
    const loadCaseStudies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/marketing-case-studies");
        const data = await response.json();

        if (response.ok && data.success) {
          setCaseStudies(Array.isArray(data.studies) ? data.studies : []);
        } else {
          setError(data.error || "Failed to load case studies.");
        }
      } catch (loadError) {
        setError("Unexpected error loading case studies.");
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  const activeCaseStudies = caseStudies.filter((study) => study.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-[70vh] bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "240px 240px",
            }}
          />

          <div className="relative z-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4" />
              Marketing Case Studies
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              Marketing That
              <br />
              Drives Real Growth
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore how we help brands improve visibility, traffic quality, and conversions through performance marketing and SEO.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
              Case Studies
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: "Georgia, serif" }}>
              Our Performance Marketing Approach
            </h2>

            <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-full">
              <button
                onClick={() => setActiveTab("performance")}
                className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === "performance" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Performance Marketing
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === "seo" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                SEO
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              Loading case studies...
            </div>
          ) : error ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-rose-100 rounded-3xl p-8">
              <p className="text-rose-600">{error}</p>
            </div>
          ) : activeCaseStudies.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No case studies available in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {activeCaseStudies.map((study, index) => (
                <div
                  key={study.id}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-2">{study.industry}</p>
                          <h3 className="text-2xl font-bold text-gray-900">{study.brand}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{study.summary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                      {activeTab === "performance" ? "Performance Marketing" : "SEO"} Case Study
                    </h3>

                    <div className="space-y-4">
                      {(study.highlights || []).slice(0, 3).map((highlight, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                          <p className="text-gray-600 leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/marketing/${study.slug}`}
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEO Content Section */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Performance Marketing &amp; SEO Services in Jaipur
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                What is performance marketing and SEO? Good marketing is about spending money wisely. We help your business get found online. At StitchByte, we are based in Jaipur and help you attract new customers. We use data to drive our ads and SEO work. Every strategy is built for your specific goals.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Why is marketing important for Jaipur businesses? Jaipur is a busy city with many competing brands. Just having a website is not enough anymore. If you are not on the first page of Google, you are losing sales. Our experts help you lower your costs and find more customers. We build a marketing plan that works for you 24/7.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We follow a clear plan for performance marketing. We manage ads on Google, Facebook, and LinkedIn. Before we start, we study your audience and your rivals. We make sure every dollar you spend brings clear results. Whether you want leads, sales, or app installs, we can help.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our SEO work is about more than just keywords. We audit your site, optimize your content, and build strong links. We help your business grow naturally over time. This approach helps you get sales now with ads while building long-term growth with SEO. We help you dominate the search results in Jaipur.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                How We Deliver Marketing Results
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Campaign Strategy & Setup", desc: "We find your ideal customers and map their journey. We build ad campaigns that are easy to test and scale fast." },
                  { title: "SEO Technical Audits", desc: "We find and fix site errors, slow speeds, and indexing gaps that keep you from ranking well on Google." },
                  { title: "Content-Driven Organic Growth", desc: "We create SEO blog posts and landing pages that attract new visitors and build your authority online." },
                  { title: "Transparent Analytics & Reporting", desc: "We provide clear monthly reports. You will see clicks, leads, and ROI metrics that are easy to understand." },
                  { title: "Continuous Iterative Optimization", desc: "We constantly test new ads and refine your audience. We keep improving your results month after month." },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
            Want to Grow Your Organic Traffic?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s plan a focused strategy for your business across SEO, performance marketing, and conversion-ready web experiences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Talk to Our Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <Footer />
      </div>
    </div>
  );
}
