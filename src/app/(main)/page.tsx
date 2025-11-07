
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
  const [subscriptionApi, setSubscriptionApi] = useState<any>(null);
  const [heroApi, setHeroApi] = useState<any>(null);

  useEffect(() => {
    if (!subscriptionApi) return;
    const id = setInterval(() => subscriptionApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [subscriptionApi]);

  useEffect(() => {
    if (!heroApi) return;
    const id = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [heroApi]);


  function getImage(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
  }

  const subscriptionImages = [
    getImage('creative-collage-1'),
    getImage('creative-collage-2'),
    getImage('creative-collage-3'),
  ];
  
  const heroImages = [
    getImage('hero-bg-1'),
    getImage('hero-bg-2'),
    getImage('hero-bg-3'),
  ];

  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const newProducts = mockProducts.slice(0, 8);
  const bestSelling = mockProducts.slice(4, 12);
  const mainPromoProduct = mockProducts.find(p => p.id === 'prod-instagram-course');
  const topRightPromoProduct = mockProducts.find(p => p.id === 'prod-graphic-design-bundle');
  const bottomRightPromoProduct = mockProducts.find(p => p.id === 'prod-ai-reels-fitness');

  return (
    <div className="space-y-16 pb-16 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 h-[420px] md:h-[380px]">
          {/* Main Promo */}
          <div className="relative xl:col-span-2 rounded-xl flex items-center overflow-hidden text-white">
             <Carousel setApi={setHeroApi} opts={{ loop: true }} className="absolute inset-0 w-full h-full">
                <CarouselContent>
                    {heroImages.map((image, i) => (
                        <CarouselItem key={i}>
                            <div className="relative h-full w-full">
                                <Image src={image.url} alt={image.hint} fill className="object-cover" data-ai-hint={image.hint} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="z-10 relative p-8">
                <Link href="#" className="inline-flex items-center bg-green-200 dark:bg-green-700/50 text-green-800 dark:text-green-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    NEWS
                    <span className="ml-2 font-normal text-green-700 dark:text-green-300">Limited Time Offer 20% OFF</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold max-w-sm text-white">
                    {mainPromoProduct?.name}
                </h1>
                <p className="mt-2 text-white/80">Starts from</p>
                <p className="text-2xl font-bold text-white">Rs {mainPromoProduct?.price.toFixed(2)}</p>
                <Button asChild className="mt-6 bg-white text-black hover:bg-white/90">
                    <Link href={`/shop/${mainPromoProduct?.id}`}>Shop Now</Link>
                </Button>
            </div>
          </div>
          {/* Side Promos */}
          <div className="hidden lg:flex flex-col gap-6">
             <div className="relative bg-amber-100/50 dark:bg-amber-900/10 rounded-xl p-6 flex-1 flex items-center overflow-hidden">
                <div className="z-10">
                    <h3 className="text-xl font-bold text-amber-600">Best Products</h3>
                    <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                        View more <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
                 {topRightPromoProduct && (
                    <Image
                        src={getImage('hero-side-1').url}
                        alt="Best products"
                        width={100}
                        height={100}
                        className="absolute right-4 bottom-4 object-contain"
                        data-ai-hint={getImage('hero-side-1').hint}
                    />
                )}
             </div>
             <div className="relative bg-blue-100 dark:bg-blue-900/10 rounded-xl p-6 flex-1 flex items-center overflow-hidden">
                <div className="z-10">
                    <h3 className="text-xl font-bold text-blue-600">20% Discounts</h3>
                     <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                        View more <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
                 {bottomRightPromoProduct && (
                     <Image
                        src={getImage('hero-side-2').url}
                        alt="Discounted products"
                        width={100}
                        height={100}
                        className="absolute right-4 bottom-4 object-contain"
                        data-ai-hint={getImage('hero-side-2').hint}
                    />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.slice(0, 3).map((category, i) => (
            <AnimateOnView key={category.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} className="h-full">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full bg-card">
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
      <section className="relative overflow-hidden h-[300px] text-white flex items-center">
        <div className="absolute inset-0 -z-10">
            <Carousel setApi={setSubscriptionApi} opts={{ loop: true }}>
                <CarouselContent>
                {subscriptionImages.map((image, i) => (
                    <CarouselItem key={i}>
                    <div className="relative h-[300px] w-full">
                        <Image src={image.url} alt={image.hint} fill className="object-cover" />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <AnimateOnView>
                    <h3 className="text-3xl font-bold">The only creative subscription you need</h3>
                    <p className="text-white/80 mt-2">Get access to millions of creative assets. Unlimited downloads for a single monthly fee.</p>
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
