import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Link from 'next/link';
import React from 'react';
import Boundary from '@/components/internal/Boundary';
import ShowMore from '@/components/ui/ShowMore';
import { getCategories } from '../product-queries';

export default async function ProductCategories() {
  'use cache';
  cacheLife('days');
  cacheTag('categories');

  const categories = await getCategories();

  return (
    <ShowMore initial={5}>
      {categories.map(category => {
        return (
          <Boundary key={category} hydration="server">
            <Link href="#" className="text-gray dark:text-gray hover:text-primary block text-sm transition-colors">
              {category}
            </Link>
          </Boundary>
        );
      })}
    </ShowMore>
  );
}

export function ProductCategoriesSkeleton() {
  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => {
          return <div key={index} className="h-5 w-full rounded bg-gray-200 dark:bg-gray-700" />;
        })}
        <div className="mb-1 h-5 w-full" />
      </div>
    </div>
  );
}
