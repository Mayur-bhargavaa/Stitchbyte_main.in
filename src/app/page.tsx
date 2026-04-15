import Link from "next/link";
import {
  Sparkles,
  Layers,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Globe,
  ChevronDown,
  CreditCard,
  BarChart3,
  Clock,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomepageFAQSchema from "@/components/HomepageFAQSchema";
import FAQAccordion from "@/components/homepage/FAQAccordion";
import ReviewCarousel from "@/components/homepage/ReviewCarousel";
import WorkCardsGrid from "@/components/homepage/WorkCardsGrid";

const faqs = [
  {
    question: "How long does it take to deliver a pre-built application or website?",
    answer: "Our pre-built solutions are typically ready for deployment within 24-48 hours. For custom integrations, the timeline extends to 1-2 weeks depending on complexity."
  },
  {
    question: "Do you provide the complete source code after development?",
    answer: "Yes, absolutely! You receive full ownership of the source code, including all assets, documentation, and deployment scripts."
  },
  {
    question: "What's the difference between a pre-built and a custom development project?",
    answer: "Pre-built projects use our existing templates and can be quickly customized. Custom development is built from scratch according to your unique specifications."
  },
  {
    question: "Do you provide maintenance and support after delivery?",
    answer: "Yes, we offer various support packages including bug fixes, feature updates, and 24/7 technical support options."
  },
  {
    question: "What technologies do you use for development?",
    answer: "We use modern technologies including Next.js, React, TypeScript, Tailwind CSS, and various databases like PostgreSQL and MongoDB."
  }
];

const workTimeline = [
  {
    phase: "Discovery",
    duration: "3-5 days",
    details: "We align on goals, audience, scope, and constraints through a focused kickoff process.",
  },
  {
    phase: "Strategy",
    duration: "4-7 days",
    details: "We define the roadmap, information architecture, and channel priorities before production.",
  },
  {
    phase: "Build",
    duration: "2-6 weeks",
    details: "Design, development, SEO/ads setup, and QA move in clear sprint milestones.",
  },
  {
    phase: "Launch",
    duration: "2-4 days",
    details: "We handle deployment, analytics verification, and go-live checks for a stable release.",
  },
  {
    phase: "Optimization",
    duration: "Ongoing",
    details: "We monitor performance, iterate with data, and continuously improve business outcomes.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-500/20">
      {/* Global Grid Background - Same as Prebuilt */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '240px 240px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section - White Theme with Modern Grid */}
        <section className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
          {/* Modern Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Larger Grid Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '240px 240px'
            }}
          />

          {/* Decorative Corner Elements */}
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

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-lg">
                <Sparkles className="w-4 h-4 text-orange-500" />
                SEO, Digital Presence, Web Development & UX/UI
              </span>
            </div>

            {/* Floating Feature Icons */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
              {/* Left Icon - Code/Development */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
                </div>
              </div>

              {/* Center Icon - Startup/Growth - Larger */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Zap className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500" />
                </div>
              </div>

              {/* Right Icon - Globe/Web */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Main Headline - Large & Bold */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              <span className="block text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                From Idea to Execution —
              </span>
              <span className="block text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                Launch with <span className="relative inline-block">
                  <span className="relative z-10">StitchByte</span>
                  <span className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10 rounded" />
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
              We help brands grow online with SEO, stronger digital presence, modern web development,
              and easy-to-use UX/UI experiences—all in the same trusted StitchByte workflow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <a
                href="#apps"
                className="group px-10 py-5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center gap-3"
              >
                Let&apos;s Explore
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all shadow-lg flex items-center gap-3"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <a href="#apps" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-xs mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Motivational Quotes Marquee Section */}
        <section className="py-8 overflow-hidden bg-gradient-to-b from-transparent to-slate-50/50">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {['SEO That Performs', 'Grow Your Digital Presence', 'Web Development That Scales', 'Simple UX, Strong UI', 'Launch with Confidence', 'Your Vision, Our Execution', 'Build, Rank, and Grow'].map((quote, i) => (
                <span key={i} className="mx-12 text-2xl font-light text-gray-300 tracking-wide">
                  ✦ {quote}
                </span>
              ))}
              {['SEO That Performs', 'Grow Your Digital Presence', 'Web Development That Scales', 'Simple UX, Strong UI', 'Launch with Confidence', 'Your Vision, Our Execution', 'Build, Rank, and Grow'].map((quote, i) => (
                <span key={`dup-${i}`} className="mx-12 text-2xl font-light text-gray-300 tracking-wide">
                  ✦ {quote}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Grid - Modern Black & White Theme */}
        <section id="apps" className="relative py-24 overflow-hidden bg-white">
          <div className="relative max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
                Our Products
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Streamline Business with
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                our Flexible Options
              </h2>
            </div>

            {/* Work Cards - Client Island */}
            <WorkCardsGrid />

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
              >
                View All Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Futuredesks Style */}
        <section id="features" className="relative py-24 lg:py-32 bg-white overflow-hidden">
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <span className="inline-block px-5 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-full border border-gray-200 mb-6">
                Why Us
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Why Choose StitchByte?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                We combine SEO strategy, digital brand growth, quality web development, and intuitive UX/UI
                to deliver results that are scalable and easy for users.
              </p>
            </div>

            {/* Three Column Layout: Features - Mockup - Features */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">

              {/* Left Features Column */}
              <div className="space-y-10 lg:space-y-12">
                {/* Feature 1 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-all">
                    <BarChart3 className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SEO & Performance Insights</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Track rankings, traffic, and audience behavior to improve visibility and growth decisions.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-violet-200 group-hover:bg-violet-50 transition-all">
                    <Layers className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Web Development for Your Business</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Build reliable websites and platforms tailored to your goals, users, and operations.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-all">
                    <CreditCard className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Stronger Digital Presence</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Align your website, content, and conversion flow so customers find and trust your brand.
                  </p>
                </div>
              </div>

              {/* Center Mockup Area */}
              <div className="relative hidden lg:flex items-center justify-center">
                {/* Main Dashboard Mockup */}
                <div className="relative">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-3xl blur-3xl scale-110" />

                  {/* Main Card */}
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transform hover:scale-105 transition-transform duration-500">
                    <div className="w-72 h-80 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden">
                      {/* Dashboard Header */}
                      <div className="bg-gray-900 p-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                        </div>
                        <div className="flex-1 bg-gray-700 rounded h-4 mx-4" />
                      </div>

                      {/* Dashboard Content */}
                      <div className="p-4 space-y-3">
                        <div className="flex gap-2">
                          <div className="w-1/3 h-16 bg-emerald-100 rounded-lg" />
                          <div className="w-1/3 h-16 bg-violet-100 rounded-lg" />
                          <div className="w-1/3 h-16 bg-amber-100 rounded-lg" />
                        </div>
                        <div className="h-24 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg border border-gray-100" />
                        <div className="flex gap-2">
                          <div className="flex-1 h-8 bg-gray-100 rounded" />
                          <div className="w-20 h-8 bg-gray-900 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Element - Top Left */}
                  <div className="absolute -top-6 -left-8 bg-white rounded-xl shadow-lg border border-gray-100 p-3 transform -rotate-6 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Fast Deploy</span>
                    </div>
                  </div>

                  {/* Floating Element - Top Right */}
                  <div className="absolute -top-4 -right-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 transform rotate-6 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-violet-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Secure</span>
                    </div>
                  </div>

                  {/* Floating Element - Bottom Left */}
                  <div className="absolute -bottom-4 -left-6 bg-gray-900 rounded-xl shadow-lg p-3 transform rotate-3 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400">&lt;/&gt;</span>
                      <span className="text-xs font-medium text-white">Code</span>
                    </div>
                  </div>

                  {/* Floating Element - Bottom Right */}
                  <div className="absolute -bottom-6 -right-8 bg-white rounded-xl shadow-lg border border-gray-100 p-3 transform -rotate-3 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Global</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Features Column */}
              <div className="space-y-10 lg:space-y-12">
                {/* Feature 4 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-all">
                    <Smartphone className="w-6 h-6 text-gray-600 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">UX/UI That Feels Easy</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Create clean interfaces and simple user journeys that improve engagement and retention.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-rose-200 group-hover:bg-rose-50 transition-all">
                    <Shield className="w-6 h-6 text-gray-600 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure and Reliable Delivery</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Launch confidently with secure builds, stable architecture, and support you can trust.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                    <Layers className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">One Team, End-to-End</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    Handle strategy, design, development, and optimization in one consistent process.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile: Show features in 2-column grid */}
            <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Mobile Mockup */}
              <div className="sm:col-span-2 flex justify-center mb-8">
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
                  <div className="w-64 h-48 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden">
                    <div className="bg-gray-900 p-2 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex gap-2">
                        <div className="w-1/3 h-10 bg-emerald-100 rounded" />
                        <div className="w-1/3 h-10 bg-violet-100 rounded" />
                        <div className="w-1/3 h-10 bg-amber-100 rounded" />
                      </div>
                      <div className="h-16 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded border border-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Timeline */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
              <Clock className="w-4 h-4" />
              Process Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              How We Work
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Clear stages, practical timelines, and accountable execution from kickoff to growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {workTimeline.map((step, index) => (
              <div key={step.phase} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{step.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Client Reviews */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full mb-4">
                Client Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                What Clients Shared
              </h2>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:border-gray-900 transition-all self-start"
            >
              View All Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Review Carousel - Client Island */}
          <ReviewCarousel initialReviews={[]} />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-24 bg-white">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left - Title */}
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  Frequently Asked
                  <br />
                  Questions
                </h2>
              </div>

              {/* Right - FAQ Items - Client Island */}
              <div>
                <FAQAccordion faqs={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Schema for rich results */}
        <HomepageFAQSchema />

        {/* Shared Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
