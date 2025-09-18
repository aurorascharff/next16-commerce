import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';
import ShowMore from '@/components/ui/ShowMore';
import { getCategories } from '../category-queries';

export default async function Categories() {
  'use cache';

  cacheTag('categories');
  cacheLife('max');

  const categories = await getCategories();

  return (
    <Boundary rendering="hybrid" cached>
      <ShowMore initial={5}>
        {categories.map(category => {
          return (
            <Boundary key={category} hydration="server">
              <Link
                href={{
                  pathname: '/all',
                  query: { category },
                }}
                className="text-gray dark:text-gray hover:text-primary block text-sm transition-colors"
              >
                <LinkStatus variant="spinner">{category}</LinkStatus>
              </Link>
            </Boundary>
          );
        })}
      </ShowMore>
    </Boundary>
  );
}

export function CategoriesSkeleton() {
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
