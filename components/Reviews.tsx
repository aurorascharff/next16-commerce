import React from 'react';
import { getReviews } from '@/data/services/review';

type Props = {
  productId: number;
};

export default async function Reviews({ productId }: Props) {
  const reviews = await getReviews(productId);

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray italic">No reviews yet for this product.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map(review => {
            return (
              <li
                key={review.id}
                className="border-divider bg-card dark:border-divider-dark dark:bg-section rounded-lg border p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      return (
                        <span
                          key={i}
                          className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray'}`}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                  <span className="sr-only">{review.rating} out of 5 stars</span>
                </div>

                {review.comment && <p className="mb-2">{review.comment}</p>}

                <p className="text-gray text-xs">Reviewed on {new Date().toLocaleDateString()}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
