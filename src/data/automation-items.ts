export interface AutomationItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  videoUrl: string;
  videoPoster?: string;
  videoDuration?: string;
  features: string[];
  architectureSteps: {
    title: string;
    description: string;
  }[];
  businessBenefits: {
    stat: string;
    label: string;
    description: string;
  }[];
  techStack: string[];
  metric: string;
  useCases: string[];
}

export const AUTOMATION_ITEMS: AutomationItem[] = [
  {
    id: "ai-agents",
    slug: "ai-agents",
    title: "Autonomous AI Agents",
    tagline: "Custom LLMs & Intelligent Triage",
    shortDescription:
      "Trained on your private documentation and business SOPs to handle customer inquiries, qualify inbound leads, and resolve queries 24/7 with zero hallucinations.",
    fullDescription:
      "Autonomous AI Agents are custom-engineered conversational and operational units powered by state-of-the-art Large Language Models (OpenAI GPT-4o, Google Gemini, and Anthropic Claude). Unlike generic chatbots that regurgitate canned responses, our agents use Retrieval-Augmented Generation (RAG) coupled with vector databases to reference your exact business guidelines, technical manuals, pricing tiers, and past interaction history. They resolve routine questions instantly, gather lead details, perform qualification scoring, and smoothly escalate complex inquiries to your human sales or support team with complete conversation summaries.",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728230/stitchbyte/blogs/sfvcj6wmonfra3tezpr6.mp4",
    videoPoster: "/process-discovery.jpg",
    videoDuration: "1:20 Walkthrough",
    metric: "92% automated query resolution",
    features: [
      "Retrieval-Augmented Generation (RAG) with high-speed vector embeddings",
      "Context-aware multi-turn conversations in English, Hindi, and 40+ global languages",
      "Real-time human escalation handoff with conversation summary pings to Slack/CRM",
      "Direct integration with OpenAI, Claude, and Gemini API endpoints",
      "Strict system guardrails ensuring zero hallucinations or unauthorized disclosures",
      "Self-updating knowledge base connected directly to your Notion or Google Docs",
    ],
    architectureSteps: [
      {
        title: "Knowledge Ingestion & Vectorization",
        description:
          "Your SOPs, product documentation, FAQs, and pricing models are parsed, chunked, and embedded into a private vector database (Pinecone or Milvus).",
      },
      {
        title: "Semantic Intent & Guardrail Verification",
        description:
          "Incoming messages pass through an intent classifier with strict system prompts to prevent out-of-scope queries and ensure brand-safe responses.",
      },
      {
        title: "Context-Informed Synthesis",
        description:
          "The agent queries the relevant vector chunks and generates an accurate, friendly, and conversion-focused response in milliseconds.",
      },
      {
        title: "Action Execution & CRM Logging",
        description:
          "User details and query intents are dispatched to your CRM, notifying the account executive when buyer intent is high.",
      },
    ],
    businessBenefits: [
      {
        stat: "92%",
        label: "Query Resolution",
        description: "Routine customer support and sales questions resolved without human intervention.",
      },
      {
        stat: "< 3s",
        label: "Instant Response",
        description: "Zero waiting queue for inbound prospects, boosting conversion probability by 5x.",
      },
      {
        stat: "24/7",
        label: "Global Availability",
        description: "Continuous operation across every time zone without shift scheduling costs.",
      },
      {
        stat: "70%",
        label: "Support Cost Reduction",
        description: "Allows your core team to focus strictly on closing qualified high-value deals.",
      },
    ],
    techStack: [
      "OpenAI GPT-4o",
      "Google Gemini 1.5",
      "LangChain",
      "Pinecone Vector DB",
      "FastAPI / Python",
      "Next.js Frontend",
    ],
    useCases: [
      "E-Commerce customer support (order tracking, exchange policies, product guidance)",
      "B2B SaaS lead qualification and meeting scheduling",
      "Healthcare patient onboarding & appointment pre-screening",
      "Real Estate buyer inquiry routing and property catalog sharing",
    ],
  },
  {
    id: "whatsapp",
    slug: "whatsapp",
    title: "WhatsApp Business Engines",
    tagline: "Omnichannel Customer Funnels",
    shortDescription:
      "Turn WhatsApp into an automated revenue and support machine. Capture leads instantly, send interactive catalogs, and broadcast updates compliant with Meta policies.",
    fullDescription:
      "With over 2 billion active users, WhatsApp is the highest-converting communication channel in modern business. Our WhatsApp Business Engines integrate directly with the official Meta Cloud API, enabling automated inquiry response funnels, interactive menu buttons, digital product catalogues, and broadcast messaging. Whether a customer pings you from an Instagram ad or your website widget, our automated engine welcomes them, gathers requirements, and pushes order details into your database with zero lag.",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728136/stitchbyte/blogs/g3mhltvai7bjp2qtyg32.mp4",
    videoPoster: "/process-dev.jpg",
    videoDuration: "1:45 Demo",
    metric: "< 3 sec average response time",
    features: [
      "Official Meta WhatsApp Cloud API integration with green-tick verification support",
      "Automated lead capture & instant booking confirmations with custom QR codes",
      "Interactive menu buttons, list pickers, and dynamic media flows",
      "Automated order status notifications and shipping alerts",
      "Two-way team shared inbox synchronization for seamless human takeover",
      "Meta-compliant broadcast campaigns with audience segment targeting",
    ],
    architectureSteps: [
      {
        title: "Webhook Ingestion",
        description:
          "Incoming messages hit our webhook gateway with cryptographic signature validation to verify authenticity.",
      },
      {
        title: "Session & State Management",
        description:
          "Our state machine evaluates where the customer is in the buying journey (new lead, active order, or returning VIP).",
      },
      {
        title: "Interactive Flow Dispatch",
        description:
          "Pre-approved template messages or dynamic interactive button cards are dispatched back via the WhatsApp Cloud API.",
      },
      {
        title: "Backend Sync",
        description:
          "Lead responses are saved in MongoDB / PostgreSQL and broadcast to team channels on Slack or WhatsApp.",
      },
    ],
    businessBenefits: [
      {
        stat: "98%",
        label: "Open Rate",
        description: "WhatsApp notifications deliver unmatched engagement compared to traditional 20% email open rates.",
      },
      {
        stat: "3.5x",
        label: "Higher Conversion",
        description: "Instant WhatsApp follow-ups convert leads significantly faster than delayed phone calls.",
      },
      {
        stat: "100%",
        label: "Meta Compliant",
        description: "Built strictly on official APIs to protect your business number from bans or spam penalties.",
      },
      {
        stat: "0 min",
        label: "Downtime",
        description: "Serverless webhooks scale elastically to handle high-volume marketing surges effortlessly.",
      },
    ],
    techStack: [
      "Meta WhatsApp Cloud API",
      "Node.js & Express",
      "Redis Session Store",
      "MongoDB / PostgreSQL",
      "Webhook Architecture",
    ],
    useCases: [
      "Restaurant digital menu browsing, table reservations, and order alerts",
      "D2C brand order tracking and post-purchase customer support",
      "Clinic appointment reminders and patient check-in workflows",
      "Educational institute admissions counseling and fee payment reminders",
    ],
  },
  {
    id: "crm-sync",
    slug: "crm-sync",
    title: "CRM & Pipeline Automation",
    tagline: "Zero Data Silos Across Tools",
    shortDescription:
      "Connect your landing pages, ads, and lead forms directly to HubSpot, Zoho, Google Sheets, and Slack channels in real time with zero manual copy-pasting.",
    fullDescription:
      "Fragmented data across spreadsheets, advertising accounts, and emails wastes valuable sales hours and causes leads to slip through the cracks. Our CRM & Pipeline Automation architecture unifies your inbound ecosystem. The instant a prospect fills out a website form, schedules an audit, or engages with a campaign, their profile is normalized, tagged with UTM attribution data, scored for purchase intent, and routed to the right sales executive with instant mobile alerts.",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728283/stitchbyte/blogs/tx54dycgk1b8iy5jewoj.mp4",
    videoPoster: "/process-launch.jpg",
    videoDuration: "1:15 Overview",
    metric: "100% elimination of manual entry",
    features: [
      "Instant webhook dispatch for every lead submission across all web assets",
      "Multi-channel notifications across Slack, Discord, Telegram, and Email",
      "Automated lead scoring, tagging, and territory/rep routing algorithms",
      "Full marketing attribution tracking (UTM source, medium, campaign, referrer)",
      "Automatic deduplication and database sanitation rules",
      "Two-way synchronization between Google Sheets and enterprise CRMs (HubSpot, Zoho, Salesforce)",
    ],
    architectureSteps: [
      {
        title: "Lead Capture & Sanitization",
        description:
          "Form submission payloads are validated against schema definitions and sanitized against spam or malicious inputs.",
      },
      {
        title: "Marketing Attribution Enrichment",
        description:
          "Cookies and session storage data attach UTM parameters, first-touch channels, and client IP geographic data.",
      },
      {
        title: "Parallel Multi-System Sync",
        description:
          "Parallel asynchronous workers write records to MongoDB, append rows to Google Sheets, and create CRM contacts.",
      },
      {
        title: "Executive Alert & Task Assignment",
        description:
          "A rich markdown notification ping arrives in the sales team Slack channel with one-click dial and email actions.",
      },
    ],
    businessBenefits: [
      {
        stat: "100%",
        label: "Zero Lost Leads",
        description: "Every inquiry is captured redundantly across primary database and backup cloud storage.",
      },
      {
        stat: "15 hrs",
        label: "Saved Per Week",
        description: "Eliminates repetitive data export, copy-pasting, and spreadsheet formatting across teams.",
      },
      {
        stat: "Real-Time",
        label: "Instant Alerts",
        description: "Sales representatives are alerted within seconds while lead interest is at its absolute peak.",
      },
      {
        stat: "Full",
        label: "Attribution Insight",
        description: "Clearly see which ad campaign generated each paying customer down to the exact rupee.",
      },
    ],
    techStack: [
      "HubSpot / Zoho API",
      "Google Sheets API",
      "Slack Webhooks",
      "Next.js API Routes",
      "MongoDB / Prisma",
    ],
    useCases: [
      "Marketing agency multi-client lead intake and reporting",
      "Real Estate broker lead distribution across site agents",
      "High-ticket consulting consultation booking and CRM enrichment",
      "B2B enterprise quote requests and automated RFQ pipeline management",
    ],
  },
  {
    id: "docs",
    slug: "docs",
    title: "Document & Invoice Extraction",
    tagline: "Cognitive Vision & OCR Processing",
    shortDescription:
      "Automatically parse invoices, purchase orders, contracts, and PDFs, converting unstructured paper or image files into clean, structured JSON in your database.",
    fullDescription:
      "Manual data entry from invoices, bills, shipping manifests, and PDF documents is slow, error-prone, and expensive. Our Document & Invoice Extraction pipelines leverage multimodal cognitive AI and advanced optical character recognition (OCR) to read arbitrary layout formats. The system identifies invoice dates, vendor GSTIN, line-item breakdowns, tax percentages, and grand totals, transforming unstructured documents into clean database records and pushing them directly to your ERP or accounting ledger.",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728346/stitchbyte/blogs/f2sksk826vsm1iiyx41n.mp4",
    videoPoster: "/process-design.jpg",
    videoDuration: "2:05 Walkthrough",
    metric: "15x faster than manual bookkeeping",
    features: [
      "Intelligent field extraction (line items, HSN/SAC codes, tax, GSTIN, totals)",
      "Automated mathematical reconciliation against existing purchase orders",
      "Direct integration with ERPs, Tally, Zoho Books, and relational databases",
      "Multi-format support: PDF, scanned PNG, JPEG, TIFF, and multi-page receipts",
      "Anomaly detection flagging unexpected price variances or duplicate invoices",
      "Audit trail logging with raw document attachment archiving in secure cloud buckets",
    ],
    architectureSteps: [
      {
        title: "Document Upload & Pre-processing",
        description:
          "Incoming documents are normalized, auto-rotated, and de-skewed for optimal optical reading.",
      },
      {
        title: "Multimodal Vision Analysis",
        description:
          "Advanced vision models extract tabular columns, key-value pairs, and handwriting with spatial context.",
      },
      {
        title: "Validation & Arithmetic Checks",
        description:
          "Line item sums are verified against invoice totals and tax calculations to guarantee accounting accuracy.",
      },
      {
        title: "ERP Ledger Insertion",
        description:
          "Approved records are synced directly into accounting software via API, archiving the source file in AWS S3.",
      },
    ],
    businessBenefits: [
      {
        stat: "15x",
        label: "Processing Speed",
        description: "Invoices processed in 10 seconds compared to 5-10 minutes of manual keyboard entry.",
      },
      {
        stat: "99.8%",
        label: "Extraction Accuracy",
        description: "Eliminates typos, transposed decimal numbers, and missed supplier discount terms.",
      },
      {
        stat: "80%",
        label: "Labor Cost Savings",
        description: "Enables accounting teams to transition from data keyers to strategic financial analysts.",
      },
      {
        stat: "Zero",
        label: "Backlog",
        description: "Instantly process batches of hundreds of vendor bills during month-end closing without delays.",
      },
    ],
    techStack: [
      "Google Cloud Document AI",
      "OpenAI Vision / Gemini Multimodal",
      "Python & PyPDF",
      "AWS S3 Cloud Storage",
      "PostgreSQL / MongoDB",
    ],
    useCases: [
      "Wholesale distributors processing hundreds of incoming vendor bills daily",
      "Logistics firms extracting data from bills of lading and transport receipts",
      "Hospital billing and insurance claim verification pipelines",
      "Legal firm contract clause comparison and key date extraction",
    ],
  },
  {
    id: "custom-apis",
    slug: "custom-apis",
    title: "Custom Webhook & API Mesh",
    tagline: "Bespoke System Glue",
    shortDescription:
      "Custom microservices that bridge legacy software, payment gateways (Razorpay, Stripe), internal dashboards, and cloud services without vendor lock-in.",
    fullDescription:
      "When off-the-shelf tools can't talk to each other, our Custom Webhook & API Mesh bridges the gap. We build high-throughput, fault-tolerant middleware services tailored specifically to your data contracts. From synchronizing inventory between multiple warehouses and storefronts to managing Razorpay webhook payment reconciliations with automatic retries, our engineers write resilient code that keeps your business running smoothly without fragile no-code workarounds.",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728230/stitchbyte/blogs/sfvcj6wmonfra3tezpr6.mp4",
    videoPoster: "/process-dev.jpg",
    videoDuration: "1:30 Architecture",
    metric: "99.99% webhook delivery guarantee",
    features: [
      "Serverless background workers with automatic exponential backoff retries",
      "Cryptographic webhook verification (Razorpay, Stripe, Shopify, Cashfree)",
      "Real-time event streaming via WebSocket / Server-Sent Events (SSE)",
      "Centralized error telemetry and alerting via Sentry and Slack pings",
      "Complete REST & GraphQL endpoint scaffolding with automated OpenAPI specs",
      "100% full source code ownership deployed to your private AWS/GCP/Vercel infra",
    ],
    architectureSteps: [
      {
        title: "Ingress & HMAC Authentication",
        description:
          "Webhooks are authenticated using secret keys before entering the processing queue.",
      },
      {
        title: "Message Queueing (RabbitMQ / Redis)",
        description:
          "Surges in traffic are safely queued in memory, isolating downstream databases from traffic spikes.",
      },
      {
        title: "Transformation & Business Logic",
        description:
          "Data payloads are transformed into destination schema formats with custom validation rules.",
      },
      {
        title: "Egress & Idempotent Sync",
        description:
          "Data is delivered to destination APIs with idempotency keys ensuring transactions never execute twice.",
      },
    ],
    businessBenefits: [
      {
        stat: "99.99%",
        label: "Delivery Uptime",
        description: "Zero dropped orders or lost customer transactions even during peak server load.",
      },
      {
        stat: "0",
        label: "Vendor Lock-In",
        description: "Clean TypeScript and Python microservices hosted on your own cloud accounts.",
      },
      {
        stat: "Sub-50ms",
        label: "Execution Latency",
        description: "Blazing fast serverless edge execution keeping client applications responsive.",
      },
      {
        stat: "Infinite",
        label: "Customizability",
        description: "Unlimited freedom to build custom workflows that standard SaaS tools cannot handle.",
      },
    ],
    techStack: [
      "TypeScript & Node.js",
      "FastAPI & Python",
      "Redis Queue / BullMQ",
      "Docker & Cloudflare Workers",
      "PostgreSQL / MongoDB",
    ],
    useCases: [
      "Cross-channel inventory synchronization between Shopify, Amazon, and ERPs",
      "Automated payment reconciliation for custom subscription billing models",
      "Legacy SQL database syncing to modern Next.js client portals",
      "Internal notification bots aggregating multi-branch performance metrics",
    ],
  },
  {
    id: "growth",
    slug: "growth",
    title: "Marketing & Ad Automations",
    tagline: "Programmatic Lead Generation",
    shortDescription:
      "Automated audience sync between Meta/Google Ads and your customer lists, automated review collection sequences, and dynamic retargeting flows.",
    fullDescription:
      "Modern growth marketing requires continuous data feedback between customer actions and advertising algorithms. Our Marketing & Ad Automation pipelines implement server-side Meta Conversions API (CAPI), Google Enhanced Conversions, and automatic customer audience synchronization. The instant an offline or online conversion takes place, the signal is transmitted back to Meta and Google, training the algorithm to acquire higher-quality customers while lowering your cost per acquisition (CPA).",
    videoUrl:
      "https://res.cloudinary.com/dp1fwjv9e/video/upload/v1787728136/stitchbyte/blogs/g3mhltvai7bjp2qtyg32.mp4",
    videoPoster: "/process-launch.jpg",
    videoDuration: "1:40 Walkthrough",
    metric: "3.2x higher lead-to-call conversion",
    features: [
      "Server-side Meta Conversions API (CAPI) implementation bypassing ad blockers",
      "Google Ads Offline Conversion Tracking (OCT) sync for closed deals",
      "Automated post-purchase Google Review and testimonial request workflows",
      "Dynamic WhatsApp cart recovery and re-engagement messaging sequences",
      "Daily executive ROI summary digests delivered automatically to private channels",
      "Audience list deduplication keeping lookalike audiences fresh and accurate",
    ],
    architectureSteps: [
      {
        title: "Conversion Event Capture",
        description:
          "Form fills, checkouts, and qualified phone calls trigger an event with hashed customer identifiers.",
      },
      {
        title: "Server-Side Dispatch (CAPI / OCT)",
        description:
          "Events are forwarded directly to Meta and Google servers with 100% event match quality scores.",
      },
      {
        title: "Dynamic Retargeting Sequences",
        description:
          "Unconverted leads receive personalized follow-up sequences via WhatsApp and targeted ads.",
      },
      {
        title: "Automated Reporting",
        description:
          "Key ROAS and CPA metrics are aggregated into automated Slack reports and executive dashboards.",
      },
    ],
    businessBenefits: [
      {
        stat: "35%",
        label: "Lower Ad CPA",
        description: "Accurate server-side conversion signals help ad algorithms find high-intent buyers faster.",
      },
      {
        stat: "+40%",
        label: "Event Match Quality",
        description: "Recovers lost conversion attribution caused by iOS privacy updates and browser ad-blockers.",
      },
      {
        stat: "Automated",
        label: "Review Ingestion",
        description: "Consistently collects 5-star Google and site reviews without sales reps manually asking.",
      },
      {
        stat: "Real-Time",
        label: "ROI Transparency",
        description: "Daily automated insights so leadership knows exact marketing returns every morning.",
      },
    ],
    techStack: [
      "Meta Conversions API (CAPI)",
      "Google Ads API",
      "WhatsApp Cloud API",
      "Node.js / Cloud Functions",
      "Segment / Custom Webhooks",
    ],
    useCases: [
      "D2C brands overcoming signal loss to scale profitable Meta ad spend",
      "Local service businesses driving automated 5-star Google review collection",
      "B2B lead generation companies tracking offline deals back to initial ad clicks",
      "E-commerce stores automating cart abandonment recovery via WhatsApp",
    ],
  },
];
