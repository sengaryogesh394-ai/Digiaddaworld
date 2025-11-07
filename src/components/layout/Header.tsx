"use client";

import Link from 'next/link';
import * as React from 'react';
import { Menu, Search, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Our Store' },
  { href: '/blog', label: 'Blogs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const isMobile = useIsMobile();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLinks = () => (
    <>
      {navLinks.map((link, index) => (
        <Button 
          key={link.href} 
          variant="ghost" 
          asChild
          className="relative group transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
            {link.label}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 transform -translate-x-1/2"></span>
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-background shadow-lg' 
        : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      {/* Animated Top Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground text-sm py-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="container flex justify-between items-center relative z-10">
            <p className="hidden md:flex items-center gap-2 animate-fade-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              The ultimate destination for premium digital products!
            </p>
            <div className="flex gap-4 items-center ml-auto">
                <Link 
                  href="/admin/dashboard" 
                  className="hover:underline flex items-center gap-1 transition-transform duration-300 hover:scale-110 hover:gap-2"
                >
                  <TrendingUp className="h-3 w-3" />
                  Start Buying
                </Link>
            </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <span className="font-bold text-2xl text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary/80">
              DigiAddaWorld
            </span>
            <span className="inline-block transition-transform duration-500 group-hover:rotate-12">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>

        {isMobile && (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 transition-transform duration-300 hover:scale-110 hover:rotate-90"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="mr-6 flex items-center space-x-2 px-4 group"
              >
                 <span className="font-bold text-2xl text-primary">DigiAddaWorld</span>
                 <Sparkles className="h-5 w-5 text-primary group-hover:animate-spin" />
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">{renderNavLinks()}</div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Link href="/" className="flex items-center space-x-2 md:hidden group">
          <span className="font-bold text-xl text-primary transition-all duration-300 group-hover:scale-105">
            DigiAddaWorld
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
            </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             asChild
             className="transition-all duration-300 hover:scale-110"
           >
             <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
                {cart.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0 animate-bounce"
                    >
                      {cart.length}
                    </Badge>
                )}
                <span className="sr-only">Cart</span>
             </Link>
          </Button>
          <Button 
            asChild 
            className="hidden md:inline-flex transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </header>
  );
}
