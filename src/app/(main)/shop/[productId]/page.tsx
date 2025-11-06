
'use client';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Star, Check, ShoppingCart, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from '@/components/shared/CountdownTimer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProductDetailsPage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const { productId } = params;
  const product = mockProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

    const getImage = (id: string) => {
        const image = PlaceHolderImages.find(img => img.id === id);
        return { id: image?.id || '', url: image?.imageUrl || 'https://picsum.photos/seed/default/120/120', hint: image?.imageHint || 'guarantee' };
    }

  const handleAddToCart = () => {
    if (product) {
        addToCart(product);
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
        addToCart(product);
        router.push('/checkout');
    }
  }
  
  const originalPrice = product.price * 14;

  return (
    <div className="bg-rose-50/50 dark:bg-rose-900/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header Section */}
            <section className="text-center">
                <div className="inline-block bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-md mb-4 shadow-lg">
                    <Zap className="inline-block w-4 h-4 mr-2" /> MEGA SALE IS ON! 95% OFF
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
                    {product.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-2">
                    Beginner-Friendly & 100% Ready-Made Project
                </p>
            </section>
            
            {/* Purchase Section */}
            <section className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-orange-500">Special Offer <span className="text-gray-400 line-through">${originalPrice.toFixed(2)}</span> ${product.price.toFixed(2)}</h2>
                <div className="my-6">
                    <CountdownTimer />
                </div>
                <div className="flex flex-col gap-4">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg mt-2 shadow-lg transform hover:scale-105 transition-transform" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2"/> YES, I WANT THIS PACK FOR ${product.price.toFixed(2)}
                    </Button>
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform" onClick={handleBuyNow}>
                        Buy Now <ArrowRight className="ml-2"/>
                    </Button>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="bg-indigo-100/50 dark:bg-indigo-900/20 py-8 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {product.images.slice(0, 4).map((img, index) => (
                        <div key={index} className="bg-black rounded-3xl p-2 shadow-lg">
                            <div className="relative aspect-[9/19] w-full rounded-2xl overflow-hidden">
                                <Image
                                    src={img.url}
                                    alt={`${product.name} screenshot ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={img.hint}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* What You Get Section */}
            {product.features && product.features.length > 0 && (
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        What You Get Inside This Pack
                    </h2>
                    <Card className="bg-white dark:bg-card shadow-lg">
                        <CardContent className="p-8 space-y-4">
                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> {feature}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            )}

             {/* Description Section */}
             <section className="max-w-3xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Description
                </h2>
                <Card className="bg-white dark:bg-card shadow-lg">
                    <CardContent className="p-8">
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line space-y-4">
                           <p>{product.description}</p>
                           <p>Save countless hours of work with ready-made assets that cover a wide range of styles and niches. From social media graphics to video transitions, this pack is designed to streamline your workflow and help you produce amazing results, faster.</p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Compatibility Section */}
            {product.compatibility && (
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        Compatibility
                    </h2>
                    <Card className="bg-white dark:bg-card shadow-lg">
                        <CardContent className="p-8">
                            <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>{product.compatibility.title}</p>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                {product.compatibility.details.map((detail, i) => (
                                    <li key={i}><b>{detail.split(':')[0]}:</b>{detail.split(':')[1]}</li>
                                ))}
                            </ul>
                            {product.compatibility.notes && <p className="pt-2">{product.compatibility.notes}</p>}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            )}
             {/* Guarantee Section */}
            <section className="text-center max-w-3xl mx-auto">
                <Image 
                    src={getImage('promo-guarantee').url} 
                    alt="30-Day Money-Back Guarantee" 
                    width={120} height={120} 
                    className="mx-auto" 
                    data-ai-hint={getImage('promo-guarantee').hint} 
                />
                <h3 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">30-Day Money-Back Guarantee</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">100% Risk-Free: Earn your first sale or get a full refund.</p>
                <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400 w-fit mx-auto my-6">
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> 94% recover investment in 1 Week</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> Step-by-step success system</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> Personal mentorship to first sale</li>
                </ul>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg w-full mt-6">
                    GET LIFETIME ACCESS at ${product.price.toFixed(2)}
                </Button>
            </section>
        </div>
    </div>
  );
}
