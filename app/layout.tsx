import './globals.css';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { BoundaryProvider } from '@/components/internal/BoundaryProvider';
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 App Router Commerce',
  title: 'Next 15 Commerce',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  'use cache';
  cacheLife('max');

  return (
    <html lang="en">
      <body className={inter.className}>
        <BoundaryProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
          <Footer />
        </BoundaryProvider>
      </body>
    </html>
  );
}
