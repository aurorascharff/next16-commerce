import { Suspense } from 'react';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductDetails, { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export default function ProductPage({ params }: PageProps<'/product/[id]'>) {
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
            {params.then(({ id }) => {
              const productId = Number(id);
              return (
                <Product
                  productId={productId}
                  details={
                    <Suspense key={productId} fallback={<ProductDetailsSkeleton />}>
                      <ProductDetails key={productId} productId={productId} />
                    </Suspense>
                  }
                />
              );
            })}
          </Suspense>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            {params.then(({ id }) => <Reviews productId={Number(id)} />)}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
