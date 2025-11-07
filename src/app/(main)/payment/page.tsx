
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import {
  ArrowLeft,
  Info,
  CreditCard as CreditCardIcon,
  Lock,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard } from '@/components/shared/CreditCard';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    toast({
      title: 'Order placed successfully!',
      description: 'You will now be redirected to the confirmation page.',
    });
    router.push('/order');
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Card className="text-center p-8 max-w-md">
          <CardTitle>Your Cart is Empty</CardTitle>
          <CardDescription className="mt-2">
            You have no items in your cart to check out.
          </CardDescription>
          <Button asChild className="mt-6">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/50 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 lg:py-12 lg:gap-12">
        {/* Left Column: Order Summary */}
        <div className="bg-white lg:bg-transparent py-8 px-4 sm:px-6 lg:px-0">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
              </Button>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">DigiAddaWorld</span>
                <span className="text-xs font-semibold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md">
                  TEST MODE
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground text-sm">Pay DigiAddaWorld</p>
              <p className="text-4xl font-bold tracking-tight">
                Rs {total.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4 border-t border-b py-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden border bg-secondary">
                      <Image
                        src={item.media[0].url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.media[0].hint}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Digital Product
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">Rs {item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-b">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>Rs {subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="flex items-center gap-1 text-muted-foreground">
                  Tax <Info className="w-3.5 h-3.5" />
                </p>
                <p>Rs {tax.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg py-4">
              <p>Total due</p>
              <p>Rs {total.toFixed(2)}</p>
            </div>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-8">
                <p>Powered by <span className="font-bold">Stripe</span></p>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-primary">Terms</Link>
                    <Link href="#" className="hover:text-primary">Privacy</Link>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className="bg-white py-8 px-4 sm:px-6 lg:rounded-2xl lg:shadow-xl">
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-6">Pay with card</h2>
            <form className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="card-info">Debit/Credit Card information</Label>
                <div className="relative">
                  <Input id="card-info" placeholder="1234 1234 1234 1234" className="pr-24" />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <CreditCard />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM / YY" />
                  <Input placeholder="CVC" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name-on-card">Name on card</Label>
                <Input id="name-on-card" />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="billing-address">Billing address</Label>
                <Select defaultValue="IN">
                    <SelectTrigger id="billing-address">
                        <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Address" />
                <Link href="#" className="text-sm text-primary hover:underline">
                    Enter address manually
                </Link>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border p-4">
                <Checkbox id="save-info" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="save-info"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save my info for secure 1-click checkout
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Pay faster on DigiAddaWorld and thousands of sites.
                  </p>
                </div>
              </div>

              <Button size="lg" className="w-full text-base" onClick={handlePlaceOrder}>
                Pay
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
