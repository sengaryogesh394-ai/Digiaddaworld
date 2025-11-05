'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-descriptions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Clipboard } from 'lucide-react';

const FormSchema = z.object({
  keywords: z.string().min(3, 'Please enter at least 3 characters.'),
});

type FormValues = z.infer<typeof FormSchema>;

export default function GeneratorForm() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setDescription('');
    
    try {
      const result = await generateProductDescription(data);
      if (result.description) {
        setDescription(result.description);
      } else {
        setError('Failed to generate a description. Please try again.');
      }
    } catch (e) {
      setError('An unexpected error occurred.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., minimalist, UI kit, figma, modern" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Description'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
      
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      
      {description && (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <FormLabel>Generated Description</FormLabel>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy
                </Button>
            </div>
            <Textarea value={description} readOnly className="min-h-[200px]" />
        </div>
      )}
    </div>
  );
}
