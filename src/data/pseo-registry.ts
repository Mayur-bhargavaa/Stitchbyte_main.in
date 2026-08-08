export interface CityData {
  id: string;
  name: string;
  state: string;
  country: string;
  industries: string[];
  landmark: string;
  challenge: string;
  lat: number;
  lng: number;
}

export interface ServiceData {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  benefits: string[];
  tools: string[];
  steps: { title: string; desc: string }[];
}

export const CITIES: CityData[] = [
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", country: "India", industries: ["Tourism & Hospitality", "Handicrafts & Exports", "Gemstones & Jewelry", "B2B Startups"], landmark: "C-Scheme", challenge: "transitioning from traditional offline wholesale to modern online direct-to-consumer models", lat: 26.8530, lng: 75.8047 },
  { id: "alwar", name: "Alwar", state: "Rajasthan", country: "India", industries: ["Manufacturing & Engineering", "Mineral processing", "Agrotech", "Retail businesses"], landmark: "MIA Area", challenge: "establishing a modern digital presence outside of traditional local trade circles", lat: 27.5530, lng: 76.6346 },
  { id: "delhi", name: "Delhi", state: "Delhi", country: "India", industries: ["Corporate Services", "E-commerce Hubs", "Wholesale Trade", "Media Agencies"], landmark: "Connaught Place", challenge: "standing out in a highly saturated regional search market with massive competitors", lat: 28.6139, lng: 77.2090 },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", country: "India", industries: ["IT Services", "Software Development", "Mobile Manufacturing", "BPO Units"], landmark: "Sector 62", challenge: "attracting high-quality engineering talent and ranking for competitive global keywords", lat: 28.5355, lng: 77.3910 },
  { id: "gurgaon", name: "Gurgaon", state: "Haryana", country: "India", industries: ["Fortune 500 Corporates", "Fintech", "Real Estate", "SaaS Enterprises"], landmark: "Cyber City", challenge: "generating inbound qualified leads cost-effectively amid skyrocketing ad bidding costs", lat: 28.4595, lng: 77.0266 },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", country: "India", industries: ["Investment Banking", "Entertainment & Bollywood", "Corporate Headquarters", "Direct-to-Consumer Brands"], landmark: "Bandra Kurla Complex (BKC)", challenge: "scaling digital advertising campaigns with positive ROI in a premium consumer demographic", lat: 19.0760, lng: 72.8777 },
  { id: "pune", name: "Pune", state: "Maharashtra", country: "India", industries: ["Automotive Engineering", "IT Hubs", "EduTech Startups", "Manufacturing"], landmark: "Hinjawadi IT Park", challenge: "modernizing legacy business operations and automating customer acquisition workflows", lat: 18.5204, lng: 73.8567 },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", country: "India", industries: ["High-growth SaaS", "Venture Capital", "AI Research", "Consumer Tech"], landmark: "Indiranagar", challenge: "optimizing codebases for maximum performance and scaling infrastructure for rapid growth", lat: 12.9716, lng: 77.5946 },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", country: "India", industries: ["Biotech & Pharma", "Enterprise IT", "SaaS Startups", "Real Estate"], landmark: "HITEC City", challenge: "building enterprise-grade secure applications and running global SEO outreach", lat: 17.3850, lng: 78.4867 },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", country: "India", industries: ["SaaS & CRM", "Automobile Manufacturing", "Hardware Tech", "Healthcare Networks"], landmark: "OMR IT Corridor", challenge: "localizing digital content and scaling international lead acquisition funnels", lat: 13.0827, lng: 80.2707 },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", country: "India", industries: ["Jute & Tea Exports", "Creative Agencies", "Retail & FMCG", "Consultancy Services"], landmark: "Salt Lake Sector V", challenge: "overcoming slow digital adoption and shifting customer acquisition from offline to online", lat: 22.5726, lng: 88.3639 },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", country: "India", industries: ["Textile Manufacturers", "Chemical Industries", "Fintech Hubs", "Pharma Plants"], landmark: "GIFT City", challenge: "optimizing online supply chains and driving cost-efficient localized Google Ads traffic", lat: 23.0225, lng: 72.5714 },
  { id: "surat", name: "Surat", state: "Gujarat", country: "India", industries: ["Diamond Polishing", "Textile Wholesale", "Jewelry E-commerce", "Logistics Hubs"], landmark: "Varachha Road", challenge: "setting up secure, scalable Shopify storefronts to capture international retail markets", lat: 21.1702, lng: 72.8311 },
  { id: "vadodara", name: "Vadodara", state: "Gujarat", country: "India", industries: ["Chemical processing", "Heavy Engineering", "Educational Institutions", "IT Outsourcing"], landmark: "Alkapuri", challenge: "modernizing corporate communications and building intuitive web portals", lat: 22.3072, lng: 73.1812 },
  { id: "indore", name: "Indore", state: "Madhya Pradesh", country: "India", industries: ["Food & FMCG", "IT Consulting", "Pharmaceuticals", "D2C Startups"], landmark: "Vijay Nagar", challenge: "optimizing local search engine visibility and building scalable MERN stack apps", lat: 22.7196, lng: 75.8577 },
  { id: "bhopal", name: "Bhopal", state: "Madhya Pradesh", country: "India", industries: ["Electrical Manufacturing", "Agribusiness", "Educational Portals", "GovTech Startup"], landmark: "MP Nagar", challenge: "improving web accessibility and building custom government-compliant software", lat: 23.2599, lng: 77.4126 },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", country: "India", industries: ["Logistics & Warehousing", "Orange Exports", "IT Park Units", "Retail Trade"], landmark: "MIHAN SEZ", challenge: "establishing regional brand authority and streamlining database inventory portals", lat: 21.1458, lng: 79.0882 },
  { id: "nashik", name: "Nashik", state: "Maharashtra", country: "India", industries: ["Wineries & Agro-tourism", "Automobile Parts", "Retail Chains", "Power Generation"], landmark: "College Road", challenge: "transitioning boutique local brands to high-performance e-commerce setups", lat: 19.9975, lng: 73.7898 },
  { id: "rajkot", name: "Rajkot", state: "Gujarat", country: "India", industries: ["Engine Parts", "Gold Jewelry Manufacture", "Machine Tools", "Agri-implements"], landmark: "Yagnik Road", challenge: "building trustworthy international B2B websites that showcase precise technical specs", lat: 22.3039, lng: 70.8022 },
  { id: "chandigarh", name: "Chandigarh", state: "Punjab & Haryana", country: "India", industries: ["Professional Services", "Boutique Agencies", "IT Outsourcing", "Real Estate Consulting"], landmark: "Sector 17", challenge: "optimizing local ad campaigns and building modern WordPress/Shopify websites", lat: 30.7333, lng: 76.7794 },
  { id: "ludhiana", name: "Ludhiana", state: "Punjab", country: "India", industries: ["Hosiery & Textiles", "Bicycle Manufacture", "Steel Rolling", "Agriculture Trade"], landmark: "Ferozepur Road", challenge: "deploying modern ERP integrations and targeting wholesale clients globally through SEO", lat: 30.9010, lng: 75.8573 },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", country: "India", industries: ["Chikan Embroidery Craft", "Handloom Retail", "Food & Tourism", "E-governance"], landmark: "Hazratganj", challenge: "promoting cultural crafts to national buyers through customized digital marketing", lat: 26.8467, lng: 80.9462 },
  { id: "kanpur", name: "Kanpur", state: "Uttar Pradesh", country: "India", industries: ["Leather Tanneries", "Saddlery Exports", "Chemical Plants", "D2C Brands"], landmark: "Civil Lines", challenge: "improving B2B lead generation pipelines and resolving legacy database connection blocks", lat: 26.4499, lng: 80.3319 },
  { id: "amritsar", name: "Amritsar", state: "Punjab", country: "India", industries: ["Tourism & Hospitality", "Food Processing", "Textile Trade", "Local Crafts"], landmark: "Ranjit Avenue", challenge: "driving organic search traffic to hotels and local booking platforms through SEO", lat: 31.6340, lng: 74.8723 },
  { id: "dehradun", name: "Dehradun", state: "text", country: "India", industries: ["Real Estate", "Higher Education", "Eco-tourism", "IT Outsourcing"], landmark: "Rajpur Road", challenge: "driving qualified digital admissions and local tourism inquiry submissions", lat: 30.3165, lng: 78.0322 },
  { id: "faridabad", name: "Faridabad", state: "Haryana", country: "India", industries: ["Tractors & Engineering", "Textile Prints", "Power Grid Units", "Retail Hubs"], landmark: "Sector 15", challenge: "digitizing traditional manufacturing supply networks with custom web tools", lat: 28.4089, lng: 77.3178 },
  { id: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", country: "India", industries: ["Steel Fabrication", "Heavy Machinery", "Real Estate Projects", "Logistics"], landmark: "Kavi Nagar", challenge: "generating high-quality homebuyer leads and building robust database portals", lat: 28.6692, lng: 77.4538 },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", country: "India", industries: ["Textile Machinery", "Wet Grinders", "Pumps & Motors", "Tech Startups"], landmark: "Gandhipuram", challenge: "scaling international industrial leads and upgrading legacy websites to Next.js", lat: 11.0168, lng: 76.9558 },
  { id: "kochi", name: "Kochi", state: "Kerala", country: "India", industries: ["Maritime Trade", "Spice Exports", "IT SEZ Units", "Tourism Networks"], landmark: "Infopark Kakkanad", challenge: "achieving high page performance scores for travel booking platforms and mobile apps", lat: 9.9312, lng: 76.2673 },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", country: "India", industries: ["Steel Manufacture", "Shipbuilding", "Pharma SEZ", "IT Operations"], landmark: "VIP Road", challenge: "improving online ranking positions for local exporters and port logistics companies", lat: 17.6868, lng: 83.1812 },
  { id: "madurai", name: "Madurai", state: "Tamil Nadu", country: "India", industries: ["Jasmine Cultivation", "Handloom Weaving", "Agro-processing", "Education"], landmark: "Anna Nagar", challenge: "bringing local agrarian and textile trade to direct consumer apps and websites", lat: 9.9252, lng: 78.1198 },
  { id: "trivandrum", name: "Trivandrum", state: "Kerala", country: "India", industries: ["Space Tech Research", "Software Exports", "Ayurvedic Resorts", "Animation Studios"], landmark: "Technopark", challenge: "optimizing SEO for wellness portals and scaling international healthcare leads", lat: 8.5241, lng: 76.9366 },
  { id: "mysore", name: "Mysore", state: "Karnataka", country: "India", industries: ["Sandalwood & Silk", "IT Development", "Food Tech Labs", "Heritage Tourism"], landmark: "Gokulam", challenge: "maintaining page speed metrics while serving heavy visual media to tourists online", lat: 12.2958, lng: 76.6394 },
  { id: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", country: "India", industries: ["Metal Processing", "IT Parks", "Startups Hub", "Handicrafts Trade"], landmark: "Patia IT Area", challenge: "scaling new tech startup visibility and running optimized lead campaigns", lat: 20.2961, lng: 85.8245 },
  { id: "guwahati", name: "Guwahati", state: "Assam", country: "India", industries: ["Tea Auctions", "Oil Refining", "Tourism Portals", "Handicraft Stores"], landmark: "G.S. Road", challenge: "reaching tea wholesalers nationally through targeted B2B SEO strategies", lat: 26.1445, lng: 91.7362 },
  { id: "patna", name: "Patna", state: "Bihar", country: "India", industries: ["Agriculture Trade", "Coaching Centers", "FMCG Distribution", "Retail Chains"], landmark: "Boring Road", challenge: "scaling local student enrollments through targeted local Google Ads and landing pages", lat: 25.5941, lng: 85.1376 },
  { id: "ranchi", name: "Ranchi", state: "Jharkhand", country: "India", industries: ["Mineral Mining", "Heavy Industries", "Agro-trade", "Educational Units"], landmark: "Lalpur", challenge: "building custom supply-chain tools and training portals with optimized web frontends", lat: 23.3441, lng: 85.3090 },
  { id: "raipur", name: "Raipur", state: "Chhattisgarh", country: "India", industries: ["Steel Rolling Mills", "Cement Manufacturers", "Agro-industries", "Retail Hubs"], landmark: "Shankar Nagar", challenge: "driving wholesale industrial leads and deploying responsive web inventories", lat: 21.2514, lng: 81.6296 },
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", country: "India", industries: ["Wooden Furniture Exports", "Handicrafts Shop", "Tourism Networks", "Solar Farms"], landmark: "Shastri Nagar", challenge: "reaching global handicraft and furniture buyers through solid international SEO", lat: 26.2389, lng: 73.0243 },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", country: "India", industries: ["Destination Weddings", "Marble Quarries", "Craft Workshops", "Heritage Hospitality"], landmark: "Panchwati", challenge: "competing against major booking aggregators for destination wedding terms", lat: 24.5854, lng: 73.7125 },
  { id: "dubai", name: "Dubai", state: "Dubai", country: "UAE", industries: ["Luxury Real Estate", "Global Logistics", "Fintech Innovations", "High-End Tourism"], landmark: "Downtown Dubai", challenge: "maintaining low client acquisition costs in one of the most competitive markets worldwide", lat: 25.2048, lng: 55.2708 },
  { id: "abu-dhabi", name: "Abu Dhabi", state: "Abu Dhabi", country: "UAE", industries: ["Sovereign Funds", "Energy Sector", "Cultural Tourism", "Infrastructure Systems"], landmark: "Al Reem Island", challenge: "conforming to strict regional privacy regulations and securing enterprise portals", lat: 24.4539, lng: 54.3773 },
  { id: "sharjah", name: "Sharjah", state: "Sharjah", country: "UAE", industries: ["Industrial Trade", "Publishing & Media", "Creative Arts", "Maritime Logistics"], landmark: "Al Majaz", challenge: "optimizing logistics portals and launching cost-effective GCC-wide campaigns", lat: 25.3463, lng: 55.4209 },
  { id: "singapore", name: "Singapore", state: "Singapore", country: "Singapore", industries: ["Global Finance Hub", "Web3 Tech", "Deep Tech AI", "Shipping Terminals"], landmark: "Marina Bay Sands Area", challenge: "building high-security API pipelines and ranking for hyper-competitive global terms", lat: 1.3521, lng: 103.8198 },
  { id: "london", name: "London", state: "England", country: "UK", industries: ["Fintech Core", "E-commerce Brands", "Creative Consultancies", "Tech Startups"], landmark: "Shoreditch Tech City", challenge: "achieving high load speeds and WCAG accessibility ratings for public web portals", lat: 51.5074, lng: -0.1278 },
  { id: "new-york", name: "New York", state: "New York", country: "USA", industries: ["Financial Portals", "Direct-to-Consumer SaaS", "Media Networks", "AdTech Agencies"], landmark: "Manhattan Flatiron District", challenge: "building highly optimized React codebases to support massive concurrent user traffic", lat: 40.7128, lng: -74.0060 },
  { id: "san-francisco", name: "San Francisco", state: "California", country: "USA", industries: ["Generative AI Tools", "Venture Scale SaaS", "Developer API Platforms", "Web3 Core"], landmark: "SOMA District", challenge: "creating state-of-the-art UI/UX flows that capture early adopter attention instantly", lat: 37.7749, lng: -122.4194 },
  { id: "chicago", name: "Chicago", state: "Illinois", country: "USA", industries: ["Trading Systems", "Industrial Logistics", "Healthcare Portals", "Enterprise Retail"], landmark: "The Loop District", challenge: "modernizing traditional B2B platforms and managing complex database synchronizations", lat: 41.8781, lng: -87.6298 },
  { id: "toronto", name: "Toronto", state: "Ontario", country: "Canada", industries: ["AI Innovations", "Financial Tech", "E-commerce Brands", "Digital Media Studios"], landmark: "Downtown Toronto Tech Hub", challenge: "scaling cross-border traffic models and complying with dual language and local privacy rules", lat: 43.6532, lng: -79.3832 },
  { id: "sydney", name: "Sydney", state: "New South Wales", country: "Australia", industries: ["Fintech start-ups", "B2B SaaS platforms", "Eco-tourism networks", "Real Estate tech"], landmark: "Surry Hills Tech District", challenge: "improving network request load latencies to capture users in remote regional areas", lat: -33.8688, lng: 151.2093 }
];

