"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Helper to check if link is active
    const isActive = (path: string) => pathname === path;

    // Desktop nav links with Marketing and UI & UX restored
    const desktopNavLeft = [
        { href: "/prebuilt", label: "Prebuilt" },
        { href: "/customized", label: "Customized" },
        { href: "/marketing", label: "Marketing" },
    ];

    const desktopNavRight = [
        { href: "/automation", label: "Automation" },
        { href: "/work", label: "Case Studies" },
        { href: "/about", label: "About Us" },
    ];

    // Mobile nav contains all links
    const allNavLinks = [
        { href: "/prebuilt", label: "Prebuilt" },
        { href: "/customized", label: "Customized" },
        { href: "/marketing", label: "Marketing" },
        { href: "/automation", label: "Automation" },
        { href: "/work", label: "Case Studies" },
        { href: "/about", label: "About Us" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
            {/* Mobile Nav */}
            <nav className="md:hidden bg-white/95 backdrop-blur-xl border border-gray-200 rounded-full px-4 py-3 shadow-sm flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo-stitchbyte.png"
                        alt="StitchByte"
                        width={110}
                        height={30}
                        className="h-7 w-auto"
                        priority
                    />
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        href="/contact"
                        className="px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                    >
                        <span>Get a Quote</span>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Desktop Nav - Pill floating in center with Get a Quote on the right */}
            <div className="hidden md:flex items-center justify-center relative max-w-7xl mx-auto w-full">
                {/* Center Pill Navbar */}
                <nav className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-full px-5 lg:px-7 py-2.5 shadow-sm hover:shadow transition-shadow">
                    <div className="flex items-center gap-4 lg:gap-6">
                        {desktopNavLeft.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? "text-black font-semibold"
                                        : "text-gray-800 hover:text-black"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/" className="px-2 flex items-center">
                            <Image
                                src="/logo-stitchbyte.png"
                                alt="Stitchbyte"
                                width={120}
                                height={32}
                                className="h-7 w-auto"
                                priority
                            />
                        </Link>
                        {desktopNavRight.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? "text-black font-semibold"
                                        : "text-gray-800 hover:text-black"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Right: Get a Quote Pill Button matching reference */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-sm font-medium rounded-full shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] transition-all group"
                    >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop - click to close */}
                    <div
                        className="md:hidden fixed inset-0 z-30"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Dropdown Menu */}
                    <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-40 overflow-hidden animate-fade-in">
                        <div className="py-2">
                            {allNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-5 py-3 transition-colors font-medium ${isActive(link.href)
                                            ? "text-gray-900 bg-gray-50"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="p-3 border-t border-gray-100">
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors shadow-xs"
                                >
                                    <span>Get a Quote</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
