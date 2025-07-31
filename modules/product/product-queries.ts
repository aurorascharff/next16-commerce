import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getProduct = cache(async (productId: number) => {
  await slow();

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    notFound();
  }
  return product;
});

export const getProductDetails = cache(async (productId: number) => {
  await slow();

  const productDetails = await prisma.productDetail.findUnique({
    where: { productId },
  });

  if (!productDetails) {
    notFound();
  }
  return productDetails;
});
export const getProducts = cache(async (searchQuery?: string, sort?: 'asc' | 'desc') => {
  await slow();

  return prisma.product.findMany({
    orderBy: {
      name: sort === 'asc' ? 'asc' : 'desc',
    },
    where: {
      name: {
        contains: searchQuery,
        mode: 'insensitive', // Remove with sqlite
      },
    },
  });
});

export const getReviews = cache(async (productId: number) => {
  await slow();

  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    where: { productId },
  });
});

export const getCategories = cache(async () => {
  await slow();

  const categories = await prisma.product.findMany({
    distinct: ['category'],
    orderBy: {
      category: 'asc',
    },
    select: {
      category: true,
    },
    take: 20,
    where: {
      category: {
        not: null,
      },
    },
  });

  return categories
    .map(item => {
      return item.category;
    })
    .filter(Boolean) as string[];
});
