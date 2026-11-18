import type { Metadata } from "next";
import SeoLanding from "@/components/seo/SeoLanding";

const path = "/whatsapp-automation-agency-india";

export const metadata: Metadata = {
  title: "WhatsApp Automation for Indian Businesses",
  description:
    "What WhatsApp automation can and cannot do, practical use cases such as instant lead replies and follow-ups, and how Stitchbyte builds WhatsApp and CRM workflows.",
  alternates: { canonical: `https://stitchbyte.in${path}` },
  openGraph: { title: "WhatsApp Automation for Indian Businesses | Stitchbyte", url: `https://stitchbyte.in${path}`, type: "article" },
};

export default function Page() {
  return (
    <SeoLanding
      path={path}
      breadcrumb="WhatsApp Automation in India"
      eyebrow="WhatsApp automation for Indian businesses"
      h1="WhatsApp automation that replies to every lead, fast"
      intro="Most Indian customers would rather message than fill a form. If your team answers WhatsApp by hand, slow replies and missed messages quietly cost you customers. Here is what automation can do, and where it needs a person."
      cta={{ label: "Get My Free Automation Audit", href: "/free-automation-audit" }}
      waText="Hi Stitchbyte, I want to automate WhatsApp for my business."
      sections={[
        {
          h2: "What WhatsApp automation can do",
          bullets: [
            "Send an instant reply when a new lead arrives from an ad, form or website.",
            "Ask a few qualifying questions, such as what they need, budget and timeline.",
            "Pass qualified leads to the right person on your team with the details attached.",
            "Send reminders and follow-ups so no lead is forgotten.",
            "Confirm bookings and appointments and send reminders before them.",
            "Answer common questions around the clock and hand over to a person when needed.",
            "Keep every conversation linked to a record in your CRM.",
          ],
        },
        {
          h2: "What it should not do",
          paragraphs: [
            "Automation is good at fast, repeatable replies. It is not good at sensitive conversations, negotiation or anything that needs judgement. The best setups answer instantly, collect the right information and then hand the lead to a person.",
            "Messaging businesses on the WhatsApp Business Platform also comes with rules: customers must opt in, and messages sent outside the 24-hour window need approved templates. We build within these rules so your number stays safe.",
          ],
        },
        {
          h2: "How we build it",
          bullets: [
            "Map how leads arrive and what your team does with them today.",
            "Decide what to automate first, usually first response and follow-up.",
            "Build the flows and connect them to your forms, ads, CRM and calendar.",
            "Test with real scenarios, then launch and refine from the conversations.",
          ],
          paragraphs: ["Our automation work sits next to our website and ads work, so the lead capture, the reply and the tracking are designed together."],
        },
        {
          h2: "Who it suits",
          bullets: [
            "Businesses that get enquiries from Meta ads, Instagram or websites and reply manually.",
            "Clinics, real estate teams, coaching centres, e-commerce and service businesses.",
            "Teams that keep leads in spreadsheets or chats and lose track of follow-ups.",
          ],
        },
      ]}
      faqs={[
        { q: "Do I need the WhatsApp Business API?", a: "For automated flows at scale, usually yes. We will tell you what your use case needs after a short conversation, and whether the simpler WhatsApp Business app is enough." },
        { q: "Will automation replace my team?", a: "No. It handles the first reply and repetitive follow-ups so your team spends time on real conversations." },
        { q: "Can it connect to my CRM?", a: "Yes. We connect WhatsApp conversations to your CRM or a simple lead sheet so every lead and its status are tracked." },
        { q: "How do I find out what to automate first?", a: "Start with our free automation audit. We look at how you handle leads today and recommend what to automate first." },
      ]}
      related={[
        { label: "Free automation audit", href: "/free-automation-audit" },
        { label: "Automation solutions", href: "/automation" },
        { label: "Free Meta Ads audit", href: "/meta-ads-audit" },
        { label: "Case studies", href: "/work" },
      ]}
    />
  );
}
