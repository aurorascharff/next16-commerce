import { Suspense } from 'react';
import Card from '@/components/ui/Card';
import Product from '@/features/product/components/Product';
import ProductDetails, {
  preloadProductDetails,
  ProductDetailsSkeleton,
} from '@/features/product/components/ProductDetails';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';
import { getRequestContext } from '@/utils/request-context';

export async function generateStaticParams() {
  return [];
}

export default async function ProductPage({ params }: PageProps<'/[requestContext]/product/[id]'>) {
  const { id } = await params;
  const { loggedIn } = getRequestContext(await params);
  const productId = Number(id);

  preloadProductDetails(productId);

  return (
    <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
      <Card>
        <Product
          productId={productId}
          details={
            <Suspense key={productId} fallback={<ProductDetailsSkeleton />}>
              <ProductDetails productId={productId} loggedIn={loggedIn} />
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
