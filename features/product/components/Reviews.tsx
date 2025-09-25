import { Star } from 'lucide-react';
import Boundary from '@/components/internal/Boundary';
import { getReviews } from '../product-queries';

type Props = {
  productId: number;
};

export default async function Reviews({ productId }: Props) {
  const reviews = await getReviews(productId);

  return (
    <Boundary rendering="hybrid" hydration="server">
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="py-8 text-center text-gray-600 dark:text-gray-400">No reviews yet for this product.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => {
              return (
                <div
                  key={review.id}
                  className="border-divider dark:border-divider-dark border bg-white p-5 dark:bg-black"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => {
                        return (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            aria-hidden="true"
                          />
                        );
                      })}
                      <span className="ml-1 text-sm font-medium tracking-wide uppercase">{review.rating}/5</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">{review.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Boundary>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="my-2 mb-5 p-2">
      <div className="skeleton-animation mb-2 h-3 w-10 rounded-xs" />
      <div className="skeleton-animation mb-2 h-4 rounded-xs" />
      <div className="skeleton-animation mb-2 h-4 rounded-xs" />
    </div>
  );
}
