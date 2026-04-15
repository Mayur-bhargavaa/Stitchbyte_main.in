"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

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

export default function ReviewCarousel({ initialReviews }: { initialReviews: ReviewCard[] }) {
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>(initialReviews);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);

  const displayReviewCards = reviewCards.filter((item) => item.name && item.reviewText);

  // Fetch latest reviews from API (supplements SSR data)
  useEffect(() => {
    const fetchReviewCards = async () => {
      try {
        const response = await fetch('/api/site-content/reviews');
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

          if (incomingCards.length > 0) {
            setReviewCards(incomingCards);
          }
        }
      } catch (err) {
        console.error('Error fetching review cards:', err);
      }
    };

    fetchReviewCards();
  }, []);

  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [displayReviewCards.length]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleReviewCount(1);
      } else if (window.innerWidth < 1280) {
        setVisibleReviewCount(2);
      } else {
        setVisibleReviewCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (displayReviewCards.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentReviewIndex((current) => (current + 1) % displayReviewCards.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [displayReviewCards.length]);

  const reviewTrackCards =
    displayReviewCards.length > visibleReviewCount
      ? [...displayReviewCards, ...displayReviewCards.slice(0, visibleReviewCount)]
      : displayReviewCards;

  if (displayReviewCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-8">
        <p className="text-gray-500">No reviews added yet. Add text review cards from Admin Panel → Homepage Reviews.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 sm:gap-4">
        {displayReviewCards.length > 1 && (
          <button
            onClick={() =>
              setCurrentReviewIndex((current) =>
                current === 0 ? displayReviewCards.length - 1 : current - 1,
              )
            }
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center flex-shrink-0"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentReviewIndex * 100) / visibleReviewCount}%)` }}
          >
            {reviewTrackCards.map((review, index) => (
              <div key={`${review.name}-${index}`} className="px-2" style={{ minWidth: `${100 / visibleReviewCount}%` }}>
                <div className="bg-white border border-gray-200 rounded-3xl px-7 py-6 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-5 h-5 ${starIndex < review.rating ? "fill-current" : "text-gray-300"}`}
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
                    <p className="text-lg sm:text-xl font-semibold tracking-tight lowercase">{review.name}</p>
                  </div>

                  <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl text-gray-900 line-clamp-1" style={{ fontFamily: "Georgia, serif" }}>
                    {review.reviewTitle || "Great experience"}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">{review.reviewText}</p>

                  {(review.serviceType || review.projectMonth || review.projectYear || review.projectSize) && (
                    <p className="mt-4 text-xs text-gray-500">
                      Project Context: {[review.serviceType, [review.projectMonth, review.projectYear].filter(Boolean).join(" "), review.projectSize]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {displayReviewCards.length > 1 && (
          <button
            onClick={() =>
              setCurrentReviewIndex((current) => (current + 1) % displayReviewCards.length)
            }
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center flex-shrink-0"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {displayReviewCards.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="flex items-center gap-2">
            {displayReviewCards.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentReviewIndex(dotIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  dotIndex === currentReviewIndex ? "w-6 bg-gray-900" : "w-2.5 bg-gray-300"
                }`}
                aria-label={`Go to review ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
