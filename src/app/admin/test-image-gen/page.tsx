'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function TestImageGenPage() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<{ url: string; hint: string }>>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!productName || !category || !description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await fetch('/api/products/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'images',
          productName,
          category,
          description,
          count: 4
        })
      });

      const result = await response.json();

      if (result.success) {
        setImages(result.data.images);
      } else {
        setError(result.error || 'Failed to generate images');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎨 Test Image Generation</h1>
        <p className="text-muted-foreground">
          Test Hugging Face + Pollinations AI image generation
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Enter product information to generate AI images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                placeholder="e.g., Video Editing Course"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Courses & E-books"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="e.g., Learn professional video editing with Adobe Premiere Pro..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Images...
                </>
              ) : (
                '🎨 Generate 4 Images'
              )}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Info */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>AI image generation flow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold">Create Prompts</p>
                  <p className="text-sm text-muted-foreground">
                    4 detailed prompts generated from your input
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold">Try Hugging Face</p>
                  <p className="text-sm text-muted-foreground">
                    Stable Diffusion 2 if API key is available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold">Fallback to Pollinations</p>
                  <p className="text-sm text-muted-foreground">
                    Free API if Hugging Face fails
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold">Display Results</p>
                  <p className="text-sm text-muted-foreground">
                    4 AI-generated product images
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>API Keys:</strong> HUGGING_FACE_API_KEY or HUGGINGFACE_API_KEY
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Models:</strong> Stable Diffusion 2, Pollinations AI
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Images */}
      {images.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Images ({images.length})</CardTitle>
            <CardDescription>
              AI-generated product showcase images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    {image.url.startsWith('data:') ? (
                      // Base64 image from Hugging Face
                      <img
                        src={image.url}
                        alt={image.hint}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // URL from Pollinations
                      <Image
                        src={image.url}
                        alt={image.hint}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">Image {index + 1}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {image.hint}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Source:</strong>{' '}
                      {image.url.startsWith('data:') ? (
                        <span className="text-green-600 dark:text-green-400">
                          Hugging Face (Base64)
                        </span>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400">
                          Pollinations (URL)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card className="mt-6">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="text-center">
                <p className="font-semibold">Generating Images...</p>
                <p className="text-sm text-muted-foreground">
                  This may take 30-60 seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
