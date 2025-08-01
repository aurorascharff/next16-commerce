import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
};

export default function AppLayout({ headerContent, children }: Props) {
  return (
    <>
      <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
        <h1 className="text-3xl font-bold">
          <Link href="/" className="text-primary hover:text-primary-dark">
            Commerce
          </Link>
        </h1>
        {headerContent || (
          <Link
            href="/"
            className="text-primary hover:text-primary-dark inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {'<- Back to Home'}
          </Link>
        )}
      </header>
      <main className="flex flex-1 flex-col gap-10 p-4 pb-8 sm:p-10 sm:pb-8 lg:pb-20 2xl:px-60">{children}</main>
    </>
  );
}
