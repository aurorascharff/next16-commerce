import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import { getCategoriesWithCount } from '../category-queries';
import type { Route } from 'next';

export default async function FeaturedCategories() {
  'use cache';

  const categoriesWithCount = await getCategoriesWithCount();
  const categoryList = categoriesWithCount.slice(0, 4);

  return (
    <Boundary rendering="hybrid" hydration="server" cached>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoryList.map(category => {
          return (
            <Link
              key={category.name}
              prefetch={true}
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
