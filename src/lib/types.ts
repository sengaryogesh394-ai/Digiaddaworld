export type Product = {
  id: string;
  name: string;
  price: number;
  images: { id: string; url: string; hint: string }[];
  category: string;
  description: string;
  isFeatured?: boolean;
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
