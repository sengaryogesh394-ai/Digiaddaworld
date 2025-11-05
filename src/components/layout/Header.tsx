"use client";

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const isMobile = useIsMobile();
  const { cart } = useCart();

  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl">Digiaddaworld</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 px-4">
                 <span className="font-bold font-headline text-2xl">Digiaddaworld</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">{renderNavLinks()}</div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <span className="font-bold font-headline text-xl">Digiaddaworld</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:block w-full max-w-sm">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full bg-secondary pl-9"
                  placeholder="Search products..."
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon" asChild>
             <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                    <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0">{cart.length}</Badge>
                )}
                <span className="sr-only">Cart</span>
             </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
