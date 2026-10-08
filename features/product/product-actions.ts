'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '@/db';

export async function setFeaturedProduct(productId: number) {
  await prisma.product.updateMany({
    data: { featured: false },
    where: { featured: true },
  });

  await prisma.product.update({
    data: { featured: true },
    where: { id: productId },
  });

  revalidateTag('featured-product', 'max');
}
