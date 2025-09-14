import { ProductSkeleton } from '@/features/product/components/Product';
import { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';

export default function Loading() {
  return (
    <>
      <ProductSkeleton isDetails />
      <ProductDetailsSkeleton />
    </>
  );
}
