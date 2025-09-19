'use cache: remote';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProductLayout({ children }: LayoutProps<'/product/[id]'>) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium">
        <ArrowLeft aria-hidden className="size-4" />
        Back Home
      </Link>
      {children}
    </div>
  );
}
