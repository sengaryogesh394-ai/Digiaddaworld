
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const heroProduct = mockProducts.find(p => p.id === '1');
const heroImage = PlaceHolderImages.find(img => img.id === 'hero-s13-ultra');


export default function HomePage() {
  const newProducts = mockProducts.slice(0, 4);

  const promoBanners = [
    {
      id: 's13-lite',
      tag: 'BIG SAVING',
      title: 'Galaxy S13 Lite Love The Price.',
      price: 429.00,
      buttonText: 'Buy Now',
      imageUrl: 'https://picsum.photos/seed/s13-lite/600/600',
      imageHint: 'light blue smartphone',
      className: 'bg-gray-200',
    },
    {
      id: 'smartwatch-7',
      tag: '15% OFF',
      title: 'Smartwatch 7 Light On Price.',
      price: 399.00,
      buttonText: 'Learn More',
      imageUrl: 'https://picsum.photos/seed/smartwatch-7/600/600',
      imageHint: 'pink smartwatch',
      className: 'bg-rose-100',
    },
    {
      id: 'smart-speaker',
      tag: 'SMART HOME',
      title: 'Five Bold Colors. $99 Each.',
      price: 229.00,
      buttonText: 'Buy Now',
      imageUrl: 'https://picsum.photos/seed/smart-speaker/600/600',
      imageHint: 'yellow smart speaker',
      className: 'bg-blue-100',
    },
    {
      id: 'airpods-gen5',
      tag: 'BEST PRICE',
      title: '5th Generation AirPods.',
      price: 499.00,
      buttonText: 'Learn More',
      imageUrl: 'https://picsum.photos/seed/airpods-gen5/600/600',
      imageHint: 'white earbuds',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
    {
      id: 'headset-max',
      tag: 'FLAT 25% OFF',
      title: 'Headset Max 3rd Generation.',
      price: 549.00,
      buttonText: 'Buy Now',
      imageUrl: 'https://picsum.photos/seed/headset-max/600/600',
      imageHint: 'blue headphones',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
    {
      id: 'macbook-pro',
      tag: 'NEWLY ADDED',
      title: 'Mac Book Pro. New Arrival',
      price: 2499.00,
      buttonText: 'Learn More',
      imageUrl: 'https://picsum.photos/seed/macbook-pro/600/600',
      imageHint: 'silver laptop',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  {heroProduct?.name}
                </h1>
                <p className="mt-4 text-2xl text-muted-foreground">{heroProduct?.description}</p>
                <p className="text-4xl font-bold mt-2">${heroProduct?.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">From ${heroProduct?.price.toFixed(2)} or $41.62/mo.per month</p>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" asChild>
                    <Link href={`/shop/${heroProduct?.id}`}>Buy Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/shop/${heroProduct?.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-96 md:h-full">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroProduct?.name || 'Hero image'}
                    fill
                    className="object-contain"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                )}
              </div>
            </div>
        </div>
      </section>
      

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {mockCategories.map((category) => (
            <Link href={`/shop?category=${category.id}`} key={category.id}>
              <Card className="flex flex-col items-center justify-center p-4 aspect-square transition-shadow hover:shadow-lg">
                <Image src={category.image.url} alt={category.name} width={50} height={50} data-ai-hint={category.image.hint} className="mb-2"/>
                <h3 className="font-semibold text-sm text-center">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.itemCount} items</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Banners Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoBanners.map(banner => (
                 <Card key={banner.id} className={`${banner.className} p-8 flex flex-col md:flex-row items-center justify-between`}>
                    <div className="text-left md:w-1/2">
                        <Badge variant="secondary" className="mb-2">{banner.tag}</Badge>
                        <h3 className="text-2xl font-bold">{banner.title}</h3>
                        <p className="text-muted-foreground">From ${banner.price.toFixed(2)}</p>
                        <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                            <Link href={`/shop/${banner.id}`}>{banner.buttonText} <ArrowRight className="w-4 h-4 ml-2"/></Link>
                        </Button>
                    </div>
                    <div className="relative w-40 h-40 md:w-1/2 mt-4 md:mt-0">
                        <Image src={banner.imageUrl} alt={banner.title} fill className="object-contain" data-ai-hint={banner.imageHint}/>
                    </div>
                 </Card>
            ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="new-products">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Our Trending Products</h2>
                <div className="flex items-center gap-2">
                <TabsList>
                    <TabsTrigger value="new-products">New Products</TabsTrigger>
                    <TabsTrigger value="best-selling">Best Selling</TabsTrigger>
                    <TabsTrigger value="featured-products">Featured Products</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon"><ChevronLeft /></Button>
                    <Button variant="outline" size="icon"><ChevronRight /></Button>
                </div>
                </div>
            </div>
            <TabsContent value="new-products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="best-selling">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mockProducts.slice(2,6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="featured-products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mockProducts.filter(p => p.isFeatured).slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
          </Tabs>
      </section>
    </div>
  );
}
