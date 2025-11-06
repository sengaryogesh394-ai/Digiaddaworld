"use client";

import Link from 'next/link';
import * as React from 'react';
import { Menu, Search, ShoppingCart, User, ChevronDown, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Our Store' },
  { href: '/blog', label: 'Blogs' },
  { href: '/shop?category=laptops', label: 'Laptops' },
];

export function Header() {
  const isMobile = useIsMobile();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild>
          <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>
        </Button>
      ))}
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            Speaker <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild><Link href="/shop?category=speaker">Speakers</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/shop?category=headphones">Headphones</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="container flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-auto p-0 text-primary-foreground hover:bg-transparent hover:text-primary-foreground">English <ChevronDown className="w-4 h-4 ml-1" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>Deutsch</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-auto p-0 text-primary-foreground hover:bg-transparent hover:text-primary-foreground">USD $ <ChevronDown className="w-4 h-4 ml-1" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>EUR €</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="hidden md:block">Free Shipping On All Orders Over $100</p>
            <div className="flex gap-4 items-center">
                <Link href="/login" className="hover:underline">My Account</Link>
                <Link href="#" className="hover:underline">Compare</Link>
            </div>
        </div>
      </div>
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl">DigiAddaWorld</span>
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>

        {isMobile && (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="mr-6 flex items-center space-x-2 px-4">
                 <span className="font-bold text-2xl">DigiAddaWorld</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">{renderNavLinks()}</div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <span className="font-bold text-xl">DigiAddaWorld</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:block w-full max-w-sm">
            <form>
              <div className="relative">
                <Input
                  className="w-full bg-secondary pr-10"
                  placeholder="Search Product Here..."
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </form>
          </div>
           <Button variant="ghost" size="icon" asChild>
             <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                    <Badge variant="default" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0">{cart.length}</Badge>
                )}
                <span className="sr-only">Cart</span>
             </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
