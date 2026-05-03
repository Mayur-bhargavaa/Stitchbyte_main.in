"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Loader2, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type ProjectType = "figma" | "pdf" | "website" | "other";

interface UiUxProject {
  id: string;
  title: string;
  brand: string;
  projectType: ProjectType;
  projectUrl: string;
  thumbnailUrl: string;
  summary: string;
  tags: string[];
}

const marqueeItems = [
  "Research-Led Design",
  "User-First Interfaces",
  "Conversion-Ready Flows",
  "Design That Performs",
];

const servicePoints = [
  {
    title: "User-Centered Research",
    description:
      "We map user behavior, pain points, and journeys so every screen solves a real business and user need.",
  },
  {
    title: "Interface Design Systems",
    description:
      "From wireframes to polished visual systems, we create scalable UI foundations for web and product experiences.",
  },
  {
    title: "Conversion-Focused UX",
    description:
      "Each flow is designed to reduce friction, improve clarity, and move users toward meaningful actions.",
  },
];

export default function UiUxPage() {
  const [projects, setProjects] = useState<UiUxProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/ui-ux-projects");
        const data = await response.json();

        if (response.ok && data.success) {
          setProjects(Array.isArray(data.projects) ? data.projects : []);
        } else {
          setError(data.error || "Failed to load UI/UX projects.");
        }
      } catch (loadError) {
        setError("Unexpected error loading UI/UX projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
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

          <div className="absolute top-20 left-10 w-40 h-40">
            <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
            <div className="absolute top-4 left-4 w-full h-full border border-gray-300 rounded-3xl rotate-12 opacity-30" />
          </div>
          <div className="absolute bottom-32 right-10 w-32 h-32">
            <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
            <div className="absolute top-3 left-3 w-full h-full border border-gray-300 rounded-full opacity-30" />
          </div>
          <div className="absolute top-1/3 right-20 w-4 h-4 bg-gray-900 rounded-full opacity-20" />
          <div className="absolute top-1/2 left-16 w-3 h-3 bg-gray-900 rounded-full opacity-15" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gray-900 rounded-full opacity-10" />

          <div className="relative z-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4" />
              UI & UX Services
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              Design Experiences
              <br />
              Users Love
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We design intuitive digital products that look premium, feel effortless, and drive measurable business outcomes.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-4 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="mx-8 text-lg font-medium text-white flex items-center gap-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              UI & UX Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {servicePoints.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8 pb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
              Sample Projects
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              UI & UX Work Showcase
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading projects...
            </div>
          ) : error ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-rose-100 rounded-3xl p-8">
              <p className="text-rose-600">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No UI/UX projects available yet.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt={project.title}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                        />
                      ) : (
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 w-full h-full border border-gray-200 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 uppercase">
                              {project.projectType}
                            </span>
                            {project.brand ? <span className="text-xs text-gray-500">{project.brand}</span> : null}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Project Preview</p>
                            <p className="text-lg font-semibold text-gray-900 leading-snug">{project.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                      {project.title}
                    </h3>

                    <div className="space-y-4">
                      {[project.summary, ...(project.tags || []).slice(0, 2)].map((line, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                          <p className="text-gray-600 leading-relaxed">{line}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
                Professional UI/UX Design Services in Jaipur
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                What is UI/UX design? Great design is about more than looks. It&apos;s about making a website or app easy to use. At StitchByte, we are a top design agency in Jaipur. We help businesses turn complex tools into simple, friendly screens. Our goal is to help your users find what they need and take action. This leads to more sales and happier customers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Why is good design important for Jaipur businesses? Jaipur is a fast-growing city for tech and business. Your website is often the first thing a customer sees. If it&apos;s hard to use, they will leave for a competitor. Good design shows that your brand is professional and reliable. We help Jaipur startups and shops stand out with clean, modern interfaces.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We start every project with deep research. We study your users and what they need. We map out how they will move through your app. This makes sure every button and screen has a purpose. We create simple sketches called wireframes first. Then, we build interactive models for you to test. This helps us get the experience right before we start building.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We build complete design systems, not just single screens. We create sets of buttons, fonts, and colors that work together. This keeps your brand looking consistent everywhere. It also makes future updates faster and cheaper. Whether you need a redesign or a new app, our Jaipur team builds products that look premium and work perfectly.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Our Proven Design Process
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Discovery & User Research", desc: "We study your users to learn what they need. This helps us build a product that works for them." },
                  { title: "Information Architecture", desc: "We organize your content so it is easy to find. We make sure your app is simple to navigate." },
                  { title: "Wireframing & Prototyping", desc: "We create simple models for you to test. This helps us get feedback before we start the final design." },
                  { title: "Visual Design & Branding", desc: "We build beautiful interfaces with clear colors and fonts. We make sure your brand looks great." },
                  { title: "Handoff & Quality Assurance", desc: "We give our designs to the developers with clear notes. We make sure the final product looks exactly right." },
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
            Ready to Improve Your Product UI/UX?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s design a UI and UX strategy that improves engagement, trust, and conversion quality.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <Footer />
      </div>
    </div>
  );
}
