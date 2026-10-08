import { Suspense, type ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import { CartIconLinkSkeleton } from '@/features/cart/components/CartIconLink';
import CartLink from '@/features/cart/components/CartLink';
import UserSession from '@/features/user/components/UserSession';

export const ensureStatic = 'shell';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <Boundary rendering="static" hydration="server">
      <div className="flex min-h-screen flex-col">
        <UserSession>
          <Header
            cart={
              <Suspense fallback={<CartIconLinkSkeleton />}>
                <CartLink />
              </Suspense>
            }
          />
          <main className="3xl:px-60 mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-40">
            {children}
          </main>
        </UserSession>
      </div>
      <Footer />
    </Boundary>
  );
}
