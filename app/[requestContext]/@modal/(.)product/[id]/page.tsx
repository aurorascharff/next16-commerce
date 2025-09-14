import Product from '@/features/product/components/Product';

export async function generateStaticParams() {
  return [];
}

export default async function ProductModal({ params }: PageProps<'/[requestContext]/product/[id]'>) {
  const { id } = await params;
  const productId = Number(id);

  return <Product imageClassName="h-60" productId={productId} />;
}
