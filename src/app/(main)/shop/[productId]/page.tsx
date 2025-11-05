import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

export default function ProductDetailsPage({ params }: { params: { productId: string } }) {
  const product = mockProducts.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {product.images.map((img) => (
                <CarouselItem key={img.id}>
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <Image
                      src={img.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      data-ai-hint={img.hint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-headline font-bold">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{product.category}</p>

          <div className="flex items-center mt-4">
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 text-gray-300 fill-current" />
            </div>
            <p className="ml-2 text-sm text-muted-foreground">(123 reviews)</p>
          </div>

          <p className="text-4xl font-bold my-6">${product.price.toFixed(2)}</p>

          <Separator />
          
          <div className="mt-6">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">Add to Cart</Button>
            <Button size="lg" variant="outline" className="flex-1">Buy Now</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
