
export type ProductFeature = {
  icon: string;
  title: string;
  description: string;
  value: string;
};

export type Product = {
  id: string;
  _id?: string; // Database ID
  slug?: string; // Database slug for URL
  name: string;
  price: number;
  originalPrice?: number; // Database field
  media: { id: string; url: string; hint: string; type: 'image' | 'video' }[];
  category: string;
  description: string;
  status?: string; // Database field
  isFeatured?: boolean;
  features?: ProductFeature[];
  compatibility?: {
    title: string;
    details: string[];
    notes?: string;
  };
};

export type Category = {
  id: string;
  name: string;
  image: { id: string; url: string; hint: string };
  itemCount: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: { id: string; url: string; hint: string };
  author: string;
  date: string;
};
