import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { verifyAuth } from '../auth/auth-actions';

export const getProduct = cache(async (productId: number) => {
  await slow();

  if (!productId || isNaN(productId) || productId <= 0) {
    notFound();
  }

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

  if (!productId || isNaN(productId) || productId <= 0) {
    notFound();
  }

  const productDetails = await prisma.productDetail.findUnique({
    where: { productId },
  });

  if (!productDetails) {
    notFound();
  }
  return productDetails;
});

export const getProducts = cache(
  async (searchQuery?: string, sort?: 'asc' | 'desc', page = 1, limit = 9, category?: string) => {
    await slow();

    const skip = (page - 1) * limit;

    const whereClause: {
      name?: { contains: string };
      category?: { equals: string };
    } = {};

    if (searchQuery) {
      whereClause.name = {
        contains: searchQuery,
      };
    }

    if (category) {
      whereClause.category = {
        equals: category,
      };
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        orderBy: {
          name: sort === 'asc' ? 'asc' : 'desc', // Fixed: was reversed
        },
        select: {
          category: true,
          createdAt: true,
          description: true,
          id: true,
          name: true,
          price: true,
        },
        skip,
        take: limit,
        where: whereClause,
      }),
      prisma.product.count({
        where: whereClause,
      }),
    ]);

    return {
      currentPage: page,
      products,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },
);

export const getReviews = cache(async (productId: number) => {
  await slow();

  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    where: { productId },
  });
});

export const isSavedProduct = cache(async (productId: number) => {
  const accountId = await verifyAuth();

  const savedProduct = await prisma.savedProduct.findUnique({
    where: {
      accountId_productId: {
        accountId,
        productId,
      },
    },
  });

  return !!savedProduct;
});

export const getSavedProducts = cache(async () => {
  await slow();

  const accountId = await verifyAuth();

  const savedProducts = await prisma.savedProduct.findMany({
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
    where: { accountId },
  });

  return savedProducts.map(saved => {
    return saved.product;
  });
});

export const getFeaturedProducts = cache(async (limit = 4) => {
  await slow(2000);

  const featuredProducts = await prisma.product.findMany({
    orderBy: { updatedAt: 'desc' },
    take: limit,
    where: { featured: true },
  });

  if (featuredProducts.length < limit) {
    const additionalNeeded = limit - featuredProducts.length;
    const featuredIds = featuredProducts.map(p => {
      return p.id;
    });

    const recentProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: additionalNeeded,
      where: {
        id: { notIn: featuredIds },
      },
    });

    return [...featuredProducts, ...recentProducts];
  }

  return featuredProducts;
});

export const getRecommendedProducts = cache(async (limit = 4) => {
  await slow(500);

  const accountId = await verifyAuth();

  // Get user's saved products to understand their preferences
  const savedProducts = await prisma.savedProduct.findMany({
    include: {
      product: true,
    },
    where: { accountId },
  });

  let recommendedProducts: Awaited<ReturnType<typeof prisma.product.findMany>> = [];

  if (savedProducts.length > 0) {
    // Get a random category from saved products
    const categories = Array.from(
      new Set(
        savedProducts
          .map(sp => {
            return sp.product.category;
          })
          .filter(Boolean),
      ),
    );
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    if (randomCategory) {
      // Get products from that category, excluding already saved ones
      recommendedProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        where: {
          category: {
            equals: randomCategory,
          },
          id: {
            notIn: savedProducts.map(sp => {
              return sp.product.id;
            }),
          },
        },
      });
    }
  }

  // If no recommendations or not enough, fall back to featured products
  if (recommendedProducts.length < limit) {
    const featuredProducts = await getFeaturedProducts(limit);
    const excludeIds = [
      ...savedProducts.map(sp => {
        return sp.product.id;
      }),
      ...recommendedProducts.map(p => {
        return p.id;
      }),
    ];

    const additionalProducts = featuredProducts.filter(product => {
      return !excludeIds.includes(product.id);
    });

    recommendedProducts = [...recommendedProducts, ...additionalProducts];
  }

  return recommendedProducts.slice(0, limit);
});

export async function setFeaturedProduct(productId: number) {
  if (!productId || isNaN(productId) || productId <= 0) {
    throw new Error('Invalid product ID');
  }

  // First, unfeatured all other products
  await prisma.product.updateMany({
    data: { featured: false },
    where: { featured: true },
  });

  // Then feature the specified product
  const updatedProduct = await prisma.product.update({
    data: { featured: true },
    where: { id: productId },
  });

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
}
