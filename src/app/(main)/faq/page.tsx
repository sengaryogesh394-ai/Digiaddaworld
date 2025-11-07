import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  
  const faqItems = [
    {
      question: 'What types of digital products do you sell?',
      answer:
        'We offer a wide range of digital products, including software, e-books, online courses, design templates, content bundles, AI-powered tools, and much more. Our marketplace is constantly growing as new creators join our platform.',
    },
    {
      question: 'How will I receive my digital products after purchase?',
      answer:
        'Immediately after your payment is confirmed, you will receive an email with a secure download link to access your purchased products. You can also access your downloads at any time from your account dashboard.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'Due to the nature of digital products, all sales are generally final. However, we offer a 30-day money-back guarantee if the product is defective, not as described, or if you can demonstrate that you have not been able to make it work. Please contact our support team for assistance.',
    },
    {
      question: 'Are the products available for commercial use?',
      answer:
        'Most of our products come with a commercial license, which allows you to use them in your personal and commercial projects. However, licenses can vary by product. Please check the specific product page for detailed licensing information before purchasing.',
    },
    {
        question: 'Do I need special software to use the products?',
        answer: 'Compatibility requirements vary by product. For example, templates might require Adobe Photoshop, Canva, or Microsoft Office. We clearly list all software requirements on each product page. Many of our products, like e-books (PDF) or video courses, require no special software beyond a standard web browser or PDF reader.'
    },
    {
        question: 'Can I sell my own digital products on DigiAddaWorld?',
        answer: 'Absolutely! We are always looking for talented creators to join our community. Please visit our "Become a Seller" page to learn more about the benefits and to sign up. We provide all the tools you need to start selling and earning.'
    },
  ];
  
  export default function FaqPage() {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-headline font-bold">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </header>
  
        <Card className="shadow-lg">
            <CardContent className="p-6 md:p-10">
                <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pt-2">
                        {item.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    );
  }