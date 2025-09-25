import React from 'react';
import Header from '../Header';
import Boundary from '../internal/Boundary';

type Props = {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
};

export default function AppLayout({ headerContent, children }: Props) {
  return (
    <>
      <Boundary rendering="static">
        <Header headerContent={headerContent} />
      </Boundary>
      <main className="mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
        {children}
      </main>
    </>
  );
}
