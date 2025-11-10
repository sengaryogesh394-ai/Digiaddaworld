
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: '',
    country: 'IN',
    address: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    // Check if user is logged in
    if (!session) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to place an order',
        variant: 'destructive',
      });
      router.push('/auth/login');
      return;
    }

    // Validate form
    if (!formData.email || !formData.nameOnCard || !formData.address) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total,
          shippingAddress: {
            fullName: formData.nameOnCard,
            phone: '0000000000', // You can add phone field to form
            address: formData.address,
            city: 'City', // You can add city field to form
            state: 'State', // You can add state field to form
            pincode: '000000', // You can add pincode field to form
          },
          paymentMethod: 'card',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        clearCart();
        toast({
          title: 'Order placed successfully!',
          description: 'You will now be redirected to the confirmation page.',
        });
        setTimeout(() => {
          router.push(`/order?orderId=${data.orderId}`);
        }, 500);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place order');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to place order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
              <div key="subtotal" className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>Rs {subtotal.toFixed(2)}</p>
              </div>
              <div key="tax" className="flex justify-between">
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
                    <Link key="terms" href="#" className="hover:text-primary">Terms</Link>
                    <Link key="privacy" href="#" className="hover:text-primary">Privacy</Link>
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
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
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
                  <Input key="expiry" placeholder="MM / YY" />
                  <Input key="cvc" placeholder="CVC" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name-on-card">Name on card</Label>
                <Input 
                  id="name-on-card" 
                  value={formData.nameOnCard}
                  onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                  required
                />
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
                <Input 
                  placeholder="Address" 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
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

              <Button 
                size="lg" 
                className="w-full text-base" 
                onClick={handlePlaceOrder} 
                type="button"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
