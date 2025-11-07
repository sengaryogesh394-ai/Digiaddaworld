
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { cart, clearCart } = useCart();
  const [orderedItems, setOrderedItems] = useState<Product[]>([]);

  useEffect(() => {
    if (cart.length > 0) {
      setOrderedItems([...cart]);
      clearCart();
    }
  }, []);

  const subtotal = orderedItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (orderedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Card className="max-w-2xl mx-auto p-8">
            <CardTitle className="text-2xl font-headline">No Order Found</CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
                It looks like you haven't placed an order yet.
            </CardDescription>
            <Button asChild className="mt-6">
                <Link href="/shop">Start Shopping</Link>
            </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full p-3 w-fit">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Thank You For Your Order!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your purchase was successful. A confirmation has been sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {orderedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                    <Image src={item.media[0].url} alt={item.name} fill className="object-cover" data-ai-hint={item.media[0].hint}/>
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                </div>
                <p>Rs {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <p>Subtotal</p>
              <p>Rs {subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <p>Taxes</p>
              <p>Rs {tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <p>Total</p>
              <p>Rs {total.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
