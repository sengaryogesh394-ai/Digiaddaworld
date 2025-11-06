
'use client';
import Image from 'next/image';
import { notFound, useRouter, useParams } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const { productId } = params;
  const product = mockProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    })
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <Image
                      src={img.url}
                      alt={`${product.name} image ${index + 1}`}
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

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={handleBuyNow}>Buy Now</Button>
          </div>

          <Accordion type="single" collapsible defaultValue="description" className="w-full mt-8">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> High-quality digital files</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Instant download</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Compatible with major software</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Royalty-free license</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="compatibility">
              <AccordionTrigger>Compatibility</AccordionTrigger>
              <AccordionContent>
                This product is compatible with Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
    </div>
  );
}
