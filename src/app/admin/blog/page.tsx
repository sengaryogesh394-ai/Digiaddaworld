'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Edit,
  Loader2,
  Trash2,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Blog {
  _id: string;
  title: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  excerpt?: string;
  slug: string;
}

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = searchQuery 
        ? `/api/blog?search=${encodeURIComponent(searchQuery)}`
        : '/api/blog';
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete blog post
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Blog post deleted successfully',
        });
        fetchBlogs(); // Refresh the list
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle publish status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const endpoint = currentStatus === 'published' ? 'unpublish' : 'publish';
      const response = await fetch(`/api/blog/${id}/${endpoint}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: `Blog post ${currentStatus === 'published' ? 'unpublished' : 'published'} successfully`,
        });
        fetchBlogs(); // Refresh the list
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update blog status',
        variant: 'destructive',
      });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Load blogs on mount and when search changes
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== undefined) {
        fetchBlogs();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Create and manage your blog articles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-64"
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/admin/blog/new">
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Post
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Blog Posts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Your Blog Posts</CardTitle>
            <CardDescription>
              Manage your articles and view their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-700">
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Author</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Status</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-slate-400" />
                      <p className="text-slate-500 mt-2">Loading blog posts...</p>
                    </TableCell>
                  </TableRow>
                ) : blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <p className="text-slate-500">No blog posts found.</p>
                      <Link href="/admin/blog/new">
                        <Button className="mt-4" variant="outline">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Create your first post
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog, index) => (
                    <motion.tr
                      key={blog._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    >
                      <TableCell className="font-medium max-w-md">
                        <div className="flex items-center gap-2">
                          <Edit className="h-4 w-4 text-slate-400" />
                          <div>
                            <div className="font-medium">{blog.title}</div>
                            {blog.excerpt && (
                              <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                                {blog.excerpt}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-slate-600 dark:text-slate-400">
                        {blog.author}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge 
                          className={
                            blog.status === 'published'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0'
                          }
                        >
                          {blog.status === 'published' ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-slate-600 dark:text-slate-400">
                        {formatDate(blog.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                aria-haspopup="true" 
                                size="icon" 
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={deletingId === blog._id}
                              >
                                {deletingId === blog._id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MoreHorizontal className="h-4 w-4" />
                                )}
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/blog/${blog.slug}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                View Post
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/blog/${blog._id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleToggleStatus(blog._id, blog.status)}
                            >
                              {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(blog._id, blog.title)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
