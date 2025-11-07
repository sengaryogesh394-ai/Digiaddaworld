
'use client';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProductPage = pathname.startsWith('/shop/') && pathname.split('/').length > 2;

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        {!isProductPage && <Header />}
        <main className="flex-1">{children}</main>
        {!isProductPage && <Footer />}
      </div>
    </CartProvider>
  );
}
