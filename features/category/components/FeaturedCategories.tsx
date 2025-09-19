import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import Skeleton from '@/components/ui/Skeleton';
import { getCategoriesWithCount } from '../category-queries';
import type { Route } from 'next';

export default async function FeaturedCategories() {
  const categoriesWithCount = await getCategoriesWithCount();
  const categoryList = categoriesWithCount.slice(0, 4);

  return (
    <Boundary rendering="hybrid" hydration="server">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoryList.map(category => {
          return (
            <Link
              key={category.name}
              href={`/all?category=${encodeURIComponent(category.name)}` as Route}
              className="border-divider dark:border-divider-dark dark:bg-card-dark group hover:border-accent block border bg-white"
            >
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold tracking-tight text-black uppercase dark:text-white">
                  {category.name}
                </h3>
                <p className="mb-4 text-sm text-gray-700 normal-case dark:text-gray-300">
                  {category.description || `Discover our ${category.name.toLowerCase()} collection.`} {category.count}{' '}
                  products available.
                </p>
                <span className="text-accent group-hover:text-accent-hover mt-2 inline-flex items-center text-sm font-semibold tracking-wide uppercase">
                  Explore {category.name} <span className="ml-1">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Boundary>
  );
}

export function FeaturedCategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <div key={i} className="border-divider dark:border-divider-dark dark:bg-card-dark border bg-white">
            <Skeleton className="mb-[6px] p-6" />
          </div>
        );
      })}
    </div>
  );
}
