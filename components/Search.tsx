'use client';

import Form from 'next/form';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import Boundary from './internal/Boundary';
import SearchStatus from './ui/SearchStatus';
import type { Route } from 'next';

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Boundary hydration="client">
        <Form className="relative" action={'' as Route}>
          <input
            className="pl-9 text-sm outline-offset-2 focus:outline-2"
            name="q"
            onChange={e => {
              const newSearchParams = new URLSearchParams(searchParams.toString());
              newSearchParams.set('q', e.target.value);
              startTransition(() => {
                router.push(`?${newSearchParams.toString()}`, {
                  scroll: false,
                });
              });
            }}
            defaultValue={q}
            type="search"
            placeholder={'Search products...'}
          />
          <div className="text-gray absolute top-1/2 left-3 -translate-y-1/2">
            <SearchStatus searching={isPending} />
          </div>
        </Form>
      </Boundary>
    </>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative">
      <input className="pl-9 text-sm outline-offset-2" placeholder="Loading..." disabled />
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <div className="skeleton-animation h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}
