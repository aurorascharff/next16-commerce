import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Card from '@/components/ui/Card';
import Reviews, { ReviewsSkeleton } from '@/features/product/components/Reviews';
import type { Route } from 'next';

export default async function ProductLayout({ params, children }: LayoutProps<'/[requestContext]/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={'/' as Route}
        className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back Home
      </Link>
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>{children}</Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviews productId={productId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
