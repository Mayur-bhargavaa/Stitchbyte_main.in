import type { Metadata } from "next";
import SeoLanding from "@/components/seo/SeoLanding";

const path = "/meta-ads-agency-jaipur";

export const metadata: Metadata = {
  title: "Meta Ads Agency for Jaipur Businesses",
  description:
    "Why Meta (Facebook and Instagram) ads get clicks but no customers, what to check in your funnel, and how Stitchbyte sets up campaigns, landing pages and tracking.",
  alternates: { canonical: `https://stitchbyte.in${path}` },
  openGraph: { title: "Meta Ads Agency for Jaipur Businesses | Stitchbyte", url: `https://stitchbyte.in${path}`, type: "article" },
};

export default function Page() {
  return (
    <SeoLanding
      path={path}
      breadcrumb="Meta Ads Agency in Jaipur"
      eyebrow="Meta Ads for Jaipur businesses"
      h1="Meta Ads for Jaipur businesses: fix the funnel, then scale the spend"
      intro="If your Facebook and Instagram ads get clicks and messages but few customers, the problem is rarely just the ad. It is usually somewhere along the path from the ad to the sale. Here is how we look at it."
      cta={{ label: "Get My Free Meta Ads Audit", href: "/meta-ads-audit" }}
      waText="Hi Stitchbyte, I want help with my Meta ads."
      sections={[
        {
          h2: "Why Meta Ads get clicks but no customers",
          paragraphs: [
            "Meta can deliver attention cheaply. Turning that attention into customers depends on everything after the click.",
          ],
          bullets: [
            "The offer is vague, so there is no clear reason to act now.",
            "The ad speaks to everyone, so it attracts people who will never buy.",
            "The landing page is slow, confusing or is just your homepage.",
            "Leads arrive and nobody replies within minutes, so they go cold.",
            "Tracking is missing or wrong, so Meta optimises for the wrong people.",
            "Your team judges ads by cost per lead instead of cost per customer.",
          ],
        },
        {
          h2: "What we look at in a Meta Ads review",
          bullets: [
            "Campaign structure: objectives, budgets and ad set setup.",
            "Creative: whether the ad stops the scroll and says something specific.",
            "Audience: who you are reaching and whether they match who buys.",
            "Offer and landing page: the promise, the proof and the next step.",
            "Tracking: Pixel, conversion events and the server-side Conversions API.",
            "Follow-up: how fast and how consistently new leads get a reply.",
          ],
        },
        {
          h2: "How we run Meta campaigns",
          paragraphs: [
            "We start with one specific problem and one specific offer, not a generic brand ad. Each campaign sends traffic to its own landing page with a short form and a WhatsApp option. We set up tracking so that form submissions, WhatsApp clicks and later sales feed back to Meta, and we report on cost per qualified lead and cost per customer, not only cost per lead.",
            "We do not promise sales or revenue. Results depend on your offer, your market, your price and how quickly you follow up. We show you what the data says and what to change.",
          ],
        },
        {
          h2: "Who this suits",
          bullets: [
            "Clinics and healthcare practices that want more patient enquiries.",
            "Real estate teams that need to capture and follow up property leads.",
            "Restaurants and local businesses that want to turn Instagram attention into visits and orders.",
            "E-commerce brands that want better return on ad spend.",
          ],
          paragraphs: ["Stitchbyte is based in Alwar, Rajasthan."],
        },
      ]}
      faqs={[
        { q: "How much should I spend on Meta Ads?", a: "It depends on your price, margin and how many leads you can handle. We would rather fix the funnel first, then raise the budget once the numbers support it." },
        { q: "Can you guarantee leads or sales?", a: "No honest agency can. We can show you what is limiting results and what to change, and measure everything so decisions are based on data." },
        { q: "Do I need a website or landing page?", a: "Yes. Ads that send people to a weak page waste money. We build or fix the landing page as part of the setup." },
        { q: "What does the free Meta Ads audit include?", a: "A review of your campaign structure, creative, audience, offer, landing page and tracking, with what to fix first. There is no obligation." },
      ]}
      related={[
        { label: "Free Meta Ads audit", href: "/meta-ads-audit" },
        { label: "Marketing services", href: "/marketing" },
        { label: "Case studies", href: "/work" },
        { label: "Free website audit", href: "/free-website-audit" },
        { label: "Free automation audit", href: "/free-automation-audit" },
      ]}
    />
  );
}
