import { Percent } from 'lucide-react';
import React from 'react';

import Boundary from '@/components/internal/Boundary';
import { getUserDiscounts } from '../user-queries';

export default async function Discounts() {
  const discounts = await getUserDiscounts();

  if (discounts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No discounts available</p>
      </div>
    );
  }

  return (
    <Boundary rendering="dynamic" hydration="server">
      <div className="space-y-4">
        {discounts.map(discount => {
          return (
            <div
              key={discount.id}
              className="border-divider dark:border-divider-dark flex items-center justify-between border bg-white p-4 dark:bg-black"
            >
              <div className="flex items-center gap-3">
                <Percent className="text-primary h-5 w-5" />
                <div>
                  <p className="font-bold tracking-tight uppercase">{discount.code}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{discount.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Expires: {discount.expiry.toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Boundary>
  );
}

export function DiscountsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div
            key={index}
            className="border-divider dark:border-divider-dark flex items-center justify-between border bg-white p-[22px] dark:bg-black"
          >
            <div className="flex items-center gap-3">
              <div className="skeleton-animation h-5 w-5 rounded" />
              <div>
                <div className="skeleton-animation mb-1 h-4 w-20 rounded" />
                <div className="skeleton-animation h-3 w-32 rounded" />
              </div>
            </div>
            <div className="text-right">
              <div className="skeleton-animation h-3 w-16 rounded" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
