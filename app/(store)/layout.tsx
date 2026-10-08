import { Suspense, type ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import { CartIconLinkSkeleton } from '@/features/cart/CartIconLink';
import CartLink from '@/features/cart/CartLink';

export const ensureStatic = 'shell';

export default function StoreLayout({ children }: { children: ReactNode }) {
  const loggedIn = getIsAuthenticated();

  return (
    <Boundary rendering="static" hydration="server">
      <div className="flex min-h-screen flex-col">
        <AuthProvider loggedIn={loggedIn}>
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
        </AuthProvider>
      </div>
      <Footer />
    </Boundary>
  );
}
