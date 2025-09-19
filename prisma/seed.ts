/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  {
    description: 'Essential gadgets and accessories to enhance your productivity.',
    name: 'Accessories',
  },
  {
    description: 'Premium headphones, speakers, and audio equipment for conference-quality sound.',
    name: 'Audio',
  },
  {
    description: 'High-performance devices and electronics for professionals.',
    name: 'Electronics',
  },
  {
    description: 'Essential items and appliances to enhance your living space.',
    name: 'Home',
  },
  {
    description: 'Premium kitchen appliances and tools for your modern kitchen.',
    name: 'Kitchen',
  },
  {
    description: 'Connect your workspace with intelligent automation solutions.',
    name: 'Smart Home',
  },
  {
    description: 'Smart devices to track your health and productivity.',
    name: 'Wearables',
  },
];

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
  // Audio Category (6 products)
  {
    category: 'Audio',
    description: 'High-quality noise cancelling headphones with 20 hours battery life',
    featured: true,
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
  },
  {
    category: 'Audio',
    description: 'Waterproof Bluetooth speaker with 360-degree sound',
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
  },
  {
    category: 'Audio',
    description: 'Premium studio-quality headphones for audio professionals',
    id: 13,
    name: 'Studio Headphones',
    price: 299.99,
  },
  {
    category: 'Audio',
    description: 'Compact earbuds with active noise cancellation',
    id: 14,
    name: 'True Wireless Earbuds',
    price: 129.99,
  },
  {
    category: 'Audio',
    description: 'High-power Bluetooth speaker with deep bass',
    id: 15,
    name: 'Bass Speaker',
    price: 149.99,
  },
  {
    category: 'Audio',
    description: 'Professional USB microphone for podcasting and streaming',
    id: 16,
    name: 'USB Microphone',
    price: 89.99,
  },

  // Wearables Category (5 products)
  {
    category: 'Wearables',
    description: 'Fitness tracker with heart rate monitor and sleep tracking',
    id: 2,
    name: 'Smart Watch',
    price: 149.95,
  },
  {
    category: 'Wearables',
    description: 'Advanced fitness tracker with GPS and water resistance',
    id: 17,
    name: 'Fitness Tracker Pro',
    price: 199.99,
  },
  {
    category: 'Wearables',
    description: 'Smart ring for health monitoring and sleep analysis',
    id: 18,
    name: 'Smart Ring',
    price: 249.99,
  },
  {
    category: 'Wearables',
    description: 'Kids smartwatch with GPS tracking and parental controls',
    id: 19,
    name: 'Kids Smart Watch',
    price: 99.99,
  },
  {
    category: 'Wearables',
    description: 'Heart rate monitor chest strap for serious athletes',
    id: 20,
    name: 'Heart Rate Monitor',
    price: 69.99,
  },

  // Accessories Category (6 products)
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
    category: 'Accessories',
    description: 'Multi-port USB-C hub with 4K HDMI output',
    id: 21,
    name: 'USB-C Hub',
    price: 79.99,
  },
  {
    category: 'Accessories',
    description: 'Premium leather laptop sleeve with magnetic closure',
    id: 22,
    name: 'Laptop Sleeve',
    price: 49.99,
  },

  // Electronics Category (6 products)
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
    category: 'Electronics',
    description: '4K action camera with image stabilization',
    id: 23,
    name: '4K Action Camera',
    price: 199.99,
  },
  {
    category: 'Electronics',
    description: 'Wireless charging pad with fast charging support',
    id: 24,
    name: 'Charging Pad',
    price: 34.99,
  },
  {
    category: 'Electronics',
    description: 'Portable projector with wireless connectivity',
    id: 25,
    name: 'Mini Projector',
    price: 299.99,
  },
  {
    category: 'Electronics',
    description: 'Digital photo frame with Wi-Fi and cloud sync',
    id: 26,
    name: 'Digital Photo Frame',
    price: 129.99,
  },

  // Smart Home Category (5 products)
  {
    category: 'Smart Home',
    description: 'Smart home security camera with night vision',
    id: 10,
    name: 'Security Camera',
    price: 129.99,
  },
  {
    category: 'Smart Home',
    description: 'Smart doorbell with video and two-way audio',
    id: 27,
    name: 'Smart Doorbell',
    price: 179.99,
  },
  {
    category: 'Smart Home',
    description: 'Smart light bulbs with color changing and app control',
    id: 28,
    name: 'Smart Light Bulbs',
    price: 39.99,
  },
  {
    category: 'Smart Home',
    description: 'Smart thermostat with energy saving features',
    id: 29,
    name: 'Smart Thermostat',
    price: 249.99,
  },
  {
    category: 'Smart Home',
    description: 'Smart plug with voice control and scheduling',
    id: 30,
    name: 'Smart Plug',
    price: 19.99,
  },

  // Kitchen Category (5 products)
  {
    category: 'Kitchen',
    description: 'Premium coffee maker with programmable timer',
    id: 11,
    name: 'Coffee Maker',
    price: 179.95,
  },
  {
    category: 'Kitchen',
    description: 'Smart air fryer with app control and presets',
    id: 31,
    name: 'Smart Air Fryer',
    price: 149.99,
  },
  {
    category: 'Kitchen',
    description: 'High-speed blender with multiple speed settings',
    id: 32,
    name: 'High-Speed Blender',
    price: 199.99,
  },
  {
    category: 'Kitchen',
    description: 'Electric kettle with temperature control',
    id: 33,
    name: 'Electric Kettle',
    price: 69.99,
  },
  {
    category: 'Kitchen',
    description: 'Food processor with multiple attachments',
    id: 34,
    name: 'Food Processor',
    price: 129.99,
  },

  // Home Category (5 products)
  {
    category: 'Home',
    description: 'Air purifier with HEPA filter for clean air',
    id: 12,
    name: 'Air Purifier',
    price: 249.99,
  },
  {
    category: 'Home',
    description: 'Humidifier with essential oil diffuser function',
    id: 35,
    name: 'Humidifier',
    price: 89.99,
  },
  {
    category: 'Home',
    description: 'Robot vacuum with smart mapping technology',
    id: 36,
    name: 'Robot Vacuum',
    price: 399.99,
  },
  {
    category: 'Home',
    description: 'Tower fan with remote control and timer',
    id: 37,
    name: 'Tower Fan',
    price: 119.99,
  },
  {
    category: 'Home',
    description: 'LED desk lamp with wireless charging base',
    id: 38,
    name: 'LED Desk Lamp',
    price: 79.99,
  },
];

