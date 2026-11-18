import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export interface SeoSection {
    h2: string;
    paragraphs?: string[];
    bullets?: string[];
}

export interface SeoLandingProps {
    path: string;
    breadcrumb: string;
    eyebrow: string;
    h1: string;
    intro: string;
    sections: SeoSection[];
    faqs: { q: string; a: string }[];
    cta: { label: string; href: string };
    waText: string;
    related: { label: string; href: string }[];
}

export default function SeoLanding(p: SeoLandingProps) {
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
    const wa = `https://wa.me/919461330819?text=${encodeURIComponent(p.waText)}`;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: p.breadcrumb, path: p.path },
                ])}
            />
            <JsonLd data={faqLd} />
            <Navbar />

            <header className="px-6 pt-32 pb-12 sm:pt-40">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm font-medium text-gray-500 mb-3">{p.eyebrow}</p>
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-[1.12] mb-5">{p.h1}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">{p.intro}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={p.cta.href} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
                            {p.cta.label}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 font-medium rounded-full hover:bg-gray-50 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            Talk to an Expert on WhatsApp
                        </a>
                    </div>
                </div>
            </header>

            <main className="px-6 pb-16">
                <article className="max-w-3xl mx-auto space-y-12">
                    {p.sections.map((s) => (
                        <section key={s.h2}>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-4">{s.h2}</h2>
                            {s.paragraphs?.map((t) => (
                                <p key={t} className="text-gray-700 leading-relaxed mb-4">{t}</p>
                            ))}
                            {s.bullets && (
                                <ul className="space-y-2.5 list-disc pl-5 text-gray-700 leading-relaxed">
                                    {s.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-5">Frequently asked questions</h2>
                        <div className="space-y-5">
                            {p.faqs.map((f) => (
                                <div key={f.q}>
                                    <h3 className="font-semibold text-gray-900 mb-1">{f.q}</h3>
                                    <p className="text-gray-700 leading-relaxed">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl bg-gray-900 text-white p-8 text-center">
                        <h2 className="text-2xl font-bold mb-3">Not sure where to start?</h2>
                        <p className="text-white/70 mb-6">Tell us about your business and we will point you to the right next step.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href={p.cta.href} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-900 font-medium rounded-full">
                                {p.cta.label}
                            </Link>
                            <Link href="/contact" className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 font-medium rounded-full hover:bg-white/10">
                                Get a Quote
                            </Link>
                        </div>
                    </section>

                    <nav aria-label="Related pages">
                        <h2 className="text-lg font-bold text-gray-950 mb-3">Related</h2>
                        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            {p.related.map((r) => (
                                <li key={r.href}>
                                    <Link href={r.href} className="text-gray-700 underline underline-offset-4 hover:text-gray-950">{r.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </article>
            </main>

            <Footer />
        </div>
    );
}
