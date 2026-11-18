import AuditLanding, { type AuditConfig } from "@/components/audit/AuditLanding";

const config: AuditConfig = {
  productName: "Free Website Audit",
  badge: "Free Website Conversion Audit",
  h1: "Is your website losing you customers?",
  sub: "Get a free audit of your website and find out what is stopping visitors from calling, messaging or enquiring, and what to fix first.",
  cta: "Get My Free Audit",
  challengeLabel: "What is your biggest website problem?",
  challengePlaceholder: "e.g. We get visitors but very few enquiries",
  waText: "Hi Stitchbyte, I want a free website audit.",
  benefits: [
    "A review of your website from a visitor's point of view",
    "Clear list of what is hurting enquiries, in priority order",
    "No obligation to hire us",
  ],
  audience: [
    "Business owners whose website gets visits but few enquiries",
    "Clinics, real estate, e-commerce, restaurants and local businesses",
    "Businesses running ads or SEO that send traffic to the website",
    "Anyone planning a redesign who wants to know what to change",
  ],
  covers: [
    { title: "First impression", text: "Does the page say what you do, who it is for and what to do next, within a few seconds?" },
    { title: "Calls to action", text: "Are enquiry, call and WhatsApp buttons easy to find, especially on mobile?" },
    { title: "Forms and contact flow", text: "Do your forms work, ask the right questions and reach you quickly?" },
    { title: "Trust and proof", text: "Reviews, case studies, business details and policies that make a stranger comfortable." },
    { title: "Speed and mobile experience", text: "How fast the site loads and how it behaves on a phone." },
    { title: "Tracking", text: "Whether you can see where enquiries come from." },
  ],
  steps: [
    { title: "Send your details", text: "Fill the short form with your website and your biggest problem." },
    { title: "We review your site", text: "Our team looks at your website and the areas listed above." },
    { title: "We share what we found", text: "We walk you through the findings and what to fix first." },
  ],
  faqs: [
    { q: "Is the audit really free?", a: "Yes. There is no charge and no obligation to work with us." },
    { q: "What do I need to share?", a: "Your website address and a short note on what is not working. That is enough to start." },
    { q: "I do not have a website yet. Can I still apply?", a: "Yes. Tell us about your business and we will advise on what you need." },
    { q: "Will you try to sell me something?", a: "We will tell you honestly what we found. If you want our help fixing it, we will explain how and what it costs. The choice is yours." },
  ],
};

export default function Page() {
  return <AuditLanding c={config} />;
}
