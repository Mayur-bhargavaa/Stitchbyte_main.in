"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ReviewCard {
  name: string;
  reviewTitle?: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
  serviceType?: string;
  projectMonth?: string;
  projectYear?: string;
  projectSize?: string;
}

export default function ReviewsPage() {
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
  const isSingleReview = reviewCards.length === 1;

  useEffect(() => {
    const fetchReviewCards = async () => {
      try {
        const response = await fetch("/api/site-content/reviews");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.reviewCards)) {
          const incomingCards = data.reviewCards
            .map((item: ReviewCard) => ({
              name: typeof item?.name === "string" ? item.name.trim() : "",
              reviewTitle: typeof item?.reviewTitle === "string" ? item.reviewTitle.trim() : "",
              reviewText: typeof item?.reviewText === "string" ? item.reviewText.trim() : "",
              rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
              avatarUrl: typeof item?.avatarUrl === "string" ? item.avatarUrl.trim() : "",
              serviceType: typeof item?.serviceType === "string" ? item.serviceType.trim() : "",
              projectMonth: typeof item?.projectMonth === "string" ? item.projectMonth.trim() : "",
              projectYear: typeof item?.projectYear === "string" ? item.projectYear.trim() : "",
              projectSize: typeof item?.projectSize === "string" ? item.projectSize.trim() : "",
            }))
            .filter((item: ReviewCard) => item.name && item.reviewText);

          setReviewCards(incomingCards);
        }
      } catch (error) {
        console.error("Error fetching review cards:", error);
      }
    };

    fetchReviewCards();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-[50vh] bg-white text-gray-900 flex flex-col items-center justify-center px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              All Client
              <br />
              Reviews
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete list of client feedback cards uploaded from the admin panel.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
          {reviewCards.length > 0 ? (
            <div className={isSingleReview ? "max-w-2xl mx-auto" : "columns-1 md:columns-2 xl:columns-3 gap-8 [column-fill:_balance]"}>
              {reviewCards.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className={`${isSingleReview ? "" : "mb-5 sm:mb-8 break-inside-avoid"} group relative overflow-hidden bg-white border border-gray-200/90 rounded-3xl px-5 sm:px-7 py-5 sm:py-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${starIndex < review.rating ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-6 text-gray-700">
                    <div className="w-7 h-7 rounded-full border border-gray-400/60 flex items-center justify-center overflow-hidden text-gray-500">
                      {review.avatarUrl ? (
                        <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xl sm:text-2xl leading-none font-semibold tracking-tight lowercase">{review.name}</p>
                  </div>

                  <h3 className="mt-5 sm:mt-6 text-2xl sm:text-3xl text-gray-900 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {review.reviewTitle || "Great experience"}
                  </h3>

                  <p className="mt-4 sm:mt-5 text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    {review.reviewText}
                  </p>

                  {(review.serviceType || review.projectMonth || review.projectYear || review.projectSize) && (
                    <p className="mt-4 text-sm text-gray-500">
                      Project Context: {[review.serviceType, [review.projectMonth, review.projectYear].filter(Boolean).join(" "), review.projectSize]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-gray-500">No reviews added yet. Add text review cards from Admin Panel → Homepage Reviews.</p>
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
