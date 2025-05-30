'use client';

import Form from 'next/form';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import SearchStatus from './ui/SearchStatus';

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const router = useRouter();

  return (
    <>
      <Form className="relative" action="">
        <input
          className="border-divider placeholder:text-gray focus:border-primary focus:outline-primary dark:border-divider-dark dark:bg-card-dark w-full rounded-md border bg-white px-4 py-2 pl-9 text-sm outline-offset-2 focus:outline-2"
          name="q"
          onChange={e => {
            if (e.target.value === '') {
              router.push('?q=');
            }
          }}
          defaultValue={q}
          type="search"
          placeholder={'Search products...'}
        />
        <div className="text-gray absolute top-1/2 left-3 -translate-y-1/2">
          <SearchStatus />
        </div>
      </Form>
    </>
  );
}
