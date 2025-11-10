'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeft,
  Loader2,
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

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    excerpt: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
  });

  // Fetch blog post data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        const data = await response.json();

        if (data.success) {
          const blog = data.data;
          setFormData({
            title: blog.title,
            content: blog.content,
            author: blog.author,
            excerpt: blog.excerpt || '',
            tags: blog.tags ? blog.tags.join(', ') : '',
            featuredImage: blog.featuredImage || '',
            status: blog.status,
          });
        } else {
          throw new Error(data.error);
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch blog post',
          variant: 'destructive',
        });
        router.push('/admin/blog');
      } finally {
        setFetching(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
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
          description: `Blog post updated successfully`,
        });
        router.push('/admin/blog');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

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
          Edit Blog Post
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
            {formData.status === 'published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>
            Update your blog post details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title *</Label>
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
          {formData.status === 'published' ? 'Update' : 'Publish'}
        </Button>
      </div>
    </div>
  );
}
