import './globals.css';
import { Inter } from 'next/font/google';

import Link from 'next/link';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js App Router Commerce',
  title: 'Next.js App Router Commerce',
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mb-8 flex flex-col gap-10 p-4 sm:p-10">
          <header className="border-divider dark:border-divider-dark border-b bg-white py-4 dark:bg-black">
            <h1 className="text-3xl font-bold">
              <Link href="/" className="text-primary hover:text-primary-dark">
                Commerce
              </Link>
            </h1>
          </header>
          {children}
        </div>
        {modal}
      </body>
    </html>
  );
}
