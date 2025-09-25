import { Bookmark } from 'lucide-react';
import { Suspense } from 'react';
import Boundary from '@/components/internal/Boundary';
import Card from '@/components/ui/Card';
import Product from '@/features/product/components/Product';
import ProductDetails, {
  preloadProductDetails,
  ProductDetailsSkeleton,
  SavedProduct,
} from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default async function ProductPage({ params }: PageProps<'/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);
  preloadProductDetails(productId);

  return (
    <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
      <Card>
        <Product
          productId={productId}
          details={
            <Suspense key={productId} fallback={<ProductDetailsSkeleton />}>
              <ProductDetails productId={productId}>
                <Suspense fallback={<Bookmark aria-hidden className="text-gray size-5" />}>
                  <Boundary rendering="dynamic">
                    <SavedProduct productId={productId} />
                  </Boundary>
                </Suspense>
              </ProductDetails>
            </Suspense>
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
  );
}
