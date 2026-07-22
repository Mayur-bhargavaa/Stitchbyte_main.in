"use client";

import Link from "next/link";
import {
  UtensilsCrossed,
  QrCode,
  Smartphone,
  BarChart3,
  Clock,
  Users,
  ChefHat,
  Bell,
  Settings,
  ArrowRight,
  CheckCircle,
  Globe,
  Play,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Ordering",
    description: "Customers scan table QR codes to instantly access your digital menu and place orders.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Orders appear instantly in the kitchen. Track status from placed to served.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track sales, popular items, peak hours, and revenue with detailed analytics.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get notified immediately when new orders come in with sound alerts.",
  },
  {
    icon: ChefHat,
    title: "Kitchen Display",
    description: "Dedicated kitchen view for staff to manage and update order statuses.",
  },
  {
    icon: Users,
    title: "Multi-user Access",
    description: "Admin and merchant roles with different permissions and dashboards.",
  },
];

const benefits = [
  "No app download required for customers",
  "Reduce wait times by 50%",
  "Increase order accuracy",
  "Real-time menu updates",
  "Contactless ordering",
  "Detailed sales reports",
];

const howItWorks = [
  {
    step: "01",
    title: "Setup Your Menu",
    description: "Add categories and menu items with photos, prices, and descriptions.",
    icon: Settings,
  },
  {
    step: "02",
    title: "Generate QR Codes",
    description: "Create unique QR codes for each table in your restaurant.",
    icon: QrCode,
  },
  {
    step: "03",
    title: "Customers Order",
    description: "Guests scan the code, browse the menu, and place orders directly.",
    icon: Smartphone,
  },
  {
    step: "04",
    title: "Receive & Serve",
    description: "Get instant notifications, prepare orders, and track everything.",
    icon: ChefHat,
  },
];

export default function RestaurantLanding() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">QR Restaurant</span>
              <p className="text-[10px] text-black/50 uppercase tracking-[0.2em]">by StitchByte</p>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <Link 
              href="/"
              className="hidden sm:flex text-sm text-black/60 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-black/5 items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              All Apps
            </Link>
            <Link 
              href="/restaurant/signin" 
              className="text-sm px-5 py-2.5 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-black font-medium">Live Demo Available</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1]">
            <span className="block">Transform Your</span>
            <span className="block">Restaurant</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-black/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Modern QR-based ordering system that lets customers scan, browse, and order 
            directly from their phones. No app downloads, no waiting.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/restaurant/signin"
              className="group w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:bg-black/80 transition-all flex items-center justify-center gap-2"
            >
              Try Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-black text-black rounded-2xl font-semibold text-lg hover:bg-black/5 transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50%", label: "Faster Service" },
              { value: "0", label: "App Downloads" },
              { value: "99%", label: "Order Accuracy" },
              { value: "24/7", label: "Availability" },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-black/[0.02] border border-black/10 rounded-2xl">
                <div className="text-3xl font-bold text-black">
                  {stat.value}
                </div>
                <div className="text-sm text-black/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-black/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            A complete solution for modern restaurant management with powerful features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 bg-white border border-black/10 rounded-2xl hover:border-black/30 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-black/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Get started in minutes with our simple setup process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, i) => (
            <div key={i} className="relative">
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-black/10 z-0" />
              )}
              <div className="relative p-6 bg-white border border-black/10 rounded-2xl">
                <div className="text-5xl font-bold text-black/10 mb-4">{item.step}</div>
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-black/60 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-black/10">
        <div className="bg-black text-white rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose QR Restaurant?
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Join hundreds of restaurants that have modernized their ordering process 
                and improved customer satisfaction.
              </p>
              <Link
                href="/restaurant/signin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-3">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-black/10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Restaurant Management System in Alwar
            </h2>
            <p className="text-black/60 leading-relaxed mb-4">
              What is a modern restaurant management system, and why is it crucial? In today's fast-paced hospitality industry, relying on manual orders, paper menus, and disjointed kitchen operations is no longer viable. A comprehensive restaurant management system streamlines your entire workflow, from digital QR code ordering at the table to real-time kitchen displays and detailed sales analytics. At StitchByte, we provide an all-in-one software solution that empowers restaurant owners to optimize their daily operations, dramatically reduce wait times, and drastically improve order accuracy across the board.
            </p>
            <p className="text-black/60 leading-relaxed mb-4">
              Why does this matter for Alwar businesses? Alwar is a fast-growing commercial and culinary hub across the Delhi NCR region, bustling with local food enthusiasts and visitors. With cafes, fine dining establishments, and quick-service restaurants competing for attention, customer experience is everything. If your patrons have to wait 20 minutes just to place an order or receive a bill, they might not return. By adopting our advanced restaurant management system in Alwar, local restaurants can provide a frictionless, modern dining experience. It allows establishments in Alwar to handle higher foot traffic efficiently, reduce staff workload, and ultimately increase table turnover rates and profitability.
            </p>
            <p className="text-black/60 leading-relaxed mb-4">
              Our setup process is designed to be incredibly fast and straightforward. First, you create an account and easily digitize your entire menu, adding high-quality photos, descriptions, and pricing. Next, the system instantly generates unique QR codes for every single table in your establishment. You simply place these codes on your tables. When customers arrive, they scan the code with their smartphone, browse the digital menu, and place orders directly without needing to download any app. The order instantly pings the kitchen display screen, completely eliminating communication errors.
            </p>
            <p className="text-black/60 leading-relaxed">
              We also provide a powerful backend administrative dashboard. This allows restaurant managers in Alwar to track live sales, identify their best-selling dishes, and manage employee access in real-time. Whether you run a small cozy cafe or a multi-story fine dining restaurant, our platform scales with your business needs, delivering enterprise-level technology at an accessible price point, ensuring you stay ahead of the competition.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Our Core Capabilities
            </h3>
            <div className="space-y-4">
              {[
                { title: "Contactless QR Ordering", desc: "Instantly digitize your menu. Customers simply scan, browse, and order directly from their personal smartphones without downloading any applications." },
                { title: "Real-Time Kitchen Displays", desc: "Orders are instantly transmitted to digital screens in the kitchen, completely replacing messy paper tickets and ensuring high order accuracy." },
                { title: "Advanced Sales Analytics", desc: "Gain deep insights into your revenue, peak operational hours, and best-performing menu items to make data-driven business decisions." },
                { title: "Instant Staff Notifications", desc: "Your servers and kitchen staff receive immediate visual and audio alerts for new orders, modifications, or requests for the bill." },
                { title: "Multi-Role Management", desc: "Assign specific roles and permissions to managers, servers, and kitchen staff to ensure secure and organized operational workflows." },
              ].map((item) => (
                <div key={item.title} className="bg-black/[0.02] border border-black/10 rounded-xl p-5">
                  <h4 className="font-semibold text-black mb-1">{item.title}</h4>
                  <p className="text-sm text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-black/10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-black/60 mb-8 max-w-xl mx-auto">
            Try our live demo and see how QR Restaurant can streamline your operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/restaurant/signin"
              className="group px-8 py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:bg-black/80 transition-all flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-black text-black rounded-2xl font-semibold text-lg hover:bg-black/5 transition-all flex items-center gap-2"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="text-black/50 text-sm">
                © 2026 StitchByte. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-black/50 hover:text-black transition-colors">
                Home
              </Link>
              <Link href="/contact" className="text-sm text-black/50 hover:text-black transition-colors">
                Contact
              </Link>
              <Link href="/restaurant/signin" className="text-sm text-black/50 hover:text-black transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
