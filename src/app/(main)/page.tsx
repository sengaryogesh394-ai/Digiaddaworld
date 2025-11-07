
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

export default function HomePage() {
  const [subscriptionApi, setSubscriptionApi] = useState<any>(null);
  const [heroApi, setHeroApi] = useState<any>(null);
  const [categoryApi, setCategoryApi] = useState<any>(null);


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

  useEffect(() => {
    if (!categoryApi) return;
    const id = setInterval(() => categoryApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [categoryApi]);


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

  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 3);
  const newProducts = mockProducts.slice(0, 8);
  const bestSelling = mockProducts.slice(4, 12);
  const mainPromoProduct = mockProducts.find(p => p.id === 'prod-instagram-course');
  const topRightPromoProduct = mockProducts.find(p => p.id === 'prod-graphic-design-bundle');
  const bottomRightPromoProduct = mockProducts.find(p => p.id === 'prod-ai-reels-fitness');

  return (
    <div className="space-y-16 pb-16 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[420px]">
          {/* Main Promo */}
           <div className="relative lg:col-span-2 rounded-xl flex items-end overflow-hidden text-white min-h-[420px]">
            <Carousel setApi={setHeroApi} opts={{ loop: true }} className="absolute inset-0 w-full h-full -z-10">
                <CarouselContent>
                    {heroImages.map((image, i) => (
                        <CarouselItem key={i}>
                           <Image src={image.url} alt={image.hint} fill className="object-cover rounded-xl" data-ai-hint={image.hint} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="z-10 relative p-8 md:p-12">
                <p className="font-semibold text-lg">LIMITED TIME OFFER</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                    {mainPromoProduct?.name}
                </h1>
                <div className="flex items-baseline gap-4 mt-4">
                  <p className="text-3xl font-bold text-white">Rs {mainPromoProduct?.price.toFixed(2)}</p>
                  <p className="text-xl text-white/80 line-through">Rs {(mainPromoProduct?.price || 0 * 1.5).toFixed(2)}</p>
                </div>
                <Button asChild className="mt-6">
                    <Link href={`/shop/${mainPromoProduct?.id}`}>Shop Now</Link>
                </Button>
            </div>
          </div>
          {/* Side Promos */}
          <div className="hidden lg:flex flex-col gap-6">
             <div className="relative rounded-xl p-8 flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <div className="z-10">
                    <p className="text-sm uppercase tracking-wider">Best Seller</p>
                    <h3 className="text-2xl font-bold mt-1">{topRightPromoProduct?.name}</h3>
                    <Button variant="link" asChild className="p-0 mt-2 text-white/90">
                        <Link href={`/shop/${topRightPromoProduct?.id}`}>Shop Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                </div>
                 {topRightPromoProduct && (
                    <Image
                        src={getImage('hero-side-1').url}
                        alt="Best products"
                        width={150}
                        height={150}
                        className="absolute -right-8 -bottom-8 object-contain opacity-50"
                        data-ai-hint={getImage('hero-side-1').hint}
                    />
                )}
             </div>
             <div className="relative rounded-xl p-8 flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                <div className="z-10">
                    <p className="text-sm uppercase tracking-wider">25% Off</p>
                     <h3 className="text-2xl font-bold mt-1">{bottomRightPromoProduct?.name}</h3>
                     <Button variant="link" asChild className="p-0 mt-2 text-white/90">
                        <Link href={`/shop/${bottomRightPromoProduct?.id}`}>Shop Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                </div>
                 {bottomRightPromoProduct && (
                     <Image
                        src={getImage('hero-side-2').url}
                        alt="Discounted products"
                        width={150}
                        height={150}
                        className="absolute -right-8 -bottom-8 object-contain opacity-50"
                        data-ai-hint={getImage('hero-side-2').hint}
                    />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-6">
            <Carousel setApi={setCategoryApi} opts={{ align: "start", loop: true, slidesToScroll: 3 }}>
                <CarouselContent className="-ml-4">
                    {mockCategories.map((category, i) => (
                        <CarouselItem key={category.id} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8">
                             <Link href={`/shop?category=${category.id}`} className="flex flex-col items-center gap-3 group">
                                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center overflow-hidden">
                                     <Image 
                                        src={category.image.url} 
                                        alt={category.name} 
                                        width={96}
                                        height={96}
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        data-ai-hint={category.image.hint}
                                    />
                                </div>
                                <p className="font-semibold text-sm text-center">{category.name}</p>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="hidden md:flex" />
                 <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView>
          <div className="p-0 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                  <div>
                      <h2 className="text-3xl font-bold">Featured Products</h2>
                      <p className="text-muted-foreground">Check out our best-selling and most popular products.</p>
                  </div>
                  <Button variant="outline" asChild>
                      <Link href="/shop">View All <ArrowRight className="w-4 h-4 ml-2"/></Link>
                  </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <Image src={image.url} alt={image.hint} fill className="object-cover" data-ai-hint={image.hint}/>
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
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
