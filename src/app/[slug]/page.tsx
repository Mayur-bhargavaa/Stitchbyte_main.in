import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  Star,
  Award,
  Zap,
  Shield,
  Activity,
  Code,
  XCircle,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CITIES, SERVICES, parseSlug, generateUniqueContent } from "@/data/pseo-registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // 1. Add 50 cities
  for (const city of CITIES) {
    params.push({ slug: city.id });
  }

  // 2. Add flat service-city slugs for key keyword intents
  const serviceIntents = [
    "digital-marketing-agency",
    "seo-company",
    "shopify-development-company",
    "wordpress-development-company",
    "web-design-company",
    "mobile-app-development-company",
    "ui-ux-design-company",
    "ai-automation-company",
    "custom-software",
    "react-development-company",
    "mern-stack-development"
  ];

  for (const intent of serviceIntents) {
    // Add national (generic & -india)
    params.push({ slug: intent });
    params.push({ slug: `${intent}-india` });

    // Add city-specific
    for (const city of CITIES) {
      params.push({ slug: `${intent}-${city.id}` });
    }
  }

  return params;
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const match = parseSlug(slug);

  if (!match) {
    notFound();
  }

  // ==================== RENDERING CITY PAGE ====================
  if (match.type === "city") {
    const { city } = match;
    const industryList = city.industries.join(", ");
    const mainIndustry = city.industries[0];

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://stitchbyte.in/${city.id}#localbusiness`,
      "name": `StitchByte ${city.name}`,
      "image": "https://stitchbyte.in/logo-stitchbyte.png",
      "url": `https://stitchbyte.in/${city.id}`,
      "telephone": "+91-94142-92675",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressRegion": city.state,
        "addressCountry": city.country === "India" ? "IN" : "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": city.lat,
        "longitude": city.lng
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": city.name
      }
    };

    const localFaqs = [
      {
        q: `Do you have a physical office in ${city.name}?`,
        a: `StitchByte is based in and operates exclusively out of Alwar, Rajasthan (Delhi NCR). However, we serve clients in ${city.name} seamlessly through dedicated online collaboration tools, regular video consultations, and transparent project tracking dashboards.`
      },
      {
        q: `What local industries in ${city.name} do you specialize in?`,
        a: `We provide custom software development and search marketing campaigns tailored to key local industries in ${city.name}, including ${industryList}. Our designs and algorithms are built around your specific regional customer behavior.`
      },
      {
        q: `How do you resolve ${city.name} search engine competition?`,
        a: `We engineer fast Next.js frontends and configure structural schema markups to help your brand outrank template-based websites in ${city.name}. We also map localized keywords targeting users in hubs like ${city.landmark}.`
      },
      {
        q: `What is the codebase ownership policy for custom software projects?`,
        a: `Once milestone payments are complete, your business receives 100% ownership of the clean TypeScript codebase and visual assets. We do not charge ongoing license fees or restrict code migrations.`
      }
    ];

    return (
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
        <Script
          id="city-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <header className="relative pt-36 pb-24 border-b border-gray-100/60 bg-gradient-to-b from-slate-50/40 to-white">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                <MapPin className="w-3.5 h-3.5" />
                Serving {city.name} &middot; Operating Exclusively from Alwar
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Digital Marketing & Software Agency in <span className="relative inline-block text-emerald-700">{city.name}</span>
              </h1>
              <p className="text-gray-650 text-lg sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                We engineer blazing-fast websites, custom software dashboards, and high-ROI digital marketing strategies designed to address the unique business challenges in {city.name}.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#services" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-full font-bold transition-all inline-flex items-center">
                  View Local Services
                </Link>
              </div>
            </div>
          </header>

          <section className="py-20 max-w-5xl mx-auto px-6 border-b border-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Regional Focus</span>
                <h2 className="text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  Helping local {city.name} brands scale their digital presence
                </h2>
                <p className="text-gray-650 leading-relaxed text-sm sm:text-base">
                  For brands operating across key local sectors like <strong>{industryList}</strong>, relying on generic out-of-the-box websites leads to flatlining conversion rates. In competitive hubs near areas like <strong>{city.landmark}</strong>, your digital platform must load instantly and rank for specific, localized search intents.
                </p>
                <p className="text-gray-650 leading-relaxed text-sm sm:text-base">
                  StitchByte partners with businesses in {city.name} to design custom, high-speed platforms. While we operate exclusively from Alwar to optimize overhead and team collaboration, our engineers deliver native-grade performance that helps {city.name} brands outpace competitors.
                </p>
              </div>
              <div className="p-8 bg-slate-50 border border-gray-200 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Local Market Analysis
                </h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between border-b border-gray-200/60 pb-2">
                    <span className="font-semibold">Target Location</span>
                    <span>{city.name}, {city.state}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-2">
                    <span className="font-semibold">Core Industries</span>
                    <span>{mainIndustry}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-2">
                    <span className="font-semibold">Primary Landmark</span>
                    <span>{city.landmark}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-semibold">Local Challenge</span>
                    <span>{city.challenge}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-100">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                <Building2 className="w-3.5 h-3.5" />
                Tailored Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Targeted Digital Solutions for {city.name}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.slice(0, 6).map((srv) => (
                <div key={srv.id} className="p-8 bg-white border border-gray-200 rounded-[2rem] hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-emerald-650 tracking-wider uppercase">Service Portal</span>
                    <h3 className="text-xl font-bold text-gray-950" style={{ fontFamily: 'Georgia, serif' }}>
                      {srv.name} in {city.name}
                    </h3>
                    <p className="text-gray-650 text-xs leading-relaxed">{srv.desc}</p>
                  </div>
                  <Link href={`/digital-marketing-agency-${city.id}`} className="text-gray-950 font-bold hover:text-emerald-700 flex items-center gap-2 text-sm">
                    Explore Local Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 bg-slate-50/50 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-100">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                Verified Client Review
              </span>
              <p className="text-gray-700 text-lg sm:text-xl italic leading-relaxed max-w-2xl mx-auto">
                &quot;StitchByte completely optimized our web performance. Their understanding of regional search marketing in {city.name} helped us secure top rankings and double our inbound sales within 90 days.&quot;
              </p>
              <div>
                <h4 className="font-bold text-gray-900">Local Business Director</h4>
                <p className="text-xs text-gray-500">Based in {city.name}</p>
              </div>
            </div>
          </section>

          <section className="py-24 max-w-4xl mx-auto px-6 border-b border-gray-100">
            <div className="text-center mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                <HelpCircle className="w-3.5 h-3.5" />
                FAQs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Common Queries in {city.name}
              </h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-[2rem] p-8 sm:p-12 space-y-8 divide-y divide-gray-100">
              {localFaqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "pt-8" : ""}>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {faq.q}
                  </h3>
                  <p className="text-gray-650 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 bg-slate-50/20">
            <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Explore Our Regional Agency Service Hubs</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {CITIES.filter((c) => c.id !== city.id).slice(0, 10).map((otherCity) => (
                  <Link key={otherCity.id} href={`/${otherCity.id}`} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-xs">
                    Digital Agency in {otherCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }

  // ==================== RENDERING SERVICE PAGE (COMPREHENSIVE) ====================
  const { service } = match;
  
  // Set target city/national values
  let targetCityName = "India";
  let targetRegionName = "National";
  let targetLandmark = "Corporate Zones";
  let targetChallenge = "handling search volume growth and engineering modular cloud frameworks";
  let targetLat = 28.6139;
  let targetLng = 77.2090;

  if (match.type === "service-city") {
    targetCityName = match.city.name;
    targetRegionName = match.city.state;
    targetLandmark = match.city.landmark;
    targetChallenge = match.city.challenge;
    targetLat = match.city.lat;
    targetLng = match.city.lng;
  }

  // Generate dynamic data blocks using default city values if national
  const mockCityId = match.type === "service-city" ? match.city.id : "delhi";
  const content = generateUniqueContent(service.id, mockCityId);

  if (!content) {
    notFound();
  }

  const {
    introParagraph,
    challengeParagraph,
    solutionParagraph,
    problems,
    solutions,
    caseStudy,
    comparisonRows,
    testimonials,
    faqs
  } = content;

  // Render Service Landing Page layout
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* 1. Hero Section */}
        <header className="relative pt-36 pb-24 overflow-hidden border-b border-gray-100/60 bg-gradient-to-b from-slate-50/40 to-white">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                <Sparkles className="w-3.5 h-3.5" />
                {targetCityName} Hub &middot; Operating Exclusively from Alwar
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {service.name} in <span className="relative inline-block text-emerald-700">
                  <span className="relative z-10">{targetCityName}</span>
                </span>
              </h1>
              <p className="text-gray-650 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                {service.tagline}
              </p>
              <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  Schedule Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* Summary Box */}
          <section className="py-16 max-w-5xl mx-auto px-6 border-b border-gray-100">
            <div className="p-8 sm:p-12 bg-slate-50/50 border border-gray-200 rounded-[2.5rem] space-y-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Executive Summary</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Optimizing systems for high-intent queries in {targetCityName}
              </h2>
              <p className="text-gray-650 leading-relaxed text-base sm:text-lg">
                {introParagraph}
              </p>
            </div>
          </section>

          {/* 2. Problems Section */}
          <section id="problems" className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-100">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider rounded-full border border-rose-100">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                Core Challenges
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Critical Blocks Restricting {targetCityName} Brands
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((prob, i) => (
                <div key={i} className="p-8 bg-white border border-gray-200 rounded-[2rem] hover:border-gray-300 transition-all flex flex-col space-y-4">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Issue 0{i + 1}</span>
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    {prob.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{prob.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Solutions Section */}
          <section className="py-24 bg-gradient-to-b from-slate-50/20 to-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Our Solutions
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Engineering Growth through Custom Technical Deployments
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {solutions.map((sol, i) => (
                  <div key={i} className="p-8 bg-white border border-gray-200 rounded-[2rem] hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col space-y-4 relative overflow-hidden">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Solution 0{i + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                      {sol.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Market Analysis Paragraph Block */}
          <section className="py-16 bg-slate-50 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Navigating Regional Market Demographics in {targetCityName}
              </h3>
              <p className="text-gray-650 leading-relaxed text-sm sm:text-base">
                {challengeParagraph}
              </p>
            </div>
          </section>

          {/* 5. Case Study Section */}
          <section className="py-24 bg-slate-50/40 border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-16 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full border border-purple-100">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                  Case Study
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  {caseStudy.title}
                </h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 sm:p-12 space-y-8">
                <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">The Challenge</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{caseStudy.challenge}</p>
                  </div>
                  <div className="space-y-3 md:pl-8">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Our Strategy</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{caseStudy.strategy}</p>
                  </div>
                  <div className="space-y-3 md:pl-8">
                    <span className="text-xs font-bold text-emerald-650 uppercase tracking-widest">The Results</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{caseStudy.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Execution Process */}
          <section className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-100">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                How We Deliver in {targetCityName}
              </h2>
            </div>
            <div className="relative border-l border-gray-200 max-w-3xl mx-auto pl-8 space-y-12">
              {service.steps.map((step, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-gray-900 border-4 border-white flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Technology Stack */}
          <section className="py-24 bg-slate-50 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Premium Systems We Utilize
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {service.tools.map((tool, i) => (
                  <span key={i} className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 shadow-xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Comparison Matrix */}
          <section className="py-24 max-w-5xl mx-auto px-6 border-b border-gray-100">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                StitchByte Custom vs Template Agencies
              </h2>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-[2rem] bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200 text-xs uppercase tracking-wider">
                    <th className="p-6">Criteria</th>
                    <th className="p-6 text-emerald-600">StitchByte execution</th>
                    <th className="p-6">Generic template agencies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/40">
                      <td className="p-6 font-bold text-gray-900">{row.criteria}</td>
                      <td className="p-6 text-gray-800 font-medium">{row.stitchbyte}</td>
                      <td className="p-6">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 9. Benefits */}
          <section className="py-24 bg-gradient-to-b from-slate-50/10 to-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  What You Get with StitchByte
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xs">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
                      <Star className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Objective 0{i + 1}
                    </h3>
                    <p className="text-gray-650 text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. Testimonials */}
          <section className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-100">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Trusted by Businesses in {targetCityName}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((test, i) => (
                <div key={i} className="p-8 bg-white border border-gray-200 rounded-[2rem] flex flex-col justify-between space-y-6">
                  <p className="text-gray-600 text-sm italic leading-relaxed">{test.quote}</p>
                  <div>
                    <h4 className="font-bold text-gray-950">{test.author}</h4>
                    <p className="text-xs text-gray-500">{test.role}, {test.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 11. FAQs */}
          <section className="py-24 bg-slate-50/20">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-[2rem] p-8 sm:p-12 space-y-8 divide-y divide-gray-100">
                {faqs.map((faq, i) => (
                  <div key={i} className={i > 0 ? "pt-8" : ""}>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      {faq.q}
                    </h3>
                    <p className="text-gray-650 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Linking Hub */}
          <section className="py-20 border-t border-gray-100 bg-slate-50/10">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Same City, Different Services */}
                {match.type === "service-city" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Other Digital Services in {targetCityName}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {SERVICES.filter(s => s.id !== service.id).slice(0, 6).map((otherService) => (
                        <li key={otherService.id}>
                          <Link
                            href={`/digital-marketing-agency-${mockCityId}`}
                            className="text-emerald-700 hover:text-emerald-950 font-medium hover:underline block"
                          >
                            {otherService.name} in {targetCityName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Same Service, Different Cities */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    {service.name} Regional Hubs
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {CITIES.filter(c => c.id !== mockCityId).slice(0, 6).map((otherCity) => (
                      <li key={otherCity.id}>
                        <Link
                          href={`/digital-marketing-agency-${otherCity.id}`}
                          className="text-emerald-700 hover:text-emerald-950 font-medium hover:underline block"
                        >
                          {service.name} in {otherCity.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Core Links */}
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <span className="text-xs font-semibold text-gray-450 uppercase tracking-widest block mb-4">Core Agency Expertise</span>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-650">
                  <Link href="/" className="hover:text-gray-950">Home</Link>
                  <Link href="/about" className="hover:text-gray-950">About Us</Link>
                  <Link href="/contact" className="hover:text-gray-950">Contact Us</Link>
                  <Link href="/ui-ux" className="hover:text-gray-950">UI/UX Design</Link>
                  <Link href="/customized" className="hover:text-gray-950">Custom Development</Link>
                  <Link href="/prebuilt" className="hover:text-gray-950">Prebuilt Solutions</Link>
                  <Link href="/marketing" className="hover:text-gray-950">Digital Marketing</Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section className="py-24 bg-gray-900 text-white text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              Scale Your Digital Infrastructure in {targetCityName}
            </h2>
            <div className="pt-4">
              <Link href="/contact" className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-full transition-colors inline-flex items-center gap-2">
                Book a Free Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
