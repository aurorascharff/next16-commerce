import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    description: 'High-quality noise cancelling headphones with 20 hours battery life',
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
  },
  {
    description: 'Fitness tracker with heart rate monitor and sleep tracking',
    id: 2,
    name: 'Smart Watch',
    price: 149.95,
  },
  {
    description: 'Waterproof Bluetooth speaker with 360-degree sound',
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
  },
];

const REVIEWS = [
  {
    comment: 'Best headphones I have ever owned. The noise cancellation is amazing!',
    productId: 1,
    // Wireless Headphones
    rating: 5,
  },
  {
    comment: 'Great sound quality but a bit uncomfortable after long use.',
    productId: 1,
    // Wireless Headphones
    rating: 4,
  },
  {
    comment: 'Perfect fitness companion, battery lasts for days!',
    productId: 2,
    // Smart Watch
    rating: 5,
  },
  {
    comment: 'Good sound but not as loud as I expected.',
    productId: 3,
    // Portable Speaker
    rating: 3,
  },
];

async function seed() {
  await Promise.all(
    PRODUCTS.map(product => {
      return prisma.product.create({
        data: {
          description: product.description,
          id: product.id,
          name: product.name,
          price: product.price,
        },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created product records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create product records', e);
    });

  await Promise.all(
    REVIEWS.map(review => {
      return prisma.review.create({
        data: {
          comment: review.comment,
          productId: review.productId,
          rating: review.rating,
        },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created review records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create review records', e);
    });
}

seed();
