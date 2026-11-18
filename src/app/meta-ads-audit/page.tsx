import AuditLanding, { type AuditConfig } from "@/components/audit/AuditLanding";

const config: AuditConfig = {
  productName: "Free Meta Ads Audit",
  badge: "Free Meta Ads Funnel Audit",
  h1: "Spending on Meta Ads but not getting customers?",
  sub: "We review your whole funnel, from the ad to the landing page to follow-up, and show you where the leads are being lost.",
  cta: "Get My Free Ads Audit",
  challengeLabel: "What is happening with your ads?",
  challengePlaceholder: "e.g. We get clicks and messages but they do not turn into customers",
  waText: "Hi Stitchbyte, I want a free Meta Ads funnel audit.",
  benefits: [
    "See where your ad spend is leaking along the funnel",
    "Find out if the problem is the ad, the offer or the website",
    "A clear next step, with no obligation",
  ],
  audience: [
    "Businesses already running Meta (Facebook and Instagram) ads",
    "Advertisers who get clicks or cheap leads that do not buy",
    "Owners who are unsure their tracking is set up correctly",
    "Businesses about to start ads who want to avoid wasting budget",
  ],
  covers: [
    { title: "Campaign structure", text: "Objectives, budgets and how campaigns and ad sets are organised." },
    { title: "Creative", text: "Whether your ads stop the scroll and say something specific." },
    { title: "Audience", text: "Who you are reaching and whether they match who buys." },
    { title: "Offer", text: "Whether the offer gives people a clear reason to act now." },
    { title: "Landing page", text: "Where the click goes and whether it converts." },
    { title: "Tracking and conversion flow", text: "Pixel and events, form and WhatsApp flow, and lead follow-up." },
  ],
  steps: [
    { title: "Share your details", text: "Tell us about your business and what your ads currently do." },
    { title: "We review the funnel", text: "We look at the areas above, from ad to follow-up." },
    { title: "We walk you through it", text: "We show what is working, what is not and what to change first." },
  ],
  faqs: [
    { q: "Is it free?", a: "Yes. The audit is free and there is no obligation." },
    { q: "Do I need to give access to my ad account?", a: "Not at the start. A short conversation and screenshots are enough for a first review. We will tell you if more is needed." },
    { q: "Can you guarantee more sales?", a: "No one honestly can. We show you what is limiting results and what to fix." },
    { q: "I have not run ads yet. Can I apply?", a: "Yes. We will review your plan, offer and landing page before you spend." },
  ],
};

export default function Page() {
  return <AuditLanding c={config} />;
}
