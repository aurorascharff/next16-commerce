import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import 'server-only';

export const getCategories = cache(async () => {
  await slow();

  const categories = await prisma.product.groupBy({
    by: ['category'],
    orderBy: {
      category: 'asc',
    },
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

export const getCategoriesWithCount = cache(async () => {
  await slow();

  const [categoriesData, categoriesInfo] = await Promise.all([
    prisma.product.groupBy({
      _count: {
        category: true,
      },
      by: ['category'],
      orderBy: {
        category: 'asc',
      },
      where: {
        category: {
          not: null,
        },
      },
    }),
    prisma.category.findMany({
      select: {
        description: true,
        name: true,
      },
    }),
  ]);

  const categoryMap = new Map(
    categoriesInfo.map(cat => {
      return [cat.name, cat.description];
    }),
  );

  return categoriesData
    .filter(item => {
      return item.category !== null;
    })
    .map(item => {
      return {
        count: item._count.category,
        description: categoryMap.get(item.category!),
        name: item.category!,
      };
    });
});
