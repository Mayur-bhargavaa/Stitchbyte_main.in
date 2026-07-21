import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load env variables from .env file
dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.BLOG_DATABASE_URL || process.env.DATABASE_URL
    }
  }
});

const CLUSTERS = {
  SEO: [
    "What is SEO", "Local SEO", "Technical SEO", "Ecommerce SEO", "Shopify SEO",
    "WordPress SEO", "SEO Cost India", "SEO Trends 2026", "SEO Checklist", "Core Web Vitals",
    "How Search Engines Work", "Keyword Research Strategy", "On-Page SEO Best Practices",
    "Off-Page Link Building", "Voice Search Optimization", "Mobile SEO Optimization",
    "International SEO Targeting", "Semantic Search & Entities", "Sitemap Indexation Guide",
    "Fixing Crawl Error Loops", "Google Algorithm Updates", "Featured Snippets Optimization",
    "Structured Data Schema markup", "Internal Linking Strategy", "Competitor Keyword Audits",
    "Negative SEO Protection", "SEO for Multi-location Brands", "Video Search Engine Optimization",
    "App Store Optimization (ASO)", "Core Web Vitals LCP Optimization"
  ],
  WEB_DEV: [
    "React Development", "NextJS Development", "MERN Stack", "Laravel", "NodeJS",
    "API Development", "Website Speed", "Website Security", "Headless CMS",
    "TypeScript Core Patterns", "Tailwind CSS Styling", "State Management Zustand",
    "REST vs GraphQL API design", "Database Connection Pooling", "Docker Containers setup",
    "Microservice Architectures", "Serverless Functions NextJS", "Prisma ORM with MongoDB",
    "Caching Strategies with Redis", "Continuous Integration (CI/CD) pipelines",
    "Secure JWT Authentication", "OAuth 2.0 Integration", "WebSockets Real-time Communication",
    "Web Accessibility WCAG guidelines", "Framer Motion Animations", "NextJS App Router layouts",
    "Debugging Memory Leaks React", "NodeJS Event Loop Performance", "Progressive Web Apps (PWA)",
    "Server-Side Rendering Optimization"
  ],
  MARKETING: [
    "Meta Ads", "Google Ads", "Email Marketing", "Conversion Rate", "Landing Pages",
    "Branding", "Lead Generation", "Retargeting Campaigns", "Google Analytics 4 setup",
    "Customer Acquisition Cost (CAC)", "Lifetime Value (LTV) Optimization", "Copywriting for Conversions",
    "High-converting Lead Magnets", "B2B SaaS Lead Funnels", "Influencer Marketing Strategy",
    "Video Ad Creatives meta", "Conversion Rate Optimization (CRO)", "A/B Testing Landing Pages",
    "Customer Journey Mapping", "Brand Style Guide checklist", "Social Media Calendars Buffer",
    "Cold Email Outreach scale", "PPC Keyword Bidding strategies", "Performance Max Google Ads",
    "Conversions API Meta Setup", "Interactive Form conversion boost", "Marketing Attribution models",
    "Content Marketing Distribution", "Affiliate Program setup", "Omnichannel Growth Strategies"
  ]
};

interface RawBlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  status: string;
}

