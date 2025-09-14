import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import React, { Suspense } from 'react';
import Modal from '@/components/ui/Modal';
import Product, { ProductSkeleton } from '@/features/product/components/Product';

export default async function ProductModal({ params }: PageProps<'/product/[id]'>) {
  'use cache';

  const { id } = await params;
  const productId = Number(id);

  cacheLife('days');
  cacheTag('product-' + productId);

  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      <Suspense fallback={<ProductSkeleton />}>
        <Product imageClassName="h-60" productId={productId} />
      </Suspense>
      <div className="mt-6 flex justify-center">
        <a
          className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
          href={`/product/${productId}`}
        >
          {'View product details ->'}
        </a>
      </div>
    </Modal>
  );
}
