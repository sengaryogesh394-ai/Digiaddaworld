import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');

  return (
    <div>
      <section className="relative h-[40vh] bg-secondary">
        {aboutImage && (
             <Image
             src={aboutImage.imageUrl}
             alt="Team working together"
             fill
             className="object-cover"
             data-ai-hint={aboutImage.imageHint}
           />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-5xl font-headline text-white text-center">About Digiaddaworld</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-8">
            <h2 className="text-4xl font-headline text-center">Our Mission</h2>
            <p className="text-center text-muted-foreground">
              At Digiaddaworld, our mission is to empower creators and artists from around the globe by providing a platform to share their digital creations with the world. We believe that creativity knows no bounds, and we are dedicated to building a vibrant marketplace where talent can thrive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div>
                <h3 className="text-2xl font-headline mb-2">For Creators</h3>
                <p className="text-muted-foreground">
                  We provide the tools and support you need to turn your passion into a profession. From easy-to-use product uploaders to secure payment processing, we handle the logistics so you can focus on what you do best: creating.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-headline mb-2">For Customers</h3>
                <p className="text-muted-foreground">
                  Discover a treasure trove of unique digital products. Whether you're a designer looking for assets, a musician in need of sounds, or a reader searching for your next favorite e-book, you'll find high-quality content from talented individuals.
                </p>
              </div>
            </div>

            <p className="text-center pt-8">
              Join us on our journey to build a more creative and connected world.
            </p>
        </div>
      </div>
    </div>
  );
}
