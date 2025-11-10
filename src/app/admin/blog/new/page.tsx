'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Loader2,
  Sparkles,
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
    <div className="max-w-3xl mx-auto">
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
      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
          <CardDescription>
            Write your new article below.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of your post (optional)"
                className="min-h-[100px]"
                value={formData.excerpt}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Start writing your amazing content here..."
                className="min-h-[400px]"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Comma separated tags (e.g., tech, tutorial, news)"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.featuredImage}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
