import { getProduct } from '@/features/product/product-queries';
import AddToCartButton from './AddToCartButton';

export default async function AddToCart({ productId }: { productId: number }) {
  const product = await getProduct(productId);

  return <AddToCartButton product={{ id: product.id, name: product.name, price: product.price }} />;
}
