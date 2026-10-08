import { Suspense } from 'react';
import AnimatedSuspense from '@/components/ui/AnimatedSuspense';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import AddToCart, { AddToCartSkeleton } from '@/features/cart/components/AddToCart';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductDetails, { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';
import SavedProduct, { SavedProductSkeleton } from '@/features/user/components/SavedProduct';

export const ensureStatic = 'prefetch';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default function ProductPage({ params }: PageProps<'/product/[id]'>) {
  return (
    <div className="flex flex-col gap-6">
      <BackButton fallbackHref="/all" />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <AnimatedSuspense fallback={<ProductSkeleton isDetails />}>
            {params.then(({ id }) => {
              const productId = Number(id);

              return (
                <>
                  <Product productId={productId} />
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-5">
                    <div className="w-40">
                      <Suspense fallback={<AddToCartSkeleton />}>
                        <AddToCart productId={productId} />
                      </Suspense>
                    </div>
                    <div className="w-40">
                      <Suspense fallback={<SavedProductSkeleton />}>
                        <SavedProduct productId={productId} />
                      </Suspense>
                    </div>
                  </div>
                  <Suspense fallback={<ProductDetailsSkeleton />}>
                    <ProductDetails productId={productId} />
                  </Suspense>
                </>
              );
            })}
          </AnimatedSuspense>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <AnimatedSuspense fallback={<ReviewsSkeleton />}>
            {params.then(({ id }) => (
              <Reviews productId={Number(id)} />
            ))}
          </AnimatedSuspense>
        </div>
      </div>
    </div>
  );
}
