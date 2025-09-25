import { ProductSkeleton } from '@/features/product/components/Product';

export default function Loading() {
  return (
    <>
      <ProductSkeleton />
      <div className="mt-6 flex justify-center">
        <div className="skeleton-animation h-5 w-40 rounded" />
      </div>
    </>
  );
}
