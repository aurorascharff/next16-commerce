import React, { Suspense } from 'react';
import Boundary from '@/components/internal/Boundary';
import { getCategories } from '../category-queries';
import CategoryFilterButton from './CategoryFilterButton';

export default async function CategoryFilters() {
  const categories = await getCategories();

  return (
    <Boundary hydration="server" rendering="hybrid">
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        <Suspense fallback={<CategoryFilterButtonSkeleton />}>
          <CategoryFilterButton>All</CategoryFilterButton>
        </Suspense>
        {categories.map(category => {
          return (
            <Suspense key={category} fallback={<CategoryFilterButtonSkeleton />}>
              <CategoryFilterButton category={category}>{category}</CategoryFilterButton>
            </Suspense>
          );
        })}
      </div>
    </Boundary>
  );
}

export function CategoryFilterButtonSkeleton() {
  return (
    <div className="border-divider dark:border-divider-dark border px-3 py-1.5 text-xs font-bold tracking-wide text-gray-400 uppercase md:block md:w-full dark:text-gray-500">
      Loading
    </div>
  );
}

export function CategoryFiltersSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 md:flex-col md:gap-1">
      <div className="border-divider dark:border-divider-dark border px-3 py-1.5 text-xs font-bold tracking-wide text-gray-400 uppercase md:w-full dark:text-gray-500">
        Loading
      </div>
    </div>
  );
}
