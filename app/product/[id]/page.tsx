import Link from 'next/link';
import React, { Suspense } from 'react';
import Product, { ProductSkeleton } from '@/components/Product';
import ProductDetails, { ProductDetailsSkeleton } from '@/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/components/Reviews';
import Card from '@/components/ui/Card';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
        {'<- Back to Home'}
      </Link>
      <div className="mx-0 flex flex-col gap-8 sm:mx-20 md:mx-80 lg:mx-100">
        <Card>
          <Suspense fallback={<ProductSkeleton />}>
            <Product
              productId={productId}
              details={
                <Suspense key={productId} fallback={<ProductDetailsSkeleton />}>
                  <ProductDetails productId={productId} />
                </Suspense>
              }
            />
          </Suspense>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviews productId={productId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
