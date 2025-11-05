import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import GeneratorForm from './GeneratorForm';
  
export default function AiGeneratorPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">AI Product Description Generator</CardTitle>
                    <CardDescription>
                        Enter a few keywords about your product, and let our AI write a compelling description for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <GeneratorForm />
                </CardContent>
            </Card>
        </div>
    );
}
