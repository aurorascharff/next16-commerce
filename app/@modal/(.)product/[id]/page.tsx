import React, { Suspense } from 'react';
import Modal from '@/components/Modal';
import Product from '@/components/Product';
import Skeleton from '@/components/ui/Skeleton';

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ProductModal({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      <Suspense fallback={<Skeleton />}>
        <Product productId={productId} />
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
