import { Suspense } from 'react';
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
  const productId = params.then(({ id }) => Number(id));

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <Suspense fallback={<ProductSkeleton isDetails />}>
            {productId.then(id => (
              <Product productId={id} />
            ))}
          </Suspense>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-5">
            <Suspense fallback={<AddToCartSkeleton />}>
              {productId.then(id => (
                <AddToCart productId={id} />
              ))}
            </Suspense>
            <Suspense fallback={<SavedProductSkeleton />}>
              {productId.then(id => (
                <SavedProduct productId={id} />
              ))}
            </Suspense>
          </div>
          <Suspense fallback={<ProductDetailsSkeleton />}>
            {productId.then(id => (
              <ProductDetails productId={id} />
            ))}
          </Suspense>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            {productId.then(id => (
              <Reviews productId={id} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
