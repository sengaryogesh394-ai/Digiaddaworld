'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { IProduct } from '@/models/Product';

interface ProductDetailClientProps {
  product: IProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addToCart } = useCart();

  // Calculate discounted price if promotion is active
  const calculatePrice = () => {
    if (product.promotion?.enabled && product.promotion.discountPercentage > 0) {
      const discount = product.promotion.discountPercentage / 100;
      const discountedPrice = product.originalPrice * (1 - discount);
      return discountedPrice;
    }
    return product.price; // Use regular price if no promotion
  };

  const finalPrice = calculatePrice();
  const hasPromotion = product.promotion?.enabled && product.promotion.discountPercentage > 0;

  const handleBuyNow = (productToBuy: IProduct) => {
    if (productToBuy) {
      addToCart(productToBuy as any);
      toast({
        title: "Added to cart",
        description: `${productToBuy.name} has been added to your cart.`,
      });
      router.push('/payment');
    }
  };

  const handleAddToCart = (productToAdd: IProduct) => {
    addToCart(productToAdd as any);
    toast({
      title: "Added to cart",
      description: `${productToAdd.name} has been added to your cart.`,
    });
  };

  return (
    <>
      {/* Purchase Section */}
      <section className="max-w-3xl mx-auto text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h2 className="text-3xl font-bold text-orange-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {hasPromotion ? (
            <>
              Special Offer{' '}
              <span className="text-gray-400 line-through">Rs {product.originalPrice.toFixed(2)}</span>{' '}
              <span className="text-green-600">Rs {finalPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded">
                Save {product.promotion?.discountPercentage || 0}%
              </span>
            </>
          ) : (
            <>
              Special Offer{' '}
              <span className="text-gray-400 line-through">Rs {product.originalPrice.toFixed(2)}</span>{' '}
              Rs {product.price.toFixed(2)}
            </>
          )}
        </h2>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform"
            onClick={() => handleBuyNow(product)}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ShoppingCart className="mr-2" /> YES, I WANT THIS PACK FOR Rs {finalPrice.toFixed(2)}
          </Button>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform"
            onClick={() => handleBuyNow(product)}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Buy Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Button
          size="lg"
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg w-full"
          onClick={() => handleBuyNow(product)}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          GET LIFETIME ACCESS at Rs {product.price.toFixed(2)}
        </Button>
      </section>
    </>
  );
}
