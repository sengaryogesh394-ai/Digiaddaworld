import type { Product, Category, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Galaxy S13+ Ultra',
    price: 999.00,
    images: [getImage('prod-s13-ultra')],
    category: 'Smart Phones',
    description: 'Supercharged for pros. The ultimate smartphone experience.',
    isFeatured: true,
  },
  {
    id: '2',
    name: '5th Generation AirPods',
    price: 499.00,
    images: [getImage('prod-airpods-gen5')],
    category: 'Airpods',
    description: 'The best audio experience, reimagined. With Spatial Audio that places sound all around you.',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Galaxy S13 Lite',
    price: 429.00,
    images: [getImage('prod-s13-lite')],
    category: 'Smart Phones',
    description: 'Love the price. A powerful smartphone with an amazing camera and all-day battery life.',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Smartwatch 7',
    price: 399.00,
    images: [getImage('prod-smartwatch-7')],
    category: 'Smartwatches',
    description: 'Light on price. Heavy on features. The perfect companion for a healthy life.',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Smart Home Speaker',
    price: 229.00,
    images: [getImage('prod-smart-speaker')],
    category: 'Speaker',
    description: 'Five bold colors. $99 each. Room-filling sound, and a smart assistant to help with everyday tasks.',
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Headset Max 3rd Generation',
    price: 549.00,
    images: [getImage('prod-headset-max')],
    category: 'Headphones',
    description: 'High-fidelity audio. Active Noise Cancellation with Transparency mode. And a customized fit for all-day comfort.',
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Mac Book Pro',
    price: 2499.00,
    images: [getImage('prod-macbook-pro')],
    category: 'Laptops',
    description: 'New arrival. The most powerful MacBook Pro ever. Supercharged by the M2 chip.',
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Compact Digital Camera',
    price: 799.00,
    images: [getImage('prod-camera')],
    category: 'SmartTV',
    description: 'Capture your moments in stunning detail with this compact and powerful digital camera.',
    isFeatured: true,
  },
];

export const mockCategories: Category[] = [
  {
    id: 'smart-tv',
    name: 'SmartTV',
    image: getImage('cat-smart-tv'),
    itemCount: 9
  },
  {
    id: 'speaker',
    name: 'Speaker',
    image: getImage('cat-speaker'),
    itemCount: 3
  },
  {
    id: 'tablets',
    name: 'Tablets',
    image: getImage('cat-tablets'),
    itemCount: 4
  },
  {
    id: 'airpods',
    name: 'Airpods',
    image: getImage('cat-airpods'),
    itemCount: 2
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    image: getImage('cat-smartwatches'),
    itemCount: 10
  },
  {
    id: 'smart-phones',
    name: 'Smart Phones',
    image: getImage('cat-smart-phones'),
    itemCount: 9
  },
  {
    id: 'headphones',
    name: 'Headphones',
    image: getImage('cat-headphones'),
    itemCount: 2
  },
  {
    id: 'laptops',
    name: 'Laptops',
    image: getImage('cat-laptops'),
    itemCount: 6
  },
  {
    id: 'bluetooth',
    name: 'Bluetooth',
    image: getImage('cat-bluetooth'),
    itemCount: 5
  },
];

export const mockBlogPosts: BlogPost[] = [
    {
        id: '1',
        slug: '10-tips-for-selling-digital-products',
        title: '10 Essential Tips for Selling Your Digital Products',
        excerpt: 'Learn the best strategies to successfully market and sell your digital goods online. From pricing to promotion, we cover it all.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-1'),
        author: 'Jane Doe',
        date: '2024-05-15',
    },
    {
        id: '2',
        slug: 'the-rise-of-the-creator-economy',
        title: 'The Rise of the Creator Economy: A New Era for Creatives',
        excerpt: 'Explore how the creator economy is empowering individuals to monetize their passions and build sustainable businesses.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-2'),
        author: 'John Smith',
        date: '2024-05-10',
    },
    {
        id: '3',
        slug: 'how-to-price-your-digital-products',
        title: 'How to Price Your Digital Products for Maximum Profit',
        excerpt: 'Pricing can be tricky. This guide breaks down different pricing models and helps you find the sweet spot for your products.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-3'),
        author: 'Emily White',
        date: '2024-05-01',
    },
];
