import Link from 'next/link';
import React from 'react';
import BoundaryToggle from '@/components/internal/BoundaryToggle';
import Boundary from '../internal/Boundary';

type Props = {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
};

export default function AppLayout({ headerContent, children }: Props) {
  return (
    <>
      <Boundary rendering="static">
        <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between gap-4 border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
          <h1 className="text-3xl font-bold">
            <Link prefetch href="/" className="text-primary hover:text-primary-dark font-bold normal-case">
              Commerce
            </Link>
          </h1>
          <div className="flex items-center gap-4">
            <BoundaryToggle />
            {headerContent}
          </div>
        </header>
      </Boundary>
      <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
      </main>
    </>
  );
}
