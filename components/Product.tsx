import React from 'react';
import { getProduct } from '@/data/services/product';

type Props = {
  productId: number;
};

export default async function Product({ productId }: Props) {
  const product = await getProduct(productId);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
