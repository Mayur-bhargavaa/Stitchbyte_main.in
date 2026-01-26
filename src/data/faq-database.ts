// StitchByte Comprehensive FAQ Database
// Covers all services, products, and offerings

export interface FAQItem {
    keywords: string[];
    question: string;
    answer: string;
    category: string;
    priority?: number; // Higher priority = checked first
}

export const FAQ_DATABASE: FAQItem[] = [
    // ========================================
    // HIGH PRIORITY - SPECIFIC QUESTIONS
    // ========================================
    {
        keywords: ["your name", "what is your name", "whats your name"],
        question: "What is your name?",
        answer: "I'm StitchBot! 🤖\n\nI'm the AI assistant for StitchByte. I'm here 24/7 to answer your questions about our services, products, pricing, and more.\n\nHow can I help you today?",
        category: "bot",
        priority: 100
    },
    {
        keywords: ["director", "founder", "ceo", "owner", "who runs", "who owns", "management", "leadership"],
        question: "Who is the director/founder?",
        answer: "StitchByte is led by a team of experienced tech professionals and entrepreneurs.\n\n👤 For specific inquiries about our leadership team or to connect with our founders, please:\n\n📧 Email: info@stitchbyte.in\n💬 Or visit our About page\n\nWe'd be happy to introduce ourselves!",
        category: "general",
        priority: 100
    },
    {
        keywords: ["how does it work", "how do you work", "how stitchbyte works", "working process"],
        question: "How does StitchByte work?",
        answer: "Here's how we work:\n\n1️⃣ **Discovery Call** - Free 30-min consultation\n2️⃣ **Proposal** - Detailed scope, timeline & pricing\n3️⃣ **Kickoff** - Start with 50% advance\n4️⃣ **Design Phase** - UI/UX mockups & approval\n5️⃣ **Development** - Building with regular updates\n6️⃣ **Testing** - QA & bug fixes\n7️⃣ **Launch** - Deployment & handover\n8️⃣ **Support** - 30-day free support\n\nSimple, transparent, and efficient! 🚀",
        category: "process",
        priority: 100
    },
    {
        keywords: ["who are you", "what are you", "are you ai", "are you bot"],
        question: "Who are you?",
        answer: "I'm StitchBot 🤖 — StitchByte's AI assistant!\n\n**My Capabilities**\n• Answer questions about our services\n• Provide pricing information\n• Explain our process\n• Help you get started\n\nI'm here 24/7 to help. Ask me anything!",
        category: "greeting",
        priority: 100
    },
    {
        keywords: ["what is stitchbyte", "tell me about stitchbyte", "about stitchbyte"],
        question: "What is StitchByte?",
        answer: "StitchByte is a full-stack digital solutions partner — a technology services firm that builds digital products and delivers consulting-grade services to businesses globally.\n\n**Our Services:**\n• Website & App Development\n• Digital Marketing\n• UI/UX Design\n• Business Automation\n\n**Our Products:**\n• WhatsApp Automation\n• Team Management Software\n• COS Leads System\n• StitchByte AI\n\nWe help startups and enterprises with digital transformation! 🚀",
        category: "general",
        priority: 95
    },
    {
        keywords: ["services", "what do you offer", "offerings", "what can you do"],
        question: "What services does StitchByte offer?",
        answer: "We offer comprehensive digital services:\n\n📱 **Development**\n• Website Development\n• Mobile App Development\n• Web App / SaaS Development\n\n📈 **Digital Marketing**\n• SEO & Performance Ads\n• Social Media Management\n• Lead Generation\n\n🎨 **Brand & UX**\n• UI/UX Design\n• Graphic Design\n• Visual Branding\n\n⚙️ **Business Tools**\n• CRM & Automation\n• Analytics Dashboards\n• Support & Maintenance",
        category: "general",
        priority: 90
    },

    // ========================================
    // GREETINGS
    // ========================================
    {
        keywords: ["hi", "hello", "hey", "hii", "hola"],
        question: "Greeting",
        answer: "Hello! 👋 Welcome to StitchByte!\n\nI'm StitchBot, your AI assistant. How can I help you today?\n\nYou can ask me about:\n• Our services\n• Pricing\n• Technologies\n• Getting started",
        category: "greeting",
        priority: 80
    },
    {
        keywords: ["good morning"],
        question: "Good morning",
        answer: "Good morning! ☀️\n\nWelcome to StitchByte. How can I assist you today?",
        category: "greeting",
        priority: 80
    },
    {
        keywords: ["good evening"],
        question: "Good evening",
        answer: "Good evening! 🌙\n\nWelcome to StitchByte. What can I help you with?",
        category: "greeting",
        priority: 80
    },
    {
        keywords: ["how are you", "how r u"],
        question: "How are you?",
        answer: "I'm doing great, thank you for asking! 😊\n\nI'm StitchBot, always ready to help.\n\nHow can I assist you with your digital needs today?",
        category: "greeting",
        priority: 80
    },

    // ========================================
    // GENERAL COMPANY INFORMATION
    // ========================================
    {
        keywords: ["different", "unique", "why choose", "special", "better"],
        question: "What makes StitchByte different?",
        answer: "What sets us apart:\n\n✅ **Full-Stack Expertise** - From design to deployment\n✅ **Hybrid Model** - Custom projects + ready products\n✅ **Scalable Solutions** - Built for growth\n✅ **Measurable Outcomes** - Focus on ROI\n✅ **24/7 Support** - Always available\n✅ **Global Experience** - Worked with 50+ clients worldwide",
        category: "general"
    },
    {
        keywords: ["location", "where", "based", "office", "headquarters", "address"],
        question: "Where is StitchByte located?",
        answer: "StitchByte operates globally with remote-first teams. We serve clients across India, USA, UK, Middle East, and beyond. Our core team is based in India. 🌍",
        category: "general"
    },
    {
        keywords: ["team size", "employees", "staff", "how many people"],
        question: "How big is the StitchByte team?",
        answer: "We're a lean, expert team of designers, developers, and strategists. Our core team includes full-stack developers, UI/UX designers, digital marketers, and project managers — all focused on delivering excellence. 👨‍💻👩‍💻",
        category: "general"
    },
    {
        keywords: ["contact", "reach", "email", "phone", "talk", "call me"],
        question: "How can I contact StitchByte?",
        answer: "📧 **Email**: info@stitchbyte.in\n📞 **Phone**: Available on request\n💬 **Chat**: Right here!\n🌐 **Website**: Visit our Contact page\n\nWe typically respond within 24 hours!",
        category: "general",
        priority: 75
    },
    {
        keywords: ["industries", "sectors", "verticals"],
        question: "What industries do you work with?",
        answer: "We work across diverse industries:\n\n🛒 E-commerce & Retail\n🍽️ Food & Hospitality\n💎 Luxury & Fashion\n📊 Finance & Trading\n🏥 Healthcare\n📚 Education & EdTech\n🏢 Enterprise & B2B\n🚀 Startups & SMBs",
        category: "general"
    },

    // ========================================
    // WEBSITE DEVELOPMENT
    // ========================================
    {
        keywords: ["website", "web development", "build website", "create website"],
        question: "Do you build websites?",
        answer: "Yes! We create stunning, responsive websites:\n\n✅ Custom design & development\n✅ SEO-optimized structure\n✅ CMS integration (WordPress, etc.)\n✅ Analytics & tracking setup\n✅ Performance optimization\n✅ Security features\n✅ Mobile-responsive design\n\nFrom landing pages to full e-commerce stores!",
        category: "website"
    },
    {
        keywords: ["website cost", "website price", "how much website"],
        question: "How much does a website cost?",
        answer: "Website pricing depends on complexity:\n\n💼 **Landing Page**: ₹15,000 - ₹30,000\n🏢 **Business Website**: ₹40,000 - ₹80,000\n🛒 **E-commerce**: ₹80,000 - ₹2,00,000+\n⚡ **Custom Web App**: ₹1,50,000+\n\nGet a custom quote by describing your project!",
        category: "website",
        priority: 70
    },
    {
        keywords: ["website time", "website timeline", "how long website"],
        question: "How long does it take to build a website?",
        answer: "Typical website timelines:\n\n📄 **Landing Page**: 3-5 days\n🏢 **Business Website**: 1-2 weeks\n🛒 **E-commerce Store**: 3-4 weeks\n⚡ **Complex Web App**: 4-8 weeks\n\nTimelines vary based on content readiness and revisions.",
        category: "website"
    },
    {
        keywords: ["wordpress", "cms"],
        question: "Do you work with WordPress?",
        answer: "Yes! We're WordPress experts:\n\n✅ Custom WordPress themes\n✅ WooCommerce stores\n✅ Plugin development\n✅ Speed optimization\n✅ Security hardening\n✅ Ongoing maintenance\n\nWe also work with Webflow, Shopify, and custom CMS solutions.",
        category: "website"
    },
    {
        keywords: ["responsive", "mobile friendly"],
        question: "Are your websites mobile-friendly?",
        answer: "Absolutely! All our websites are:\n\n📱 **100% Responsive** - Works on all devices\n⚡ **Fast Loading** - Optimized for mobile networks\n👆 **Touch-Friendly** - Easy navigation\n📊 **Mobile-First** - Designed for mobile users first",
        category: "website"
    },
    {
        keywords: ["seo", "search engine", "google ranking"],
        question: "Do you optimize websites for SEO?",
        answer: "Yes! SEO is built into every website:\n\n🔍 **On-Page SEO**\n• Meta tags & descriptions\n• Header structure\n• Image optimization\n• Schema markup\n\n⚡ **Technical SEO**\n• Fast loading speeds\n• Mobile optimization\n• Clean URLs\n• Sitemap & robots.txt",
        category: "website"
    },
    {
        keywords: ["ecommerce", "online store", "shop", "sell online"],
        question: "Can you build an e-commerce store?",
        answer: "Yes! We build complete e-commerce solutions:\n\n🛒 **Features**\n• Product catalog & categories\n• Shopping cart & checkout\n• Payment gateway integration\n• Inventory management\n• Order tracking\n\n**Platforms**: Custom, Shopify, WooCommerce\n**Payment**: Razorpay, Stripe, PayPal, UPI",
        category: "website"
    },

    // ========================================
    // MOBILE APP DEVELOPMENT
    // ========================================
    {
        keywords: ["mobile app", "app development", "android app", "ios app", "build app"],
        question: "Do you build mobile apps?",
        answer: "Yes! We develop mobile apps for:\n\n📱 **Android** - Native Java/Kotlin\n🍎 **iOS** - Native Swift\n🔄 **Cross-Platform** - React Native, Flutter\n\n**Features We Build**\n• User authentication\n• Push notifications\n• Payment integration\n• Real-time features\n• Offline support\n• App Store submission",
        category: "mobile"
    },
    {
        keywords: ["app cost", "app price", "how much app"],
        question: "How much does a mobile app cost?",
        answer: "Mobile app pricing:\n\n📱 **Simple App**: ₹80,000 - ₹1,50,000\n🏢 **Business App**: ₹1,50,000 - ₹3,00,000\n🚀 **Complex App**: ₹3,00,000 - ₹8,00,000+\n\nFactors: Features, platforms, integrations, design complexity.\n\nShare your idea for a custom quote!",
        category: "mobile",
        priority: 70
    },
    {
        keywords: ["app time", "app timeline", "how long app"],
        question: "How long does it take to build an app?",
        answer: "App development timelines:\n\n📱 **MVP/Simple App**: 4-8 weeks\n🏢 **Standard App**: 8-12 weeks\n🚀 **Complex App**: 12-24 weeks\n\nIncludes design, development, testing, and deployment.",
        category: "mobile"
    },
    {
        keywords: ["react native", "flutter", "cross platform"],
        question: "Do you use React Native or Flutter?",
        answer: "Yes! We're experts in both:\n\n⚛️ **React Native**\n• JavaScript-based\n• Code reuse with web\n• Large ecosystem\n\n🐦 **Flutter**\n• Dart-based\n• Beautiful UIs\n• Fast performance\n\n**Recommendation**: React Native for web synergy, Flutter for pixel-perfect design.",
        category: "mobile"
    },

    // ========================================
    // SAAS / WEB APP
    // ========================================
    {
        keywords: ["web app", "saas", "software", "custom software"],
        question: "Do you build SaaS/web applications?",
        answer: "Yes! We specialize in SaaS & web apps:\n\n🚀 **What We Build**\n• Custom enterprise apps\n• SaaS platforms\n• Admin dashboards\n• Customer portals\n• Internal tools\n• API development\n\n**Tech Stack**: React, Next.js, Node.js, Python, PostgreSQL, MongoDB, AWS",
        category: "saas"
    },
    {
        keywords: ["mvp", "minimum viable product", "prototype"],
        question: "Can you build an MVP?",
        answer: "Absolutely! MVPs are our specialty:\n\n🎯 **MVP Approach**\n• Focus on core features only\n• Faster time to market\n• Lower initial investment\n• Real user feedback\n• Iterative improvement\n\n**Timeline**: 4-8 weeks\n**Investment**: Starting ₹2,00,000\n\nPerfect for startups validating ideas!",
        category: "saas"
    },
    {
        keywords: ["api", "integration", "third party"],
        question: "Can you integrate third-party APIs?",
        answer: "Yes! We integrate with any API:\n\n🔗 **Common Integrations**\n• Payment gateways (Razorpay, Stripe)\n• CRMs (Salesforce, HubSpot)\n• Email (SendGrid, Mailchimp)\n• SMS (Twilio, MSG91)\n• Maps (Google Maps)\n• Social logins\n• Analytics\n• AI/ML APIs\n\nWe also build custom APIs!",
        category: "saas"
    },

    // ========================================
    // DIGITAL MARKETING
    // ========================================
    {
        keywords: ["digital marketing", "marketing", "promote"],
        question: "Do you offer digital marketing?",
        answer: "Yes! Complete digital marketing services:\n\n🔍 **SEO** - Organic search ranking\n💰 **Paid Ads** - Google, Facebook, Instagram\n📱 **Social Media** - Management & growth\n📧 **Email Marketing** - Campaigns & automation\n🎯 **Lead Generation** - Funnel optimization\n\nWe focus on measurable ROI!",
        category: "marketing"
    },
    {
        keywords: ["google ads", "facebook ads", "paid ads", "ppc"],
        question: "Do you run paid advertising campaigns?",
        answer: "Yes! We manage paid advertising:\n\n💰 **Platforms**\n• Google Ads (Search, Display, Shopping)\n• Facebook & Instagram Ads\n• LinkedIn Ads\n• YouTube Ads\n\n**Our Approach**\n• Audience targeting\n• Ad creative design\n• A/B testing\n• Conversion tracking\n• ROI optimization\n\nMinimum ad spend: ₹15,000/month",
        category: "marketing"
    },
    {
        keywords: ["social media", "instagram", "facebook", "linkedin"],
        question: "Do you manage social media?",
        answer: "Yes! Social media management includes:\n\n📱 **Platforms**\n• Instagram\n• Facebook\n• LinkedIn\n• Twitter/X\n\n**Services**\n• Content strategy\n• Post design & scheduling\n• Community management\n• Analytics & reporting\n• Growth strategies\n\nPackages start at ₹15,000/month.",
        category: "marketing"
    },
    {
        keywords: ["lead generation", "leads", "sales funnel"],
        question: "Can you help with lead generation?",
        answer: "Absolutely! Lead generation services:\n\n🎯 **What We Do**\n• Landing page creation\n• Lead magnet design\n• Funnel optimization\n• CRM integration\n• Email sequences\n• Retargeting campaigns\n\n**Result**: Qualified leads for your sales team!",
        category: "marketing"
    },

    // ========================================
    // UI/UX & DESIGN
    // ========================================
    {
        keywords: ["design", "ui", "ux", "user interface"],
        question: "Do you offer UI/UX design?",
        answer: "Yes! Complete design services:\n\n🎨 **UI/UX Design**\n• User research\n• Wireframing\n• Prototyping\n• Visual design\n• Interaction design\n• Usability testing\n\n**Tools**: Figma, Adobe XD, Sketch\n\nDesign-first approach for all projects!",
        category: "design"
    },
    {
        keywords: ["logo", "branding", "brand identity"],
        question: "Do you create logos and branding?",
        answer: "Yes! Brand identity services:\n\n🎨 **Logo Design**\n• Custom logo concepts\n• Multiple revisions\n• All file formats\n\n📋 **Brand Identity**\n• Color palette\n• Typography\n• Brand guidelines\n• Stationery design\n\n**Starting at**: ₹15,000 for logo\n**Full Branding**: ₹40,000+",
        category: "design"
    },
    {
        keywords: ["figma", "prototype", "mockup", "wireframe"],
        question: "Do you create Figma prototypes?",
        answer: "Yes! We're Figma experts:\n\n✏️ **What We Deliver**\n• Wireframes (low-fidelity)\n• High-fidelity mockups\n• Interactive prototypes\n• Design systems\n• Component libraries\n\nPrototypes help visualize before development!",
        category: "design"
    },

    // ========================================
    // STITCHBYTE PRODUCTS
    // ========================================
    {
        keywords: ["products", "tools", "software products"],
        question: "What products does StitchByte offer?",
        answer: "Our ready-to-use products:\n\n📱 **WhatsApp Automation** - CRM workflow via WhatsApp\n👥 **Team Management Software** - Task & team tracking\n📊 **COS Leads System** - Lead management platform\n📧 **Mail Service** - Professional email hosting\n🤖 **StitchByte AI** - Smart document assistant\n📚 **Learning Guides** - Expert resources\n\nProducts offer faster implementation!",
        category: "products"
    },
    {
        keywords: ["whatsapp automation", "whatsapp business"],
        question: "Do you offer WhatsApp automation?",
        answer: "Yes! Our WhatsApp Automation product:\n\n📱 **Features**\n• Automated responses\n• Broadcast messages\n• CRM integration\n• Order notifications\n• Lead capture\n• Chatbot flows\n\nPerfect for: E-commerce, support, marketing!\n\nContact us for pricing.",
        category: "products"
    },
    {
        keywords: ["team management", "task management", "project management"],
        question: "Tell me about Team Management Software",
        answer: "Our Team Management Software:\n\n👥 **Features**\n• Centralized task tracking\n• Team collaboration\n• Project timelines\n• Time tracking\n• Performance analytics\n• Mobile app\n\n**Best For**: Agencies, remote teams, growing startups\n\nContact us for demo & pricing!",
        category: "products"
    },
    {
        keywords: ["cos", "leads management", "lead tracking"],
        question: "What is COS Leads Management System?",
        answer: "COS - Complete Leads Management:\n\n📊 **Features**\n• Lead capture forms\n• Pipeline management\n• Lead scoring\n• Follow-up reminders\n• Team assignments\n• Analytics dashboard\n• Email integration\n\n**Perfect For**: Sales teams, agencies, B2B businesses\n\nRequest a demo!",
        category: "products"
    },
    {
        keywords: ["stitchbyte ai", "ai tool", "document assistant"],
        question: "What is StitchByte AI?",
        answer: "StitchByte AI - Smart Document Assistant:\n\n🤖 **Capabilities**\n• Upload any document\n• Ask questions in natural language\n• Get instant answers\n• Summarize long documents\n• Extract key insights\n\n**Use Cases**: Research, contracts, reports, manuals\n\nPowered by advanced NLP technology!",
        category: "products"
    },

    // ========================================
    // PRICING & PACKAGES
    // ========================================
    {
        keywords: ["pricing", "price", "cost", "rates", "charges", "how much"],
        question: "What are your pricing models?",
        answer: "We offer flexible pricing:\n\n💼 **Project-Based** - Fixed price for defined scope\n⏰ **Hourly** - Best for ongoing work\n📦 **Packages** - Pre-defined service bundles\n🔄 **Retainer** - Monthly commitment\n\n**Starting Prices**\n• Websites: ₹15,000+\n• Apps: ₹80,000+\n• Marketing: ₹15,000/month+\n\nShare your requirements for a quote!",
        category: "pricing",
        priority: 70
    },
    {
        keywords: ["payment", "payment terms", "milestone", "advance"],
        question: "What are your payment terms?",
        answer: "Our payment structure:\n\n💳 **Typical Terms**\n• 50% upfront to start\n• 25% at milestone\n• 25% on completion\n\n**Payment Methods**\n• Bank transfer\n• UPI\n• Credit/Debit cards\n• PayPal (international)\n\nFlexible terms for larger projects!",
        category: "pricing"
    },
    {
        keywords: ["free consultation", "trial", "demo"],
        question: "Do you offer free consultations?",
        answer: "Yes! We offer:\n\n🆓 **Free 30-min Consultation** - Discuss your project\n📋 **Free Proposal** - Detailed scope & estimate\n🎯 **Free Audit** - Website/marketing review\n\nNo obligation, no pressure. Let's talk!",
        category: "pricing"
    },
    {
        keywords: ["quote", "estimate", "proposal", "quotation"],
        question: "How do I get a quote?",
        answer: "Getting a quote is easy:\n\n1️⃣ **Share Requirements** - Tell us about your project\n2️⃣ **Discovery Call** - 30-min discussion\n3️⃣ **Receive Proposal** - Detailed scope & pricing\n4️⃣ **Discuss & Finalize** - Adjust as needed\n\n📧 Email: info@stitchbyte.in\n💬 Chat: Right here!\n\nWe respond within 24 hours!",
        category: "pricing"
    },

    // ========================================
    // PROCESS & METHODOLOGY
    // ========================================
    {
        keywords: ["process", "methodology", "development process"],
        question: "What is your development process?",
        answer: "Our proven process:\n\n1️⃣ **Discovery** - Understand requirements\n2️⃣ **Planning** - Define scope & timeline\n3️⃣ **Design** - UI/UX & prototypes\n4️⃣ **Development** - Build & iterate\n5️⃣ **Testing** - QA & bug fixes\n6️⃣ **Launch** - Deploy & go live\n7️⃣ **Support** - Ongoing maintenance\n\nTransparent communication throughout!",
        category: "process"
    },
    {
        keywords: ["agile", "scrum", "sprint"],
        question: "Do you follow Agile methodology?",
        answer: "Yes! We practice Agile:\n\n🔄 **What This Means**\n• 2-week sprints\n• Regular demos\n• Quick iterations\n• Flexible changes\n• Continuous delivery\n\n**Benefits**: Faster delivery, better quality, fewer surprises!",
        category: "process"
    },
    {
        keywords: ["communication", "updates", "meetings"],
        question: "How do you communicate during projects?",
        answer: "Transparent communication:\n\n💬 **Channels**\n• Slack/WhatsApp for quick updates\n• Email for formal communication\n• Weekly video calls\n• Project management tools\n\n📊 **Regular Updates**\n• Daily progress updates\n• Weekly demos\n• Sprint reviews\n\nYou'll always know what's happening!",
        category: "process"
    },

    // ========================================
    // SUPPORT & MAINTENANCE
    // ========================================
    {
        keywords: ["support", "help", "assistance"],
        question: "What support do you offer?",
        answer: "Comprehensive support options:\n\n🛠️ **Post-Launch Support**\n• 30-day free bug fixes\n• Training & documentation\n\n📅 **AMC (Annual Maintenance)**\n• Priority support\n• Security updates\n• Performance monitoring\n• Regular backups\n\n🚨 **24/7 Emergency**\n• Available for critical issues\n\nWe don't disappear after delivery!",
        category: "support"
    },
    {
        keywords: ["warranty", "guarantee", "bug fix"],
        question: "Do you offer warranty on projects?",
        answer: "Yes! Quality guarantee:\n\n✅ **30-Day Warranty**\n• Free bug fixes\n• No extra charges\n• Quick response\n\n**What's Covered**\n• Bugs in delivered features\n• Performance issues\n• Browser compatibility\n\n**Not Covered**\n• New features\n• Changes after approval\n• Third-party issues",
        category: "support"
    },
    {
        keywords: ["maintenance", "amc", "annual contract"],
        question: "Do you offer maintenance contracts?",
        answer: "Yes! AMC packages available:\n\n📦 **Basic AMC** - ₹10,000/month\n• Bug fixes\n• Security updates\n• 8-hour response\n\n📦 **Premium AMC** - ₹25,000/month\n• All Basic features\n• Performance optimization\n• 4-hour response\n• Monthly reports\n\n📦 **Enterprise** - Custom pricing\n• Dedicated support\n• SLA guarantee\n• 24/7 availability",
        category: "support"
    },

    // ========================================
    // TECHNOLOGY & STACK
    // ========================================
    {
        keywords: ["technology", "tech stack", "languages", "framework"],
        question: "What technologies do you use?",
        answer: "Our modern tech stack:\n\n💻 **Frontend**\n• React, Next.js, Vue.js\n• TypeScript, JavaScript\n• Tailwind CSS\n\n⚙️ **Backend**\n• Node.js, Python, Java\n• Express, FastAPI, Django\n\n🗄️ **Database**\n• PostgreSQL, MongoDB\n• Redis, Firebase\n\n☁️ **Cloud**\n• AWS, GCP, Azure\n• Vercel, DigitalOcean",
        category: "technology"
    },
    {
        keywords: ["react", "next.js", "frontend"],
        question: "Do you work with React/Next.js?",
        answer: "Absolutely! React is our primary frontend:\n\n⚛️ **React Expertise**\n• Complex web applications\n• State management (Redux, Zustand)\n• Performance optimization\n\n▲ **Next.js**\n• Server-side rendering\n• Static generation\n• API routes\n• SEO-friendly apps\n\nWe've built 50+ React/Next.js projects!",
        category: "technology"
    },

    // ========================================
    // COMMON QUESTIONS
    // ========================================
    {
        keywords: ["start", "get started", "first step", "begin"],
        question: "How do I get started?",
        answer: "Getting started is simple:\n\n1️⃣ **Tell Us Your Idea**\n• Email: info@stitchbyte.in\n• Chat: Right here\n• Contact form\n\n2️⃣ **Free Consultation**\n• 30-min discovery call\n• Understand your needs\n\n3️⃣ **Get Proposal**\n• Detailed scope\n• Timeline & pricing\n\n4️⃣ **Start Building**\n• Kick-off meeting\n• Begin development\n\nLet's turn your idea into reality! 🚀",
        category: "general",
        priority: 75
    },
    {
        keywords: ["startup", "early stage", "new business"],
        question: "Do you work with startups?",
        answer: "Absolutely! We love startups:\n\n🚀 **Startup Services**\n• MVP development\n• Rapid prototyping\n• Launch strategy\n• Growth marketing\n\n💰 **Startup-Friendly**\n• Flexible pricing\n• Phased approach\n• Equity discussions possible\n\nMany of our clients are first-time founders!",
        category: "general"
    },
    {
        keywords: ["enterprise", "corporate", "large company"],
        question: "Do you work with enterprises?",
        answer: "Yes! Enterprise services:\n\n🏢 **What We Offer**\n• Custom software development\n• Digital transformation\n• Integration projects\n• Dedicated teams\n\n📋 **Enterprise Features**\n• SLA guarantees\n• Compliance support\n• Security audits\n• 24/7 support\n\nWe've worked with Fortune 500 companies!",
        category: "general"
    },
    {
        keywords: ["portfolio", "examples", "case study", "previous work"],
        question: "Can I see your portfolio?",
        answer: "Yes! Our work includes:\n\n🛒 **E-commerce**: Lal Sweets, Kirtilals Jewellery\n📊 **Fintech**: Tradescribe Trading Platform\n👗 **Fashion**: Murzban Luxury Store\n\n**Visit our website** for full case studies with:\n• Project details\n• Challenges solved\n• Results achieved\n\nWe can share relevant examples for your industry!",
        category: "general"
    },
    {
        keywords: ["testimonial", "review", "feedback"],
        question: "Do you have client testimonials?",
        answer: "Yes! Our clients say:\n\n⭐ *\"StitchByte delivered beyond expectations. The app looks amazing and works flawlessly.\"*\n\n⭐ *\"Their team understood our vision perfectly. Highly recommended!\"*\n\n⭐ *\"Fast, professional, and great communication throughout.\"*\n\n99% client satisfaction rate! 🎉",
        category: "general"
    },
    {
        keywords: ["nda", "confidential", "privacy"],
        question: "Do you sign NDAs?",
        answer: "Yes, confidentiality is important:\n\n🔒 **We Offer**\n• Standard NDA signing\n• Client data protection\n• Secure communication\n• Code ownership transfer\n\nYour ideas are safe with us!",
        category: "general"
    },
    {
        keywords: ["ownership", "source code", "rights"],
        question: "Who owns the code after project completion?",
        answer: "Full ownership to you:\n\n✅ **You Get**\n• Complete source code\n• All design files\n• Documentation\n• Full IP rights\n• No hidden licensing\n\n**Post-Project**\n• Host anywhere\n• Modify freely\n• No ongoing fees*\n\n*Except for SaaS/product licenses",
        category: "general"
    },
    {
        keywords: ["thanks", "thank you", "great", "awesome"],
        question: "Thanks!",
        answer: "You're welcome! 🙏\n\nIs there anything else I can help you with?\n\nFeel free to ask about:\n• Our services\n• Pricing\n• Getting started\n• Technical questions\n\nI'm here to help! 😊",
        category: "general"
    },
    {
        keywords: ["bye", "goodbye", "see you"],
        question: "Goodbye!",
        answer: "Goodbye! 👋\n\nThank you for chatting with StitchBot!\n\n📧 Reach us at: info@stitchbyte.in\n🌐 Visit: stitchbyte.in\n\nWe'd love to help bring your ideas to life. See you soon! 🚀",
        category: "general"
    },
    {
        keywords: ["expensive", "too costly", "cheaper", "discount"],
        question: "Your prices seem high",
        answer: "We understand budget matters! 💰\n\n**Why Our Pricing**\n• Senior developer talent\n• Quality over quantity\n• Comprehensive testing\n• Ongoing support\n\n**Flexible Options**\n• Phased development\n• MVP-first approach\n• Payment plans\n\nLet's discuss your budget and find a solution!",
        category: "pricing"
    }
];

