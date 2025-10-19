import { Bookmark } from 'lucide-react';
import { Suspense } from 'react';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import Product from '@/features/product/components/Product';
import ProductDetails, { SavedProduct } from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export default async function ProductPage({ params }: PageProps<'/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <Product
            productId={productId}
            details={
              <ProductDetails key={productId} productId={productId}>
                <Suspense fallback={<Bookmark aria-hidden className="text-gray size-5" />}>
                  <SavedProduct productId={productId} />
                </Suspense>
              </ProductDetails>
            }
          />
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
