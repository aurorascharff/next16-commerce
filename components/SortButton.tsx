'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Boundary from './internal/Boundary';
import LinkStatus from './ui/LinkStatus';

export default function SortButton() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') as 'asc' | 'desc' | null;
  const searchQuery = searchParams.get('q');
  const category = searchParams.get('category');
  const page = searchParams.get('page');

  const nextSort = currentSort === 'asc' ? 'desc' : 'asc';

  const href = {
    pathname: '/all',
    query: {
      ...(searchQuery && { q: searchQuery }),
      ...(category && { category }),
      ...(page && { page }),
      sort: nextSort,
    },
  };

  return (
    <Boundary hydration="client">
      <Link
        scroll={false}
        href={href}
        className="inline-flex h-6 items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
      >
        <LinkStatus>
          <div className="flex items-center gap-2">
            {nextSort === 'desc' ? (
              <ArrowUp className="bg-accent size-3.5 p-0.5 text-white dark:text-black" />
            ) : (
              <ArrowDown className="bg-accent size-3.5 p-0.5 text-white dark:text-black" />
            )}
            Sort {nextSort === 'desc' ? 'A-Z' : 'Z-A'}
          </div>
        </LinkStatus>
      </Link>
    </Boundary>
  );
}

export function SortButtonSkeleton() {
  return <div className="inline-block h-6 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />;
}
