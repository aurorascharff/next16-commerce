import Link from 'next/link';
import ImagePlaceholder from './ImagePlaceholder';
import type { Route } from 'next';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  badge?: string;
  className?: string;
};

export default function ProductCard({ id, name, price, badge, className = '' }: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}` as Route}
      className={`border-divider dark:border-divider-dark dark:bg-card-dark group hover:border-accent border bg-white ${className}`}
    >
      <div className="bg-card dark:bg-section relative overflow-hidden">
        <ImagePlaceholder className="h-48 w-full" />
        {badge && (
          <div className="bg-accent absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white uppercase">
            {badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-bold tracking-tight uppercase">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-accent text-lg font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton({ className = '' }: { className?: string }) {
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
