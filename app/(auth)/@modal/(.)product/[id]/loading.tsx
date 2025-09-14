import Modal from '@/components/ui/Modal';
import { ProductSkeleton } from '@/features/product/components/Product';

export default function Loading() {
  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      <ProductSkeleton />
      <div className="mt-6 flex justify-center">
        <div className="skeleton-animation h-5 w-32 rounded" />
      </div>
    </Modal>
  );
}
