import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import CartIconLink from '@/features/cart/components/CartIconLink';

export default function NotFound() {
  return (
    <Boundary rendering="static" hydration="server">
      <div className="flex min-h-screen flex-col">
        <Header cart={<CartIconLink />} showUserProfile={false} />
        <main className="3xl:px-60 mb-4 flex flex-1 flex-col items-center justify-center p-4 text-center sm:mb-8 sm:p-10 lg:mb-10 2xl:px-40">
          <h1 className="text-primary text-6xl font-bold">404</h1>
          <p className="mt-4 text-xl font-semibold">Page Not Found</p>
          <p className="text-gray dark:text-gray mt-4 max-w-md">
            The page you are looking for does not exist or has been moved to a different location.
          </p>
        </main>
      </div>
      <Footer showCategories={false} />
    </Boundary>
  );
}
