import Link from 'next/link';
import React, { Suspense } from 'react';
import Product from '@/components/Product';
import Reviews from '@/components/Reviews';
import Skeleton from '@/components/ui/Skeleton';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
          {'<- Back to Home'}
        </Link>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-2/3">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
            <Product
              className="border-divider dark:border-divider-dark dark:bg-card-dark overflow-hidden rounded-lg border bg-white p-6 shadow-sm"
              productId={productId}
            />
          </Suspense>
        </div>

        <div className="w-full md:w-1/3">
          <div className="border-divider dark:border-divider-dark dark:bg-card-dark rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
            <Suspense fallback={<Skeleton className="h-60 w-full rounded-lg" />}>
              <Reviews productId={productId} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
