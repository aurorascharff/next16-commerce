import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';

export default async function ProductLayout({ children }: LayoutProps<'/[requestContext]/product/[id]'>) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={'/' as Route}
        className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back Home
      </Link>
      {children}
    </div>
  );
}
