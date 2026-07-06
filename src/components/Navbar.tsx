"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Helper to check if link is active
    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: "/prebuilt", label: "Prebuilt" },
        { href: "/customized", label: "Customized" },
        { href: "/marketing", label: "Marketing" },

    ];

    const navLinksRight = [
        { href: "/ui-ux", label: "UI & UX" },
        { href: "/work", label: "Case Studies" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6">
            {/* Mobile Nav */}
            <nav className="md:hidden bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-4 py-3 shadow-lg shadow-black/5 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo-stitchbyte.png"
                        alt="StitchByte"
                        width={100}
                        height={28}
                        className="h-7 w-auto"
                    />
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-gray-700" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-700" />
                    )}
                </button>
            </nav>

            {/* Desktop Nav */}
            <nav className="hidden md:flex justify-center">
                <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-2 py-2 shadow-lg shadow-black/5">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-sm rounded-full transition-colors ${isActive(link.href)
                                        ? "text-gray-900 bg-gray-100 font-medium"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/" className="px-3 py-1 flex items-center">
                            <Image
                                src="/logo-stitchbyte.png"
                                alt="StitchByte"
                                width={120}
                                height={32}
                                className="h-8 w-auto"
                            />
                        </Link>
                        {navLinksRight.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-sm rounded-full transition-colors ${isActive(link.href)
                                        ? "text-gray-900 bg-gray-100 font-medium"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

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
                            {[...navLinks, ...navLinksRight].map((link) => (
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
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
