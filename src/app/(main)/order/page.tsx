
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load order details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  const subtotal = order ? order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
  const tax = subtotal * 0.05;
  const total = order ? order.total : 0;

  if (!order) {
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
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono font-semibold text-foreground">{order._id.slice(-8).toUpperCase()}</span></p>
            <p className="text-sm text-muted-foreground">Status: <span className="font-semibold text-foreground capitalize">{order.status}</span></p>
          </div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p>Rs {(item.price * item.quantity).toFixed(2)}</p>
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

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}
