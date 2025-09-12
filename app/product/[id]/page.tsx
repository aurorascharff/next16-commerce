import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Card from '@/components/ui/Card';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductDetails, {
  preloadProductDetails,
  ProductDetailsSkeleton,
} from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export default async function ProductPage({ params }: PageProps<'/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);
  preloadProductDetails(productId);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
        <ArrowLeft aria-hidden className="size-4" />
        Back Home
      </Link>
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <Suspense
            fallback={
              <>
                <ProductSkeleton isDetails />
                <ProductDetailsSkeleton />
              </>
            }
          >
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
