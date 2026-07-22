// StitchByte Comprehensive FAQ Database - Funky Edition
// Covers services, products, pricing, case studies, and team wizards

export interface FAQItem {
    keywords: string[];
    question: string;
    answer: string;
    category: string;
    priority?: number;
}

export const FAQ_DATABASE: FAQItem[] = [
    {
        keywords: ["name", "who are you", "what are you", "what is your name", "whats your name", "who r u", "stitchbot"],
        question: "What is your name?",
        answer: "Yo! I'm StitchBot 🤖, your resident AI rockstar here at StitchByte (or just 'Stitch' if we're cool like that)!\n\nI'm on duty 24/7 to answer your questions about our code, pricing, and magic tricks. What's cookin'?",
        category: "bot",
        priority: 100
    },
    {
        keywords: ["director", "founder", "ceo", "owner", "who runs", "who owns", "management", "leadership", "mayur", "dhruv", "mayank", "team", "people", "wizards"],
        question: "Who is the team/founder?",
        answer: "StitchByte is run by our trio of tech wizards! 🧙‍♂️✨\n\n• **Mayur Bhargava** (CEO & Founder): Our code mastermind guiding strategic vision, technology, and operations.\n• **Dhruv** (Co-founder & AI/ML Specialist): Architecting smart robots, AI integrations, and backend databases.\n• **Mayank** (Designing Head): Crafting beautiful UI design systems and conversion-friendly user experiences.\n\nWant to slide into their inbox? Share your details or write to info [at] stitchbyte.in! 🚀",
        category: "general",
        priority: 100
    },
    {
        keywords: ["what is stitchbyte", "tell me about stitchbyte", "about stitchbyte", "what is stitch", "about stitch", "stitch", "sb"],
        question: "What is StitchByte?",
        answer: "StitchByte (often called 'Stitch') is a full-stack digital solutions partner based in Alwar, Rajasthan (Delhi NCR), serving awesome clients globally.\n\nWe build websites that fly, apps that rule, designs that look absolute fire, and SEO that commands Google like a boss. 🚀\n\nWe deliver both **pre-built solutions** (for fast launches) and **custom development**, with SEO and UI/UX integrated from day one!",
        category: "general",
        priority: 95
    },
    {
        keywords: ["services", "what do you offer", "offerings", "what can you do", "skills", "tech stack", "technologies"],
        question: "What services do you offer?",
        answer: "We offer end-to-end digital firepower:\n\n📱 **Development**: High-speed websites (Next.js/React), native & hybrid Android/iOS apps (React Native/Flutter), and scalable custom SaaS platforms.\n📈 **SEO & Marketing**: Technical SEO and high-conversion paid ads (Google/Meta) to get you found.\n🎨 **UI/UX Design**: Pixel-perfect Figma design systems, wireframes, and branding.\n⚙️ **Business Tools**: CRM setup, database architecture, and performance dashboards.",
        category: "general",
        priority: 90
    },
    {
        keywords: ["case studies", "projects", "work", "portfolio", "websites you built", "what have you built", "lal sweets", "kirtilals", "tradescribe", "murzban", "clients", "portfolio"],
        question: "What projects or case studies have you done?",
        answer: "Oh, we've built some absolute masterpieces! 🏆 Here are our heavy-hitters:\n\n• 🍬 **Lal Sweets Ecom**: High-speed sweets store with smart combo building. (Tech: Next.js + MongoDB)\n• 💎 **Kirtilals Luxury**: High-end diamond jewelry portal with 1,500+ designs. (Tech: React + PostgreSQL)\n• 📈 **Tradescribe Platform**: Trading journal & AI analytics platform. (Tech: React Native + Python)\n• 👗 **Murzban Luxury**: Men's & women's designer fashion storefront. (Tech: Shopify + React)\n\nWant us to craft a masterpiece for you? Type `/quote` or hit us up! 🚀",
        category: "projects",
        priority: 95
    },
    {
        keywords: ["hi", "hello", "hey", "hii", "yo", "wassup", "greetings", "helloo"],
        question: "Greeting",
        answer: "Yo! 👋 Welcome to StitchByte!\n\nI'm StitchBot, your AI sidekick. What can I do for you today?\n\nAsk me about:\n• Our web/app services\n• Pricing & timelines\n• Our case studies (like Lal Sweets or Tradescribe)\n• How to get started",
        category: "greeting",
        priority: 85
    },
    {
        keywords: ["how does it work", "how do you work", "working process", "methodology", "steps"],
        question: "How does StitchByte work?",
        answer: "Here is our 8-step journey to launch glory:\n\n1️⃣ **Discovery Call** - A free 30-min sync to map your goals.\n2️⃣ **Proposal** - Detailed scope, timeline, and pricing (no hidden fees!).\n3️⃣ **Kickoff** - We hit the ground running upon a 50% advance.\n4️⃣ **Design Sync** - Figma mockups until you say 'wow'.\n5️⃣ **Sprint Builds** - High-speed development with regular updates.\n6️⃣ **QA Check** - Rigorous testing to squash all bugs.\n7️⃣ **Launch Day** - Deployment and full code ownership handover.\n8️⃣ **Support** - 30 days of free post-launch support.\n\nSimple, transparent, and built to scale! ⚡",
        category: "process",
        priority: 80
    },
    {
        keywords: ["website cost", "website price", "how much website", "website rates", "pricing website"],
        question: "How much does a website cost?",
        answer: "Website pricing depends on complexity. Here's the general ballpark:\n\n💼 **Landing Page**: ₹15,000 - ₹30,000\n🏢 **Business Site**: ₹40,000 - ₹80,000\n🛒 **E-commerce**: ₹80,000 - ₹2,00,000+\n⚡ **Custom Web App**: ₹1,50,000+\n\nBasically, premium engineering without selling a kidney! 😉 Drop your info for a custom quote.",
        category: "website",
        priority: 85
    },
    {
        keywords: ["app cost", "app price", "how much app", "app rates", "pricing app"],
        question: "How much does a mobile app cost?",
        answer: "App pricing depends on features and platforms (Android/iOS/Cross-platform):\n\n📱 **Simple App**: ₹80,000 - ₹1,50,000\n🏢 **Business App**: ₹1,50,000 - ₹3,00,000\n🚀 **Complex App/SaaS**: ₹3,00,000 - ₹8,00,000+\n\nWe build using React Native and Flutter for maximum speed and smooth performance. Share your idea for an estimate! 💡",
        category: "mobile",
        priority: 85
    },
    {
        keywords: ["how long", "timeline", "duration", "days", "weeks", "speed"],
        question: "What are the timelines?",
        answer: "We move fast but keep quality rock-solid:\n\n📄 **Landing Page**: 3-5 days\n🏢 **Business Website**: 1-2 weeks\n🛒 **E-commerce Store**: 3-4 weeks\n📱 **Mobile App**: 8-16 weeks\n\nNeed something deployed in 48 hours? Ask about our **Prebuilt SaaS** options! ⏱️",
        category: "process",
        priority: 75
    },
    {
        keywords: ["products", "prebuilt", "ready made", "saas tools"],
        question: "What products do you offer?",
        answer: "We have production-ready products that deploy in 48 hours:\n\n🍽️ **Restaurant Management System**: Digital menu QR ordering, analytics, and active billing dashboards.\n📱 **WhatsApp CRM & Automation**: Workflows, automated replies, and broadcasts via WhatsApp Business.\n👥 **Team Tracker**: Task assignments and team monitoring tools.\n📊 **COS Leads System**: Sales pipeline tracking for agencies.\n\nAll prebuilts come with **100% source code ownership**! 📦",
        category: "products",
        priority: 80
    },
    {
        keywords: ["location", "where", "based", "office", "alwar", "rajasthan", "address"],
        question: "Where are you located?",
        answer: "Our core tech headquarters is located in **Alwar, Rajasthan (Delhi NCR), India** 🇮🇳, operating exclusively from Alwar, while serving ambitious brands globally across the USA, Dubai, UK, and beyond! 🌍",
        category: "general",
        priority: 80
    },
    {
        keywords: ["contact", "reach", "email", "phone", "talk", "call", "whatsapp", "hire", "meeting"],
        question: "How can I contact you?",
        answer: "Let's connect! 📬\n\n📧 **Email**: info [at] stitchbyte.in\n💬 **Chat**: Right here! Drop your name and email in the form, and our humans will reach out in a jiffy.\n\nLet's build something epic! 🚀",
        category: "general",
        priority: 90
    },
    {
        keywords: ["thanks", "thank you", "great", "awesome", "perfect", "ok"],
        question: "Thanks!",
        answer: "You're welcome! You rock! 🤘✨\n\nIs there anything else I can decode for you? Ask about pricing, services, or our tech stack!",
        category: "greeting",
        priority: 70
    },
    {
        keywords: ["bye", "goodbye", "see ya", "close"],
        question: "Goodbye!",
        answer: "Catch you later! 👋\n\nWhen you're ready to dominate the digital space, write to us at info [at] stitchbyte.in. StitchBot out! 🤖⚡",
        category: "greeting",
        priority: 70
    },
    {
        keywords: ["joke", "tell me a joke", "make me laugh", "funny", "jokes"],
        question: "Tell me a joke!",
        answer: "Why did the React component break up with the HTML element?\n\nBecause it felt like it was getting too much 'plain text' and no dynamic energy! 😂\n\nOr here's another one: Why do programmers wear glasses?\n\nBecause they can't C#! 🤓\n\nNeed more laughs, or shall we talk about your next big app idea? 🚀",
        category: "fun",
        priority: 80
    }
];

export const DEFAULT_RESPONSE = "Ayy, I didn't quite catch that. My programming is cool, but sometimes I glitch! 🤖💥\n\n**Try asking me about:**\n• Our web/app services\n• The wizards behind StitchByte (Mayur, Dhruv, Mayank)\n• Our case studies (Lal Sweets, Tradescribe, etc.)\n• Ballpark pricing & timelines\n• Our Alwar location\n\nOr just type **'contact'** and I'll notify the humans!";

export const QUICK_REPLIES = [
    "What services do you offer?",
    "How much does a website cost?",
    "Who is in the team?",
    "Tell me about case studies",
    "Tell me a joke!"
];
