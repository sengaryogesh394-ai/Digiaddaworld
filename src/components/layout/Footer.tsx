import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Sparkles } from 'lucide-react';

const sections = [
  {
    title: 'Shop',
    links: [
      { name: 'Electronics', href: '/shop?category=electronics' },
      { name: 'Home & Kitchen', href: '/shop?category=home-kitchen' },
      { name: 'Apparel', href: '/shop?category=apparel' },
      { name: 'Books', href: '/shop?category=books' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Admin', href: '/admin' },
    ],
  },
];

const socialLinks = [
  { icon: <Instagram className="size-5" />, href: '#', label: 'Instagram' },
  { icon: <Facebook className="size-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="size-5" />, href: '#', label: 'Twitter' },
];

const legalLinks = [
  { name: 'Terms and Conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href="/" className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-headline font-semibold">Digiaddaworld</h2>
              </Link>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              Your marketplace for amazing products.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">&copy; {year} Digiaddaworld. All rights reserved.</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
