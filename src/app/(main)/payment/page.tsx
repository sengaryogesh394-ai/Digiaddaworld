
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    // In a real app, you would process the payment here.
    // For now, we'll just navigate to the order confirmation page.
    router.push('/order');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-secondary">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-headline">Checkout</h1>
      </header>

      {cart.length === 0 ? (
         <Card className="text-center p-8">
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription className="mt-2">You have no items in your cart to check out.</CardDescription>
            <Button asChild className="mt-6">
                <Link href="/shop">Continue Shopping</Link>
            </Button>
         </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Customer & Payment Info */}
            <div className="space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiration Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" />
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>

            {/* Order Summary */}
            <div>
            <Card>
                <CardHeader>
                <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {cart.map(item => (
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
                <Separator className="my-4" />
                <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                    <p>Subtotal</p>
                    <p>Rs {subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                    <p>Taxes</p>
                    <p>Rs {tax.toFixed(2)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-xl">
                    <p>Total</p>
                    <p>Rs {total.toFixed(2)}</p>
                    </div>
                </div>
                <Button size="lg" className="w-full mt-6" onClick={handlePlaceOrder}>Place Order</Button>
                </CardContent>
            </Card>
            </div>
        </div>
      )}
    </div>
  );
}

    