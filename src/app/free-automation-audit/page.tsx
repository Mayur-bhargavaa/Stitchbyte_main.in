import AuditLanding, { type AuditConfig } from "@/components/audit/AuditLanding";

const config: AuditConfig = {
  productName: "Free Automation Audit",
  badge: "Free Business Automation Audit",
  h1: "Still following up with every lead by hand?",
  sub: "Tell us how your team handles leads, WhatsApp messages and routine work. We will show you what can be automated and what to automate first.",
  cta: "Get My Free Automation Audit",
  challengeLabel: "What takes up most of your team's time?",
  challengePlaceholder: "e.g. Replying to WhatsApp enquiries and following up leads",
  waText: "Hi Stitchbyte, I want a free business automation audit.",
  benefits: [
    "Find repetitive tasks that can be handled automatically",
    "See where leads are slipping through slow follow-up",
    "A practical order of what to automate first",
  ],
  audience: [
    "Businesses that get leads on WhatsApp, calls or forms and reply manually",
    "Teams tracking leads and customers in spreadsheets or chats",
    "Owners who spend hours on repeated messages, reminders and reports",
    "Businesses with support questions that keep repeating",
  ],
  covers: [
    { title: "Repetitive tasks", text: "Work your team does again and again that software can do." },
    { title: "WhatsApp bottlenecks", text: "Slow replies, missed messages and manual broadcast work." },
    { title: "Lead follow-up", text: "How quickly and consistently new leads get a response." },
    { title: "CRM and tracking", text: "Where lead and customer data lives and how it is kept up to date." },
    { title: "Manual workflows", text: "Approvals, reminders, reports and hand-offs between people." },
    { title: "Customer support", text: "Common questions that an AI assistant could answer." },
  ],
  steps: [
    { title: "Tell us how you work", text: "Share your business and the tasks that eat your time." },
    { title: "We map your workflow", text: "We look for what can be automated with WhatsApp, CRM and AI tools." },
    { title: "We share a plan", text: "You get what to automate first and what it would involve." },
  ],
  faqs: [
    { q: "Is the audit free?", a: "Yes. No charge and no obligation." },
    { q: "Do I need a CRM already?", a: "No. We can work from how you handle leads today, even if that is WhatsApp and a spreadsheet." },
    { q: "Will automation replace my team?", a: "No. It removes repetitive work so your team can spend time on conversations and decisions." },
    { q: "What tools do you use?", a: "That depends on your business. We recommend what fits after we understand your workflow." },
  ],
};

export default function Page() {
  return <AuditLanding c={config} />;
}
