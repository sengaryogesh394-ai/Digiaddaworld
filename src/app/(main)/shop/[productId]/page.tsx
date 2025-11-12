import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/shared/CountdownTimer';
import PromotionalHeaderTimer from '@/components/PromotionalHeaderTimer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductController } from '@/controllers/productController';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductReviews from '@/components/product/ProductReviews';
import { Zap, Check, ArrowLeft, Home } from 'lucide-react';
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

  // CENTRALIZED PRICING LOGIC - Used across ALL sections for consistency
  const pricing = {
    // Use promotion timer if available, otherwise promotional header timer
    timerEndDate: product.promotion?.timerEndDate || product.promotionalHeader?.timerEndDate,
    
    // Use promotion discount if available, otherwise default
    discountPercentage: product.promotion?.enabled ? product.promotion.discountPercentage : 0,
    
    // Current price (after discount)
    currentPrice: product.price,
    
    // Original price (before discount) - calculate if not set
    originalPrice: product.originalPrice || (product.promotion?.enabled && product.promotion.discountPercentage > 0 
      ? Math.round(product.price / (1 - product.promotion.discountPercentage / 100))
      : product.price * 2),
    
    // Promotion status
    hasPromotion: product.promotion?.enabled && product.promotion.discountPercentage > 0,
    
    // Button text from promotional header or default
    buttonText: product.promotionalHeader?.buttonText || 'Get Started Today',
    buttonPrice: product.promotionalHeader?.buttonPrice || `at ₹${product.price}`
  };

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
        {/* Promotional Header Section - Exact Design from Image */}
        {product.promotionalHeader?.enabled && (
          <section className="w-full">
            {/* Top Red Banner with Timer */}
            <div className="bg-red-600 py-3 px-4">
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-xl">⚠️</span>
                  <div className="text-center md:text-left">
                    <p className="text-sm md:text-base font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.topBannerText || 'ATTENTION! PRICES GOES UP AGAIN WHEN TIMER HITS 0!'}
                    </p>
                    {product.promotionalHeader.topBannerSubtext && (
                      <p className="text-xs md:text-sm">{product.promotionalHeader.topBannerSubtext}</p>
                    )}
                  </div>
                </div>
                
                {/* Timer */}
                <div className="flex items-center gap-3">
                  <PromotionalHeaderTimer endDate={pricing.timerEndDate} />
                  
                  {/* Green Button */}
                  <button className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors">
                    {pricing.buttonText} {pricing.buttonPrice}
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area - Beige Background */}
            <div className="bg-[#FAF0E6] py-12 md:py-16 px-4">
              {/* Back Button - Very Left */}
              <div className="mb-6">
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="bg-white/80 hover:bg-white border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm ml-4"
                >
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="font-medium">Back to Home</span>
                  </Link>
                </Button>
              </div>
              
              <div className="container mx-auto max-w-6xl">

                {/* Logo/Brand (if needed) */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.name}
                    </span>
                    <span className="text-yellow-500 text-2xl">✓</span>
                  </div>
                </div>

                {/* Green Button Text */}
                {product.promotionalHeader.buttonText && (
                  <div className="text-center mb-8">
                    <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold shadow-lg transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.buttonText}
                    </button>
                  </div>
                )}

                {/* Multi-Color Headlines */}
                <div className="text-center space-y-4 mb-8">
                  {/* Orange Headline Part 1 */}
                  {product.promotionalHeader.headlinePart1 && (
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-orange-500 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.headlinePart1}
                    </h1>
                  )}

                  {/* Teal/Green Headline Part 2 */}
                  {product.promotionalHeader.headlinePart2 && (
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-teal-600 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.headlinePart2}
                    </h2>
                  )}

                  {/* Dark Subheading */}
                  {product.promotionalHeader.subHeading && (
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.subHeading}
                    </h3>
                  )}

                  {/* Platform Description */}
                  {product.promotionalHeader.platformText && (
                    <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.promotionalHeader.platformText}
                    </p>
                  )}
                </div>

                {/* Yellow Highlight Box */}
                {product.promotionalHeader.highlightText && (
                  <div className="text-center mt-8">
                    <div className="inline-block relative">
                      <div className="absolute inset-0 bg-yellow-300 transform -skew-x-2"></div>
                      <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-black text-black px-8 py-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {product.promotionalHeader.highlightText}
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Business Section - Uses Product Title & Discount */}
        <section className="bg-white py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Start Your <span className="text-red-500">{product.name}</span> Business Today! Beginner-Friendly<br />
              & 100% Ready-Made Projects
            </h1>
            
            <div className="flex justify-center">
              {pricing.hasPromotion ? (
                <button className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ✨ MEGA SALE IS ON! {pricing.discountPercentage}% OFF
                </button>
              ) : (
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  🚀 GET STARTED TODAY!
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Header Section - Only show if no promotional header */}
        {!product.promotionalHeader?.enabled && (
          <section className="w-full bg-gradient-to-br from-rose-50 to-pink-50 py-16 px-4">
            {/* Back Button - Very Left */}
            <div className="mb-8">
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="bg-white/80 hover:bg-white border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm ml-4"
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="font-medium">Back to Home</span>
                </Link>
              </Button>
            </div>
            
            <div className="container mx-auto max-w-6xl">

              <div className="text-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  Start Your <span className="text-rose-500">{product.name}</span> Business Today! Beginner-Friendly & 100% Ready-Made Projects
              </h1>
              {pricing.hasPromotion && (
                  <div className="inline-block bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full mb-6 shadow-lg animate-pulse" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Zap className="inline-block w-4 h-4 mr-2" /> MEGA SALE IS ON! {pricing.discountPercentage}% OFF
                  </div>
              )}
              </div>
            </div>
          </section>
        )}
            
        {/* Image Gallery */}
        <section className="w-full bg-gradient-to-br from-pink-50 via-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap justify-center items-end gap-3 md:gap-5 lg:gap-6">
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
          </div>
        </section>
            
        {/* Hello Section */}
        <section className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    👋 Hello, Creative Businesses!
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    Earn ₹35,000 - ₹45,000/week from home! 💰🏠
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    🎉 Start your creative business with Premiere Templates Ultimate Template + Videos Bundle 📦 - no costly software, no long training.
                </p>
          </div>
        </section>

        {/* Purchase Section with Countdown */}
        {pricing.hasPromotion && (
          <section className="w-full bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4">
            <div className="container mx-auto max-w-6xl text-center">
                  <div className="my-6">
                      <CountdownTimer 
                        endDate={pricing.timerEndDate} 
                        discountPercentage={pricing.discountPercentage}
                      />
                  </div>
            </div>
          </section>
        )}

        {/* Client-side interactive components */}
        <section className="w-full bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <ProductDetailClient 
              product={product} 
              pricing={{
                currentPrice: pricing.currentPrice,
                originalPrice: pricing.originalPrice,
                discountPercentage: pricing.discountPercentage,
                hasPromotion: pricing.hasPromotion
              }}
            />
          </div>
        </section>

        {/* What You Get Section */}
        <section className="w-full bg-gradient-to-br from-green-50 to-emerald-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
                <h2 className="text-center text-4xl mb-8 text-gray-800 dark:text-gray-100" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    What You Get Inside <span className="text-blue-600 underline decoration-2 underline-offset-4">This ₹{pricing.currentPrice.toFixed(0)} Pack</span>
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
          </div>
        </section>

        {/* Compatibility Section */}
        {product.compatibility && (
          <section className="w-full bg-gradient-to-br from-gray-50 to-slate-50 py-16 px-4">
            <div className="container mx-auto max-w-6xl">
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
            </div>
          </section>
        )}

        {/* Limited Time Offer Section */}
        <section className="w-full bg-gradient-to-br from-orange-50 to-red-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
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

                    {/* Product Benefits Section */}
                    {product.productBenefits?.enabled && product.productBenefits.benefits.length > 0 && (
                        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                            <div className="container mx-auto max-w-6xl">
                                {/* Title Section */}
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {product.productBenefits.mainTitle}
                                    </h2>
                                    {product.productBenefits.subtitle && (
                                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                                            {product.productBenefits.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Benefits Grid - 2 columns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {product.productBenefits.benefits.map((benefit, index) => (
                                        <div 
                                            key={index}
                                            className="flex gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                                        >
                                            {/* Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 flex items-center justify-center text-3xl">
                                                    {benefit.icon}
                                                </div>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Decorative Divider */}
                                <div className="mt-12 flex items-center justify-center">
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent w-full max-w-2xl"></div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Countdown Timer */}
                    {pricing.hasPromotion && (
                        <div className="my-8">
                            <CountdownTimer 
                                endDate={pricing.timerEndDate} 
                                discountPercentage={pricing.discountPercentage}
                            />
                        </div>
                    )}

                    {/* Price Info */}
                    <div className="text-center mb-8">
                        <p className="text-lg md:text-xl text-red-600 dark:text-red-400 font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Price Returns to ₹{pricing.originalPrice.toFixed(0)} Tomorrow – Enroll Now at ₹{pricing.currentPrice.toFixed(0)}!
                        </p>
                        <div className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Only ₹{pricing.currentPrice.toFixed(0)}
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
          </div>
        </section>

        {/* WhatsApp Success Stories / Testimonials Section */}
        <section className="w-full bg-gradient-to-br from-green-50 to-emerald-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Success Stories/ <span className="text-green-600">Testimonials</span>
              </h2>
              <p className="text-lg text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Real customers sharing their success with {product.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* WhatsApp Chat 1 - Real WhatsApp Style */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {/* WhatsApp Header - Exact Style */}
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <button className="text-white">←</button>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">Aman Singh</p>
                    <p className="text-xs text-gray-200">online</p>
                  </div>
                  <div className="flex gap-4 text-white">
                    <span>📞</span>
                    <span>📹</span>
                    <span>⋮</span>
                  </div>
                </div>
                
                {/* Chat Area - Real WhatsApp Background */}
                <div className="bg-[#E5DDD5] p-4 space-y-3 min-h-[350px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M24.37 16c.2.65.39 1.32.54 2H21.17l1.17-2h2.03zm9.78 0l-.69 2H29.5l.69-2h3.96zm2.96 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'  }}>
                  
                  {/* Date Bubble */}
                  <div className="flex justify-center">
                    <div className="bg-white/80 px-3 py-1 rounded-full shadow-sm">
                      <p className="text-xs text-gray-600">4 February 2025</p>
                    </div>
                  </div>
                  
                  {/* Encryption Notice - System Message */}
                  <div className="flex justify-center">
                    <div className="bg-[#FFFBF0] border border-[#F7E98E] px-3 py-2 rounded-lg max-w-[280px] shadow-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-600 text-sm">🔒</span>
                        <p className="text-xs text-gray-700 leading-relaxed">Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Message Bubbles */}
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Hello sir</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">8:45 AM</span>
                      </div>
                      {/* WhatsApp Tail */}
                      <div className="absolute -bottom-0 -left-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-white border-t-8 border-t-white"></div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Invoice send kijiye sir</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">8:52 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Business Reply - Right Side */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      {/* PDF Document */}
                      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📄</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Invoice-250240203296540.pdf</p>
                            <p className="text-xs text-gray-500">1 page • 106 kB • PDF</p>
                          </div>
                          <button className="text-gray-400">⬇</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs text-gray-600">8:56 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      {/* WhatsApp Tail */}
                      <div className="absolute -bottom-0 -right-2 w-0 h-0 border-l-8 border-l-[#DCF8C6] border-r-8 border-r-transparent border-t-8 border-t-[#DCF8C6]"></div>
                    </div>
                  </div>

                  {/* Thank You Card - Business Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                        <h3 className="font-bold text-sm mb-2">🎉 Thank You For Placing Order!</h3>
                        <p className="text-xs opacity-90">500+ {product.category.toUpperCase()}</p>
                        <p className="text-xs opacity-90">PROJECTS OF 2024.pdf</p>
                        <p className="text-xs mt-2 opacity-75">1 page • 17 kB • PDF</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-gray-600">9:01 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* WhatsApp Input Area */}
                <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-500">😊</span>
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">Type a message</div>
                  <span className="text-gray-500">📎</span>
                  <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎤</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 2 - Audio Messages Real Style */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <button className="text-white">←</button>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">R</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">Rohit Sharma</p>
                    <p className="text-xs text-gray-200">last seen today at 1:20 PM</p>
                  </div>
                  <div className="flex gap-4 text-white">
                    <span>📞</span>
                    <span>📹</span>
                    <span>⋮</span>
                  </div>
                </div>
                
                <div className="bg-[#E5DDD5] p-4 space-y-3 min-h-[350px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M24.37 16c.2.65.39 1.32.54 2H21.17l1.17-2h2.03zm9.78 0l-.69 2H29.5l.69-2h3.96zm2.96 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'  }}>
                  
                  {/* Audio Message - Business Side */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">▶</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                          </div>
                          <p className="text-xs text-gray-600">0:05</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-600">1:14 PM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -right-2 w-0 h-0 border-l-8 border-l-[#DCF8C6] border-r-8 border-r-transparent border-t-8 border-t-[#DCF8C6]"></div>
                    </div>
                  </div>

                  {/* Customer Messages */}
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Check karke batata hun sir</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">1:19 PM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -left-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-white border-t-8 border-t-white"></div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Ok</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">1:19 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Business Thank You Card */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                        <h3 className="font-bold text-sm mb-2">🎉 Thank You For Placing Order!</h3>
                        <p className="text-xs opacity-90">500+ {product.category.toUpperCase()}</p>
                        <p className="text-xs opacity-90">PROJECTS OF 2024.pdf</p>
                        <p className="text-xs mt-2 opacity-75">1 page • 17 kB • PDF</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-gray-600">2:57 PM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-500">😊</span>
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">Type a message</div>
                  <span className="text-gray-500">📎</span>
                  <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎤</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 3 - Real WhatsApp Style */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <button className="text-white">←</button>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">S</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">Suresh Patel</p>
                    <p className="text-xs text-gray-200">last seen today at 7:15 AM</p>
                  </div>
                  <div className="flex gap-4 text-white">
                    <span>📞</span>
                    <span>📹</span>
                    <span>⋮</span>
                  </div>
                </div>
                
                <div className="bg-[#E5DDD5] p-4 space-y-3 min-h-[350px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M24.37 16c.2.65.39 1.32.54 2H21.17l1.17-2h2.03zm9.78 0l-.69 2H29.5l.69-2h3.96zm2.96 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'  }}>
                  
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Yes</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">7:08 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -left-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-white border-t-8 border-t-white"></div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Invoice send kijiye sir</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">7:09 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Email per bill aaya hoga</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">7:09 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📄</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Invoice-250208011506iEIV.pdf</p>
                            <p className="text-xs text-gray-500">1 page • 107 kB • PDF</p>
                          </div>
                          <button className="text-gray-400">⬇</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs text-gray-600">7:10 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -right-2 w-0 h-0 border-l-8 border-l-[#DCF8C6] border-r-8 border-r-transparent border-t-8 border-t-[#DCF8C6]"></div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                        <h3 className="font-bold text-sm mb-2">🎉 Thank You For Placing Order!</h3>
                        <p className="text-xs opacity-90">500+ {product.category.toUpperCase()}</p>
                        <p className="text-xs opacity-90">PROJECTS OF 2024.pdf</p>
                        <p className="text-xs mt-2 opacity-75">1 page • 17 kB • PDF</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-gray-600">7:10 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-500">😊</span>
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">Type a message</div>
                  <span className="text-gray-500">📎</span>
                  <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎤</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 4 - Real WhatsApp Style */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <button className="text-white">←</button>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">Manish Kumar</p>
                    <p className="text-xs text-gray-200">online</p>
                  </div>
                  <div className="flex gap-4 text-white">
                    <span>📞</span>
                    <span>📹</span>
                    <span>⋮</span>
                  </div>
                </div>
                
                <div className="bg-[#E5DDD5] p-4 space-y-3 min-h-[350px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M24.37 16c.2.65.39 1.32.54 2H21.17l1.17-2h2.03zm9.78 0l-.69 2H29.5l.69-2h3.96zm2.96 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04zm2.95 0l-.69 2h-2.04l.69-2h2.04z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'  }}>
                  
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Ok</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">11:37 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -left-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-white border-t-8 border-t-white"></div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm max-w-[250px] relative">
                      <p className="text-sm text-gray-900">Jo email per aaya tha</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-500">11:37 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📄</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Invoice-250131055468XVXK.pdf</p>
                            <p className="text-xs text-gray-500">1 page • 17 kB • PDF</p>
                          </div>
                          <button className="text-gray-400">⬇</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs text-gray-600">11:38 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                      <div className="absolute -bottom-0 -right-2 w-0 h-0 border-l-8 border-l-[#DCF8C6] border-r-8 border-r-transparent border-t-8 border-t-[#DCF8C6]"></div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] px-3 py-2 rounded-lg rounded-br-sm shadow-sm max-w-[250px] relative">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
                        <h3 className="font-bold text-sm mb-2">🎉 Thank You For Placing Order!</h3>
                        <p className="text-xs opacity-90">500+ {product.category.toUpperCase()}</p>
                        <p className="text-xs opacity-90">PROJECTS OF 2024.pdf</p>
                        <p className="text-xs mt-2 opacity-75">1 page • 17 kB • PDF</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-gray-600">11:38 AM</span>
                        <span className="text-blue-500 text-xs">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-3">
                  <span className="text-gray-500">😊</span>
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">Type a message</div>
                  <span className="text-gray-500">📎</span>
                  <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - 4 More Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* WhatsApp Chat 5 - Tutorial Request */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="bg-green-600 text-white p-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">V</div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Vikash Gupta</p>
                    <p className="text-xs opacity-90">+91 ●●●●● ●●076</p>
                  </div>
                  <div className="text-xs opacity-90">6:09</div>
                </div>
                
                <div className="p-3 space-y-2 bg-gray-50 min-h-[320px]">
                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">Sir maine kr lia h purchase</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">1:54 pm <span className="text-blue-500">✓✓</span></div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">where can I find the tutorial video</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">1:54 pm <span className="text-blue-500">✓✓</span></div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                      <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">📄</div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">Invoice-250240811130COL.pdf</p>
                        <p className="text-xs text-gray-500">1 page • 107 kB • PDF</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">1:55 pm</div>
                  </div>

                  <div className="bg-orange-500 text-white p-3 rounded-lg text-center text-xs">
                    <h3 className="font-bold mb-1">Thank You For Placing</h3>
                    <p>500+ {product.category.toUpperCase()}</p>
                    <p>PROJECTS OF 2024.pdf</p>
                    <p className="mt-1">1 page • 17 kB • PDF</p>
                    <div className="mt-1 flex items-center justify-center gap-1">1:56 am ✓✓</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 6 - Payment Confirmation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="bg-green-600 text-white p-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">P</div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Pradeep Singh</p>
                    <p className="text-xs opacity-90">+91 ●●●●● ●●065</p>
                  </div>
                  <div className="text-xs opacity-90">6:19</div>
                </div>
                
                <div className="p-3 space-y-2 bg-gray-50 min-h-[320px]">
                  {/* Transaction Success Screen */}
                  <div className="bg-purple-600 text-white p-3 rounded-lg text-center text-xs">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">✓</span>
                      </div>
                    </div>
                    <h3 className="font-bold mb-1">Transaction Successful</h3>
                    <p className="text-xs">₹394 has been paid</p>
                    <div className="mt-2 text-xs">
                      <p>Paid to</p>
                      <p className="font-bold">COSMOFEED TECHNOLOGIES...</p>
                      <p>Paytm • 7303919@paytm</p>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">Hello sir</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">8:01 am <span className="text-blue-500">✓✓</span></div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">Invoice send kijye sir</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">8:01 am <span className="text-blue-500">✓✓</span></div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 7 - Thank You Response */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="bg-green-600 text-white p-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Ajay Verma</p>
                    <p className="text-xs opacity-90">+91 ●●●●● ●●054</p>
                  </div>
                  <div className="text-xs opacity-90">2:07</div>
                </div>
                
                <div className="p-3 space-y-2 bg-gray-50 min-h-[320px]">
                  <div className="bg-orange-500 text-white p-3 rounded-lg text-center text-xs">
                    <h3 className="font-bold mb-1">Thank You For Placing</h3>
                    <p>500+ {product.category.toUpperCase()}</p>
                    <p>PROJECTS OF 2024.pdf</p>
                    <p className="mt-1">1 page • 17 kB • PDF</p>
                    <div className="mt-1 flex items-center justify-center gap-1">8:44 am ✓✓</div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">Thank you</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">9:23 am <span className="text-blue-500">✓✓</span></div>
                  </div>

                  <div className="bg-orange-500 text-white p-3 rounded-lg text-center text-xs">
                    <h3 className="font-bold mb-1">Thank You For Placing</h3>
                    <p>WEDDING BUNDLE 2024.pdf</p>
                    <p className="mt-1">1 page • 17 kB • PDF</p>
                    <div className="mt-1 flex items-center justify-center gap-1">8:44 am ✓✓</div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">Thank you 🙏</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">2:07 pm <span className="text-blue-500">✓✓</span></div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat 8 - Sharing Appreciation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="bg-green-600 text-white p-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs">D</div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Deepak Jain</p>
                    <p className="text-xs opacity-90">+91 ●●●●● ●●043</p>
                  </div>
                  <div className="text-xs opacity-90">2:10</div>
                </div>
                
                <div className="p-3 space-y-2 bg-gray-50 min-h-[320px]">
                  <div className="bg-orange-500 text-white p-3 rounded-lg text-center text-xs">
                    <h3 className="font-bold mb-1">Thank You For Placing</h3>
                    <p>500+ {product.category.toUpperCase()}</p>
                    <p>PROJECTS OF 2024.pdf</p>
                    <p className="mt-1">1 page • 17 kB • PDF</p>
                    <div className="mt-1 flex items-center justify-center gap-1">9:01 am ✓✓</div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">thanks for sharing</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">2:10 pm <span className="text-blue-500">✓✓</span></div>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%] text-xs">
                    <p className="text-gray-800">😊</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">2:10 pm <span className="text-blue-500">✓✓</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Icon */}
            <div className="fixed bottom-6 right-6 z-50">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors cursor-pointer">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section with Round Badge */}
        <section className="w-full bg-gradient-to-br from-green-50 to-teal-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
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
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <ProductReviews productId={product._id.toString()} />
          </div>
        </section>
    </div>
  );
}
    