import React from 'react';
import { getReviews } from '@/data/services/review';

type Props = {
  productId: number;
};

export default async function Reviews({ productId }: Props) {
  const reviews = await getReviews(productId);

  return (
    <div>
      <h2>Customer Reviews</h2>
      <ul className="space-y-4">
        {reviews.map(review => {
          return (
            <li key={review.id} className="rounded-lg border p-4">
              <p>{review.comment}</p>
              <p>Rating: {review.rating} stars</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
