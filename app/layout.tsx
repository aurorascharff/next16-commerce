import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Boundary from '@/components/internal/Boundary';
import { BoundaryProvider } from '@/components/internal/BoundaryProvider';
import { getIsAuthenticated } from '@/features/auth/auth-queries';
import { AuthProvider } from '@/features/auth/components/AuthProvider';

import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 App Router Commerce',
  title: 'Next 15 Commerce',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const loggedIn = getIsAuthenticated();

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <BoundaryProvider>
          <div className="flex min-h-screen flex-col">
            <AuthProvider loggedIn={loggedIn}>
              <Boundary rendering="static">
                <Header />
              </Boundary>
              <main className="mb-4 flex flex-1 flex-col gap-6 p-4 sm:mb-8 sm:gap-10 sm:p-10 lg:mb-10 2xl:px-60">
                {children}
              </main>
            </AuthProvider>
          </div>
          <Footer />
        </BoundaryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
