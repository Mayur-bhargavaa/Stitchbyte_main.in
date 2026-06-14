"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Loader2, Sparkles, Megaphone, ArrowUpRight, BarChart3, Globe, Layers, Store, ShoppingBag, Smartphone, Zap, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type WorkType = "marketing" | "seo" | "uiux" | "prebuilt" | "customized";

interface ProductHighlight {
  icon: string;
  label: string;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  highlights: ProductHighlight[];
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
  projectType: "figma" | "pdf" | "website" | "other";
  summary: string;
  tags: string[];
  projectUrl: string;
}

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  type: WorkType;
  isExternal?: boolean;
}

const tabOptions: Array<{ value: "all" | "marketing" | "seo"; label: string }> = [
  { value: "all", label: "All" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
];

export default function WorkPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "marketing" | "seo">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWork = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/marketing-case-studies");
        const data = await response.json();

        const marketingStudies: MarketingCaseStudy[] = Array.isArray(data.studies) ? data.studies : [];

        const marketingItems: WorkItem[] = marketingStudies
          .filter((item) => item.category === "performance")
          .map((item) => ({
            id: `marketing-${item.id}`,
            title: item.brand,
            subtitle: "Marketing Case Study",
            description: item.summary,
            tags: item.highlights || [],
            href: `/marketing/${item.slug}`,
            type: "marketing",
          }));

        const seoItems: WorkItem[] = marketingStudies
          .filter((item) => item.category === "seo")
          .map((item) => ({
            id: `seo-${item.id}`,
            title: item.brand,
            subtitle: "SEO Case Study",
            description: item.summary,
            tags: item.highlights || [],
            href: `/marketing/${item.slug}`,
            type: "seo",
          }));

        setItems([
          ...marketingItems,
          ...seoItems,
        ]);
      } catch (loadError) {
        setError("Failed to load case studies.");
      } finally {
        setLoading(false);
      }
    };

    loadWork();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter((item) => item.type === activeTab);
  }, [items, activeTab]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-[55vh] bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
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

          <div className="relative z-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4" />
              All Work
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              Explore Everything
              <br />
              In One Place
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our performance marketing and SEO case studies managed directly from the admin panel.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabOptions.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-colors ${
                  activeTab === tab.value
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              Loading work items...
            </div>
          ) : error ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-rose-100 rounded-3xl p-8">
              <p className="text-rose-600">{error}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No items available in this section yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
                const layoutIndex = index % 4;

                // Setup custom icons for different services based on their category/type
                const iconBySource: Record<WorkType, LucideIcon> = {
                  marketing: BarChart3,
                  seo: Globe,
                  uiux: Layers,
                  prebuilt: Store,
                  customized: ShoppingBag,
                };
                const IconComponent = iconBySource[item.type] || Smartphone;

                // Format numbers like "01", "02", etc.
                const numberStr = String(index + 1).padStart(2, "0");

                if (layoutIndex === 0) {
                  // Wide Card (index % 4 === 0)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between md:col-span-2 min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100/50 text-[10px] font-semibold tracking-wider uppercase rounded-full">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          {item.subtitle}
                        </span>
                        <span className="text-sm font-mono text-slate-350 font-semibold">{numberStr}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-auto">
                        <div className="max-w-md">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">{item.title}</h3>
                          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                          </div>
                        </div>
                        <div className="hidden sm:flex w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0 items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-500 relative">
                          <Megaphone className="w-10 h-10 text-slate-400/80" />
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-slate-300 rounded-full animate-ping" />
                        </div>
                      </div>
                    </Link>
                  );
                } else if (layoutIndex === 1) {
                  // Narrow Card (index % 4 === 1)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-sm font-mono text-slate-355 font-semibold">{numberStr}</span>
                        <div className="w-9 h-9 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">{item.subtitle}</span>
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">{item.title}</h3>
                        <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                } else if (layoutIndex === 2) {
                  // Narrow Card (index % 4 === 2)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-sm font-mono text-slate-355 font-semibold">{numberStr}</span>
                        <div className="w-9 h-9 rounded-xl border border-violet-100 bg-violet-50/50 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform duration-500">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">{item.subtitle}</span>
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">{item.title}</h3>
                        <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  // Wide Card (index % 4 === 3)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="group relative bg-white rounded-[2rem] border border-slate-200/80 p-8 flex flex-col justify-between md:col-span-2 min-h-[300px] transition-all duration-500 ease-out hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2">
                          <span className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] font-mono text-slate-500 font-semibold">&lt;/&gt;</span>
                          <span className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                          </span>
                        </div>
                        <span className="text-sm font-mono text-slate-350 font-semibold">{numberStr}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-auto">
                        <div className="max-w-md">
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">{item.subtitle}</span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">{item.title}</h3>
                          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                          </div>
                        </div>
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
          )}
        </section>

        {/* SEO Content Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Our Digital Portfolio in Jaipur
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                What makes a digital project successful? At StitchByte, we believe our work speaks for itself. We have helped many businesses in fields like health, education, and real estate. Our team builds websites, mobile apps, and manages SEO. We also create marketing plans and great designs. We tailor every project to fit your specific business goals and audience.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Why is an expert partner important for Jaipur businesses? Jaipur is a major business hub with more competition than ever. To stand out, you need more than a basic website. You need a partner who understands your goals. We help startups and old brands alike with high-quality tech and design. Our goal is to help you compete on a national level with fast and beautiful digital products.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We focus on results. Every project in our portfolio shows a real problem we solved. We use smart thinking and expert tech to help our clients. Before we start, we study your business model and your audience. This makes sure the final product looks great and drives real sales for you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We invite you to browse our work and case studies. You can see our custom builds and UI/UX design projects. Each project shows the tech we used, like Next.js and React. We also explain the reason behind our design choices. Let our success in Jaipur be the start of your next digital project.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                What Sets Our Work Apart
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Business-First Approach", desc: "Every project starts with learning about your goals and audience. we plan everything before we start design or code." },
                  { title: "Modern Tech Stack", desc: "We build powerful apps using Next.js, React, and Node.js. Our tools scale easily as your business grows." },
                  { title: "SEO Built In", desc: "We build SEO and speed optimization into the start of every project. We make sure your site is ready for Google." },
                  { title: "Transparent Agile Process", desc: "We give you clear updates and project milestones. You will always know the status of your investment." },
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

        <Footer />
      </div>
    </div>
  );
}
