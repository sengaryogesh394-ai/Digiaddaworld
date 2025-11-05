import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
            <h1 className="text-5xl font-headline">Get In Touch</h1>
            <p className="text-lg text-muted-foreground mt-2">We'd love to hear from you. Here's how you can reach us.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Your message..." />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <p className="text-muted-foreground">General Inquiries: hello@digiaddaworld.com</p>
                        <p className="text-muted-foreground">Support: support@digiaddaworld.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Phone</h3>
                        <p className="text-muted-foreground">For emergencies: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Office</h3>
                        <p className="text-muted-foreground">123 Creative Lane, Suite 100</p>
                        <p className="text-muted-foreground">DigiCity, Internet 54321</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
