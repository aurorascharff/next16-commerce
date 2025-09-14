import { ProductListSkeleton } from '@/features/product/components/ProductList';

export default function Loading() {
  return (
    <>
      <div className="skeleton-animation mb-4 h-30 w-full rounded-lg" />
      <div className="skeleton-animation mb-4 h-10 w-full rounded-lg" />
      <div className="flex h-full grow flex-col gap-4">
        <div className="skeleton-animation h-6 w-24 rounded" />
        <ProductListSkeleton />
      </div>
    </>
  );
}
