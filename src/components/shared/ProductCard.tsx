
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  // Handle both database products (slug) and mock products (id)
  const productLink = product.slug ? `/shop/${product.slug}` : `/shop/${product.id}`;
  
  return (
    <Link href={productLink} className="block h-full w-full group">
        <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl border-0 bg-transparent shadow-none">
            <div className="aspect-square relative overflow-hidden rounded-lg">
            <motion.div whileHover={{ scale: 1.05 }} className="h-full w-full">
                <Image
                    src={product.media[0].url}
                    alt={product.name}
                    fill
                    className="object-cover bg-secondary"
                    data-ai-hint={product.media[0].hint}
                />
            </motion.div>
            {product.isFeatured && <Badge className="absolute top-3 left-3">Featured</Badge>}
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4">
                <div className="w-full">
                    <p className="text-white/80 text-sm mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg truncate h-7 text-white">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-lg text-white">Rs {product.price.toFixed(2)}</p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm">
                                <ShoppingCart className="w-4 h-4 mr-2"/>
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Card>
    </Link>
  );
}
