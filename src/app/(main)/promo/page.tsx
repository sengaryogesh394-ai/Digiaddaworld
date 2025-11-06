'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, TriangleAlert, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CountdownTimer from '@/components/shared/CountdownTimer';

export default function PromoPage() {

    function getImage(id: string) {
        const image = PlaceHolderImages.find(img => img.id === id);
        return { id: image?.id || '', url: image?.imageUrl || '', hint: image?.imageHint || '' };
    }

  return (
    <div className="bg-rose-50/50 dark:bg-rose-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Header Section */}
        <section className="text-center">
            <div className="inline-block bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                🔥 MEGA SALE IS ON! 93% OFF
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
                Start Your <span className="text-rose-500">AI Wedding Invitation</span> Business Today!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-2">
                Beginner-Friendly & 100% Ready-Made Projects
            </p>
        </section>

        {/* Product Showcase 1 */}
        <section className="text-center">
            <Image 
                src={getImage('promo-wedding-1').url} 
                alt="AI Wedding Invitations Showcase" 
                width={800} 
                height={450} 
                className="mx-auto rounded-lg shadow-xl"
                data-ai-hint={getImage('promo-wedding-1').hint}
            />
            <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
                ⚡️ Hello, Creative Businesses! ⚡️
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                All in one wedding invitation bundle to start your creative business from scratch. No prior editing knowledge required.
            </p>
            <div className="my-6">
                <p className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                    <span className="text-3xl text-gray-400 line-through">₹6999</span>
                    <span className="text-rose-500 ml-4">₹497/-</span>
                </p>
            </div>
            <CountdownTimer />
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg mt-6 shadow-lg transform hover:scale-105 transition-transform">
                GRAB THIS OFFER NOW
            </Button>
        </section>

        {/* Product Showcase 2 */}
         <section className="text-center">
            <Image 
                src={getImage('promo-wedding-2').url} 
                alt="More Wedding Invitation Designs" 
                width={800} 
                height={450} 
                className="mx-auto rounded-lg shadow-xl"
                data-ai-hint={getImage('promo-wedding-2').hint}
            />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Includes wedding, ring ceremony, haldi, mehendi, sangeet and all other templates.
            </p>
             <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50">Understanding Everything in HINDI</Button>
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50">Click here for tutorial Videos</Button>
            </div>
        </section>

        {/* What You Get Section */}
        <section>
            <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                What You Get Inside This <span className="text-rose-500 underline">₹497 Pack</span>
            </h2>
            <Card className="max-w-3xl mx-auto bg-white dark:bg-card shadow-lg">
                <CardContent className="p-8 space-y-4">
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> 500+ Editable Wedding Invitation Videos (UHD - 4K)</li>
                        <li className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> 5000+ Wedding Invitation PSD Templates (Photoshop)</li>
                        <li className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> All "Save the date" & "Haldi Function" templates</li>
                        <li className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> Lifetime Validity - Instant Download Link</li>
                        <li className="flex items-center"><Check className="w-5 h-5 mr-3 text-green-500" /> No-Branding / No-Watermark on any content</li>
                    </ul>
                    <Button size="lg" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg mt-4">
                        RESERVE MY SPOT NOW
                    </Button>
                </CardContent>
            </Card>
        </section>
        
        {/* Peak Time Section */}
        <section className="max-w-3xl mx-auto">
            <Card className="bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-800 shadow-lg text-center p-8">
                 <div className="flex justify-center items-center gap-2">
                    <TriangleAlert className="w-8 h-8 text-amber-500" />
                    <h3 className="text-2xl font-bold text-lime-800 dark:text-lime-200">Wedding Season Peak Time Is NOW!</h3>
                </div>
                <p className="text-lime-700 dark:text-lime-300 mt-2">The next 3 months are the GOLDEN PERIOD for wedding invitations.</p>
                <div className="my-6">
                    <CountdownTimer />
                </div>
                <p className="text-xl text-gray-500 dark:text-gray-400">Price returns to ₹2,499 if you don't Book Today!</p>
                <p className="text-5xl font-bold text-gray-800 dark:text-gray-100 my-4">Only ₹497</p>
                <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300 w-fit mx-auto mb-6">
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> Premium Editable Templates</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> Instant File Download</li>
                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500"/> Lifetime Access</li>
                </ul>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <Image src="https://picsum.photos/seed/upi-logo/60/30" alt="UPI" width={60} height={30} />
                    <Image src="https://picsum.photos/seed/paytm-logo/80/30" alt="Paytm" width={80} height={30} />
                    <Image src="https://picsum.photos/seed/gpay-logo/80/30" alt="Google Pay" width={80} height={30} />
                </div>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg w-full">
                    GET INSTANT ACCESS NOW
                </Button>
            </Card>
        </section>

         {/* Guarantee Section */}
        <section className="text-center max-w-3xl mx-auto">
            <Image src={getImage('promo-guarantee').url} alt="30-Day Money-Back Guarantee" width={120} height={120} className="mx-auto" data-ai-hint={getImage('promo-guarantee').hint} />
            <h3 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">30-day Money-back Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">With 99.7% satisfaction rate from over 10k customers, we're confident you'll love it.</p>
             <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg w-full mt-6">
                GET INSTANT ACCESS NOW
            </Button>
        </section>

        {/* Testimonials Section */}
        <section>
            <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Success Stories / Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Image src={getImage('promo-testimonial-1').url} alt="Testimonial 1" width={400} height={600} className="rounded-lg shadow-md" data-ai-hint={getImage('promo-testimonial-1').hint} />
                <Image src={getImage('promo-testimonial-2').url} alt="Testimonial 2" width={400} height={600} className="rounded-lg shadow-md" data-ai-hint={getImage('promo-testimonial-2').hint} />
                <Image src={getImage('promo-testimonial-3').url} alt="Testimonial 3" width={400} height={600} className="rounded-lg shadow-md" data-ai-hint={getImage('promo-testimonial-3').hint} />
            </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
                 <Image src="https://picsum.photos/seed/razorpay/100/30" alt="Razorpay" width={100} height={30} />
                 <Image src="https://picsum.photos/seed/instamojo/100/30" alt="Instamojo" width={100} height={30} />
            </div>
             <p className="font-semibold text-gray-800 dark:text-gray-200">100% Secure Payment | Instant Access | Lifetime Deal</p>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Privacy Policy | Terms & Conditions | Shipping & Refund Policy | Contact Us</p>
        </section>

      </div>
    </div>
  );
}
