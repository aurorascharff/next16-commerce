import { Suspense } from 'react';
import Product from '@/features/product/components/Product';
import ProductDetails, {
  preloadProductDetails,
  ProductDetailsSkeleton,
} from '@/features/product/components/ProductDetails';
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
    <Product
      productId={productId}
      details={
        <Suspense key={productId} fallback={<ProductDetailsSkeleton />}>
          <ProductDetails productId={productId} loggedIn={loggedIn} />
        </Suspense>
      }
    />
  );
}
