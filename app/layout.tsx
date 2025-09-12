import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import UserProfile, { UserProfileSkeleton } from '@/features/user/components/UserProfile';
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 App Router Commerce',
  title: 'Next 15 Commerce',
};

export default async function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="border-divider dark:border-divider-dark flex min-h-20 items-center justify-between border-b bg-white px-4 py-4 sm:px-10 2xl:px-60 dark:bg-black">
            <h1 className="text-3xl font-bold">
              <Link prefetch href="/" className="text-primary hover:text-primary-dark font-bold">
                Commerce
              </Link>
            </h1>
            <Suspense fallback={<UserProfileSkeleton />}>{<UserProfile />}</Suspense>
          </header>
          <main className="mb-4 flex flex-1 flex-col gap-4 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
            {children}
            {modal}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
