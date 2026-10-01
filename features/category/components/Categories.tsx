import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';
import { getCategories } from '../category-queries';

export default async function Categories() {
  'use cache';

  const categories = await getCategories();

  return categories.map(category => {
    return (
      <Boundary key={category} hydration="server" rendering="hybrid" cached>
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
  return Array.from({ length: 5 }).map((_, i) => {
    return <div key={i} className="skeleton-animation h-5 w-20 rounded-xs" />;
  });
}