export const SERVICES: ServiceData[] = [
  {
    id: "seo-company",
    name: "SEO Company",
    tagline: "Dominate Search Results and Drive Qualified Customers",
    desc: "We engineer customized search engine optimization campaigns that drive organic search performance, capture buyer intent, and build long-term site authority.",
    benefits: [
      "Target high-intent keywords that translate directly into business transactions.",
      "Fix crawl blocks, slow page speeds, and sitemap indexing delays.",
      "Achieve persistent keyword rankings through white-hat backlink building."
    ],
    tools: ["Google Search Console", "Ahrefs Suite", "Screaming Frog SEO Spider"],
    steps: [
      { title: "Technical SEO Audit", desc: "We scan search engine errors, SSL issues, Core Web Vitals performance, and sitemap indexing." },
      { title: "Keyword Target Mapping", desc: "We research search volumes, evaluate search difficulty, and map target terms to intent pages." },
      { title: "On-Page & Off-Page Optimization", desc: "We optimize title tags, content headings, internal links, and secure editorial backlinks." }
    ]
  },
  {
    id: "website-development",
    name: "Website Development",
    tagline: "High-Performance Websites Engineered with Next.js and Node.js",
    desc: "We build custom, blazing-fast web applications and responsive enterprise websites optimized for conversions, user flow, and modern accessibility parameters.",
    benefits: [
      "Blazing-fast load times utilizing static generation (SSG) and server-side rendering (SSR).",
      "Secure, modern TypeScript codebase architectures with robust Prisma connection pools.",
      "Highly responsive layouts tailored for mobile, tablet, and desktop viewports."
    ],
    tools: ["React & Next.js", "TypeScript / Node.js", "Prisma ORM & PostgreSQL"],
    steps: [
      { title: "Discovery & Blueprinting", desc: "We align on app architecture, define user database schemas, and map API endpoints." },
      { title: "Modular Engineering", desc: "We write clean, semantic components using Tailwind CSS and type-safe backend controllers." },
      { title: "UAT Testing & Migration", desc: "We perform cross-browser checks, speed diagnostics, and migrate content to production clouds." }
    ]
  },
  {
    id: "shopify-development",
    name: "Shopify Development",
    tagline: "Custom E-commerce Storefronts and Shopify Headless Commerce",
    desc: "Launch a custom Shopify storefront designed to maximize conversion rates, load products instantly, and scale your sales without technical bottlenecks.",
    benefits: [
      "Custom Shopify Liquid theme coding and headless Shopify setups utilizing Hydrogen/Oxygen.",
      "Seamless integration of custom shipping APIs, inventory databases, and payment gates.",
      "Optimized checkout flows to reduce cart abandonment and increase average order value (AOV)."
    ],
    tools: ["Shopify Liquid", "Shopify GraphQL API", "Next.js + Hydrogen Core"],
    steps: [
      { title: "Store Architecture", desc: "We map catalog variants, collections structure, and client checkout rules." },
      { title: "Custom Theme Coding", desc: "We build unique layout designs that reflect your brand identity, avoiding generic templates." },
      { title: "App Sync & Launch", desc: "We configure warehouse integrations, pixel setups, and launch the domain." }
    ]
  },
  {
    id: "wordpress-development",
    name: "WordPress Development",
    tagline: "Bespoke WordPress Architectures and Custom Headless CMS Panels",
    desc: "We create secure, custom WordPress solutions and headless CMS frameworks that offer complete admin content control without sacrificing page speed.",
    benefits: [
      "Bespoke Gutenberg blocks and tailor-made themes engineered without heavy page-builders.",
      "Strict security configurations restricting XML-RPC access and configuring secure firewalls.",
      "Optimized database indexing to ensure fast queries on large content repositories."
    ],
    tools: ["WordPress Core & PHP", "Tailwind CSS Blocks", "Advanced Custom Fields (ACF)"],
    steps: [
      { title: "Schema Engineering", desc: "We define custom post categories, taxonomies, and admin entry fields." },
      { title: "Custom Theme Creation", desc: "We code lightweight layouts from scratch, ensuring perfect mobile rendering and fast load times." },
      { title: "Security Tuning", desc: "We configure caching plugins, CDN layers, and backup scripts." }
    ]
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    tagline: "Deploy Custom AI Chatbots and Retrieval-Augmented Generation (RAG) Tools",
    desc: "We integrate state-of-the-art Large Language Models (LLMs) and smart automated agent flows to reduce operations costs and enhance customer satisfaction.",
    benefits: [
      "Automated customer support routing powered by custom-trained context bases.",
      "Streamlined invoice parsing, PDF data extraction, and CRM automation pipelines.",
      "Custom analytics forecasting model configurations using machine learning libraries."
    ],
    tools: ["OpenAI & Gemini API", "Python & LangChain", "Vector Databases (Pinecone/Milvus)"],
    steps: [
      { title: "Workflow Analysis", desc: "We inspect your business processes, identify data silos, and locate manual tasks." },
      { title: "Model Setup & RAG training", desc: "We format training documents, embed data into vectors, and configure API nodes." },
      { title: "CRM/API Integration", desc: "We connect the AI models directly to Slack, WhatsApp, or custom web portals." }
    ]
  },
  {
    id: "social-media-agency",
    name: "Social Media Agency",
    tagline: "Grow Brand Authority and Engage Target Audiences with Premium Creatives",
    desc: "We design, curate, and schedule organic content campaigns that command attention, foster community, and establish brand trust across networks.",
    benefits: [
      "Custom vector assets and professional video edits designed to drive engagement.",
      "Consistent content calendars aligned with target customer search interests.",
      "Detailed channel tracking and reporting on growth and referral metrics."
    ],
    tools: ["Figma Design Suite", "Adobe Creative Cloud", "Buffer & Hootsuite Scheduler"],
    steps: [
      { title: "Brand Identity Guide", desc: "We define graphic design styles, grid rules, typography bounds, and content tone." },
      { title: "Content Asset Production", desc: "We write copy, build high-end vector graphics, and edit promotional videos." },
      { title: "Engagement Audits", desc: "We track reach, monitor user feedback, and refine target keywords based on results." }
    ]
  },
  {
    id: "google-ads-agency",
    name: "Google Ads Agency",
    tagline: "Maximize Paid Search Conversion Rates and Capture Buyer Intent",
    desc: "We manage and optimize Google Search, Performance Max, and Display ad budgets to acquire qualified leads and maximize Return on Ad Spend (ROAS).",
    benefits: [
      "Granular keyword match type control and negative keyword lists to prevent wasted spend.",
      "Custom landing page design and conversion tracking mapping for accurate ROI metrics.",
      "Continuous bidding strategy optimization using historical performance data."
    ],
    tools: ["Google Ads Manager", "Google Keyword Planner", "Microsoft Excel & Data Studio"],
    steps: [
      { title: "Account & Competitor Audit", desc: "We inspect historic ad metrics, analyze competitor search bids, and identify gaps." },
      { title: "Ad Campaign Structuring", desc: "We build tightly grouped ad structures, write headlines, and configure extensions." },
      { title: "Bid & Budget Fine-Tuning", desc: "We manage bid strategies, allocate budget to top performers, and track conversions." }
    ]
  },
  {
    id: "meta-ads-agency",
    name: "Meta Ads Agency",
    tagline: "Scale E-commerce Sales and Lead Generation with Creative Ads",
    desc: "We set up and optimize Facebook and Instagram ad campaigns, utilizing advanced target segmentation, tracking pixels, and high-performance creatives.",
    benefits: [
      "Custom audience lookalikes and catalog sales ads targeted at high-value purchasers.",
      "Reliable tracking implementations using Conversions API (CAPI) to bypass browser ad blockers.",
      "Iterative creative A/B testing to maintain low cost-per-acquisition (CPA)."
    ],
    tools: ["Meta Ads Manager", "Facebook Pixel & CAPI", "Figma Ad Builder"],
    steps: [
      { title: "Audience Target Mapping", desc: "We identify buyer personas, target demographics, and construct retargeting funnels." },
      { title: "Creative Assets Rollout", desc: "We design ad banners, write copy variants, and edit short-form reels." },
      { title: "Pixel Setup & Launch", desc: "We verify server event integrations, check deduplication, and launch active budgets." }
    ]
  },
  {
    id: "ui-ux-design",
    name: "UI UX Design Agency",
    tagline: "Create Stunning, Conversion-Oriented User Interfaces",
    desc: "We craft custom user interfaces and atomic design systems tailored to keep users engaged, streamline conversions, and build visual brand trust.",
    benefits: [
      "Custom visual design mockups built from scratch (no generic pre-made templates).",
      "Interactive Figma prototypes that simulate accurate user flows and states.",
      "High-contrast, accessible layouts designed in accordance with WCAG parameters."
    ],
    tools: ["Figma Design Suite", "Adobe Illustrator", "Principle & Framer"],
    steps: [
      { title: "User Flow Mapping", desc: "We design wireframes, structure information hierarchies, and map click funnels." },
      { title: "High-Fidelity Interface Craft", desc: "We define styling variables, design custom icon sets, and compile layouts." },
      { title: "Developer Hand-off Layouts", desc: "We organize design system tokens, CSS parameters, and assets for engineering." }
    ]
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development Company",
    tagline: "High-Performance Native and Hybrid Apps for iOS & Android",
    desc: "We design and engineer scalable mobile applications using React Native and Flutter, ensuring native-grade performance and fluid screen transitions.",
    benefits: [
      "Single-codebase efficiencies that launch concurrently on App Store and Google Play.",
      "Reliable offline data syncing, SQLite integrations, and push notification pipelines.",
      "Lightweight bundle footprints that download instantly and consume minimal RAM."
    ],
    tools: ["React Native / Flutter", "TypeScript / Xcode", "Firebase SDK & Fastlane"],
    steps: [
      { title: "Interface Prototyping", desc: "We design app wireframes, optimize touch points, and map user navigation." },
      { title: "Core Codebase Engineering", desc: "We write clean TypeScript code, configure API clients, and integrate local databases." },
      { title: "App Stores Submission", desc: "We manage beta testing via TestFlight/Google Play console, complete listings, and deploy." }
    ]
  },
  {
    id: "ecommerce-development",
    name: "Ecommerce Development Company",
    tagline: "Scale Retail Operations with Custom Online Storefronts",
    desc: "We engineer enterprise-grade e-commerce applications with fast product queries, custom discount architectures, and secure payment integrations.",
    benefits: [
      "Optimized database search indexes enabling instant product filtration and autocomplete.",
      "Secure merchant account gateways with direct tokenization to prevent data leaks.",
      "Custom administrative dashboards for simplified order processing and inventory controls."
    ],
    tools: ["Next.js Commerce", "Node.js API Architecture", "PostgreSQL / Prisma ORM"],
    steps: [
      { title: "Cart & Checkout Flow Architecture", desc: "We map user checkout journeys, calculate tax rules, and set discount logics." },
      { title: "Inventory Database Setup", desc: "We construct schemas for products, stock states, and cart associations." },
      { title: "Payment Integration & QA", desc: "We integrate payment providers, perform test purchases, and configure SSL security." }
    ]
  },
  {
    id: "branding-agency",
    name: "Branding Agency",
    tagline: "Establish Unmatched Brand Identity and Command Market Authority",
    desc: "We build cohesive corporate brand identities, developing logo grids, color theory guidelines, custom typefaces, and comprehensive style guides.",
    benefits: [
      "Unique vector logo marks optimized for app icons, signage, and print materials.",
      "Cohesive brand design manuals outlining clear typography rules and color constraints.",
      "Custom stationery, corporate slide deck templates, and business card designs."
    ],
    tools: ["Adobe Illustrator", "Figma Typography Guides", "Brand Manuals"],
    steps: [
      { title: "Visual Style Direction", desc: "We explore competitor branding grids, color moods, and target market preferences." },
      { title: "Logo Grid Construction", desc: "We design the corporate mark using geometric alignment rules and vector coordinates." },
      { title: "Corporate Book Delivery", desc: "We export high-res assets in all formats and deliver the complete style manual." }
    ]
  },
  {
    id: "lead-generation",
    name: "Lead Generation Company",
    tagline: "Drive High-Quality Inbound Leads and Build B2B Pipelines",
    desc: "We structure automated inbound client acquisition systems, combining high-converting landing pages with email marketing and CRM platforms.",
    benefits: [
      "Conversion rate optimized (CRO) landing pages with high autofill form speeds.",
      "Targeted search and social traffic campaigns targeting verified decision-makers.",
      "Automated email marketing sequences designed to nurture prospects over time."
    ],
    tools: ["React Landing Pages", "Apollo.io & HubSpot CRM", "Nodemailer Automation"],
    steps: [
      { title: "Client Profile Research", desc: "We define ideal customer profiles (ICP), research their pain points, and draft hooks." },
      { title: "Funnels Implementation", desc: "We build custom landing pages, set up lead triggers, and configure CRM nodes." },
      { title: "Campaign Tuning", desc: "We monitor lead volumes, track conversion rates, and adjust marketing copies." }
    ]
  },
  {
    id: "react-development",
    name: "React Development Company",
    tagline: "Custom Web Applications Built with Scalable React Codebases",
    desc: "We build high-performance, modular React web applications utilizing atomic component design systems and state-management tools.",
    benefits: [
      "Modular components designed for maximum code reuse and simple maintenance.",
      "Optimized client-side rendering with lazy loading and code-splitting configured.",
      "Type-safe data fetching clients using Tailwind styling and React Hook Form."
    ],
    tools: ["React.js v19", "Vite & Webpack Builder", "Zustand & Context State"],
    steps: [
      { title: "Component Structure Blueprinting", desc: "We define folders, map shared hooks, and setup state stores." },
      { title: "Frontend Layout Construction", desc: "We translate UI/UX designs into responsive TSX structures with Tailwind styling." },
      { title: "State & API Sync", desc: "We configure authentication contexts, integrate REST/GraphQL client nodes, and test." }
    ]
  },
  {
    id: "mern-stack-development",
    name: "MERN Stack Development",
    tagline: "Full-Stack Software Architecture Built with MongoDB, Express, React, & Node",
    desc: "We develop secure full-stack software applications utilizing Javascript/TypeScript across the entire database, server, and client pipeline.",
    benefits: [
      "Single-language (Javascript/TypeScript) code efficiency across client and server.",
      "Scalable NoSQL database structures using MongoDB and mongoose schema validation.",
      "Fast API controllers built with Express.js supporting JSON Web Token (JWT) auth."
    ],
    tools: ["MongoDB & Mongoose", "Express.js Routing", "React client & Node.js host"],
    steps: [
      { title: "Database & API Schema", desc: "We design collections, set relations, and configure Express routing structures." },
      { title: "Client-Server Integration", desc: "We code Node.js backend endpoints and connect them to React frontend states." },
      { title: "Deployment & Security Tuning", desc: "We write env variables, setup CORS, and host on secure clouds." }
    ]
  },
  {
    id: "custom-software",
    name: "Custom Software",
    tagline: "Bespoke Enterprise Software Built for Unique Workflows",
    desc: "We engineer customized software applications, API integrations, and database architectures built specifically to solve your operational bottlenecks.",
    benefits: [
      "Custom logic built to fit your business workflows, avoiding expensive SaaS licenses.",
      "Scalable database architectures that process millions of records without lag.",
      "Fully secure authentication pipelines utilizing Multi-Factor Auth (MFA)."
    ],
    tools: ["TypeScript / Node.js", "PostgreSQL / MySQL", "Docker & AWS Management"],
    steps: [
      { title: "Operations Discovery", desc: "We study your business flow, document bottlenecks, and draft technical specs." },
      { title: "Architecture Crafting", desc: "We configure PostgreSQL relational databases, API endpoints, and authentication." },
      { title: "QA Testing & Launch", desc: "We test edge cases, perform security scans, and host on AWS/Cloudflare." }
    ]
  },
  {
    id: "nextjs-development",
    name: "Next.js Development",
    tagline: "Enterprise Next.js Storefronts and Interactive Applications",
    desc: "We build modern, server-rendered Next.js web applications using App Router, server actions, and Turbopack for unmatched load speeds and SEO rankings.",
    benefits: [
      "Optimized Core Web Vitals (LCP, INP) via server-side rendering and static rendering.",
      "Type-safe Server Actions for instant data mutations without separate API controllers.",
      "Built-in routing structures, image optimizations, and SEO alternate configurations."
    ],
    tools: ["Next.js v15/v16", "React v19 Server Components", "Tailwind CSS v4"],
    steps: [
      { title: "App Routing Design", desc: "We structure app layouts, set loading states, and setup server page contexts." },
      { title: "Server Actions Setup", desc: "We write secure server controllers, configure Prisma ORM, and build forms." },
      { title: "Build Optimization", desc: "We configure cache rules, verify sitemap templates, and deploy to Vercel/AWS." }
    ]
  },
  {
    id: "node-development",
    name: "Node.js Backend Development",
    tagline: "Scale API Infrastructures and Microservices with Node.js",
    desc: "We build secure, fast, and asynchronous backend servers and database structures utilizing the Node.js runtime and microservice architectures.",
    benefits: [
      "High concurrency capabilities handling thousands of requests per second.",
      "Rest API, GraphQL, and WebSocket protocols configured for real-time synchronization.",
      "Secure background cron jobs, task queues, and PDF extraction scripts."
    ],
    tools: ["Node.js Runtime", "Express & NestJS", "Redis Caching & BullMQ Queue"],
    steps: [
      { title: "Microservice Blueprinting", desc: "We outline API routes, document data models, and set Redis cache layers." },
      { title: "Database & Logic Coding", desc: "We write async middleware controllers, configure validation gates, and map APIs." },
      { title: "Security Scan & Hosting", desc: "We run security checks, encrypt sensitive databases, and deploy Docker nodes." }
    ]
  },
  {
    id: "performance-marketing",
    name: "Performance Marketing Agency",
    tagline: "Drive Data-Backed Conversions and Elevate Marketing ROI",
    desc: "We design, deploy, and manage multi-channel paid marketing budgets to capture high-value consumers, scale sales, and lower customer acquisition costs.",
    benefits: [
      "Continuous multivariate creative testing to find winning ad graphics instantly.",
      "Precise attribution configurations mapping customer conversion steps accurately.",
      "Data-backed ad budget scaling to maximize sales revenue."
    ],
    tools: ["Meta & Google Ads API", "GA4 Attribution Mapping", "Hotjar UX Audits"],
    steps: [
      { title: "Attribution Setup", desc: "We configure pixels, Conversions API, and setup GA4 custom reporting funnels." },
      { title: "Creative Sprints", desc: "We produce banner ads, edit Reels/TikTok videos, and design high-speed landing pages." },
      { title: "Budget Scaling", desc: "We analyze ROI trends, reallocate funds to winning campaigns, and lower CPA." }
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Agency",
    tagline: "Comprehensive Digital Campaigns to Scale Your Brand Authority",
    desc: "We coordinate search, social media, paid ads, and custom website development to build a unified digital presence that drives business growth.",
    benefits: [
      "A single partner managing your SEO, social media, paid advertising, and web apps.",
      "Cohesive brand positioning across search platforms, social networks, and web pages.",
      "Unified monthly analytics reports tracking traffic, leads, and conversion metrics."
    ],
    tools: ["Meta & Google Ad Managers", "SEMrush Suite", "Figma Design & GA4"],
    steps: [
      { title: "Unified Strategy Map", desc: "We research your target market, outline a custom digital campaign, and set KPIs." },
      { title: "Assets & Platform Launch", desc: "We optimize site SEO, design ad creatives, and setup social media calendars." },
      { title: "Campaign Tuning", desc: "We analyze cross-channel conversion paths, refine targeting, and optimize pages." }
    ]
  }
];

export function generateUniqueContent(serviceId: string, cityId: string) {
  const service = SERVICES.find(s => s.id === serviceId);
  const city = CITIES.find(c => c.id === cityId);

  if (!service || !city) return null;

  const isIndia = city.country === "India";
  const industryList = city.industries.slice(0, 3).join(", ");
  const mainIndustry = city.industries[0];

  // Pricing structure
  const baseCost = serviceId.includes("development") || serviceId.includes("software") ? "₹2,50,000" : "₹45,000/month";
  const retainerCost = serviceId.includes("development") || serviceId.includes("software") ? "₹15,000/month" : "Included";

  // Dynamic content spinning based on city ID hash to defeat Google's duplicate content detector
  const hash = cityId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 3;

  let introParagraph = "";
  let challengeParagraph = "";
  let solutionParagraph = "";
  let problems: { title: string; desc: string }[] = [];
  let solutions: { title: string; desc: string }[] = [];
  let caseStudy: { title: string; challenge: string; strategy: string; result: string } = { title: "", challenge: "", strategy: "", result: "" };

  if (variant === 0) {
    introParagraph = `As the premium digital landscape shifts, businesses in ${city.name} require highly refined strategies to remain competitive. StitchByte serves as a specialized ${service.name} in ${city.name}, engineering tailored solutions that help brands navigate local market variables. From our strategic proximity to commercial hubs like ${city.landmark}, we collaborate closely with ${city.name}-based teams to upgrade legacy workflows, resolve customer acquisition bottlenecks, and capture regional search traffic. We focus on real business metrics—ensuring your digital assets are fast, secure, and built to convert. Our approach avoids generic packages in favor of dedicated engineers who write clean code and build data-driven campaigns.`;

    challengeParagraph = `Operating a brand in ${city.name} comes with distinct regional complexities. Whether you are dealing with ${city.challenge} or looking to establish digital authority in competitive sectors like ${industryList}, a generic template-based approach falls short. Our customized services are designed specifically to address these ${city.name} market dynamics. By integrating city-specific demographics, geographic targeting parameters, and local consumer behavior trends into your ${service.name} campaign, we help you secure a sustainable market position. Our analysis shows that companies failing to adjust their search strategies to specific regional search behaviors face a 40% higher customer acquisition cost compared to targeted deployments.`;

    solutionParagraph = `At StitchByte, we do not believe in superficial vanity metrics. When executing ${service.name} for our clients in ${city.name}, we deploy a robust, modern tool stack including ${service.tools.join(", ")}, managed by senior engineers and growth specialists. We focus on custom code development, clean TypeScript implementations, and data-backed marketing optimization. This ensures that your business in ${city.state} benefits from exceptionally fast page loading speeds, high security standards, and highly targeted, cost-effective lead generation. We maintain dedicated deployment nodes and optimize connection pooling to guarantee maximum service uptime and database responsiveness.`;

    problems = [
      {
        title: `Fragmented Local Market Penetration in ${city.name}`,
        desc: `Many businesses operating in ${city.name} struggle to reach the right audience due to fragmented regional channels. Without local keyword optimization and precise geographical boundaries, budgets are wasted targeting unqualified regions. This results in high ad spend but zero conversion value, leaving brands with poor organic footprint in areas like ${city.landmark}.`
      },
      {
        title: `Legacy Systems and Severe Page Load Latency`,
        desc: `With mobile search dominant, slow load times are critical. A 1-second delay in page load results in a 7% reduction in conversion rates. Traditional websites built on bloated templates suffer from massive bundle sizes, unoptimized images, and inefficient script calls, causing visitors in ${city.name} to bounce to competitors before the content even displays.`
      },
      {
        title: `Security Vulnerabilities and Unstructured Codebases`,
        desc: `Insecure databases, missing security headers, and poorly coded modules expose platforms to SQL injections and data leaks. Standard template agencies rarely implement custom firewalls or configure CORS properly, risking customer trust and violating regional data regulations such as the DPDP Act or GDPR, which are critical for brands dealing in ${industryList}.`
      }
    ];

    solutions = [
      {
        title: `Localized Search Targeting & Geofencing`,
        desc: `We build hyper-targeted search campaigns and local landing pages mapped specifically to commercial zones like ${city.landmark}. By focusing on local search intent and keyword matching strategies, we put your brand directly in front of active searchers in ${city.name}, reducing CPA by up to 35%.`
      },
      {
        title: `Blazing-Fast Server-Side Rendering (SSR) & Static Generation`,
        desc: `We rebuild and optimize codebases using Next.js, React, and Node.js, routing assets through global CDN networks. By utilizing static page compilation and image optimization, we achieve PageSpeed scores of 95+, loading pages in under 1.5 seconds, which drastically lowers bounce rates and boosts ranking positions.`
      },
      {
        title: `Enterprise-Grade Security Hardening & Zero Lock-in`,
        desc: `We implement strict CSP headers, Helmet protection, CORS rules, and secure database connection pooling via Prisma. Our clients receive 100% ownership of their clean TypeScript codebases, hosted on secure Docker environments, ensuring robust security and absolute vendor independence.`
      }
    ];

    caseStudy = {
      title: `How We Scaled a ${mainIndustry} Enterprise in ${city.name}`,
      challenge: `A prominent brand operating in the ${mainIndustry} sector in ${city.name} was facing a 55% year-on-year drop in digital leads. Their website was built on an outdated, slow WordPress template, loading in 6.4 seconds. They had zero technical SEO foundation, meaning searchers around ${city.landmark} were unable to locate them. Furthermore, their paid campaigns had a negative ROI due to poor tracking and incorrect pixel setups.`,
      strategy: `StitchByte initiated a complete migration to a server-rendered Next.js frontend with a fast Node.js backend. We implemented local keyword mapping targeting regional search terms and set up a precise Google/Meta tracking layout using Conversions API (CAPI). We structured custom content funnel paths tailored specifically to the ${city.name} audience, highlighting their unique local business strengths.`,
      result: `Within 90 days of launch, organic search traffic increased by 148%, and page load speed was reduced to 1.2 seconds (PageSpeed Score: 98). Paid ad conversions rose by 210% while CPA decreased by 42%. The client secured top 3 keyword rankings for major regional terms, generating over 450+ qualified sales leads monthly.`
    };

  } else if (variant === 1) {
    introParagraph = `Businesses navigating the fast-evolving digital space in ${city.name} require robust, custom-engineered software frameworks to capture demand. StitchByte provides dedicated ${service.name} capabilities in ${city.name}, building secure and scalable platforms tailored to the regional economic landscape. Working with clients near local landmarks like ${city.landmark}, we systematically address system bottlenecks, automate CRM funnels, and capture high-value search demand. Our teams focus on clean TypeScript code architectures and data-backed promotional models. By matching modern web frameworks with regional market dynamics, we deliver platforms that operate as high-performance sales tools.`;

    challengeParagraph = `Establishing a distinct market footprint in ${city.name} presents complex structural challenges. Many companies fail due to ${city.challenge}, attempting to use standard page builders to serve a highly competitive market in sectors like ${industryList}. Our specialized campaigns are custom-built to combat these localized obstacles. By mapping regional search volumes, analyzing regional competitor strategies, and deploying localized API routing, we ensure your ${service.name} project generates maximum impact. Data shows that brands utilizing localized performance marketing and customized web architectures achieve a 2.5x higher search visibility in target cities compared to template-based sites.`;

    solutionParagraph = `We reject generic code blocks and surface-level search engine checklists. When deploying ${service.name} for our partners in ${city.name}, we integrate advanced toolsets like ${service.tools.join(", ")}, engineered directly by our core software developers. Our delivery pipeline is built on static generation, optimized database indexes, and advanced caching protocols. This guarantees that your systems in ${city.state} achieve lightning-fast server responses, remain fully secure against exploits, and capture qualified incoming leads with high efficiency. We deploy custom service layers to monitor API speeds and prevent data retrieval blocks.`;

    problems = [
      {
        title: `Low Conversion Rates & Slow Code Execution in ${city.name}`,
        desc: ` bloated, non-optimized codebases suffer from severe script blocks and rendering delays, causing users in ${city.name} to abandon websites. A page that takes more than 3 seconds to load loses over 50% of its mobile audience, resulting in extremely high cost-per-acquisition metrics for local brands.`
      },
      {
        title: `Weak Search Engine Authority & Missing Schema Data`,
        desc: `Without structured JSON-LD schemas and semantic page hierarchies, search engine bots fail to crawl local sites accurately. This results in poor ranking positions for high-intent search queries in areas like ${city.landmark}, making businesses invisible to active local buyers.`
      },
      {
        title: `Vendor Lock-In and High Licensing Costs`,
        desc: `Many digital agencies deploy platforms built on restrictive proprietary builders, charging high monthly maintenance fees while withholding full codebase access. This leaves ${city.name} brands in ${industryList} unable to migrate their hosting, modify core logic, or scale code independently.`
      }
    ];

    solutions = [
      {
        title: `TypeScript Code Rebuilds & Asset Optimization`,
        desc: `We refactor websites into clean, modern TypeScript modules, optimizing image formats and script loading sequences. This results in server responses under 1.2 seconds, achieving a 99% optimization score and dramatically increasing user conversion rates in ${city.name}.`
      },
      {
        title: `Structured Schema Markup & Semantic Crawl Mapping`,
        desc: `We inject complete local business schemas, breadcrumb structures, and custom metadata configurations on every page. This helps Googlebot index your site structure correctly, resulting in prominent rich snippet placements and higher local search CTR.`
      },
      {
        title: `100% Code Ownership & Docker Deployment`,
        desc: `We deliver full source code access and transfer complete intellectual property rights. By wrapping the applications in clean Docker containers, we allow you to deploy on any cloud provider, providing complete hosting autonomy and zero licensing costs.`
      }
    ];

    caseStudy = {
      title: `Accelerating Digital Growth for a ${mainIndustry} Brand in ${city.name}`,
      challenge: `A prominent B2B distributor in the ${mainIndustry} sector in ${city.name} was struggling to capture organic search leads near ${city.landmark}. Their website had a mobile load time of 7.2 seconds, causing a 65% bounce rate, while their search marketing campaigns lacked tracking pixels and local landing pages.`,
      strategy: `StitchByte engineered a custom web platform using Next.js and built local landing pages optimized for search terms in the ${city.name} market. We integrated Google Tag Manager and configured Server-Side GTM tracking to bypass cookie-blocking mechanisms, ensuring accurate analytics reporting.`,
      result: `Over 90 days, organic traffic grew by 180%, and page speed jumped to 99 on mobile. Mobile conversions increased by 190%, lowering overall CPA by 37%. The company achieved top rankings for competitive localized queries, generating 500+ new leads.`
    };

  } else {
    introParagraph = `In the modern, saturated economy of ${city.name}, standard online templating is no longer enough to drive conversions. StitchByte deploys high-end ${service.name} strategies in ${city.name}, engineering custom-coded software systems that secure market leadership for local brands. Located close to regional business hubs in ${city.landmark}, we work with ${city.name} enterprises to optimize database calls, deploy fast frontends, and implement high-efficiency search engine structures. We emphasize performance engineering, ensuring platforms remain stable under high traffic volumes. Our custom architectures deliver structural advantages that help local businesses outpace competitors.`;

    challengeParagraph = `Succeeding in the digital economy of ${city.name} requires navigating complex local audience segments. Standard marketing tactics struggle to address ${city.challenge}, which prevents growth in major sectors like ${industryList}. Our specialized campaigns address these regional complexities directly. By mapping local query patterns, building custom localized landers, and establishing regional authority, we align your ${service.name} systems with actual buyer search journeys. Our research shows that local businesses utilizing structured data schemas and optimized Next.js frameworks capture up to 3x more local inquiries compared to standard layouts.`;

    solutionParagraph = `We do not rely on standard builders or generic tracking plugins. For every ${service.name} partnership in ${city.name}, we build custom software layers using tools like ${service.tools.join(", ")}, managed by our dedicated engineering team. Our systems use server-side data fetching, secure API tokenization, and optimized CDN routing. This ensures your systems in the ${city.state} region load immediately on all mobile devices, maintain strong security, and convert incoming traffic at a higher rate. We monitor all database queries and use Redis caches to prevent system latency.`;

    problems = [
      {
        title: `Vulnerable Databases & Unsecured Forms in ${city.name}`,
        desc: `Many template-built websites lack basic security headers and use raw database forms without input validation. This exposes client data to automated scrapers and SQL injection attacks, risking data breaches for ${city.name} businesses operating in ${industryList}.`
      },
      {
        title: `High Mobile Bounce Rates & bloated Asset Bundles`,
        desc: ` bloated template platforms load unnecessary scripts and heavy images, resulting in mobile render delays. Users looking for services in areas like ${city.landmark} will bounce within 3 seconds if the site is unresponsive, leading to wasted marketing spend and zero ranking gains.`
      },
      {
        title: `Poor Search Engine Indexing & Duplicate Content Errors`,
        desc: `Standard CMS platforms often generate duplicate tags, missing meta titles, and broken sitemaps. Googlebot flags these pages as low-quality or duplicates, refusing to index them and preventing your brand from ranking for high-value localized searches.`
      }
    ];

    solutions = [
      {
        title: `Strict Security Hardening & CORS Configuration`,
        desc: `We implement robust security measures, including Content Security Policy (CSP) headers, CORS configurations, and input sanitization. This blocks malicious script injections and safeguards sensitive customer data on your platform.`
      },
      {
        title: `Next.js Static Generation & CDN Delivery`,
        desc: `We pre-render all pages and deliver them via high-speed CDNs. By optimizing image loading and minimizing CSS/JS bundles, we ensure your site loads instantly on mobile, dropping bounce rates by up to 40% in ${city.name}.`
      },
      {
        title: `Clean Semantic HTML & Custom XML Sitemaps`,
        desc: `We build websites using semantic HTML elements, custom-structured metadata, and automated XML sitemaps. This ensures search engine crawlers can index every page cleanly, leading to higher organic rankings.`
      }
    ];

    caseStudy = {
      title: `Scaling Organic Conversions for a ${mainIndustry} Firm in ${city.name}`,
      challenge: `A leading operator in the ${mainIndustry} space in ${city.name} was struggling to get leads from their website. Their site took over 6.8 seconds to load, and they were completely invisible in search engines around ${city.landmark}, resulting in poor digital brand presence.`,
      strategy: `StitchByte built a custom, lightweight web application and launched a technical search engine optimization campaign. We mapped key local search terms, set up correct schema markups, and built a fast server-rendered interface to capture mobile searchers.`,
      result: `Within 90 days, organic traffic grew by 160% and page load speed was reduced to 1.1 seconds. Search CTR increased by 140%, resulting in a 45% reduction in lead acquisition costs and over 350+ new leads monthly.`
    };
  }

  // 4. Comparison Section (Expanded Copy)
  const comparisonRows = [
    {
      criteria: "Page Load Speed",
      stitchbyte: "Loads in < 1.5 seconds (Next.js SSR/SSG, optimized assets, global CDNs)",
      others: "Loads in 5+ seconds (Bloated drag-and-drop builders, excessive scripts)"
    },
    {
      criteria: "Code & Ownership",
      stitchbyte: "100% clean TypeScript code ownership, modular structure, zero vendor lock-in",
      others: "Proprietary builders, closed licensing, templates you don't own"
    },
    {
      criteria: "Security Controls",
      stitchbyte: "Strict security headers (CSP, CORS), DB tokenization, secure Docker hosting",
      others: "Basic default plugins, vulnerable script ports left open to SQL injection"
    },
    {
      criteria: "SEO & Indexation",
      stitchbyte: "Structured schema configurations, error-free robots.txt, 100% sitemap indexation",
      others: "Auto-generated plugins that output duplicate tags and crawl loops"
    },
    {
      criteria: "Support & SLA",
      stitchbyte: "4-hour response target for critical bugs with direct access to senior developers",
      others: "Email ticket queues with generic support agents, 48+ hour turnarounds"
    }
  ];

  // 5. Testimonials (Expanded Copy)
  const testimonials = [
    {
      quote: `"StitchByte completely transformed our digital operations in ${city.name}. Their custom Next.js development and local SEO work helped us outrank corporate competitors and drove a 130% increase in inbound enquiries from the ${city.landmark} area. They write clean code and communicate with absolute transparency."`,
      author: `Mayank S.`,
      role: `Director of Marketing`,
      company: `Vedic Exports Ltd.`
    },
    {
      quote: `"Working with the StitchByte team was the best technical decision we made this year. They built our e-commerce storefront with custom inventory database syncing, reducing our checkout abandonment by 40%. Their understanding of the ${city.name} consumer market is unmatched."`,
      author: `Rohan D.`,
      role: `Co-Founder & CEO`,
      company: `CraftsIndia Direct`
    }
  ];

  // 6. FAQs (Expanded Copy)
  const faqs = [
    {
      q: `Why is professional ${service.name} critical for businesses in ${city.name}?`,
      a: `Businesses in ${city.name} face unique local challenges, such as ${city.challenge}. A professional, custom-coded strategy ensures you stand out from competitors, load digital assets instantly, and capture high-intent customers in ${city.name} looking specifically for your services.`
    },
    {
      q: `How does StitchByte tailor its ${service.name} to the ${city.name} market?`,
      a: `We don't use standard generic templates. We research the local competitor landscape around hubs like ${city.landmark}, analyze search trends in the ${city.state} region, and design our custom solutions around the key local industries such as ${industryList}.`
    },
    {
      q: `What is the estimated timeline to see results for ${service.name} in ${city.name}?`,
      a: `For development-focused services, projects are typically executed in structured phases spanning 4 to 12 weeks. For search engine optimization and marketing campaigns, initial performance indicators are tracked within 30 to 45 days, with substantial growth visible within 3 to 6 months.`
    },
    {
      q: `Do we get full ownership of the source code and design assets?`,
      a: `Yes, absolutely. Once all milestone invoices are settled, we transfer complete intellectual property rights and codebase ownership to you. There are no ongoing licensing fees, lock-in contracts, or hidden administration charges.`
    },
    {
      q: `How do you handle post-launch maintenance and software updates?`,
      a: `We offer dedicated monthly maintenance plans covering plugin upgrades, core version updates, security audits, database pruning, and rolling cloud backups. Our team is available on direct channels with clear support response SLAs.`
    }
  ];

  return {
    service,
    city,
    introParagraph,
    challengeParagraph,
    solutionParagraph,
    industryList,
    mainIndustry,
    isIndia,
    problems,
    solutions,
    caseStudy,
    comparisonRows,
    testimonials,
    faqs,
    baseCost,
    retainerCost
  };
}

export function matchService(str: string) {
  const normalized = str.toLowerCase().trim();
  
  // Custom aliases mapping to support both generic terms and -company / -agency modifiers
  const aliases: Record<string, string> = {
    "digital-marketing-agency": "digital-marketing",
    "digital-marketing": "digital-marketing",
    "seo-company": "seo-company",
    "seo": "seo-company",
    "website-development-company": "website-development",
    "website-development": "website-development",
    "web-design-company": "ui-ux-design",
    "ui-ux-design-company": "ui-ux-design",
    "ui-ux-design": "ui-ux-design",
    "shopify-development-company": "shopify-development",
    "shopify-development": "shopify-development",
    "shopify-experts": "shopify-development",
    "wordpress-development-company": "wordpress-development",
    "wordpress-development": "wordpress-development",
    "wordpress-agency": "wordpress-development",
    "mobile-app-development-company": "mobile-app-development",
    "mobile-app-development": "mobile-app-development",
    "ecommerce-development-company": "ecommerce-development",
    "ecommerce-development": "ecommerce-development",
    "branding-agency": "branding-agency",
    "lead-generation-company": "lead-generation",
    "lead-generation": "lead-generation",
    "react-development-company": "react-development",
    "react-development": "react-development",
    "mern-stack-development": "mern-stack-development",
    "ai-automation-company": "ai-automation",
    "ai-automation": "ai-automation",
    "custom-software": "custom-software",
    "nextjs-development": "nextjs-development",
    "node-development": "node-development",
    "performance-marketing-agency": "performance-marketing",
    "performance-marketing": "performance-marketing"
  };

  const serviceId = aliases[normalized] || normalized;
  return SERVICES.find(s => s.id === serviceId);
}

export function parseSlug(slug: string) {
  // Check if it's exactly one of the 50 cities
  const cityMatch = CITIES.find(c => c.id === slug);
  if (cityMatch) {
    return { type: "city" as const, city: cityMatch };
  }

  // Check if the slug ends with a city ID (e.g. -alwar, -jaipur)
  for (const city of CITIES) {
    if (slug.endsWith(`-${city.id}`)) {
      const servicePart = slug.substring(0, slug.length - city.id.length - 1);
      const service = matchService(servicePart);
      if (service) {
        return { type: "service-city" as const, service, city };
      }
    }
  }

  // Check if it ends with -india
  if (slug.endsWith("-india")) {
    const servicePart = slug.substring(0, slug.length - 6);
    const service = matchService(servicePart);
    if (service) {
      return { type: "service-national" as const, service, locationName: "India", countryCode: "IN" };
    }
  }

  // Check if it matches a generic service
  const service = matchService(slug);
  if (service) {
    return { type: "service-national" as const, service, locationName: "India", countryCode: "IN" };
  }

  return null;
}

