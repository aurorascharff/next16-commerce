import Link from 'next/link';
import React, { Suspense } from 'react';
import Product, { ProductSkeleton } from '@/features/product/components/Product';
import ProductModal from '@/features/product/components/ProductModal';
import ImagePlaceholder from './ImagePlaceholder';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  description?: string;
  badge?: string;
  variant?: 'default' | 'compact';
  className?: string;
  enableQuickPreview?: boolean;
};

export default function ProductCard({
  id,
  name,
  price,
  description,
  badge,
  variant = 'default',
  className = '',
  enableQuickPreview = false,
}: ProductCardProps) {
  const card =
    variant === 'compact' ? (
      <Link
        href={`/product/${id}`}
        className={`border-divider hover:border-accent dark:border-divider-dark dark:hover:border-accent flex border bg-white transition-all hover:shadow-md dark:bg-black ${className}`}
      >
        <div className="flex-shrink-0">
          <ImagePlaceholder variant="simple" className="h-32 w-24 sm:h-36 sm:w-28" />
        </div>
        <div className="flex flex-col gap-1 p-5">
          <h2 className="group-hover:text-accent line-clamp-1 text-sm font-bold tracking-wide text-black uppercase transition-colors dark:text-white">
            {name}
          </h2>
          {description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-gray-700 normal-case dark:text-gray-300">
              {description}
            </p>
          )}
          <p className="text-accent mt-auto text-sm font-bold tracking-wider">${price.toFixed(2)}</p>
        </div>
      </Link>
    ) : (
      <Link
        href={`/product/${id}`}
        className={`border-divider dark:border-divider-dark dark:bg-card-dark group hover:border-accent flex h-full flex-col border bg-white ${className}`}
      >
        <div className="bg-card dark:bg-section relative flex-shrink-0 overflow-hidden">
          <ImagePlaceholder className="h-48 w-full" />
          {badge && (
            <div className="bg-accent absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white uppercase">
              {badge}
            </div>
          )}
        </div>
        <div className="flex-grow p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-bold tracking-tight uppercase">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-accent text-lg font-bold">${price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    );

  if (enableQuickPreview) {
    return (
      <div className="group relative h-full">
        {card}
        <ProductModal productId={id}>
          <Suspense fallback={<ProductSkeleton />}>
            <Product imageClassName="h-60" productId={id} />
          </Suspense>
        </ProductModal>
      </div>
    );
  }

  return card;
}

export function ProductCardSkeleton({
  variant = 'default',
  className = '',
}: {
  variant?: 'default' | 'compact';
  className?: string;
}) {
  if (variant === 'compact') {
    return (
      <div className={`border-divider dark:border-divider-dark flex border bg-white dark:bg-black ${className}`}>
        <div className="flex-shrink-0">
          <div className="skeleton-animation h-32 w-24 sm:h-36 sm:w-28" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 p-5">
          <div className="skeleton-animation h-4 w-3/4 rounded" />
          <div className="skeleton-animation h-3 w-full rounded" />
          <div className="skeleton-animation h-3 w-2/3 rounded" />
          <div className="skeleton-animation mt-auto h-4 w-1/3 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={`border-divider dark:border-divider-dark dark:bg-card-dark border bg-white ${className}`}>
      <div className="bg-card dark:bg-section h-48 w-full" />
      <div className="p-4">
        <div className="skeleton-animation mb-2 h-7 w-3/4 rounded" />
        <div className="skeleton-animation h-5 w-1/3 rounded" />
      </div>
    </div>
  );
}
