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
          <Link href="/" className="text-primary hover:text-primary-dark font-bold">
            Commerce
          </Link>
        </h1>
        {headerContent}
      </header>
      <main className="flex flex-1 flex-col gap-10 p-4 pb-8 sm:p-10 sm:pb-8 lg:pb-20 2xl:px-60">{children}</main>
    </>
  );
}
