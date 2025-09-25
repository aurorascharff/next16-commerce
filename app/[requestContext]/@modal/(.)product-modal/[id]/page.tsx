<<<<<<<< HEAD:app/[requestContext]/@modal/(.)product/[id]/layout.tsx
import Modal from '@/components/ui/Modal';

export default async function ProductModalLayout({ params, children }: LayoutProps<'/[requestContext]/product/[id]'>) {
========
import Product from '@/features/product/components/Product';

export default async function ProductModal({ params }: PageProps<'/product/[id]'>) {
>>>>>>>> 0e2b4d41185eb58973b7e1e03f2778d1c200232e:app/@modal/(.)product-modal/[id]/page.tsx
  const { id } = await params;
  const productId = Number(id);

  return (
    <>
      <Product imageClassName="h-60" productId={productId} />
      <div className="mt-6 flex justify-center">
        <a
          className="text-primary hover:text-primary-dark inline-flex items-center text-sm font-medium"
          href={`/product/${productId}`}
        >
          {'View product details ->'}
        </a>
      </div>
    </>
  );
}
