import { cacheLife, cacheTag } from 'next/cache';
import Boundary from '@/components/internal/Boundary';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/utils/cn';
import { getProduct } from '../product-queries';

type Props = {
  productId: number;
  imageClassName?: string;
};

export default async function Product({ productId, imageClassName }: Props) {
  'use cache';

  cacheLife('max');
  cacheTag('product-' + productId);

  const product = await getProduct(productId);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="flex flex-col bg-white dark:bg-black">
        <ImagePlaceholder className={imageClassName} />
        <div className="flex flex-1 flex-col p-5">
          <h2 className="mb-3 text-xl font-bold tracking-tight">{product.name}</h2>
          {product.description && (
            <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          )}
          <div className="mt-auto">
            <p className="text-accent text-lg font-bold tracking-wide">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Boundary>
  );
}

export function ProductSkeleton({ className, isDetails = false }: { className?: string; isDetails?: boolean }) {
  if (isDetails) {
    return (
      <div className={cn('flex flex-col bg-white dark:bg-black', className)}>
        <div className="bg-card dark:bg-card-dark h-96 w-full" />
        <div className="p-5">
          <div className="mb-3 flex h-7 items-center">
            <div className="skeleton-animation h-5 w-36 rounded" />
          </div>
          <div className="mb-4 flex h-5 items-center">
            <div className="skeleton-animation h-3 w-72 rounded" />
          </div>
          <div className="flex h-7 items-center">
            <div className="skeleton-animation h-5 w-20 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col bg-white dark:bg-black', className)}>
      <div className="bg-card dark:bg-card-dark h-60 w-full" />
      <Skeleton className="p-[22px]" />
    </div>
  );
}
