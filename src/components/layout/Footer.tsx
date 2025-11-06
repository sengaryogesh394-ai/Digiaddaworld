import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const sections = [
  {
    title: 'Information',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '#' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { name: 'My Account', href: '/login' },
      { name: 'Order History', href: '/cart' },
      { name: 'Shopping Cart', href: '/cart' },
      { name: 'Newsletter', href: '#' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { name: 'Software & Tools', href: '/shop?category=software-and-tools' },
      { name: 'Courses & E-books', href: '/shop?category=courses-and-ebooks' },
      { name: 'Templates', href: '/shop?category=templates' },
      { name: 'Content Bundles', href: '/shop?category=content-bundles' },
    ],
  },
];

const socialLinks = [
  { icon: <Instagram className="size-5" />, href: '#', label: 'Instagram' },
  { icon: <Facebook className="size-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="size-5" />, href: '#', label: 'Twitter' },
  { icon: <Youtube className="size-5" />, href: '#', label: 'Youtube' },
  { icon: <Linkedin className="size-5" />, href: '#', label: 'Linkedin' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">DigiAddaWorld</h2>
            <p className="text-muted-foreground mb-4 max-w-sm">
              The ultimate destination for premium digital products, courses, and templates.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, idx) => (
                <Button key={idx} variant="outline" size="icon" asChild>
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {year} DigiAddaWorld. All rights reserved.</p>
            <p>Designed by You.</p>
        </div>
      </div>
    </footer>
  );
};
