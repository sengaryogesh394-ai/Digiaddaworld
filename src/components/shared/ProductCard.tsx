import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl">
        <div className="aspect-square relative overflow-hidden">
          <Link href={`/shop/${product.id}`}>
            <motion.div whileHover={{ scale: 1.05 }} className="h-full w-full">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.images[0].hint}
              />
            </motion.div>
          </Link>
          {product.isFeatured && <Badge className="absolute top-3 left-3">Featured</Badge>}
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-1">{product.category}</p>
          <h3 className="font-semibold text-base truncate h-6">
            <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
          </h3>
          <div className="flex items-center my-2">
            <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 text-gray-300 fill-current" />
            </div>
            <p className="ml-2 text-xs text-muted-foreground">(12)</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-primary">${product.price.toFixed(2)}</p>
            <Button size="icon" variant="outline" asChild>
                <Link href={`/shop/${product.id}`}>
                    <ShoppingCart className="w-4 h-4"/>
                    <span className="sr-only">Add to Cart</span>
                </Link>
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}
