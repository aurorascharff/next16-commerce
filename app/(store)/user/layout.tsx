import React, { Suspense } from 'react';
import Discounts, { DiscountsSkeleton } from '@/features/user/components/Discounts';
import SavedProducts, { SavedProductsSkeleton } from '@/features/user/components/SavedProducts';
import { UserDetailsSkeleton } from '@/features/user/components/UserDetails';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-16 xl:mx-40 2xl:mx-60">
      <Suspense fallback={<UserDetailsSkeleton />}>
        {children}
        <Suspense fallback={<DiscountsSectionSkeleton />}>
          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Your Discounts</h2>
            <Discounts />
          </section>
          <Suspense fallback={<SavedProductsSectionSkeleton />}>
            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Saved Products</h2>
              <SavedProducts />
            </section>
          </Suspense>
        </Suspense>
      </Suspense>
    </div>
  );
}

function DiscountsSectionSkeleton() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Your Discounts</h2>
      <DiscountsSkeleton />
    </section>
  );
}

function SavedProductsSectionSkeleton() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Saved Products</h2>
      <SavedProductsSkeleton />
    </section>
  );
}
