
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Star, TrendingUp, Zap, Heart, BookOpen, Codepen, LayoutTemplate, Package, Bot, Palette } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { BlogPostCard } from '@/components/shared/BlogPostCard';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  media: { id: string; url: string; hint: string; type: string }[];
  category: string;
  status: string;
  isFeatured: boolean;
}

interface Blog {
  _id: string;
  title: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  excerpt?: string;
  slug: string;
  featuredImage?: string;
}

const CarouselSlideContent = ({
    slideIndex,
    children,
    className,
  }: {
    slideIndex: number;
    children: React.ReactNode;
    className?: string;
  }) => {
    const { api } = useCarousel();
    const [current, setCurrent] = useState(0);
  
    useEffect(() => {
      if (!api) return;
  
      const onSelect = () => {
        setCurrent(api.selectedScrollSnap());
      };
  
      api.on('select', onSelect);
      onSelect();
  
      return () => {
        api.off('select', onSelect);
      };
    }, [api]);
  
    return (
      <div className={`absolute inset-0 z-10 ${className}`}>
        <AnimatePresence>
          {current === slideIndex && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
};


export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subscriptionApi, setSubscriptionApi] = useState<any>(null);
  const [heroApi, setHeroApi] = useState<any>(null);
  const [categoryApi, setCategoryApi] = useState<any>(null);
  const [latestPosts, setLatestPosts] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Fetch published blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog/published?limit=3');
        const data = await response.json();
        if (data.success) {
          setLatestPosts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
      badge: 'TRENDING NOW',
      title: 'Instagram Growth Mastery Course',
      price: 199.99,
      originalPrice: 299.99,
      tag: 'Featured',
      link: '/shop/prod-instagram-course'
    },
    {
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
      badge: 'BEST SELLER',
      title: 'Graphic Design Bundle',
      price: 79.99,
      originalPrice: 119.99,
      tag: 'Featured',
      link: '/shop/prod-graphic-design-bundle'
    },
    {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      badge: 'LIMITED TIME OFFER',
      title: '500+ AI Fitness Reels Bundle',
      price: 49.99,
      originalPrice: 99.99,
      tag: 'Hot Deal',
      link: '/shop/prod-ai-reels-fitness'
    }
  ];

  useEffect(() => {
    if (!subscriptionApi) return;
    const id = setInterval(() => subscriptionApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [subscriptionApi]);

  useEffect(() => {
    if (!heroApi) return;
    
    const onSelect = () => {
      setCurrentSlide(heroApi.selectedScrollSnap());
    };
    
    heroApi.on('select', onSelect);
    const id = setInterval(() => heroApi.scrollNext(), 6000);
    
    return () => {
      heroApi.off('select', onSelect);
      clearInterval(id);
    };
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
    getImage('user-hero-bg-1'),
    getImage('hero-bg-2'),
    getImage('hero-bg-3'),
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?status=active');
      console.log('Response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('API result:', result);
        const productData = result.data || [];
        console.log('Products fetched:', productData.length);
        setProducts(productData);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(productData.map((p: Product) => p.category)));
        setCategories(uniqueCategories as string[]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);
  const newProducts = products.slice(0, 8);
  const bestSelling = products.slice(0, 12);
  const mainPromoProduct = products[0];
  const topRightPromoProduct = products[1];
  const bottomRightPromoProduct = products[2];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const categoryIcons: { [key: string]: React.ElementType } = {
    'software-and-tools': Codepen,
    'courses-and-ebooks': BookOpen,
    'templates': LayoutTemplate,
    'content-bundles': Package,
    'ai-reels': Bot,
    'graphic-design': Palette,
  };
  
  const categoryGradients: { [key: string]: string } = {
    'software-and-tools': 'from-slate-900 to-slate-700',
    'courses-and-ebooks': 'from-blue-900 to-blue-700',
    'templates': 'from-emerald-900 to-emerald-700',
    'content-bundles': 'from-purple-900 to-purple-700',
    'ai-reels': 'from-rose-900 to-rose-700',
    'graphic-design': 'from-amber-900 to-amber-700',
  };


  return (
    <div className="space-y-20 pb-16 bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section with Carousel and Vertical Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]"
        >
          {/* Main Carousel Promo */}
          <motion.div 
            variants={itemVariants}
            className="relative lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl group min-h-[500px]"
          >
            <Carousel setApi={setHeroApi} opts={{ loop: true }} className="h-full">
              <CarouselContent className="h-full">
                {heroSlides.map((slide, i) => (
                  <CarouselItem key={i} className="h-full">
                    <div className="relative h-full w-full">
                      <Image 
                        src={slide.image} 
                        alt={slide.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {heroSlides.map((slide, i) => (
                <CarouselSlideContent key={i} slideIndex={i} className="flex items-end justify-start">
                  <div className="p-8 md:p-12 w-full md:w-2/3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                    >
                      <Zap className="w-4 h-4 text-white" />
                      <span className="font-semibold text-sm text-white uppercase tracking-wider">{slide.badge}</span>
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-4xl md:text-6xl font-bold text-white mt-2 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex items-baseline gap-4 mt-6"
                    >
                      <p className="text-4xl font-bold text-white">Rs {slide.price.toFixed(2)}</p>
                      <p className="text-2xl text-white/70 line-through">Rs {slide.originalPrice.toFixed(2)}</p>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{slide.tag}</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <Button asChild size="lg" className="mt-6 bg-white text-black hover:bg-white/90 shadow-xl group">
                        <Link href={slide.link}>
                          Shop Now 
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </CarouselSlideContent>
              ))}
            </Carousel>
          </motion.div>

          {/* Vertical Side Cards */}
          <div className="flex flex-col gap-6">
            {/* Top Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl flex-1 overflow-hidden shadow-xl group min-h-[240px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={getImage('hero-side-1').url}
                  alt="Best products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={getImage('hero-side-1').hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-600/70 to-purple-400/30"></div>
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <p className="text-sm uppercase tracking-wider font-semibold">Best Seller</p>
                  </div>
                  <h3 className="text-2xl font-bold mt-1 leading-tight">{topRightPromoProduct?.name}</h3>
                </div>
                <Button variant="secondary" asChild size="sm" className="w-fit group mt-4">
                  <Link href={`/shop/${topRightPromoProduct?.id}`}>
                    Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Bottom Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl flex-1 overflow-hidden shadow-xl group min-h-[240px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={getImage('hero-side-2').url}
                  alt="Discounted products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={getImage('hero-side-2').hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-600/70 to-rose-400/30"></div>
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-current" />
                    <p className="text-sm uppercase tracking-wider font-semibold">25% Off</p>
                  </div>
                  <h3 className="text-2xl font-bold mt-1 leading-tight">{bottomRightPromoProduct?.name}</h3>
                </div>
                <Button variant="secondary" asChild size="sm" className="w-fit group mt-4">
                  <Link href={`/shop/${bottomRightPromoProduct?.id}`}>
                    Shop Deal <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>
        </AnimateOnView>
        
        <Carousel setApi={setCategoryApi} opts={{ align: "start", loop: true, slidesToScroll: 3 }}>
          <CarouselContent className="-ml-4">
            {categories.map((category: string, i: number) => {
                const Icon = categoryIcons[category] || LayoutTemplate;
                const gradient = categoryGradients[category] || 'from-gray-900 to-gray-700';
                return (
                  <CarouselItem key={category} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8">
                    <AnimateOnView delay={i * 0.05}>
                      <Link href={`/shop?category=${category}`} className="flex flex-col items-center gap-3 group">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${gradient} border-2 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg`}
                        >
                          <Icon className="w-12 h-12 text-white" />
                        </motion.div>
                        <p className="font-semibold text-sm text-center group-hover:text-primary transition-colors">{category}</p>
                      </Link>
                    </AnimateOnView>
                  </CarouselItem>
                )
            })}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView>
          <div className="bg-gradient-to-br from-secondary/30 to-background p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-amber-500 fill-current" />
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Handpicked</span>
                </div>
                <h2 className="text-4xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground mt-2">Our best-selling and most popular items</p>
              </div>
              <Button variant="outline" size="lg" asChild className="group shadow-md">
                <Link href="/shop">
                  View All 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product, i: number) => (
                <AnimateOnView key={product._id} delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }} 
                    transition={{ type: "spring", stiffness: 300 }}
                    className="h-full bg-background rounded-2xl shadow-lg overflow-hidden border border-border/50"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </AnimateOnView>
      </section>

      {/* Subscription Banner */}
      <section className="relative overflow-hidden h-[400px] text-white">
        <div className="absolute inset-0 -z-10">
          <Carousel setApi={setSubscriptionApi} opts={{ loop: true }}>
            <CarouselContent>
              {subscriptionImages.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="relative h-[400px] w-full">
                    <Image src={image.url} alt={image.hint} fill className="object-cover" data-ai-hint={image.hint}/>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <AnimateOnView>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold text-sm uppercase tracking-wider">Unlimited Access</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold leading-tight">The only creative subscription you need</h3>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/90"
                >
                  Get access to millions of creative assets. Unlimited downloads for a single monthly fee.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 shadow-xl group">
                    <Link href="#" className="flex items-center">
                      Get Started Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </AnimateOnView>
            
            <AnimateOnView delay={0.3} className="relative h-80 hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-full"
              >
                <Image 
                  src={getImage('creative-subscription').url} 
                  alt="Creative subscription assets" 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                  data-ai-hint={getImage('creative-subscription').hint} 
                />
              </motion.div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Newest Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="new-products" className="space-y-8">
          <AnimateOnView className="text-center">
            <h2 className="text-4xl font-bold mb-2">Our Newest Themes and Templates</h2>
            <p className="text-muted-foreground text-lg mb-6">The best of our collection, all in one place</p>
            <TabsList className="inline-flex h-12 bg-secondary/50 backdrop-blur-sm p-1 rounded-full shadow-lg">
              <TabsTrigger value="new-products" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-md">
                New Products
              </TabsTrigger>
              <TabsTrigger value="best-selling" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-md">
                Best Selling
              </TabsTrigger>
              <TabsTrigger value="featured-products" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-md">
                Featured
              </TabsTrigger>
            </TabsList>
          </AnimateOnView>
          
          <TabsContent value="new-products">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {newProducts.map((product: Product, i: number) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="best-selling">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {bestSelling.map((product: Product, i: number) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="featured-products">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product: Product, i: number) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">From Our Blog</h2>
            <p className="text-muted-foreground">The latest news, tips, and insights</p>
          </div>
        </AnimateOnView>
        {loadingBlogs ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : latestPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {latestPosts.map((post, i) => {
                // Convert Blog to BlogPost format
                const blogPost = {
                  id: post._id,
                  title: post.title,
                  excerpt: post.excerpt || '',
                  author: post.author,
                  slug: post.slug,
                  date: new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  image: {
                    id: post._id,
                    url: post.featuredImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
                    hint: post.title
                  },
                  content: '',
                };
                return (
                  <motion.div key={post._id} variants={itemVariants}>
                    <BlogPostCard post={blogPost} />
                  </motion.div>
                );
              })}
            </motion.div>
            <AnimateOnView className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </AnimateOnView>
          </>
        )}
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/20 dark:via-amber-900/10 dark:to-orange-950/20 py-16">
        <AnimateOnView className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-sm text-amber-700 dark:text-amber-300 uppercase tracking-wider">Join Thousands of Creators</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">Looking for unlimited downloads?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get access to our entire library of themes, templates, and more with a single subscription. Start creating today!
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="mt-4 shadow-xl group text-lg px-8 py-6" asChild>
                <Link href="#">
                  Learn More About Envato Elements
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimateOnView>
      </section>
    </div>
  );
}
    

    

    
