import 'server-only';

import { notFound } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getProduct(productId: number) {
  await slow();

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    notFound();
  }
  return product;
}

export async function getProductDetails(productId: number) {
  await slow();

  const productDetails = await prisma.productDetail.findUnique({
    where: { productId },
  });

  if (!productDetails) {
    notFound();
  }
  return productDetails;
}

export async function getProducts(searchQuery?: string) {
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
