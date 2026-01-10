"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold leading-none text-black/10">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
          Page Not Found
        </h2>
        <p className="text-black/60 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/80 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-black text-black rounded-xl font-medium hover:bg-black/5 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-sm text-black/50 mb-4">Or try these links:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/restaurant"
              className="text-sm text-black hover:underline"
            >
              QR Restaurant
            </Link>
            <span className="text-black/20">•</span>
            <Link
              href="/contact"
              className="text-sm text-black hover:underline"
            >
              Contact Us
            </Link>
            <span className="text-black/20">•</span>
            <Link
              href="/restaurant/signin"
              className="text-sm text-black hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
