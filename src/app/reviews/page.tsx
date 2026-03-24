"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReviewsPage() {
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const displayReviewImages = reviewImages.filter(Boolean);

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        const response = await fetch("/api/site-content/reviews");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.reviewImages)) {
          setReviewImages(data.reviewImages);
        }
      } catch (error) {
        console.error("Error fetching review images:", error);
      }
    };

    fetchReviewImages();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-[50vh] bg-white text-gray-900 flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4" />
              Client Reviews
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              All Client
              <br />
              Reviews
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete list of feedback and review screenshots uploaded from admin panel.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          {displayReviewImages.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {displayReviewImages.map((reviewImage, index) => (
                <div key={`${reviewImage}-${index}`} className="bg-white border border-gray-200 rounded-3xl p-4 hover:shadow-lg transition-all">
                  <img
                    src={reviewImage}
                    alt={`Client Review ${index + 1}`}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No reviews added yet. Add review images from Admin Panel → Homepage Reviews.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Work With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
