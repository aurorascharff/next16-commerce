import Link from 'next/link';
import React, { Suspense } from 'react';
import Card from '@/components/ui/Card';
import Product, { ProductSkeleton } from '@/modules/product/components/Product';
import ProductDetails, {
  prefetchProductDetails,
  ProductDetailsSkeleton,
} from '@/modules/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/modules/product/components/Reviews';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  prefetchProductDetails(productId);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
        {'<- Back to Home'}
      </Link>
      <div className="flex w-[700px] flex-col gap-8 self-center">
        <Card>
          <Suspense fallback={<ProductSkeleton isDetails />}>
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
