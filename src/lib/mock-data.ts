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
    id: '9',
    name: 'Modern Graphic T-Shirt',
    price: 29.99,
    images: [getImage('prod-tshirt-1')],
    category: 'Apparel',
    description: 'A stylish and comfortable graphic t-shirt made from 100% premium cotton. Perfect for a casual day out.',
  },
  {
    id: '10',
    name: 'The Sci-Fi Epic Saga',
    price: 14.99,
    images: [getImage('prod-ebook-1')],
    category: 'Books',
    description: 'A thrilling sci-fi adventure that will transport you to another galaxy. A must-read for fans of the genre.',
    isFeatured: true,
  },
  {
    id: '11',
    name: 'Pro Photo Editor',
    price: 79.99,
    images: [getImage('prod-photo-editor-1')],
    category: 'Software',
    description: 'A powerful and intuitive photo editing software for professionals and enthusiasts. Packed with advanced features and filters.',
    isFeatured: true,
},
  {
    id: '12',
    name: 'Abstract Canvas Art',
    price: 150.00,
    images: [getImage('prod-abstract-art-1')],
    category: 'Digital Art',
    description: 'A beautiful and vibrant abstract digital painting, perfect for adding a modern touch to any room. High-resolution file included.',
  },
  {
    id: '13',
    name: 'Designer Font Pack',
    price: 49.00,
    images: [getImage('prod-font-pack-1')],
    category: 'Software',
    description: 'A collection of 20 unique and modern fonts for your design projects. Includes commercial license.',
  },
  {
    id: '14',
    name: 'Low-Poly 3D Asset Pack',
    price: 99.00,
    images: [getImage('prod-3d-model-1')],
    category: 'Digital Art',
    description: 'A pack of 50 low-poly 3D models for game development or animation. Optimized for performance and ready to use.',
    isFeatured: true,
  },
  {
    id: '15',
    name: 'Royalty-Free Music Pack',
    price: 120.00,
    images: [getImage('prod-music-pack-1')],
    category: 'Digital Art',
    description: 'A collection of 10 high-quality, royalty-free music tracks perfect for videos, games, and podcasts.',
  }
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
  {
    id: 'software',
    name: 'Software',
    image: getImage('cat-software'),
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    image: getImage('cat-digital-art'),
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
