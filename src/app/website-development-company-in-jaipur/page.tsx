import type { Metadata } from "next";
import SeoLanding from "@/components/seo/SeoLanding";

const path = "/website-development-company-in-jaipur";

export const metadata: Metadata = {
  title: "Website Development Company for Jaipur Businesses",
  description:
    "How to choose a website development company in Jaipur, what a business website needs to bring in enquiries, and how Stitchbyte builds Next.js, Shopify and WordPress sites.",
  alternates: { canonical: `https://stitchbyte.in${path}` },
  openGraph: { title: "Website Development Company for Jaipur Businesses | Stitchbyte", url: `https://stitchbyte.in${path}`, type: "article" },
};

export default function Page() {
  return (
    <SeoLanding
      path={path}
      breadcrumb="Website Development in Jaipur"
      eyebrow="Website development for Jaipur businesses"
      h1="Website development company for Jaipur businesses that want more enquiries"
      intro="A good business website does one job: it turns a visitor into a call, a WhatsApp message or an enquiry. Here is how to choose a web developer in Jaipur, what to ask before you hire, and how we build websites at Stitchbyte, based in Alwar, Rajasthan."
      cta={{ label: "Get My Free Website Audit", href: "/free-website-audit" }}
      waText="Hi Stitchbyte, I am looking for website development for my business in Jaipur."
      sections={[
        {
          h2: "What a business website actually needs",
          paragraphs: [
            "Most small business websites look fine and still bring in almost nothing. The usual reason is not design. It is that the page does not say clearly what the business does, who it is for and what to do next.",
          ],
          bullets: [
            "A headline that says what you do and for whom, in plain words.",
            "One clear action above the fold: call, WhatsApp or request a quote.",
            "Proof a stranger can check: real projects, reviews and business details.",
            "A site that loads quickly and works properly on a phone, since most visitors will arrive on one.",
            "A form and WhatsApp button that actually reach you, and a way to see where enquiries come from.",
          ],
        },
        {
          h2: "Questions to ask any website company in Jaipur",
          bullets: [
            "Can you show me live websites you built, and can I speak to the owner?",
            "Who owns the code, the domain and the hosting account after launch?",
            "What exactly is included: pages, revisions, SEO basics, tracking, support?",
            "How will I see how many enquiries the site brings in?",
            "What happens if something breaks after launch, and who fixes it?",
          ],
          paragraphs: [
            "A company that answers these clearly and in writing is usually easier to work with than one that talks mostly about technology.",
          ],
        },
        {
          h2: "Custom website, Shopify or WordPress?",
          paragraphs: [
            "The right choice depends on what you sell and how much you need to change the site yourself.",
          ],
          bullets: [
            "Shopify suits businesses selling products online who want payments, inventory and shipping handled in one place.",
            "WordPress suits content-heavy sites and teams who want to edit pages and publish regularly without a developer.",
            "A custom build (we use Next.js) suits businesses that need speed, unusual features or a tailored customer journey.",
            "Prebuilt software suits businesses that want a working product, such as a store, school or clinic system, faster than a from-scratch build.",
          ],
        },
        {
          h2: "How we build at Stitchbyte",
          paragraphs: [
            "We work in four stages. Discovery and audit: we look at your business, your customers and any existing site. Architecture and design: we plan the pages and the path from visitor to enquiry. Technical development: we build and test on mobile and desktop. Launch and scale: we launch, set up tracking and improve based on what the data shows.",
            "Stitchbyte is based in Alwar, Rajasthan.",
          ],
        },
        {
          h2: "What affects the cost of a website",
          paragraphs: [
            "Price depends mainly on the number of pages, whether you need online payments or logins, custom features, content and design work, and integrations such as WhatsApp or a CRM. Ask every company for a written scope so you can compare like with like. Our guide on website costs in India explains the typical ranges.",
          ],
        },
      ]}
      faqs={[
        { q: "Do you work with businesses in Jaipur?", a: "Stitchbyte operates from Alwar, Rajasthan. If you are in Jaipur, contact us by call, WhatsApp or the audit form and we will explain how we would work together." },
        { q: "How long does a business website take?", a: "It depends on the scope. A simple business site is much faster than a store or custom platform. We confirm the timeline in writing after we understand what you need." },
        { q: "Will I own my website?", a: "Ownership should be agreed before work starts. Ask any developer, including us, to confirm in the proposal who owns the code, domain and hosting." },
        { q: "Can you improve my existing website instead of rebuilding it?", a: "Often, yes. Our free website audit shows what is stopping visitors from enquiring, and whether fixing the current site is enough." },
      ]}
      related={[
        { label: "Free website audit", href: "/free-website-audit" },
        { label: "Prebuilt software", href: "/prebuilt" },
        { label: "Custom software", href: "/customized" },
        { label: "Case studies", href: "/work" },
        { label: "How much does a website cost in India?", href: "/blog/howmuchdoesawebsitecostinindiain2026" },
        { label: "How to choose a web development company", href: "/blog/howtochoosetherightwebdevelopmentcompanyforyourbusiness" },
      ]}
    />
  );
}
