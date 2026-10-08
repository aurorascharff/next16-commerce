import { Suspense } from 'react';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import AddToCart, { AddToCartSkeleton } from '@/features/cart/AddToCart';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductDetails, {
  SavedProduct,
  SavedProductSkeleton,
} from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export const ensureStatic = 'prefetch';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default function ProductPage({ params }: PageProps<'/product/[id]'>) {
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <Suspense fallback={<ProductSkeleton isDetails />}>
            {params.then(({ id }) => {
              const productId = Number(id);
              return (
                <Product
                  productId={productId}
                  details={
                    <ProductDetails key={productId} productId={productId}>
                      <div className="flex flex-wrap items-center gap-3">
                        <Suspense fallback={<AddToCartSkeleton />}>
                          <AddToCart productId={productId} />
                        </Suspense>
                        <Suspense fallback={<SavedProductSkeleton />}>
                          <SavedProduct productId={productId} />
                        </Suspense>
                      </div>
                    </ProductDetails>
                  }
                />
              );
            })}
          </Suspense>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            {params.then(({ id }) => (
              <Reviews productId={Number(id)} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
