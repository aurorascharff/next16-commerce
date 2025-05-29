import 'server-only';

import { prisma } from '@/db';
import type { Review } from '@prisma/client';

export async function getReviews(productId: number): Promise<Review[]> {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    where: { productId },
  });
}
