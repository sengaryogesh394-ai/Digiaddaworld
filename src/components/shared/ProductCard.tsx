import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Search } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl">
      <CardContent className="p-0 relative">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.images[0].hint}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Heart className="w-4 h-4"/>
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Search className="w-4 h-4"/>
              </Button>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
            <Button className="w-full opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                <Link href={`/shop/${product.id}`}>
                    <ShoppingCart className="mr-2 h-4 w-4"/> Add to Cart
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
