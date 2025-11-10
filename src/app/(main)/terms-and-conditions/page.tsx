import { Metadata } from 'next';
import { FileText, CheckCircle, AlertCircle, Scale, Ban } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - DigiAddaWorld',
  description: 'Read our terms and conditions for using DigiAddaWorld services and purchasing digital products.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to DigiAddaWorld. By accessing and using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before making any purchase or using our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            </div>
            <p className="text-muted-foreground">
              By creating an account, making a purchase, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          {/* Digital Products */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Digital Products & Licenses</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Product Delivery</h3>
                <p>All products sold on DigiAddaWorld are digital products. Upon successful payment, you will receive:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Immediate access to download your purchased products</li>
                  <li>Email confirmation with download links</li>
                  <li>Access to your order history in your account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">License Terms</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Personal use license is granted for individual use only</li>
                  <li>Commercial licenses allow use in client projects (where specified)</li>
                  <li>Redistribution or resale of products is strictly prohibited</li>
                  <li>You may not claim authorship of the products</li>
                  <li>License is non-transferable and non-exclusive</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share your account with others</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>All prices are listed in Indian Rupees (₹) unless otherwise stated.</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Payment must be made in full before product delivery</li>
                <li>We accept major credit cards, debit cards, and digital payment methods</li>
                <li>Prices are subject to change without notice</li>
                <li>Promotional prices are valid for the specified period only</li>
                <li>All sales are final unless covered by our refund policy</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-destructive" />
              <h2 className="text-2xl font-bold">Prohibited Uses</h2>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p>You may not use our services to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or harmful code</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass or harm other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Resell or redistribute our products</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
            <p className="text-muted-foreground">
              All content on DigiAddaWorld, including but not limited to text, graphics, logos, images, and software, is the property of DigiAddaWorld or its content suppliers and is protected by international copyright laws. The compilation of all content is the exclusive property of DigiAddaWorld.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Disclaimers</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied.</p>
              <p>We do not guarantee that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Our services will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>Our website is free of viruses or harmful components</li>
                <li>Results from using our products will meet your requirements</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, DigiAddaWorld shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms and Conditions. Upon termination, your right to use our services will immediately cease.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these Terms and Conditions at any time. Material changes will be notified via email or a prominent notice on our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-secondary/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> legal@digiaddaworld.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Creative Lane, Suite 100, DigiCity, Internet 54321</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
