/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACCOUNTS = [
  {
    address: '123 Tech Street',
    birthDate: new Date('1990-03-15'),
    city: 'San Francisco',
    country: 'United States',
    email: 'jane.smith@gmail.com',
    firstName: 'Jane',
    id: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    lastName: 'Smith',
    name: 'Jane Smith',
    phone: '+1-555-0123',
    zipCode: '94105',
  },
];

const ACCOUNT_DETAILS = [
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    language: 'en',
    newsletter: true,
    notifications: true,
    theme: 'dark',
    timezone: 'America/Los_Angeles',
  },
];

const PRODUCTS = [
  {
    category: 'Audio',
    description: 'High-quality noise cancelling headphones with 20 hours battery life',
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
  },
  {
    category: 'Wearables',
    description: 'Fitness tracker with heart rate monitor and sleep tracking',
    id: 2,
    name: 'Smart Watch',
    price: 149.95,
  },
  {
    category: 'Audio',
    description: 'Waterproof Bluetooth speaker with 360-degree sound',
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
  },
  {
    category: 'Accessories',
    description: 'Ergonomic wireless mouse with precision tracking',
    id: 4,
    name: 'Wireless Mouse',
    price: 29.99,
  },
  {
    category: 'Accessories',
    description: 'Mechanical keyboard with RGB backlighting',
    id: 5,
    name: 'Gaming Keyboard',
    price: 89.95,
  },
  {
    category: 'Accessories',
    description: 'Ultra-thin laptop stand with adjustable height',
    id: 6,
    name: 'Laptop Stand',
    price: 39.99,
  },
  {
    category: 'Accessories',
    description: 'Fast wireless charger compatible with all Qi devices',
    id: 7,
    name: 'Wireless Charger',
    price: 24.99,
  },
  {
    category: 'Electronics',
    description: 'HD webcam with auto-focus and noise reduction',
    id: 8,
    name: 'HD Webcam',
    price: 59.99,
  },
  {
    category: 'Electronics',
    description: 'Portable power bank with 20,000mAh capacity',
    id: 9,
    name: 'Power Bank',
    price: 49.95,
  },
  {
    category: 'Smart Home',
    description: 'Smart home security camera with night vision',
    id: 10,
    name: 'Security Camera',
    price: 129.99,
  },
  {
    category: 'Kitchen',
    description: 'Premium coffee maker with programmable timer',
    id: 11,
    name: 'Coffee Maker',
    price: 179.95,
  },
  {
    category: 'Home',
    description: 'Air purifier with HEPA filter for clean air',
    id: 12,
    name: 'Air Purifier',
    price: 249.99,
  },
];

const REVIEWS = [
  {
    comment: 'Best headphones I have ever owned. The noise cancellation is amazing!',
    productId: 1,
    rating: 5,
  },
  {
    comment: 'Great sound quality but a bit uncomfortable after long use.',
    productId: 1,
    rating: 4,
  },
  {
    comment: 'Perfect fitness companion, battery lasts for days!',
    productId: 2,
    rating: 5,
  },
  {
    comment: 'Good sound but not as loud as I expected.',
    productId: 3,
    rating: 3,
  },
  {
    comment: 'Perfect mouse for daily use, very comfortable grip.',
    productId: 4,
    rating: 5,
  },
  {
    comment: 'Great tactile feedback and the RGB looks amazing!',
    productId: 5,
    rating: 4,
  },
  {
    comment: 'Sturdy build quality, perfect for my MacBook.',
    productId: 6,
    rating: 5,
  },
  {
    comment: 'Charges my phone quickly, very convenient.',
    productId: 7,
    rating: 4,
  },
  {
    comment: 'Crystal clear video quality for video calls.',
    productId: 8,
    rating: 5,
  },
  {
    comment: 'Reliable power bank, charges my devices multiple times.',
    productId: 9,
    rating: 4,
  },
  {
    comment: 'Easy setup and great night vision quality.',
    productId: 10,
    rating: 5,
  },
  {
    comment: 'Makes excellent coffee, timer feature is very useful.',
    productId: 11,
    rating: 4,
  },
  {
    comment: 'Noticeably cleaner air, quiet operation.',
    productId: 12,
    rating: 5,
  },
];

