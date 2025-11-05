import type { Product, Category, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Designer E-Book',
    price: 19.99,
    images: [getImage('prod-1-1'), getImage('prod-1-2')],
    category: 'E-books',
    description: 'A comprehensive guide to becoming a professional designer. Covers everything from fundamentals to advanced techniques. Perfect for beginners and experts alike.',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Minimalist UI Kit',
    price: 49.00,
    images: [getImage('prod-2-1')],
    category: 'Templates',
    description: 'A clean and modern UI kit for Figma. Includes hundreds of components, icons, and templates to speed up your design workflow.',
  },
  {
    id: '3',
    name: 'Vintage Logo Pack',
    price: 25.00,
    images: [getImage('prod-3-1')],
    category: 'Templates',
    description: 'A collection of 50+ vintage-inspired logo templates for Adobe Illustrator. Fully editable and scalable vectors.',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Cinematic Photo Presets',
    price: 15.50,
    images: [getImage('prod-4-1')],
    category: 'Presets',
    description: 'A pack of 20 professional presets for Adobe Lightroom. Give your photos a beautiful cinematic look with just one click.',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Lo-Fi Beats Pack',
    price: 29.99,
    images: [getImage('prod-5-1')],
    category: 'Music',
    description: '10 royalty-free lo-fi hip hop tracks. Perfect for background music in your videos, streams, or podcasts.',
  },
  {
    id: '6',
    name: 'Dynamic Video Transitions',
    price: 39.00,
    images: [getImage('prod-6-1')],
    category: 'Templates',
    description: 'Over 100 dynamic drag-and-drop transitions for Adobe Premiere Pro. Elevate your video editing with seamless effects.',
  },
  {
    id: '7',
    name: 'Portfolio Website Theme',
    price: 79.00,
    images: [getImage('prod-7-1')],
    category: 'Templates',
    description: 'A stunning and responsive portfolio theme for Webflow. Easily customizable to showcase your work in style.',
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Modern Sans-Serif Font',
    price: 12.00,
    images: [getImage('prod-8-1')],
    category: 'E-books',
    description: 'A versatile and elegant sans-serif font family. Includes multiple weights and styles for all your design needs.',
  },
];

export const mockCategories: Category[] = [
  {
    id: 'ebooks',
    name: 'E-books',
    image: getImage('cat-ebooks'),
  },
  {
    id: 'presets',
    name: 'Presets',
    image: getImage('cat-presets'),
  },
  {
    id: 'templates',
    name: 'Templates',
    image: getImage('cat-templates'),
  },
  {
    id: 'music',
    name: 'Music',
    image: getImage('cat-music'),
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
