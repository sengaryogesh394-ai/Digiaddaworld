
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
    addToCart(product);
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    })
  };

  const mainImage = product.images[selectedImageIndex] || product.images[0];
  
  const features = [
    "500+ Editable Wedding Invitation Videos (UHD - 4K)",
    "5000+ Wedding Invitation PSD Templates (Photoshop)",
    'All "Save the date" & "Haldi Function" templates',
    "Lifetime Validity - Instant Download Link",
    "No-Branding / No-Watermark on any content"
  ];

  return (
    <div className="bg-rose-50/50 dark:bg-rose-900/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header Section */}
            <section className="text-center">
                <div className="inline-block bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <Zap className="inline-block w-4 h-4 mr-1" /> MEGA SALE IS ON!
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
                    {product.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-2">
                    Beginner-Friendly & 100% Ready-Made Project
                </p>
            </section>

            {/* Image Gallery */}
            <section>
                <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border-4 border-white shadow-2xl">
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
            
            {/* Purchase Section */}
            <section className="max-w-3xl mx-auto">
                <Card className="shadow-lg">
                    <CardContent className="p-8 text-center">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            ⚡️ Get instant access to this asset! ⚡️
                        </p>
                        <div className="my-4">
                            <p className="text-5xl font-bold text-gray-800 dark:text-gray-100">
                                <span className="text-rose-500">${product.price.toFixed(2)}</span>
                            </p>
                        </div>
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg mt-2 shadow-lg transform hover:scale-105 transition-transform w-full" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2"/> GRAB THIS OFFER NOW
                        </Button>
                    </CardContent>
                </Card>
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
