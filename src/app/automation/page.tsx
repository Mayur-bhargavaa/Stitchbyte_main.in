"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Zap,
  MessageSquare,
  Database,
  CheckCircle2,
  Sparkles,
  Workflow,
  Layers,
  Clock,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Play,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AUTOMATION_ITEMS } from "@/data/automation-items";

const marqueeItems = [
  "Autonomous AI Agents",
  "WhatsApp Business Pipelines",
  "CRM & Lead Auto-Sync",
  "Zero Manual Overhead",
  "24/7 Continuous Execution",
  "Custom LLM Integrations",
];

const automationCapabilities = [
  {
    id: "ai-agents",
    title: "Autonomous AI Agents",
    tagline: "Custom LLMs & Intelligent Triage",
    icon: Bot,
    description:
      "Trained on your private documentation and business SOPs to handle customer inquiries, qualify inbound leads, and resolve queries 24/7 with zero hallucinations.",
    features: [
      "Retrieval-Augmented Generation (RAG) with vector databases",
      "Context-aware multi-turn conversations in any language",
      "Human escalation handoff when high-touch sales is needed",
      "Direct integration with OpenAI, Claude, and Gemini APIs",
    ],
    metric: "92% automated query resolution",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Business Engines",
    tagline: "Omnichannel Customer Funnels",
    icon: MessageSquare,
    description:
      "Turn WhatsApp into an automated revenue and support machine. Capture leads instantly, send interactive catalogs, and broadcast updates compliant with Meta policies.",
    features: [
      "Official Meta WhatsApp Cloud API integration",
      "Automated lead capture & instant booking confirmations",
      "Interactive menu buttons, list pickers, and media flows",
      "Two-way team inbox synchronization",
    ],
    metric: "< 3 sec average response time",
  },
  {
    id: "crm-sync",
    title: "CRM & Pipeline Automation",
    tagline: "Zero Data Silos Across Tools",
    icon: Workflow,
    description:
      "Connect your landing pages, ads, and lead forms directly to HubSpot, Zoho, Google Sheets, and Slack channels in real time with zero manual copy-pasting.",
    features: [
      "Instant webhook dispatch for every lead submission",
      "Multi-channel alerts across Slack, Telegram, and Email",
      "Automatic lead scoring, tagging, and rep routing",
      "Deduplication and data formatting pipelines",
    ],
    metric: "100% elimination of manual entry",
  },
  {
    id: "docs",
    title: "Document & Invoice Extraction",
    tagline: "Cognitive Vision & OCR Processing",
    icon: FileSpreadsheet,
    description:
      "Automatically parse invoices, purchase orders, contracts, and PDFs, converting unstructured paper or image files into clean, structured JSON in your database.",
    features: [
      "Intelligent field extraction (line items, tax, GST, totals)",
      "Automated verification against existing purchase orders",
      "Direct sync to ERPs, accounting software, and databases",
      "High-accuracy fallback and validation rules",
    ],
    metric: "15x faster than manual bookkeeping",
  },
  {
    id: "custom-apis",
    title: "Custom Webhook & API Mesh",
    tagline: "Bespoke System Glue",
    icon: Cpu,
    description:
      "Custom microservices that bridge legacy software, payment gateways (Razorpay, Stripe), internal dashboards, and cloud services without vendor lock-in.",
    features: [
      "Serverless background jobs and scheduled workers",
      "Idempotent webhook handlers with auto-retry mechanisms",
      "Custom analytics logging and health alerting",
      "Full source code ownership on your cloud accounts",
    ],
    metric: "99.99% webhook delivery guarantee",
  },
  {
    id: "growth",
    title: "Marketing & Ad Automations",
    tagline: "Programmatic Lead Generation",
    icon: TrendingUp,
    description:
      "Automated audience sync between Meta/Google Ads and your customer lists, automated review collection sequences, and dynamic retargeting flows.",
    features: [
      "Automated Meta Conversions API (CAPI) server-side tracking",
      "Post-purchase review and feedback collection triggers",
      "Cart abandonment and re-engagement WhatsApp sequences",
      "Automated performance reporting summaries delivered to Slack",
    ],
    metric: "3.2x higher lead-to-call conversion",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Event Trigger",
    desc: "A customer submits a form, sends a WhatsApp message, or pays an invoice.",
    icon: Zap,
  },
  {
    step: "02",
    title: "AI & Logic Processing",
    desc: "The agent parses intent, enriches lead data, and determines the optimal routing.",
    icon: Bot,
  },
  {
    step: "03",
    title: "Multi-Tool Sync",
    desc: "Data updates in CRM, team gets a Slack ping, and calendar event is generated.",
    icon: Workflow,
  },
  {
    step: "04",
    title: "Instant Customer Action",
    desc: "Customer receives a tailored quote, onboarding link, or receipt in seconds.",
    icon: ShieldCheck,
  },
];

