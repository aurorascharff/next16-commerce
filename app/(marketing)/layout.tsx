import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import type { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <Boundary rendering="static" hydration="server">
      <div className="flex min-h-screen flex-col">
        <Header showUserProfile={false} />
        <main className="3xl:px-60 mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-40">
          {children}
        </main>
      </div>
      <Footer showCategories={false} />
    </Boundary>
  );
}