const REVIEWS = [
  // Audio category reviews
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
    comment: 'Good sound but not as loud as I expected.',
    productId: 3,
    rating: 3,
  },
  {
    comment: 'Incredible sound quality for studio work!',
    productId: 13,
    rating: 5,
  },
  {
    comment: 'Perfect for my daily commute, great noise cancellation.',
    productId: 14,
    rating: 5,
  },
  {
    comment: 'Amazing bass response, perfect for parties.',
    productId: 15,
    rating: 4,
  },
  {
    comment: 'Crystal clear audio for my podcast recordings.',
    productId: 16,
    rating: 5,
  },

  // Wearables category reviews
  {
    comment: 'Perfect fitness companion, battery lasts for days!',
    productId: 2,
    rating: 5,
  },
  {
    comment: 'GPS tracking is very accurate for my runs.',
    productId: 17,
    rating: 5,
  },
  {
    comment: 'Comfortable to wear 24/7, great sleep tracking.',
    productId: 18,
    rating: 4,
  },
  {
    comment: 'My kids love it and I feel more secure knowing their location.',
    productId: 19,
    rating: 5,
  },
  {
    comment: 'Very accurate heart rate monitoring for workouts.',
    productId: 20,
    rating: 4,
  },

  // Accessories category reviews
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
    comment: 'All the ports I need in one compact hub.',
    productId: 21,
    rating: 5,
  },
  {
    comment: 'Beautiful leather quality, fits my laptop perfectly.',
    productId: 22,
    rating: 5,
  },

  // Electronics category reviews
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
    comment: 'Amazing 4K quality for my adventure videos.',
    productId: 23,
    rating: 5,
  },
  {
    comment: 'Fast charging and sleek design.',
    productId: 24,
    rating: 4,
  },
  {
    comment: 'Perfect for movie nights, surprisingly bright picture.',
    productId: 25,
    rating: 4,
  },
  {
    comment: 'Love seeing family photos displayed all day.',
    productId: 26,
    rating: 5,
  },

  // Smart Home category reviews
  {
    comment: 'Easy setup and great night vision quality.',
    productId: 10,
    rating: 5,
  },
  {
    comment: 'Never miss a delivery again, great video quality.',
    productId: 27,
    rating: 5,
  },
  {
    comment: 'Love changing colors to match my mood.',
    productId: 28,
    rating: 4,
  },
  {
    comment: 'Saves money on energy bills and very smart.',
    productId: 29,
    rating: 5,
  },
  {
    comment: 'Simple setup and works perfectly with voice commands.',
    productId: 30,
    rating: 4,
  },

  // Kitchen category reviews
  {
    comment: 'Makes excellent coffee, timer feature is very useful.',
    productId: 11,
    rating: 4,
  },
  {
    comment: 'Healthy cooking made easy, food comes out crispy.',
    productId: 31,
    rating: 5,
  },
  {
    comment: 'Powerful blender, makes perfect smoothies every time.',
    productId: 32,
    rating: 5,
  },
  {
    comment: 'Perfect temperature control for different teas.',
    productId: 33,
    rating: 4,
  },
  {
    comment: 'Saves so much time in meal prep.',
    productId: 34,
    rating: 5,
  },

  // Home category reviews
  {
    comment: 'Noticeably cleaner air, quiet operation.',
    productId: 12,
    rating: 5,
  },
  {
    comment: 'Perfect humidity levels and love the aromatherapy feature.',
    productId: 35,
    rating: 4,
  },
  {
    comment: 'Keeps my floors spotless without any effort.',
    productId: 36,
    rating: 5,
  },
  {
    comment: 'Quiet operation and powerful airflow.',
    productId: 37,
    rating: 4,
  },
  {
    comment: 'Great light quality and convenient wireless charging.',
    productId: 38,
    rating: 5,
  },
];