const techBadges = [
  "OpenAI GPT-4o",
  "Google Gemini 1.5",
  "LangChain",
  "Python & FastAPI",
  "Meta WhatsApp Cloud API",
  "n8n & Webhooks",
  "Pinecone Vector DB",
  "Node.js / Next.js",
  "Supabase / PostgreSQL",
  "Slack & Discord Bots",
];

export default function AutomationPage() {
  const [selectedCap, setSelectedCap] = useState(automationCapabilities[0].id);

  const activeCapability =
    automationCapabilities.find((c) => c.id === selectedCap) ||
    automationCapabilities[0];

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Marquee Banner */}
      <section className="pt-24 md:pt-28 pb-4 overflow-hidden border-b border-neutral-200/60 bg-white">
        <div className="flex select-none gap-6 whitespace-nowrap animate-marquee text-xs font-semibold tracking-wider uppercase text-neutral-500">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-24 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-medium tracking-wide mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Intelligent Automation Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 max-w-5xl mx-auto leading-[1.08]">
          Run Your Business On Autopilot. <br className="hidden sm:inline" />
          <span className="text-neutral-500">Eliminate Busywork.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto font-normal leading-relaxed">
          We architect and deploy autonomous AI agents, multi-channel WhatsApp workflows,
          and robust API pipelines so your team can focus on growth while machines handle
          the repetitive operations 24/7.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book an Automation Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#capabilities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-800 font-medium text-sm hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <span>Explore Capabilities</span>
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 text-left shadow-xs">
            <div className="text-3xl font-bold tracking-tight text-neutral-900">&lt; 5s</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Lead Response Speed</div>
          </div>
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 text-left shadow-xs">
            <div className="text-3xl font-bold tracking-tight text-neutral-900">85%+</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Reduction in Manual Tasks</div>
          </div>
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 text-left shadow-xs">
            <div className="text-3xl font-bold tracking-tight text-neutral-900">24/7</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Always-On Automation</div>
          </div>
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 text-left shadow-xs">
            <div className="text-3xl font-bold tracking-tight text-neutral-900">100%</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Code & Asset Ownership</div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl mx-auto border-t border-neutral-200/80">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            End-to-End Automation Firepower
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600">
            From smart LLM-backed customer support to automated multi-app backends,
            every system is custom-tailored to your exact business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationCapabilities.map((cap) => {
            const Icon = cap.icon;
            const fullItem = AUTOMATION_ITEMS.find((item) => item.id === cap.id);
            return (
              <Link
                key={cap.id}
                href={`/automation/${cap.id}`}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 md:p-7 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-700 text-xs font-semibold transition-colors">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{fullItem?.videoDuration || "Video Walkthrough"}</span>
                    </span>
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase text-neutral-400">
                    {cap.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-3 group-hover:text-neutral-700 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {cap.description}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {cap.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-neutral-100 mt-5 space-y-3">
                  <div className="flex items-center">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full">
                      ⚡ {cap.metric}
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 text-white text-xs font-medium transition-colors shadow-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Video & Details</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Visual Workflow Architecture */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Execution Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
              How Our Automated Pipelines Work
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600">
              Engineered for high reliability, idempotent execution, and total visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((ws, idx) => {
              const Icon = ws.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-neutral-50 border border-neutral-200/70"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-neutral-300 font-mono">
                      {ws.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 mb-2">{ws.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{ws.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            Battle-Tested Stack
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Powered By Modern Enterprise Frameworks
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {techBadges.map((badge, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 text-xs font-medium shadow-2xs hover:border-neutral-400 transition-colors"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Ready Prebuilt vs Custom Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prebuilt Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                ⚡ Deploy in 48 Hours
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-4 mb-3">
                Prebuilt Automation Engines
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Need to get moving immediately? Our production-tested automation solutions
                come with full source code ownership and plug directly into your business stack.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Business CRM with automated reply broadcast flows</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Agency lead pipeline tracker with instant webhook sync</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Digital QR ordering & auto-receipt printing systems</span>
                </li>
              </ul>
            </div>
            <Link
              href="/prebuilt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all self-start"
            >
              <span>View Prebuilt Engines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bespoke Custom Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-800 px-3 py-1 rounded-full">
                🧠 100% Bespoke Engineering
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-3">
                Tailored AI & System Automations
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Have proprietary workflows, unique CRM architectures, or custom ERP requirements?
                Our engineering team builds custom microservices and AI agent swarms from scratch.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Custom RAG vector search on your confidential company data</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-step AI logic routing & autonomous task runners</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Complete cloud handover with 30 days post-launch support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-100 transition-all self-start"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto text-center">
        <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 sm:p-14 shadow-sm">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Ready to Automate Your Operations?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Book a 30-minute discovery session with our lead engineers. We will analyze
            your existing workflows and map out high-ROI automation opportunities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-md"
            >
              <span>Start Your Automation Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919461330819"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-neutral-100 text-neutral-900 font-medium text-sm hover:bg-neutral-200 transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
