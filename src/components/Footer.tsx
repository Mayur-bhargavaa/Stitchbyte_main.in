"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Desktop: Flex layout with Contact left, Links right */}
                <div className="flex flex-col md:flex-row md:justify-between gap-12">
                    {/* Contact & Subscribe - Left */}
                    <div className="md:max-w-md">
                        <p className="text-gray-400 text-sm mb-1">Contact us at</p>
                        <a
                            href="mailto:info&#64;stitchbyte&#46;in"
                            className="font-medium text-gray-900 mb-6 hover:text-gray-600 transition-colors block"
                        >
                            <span>info</span><span>&#64;</span><span>stitchbyte&#46;in</span>
                        </a>

                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 bg-white text-gray-900"
                            />
                            <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-8">
                            <a href="https://www.facebook.com/profile.php?id=61563772072392" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me/919414292675" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors" title="Chat on WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/stitchbyte/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/stitchbyte1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links and More Resources - Right side */}
                    <div className="flex gap-12 md:gap-16 md:ml-auto">
                        {/* Links */}
                        <div className="text-center md:text-right">
                            <p className="text-gray-400 text-sm mb-4">Links</p>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prebuilt" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Prebuilt
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/customized" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Customized
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/marketing" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Marketing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/marketing?category=seo" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        SEO
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* More Resources */}
                        <div className="text-center md:text-right">
                            <p className="text-gray-400 text-sm mb-4">More Resources</p>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Brand Name */}
            <div className="mt-16 overflow-hidden">
                <h2
                    className="text-[12vw] font-bold text-gray-100 tracking-tight leading-none text-center select-none"
                    style={{
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '-0.02em'
                    }}
                >
                    STITCHBYTE
                </h2>
            </div>
        </footer>
    );
}
