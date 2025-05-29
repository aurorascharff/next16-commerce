import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
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
        <Header />
        {children}
        {modal}
      </body>
    </html>
  );
}
