import Modal from '@/components/ui/Modal';

export default async function ProductModalLayout({ params, children }: LayoutProps<'/[requestContext]/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      {children}
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
