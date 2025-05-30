import Link from 'next/link';
import React from 'react';
import { getProducts } from '@/data/services/product';

type Props = {
  searchQuery?: string;
};

export default async function ProductList({ searchQuery }: Props) {
  const products = await getProducts(searchQuery);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="border-divider dark:border-divider-dark dark:bg-card-dark flex flex-row overflow-hidden rounded-lg border bg-white hover:shadow-sm"
          >
            <div className="bg-card dark:bg-section flex h-24 w-24 min-w-[6rem] items-center justify-center">
              <span className="text-gray text-xs">Product Image</span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3">
              <h2 className="group-hover:text-primary line-clamp-1 text-base font-semibold">{product.name}</h2>
              {product.description && <p className="text-gray line-clamp-2 text-xs">{product.description}</p>}
              <p className="text-primary mt-auto text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
