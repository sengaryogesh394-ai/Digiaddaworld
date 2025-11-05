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
import { BlogPostCard } from '@/components/shared/BlogPostCard';
import { mockProducts, mockCategories, mockBlogPosts } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogoCloud } from '@/components/shared/LogoCloud';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

const printOnDemandProducts = [
  { name: 'Low rise socks', image: 'https://picsum.photos/seed/pod1/400/400', hint: 'blue socks' },
  { name: 'Hoodie', image: 'https://picsum.photos/seed/pod2/400/400', hint: 'dark hoodie' },
  { name: 'Ceramic mugs', image: 'https://picsum.photos/seed/pod3/400/400', hint: 'mug mockup' },
  { name: 'Wool scarf', image: 'https://picsum.photos/seed/pod4/400/400', hint: 'winter scarf' },
  { name: 'Baseball cap', image: 'https://picsum.photos/seed/pod5/400/400', hint: 'white cap' },
];

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.isFeatured);
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-primary text-primary-foreground -mt-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnView>
            <div className="max-w-4xl mx-auto">
                <p className="text-lg bg-black/20 text-white inline-block px-4 py-1 rounded-full mb-4">Your Marketplace for Digital Goods</p>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                  DISCOVER & BUY
                  <br />
                  AMAZING DIGITAL PRODUCTS.
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
                  Explore a universe of digital creations. From e-books and templates to music and art, find everything you need to create and inspire.
                </p>
                <div className="mt-8">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/shop">Explore Products</Link>
                  </Button>
                </div>
            </div>
          </AnimateOnView>
        </div>
      </section>
      
      <AnimateOnView>
        <LogoCloud />
      </AnimateOnView>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Featured Products Section */}
        <section>
          <AnimateOnView>
            <h2 className="text-3xl font-headline text-center mb-8">Featured Products</h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <AnimateOnView key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/shop">View All Products</Link>
            </Button>
          </AnimateOnView>
        </section>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-[#e0e3fa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnView>
            <h2 className="text-3xl font-headline text-center mb-8 text-black">Browse by Category</h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCategories.map((category, i) => (
              <AnimateOnView key={category.id} delay={i * 0.1}>
                <Link href={`/shop?category=${category.id}`}>
                  <Card className="relative overflow-hidden group h-64 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={category.image.url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={category.image.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end justify-center p-6">
                      <h3 className="text-white text-2xl font-bold font-headline text-center transform transition-transform duration-300 group-hover:-translate-y-2">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Print-on-Demand Merch Section */}
      <section className="bg-[#EADFCB] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnView>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4" style={{ color: '#0f3d1f' }}>Create print-on-demand merch.</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
              Custom print-on-demand without upfront investment, delivered swiftly from the nearest one of our 11 fulfillment centers. They'll SPOD the speed and quality.
            </p>
          </AnimateOnView>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
            {printOnDemandProducts.map((product, i) => (
              <AnimateOnView key={product.name} delay={i * 0.1}>
                <div>
                  <Card className="overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                          data-ai-hint={product.hint}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <p className="mt-2 text-sm text-muted-foreground">{product.name}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView>
            <Button size="lg">Create your store</Button>
          </AnimateOnView>
        </div>
      </section>

      {/* From the Blog Section */}
      <section className="py-16 bg-[#5f69c5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <AnimateOnView>
              <h2 className="text-3xl font-headline text-center mb-8 text-white">From Our Blog</h2>
            </AnimateOnView>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mockBlogPosts.slice(0, 3).map((post, i) => (
                  <AnimateOnView key={post.id} delay={i * 0.1}>
                    <BlogPostCard post={post} />
                  </AnimateOnView>
                ))}
            </div>
            <AnimateOnView className="text-center mt-8">
                <Button asChild variant="secondary">
                <Link href="/blog">Read More Posts</Link>
                </Button>
            </AnimateOnView>
        </div>
      </section>
    </div>
  );
}
