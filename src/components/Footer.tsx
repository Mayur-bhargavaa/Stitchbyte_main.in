"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Desktop: Flex layout with Contact left, Links right */}
                <div className="flex flex-col md:flex-row md:justify-between gap-12">
                    {/* Contact & Subscribe - Left */}
                    <div className="md:max-w-md">
                        <p className="text-gray-400 text-sm mb-1">Contact us at</p>
                        <p className="font-medium text-gray-900 mb-6">info@stitchbyte.in</p>

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
                                    <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                                        Contact
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
