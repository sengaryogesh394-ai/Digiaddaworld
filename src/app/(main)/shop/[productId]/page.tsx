
'use client';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Star, Check, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from '@/components/shared/CountdownTimer';

export default function ProductDetailsPage() {
  const { toast } = useToast();
  const params = useParams();
  const { productId } = params;
  const product = mockProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    notFound();
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

  const mainImage = product.images[selectedImageIndex] || product.images[0];
  
  const features = [
    "500+ Editable Wedding Invitation Videos (UHD - 4K)",
    "5000+ Wedding Invitation PSD Templates (Photoshop)",
    'All "Save the date" & "Haldi Function" templates',
    "Lifetime Validity - Instant Download Link",
    "No-Branding / No-Watermark on any content"
  ];

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
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg mt-2 shadow-lg transform hover:scale-105 transition-transform" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2"/> YES, I WANT THIS PACK FOR ${product.price.toFixed(2)}
                </Button>
            </section>

            {/* Image Gallery */}
            <section className="bg-indigo-100/50 dark:bg-indigo-900/20 py-8 rounded-lg">
                <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-transparent">
                    <Image
                        src={mainImage.url}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={mainImage.hint}
                    />
                </div>
                {product.images.length > 1 && (
                    <div className="flex justify-center gap-4 mt-4">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setSelectedImageIndex(index)} className={cn("relative w-24 h-16 rounded-md overflow-hidden border-2 transition-all", selectedImageIndex === index ? 'border-primary scale-110' : 'border-transparent hover:border-primary/50')}>
                                <Image
                                    src={img.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={img.hint}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* What You Get Section */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    What You Get Inside This Pack
                </h2>
                <Card className="bg-white dark:bg-card shadow-lg">
                    <CardContent className="p-8 space-y-4">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> {feature}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

             {/* Description Section */}
             <section className="max-w-3xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Description
                </h2>
                <Card className="bg-white dark:bg-card shadow-lg">
                    <CardContent className="p-8">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                           {product.description}
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Compatibility Section */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Compatibility
                </h2>
                <Card className="bg-white dark:bg-card shadow-lg">
                    <CardContent className="p-8">
                         <p className="text-gray-700 dark:text-gray-300">
                           This product is compatible with Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve.
                        </p>
                    </CardContent>
                </Card>
            </section>

        </div>
    </div>
  );
}
