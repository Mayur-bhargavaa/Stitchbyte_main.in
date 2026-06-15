"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Globe,
  Linkedin,
  Twitter,
  ArrowLeft,
  CheckCircle,
  Loader2,
  MessageSquare,
  Clock,
  Users,
  Sparkles,
  Instagram,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@stitchbyte.in",
      href: "mailto:info@stitchbyte.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 94142 92675",
      href: "tel:+919414292675",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Alwar, Rajasthan, Delhi NCR",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: (props: React.ComponentProps<"svg">) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: "https://wa.me/919414292675",
      label: "WhatsApp",
    },
    { icon: Linkedin, href: "https://www.linkedin.com/company/stitchbyte1", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/stitchbyte/", label: "Instagram" },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Focused Discovery",
      description: "Share your goals for SEO, web, or UX/UI and we map next steps",
    },
    {
      icon: Users,
      title: "Cross-Functional Team",
      description: "Work with strategists, developers, and designers in one flow",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Get clear timelines and practical execution from day one",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Global Grid Background - Same as Home Page */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '240px 240px'
        }}
      />

      {/* Decorative Corner Elements - Same as Home Page */}
      <div className="fixed top-20 left-10 w-40 h-40 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-3xl rotate-12 opacity-40" />
        <div className="absolute top-4 left-4 w-full h-full border border-gray-300 rounded-3xl rotate-12 opacity-30" />
      </div>
      <div className="fixed bottom-32 right-10 w-32 h-32 z-0 pointer-events-none">
        <div className="w-full h-full border border-gray-200 rounded-full opacity-40" />
        <div className="absolute top-3 left-3 w-full h-full border border-gray-300 rounded-full opacity-30" />
      </div>
      <div className="fixed top-1/3 right-20 w-4 h-4 bg-gray-900 rounded-full opacity-20 z-0 pointer-events-none" />
      <div className="fixed top-1/2 left-16 w-3 h-3 bg-gray-900 rounded-full opacity-15 z-0 pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-2 h-2 bg-gray-900 rounded-full opacity-10 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6 border border-gray-200">
            <Mail className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Let's Talk
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us what you need — SEO growth, digital presence, web development, or UX/UI improvements.
            We&apos;ll guide you with a clear plan and practical execution.
          </p>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Your Goals</h2>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thanks for reaching out. Our team will get back with next steps soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                          placeholder="9876543210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                          placeholder="SEO, website, UX/UI, or digital growth support"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none"
                        placeholder="Share your business goals, current challenges, and what outcome you want..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <div className="bg-white border border-gray-200 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white border border-gray-200 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h2>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                    >
                      <social.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white border border-gray-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Office Hours</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-medium text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Our Jaipur Digital Agency
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Are you ready to transform your business's digital presence? Partnering with the right digital agency is a critical decision that directly impacts your brand's growth and revenue. StitchByte is a premier digital agency proudly operating in the Jaipur and larger Rajasthan region, while seamlessly serving ambitious clients across India and globally. We specialize in comprehensive SEO optimization, highly custom web development, aggressive performance marketing, and user-centric UI/UX design. Our primary goal is helping businesses of all sizes build robust, future-proof digital foundations that drive real, highly measurable growth.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Why is it important to work with a dedicated technical partner in Jaipur? As the Jaipur market rapidly expands, relying on outdated websites and weak local search visibility will cause you to lose high-value customers to your competitors. Whether you are a dynamic local startup looking to launch your very first digital platform, an established heritage brand desperately seeking better Google search rankings, or a rapidly growing B2B business that needs a highly secure custom web application, our Jaipur-based team combines elite strategic thinking with flawless, hands-on technical execution to deliver outstanding, industry-leading results.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our engagement process is intentionally straightforward, transparent, and entirely focused on your business objectives. We don't hide behind confusing technical jargon or vague promises. First, we carefully discover your specific revenue goals and technical constraints. Next, we define a rigorous strategy encompassing SEO, development, and marketing. Then, we build the solution with absolute precision using the latest modern technologies. Finally, we relentlessly optimize the platform based on real-world user data. This means clear communication, incredibly practical timelines, and strict accountable delivery from the very first consultation all the way through to final launch.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Contacting us is the very first step toward digital dominance. Whether you need an urgent technical SEO audit, a complete website redesign, or a scalable e-commerce infrastructure, our expert consultants in Jaipur are ready to carefully evaluate your unique situation. We provide honest technical feedback and clear roadmaps so you know exactly what investment is required and precisely what return on investment you can realistically expect.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                What to Expect When You Contact Us
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Free Initial Discovery Consultation", desc: "Openly share your business goals, current bottlenecks, and technical challenges. We will rapidly assess your digital landscape and honestly recommend the most effective strategic approach — absolutely no initial commitment required." },
                  { title: "Crystal Clear Scope & Strict Timeline", desc: "Before a single line of code is written or design made, you receive a meticulously detailed scope document outlining all deliverables, key milestones, and highly realistic launch deadlines." },
                  { title: "Dedicated Expert Point of Contact", desc: "One highly experienced technical team lead personally manages your entire project end-to-end, guaranteeing consistent, clear communication and uncompromising quality across all deliverables." },
                  { title: "Comprehensive Post-Launch Support", desc: "Unlike other agencies, we do not simply disappear after your project goes live. We offer robust ongoing support, aggressive continuous SEO optimization, and proactive server maintenance packages." },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shared Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
