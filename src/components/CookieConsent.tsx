"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const savedConsent = localStorage.getItem("stitchbyte_cookie_consent");
            if (!savedConsent) {
                // Show banner with a small delay for premium entrance animation
                const timer = setTimeout(() => setIsVisible(true), 1500);
                return () => clearTimeout(timer);
            }
        } catch (e) {
            console.error("Cookie consent load error:", e);
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem("stitchbyte_cookie_consent", "accepted");
            setIsVisible(false);
            // Dispatch event to notify TrackingProvider and GA/FB Pixel integrations
            window.dispatchEvent(new Event("cookieConsentChanged"));
        } catch (e) {
            console.error(e);
        }
    };

    const handleDecline = () => {
        try {
            localStorage.setItem("stitchbyte_cookie_consent", "declined");
            setIsVisible(false);
            localStorage.removeItem("stitchbyte_tracking");
            window.dispatchEvent(new Event("cookieConsentChanged"));
        } catch (e) {
            console.error(e);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[9999] max-w-sm w-full animate-in slide-in-from-bottom-12 duration-500">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                        <Cookie className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">Cookie Settings</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            We use cookies to analyze site traffic, personalize content, and understand where our visitors come from. Read our <Link href="/privacy" className="underline hover:text-gray-900">Privacy Policy</Link> for details.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleDecline}
                        className="flex-1 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-full text-xs transition-colors border border-gray-200"
                    >
                        Decline
                    </button>
                    <button 
                        onClick={handleAccept}
                        className="flex-1 py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full text-xs transition-all hover:shadow-md"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
