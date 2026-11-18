"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { newEventId, hasMarketingConsent, trackMeta } from "@/lib/meta-events";

export interface AuditConfig {
    productName: string; // stored on the lead, e.g. "Free Website Audit"
    badge: string;
    h1: string;
    sub: string;
    cta: string;
    challengeLabel: string;
    challengePlaceholder: string;
    audience: string[];
    covers: { title: string; text: string }[];
    benefits: string[];
    steps: { title: string; text: string }[];
    faqs: { q: string; a: string }[];
    waText: string;
}

const BUDGETS = ["Under ₹25k", "₹25k–₹50k", "₹50k–₹1L", "₹1L–₹3L", "₹3L+"];
const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"];
const BUSINESS_TYPES = ["Clinic / Healthcare", "Real Estate", "E-commerce / Retail", "Restaurant / Food", "Local Business", "Startup / SaaS", "Services / Consulting", "Other"];
const WHATSAPP = "919461330819";

export default function AuditLanding({ c }: { c: AuditConfig }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [started, setStarted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const [f, setF] = useState({
        name: "", brand: "", phone: "", email: "", website: "", businessType: "",
        challenge: "", budget: "", timeline: "", isDecisionMaker: true,
    });
    const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
    const onFocus = () => {
        if (started) return;
        setStarted(true);
        try {
            // Funnel step "form start" for GTM/GA4
            const w = window as unknown as { dataLayer?: unknown[] };
            (w.dataLayer = w.dataLayer || []).push({ event: "form_start", offer: c.productName });
        } catch {}
    };

    const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(c.waText)}`;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            let tracking = null;
            try {
                const stored = localStorage.getItem("stitchbyte_tracking");
                if (stored) tracking = JSON.parse(stored);
            } catch {}
            const eventId = newEventId();
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: f.name,
                    phone: f.phone,
                    email: f.email || undefined,
                    brand: f.brand || undefined,
                    message: f.challenge || undefined,
                    productName: c.productName,
                    budget: f.budget || undefined,
                    timeline: f.timeline || undefined,
                    businessType: f.businessType || undefined,
                    website: f.website || undefined,
                    isDecisionMaker: f.isDecisionMaker,
                    tracking,
                    eventId,
                    marketingConsent: hasMarketingConsent(),
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong. Please try again.");
            trackMeta("Lead", eventId, { source: "audit_funnel", offer: c.productName });
            setDone(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const input = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";
    const label = "block text-sm font-medium text-gray-700 mb-1.5";

    const form = (
        <div id="audit-form" className="bg-white text-gray-900 rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 scroll-mt-6">
            {done ? (
                <div className="text-center py-6">
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Request received</h3>
                    <p className="text-gray-600 mb-6">Our team will review your details and contact you. For a faster reply, message us on WhatsApp.</p>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium">
                        <MessageCircle className="w-4 h-4" />
                        Message us on WhatsApp
                    </a>
                </div>
            ) : (
                <form onSubmit={submit} className="space-y-4" onFocus={onFocus}>
                    <h3 className="text-xl font-bold">{c.cta}</h3>
                    <p className="text-sm text-gray-500 -mt-2">Free. No obligation.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className={label}>Name <span className="text-red-500">*</span></label>
                            <input required className={input} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                        </div>
                        <div>
                            <label className={label}>Business name</label>
                            <input className={input} value={f.brand} onChange={(e) => set("brand", e.target.value)} autoComplete="organization" />
                        </div>
                        <div>
                            <label className={label}>Phone / WhatsApp <span className="text-red-500">*</span></label>
                            <input required type="tel" inputMode="tel" className={input} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
                        </div>
                        <div>
                            <label className={label}>Email</label>
                            <input type="email" className={input} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                        </div>
                    </div>
                    <div>
                        <label className={label}>Website (if any)</label>
                        <input className={input} placeholder="yourbusiness.com" value={f.website} onChange={(e) => set("website", e.target.value)} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className={label}>Business type</label>
                            <select className={input} value={f.businessType} onChange={(e) => set("businessType", e.target.value)}>
                                <option value="">Select</option>
                                {BUSINESS_TYPES.map((o) => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={label}>Monthly / project budget</label>
                            <select className={input} value={f.budget} onChange={(e) => set("budget", e.target.value)}>
                                <option value="">Select</option>
                                {BUDGETS.map((o) => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className={label}>When do you want to start?</label>
                        <select className={input} value={f.timeline} onChange={(e) => set("timeline", e.target.value)}>
                            <option value="">Select</option>
                            {TIMELINES.map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={label}>{c.challengeLabel}</label>
                        <textarea rows={3} className={`${input} resize-none`} placeholder={c.challengePlaceholder} value={f.challenge} onChange={(e) => set("challenge", e.target.value)} />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" checked={f.isDecisionMaker} onChange={(e) => set("isDecisionMaker", e.target.checked)} className="w-4 h-4" />
                        I make the decision for my business
                    </label>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button type="submit" disabled={submitting} className="w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2">
                        {submitting ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <>{c.cta}<ArrowRight className="w-4 h-4" /></>}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                        By submitting you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
                    </p>
                </form>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20 sm:pb-0">
            {/* Minimal header: no site navigation to leak paid traffic */}
            <header className="border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/"><Image src="/logo-stitchbyte.png" alt="StitchByte" width={120} height={32} className="h-8 w-auto" /></Link>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-950">
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Talk to an Expert on WhatsApp</span>
                        <span className="sm:hidden">WhatsApp</span>
                    </a>
                </div>
            </header>

            {/* 1. Problem + promise, with form */}
            <section className="px-6 py-12 sm:py-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 mb-5">{c.badge}</span>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-[1.12] mb-5">{c.h1}</h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">{c.sub}</p>
                        <ul className="space-y-3 mb-8">
                            {c.benefits.map((b) => (
                                <li key={b} className="flex gap-3 text-gray-700"><Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />{b}</li>
                            ))}
                        </ul>
                        <a href="#audit-form" className="lg:hidden inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full">
                            {c.cta}<ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    {form}
                </div>
            </section>

            {/* 2. Who this is for */}
            <section className="px-6 py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-6">Who this is for</h2>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {c.audience.map((a) => (
                            <li key={a} className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-200 text-gray-700"><Check className="w-5 h-5 text-emerald-600 shrink-0" />{a}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 3. What we look at */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-8">What we review</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {c.covers.map((x) => (
                            <div key={x.title} className="p-6 rounded-2xl border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-1">{x.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{x.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. How it works */}
            <section className="px-6 py-16 bg-gray-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {c.steps.map((s, i) => (
                            <div key={s.title}>
                                <span className="text-5xl font-bold text-white/20">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="text-lg font-bold mt-2 mb-1">{s.title}</h3>
                                <p className="text-white/60 leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Proof: real case studies only */}
            <section className="px-6 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-3">See our work</h2>
                    <p className="text-gray-600 mb-6">Read how we worked with real businesses, including the approach and outcomes.</p>
                    <Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
                        View case studies<ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* 6. FAQ */}
            <section className="px-6 py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 text-center mb-8">Questions</h2>
                    <div className="space-y-3">
                        {c.faqs.map((q, i) => (
                            <div key={q.q} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium">
                                    {q.q}
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === i && <p className="px-5 pb-5 text-gray-600 leading-relaxed">{q.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className="px-6 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-5">{c.cta}</h2>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="#audit-form" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full">{c.cta}<ArrowRight className="w-4 h-4" /></a>
                        <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 font-medium rounded-full"><MessageCircle className="w-4 h-4" />WhatsApp</a>
                    </div>
                </div>
            </section>

            <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Stitchbyte · <Link href="/privacy" className="underline">Privacy</Link> · <Link href="/terms" className="underline">Terms</Link> · <Link href="/contact" className="underline">Contact</Link>
            </footer>

            {/* Sticky mobile CTA (right padding leaves room for the floating WhatsApp bubble) */}
            {!done && (
                <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 p-3 pr-20">
                    <a href="#audit-form" className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-full font-medium text-sm">{c.cta}</a>
                </div>
            )}
        </div>
    );
}
