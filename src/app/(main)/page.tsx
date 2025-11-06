
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export default function HomePage() {

  function getImage(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
  }

  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const newProducts = mockProducts.slice(0, 8);
  const bestSelling = mockProducts.slice(4, 12);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
  ];
  const [heroApi, setHeroApi] = useState<any>(null);
  useEffect(() => {
    if (!heroApi) return;
    const id = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [heroApi]);


  return (
    <div className="space-y-16 pb-16 bg-background">
      {/* Hero with background carousel + dark gradient */}
      <section className="relative border-b overflow-hidden">
        {/* Background carousel */}
        <div className="absolute inset-0 -z-10">
          <Carousel setApi={setHeroApi} opts={{ loop: true }}>
            <CarouselContent>
              {heroImages.map((src, i) => (
                <CarouselItem key={i} className="basis-full">
                  <div className="relative h-[420px] md:h-[520px] w-full">
                    <Image src={src} alt={`hero-${i+1}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Foreground content */}
        <div className="container py-12 md:py-16 text-white h-[420px] md:h-[520px] flex flex-col justify-center">
          <div className="max-w-3xl">
            <p className="text-xs uppercase text-primary-foreground/80 tracking-widest">Premium Digital Products</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">Everything you need for your next project</h1>
            <p className="mt-3 text-white/80 max-w-2xl">Templates, presets, bundles and more. Explore thousands of high‑quality digital assets.</p>
            <form className="mt-6">
              <div className="flex gap-2 max-w-lg">
                <Input placeholder="Search templates, presets, bundles…" className="h-11 bg-white text-black placeholder:text-neutral-500" />
                <Button size="lg" className="h-11 bg-primary hover:bg-primary/90">Search</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.slice(0, 6).map((category, i) => (
            <AnimateOnView key={category.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} className="h-full">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <div className="text-sm text-muted-foreground space-x-2 mt-1">
                        <Link href={`/shop?category=${category.id}`} className="hover:text-primary">New</Link>
                        <span>&bull;</span>
                        <Link href={`/shop?category=${category.id}`} className="hover:text-primary">Popular</Link>
                        <span>&bull;</span>
                        <Link href={`/shop?category=${category.id}`} className="hover:text-primary">On Sale</Link>
                    </div>
                    <div className="relative h-40 mt-4 rounded-md overflow-hidden group">
                      <Image 
                          src={category.image.url} 
                          alt={category.name} 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          data-ai-hint={category.image.hint}
                      />
                    </div>
                </Card>
              </motion.div>
            </AnimateOnView>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView>
          <div className="bg-card p-8 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-3xl font-bold">Featured Products</h2>
                      <p className="text-muted-foreground">Check out our best-selling and most popular products.</p>
                  </div>
                  <Button variant="outline" asChild>
                      <Link href="/shop">View All <ArrowRight className="w-4 h-4 ml-2"/></Link>
                  </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product, i) => (
                      <AnimateOnView key={product.id} delay={i * 0.1}>
                           <motion.div whileHover={{ y: -5 }} className="h-full">
                             <ProductCard product={product} />
                           </motion.div>
                      </AnimateOnView>
                  ))}
              </div>
          </div>
        </AnimateOnView>
      </section>

      {/* Envato Section */}
      <section className="bg-amber-50/50 dark:bg-amber-900/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <AnimateOnView>
                    <h3 className="text-3xl font-bold">The only creative subscription you need</h3>
                    <p className="text-muted-foreground mt-2">Get access to millions of creative assets. Unlimited downloads for a single monthly fee.</p>
                    <Button className="mt-4" asChild>
                        <Link href="#">Get Started Now</Link>
                    </Button>
                </AnimateOnView>
                <AnimateOnView delay={0.2} className="relative h-64 hidden md:block">
                    <Image src={getImage('creative-subscription').url} alt="Creative subscription assets" fill className="object-contain" data-ai-hint={getImage('creative-subscription').hint} />
                </AnimateOnView>
            </div>
        </div>
      </section>

      {/* Newest Themes & Templates */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="new-products">
            <AnimateOnView className="text-center mb-8">
                <h2 className="text-3xl font-bold">Our Newest Themes and Templates</h2>
                <p className="text-muted-foreground">The best of our collection, all in one place.</p>
                <TabsList className="mt-4">
                    <TabsTrigger value="new-products">New Products</TabsTrigger>
                    <TabsTrigger value="best-selling">Best Selling</TabsTrigger>
                    <TabsTrigger value="featured-products">Featured</TabsTrigger>
                </TabsList>
            </AnimateOnView>
            <TabsContent value="new-products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newProducts.map((product, i) => (
                       <AnimateOnView key={product.id} delay={i * 0.05}>
                          <motion.div whileHover={{ y: -5 }} className="h-full">
                            <ProductCard product={product} />
                          </motion.div>
                       </AnimateOnView>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="best-selling">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bestSelling.map((product, i) => (
                         <AnimateOnView key={product.id} delay={i * 0.05}>
                            <motion.div whileHover={{ y: -5 }} className="h-full">
                              <ProductCard product={product} />
                            </motion.div>
                         </AnimateOnView>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="featured-products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, i) => (
                        <AnimateOnView key={product.id} delay={i * 0.05}>
                           <motion.div whileHover={{ y: -5 }} className="h-full">
                             <ProductCard product={product} />
                           </motion.div>
                        </AnimateOnView>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
      </section>

      {/* Final CTA */}
      <section className="bg-amber-50/50 dark:bg-amber-900/10 py-12">
        <AnimateOnView className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Looking for unlimited downloads?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get access to our entire library of themes, templates, and more with a single subscription.</p>
             <Button className="mt-6" size="lg" asChild>
                <Link href="#">Learn More About Envato Elements</Link>
            </Button>
        </AnimateOnView>
      </section>

    </div>
  );
}
