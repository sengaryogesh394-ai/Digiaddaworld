
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

export default function HomePage() {

  function getImage(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
  }

  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const newProducts = mockProducts.slice(0, 8);
  const bestSelling = mockProducts.slice(4, 12);

  return (
    <div className="space-y-16 pb-16 bg-background">
      {/* Hero Section */}
      <section className="bg-card pt-12 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Professional Digital Products for any project
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">Get access to more than 100+ items, regular updates & 6 months of free support.</p>
              <div className="mt-8 flex gap-2 max-w-lg">
                <Input placeholder="Search for products..." className="bg-background"/>
                <Button size="lg"><Search className="w-5 h-5" /></Button>
              </div>
            </div>
            <div className="relative h-80 hidden md:block">
              <Image
                src={getImage('hero-collage').url}
                alt="Product collage"
                fill
                className="object-contain"
                data-ai-hint={getImage('hero-collage').hint}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.slice(0, 6).map((category) => (
            <Card key={category.id} className="p-6 text-center hover:shadow-lg transition-shadow">
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
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>

      {/* Envato Section */}
      <section className="bg-amber-50/50 dark:bg-amber-900/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-3xl font-bold">The only creative subscription you need</h3>
                    <p className="text-muted-foreground mt-2">Get access to millions of creative assets. Unlimited downloads for a single monthly fee.</p>
                    <Button className="mt-4" asChild>
                        <Link href="#">Get Started Now</Link>
                    </Button>
                </div>
                <div className="relative h-64 hidden md:block">
                    <Image src={getImage('creative-subscription').url} alt="Creative subscription assets" fill className="object-contain" data-ai-hint={getImage('creative-subscription').hint} />
                </div>
            </div>
        </div>
      </section>

      {/* Newest Themes & Templates */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="new-products">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Our Newest Themes and Templates</h2>
                <p className="text-muted-foreground">The best of our collection, all in one place.</p>
                <TabsList className="mt-4">
                    <TabsTrigger value="new-products">New Products</TabsTrigger>
                    <TabsTrigger value="best-selling">Best Selling</TabsTrigger>
                    <TabsTrigger value="featured-products">Featured</TabsTrigger>
                </TabsList>
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
                    {bestSelling.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="featured-products">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
          </Tabs>
      </section>

      {/* Final CTA */}
      <section className="bg-amber-50/50 dark:bg-amber-900/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Looking for unlimited downloads?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get access to our entire library of themes, templates, and more with a single subscription.</p>
             <Button className="mt-6" size="lg" asChild>
                <Link href="#">Learn More About Envato Elements</Link>
            </Button>
        </div>
      </section>

    </div>
  );
}
