import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '../ui/separator';

const sections = [
  {
    title: 'Information',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { name: 'My Account', href: '/login' },
      { name: 'Order History', href: '/cart' },
      { name: 'Shopping Cart', href: '/cart' },
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
    <footer className="bg-card text-card-foreground">
        <div className="bg-secondary/50">
            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold mb-4 text-primary">DigiAddaWorld</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-1 shrink-0" />
                            <p>123 Creative Lane, Suite 100, DigiCity, Internet 54321</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-1 shrink-0" />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 mt-1 shrink-0" />
                            <p>support@digiaddaworld.com</p>
                        </div>
                    </div>
                </div>
                {sections.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                    <h3 className="mb-4 font-semibold">{section.title}</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        {section.links.map((link, linkIdx) => (
                        <li key={linkIdx} className="hover:text-primary transition-colors">
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <Separator />
        <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {year} DigiAddaWorld. All rights reserved.</p>
            <div className="flex space-x-2 mt-4 md:mt-0">
              {socialLinks.map((social, idx) => (
                <Button key={idx} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
        </div>
    </footer>
  );
};