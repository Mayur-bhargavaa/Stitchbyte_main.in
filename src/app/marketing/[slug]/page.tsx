"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
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
      } catch (loadError) {
        setError("Failed to load case study.");
      } finally {
        setLoading(false);
      }
    };

    loadStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading case study...
        </div>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-red-500 text-lg mb-4">{error || "Case study not found."}</p>
        <Link href="/marketing" className="px-6 py-3 bg-gray-900 text-white rounded-full">
          Back to Marketing
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/marketing" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketing
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-500 mb-2">{study.industry}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {study.brand}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{study.summary}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {study.category === "performance" ? "Performance Marketing" : "SEO"}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    Case Study
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Goal</h3>
                  <p className="text-gray-600 leading-relaxed">{study.goal}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Approach</h3>
                  <p className="text-gray-600 leading-relaxed">{study.approach}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Result</h3>
                  <p className="text-gray-900 leading-relaxed font-medium">{study.result}</p>
                </div>
              </div>
            </div>

            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="aspect-[4/3] rounded-2xl bg-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Outcomes</h3>
                  <div className="space-y-4">
                    {study.outcomeMetrics.map((metric, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p className="text-gray-700">{metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all"
              >
                Start Similar Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
