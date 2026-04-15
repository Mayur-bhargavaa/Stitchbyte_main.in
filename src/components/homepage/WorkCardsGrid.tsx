"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Layers,
  Store,
  ShoppingBag,
  Smartphone,
  Loader2,
  LucideIcon,
} from "lucide-react";

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

interface Product {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  gradient: string;
  highlights: { icon: string; label: string }[];
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

export default function WorkCardsGrid() {
  const [homeWorkCards, setHomeWorkCards] = useState<HomeWorkCard[]>([]);
  const [workLoading, setWorkLoading] = useState(true);
  const [workError, setWorkError] = useState<string | null>(null);

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

  const iconBySource: Record<WorkSource, LucideIcon> = {
    marketing: BarChart3,
    seo: Globe,
    uiux: Layers,
    prebuilt: Store,
    customized: ShoppingBag,
  };

  if (workLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (workError) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">{workError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {homeWorkCards.map((card) => {
        const IconComponent = iconBySource[card.source] || Smartphone;

        return (
          <div
            key={card.id}
            className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="relative p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  Live
                </span>
              </div>
            </div>

            {/* Preview Area */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.description}</p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {card.tags?.slice(0, 4).map((tag: string, i: number) => (
                    <span
                      key={`${card.id}-${tag}-${i}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-gray-700 border border-gray-200"
                    >
                      <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {card.isExternal ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all group-hover:gap-3"
                >
                  Explore Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <Link
                  href={card.href}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all group-hover:gap-3"
                >
                  Explore Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
