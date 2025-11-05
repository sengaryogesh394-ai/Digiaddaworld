import type { Product, Category, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartwatch Series 8',
    price: 399.99,
    images: [getImage('prod-smartwatch-1'), getImage('prod-smartwatch-2')],
    category: 'Electronics',
    description: 'The latest smartwatch with a stunning always-on display, advanced health sensors, and seamless connectivity. Track your fitness, stay in touch, and more.',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Noise-Cancelling Headphones',
    price: 249.00,
    images: [getImage('prod-headphones-1')],
    category: 'Electronics',
    description: 'Immerse yourself in sound with industry-leading noise cancellation. Enjoy crystal-clear audio, all-day comfort, and up to 30 hours of battery life.',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 89.00,
    images: [getImage('prod-speaker-1')],
    category: 'Electronics',
    description: 'Take the party with you. This waterproof speaker delivers powerful sound and deep bass in a compact, durable design.',
  },
  {
    id: '4',
    name: 'Digital Drip Coffee Maker',
    price: 75.50,
    images: [getImage('prod-coffeemaker-1')],
    category: 'Home & Kitchen',
    description: 'Brew the perfect cup every time. Features a programmable timer, large capacity carafe, and a sleek stainless steel finish.',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'High-Speed Blender',
    price: 129.99,
    images: [getImage('prod-blender-1')],
    category: 'Home & Kitchen',
    description: 'From smoothies to soups, this powerful blender handles it all. Features multiple speed settings and a durable glass pitcher.',
  },
  {
    id: '6',
    name: 'Robotic Vacuum Cleaner',
    price: 299.00,
    images: [getImage('prod-vacuum-1')],
    category: 'Home & Kitchen',
    description: 'Keep your floors spotless with intelligent navigation and powerful suction. Wi-Fi connected and compatible with voice assistants.',
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Ultra-Slim Laptop',
    price: 1199.00,
    images: [getImage('prod-laptop-1')],
    category: 'Electronics',
    description: 'A powerful and portable laptop for work and play. Features a brilliant 14-inch display, fast processor, and all-day battery life.',
  },
  {
    id: '8',
    name: 'Digital Air Fryer',
    price: 99.00,
    images: [getImage('prod-airfryer-1')],
    category: 'Home & Kitchen',
    description: 'Enjoy your favorite fried foods with up to 75% less fat. The digital touchscreen makes it easy to cook delicious meals quickly.',
  },
];

export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: getImage('cat-electronics'),
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    image: getImage('cat-home-kitchen'),
  },
  {
    id: 'apparel',
    name: 'Apparel',
    image: getImage('cat-apparel'),
  },
  {
    id: 'books',
    name: 'Books',
    image: getImage('cat-books-new'),
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
