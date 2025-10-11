import React, { Suspense } from 'react';
import Discounts, { DiscountsSkeleton } from '@/features/user/components/Discounts';
import SavedProducts, { SavedProductsSkeleton } from '@/features/user/components/SavedProducts';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-16 xl:mx-40 2xl:mx-60">
      {children}
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Your Discounts</h2>
        <Suspense fallback={<DiscountsSkeleton />}>
          <Discounts />
        </Suspense>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Saved Products</h2>
        <Suspense fallback={<SavedProductsSkeleton />}>
          <SavedProducts />
        </Suspense>
      </div>
    </div>
  );
}
