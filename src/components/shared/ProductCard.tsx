import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>
      <Card className="overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.images[0].hint}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.category}</p>
            <p className="font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
