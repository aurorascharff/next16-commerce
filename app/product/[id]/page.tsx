import { Suspense } from 'react';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductDetails, { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default async function ProductPage({ params }: PageProps<'/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
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
