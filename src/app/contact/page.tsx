"use client";

import { useState, useEffect } from "react";
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

  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorText("");

    try {
      let tracking = null;
      try {
        const stored = localStorage.getItem("stitchbyte_tracking");
        if (stored) {
          tracking = JSON.parse(stored);
        }
      } catch (err) {
        console.error("Error loading tracking data:", err);
      }

      // Map subject and message to the API fields
      const messageBody = formData.subject 
        ? `[Subject: ${formData.subject}] ${formData.message}` 
        : formData.message;

      const response = await fetch('/api/enquiry', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          message: messageBody,
          tracking,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setSent(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setSent(false), 5000);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setErrorText(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const [emailText, setEmailText] = useState("");
  
  useEffect(() => {
    setEmailText("info" + "@" + "stitchbyte.in");
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: emailText || "info [at] stitchbyte.in",
      href: emailText ? `mailto:${emailText}` : "#",
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 text-center leading-[1.1] mb-6">
            Let&apos;s Talk
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 font-normal max-w-2xl mx-auto leading-relaxed mb-10 text-center">
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

                    {errorText && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                        {errorText}
                      </div>
                    )}

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

        {/* Shared Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
