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
    <Card className="overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl border-0 bg-transparent shadow-none">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Link href={`/shop/${product.id}`}>
            <motion.div whileHover={{ scale: 1.05 }} className="h-full w-full">
              <Image
                src={product.media[0].url}
                alt={product.name}
                fill
                className="object-cover bg-secondary"
                data-ai-hint={product.media[0].hint}
              />
            </motion.div>
          </Link>
          {product.isFeatured && <Badge className="absolute top-3 left-3">Featured</Badge>}
           <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
               <Button size="sm" className="w-full" asChild>
                    <Link href={`/shop/${product.id}`}>
                        <ShoppingCart className="w-4 h-4 mr-2"/>
                        View Details
                    </Link>
                </Button>
           </div>
        </div>
        <CardContent className="p-4 px-1">
          <p className="text-muted-foreground text-sm mb-1">{product.category}</p>
          <h3 className="font-semibold text-lg truncate h-7">
            <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
          </h3>
          <div className="flex items-center mt-2">
            <p className="font-bold text-lg text-primary">Rs {product.price.toFixed(2)}</p>
          </div>
      </CardContent>
    </Card>
  );
}
