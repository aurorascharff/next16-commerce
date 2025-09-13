import Link from 'next/link';
import React from 'react';
import type { Route } from 'next';

export default function Header({ rightContent }: { rightContent?: React.ReactNode }) {
  return (
    <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
      <h1 className="text-3xl font-bold">
        <Link prefetch href={'/' as Route} className="text-primary hover:text-primary-dark font-bold">
          Commerce
        </Link>
      </h1>
      {rightContent}
    </header>
  );
}
