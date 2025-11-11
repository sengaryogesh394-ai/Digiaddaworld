'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Loader2,
  Sparkles,
  Image as ImageIcon,
  X,
  PlusCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [images, setImages] = useState<Array<{ url: string; hint: string }>>([]);
  const [imageInput, setImageInput] = useState({ url: '', hint: '' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    excerpt: '',
    tags: '',
    featuredImage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutoGenerate = async () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a title first',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch('/api/blog/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: formData.title }),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          ...formData,
          content: data.data.content,
          excerpt: data.data.excerpt,
          tags: data.data.tags.join(', '),
          featuredImage: formData.featuredImage, // Keep existing or empty
        });
        
        toast({
          title: 'Success',
          description: 'Content generated successfully! Review and edit as needed.',
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate content',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateImages = async () => {
    if (!formData.title || !formData.excerpt) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in title and excerpt first',
        variant: 'destructive'
      });
      return;
    }

    setAiGenerating(true);
    try {
      const response = await fetch('/api/products/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'images',
          productName: formData.title,
          category: 'Blog Post',
          description: formData.excerpt,
          count: 4
        })
      });

      const result = await response.json();

      if (result.success) {
        const newImages = result.data.images.map((img: any) => ({
          url: img.url,
          hint: img.hint
        }));
        
        setImages(prev => [...prev, ...newImages]);
        
        // Set first image as featured if none selected
        if (!formData.featuredImage && newImages.length > 0) {
          setFormData(prev => ({ ...prev, featuredImage: newImages[0].url }));
        }
        
        toast({
          title: '🎨 Images Generated!',
          description: `${newImages.length} AI-powered images added`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: 'Image Generation Failed',
        description: error.message || 'Failed to generate images',
        variant: 'destructive'
      });
    } finally {
      setAiGenerating(false);
    }
  };

  const addImage = () => {
    if (!imageInput.url) {
      toast({
        title: 'Error',
        description: 'Please enter an image URL',
        variant: 'destructive'
      });
      return;
    }
    setImages([...images, { url: imageInput.url, hint: imageInput.hint }]);
    setImageInput({ url: '', hint: '' });
    
    // Set as featured if first image
    if (images.length === 0) {
      setFormData({ ...formData, featuredImage: imageInput.url });
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    
    // Update featured image if removed
    if (formData.featuredImage === images[index].url) {
      setFormData({ ...formData, featuredImage: newImages[0]?.url || '' });
    }
  };

  const setFeaturedImage = (url: string) => {
    setFormData({ ...formData, featuredImage: url });
    toast({
      title: 'Featured Image Set',
      description: 'This image will be used as the blog post cover'
    });
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Error',
        description: 'Title and content are required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status,
          images: images.length > 0 ? images : undefined,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
        });
        router.push('/admin/blog');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/blog">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          New Blog Post
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSubmit('draft')}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save as Draft
          </Button>
          <Button 
            size="sm"
            onClick={() => handleSubmit('published')}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Publish
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Create Blog Post</CardTitle>
                  <CardDescription>
                    Write an engaging article for your audience
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title *</Label>
              <div className="flex gap-2">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full"
                  placeholder="Your post title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAutoGenerate}
                  disabled={generating || !formData.title.trim()}
                  className="shrink-0"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Auto-Generate
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a title and click Auto-Generate to create content using AI
              </p>
            </div>
            
                <div className="grid gap-3">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Brief summary that will appear in preview cards..."
                    className="min-h-[100px] resize-none"
                    value={formData.excerpt}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">2-3 sentences describing your post</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your amazing content here... You can use markdown formatting."
                    className="min-h-[500px] font-mono text-sm"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Supports markdown formatting</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      type="text"
                      placeholder="Author name"
                      value={formData.author}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="tech, tutorial, news"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Featured Image Preview */}
          {formData.featuredImage && (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-lg">Featured Image</CardTitle>
                <CardDescription>Blog post cover image</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  {formData.featuredImage.startsWith('data:') ? (
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={formData.featuredImage}
                      alt="Featured"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Management */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Blog Images</CardTitle>
                  <CardDescription>Add or generate images</CardDescription>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={generateImages}
                  disabled={aiGenerating || !formData.title || !formData.excerpt}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {aiGenerating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Generate with AI</>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add Manual Image */}
                <div className="space-y-3">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageInput.url}
                    onChange={(e) => setImageInput({ ...imageInput, url: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Image description (optional)"
                    value={imageInput.hint}
                    onChange={(e) => setImageInput({ ...imageInput, hint: e.target.value })}
                  />
                  <Button
                    type="button"
                    onClick={addImage}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>

                {/* Image Gallery */}
                {images.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added Images ({images.length})</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group border rounded-lg p-2">
                          <div className="relative aspect-video w-full overflow-hidden rounded">
                            {image.url.startsWith('data:') ? (
                              <img
                                src={image.url}
                                alt={image.hint}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Image
                                src={image.url}
                                alt={image.hint}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="absolute top-1 right-1 flex gap-1">
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={() => setFeaturedImage(image.url)}
                              title="Set as featured"
                            >
                              <ImageIcon className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs mt-1 truncate">{image.hint || 'No description'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="flex items-center gap-2 mt-4 md:hidden">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSubmit('draft')}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save as Draft
        </Button>
        <Button 
          className="flex-1"
          onClick={() => handleSubmit('published')}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Publish
        </Button>
      </div>
    </div>
  );
}
