import Link from 'next/link';
import Boundary from '@/components/internal/Boundary';
import LinkStatus from '@/components/ui/LinkStatus';

import { getCategories } from '../category-queries';

type Props = {
  selectedCategory?: string;
  searchQuery?: string;
  sort?: 'asc' | 'desc';
};

export default async function CategoryFilters({ selectedCategory, searchQuery, sort }: Props) {
  const categories = await getCategories();

  return (
    <Boundary hydration="server" rendering="hybrid">
      <div className="flex flex-wrap gap-2">
        <Link
          prefetch
          scroll={false}
          href={{
            pathname: '/all',
            query: {
              ...(searchQuery && { q: searchQuery }),
              ...(sort && { sort }),
            },
          }}
          className="text-xs font-bold tracking-wide uppercase"
        >
          <LinkStatus variant="background">
            <div
              className={`px-3 py-1.5 transition-colors ${
                !selectedCategory
                  ? 'bg-accent text-white'
                  : 'border-divider dark:border-divider-dark border bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900'
              }`}
            >
              All
            </div>
          </LinkStatus>
        </Link>
        {categories.map(category => {
          return (
            <Link
              key={category}
              prefetch
              scroll={false}
              href={{
                pathname: '/all',
                query: {
                  ...(searchQuery && { q: searchQuery }),
                  ...(sort && { sort }),
                  category,
                },
              }}
              className="text-xs font-bold tracking-wide uppercase"
            >
              <LinkStatus variant="background">
                <div
                  className={`px-3 py-1.5 transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'border-divider dark:border-divider-dark border bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900'
                  }`}
                >
                  {category}
                </div>
              </LinkStatus>
            </Link>
          );
        })}
      </div>
    </Boundary>
  );
}

export function CategoryFiltersSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="border-divider dark:border-divider-dark border px-3 py-1.5 text-xs font-bold tracking-wide text-gray-400 uppercase dark:text-gray-500">
        Loading
      </div>
    </div>
  );
}
