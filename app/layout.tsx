import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist } from 'next/font/google';
import Footer from '@/components/Footer';
import { BoundaryProvider } from '@/components/internal/BoundaryProvider';
import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 App Router Commerce',
  title: 'Next 15 Commerce',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <BoundaryProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
          <Footer />
        </BoundaryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
