import Card from '@/components/ui/Card';
import { ProductSkeleton } from '@/features/product/components/Product';
import { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';
import { ReviewsSkeleton } from '@/features/product/components/Reviews';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton-animation h-6 w-24 rounded" />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <ProductSkeleton isDetails />
          <ProductDetailsSkeleton />
        </Card>
        <div>
          <div className="skeleton-animation mb-4 h-7 w-40 rounded" />
          <ReviewsSkeleton />
        </div>
      </div>
    </div>
  );
}
