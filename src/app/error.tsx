"use client";

import { useEffect } from "react";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">This page is taking a moment</h1>
        <p className="text-gray-500 mb-8">
          Something went wrong on our side. Please try again, or talk to us directly and we will help right away.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium"
          >
            Try again
          </button>
          <a
            href="https://wa.me/919461330819"
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-900 font-medium"
          >
            Talk to an Expert on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
