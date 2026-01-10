"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
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
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@stitchbyte.in",
      href: "mailto:contact@stitchbyte.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/stitchbyte", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/stitchbyte", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/stitchbyte", label: "Twitter" },
    { icon: Globe, href: "https://stitchbyte.in", label: "Website" },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Quick Response",
      description: "We typically respond within 24 hours",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get help from our experienced team",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Reach out anytime, we're here to help",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[80%] bg-gradient-to-l from-purple-600/20 via-blue-600/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] bg-gradient-to-r from-pink-600/15 via-purple-600/15 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-2xl bg-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-tight">StitchByte</h1>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Contact Us</p>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm px-5 py-2.5 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm mb-6">
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Let&apos;s Talk
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? We&apos;d love to hear from you.
            Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">{feature.title}</h3>
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
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-gray-400">
                        Thank you for reaching out. We&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                          placeholder="How can we help?"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                          placeholder="Tell us more about your project or question..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
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
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-medium group-hover:text-purple-400 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6">Follow Us</h2>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      <span className="font-medium text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-bold">Office Hours</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="font-medium text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-500 text-sm">
                  © 2026 StitchByte. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.slice(0, 3).map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