function generate310Blogs(): RawBlogInput[] {
  const blogs: RawBlogInput[] = [];

  // Generate 105 blogs for SEO
  for (let i = 0; i < 105; i++) {
    const topic = CLUSTERS.SEO[i % CLUSTERS.SEO.length];
    const modifier = i >= CLUSTERS.SEO.length ? ` - Advanced Guide Part ${Math.floor(i / CLUSTERS.SEO.length) + 1}` : "";
    const title = `${topic}${modifier} for High-Growth Brands`;
    const slug = `${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`;
    const category = "SEO";
    const tags = ["SEO", topic.replace(/\s+/g, ""), "SearchOptimization", "DigitalGrowth"];
    const readTime = `${4 + (i % 5)} min read`;

    const intro = `In this article, we cover the core technical methodologies relating to ${topic}. Optimizing your digital infrastructure for search engines requires continuous focus, clean code layouts, and strategic keyword mapping.`;
    const body = `Search engines like Google are continuously evolving to prioritize user experience, mobile-first design, and high topical authority. To succeed in the modern search landscape, brands must address core metrics such as Core Web Vitals (including LCP, INP, and CLS scores), semantic link structures, and structured JSON-LD schemas. Furthermore, establishing a solid internal linking structure helps crawler bots discover and index deep content directories without getting stuck in redirection loops.`;
    const checkList = `Our Recommended Action Checklist:\n1. Run a comprehensive crawl audit using technical tools like Screaming Frog.\n2. Fix indexation issues, duplicate title tags, and missing alt properties.\n3. Implement proper LocalBusiness or Service schemas.\n4. Secure high-quality contextual backlinks from authoritative domains.`;
    const conclusion = `To summarize, mastering ${topic} is a long-term strategy that drives organic business growth and improves client conversion quality. StitchByte helps brands scale their search footprint through clean engineering and targeted campaigns.`;

    blogs.push({
      title,
      slug,
      excerpt: `An in-depth look at ${topic} and how to optimize your organic search footprint for the 2026 digital landscape.`,
      content: `${intro}\n\n${body}\n\n${checkList}\n\n${conclusion}`,
      category,
      tags,
      readTime,
      status: "published"
    });
  }

  // Generate 105 blogs for Web Development
  for (let i = 0; i < 105; i++) {
    const topic = CLUSTERS.WEB_DEV[i % CLUSTERS.WEB_DEV.length];
    const modifier = i >= CLUSTERS.WEB_DEV.length ? ` - Engineering Architecture Part ${Math.floor(i / CLUSTERS.WEB_DEV.length) + 1}` : "";
    const title = `Mastering ${topic}${modifier} for Scalable Platforms`;
    const slug = `${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 150}`;
    const category = "Web Development";
    const tags = ["WebDev", topic.replace(/\s+/g, ""), "SoftwareEngineering", "NextJS"];
    const readTime = `${5 + (i % 4)} min read`;

    const intro = `Deploying modern applications requires a robust understanding of ${topic}. Writing modular components, optimizing server requests, and establishing strict security headers is critical for enterprise software projects.`;
    const body = `Using frameworks like Next.js, React, and Node.js allows teams to build highly interactive, server-side rendered interfaces. However, developers must avoid performance traps such as excessive bundle sizes, unoptimized database queries, and missing connection pools. Securing API controllers using JSON Web Tokens (JWT) and configuring Helmet protection ensures your database remains safe from common cross-site scripts and SQL injections.`;
    const checkList = `Engineering Checklist:\n1. Audit code splitting and dynamic routing to reduce main bundle weight.\n2. Leverage Prisma ORM connection pools to prevent database query blocks.\n3. Configure strict CORS and Content Security Policy (CSP) headers.\n4. Host applications inside lightweight Docker containers behind global CDNs.`;
    const conclusion = `By prioritizing type-safety and performance metrics during the engineering lifecycle of ${topic}, brands build highly resilient digital foundations. StitchByte develops high-end software solutions customized to your business goals.`;

    blogs.push({
      title,
      slug,
      excerpt: `Learn the best engineering practices for deploying and scaling ${topic} across modern cloud architectures.`,
      content: `${intro}\n\n${body}\n\n${checkList}\n\n${conclusion}`,
      category,
      tags,
      readTime,
      status: "published"
    });
  }

  // Generate 105 blogs for Marketing
  for (let i = 0; i < 105; i++) {
    const topic = CLUSTERS.MARKETING[i % CLUSTERS.MARKETING.length];
    const modifier = i >= CLUSTERS.MARKETING.length ? ` - Performance Strategies Part ${Math.floor(i / CLUSTERS.MARKETING.length) + 1}` : "";
    const title = `Advanced ${topic}${modifier} for Lowering CAC`;
    const slug = `${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 300}`;
    const category = "Marketing";
    const tags = ["DigitalMarketing", topic.replace(/\s+/g, ""), "ConversionOptimization", "PaidAds"];
    const readTime = `${4 + (i % 4)} min read`;

    const intro = `Scaling qualified client acquisition pipelines depends on highly targeted ${topic} execution. Traditional spray-and-pray ads result in high spend but zero conversion value.`;
    const body = `To drive sales efficiently, brands must configure solid conversion tracking grids (such as Meta Conversions API and Google Tag Manager variables). Optimizing landing page copy and implementing visual hierarchy rules (using atomic Figma systems) increases form completion rates. Running A/B tests on creative hooks, ad formats, and bid allocations allows marketing managers to identify winning parameters and scale budgets profitably.`;
    const checkList = `Growth Marketing Checklist:\n1. Verify server-side pixel tracking integrations to prevent data loss.\n2. Write high-intent ad copies addressing customer pain points directly.\n3. Design landing pages built for mobile loading speeds.\n4. Allocate budget dynamically toward top-performing demographic profiles.`;
    const conclusion = `Successfully deploying ${topic} reduces acquisition friction and maximizes client lifetime value. StitchByte manages growth campaigns designed to deliver transparent, positive ROI metrics.`;

    blogs.push({
      title,
      slug,
      excerpt: `Discover the strategic framework to deploy, optimize, and scale ${topic} campaigns to maximize revenue growth.`,
      content: `${intro}\n\n${body}\n\n${checkList}\n\n${conclusion}`,
      category,
      tags,
      readTime,
      status: "published"
    });
  }

  return blogs;
}

async function main() {
  console.log('Seeding 315 blogs for topical authority...');

  const blogs = generate310Blogs();

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
  }

  console.log(`Successfully seeded ${blogs.length} blogs.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
