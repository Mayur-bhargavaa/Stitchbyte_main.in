import Script from "next/script";

// FAQ data matching the homepage FAQ section
const faqData = [
  {
    question: "How long does it take to deliver a pre-built application or website?",
    answer:
      "Our pre-built solutions are typically ready for deployment within 24-48 hours. For custom integrations, the timeline extends to 1-2 weeks depending on complexity.",
  },
  {
    question: "Do you provide the complete source code after development?",
    answer:
      "Yes, absolutely! You receive full ownership of the source code, including all assets, documentation, and deployment scripts.",
  },
  {
    question: "What's the difference between a pre-built and a custom development project?",
    answer:
      "Pre-built projects use our existing templates and can be quickly customized. Custom development is built from scratch according to your unique specifications.",
  },
  {
    question: "Do you provide maintenance and support after delivery?",
    answer:
      "Yes, we offer various support packages including bug fixes, feature updates, and 24/7 technical support options.",
  },
  {
    question: "What technologies do you use for development?",
    answer:
      "We use modern technologies including Next.js, React, TypeScript, Tailwind CSS, and various databases like PostgreSQL and MongoDB.",
  },
];

export default function HomepageFAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}
