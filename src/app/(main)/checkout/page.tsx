import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockProducts } from '@/lib/mock-data';
import Image from 'next/image';

export default function CheckoutPage() {
  const cartItems = mockProducts.slice(0, 2);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0) * 1.08;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-secondary">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-headline">Checkout</h1>
      </header>

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
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                        <Image src={item.images[0].url} alt={item.name} fill className="object-cover" data-ai-hint={item.images[0].hint}/>
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                      </div>
                    </div>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <p>Subtotal</p>
                  <p>${(total / 1.08).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>Taxes</p>
                  <p>${(total - total / 1.08).toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              <Button size="lg" className="w-full mt-6">Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
