"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Loader2, Sparkles } from "lucide-react";
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

const tabOptions: Array<{ value: "all" | WorkType; label: string }> = [
  { value: "all", label: "All" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
  { value: "uiux", label: "UI & UX" },
  { value: "prebuilt", label: "Prebuilt" },
  { value: "customized", label: "Customized" },
];

export default function WorkPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | WorkType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWork = async () => {
      setLoading(true);
      setError("");

      try {
        const [productsResponse, customResponse, marketingResponse, uiuxResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/custom-projects?category=all"),
          fetch("/api/marketing-case-studies"),
          fetch("/api/ui-ux-projects"),
        ]);

        const productsData = await productsResponse.json();
        const customData = await customResponse.json();
        const marketingData = await marketingResponse.json();
        const uiuxData = await uiuxResponse.json();

        const products: Product[] = Array.isArray(productsData.products) ? productsData.products : [];
        const customProjects: CustomProject[] = Array.isArray(customData.data) ? customData.data : [];
        const marketingStudies: MarketingCaseStudy[] = Array.isArray(marketingData.studies) ? marketingData.studies : [];
        const uiuxProjects: UiUxProject[] = Array.isArray(uiuxData.projects) ? uiuxData.projects : [];

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

        const uiuxItems: WorkItem[] = uiuxProjects.map((item) => ({
          id: `uiux-${item.id}`,
          title: item.title,
          subtitle: `UI & UX • ${item.projectType.toUpperCase()}`,
          description: item.summary,
          tags: item.tags || [],
          href: item.projectUrl,
          type: "uiux",
          isExternal: true,
        }));

        const prebuiltItems: WorkItem[] = products.map((item) => ({
          id: `prebuilt-${item.id}`,
          title: item.name,
          subtitle: "Prebuilt Product",
          description: item.shortDescription || item.tagline,
          tags: (item.highlights || []).map((highlight) => highlight.label),
          href: `/prebuilt/${item.id}`,
          type: "prebuilt",
        }));

        const customizedItems: WorkItem[] = customProjects.map((item) => ({
          id: `customized-${item.id}`,
          title: item.title,
          subtitle: "Customized Project",
          description: item.description,
          tags: item.technologies || [],
          href: `/customized/${item.slug}`,
          type: "customized",
        }));

        setItems([
          ...marketingItems,
          ...seoItems,
          ...uiuxItems,
          ...prebuiltItems,
          ...customizedItems,
        ]);
      } catch (loadError) {
        setError("Failed to load work items.");
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
              Marketing, SEO, UI/UX, Prebuilt products, and Customized projects in a single unified view.
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
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{item.subtitle}</p>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-6" title={item.description}>{item.description}</p>

                  {(item.tags || []).length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span key={`${item.id}-${tag}`} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Open Work
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Open Work
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
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
