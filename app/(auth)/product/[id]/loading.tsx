import { ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import { ProductSkeleton } from '@/features/product/components/Product';
import { ProductDetailsSkeleton } from '@/features/product/components/ProductDetails';
import { ReviewsSkeleton } from '@/features/product/components/Reviews';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex items-center text-sm font-medium">
        <ArrowLeft aria-hidden className="size-4" />
        <span className="ml-1">Back Home</span>
      </div>
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <ProductSkeleton isDetails />
          <ProductDetailsSkeleton />
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <ReviewsSkeleton />
        </div>
      </div>
    </div>
  );
}
