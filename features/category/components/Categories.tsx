import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';
import { getCategories } from '../category-queries';

export default async function Categories() {
  const categories = await getCategories();

  return categories.map(category => {
    return (
      <Boundary key={category} hydration="server" rendering="hybrid">
        <Link
          href={{
            pathname: '/all',
            query: { category },
          }}
          className="hover:text-accent dark:hover:text-accent block text-sm text-gray-700 transition-colors dark:text-gray-300"
        >
          <LinkStatus>{category}</LinkStatus>
        </Link>
      </Boundary>
    );
  });
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
