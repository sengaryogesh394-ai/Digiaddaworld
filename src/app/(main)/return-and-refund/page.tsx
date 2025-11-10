import { Metadata } from 'next';
import { RotateCcw, Clock, CheckCircle2, XCircle, Mail, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Refund Policy - DigiAddaWorld',
  description: 'Learn about our return and refund policy for digital products at DigiAddaWorld.',
};

export default function ReturnAndRefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <RotateCcw className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Return & Refund Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DigiAddaWorld, we strive to ensure your complete satisfaction with our digital products. This Return & Refund Policy outlines the conditions under which refunds may be issued for purchases made on our platform.
            </p>
          </section>

          {/* 30-Day Money-Back Guarantee */}
          <section className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border-2 border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold">30-Day Money-Back Guarantee</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We offer a <strong className="text-foreground">30-day money-back guarantee</strong> on all our digital products. If you're not satisfied with your purchase, you can request a full refund within 30 days of your purchase date.
            </p>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">This guarantee covers:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Products that don't match their description</li>
                <li>Technical issues that prevent product use</li>
                <li>Missing files or incomplete downloads</li>
                <li>Products that don't work as advertised</li>
              </ul>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Refund Eligibility</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  You ARE eligible for a refund if:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                  <li>The product is significantly different from its description</li>
                  <li>The product contains technical errors that prevent its use</li>
                  <li>Files are corrupted or incomplete</li>
                  <li>You received the wrong product</li>
                  <li>The product doesn't work with the specified software/platform</li>
                  <li>You request a refund within 30 days of purchase</li>
                </ul>
              </div>

              <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  You are NOT eligible for a refund if:
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                  <li>You changed your mind after downloading the product</li>
                  <li>You purchased the wrong product by mistake (after download)</li>
                  <li>You lack the technical skills to use the product</li>
                  <li>The refund request is made after 30 days</li>
                  <li>You violated our Terms & Conditions</li>
                  <li>You've already used the product in a commercial project</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Request a Refund */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">How to Request a Refund</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal list-inside ml-4 space-y-3">
                <li className="font-semibold text-foreground">
                  Contact Our Support Team
                  <p className="font-normal text-muted-foreground mt-1 ml-6">
                    Email us at <a href="mailto:refunds@digiaddaworld.com" className="text-primary hover:underline">refunds@digiaddaworld.com</a> with your order number and reason for the refund request.
                  </p>
                </li>
                <li className="font-semibold text-foreground">
                  Provide Order Details
                  <p className="font-normal text-muted-foreground mt-1 ml-6">
                    Include your order number, purchase date, and the email address used for the purchase.
                  </p>
                </li>
                <li className="font-semibold text-foreground">
                  Explain the Issue
                  <p className="font-normal text-muted-foreground mt-1 ml-6">
                    Clearly describe why you're requesting a refund. Screenshots or additional details help us process your request faster.
                  </p>
                </li>
                <li className="font-semibold text-foreground">
                  Wait for Review
                  <p className="font-normal text-muted-foreground mt-1 ml-6">
                    Our team will review your request within 2-3 business days and respond with a decision.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          {/* Refund Processing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Processing Time</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Once your refund is approved:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong className="text-foreground">Processing:</strong> Refunds are processed within 3-5 business days
                </li>
                <li>
                  <strong className="text-foreground">Credit/Debit Cards:</strong> May take 5-10 business days to appear in your account
                </li>
                <li>
                  <strong className="text-foreground">Digital Wallets:</strong> Usually instant to 2 business days
                </li>
                <li>
                  <strong className="text-foreground">Bank Transfers:</strong> May take 7-14 business days
                </li>
              </ul>
              <p className="mt-4">
                You will receive an email confirmation once your refund has been processed. The refund will be issued to the original payment method used for the purchase.
              </p>
            </div>
          </section>

          {/* Partial Refunds */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Partial Refunds</h2>
            <p className="text-muted-foreground">
              In some cases, we may offer partial refunds if:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
              <li>Only part of a bundle is defective</li>
              <li>You've used some but not all features of a product</li>
              <li>The issue is minor and can be partially compensated</li>
            </ul>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
            <p className="text-muted-foreground">
              We don't offer direct product exchanges. If you purchased the wrong product, you can:
            </p>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
              <li>Request a refund for the incorrect product (if eligible)</li>
              <li>Purchase the correct product separately</li>
            </ol>
            <p className="text-muted-foreground mt-3">
              Note: Exchanges are only possible if you haven't downloaded the incorrect product.
            </p>
          </section>

          {/* Important Notes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Important Notes</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong className="text-foreground">Download Access:</strong> Once a refund is issued, your access to the product will be revoked
                </li>
                <li>
                  <strong className="text-foreground">License Termination:</strong> Any license granted for the product will be terminated upon refund
                </li>
                <li>
                  <strong className="text-foreground">One-Time Courtesy:</strong> Repeated refund requests may be declined
                </li>
                <li>
                  <strong className="text-foreground">Promotional Purchases:</strong> Products purchased during sales are subject to the same refund policy
                </li>
              </ul>
            </div>
          </section>

          {/* Contact for Refunds */}
          <section className="bg-secondary/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our refund policy or need assistance with a refund request:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Refund Email:</strong> <a href="mailto:refunds@digiaddaworld.com" className="text-primary hover:underline">refunds@digiaddaworld.com</a></p>
              <p><strong>Support Email:</strong> <a href="mailto:support@digiaddaworld.com" className="text-primary hover:underline">support@digiaddaworld.com</a></p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (IST)</p>
            </div>
          </section>

          {/* Satisfaction Guarantee */}
          <section className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground">
              We stand behind the quality of our products. Our 30-day money-back guarantee ensures that you can shop with confidence. If you're not completely satisfied, we'll make it right. Your satisfaction is our priority!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