const PRODUCT_DETAILS = [
  {
    brand: 'SoundMaster',
    dimensions: '7.5 x 6.5 x 3.2 inches',
    materials: 'Memory foam, aluminum, plastic',
    origin: 'Japan',
    productId: 1,
    sku: 'WH-NC100',
    stockCount: 45,
    warrantyInfo: '2 year limited warranty',
    weight: 0.25,
  },
  {
    brand: 'TechFit',
    dimensions: '1.6 x 1.6 x 0.5 inches',
    materials: 'Silicone, aluminum, glass',
    origin: 'China',
    productId: 2,
    sku: 'SW-FIT200',
    stockCount: 32,
    warrantyInfo: '1 year limited warranty',
    weight: 0.05,
  },
  {
    brand: 'AudioPro',
    dimensions: '5.5 x 5.5 x 8.2 inches',
    materials: 'Rubber, fabric, plastic',
    origin: 'Taiwan',
    productId: 3,
    sku: 'PS-BT300',
    stockCount: 78,
    warrantyInfo: '1 year limited warranty',
    weight: 0.6,
  },
  {
    brand: 'ErgoTech',
    dimensions: '4.7 x 2.8 x 1.5 inches',
    materials: 'ABS plastic, rubber grip',
    origin: 'China',
    productId: 4,
    sku: 'WM-ERG400',
    stockCount: 156,
    warrantyInfo: '1 year limited warranty',
    weight: 0.1,
  },
  {
    brand: 'GamePro',
    dimensions: '17.3 x 5.1 x 1.4 inches',
    materials: 'Aluminum frame, mechanical switches',
    origin: 'Taiwan',
    productId: 5,
    sku: 'KB-RGB500',
    stockCount: 89,
    warrantyInfo: '2 year limited warranty',
    weight: 1.2,
  },
  {
    brand: 'DeskMate',
    dimensions: '10 x 9 x 6 inches',
    materials: 'Aluminum alloy, silicone pads',
    origin: 'USA',
    productId: 6,
    sku: 'LS-ADJ600',
    stockCount: 67,
    warrantyInfo: '1 year limited warranty',
    weight: 0.8,
  },
  {
    brand: 'ChargeFast',
    dimensions: '4 x 4 x 0.4 inches',
    materials: 'Tempered glass, aluminum',
    origin: 'Korea',
    productId: 7,
    sku: 'WC-QI700',
    stockCount: 234,
    warrantyInfo: '1 year limited warranty',
    weight: 0.2,
  },
  {
    brand: 'StreamCam',
    dimensions: '3.7 x 2.1 x 2.1 inches',
    materials: 'Plastic housing, glass lens',
    origin: 'China',
    productId: 8,
    sku: 'HD-CAM800',
    stockCount: 123,
    warrantyInfo: '1 year limited warranty',
    weight: 0.15,
  },
  {
    brand: 'PowerMax',
    dimensions: '6.3 x 3 x 0.8 inches',
    materials: 'Lithium polymer, ABS plastic',
    origin: 'China',
    productId: 9,
    sku: 'PB-20K900',
    stockCount: 178,
    warrantyInfo: '1 year limited warranty',
    weight: 0.45,
  },
  {
    brand: 'SecureHome',
    dimensions: '4.5 x 4.5 x 6.2 inches',
    materials: 'Weather-resistant plastic, glass',
    origin: 'Taiwan',
    productId: 10,
    sku: 'SC-NV1000',
    stockCount: 56,
    warrantyInfo: '2 year limited warranty',
    weight: 0.35,
  },
  {
    brand: 'BrewMaster',
    dimensions: '12 x 8 x 14 inches',
    materials: 'Stainless steel, glass carafe',
    origin: 'Germany',
    productId: 11,
    sku: 'CM-PRO1100',
    stockCount: 34,
    warrantyInfo: '3 year limited warranty',
    weight: 3.2,
  },
  {
    brand: 'CleanAir',
    dimensions: '16 x 8 x 20 inches',
    materials: 'ABS plastic, HEPA filter',
    origin: 'Sweden',
    productId: 12,
    sku: 'AP-HEPA1200',
    stockCount: 45,
    warrantyInfo: '2 year limited warranty',
    weight: 4.8,
  },
];

const SAVED_PRODUCTS = [
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    productId: 1,
  },
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    productId: 3,
  },
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    productId: 5,
  },
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    productId: 8,
  },
];

async function seed() {
  await Promise.all(
    ACCOUNTS.map(account => {
      return prisma.account.upsert({
        create: {
          address: account.address,
          birthDate: account.birthDate,
          city: account.city,
          country: account.country,
          email: account.email,
          firstName: account.firstName,
          id: account.id,
          lastName: account.lastName,
          name: account.name,
          phone: account.phone,
          zipCode: account.zipCode,
        },
        update: {
          address: account.address,
          birthDate: account.birthDate,
          city: account.city,
          country: account.country,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          name: account.name,
          phone: account.phone,
          zipCode: account.zipCode,
        },
        where: { id: account.id },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create account records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create account records', e);
    });

  await Promise.all(
    ACCOUNT_DETAILS.map(detail => {
      return prisma.accountDetail.upsert({
        create: {
          accountId: detail.accountId,
          language: detail.language,
          newsletter: detail.newsletter,
          notifications: detail.notifications,
          theme: detail.theme,
          timezone: detail.timezone,
        },
        update: {
          language: detail.language,
          newsletter: detail.newsletter,
          notifications: detail.notifications,
          theme: detail.theme,
          timezone: detail.timezone,
        },
        where: { accountId: detail.accountId },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created account details records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create account details records', e);
    });

  await Promise.all(
    PRODUCTS.map(product => {
      return prisma.product.upsert({
        create: {
          category: product.category,
          description: product.description,
          id: product.id,
          name: product.name,
          price: product.price,
        },
        update: {
          category: product.category,
          description: product.description,
          name: product.name,
          price: product.price,
        },
        where: { id: product.id },
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

  await Promise.all(
    PRODUCT_DETAILS.map(detail => {
      return prisma.productDetail.upsert({
        create: {
          brand: detail.brand,
          dimensions: detail.dimensions,
          materials: detail.materials,
          origin: detail.origin,
          productId: detail.productId,
          sku: detail.sku,
          stockCount: detail.stockCount,
          warrantyInfo: detail.warrantyInfo,
          weight: detail.weight,
        },
        update: {
          brand: detail.brand,
          dimensions: detail.dimensions,
          materials: detail.materials,
          origin: detail.origin,
          sku: detail.sku,
          stockCount: detail.stockCount,
          warrantyInfo: detail.warrantyInfo,
          weight: detail.weight,
        },
        where: { productId: detail.productId },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created product details records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create product details records', e);
    });

  await Promise.all(
    SAVED_PRODUCTS.map(savedProduct => {
      return prisma.savedProduct.upsert({
        create: {
          accountId: savedProduct.accountId,
          productId: savedProduct.productId,
        },
        update: {},
        where: {
          accountId_productId: {
            accountId: savedProduct.accountId,
            productId: savedProduct.productId,
          },
        },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created saved products records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create saved products records', e);
    });
}

seed();
