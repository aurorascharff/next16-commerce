'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import LinkStatus from '@/components/ui/LinkStatus';
import { cn } from '@/utils/cn';

interface Props {
  category?: string;
  children: React.ReactNode;
}

export default function CategoryFilterButton({ category, children }: Props) {
  const params = useSearchParams();
  const active = category ? params.get('category') === category : !params.get('category');
  const href = category ? { pathname: '/all', query: { category } } : { pathname: '/all' };

  return (
    <Link scroll={false} href={href} className={cn('text-xs font-bold tracking-wide uppercase md:block')}>
      <LinkStatus variant="spinner">
        <div
          className={cn(
            'px-3 py-1.5 transition-colors md:w-full',
            active
              ? 'bg-accent text-white'
              : 'border-divider dark:border-divider-dark border bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900',
          )}
        >
          {children}
        </div>
      </LinkStatus>
    </Link>
  );
}
