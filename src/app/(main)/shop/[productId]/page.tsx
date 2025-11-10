import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from '@/components/shared/CountdownTimer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductController } from '@/controllers/productController';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductReviews from '@/components/product/ProductReviews';
import { Zap, Check } from 'lucide-react';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const { productId } = await params;
  const result = await ProductController.getProductBySlug(productId);
  
  if (!result.success || !result.data) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = result.data;
  const firstImage = product.media.find(m => m.type === 'image')?.url || product.media[0]?.url;

  return {
    title: `${product.name} - DigiAdda`,
    description: product.description,
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [firstImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [firstImage],
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  
  // Fetch product by slug from database
  const result = await ProductController.getProductBySlug(productId);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const product = JSON.parse(JSON.stringify(result.data));
  
  // Debug: Log promotion data
  console.log('Product promotion data:', product.promotion);
  console.log('Promotion enabled:', product.promotion?.enabled);
  console.log('Discount percentage:', product.promotion?.discountPercentage);

  // Find a different featured product to promote
  const promoResult = await ProductController.getAllProducts({ 
    isFeatured: true, 
    limit: 2,
    status: 'active'
  });
  
  const promoProduct = promoResult.success 
    ? promoResult.data.find((p: any) => p._id.toString() !== product._id.toString()) || promoResult.data[0]
    : null;

  const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { 
      id: image?.id || '', 
      url: image?.imageUrl || 'https://picsum.photos/seed/default/120/120', 
      hint: image?.imageHint || 'guarantee' 
    };
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header Section */}
            <section className="text-center max-w-5xl mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    Start Your <span className="text-rose-500">{product.name}</span> Business Today! Beginner-Friendly & 100% Ready-Made Projects
                </h1>
                {product.promotion?.enabled === true && (
                    <div className="inline-block bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full mb-6 shadow-lg animate-pulse" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <Zap className="inline-block w-4 h-4 mr-2" /> MEGA SALE IS ON! {product.promotion.discountPercentage || 85}% OFF
                    </div>
                )}
            </section>
            
            {/* Image Gallery */}
            <section className="bg-gradient-to-br from-pink-50 via-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-16 rounded-3xl">
                <div className="flex flex-wrap justify-center items-end gap-3 md:gap-5 lg:gap-6 max-w-7xl mx-auto px-4">
                    {product.media.slice(0, 4).map((item: any, index: number) => (
                        <div 
                            key={index} 
                            className="relative transform hover:scale-105 transition-all duration-300 hover:-translate-y-2"
                            style={{ 
                                width: 'clamp(160px, 22vw, 240px)',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))'
                            }}
                        >
                            {/* iPhone Frame */}
                            <div className="relative bg-black rounded-[2.75rem] p-[0.4rem] shadow-2xl">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-3xl z-10"></div>
                                
                                {/* Screen */}
                                <div className="relative aspect-[9/19.5] w-full rounded-[2.4rem] overflow-hidden bg-white">
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.url}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <Image
                                            src={item.url}
                                            alt={`${product.name} preview ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={item.hint}
                                            priority={index < 2}
                                        />
                                    )}
                                </div>
                                
                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Hello Section */}
            <section className="text-center max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    👋 Hello, Creative Businesses!
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    Earn ₹35,000 - ₹45,000/week from home! 💰🏠
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    🎉 Start your creative business with Premiere Templates Ultimate Template + Videos Bundle 📦 - no costly software, no long training.
                </p>
            </section>

            {/* Purchase Section with Countdown */}
            {product.promotion?.enabled === true && (
              <section className="max-w-3xl mx-auto text-center">
                  <div className="my-6">
                      <CountdownTimer 
                        endDate={product.promotion.timerEndDate} 
                        discountPercentage={product.promotion.discountPercentage || 85}
                      />
                  </div>
              </section>
            )}

            {/* Client-side interactive components */}
            <ProductDetailClient product={product} promoProduct={promoProduct} />

             {/* What You Get Section */}
             <section className="max-w-4xl mx-auto">
                <h2 className="text-center text-4xl mb-8 text-gray-800 dark:text-gray-100" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    What You Get Inside <span className="text-blue-600 underline decoration-2 underline-offset-4">This ₹{product.price.toFixed(0)} Pack</span>
                </h2>
                {product.features && product.features.length > 0 && (
                    <div className="space-y-3">
                        <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200 p-5 rounded-lg text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                            <span className="mr-2">🎉</span>
                            {product.features.length}+ Premium Features: All-in-One Pack – <span className="italic">₹15000+ Value</span>
                        </div>
                        {product.features.map((feature: any, index: number) => (
                        <Card key={index} className="bg-white dark:bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
                            <CardContent className="p-5 flex items-start gap-3">
                            <span className="font-bold text-gray-800 dark:text-gray-300 text-lg" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{index + 1}.</span>
                            <div className="flex-1">
                                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }} className="text-gray-900 dark:text-gray-100 leading-relaxed">
                                <span className="mr-2">{feature.icon}</span>
                                <span dangerouslySetInnerHTML={{ __html: feature.title }} />
                                {feature.description && (
                                  <span className="text-gray-700 dark:text-gray-400 font-normal"> {feature.description}</span>
                                )}
                                {feature.value && (
                                  <span className="text-gray-500 dark:text-gray-400 italic font-normal"> – {feature.value}</span>
                                )}
                                </p>
                            </div>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Compatibility Section */}
            {product.compatibility && (
                <section className="max-w-3xl mx-auto">
                    <Card className="bg-white dark:bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
                                Compatibility
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                            <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>{product.compatibility.title}</p>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                {product.compatibility.details.map((detail, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: detail }} />
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
            </section>

            {/* Customer Reviews Section */}
            <ProductReviews productId={product._id.toString()} />
        </div>
    </div>
  );
}
    