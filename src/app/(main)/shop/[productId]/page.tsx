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
  console.log('Promotional header data:', product.promotionalHeader);
  console.log('Promotional header enabled:', product.promotionalHeader?.enabled);

  const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return { 
      id: image?.id || '', 
      url: image?.imageUrl || 'https://picsum.photos/seed/default/120/120', 
      hint: image?.imageHint || 'guarantee' 
    };
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Promotional Header Section */}
        {product.promotionalHeader?.enabled && (
          <section 
            className="py-12 md:py-16 px-4"
            style={{ 
              background: `linear-gradient(135deg, ${product.promotionalHeader.backgroundColor || '#FF6B6B'}, ${product.promotionalHeader.backgroundColor ? product.promotionalHeader.backgroundColor + 'CC' : '#FF8E8E'})`,
              color: product.promotionalHeader.textColor || '#000000'
            }}
          >
            <div className="container mx-auto max-w-5xl text-center space-y-6">
              {/* Top Banner Text */}
              {product.promotionalHeader.bannerText && (
                <div className="inline-block bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg mb-4">
                  <p className="text-sm md:text-base font-bold">
                    {product.promotionalHeader.bannerText}
                  </p>
                </div>
              )}

              {/* Sub Heading */}
              {product.promotionalHeader.subHeading && (
                <p className="text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
                  {product.promotionalHeader.subHeading}
                </p>
              )}

              {/* Main Heading */}
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}
              >
                {product.promotionalHeader.mainHeading || product.name}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base max-w-4xl mx-auto leading-relaxed opacity-90">
                {product.description.substring(0, 200)}...
              </p>

              {/* CTA Section */}
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
                  <span className="text-gray-800 font-semibold text-sm md:text-base">
                    Lifetime Access - One-Time Payment - Instant Download
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
            {/* Header Section - Only show if no promotional header */}
            {!product.promotionalHeader?.enabled && (
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
            )}
            
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
            <ProductDetailClient product={product} />

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
             {/* Limited Time Offer Section */}
            <section className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-4 border-orange-400 dark:border-orange-600 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Alert Icon & Title */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-4">
                            <Zap className="w-8 h-8 animate-pulse" />
                            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Limited Time Offer!
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            The next 3 months are the GOLDEN PERIOD for {product.category} products
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    {product.promotion?.enabled === true && (
                        <div className="my-8">
                            <CountdownTimer 
                                endDate={product.promotion.timerEndDate} 
                                discountPercentage={product.promotion.discountPercentage || 85}
                            />
                        </div>
                    )}

                    {/* Price Info */}
                    <div className="text-center mb-8">
                        <p className="text-lg md:text-xl text-red-600 dark:text-red-400 font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Price Returns to ₹{product.originalPrice || (product.price * 2).toFixed(0)} Tomorrow – Enroll Now at ₹{product.price.toFixed(0)}!
                        </p>
                        <div className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Only ₹{product.price.toFixed(0)}
                        </div>
                    </div>

                    {/* What's Inside */}
                    <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Here's What You'll Get Inside
                        </h3>
                        <div className="space-y-3">
                            {product.features && product.features.slice(0, 7).map((feature: any, index: number) => (
                                <div key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                    <span className="text-base md:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <span dangerouslySetInnerHTML={{ __html: feature.title }} />
                                        {feature.description && ` - ${feature.description}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mb-8">
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-lg md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            GET LIFETIME ACCESS at Rs ₹{product.price.toFixed(0)}/- 🔒
                        </button>
                    </div>

                    {/* Guarantee Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold">Instant Course Access</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold">Lifetime Updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold">30-Day Guarantee</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee Section with Round Badge */}
            <section className="text-center max-w-3xl mx-auto">
                <div className="inline-block">
                    <Image 
                        src={getImage('promo-guarantee').url} 
                        alt="30-Day Money-Back Guarantee" 
                        width={150} 
                        height={150} 
                        className="mx-auto rounded-full shadow-2xl border-4 border-green-500 dark:border-green-400" 
                        data-ai-hint={getImage('promo-guarantee').hint} 
                    />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mt-6 text-gray-800 dark:text-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>30-Day Money-Back Guarantee</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>100% Risk-Free: Earn your first sale or get a full refund.</p>
                <ul className="text-left space-y-3 text-gray-600 dark:text-gray-400 w-fit mx-auto my-8">
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500 flex-shrink-0"/> <span className="text-base">94% recover investment in 1 Week</span></li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500 flex-shrink-0"/> <span className="text-base">Step-by-step success system</span></li>
                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500 flex-shrink-0"/> <span className="text-base">Personal mentorship to first sale</span></li>
                </ul>
            </section>

            {/* Customer Reviews Section */}
            <ProductReviews productId={product._id.toString()} />
        </div>
    </div>
  );
}
    