// Default response when no match is found
export const DEFAULT_RESPONSE = "I'm not sure I understood that completely. Let me help you better!\n\n**Try asking about:**\n• Website or app development\n• Digital marketing\n• Our pricing\n• Project timelines\n• How to get started\n\nOr type **'contact'** to reach our team directly! 📧";

// Function to find best matching FAQ with improved algorithm
export function findBestMatch(input: string): string {
    const lowerInput = input.toLowerCase().trim();

    // Sort FAQs by priority (higher first)
    const sortedFAQs = [...FAQ_DATABASE].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    for (const faq of sortedFAQs) {
        let score = 0;
        let matchedKeywords = 0;

        for (const keyword of faq.keywords) {
            const keywordLower = keyword.toLowerCase();

            // Exact phrase match gets highest score
            if (lowerInput === keywordLower) {
                score += keyword.length * 10;
                matchedKeywords++;
            }
            // Full keyword present in input
            else if (lowerInput.includes(keywordLower)) {
                score += keyword.length * 2;
                matchedKeywords++;
            }
            // Check if all words of a multi-word keyword are present
            else if (keyword.includes(' ')) {
                const keywordWords = keywordLower.split(' ');
                const allWordsPresent = keywordWords.every(word => lowerInput.includes(word));
                if (allWordsPresent) {
                    score += keyword.length;
                    matchedKeywords++;
                }
            }
        }

        // Add priority boost
        if (faq.priority) {
            score += faq.priority * 0.1;
        }

        // Bonus for multiple keyword matches
        if (matchedKeywords >= 2) {
            score *= 1.5;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
        }
    }

    // Return best match or default
    if (bestMatch && highestScore >= 4) {
        return bestMatch.answer;
    }

    return DEFAULT_RESPONSE;
}

// Suggested quick replies
export const QUICK_REPLIES = [
    "What services do you offer?",
    "How much does a website cost?",
    "How do you work?",
    "How do I get started?"
];
