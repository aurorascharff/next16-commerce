import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import Product from '@/features/product/components/Product';
import ProductDetails from '@/features/product/components/ProductDetails';
import Reviews from '@/features/product/components/Reviews';
import { getRequestContext } from '@/utils/request-context';

export async function generateStaticParams() {
  return [];
}

export default async function ProductPage({ params }: PageProps<'/[requestContext]/product/[id]'>) {
  const { id } = await params;
  const { loggedIn } = getRequestContext(await params);
  const productId = Number(id);

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex w-full flex-col gap-8 self-center md:w-[700px]">
        <Card>
          <Product productId={productId} details={<ProductDetails productId={productId} loggedIn={loggedIn} />} />
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
          <Reviews productId={productId} />
        </div>
      </div>
    </div>
  );
}
