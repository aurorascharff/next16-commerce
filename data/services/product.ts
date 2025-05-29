import 'server-only';

import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { notFound } from 'next/navigation';
import { prisma } from '@/db';

export async function getProduct(productId: number) {
  'use cache';
  cacheLife('hours');

  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });
  console.log('Fetching product from database:', productId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    notFound();
  }
  return product;
}

export async function getProducts(searchQuery?: string) {
  'use cache';
  cacheLife('hours');

  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  return prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      name: {
        contains: searchQuery,
        // mode: 'insensitive', // Add for postgres
      },
    },
  });
}
