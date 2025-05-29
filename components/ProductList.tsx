import Link from 'next/link';
import React from 'react';
import { getProducts } from '@/data/services/product';

type Props = {
  searchQuery?: string;
};

export default async function ProductList({ searchQuery }: Props) {
  const products = await getProducts(searchQuery);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} className="rounded-lg border p-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </Link>
        );
      })}
    </div>
  );
}
