import 'server-only';

import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { notFound } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getProduct(productId: number) {
  'use cache';
  cacheLife('hours');

  await slow();

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

  await slow();

  return prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      name: {
        contains: searchQuery,
        mode: 'insensitive', // Remove with sqlite
      },
    },
  });
}
