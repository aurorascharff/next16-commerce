import Link from 'next/link';
import React from 'react';
import type { Route } from 'next';

type Props = {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
};

export default function AppLayout({ headerContent, children }: Props) {
  return (
    <>
      <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
        <h1 className="text-3xl font-bold">
          <Link prefetch href={'/' as Route} className="text-primary hover:text-primary-dark font-bold">
            Commerce
          </Link>
        </h1>
        {headerContent}
      </header>
      <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
      </main>
    </>
  );
}
