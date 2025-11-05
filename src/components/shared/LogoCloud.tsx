import Image from 'next/image';

const logosRow1 = [
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b0260837b2fca427427c58_nicolewalters-logo.webp', alt: 'Nicole Walters' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b02611a5aaf6f13638d793_lewishowes-logo.webp', alt: 'Lewis Howes' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b026284c70c1160b071c77_caitlin-bacher-logo.webp', alt: 'Caitlin Bacher' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64bdd40bf1a71b415d7c7a03_thespeakerlab-logo.webp', alt: 'The Speaker Lab' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64bdd3eea9b631252484aede_salt-strong-logo.webp', alt: 'Salt Strong' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/67cf1a529814aea8309693a3_Jenna%20Kutcher%20Logo%20-%20Black.png', alt: 'Jenna Kutcher' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/651c7d12f66f8a4d87ffbe87_konsciousketo-logo.webp', alt: 'Konscious Keto' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b02611a5aaf6f13638d793_lewishowes-logo.webp', alt: 'Lewis Howes' },
];

const logosRow2 = [
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/67cf1a6e7f839a670c598062_Top%20Speed%20Golf%20Logo%20-%20Black.png', alt: 'Top Speed Golf' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/658dbe7ae7844e205d4ea5d4_ajsmart-logo-black.png', alt: 'AJ&Smart' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64aae75233cb096febb2903e_logos-fullcirclemusic.webp', alt: 'Full Circle Music Logo' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b0266b9c9dbdfa44fb2492_preparedperformer-logo.webp', alt: 'Prepared Performer' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b0267baa02f4f58069d986_fuzzyyellowballs-logo.webp', alt: 'Fuzzy Yellow Balls' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/64b0263dc9e595381143fc99_spi-logo.webp', alt: 'SPI' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/67cf1a9e213f103ef3c739c2_Marie%20Forleo%20Logo%20-%20Black.png', alt: 'Marie Forleo' },
    { src: 'https://cdn.prod.website-files.com/64aae75233cb096febb28dc1/658dbe7a3f9215af47d8557c_basb-logo-black.png', alt: 'BASB' },
];

export function LogoCloud() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-sm uppercase text-muted-foreground tracking-wider mb-8">
          Trusted by the world’s best creators
        </h2>
        <div className="relative w-full overflow-hidden space-y-4">
          <div className="flex animate-scroll">
            {[...logosRow1, ...logosRow1].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-12" style={{ minWidth: '250px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={250}
                  height={60}
                  className="object-contain h-20 w-auto"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-scroll-reverse">
            {[...logosRow2, ...logosRow2].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-12" style={{ minWidth: '250px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={250}
                  height={60}
                  className="object-contain h-20 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