const PRODUCT_DETAILS = [
  // Audio category details
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
    brand: 'ProAudio',
    dimensions: '8.2 x 7.1 x 3.8 inches',
    materials: 'Premium leather, steel, memory foam',
    origin: 'Germany',
    productId: 13,
    sku: 'SH-PRO130',
    stockCount: 23,
    warrantyInfo: '3 year limited warranty',
    weight: 0.35,
  },
  {
    brand: 'SoundMini',
    dimensions: '1.2 x 1.0 x 0.8 inches',
    materials: 'Silicone, titanium drivers',
    origin: 'Denmark',
    productId: 14,
    sku: 'TWE-NC140',
    stockCount: 67,
    warrantyInfo: '1 year limited warranty',
    weight: 0.01,
  },
  {
    brand: 'BassMax',
    dimensions: '8.0 x 8.0 x 12.5 inches',
    materials: 'Metal grille, rubber, plastic',
    origin: 'USA',
    productId: 15,
    sku: 'BS-MAX150',
    stockCount: 34,
    warrantyInfo: '2 year limited warranty',
    weight: 1.2,
  },
  {
    brand: 'StreamPro',
    dimensions: '3.5 x 3.5 x 8.0 inches',
    materials: 'Metal mesh, aluminum body',
    origin: 'Sweden',
    productId: 16,
    sku: 'USB-MIC160',
    stockCount: 89,
    warrantyInfo: '2 year limited warranty',
    weight: 0.4,
  },

  // Wearables category details
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
    brand: 'FitTrack',
    dimensions: '1.8 x 1.8 x 0.6 inches',
    materials: 'Titanium, sapphire glass, silicone',
    origin: 'Switzerland',
    productId: 17,
    sku: 'FT-PRO170',
    stockCount: 45,
    warrantyInfo: '2 year limited warranty',
    weight: 0.08,
  },
  {
    brand: 'HealthRing',
    dimensions: '0.8 x 0.8 x 0.3 inches',
    materials: 'Titanium, ceramic, medical-grade silicone',
    origin: 'Finland',
    productId: 18,
    sku: 'HR-SMART180',
    stockCount: 28,
    warrantyInfo: '1 year limited warranty',
    weight: 0.005,
  },
  {
    brand: 'KidSafe',
    dimensions: '1.4 x 1.4 x 0.5 inches',
    materials: 'Food-grade silicone, plastic',
    origin: 'Canada',
    productId: 19,
    sku: 'KS-WATCH190',
    stockCount: 76,
    warrantyInfo: '1 year limited warranty',
    weight: 0.04,
  },
  {
    brand: 'AthleteHR',
    dimensions: '2.5 x 1.5 x 0.8 inches',
    materials: 'Soft fabric strap, plastic sensor',
    origin: 'Norway',
    productId: 20,
    sku: 'AH-MONITOR200',
    stockCount: 123,
    warrantyInfo: '1 year limited warranty',
    weight: 0.06,
  },

  // Accessories category details
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
    brand: 'ConnectPro',
    dimensions: '4.5 x 2.0 x 0.7 inches',
    materials: 'Aluminum alloy, USB-C connectors',
    origin: 'Netherlands',
    productId: 21,
    sku: 'CP-HUB210',
    stockCount: 145,
    warrantyInfo: '2 year limited warranty',
    weight: 0.15,
  },
  {
    brand: 'LeatherCraft',
    dimensions: '14 x 10 x 0.5 inches',
    materials: 'Premium leather, microfiber lining',
    origin: 'Italy',
    productId: 22,
    sku: 'LC-SLEEVE220',
    stockCount: 87,
    warrantyInfo: '1 year limited warranty',
    weight: 0.25,
  },

  // Electronics category details
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
    brand: 'ActionPro',
    dimensions: '2.5 x 1.8 x 1.2 inches',
    materials: 'Waterproof housing, glass lens',
    origin: 'Japan',
    productId: 23,
    sku: 'AP-4K230',
    stockCount: 56,
    warrantyInfo: '2 year limited warranty',
    weight: 0.12,
  },
  {
    brand: 'QuickCharge',
    dimensions: '6 x 4 x 0.5 inches',
    materials: 'Tempered glass, wireless coils',
    origin: 'Korea',
    productId: 24,
    sku: 'QC-PAD240',
    stockCount: 198,
    warrantyInfo: '1 year limited warranty',
    weight: 0.3,
  },
  {
    brand: 'MiniBeam',
    dimensions: '5.5 x 3.5 x 1.8 inches',
    materials: 'Aluminum housing, LED projector',
    origin: 'Taiwan',
    productId: 25,
    sku: 'MB-PROJ250',
    stockCount: 34,
    warrantyInfo: '2 year limited warranty',
    weight: 0.6,
  },
  {
    brand: 'PhotoDisplay',
    dimensions: '8.5 x 6.0 x 0.8 inches',
    materials: 'Wood frame, LCD display',
    origin: 'China',
    productId: 26,
    sku: 'PD-FRAME260',
    stockCount: 73,
    warrantyInfo: '1 year limited warranty',
    weight: 0.5,
  },

  // Smart Home category details
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
    brand: 'DoorGuard',
    dimensions: '4.8 x 2.4 x 1.0 inches',
    materials: 'Weather-resistant plastic, metal',
    origin: 'USA',
    productId: 27,
    sku: 'DG-BELL270',
    stockCount: 89,
    warrantyInfo: '2 year limited warranty',
    weight: 0.25,
  },
  {
    brand: 'LightSmart',
    dimensions: '2.4 x 2.4 x 4.3 inches',
    materials: 'Plastic housing, LED chips',
    origin: 'Netherlands',
    productId: 28,
    sku: 'LS-BULB280',
    stockCount: 267,
    warrantyInfo: '2 year limited warranty',
    weight: 0.08,
  },
  {
    brand: 'ClimateControl',
    dimensions: '4.2 x 4.2 x 1.0 inches',
    materials: 'Plastic, electronic components',
    origin: 'Germany',
    productId: 29,
    sku: 'CC-THERMO290',
    stockCount: 43,
    warrantyInfo: '3 year limited warranty',
    weight: 0.18,
  },
  {
    brand: 'PowerSmart',
    dimensions: '2.7 x 1.6 x 2.8 inches',
    materials: 'Fire-resistant plastic',
    origin: 'China',
    productId: 30,
    sku: 'PS-PLUG300',
    stockCount: 456,
    warrantyInfo: '1 year limited warranty',
    weight: 0.12,
  },

  // Kitchen category details
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
    brand: 'CookSmart',
    dimensions: '14 x 11 x 13 inches',
    materials: 'Stainless steel, non-stick coating',
    origin: 'France',
    productId: 31,
    sku: 'CS-AIRFRY310',
    stockCount: 67,
    warrantyInfo: '2 year limited warranty',
    weight: 4.5,
  },
  {
    brand: 'BlendMax',
    dimensions: '7 x 8 x 17 inches',
    materials: 'Stainless steel blades, BPA-free plastic',
    origin: 'USA',
    productId: 32,
    sku: 'BM-BLEND320',
    stockCount: 45,
    warrantyInfo: '3 year limited warranty',
    weight: 3.8,
  },
  {
    brand: 'HotWater',
    dimensions: '9 x 6 x 10 inches',
    materials: 'Stainless steel, plastic base',
    origin: 'UK',
    productId: 33,
    sku: 'HW-KETTLE330',
    stockCount: 98,
    warrantyInfo: '2 year limited warranty',
    weight: 1.5,
  },
  {
    brand: 'ChopMaster',
    dimensions: '12 x 9 x 9 inches',
    materials: 'Stainless steel, BPA-free plastic',
    origin: 'Germany',
    productId: 34,
    sku: 'CM-PROC340',
    stockCount: 56,
    warrantyInfo: '2 year limited warranty',
    weight: 2.8,
  },

  // Home category details
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
  {
    brand: 'MoistureMax',
    dimensions: '8 x 8 x 12 inches',
    materials: 'BPA-free plastic, ceramic components',
    origin: 'Japan',
    productId: 35,
    sku: 'MM-HUMID350',
    stockCount: 78,
    warrantyInfo: '1 year limited warranty',
    weight: 2.1,
  },
  {
    brand: 'CleanBot',
    dimensions: '13.4 x 13.4 x 3.6 inches',
    materials: 'ABS plastic, rubber brushes',
    origin: 'Korea',
    productId: 36,
    sku: 'CB-ROBOT360',
    stockCount: 23,
    warrantyInfo: '2 year limited warranty',
    weight: 6.2,
  },
  {
    brand: 'AirFlow',
    dimensions: '12 x 12 x 42 inches',
    materials: 'Plastic housing, metal fan',
    origin: 'China',
    productId: 37,
    sku: 'AF-TOWER370',
    stockCount: 67,
    warrantyInfo: '2 year limited warranty',
    weight: 8.5,
  },
  {
    brand: 'DeskLight',
    dimensions: '6 x 6 x 18 inches',
    materials: 'Aluminum, LED strips, wireless charging coils',
    origin: 'Denmark',
    productId: 38,
    sku: 'DL-LAMP380',
    stockCount: 134,
    warrantyInfo: '2 year limited warranty',
    weight: 1.8,
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

const DISCOUNTS = [
  {
    code: 'WELCOME20',
    description: '20% off your first order',
    expiry: new Date('2025-12-31'),
    id: 1,
    percentage: 20,
  },
  {
    code: 'LOYAL15',
    description: '15% off for loyal customers',
    expiry: new Date('2025-09-30'),
    id: 2,
    percentage: 15,
  },
  {
    code: 'TECH10',
    description: '10% off electronics',
    expiry: new Date('2025-08-15'),
    id: 3,
    percentage: 10,
  },
];

const USER_DISCOUNTS = [
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    discountId: 1,
  },
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    discountId: 2,
  },
  {
    accountId: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    discountId: 3,
  },
];

