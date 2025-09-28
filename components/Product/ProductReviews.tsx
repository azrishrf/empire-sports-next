"use client";

import { Product, Review } from "@/data/products";
import { getAverageRating, getProductReviews, getReviewCount } from "@/lib/productService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ProductReviewsProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  // Add empty stars
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);

        // If product already has reviews (from Firestore), use them directly
        if (product.reviews && product.reviews.length > 0) {
          setReviews(product.reviews);
          const total = product.reviews.reduce((sum, review) => sum + review.rating, 0);
          const avg = Math.round((total / product.reviews.length) * 10) / 10;
          setAverageRating(avg);
          setReviewCount(product.reviews.length);
        } else {
          // Fallback to fetching from Firestore
          const [productReviews, avgRating, count] = await Promise.all([
            getProductReviews(product.id),
            getAverageRating(product.id),
            getReviewCount(product.id),
          ]);

          setReviews(productReviews);
          setAverageRating(avgRating);
          setReviewCount(count);
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
        setReviews([]);
        setAverageRating(0);
        setReviewCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [product.id, product.reviews]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-32 rounded-lg bg-gray-200"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="rounded-3xl bg-yellow-50 p-6 text-center">
        <h4 className="mb-2 text-lg font-semibold text-gray-800">Overall</h4>
        <div className="mb-2 text-4xl font-bold text-yellow-400">
          {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
        </div>
        <div className="mb-3 text-sm text-gray-600">out of 5.0</div>

        <div className="mb-3 flex justify-center">
          <StarRating rating={averageRating} />
        </div>

        <div className="text-sm text-gray-500">
          {reviewCount} Review{reviewCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-gray-200 p-4 transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={review.userImage}
                    alt={review.userName}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 items-center justify-between md:flex">
                    <h5 className="truncate font-semibold text-gray-900">{review.userName}</h5>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center">
                    <StarRating rating={review.rating} />
                    <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-700 md:text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 text-gray-400">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="mb-2 text-gray-700">No reviews yet</p>
            <p className="text-sm text-gray-500">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
}
