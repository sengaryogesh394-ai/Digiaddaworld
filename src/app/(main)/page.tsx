
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const heroProducts = mockProducts.filter(p => p.isFeatured).slice(0, 3);


export default function HomePage() {
  const newProducts = mockProducts.slice(0, 4);

  const promoBanners = [
    {
      id: 'prod-instagram-course',
      tag: 'BESTSELLER',
      title: 'Instagram Growth Mastery',
      price: 199.99,
      buttonText: 'Get Course',
      imageUrl: getImage('prod-instagram-course').url,
      imageHint: 'social media growth',
      className: 'bg-gray-200',
    },
    {
      id: 'prod-graphic-design-bundle',
      tag: 'NEWLY ADDED',
      title: 'Graphic Design Bundle',
      price: 79.99,
      buttonText: 'Learn More',
      imageUrl: getImage('prod-graphic-design-bundle').url,
      imageHint: 'design elements',
      className: 'bg-rose-100',
    },
    {
      id: 'prod-chatgpt-prompts',
      tag: 'HOT',
      title: '999+ ChatGPT Prompts',
      price: 39.00,
      buttonText: 'Buy Now',
      imageUrl: getImage('prod-chatgpt-prompts').url,
      imageHint: 'AI chat',
      className: 'bg-blue-100',
    },
    {
      id: 'prod-ai-reels-fitness',
      tag: 'AI POWERED',
      title: 'AI Fitness Reels',
      price: 49.99,
      buttonText: 'Learn More',
      imageUrl: getImage('prod-ai-reels-fitness').url,
      imageHint: 'fitness workout',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
    {
      id: 'prod-excel-templates',
      tag: 'TOP RATED',
      title: 'Excel Templates',
      price: 19.99,
      buttonText: 'Buy Now',
      imageUrl: getImage('prod-excel-templates').url,
      imageHint: 'spreadsheet chart',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
    {
      id: 'prod-adobe-suite',
      tag: 'PRO',
      title: 'Adobe Suite 2024',
      price: 299.99,
      buttonText: 'Learn More',
      imageUrl: getImage('prod-adobe-suite').url,
      imageHint: 'software logos',
      className: 'bg-gray-100 col-span-1 row-start-2',
    },
  ];

  function getImage(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
  }
  
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [emblaApi]);


  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gray-100">
        <Carousel setApi={setEmblaApi}>
          <CarouselContent>
            {heroProducts.map((product) => (
              <CarouselItem key={product.id}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
                    <div>
                      <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        {product.name}
                      </h1>
                      <p className="mt-4 text-2xl text-muted-foreground">{product.description}</p>
                      <p className="text-4xl font-bold mt-2">${product.price.toFixed(2)}</p>
                      <div className="mt-8 flex gap-4">
                        <Button size="lg" asChild>
                          <Link href={`/shop/${product.id}`}>Buy Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link href={`/shop/${product.id}`}>Learn More</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="relative h-96 md:h-full">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.images[0].hint}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>
      

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {mockCategories.slice(0, 4).map((category) => (
            <Link href={`/shop?category=${category.id}`} key={category.id} className="block group">
              <Card className="overflow-hidden relative rounded-lg">
                <div className="aspect-square relative">
                    <Image 
                        src={category.image.url} 
                        alt={category.name} 
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={category.image.hint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="font-semibold text-xl text-white text-center p-2">{category.name}</h3>
                    </div>
                </div>
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
                    {mockProducts.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="best-selling">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mockProducts.slice(4,8).map((product) => (
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