async function seed() {
  // Delete all existing data in the correct order (respecting foreign key constraints)
  console.info('[SEED] Deleting existing data...');
  await prisma.userDiscount.deleteMany({});
  await prisma.discount.deleteMany({});
  await prisma.savedProduct.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.productDetail.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.accountDetail.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.category.deleteMany({});
  console.info('[SEED] Successfully deleted existing data');

  // Create categories first
  await Promise.all(
    CATEGORIES.map(category => {
      return prisma.category.create({
        data: {
          description: category.description,
          name: category.name,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created category records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create category records', e);
    });

  // Create accounts
  await Promise.all(
    ACCOUNTS.map(account => {
      return prisma.account.create({
        data: {
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
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create account records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create account records', e);
    });

  // Create account details
  await Promise.all(
    ACCOUNT_DETAILS.map(detail => {
      return prisma.accountDetail.create({
        data: {
          accountId: detail.accountId,
          language: detail.language,
          newsletter: detail.newsletter,
          notifications: detail.notifications,
          theme: detail.theme,
          timezone: detail.timezone,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created account details records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create account details records', e);
    });

  // Create products
  await Promise.all(
    PRODUCTS.map(product => {
      return prisma.product.create({
        data: {
          category: product.category,
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

  // Create reviews
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

  // Create product details
  await Promise.all(
    PRODUCT_DETAILS.map(detail => {
      return prisma.productDetail.create({
        data: {
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
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created product details records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create product details records', e);
    });

  // Create saved products
  await Promise.all(
    SAVED_PRODUCTS.map(savedProduct => {
      return prisma.savedProduct.create({
        data: {
          accountId: savedProduct.accountId,
          productId: savedProduct.productId,
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

  // Create discounts
  await Promise.all(
    DISCOUNTS.map(discount => {
      return prisma.discount.create({
        data: {
          code: discount.code,
          description: discount.description,
          expiry: discount.expiry,
          id: discount.id,
          percentage: discount.percentage,
        },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created discount records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create discount records', e);
    });

  // Create user discounts
  await Promise.all(
    USER_DISCOUNTS.map(userDiscount => {
      return prisma.userDiscount.create({
        data: {
          accountId: userDiscount.accountId,
          discountId: userDiscount.discountId,
        },
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created user discount records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create user discount records', e);
    });
}

seed();
