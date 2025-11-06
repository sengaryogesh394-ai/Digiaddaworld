export type Product = {
  id: string;
  name: string;
  price: number;
  media: { id: string; url: string; hint: string; type: 'image' | 'video' }[];
  category: string;
  description: string;
  isFeatured?: boolean;
  features?: string[];
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
