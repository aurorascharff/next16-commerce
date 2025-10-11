import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import ShowMore from '@/components/ui/ShowMore';
import { getCategories } from '../category-queries';

export default async function Categories() {
  const categories = await getCategories();

  return (
    <Boundary rendering="hybrid">
      <ShowMore className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5" initial={5}>
        {categories.map(category => {
          return (
            <Boundary key={category} hydration="server">
              <Link
                href={{
                  pathname: '/all',
                  query: { category },
                }}
                className="hover:text-accent dark:hover:text-accent block text-sm text-gray-700 transition-colors dark:text-gray-300"
              >
                {category}
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
          return <div key={index} className="skeleton-animation h-5 w-full rounded" />;
        })}
        <div className="mb-1 h-5 w-full" />
      </div>
    </div>
  );
}
