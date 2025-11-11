import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export class BlogController {
  // Get all blogs with pagination and filtering
  static async getAllBlogs(request: NextRequest) {
    try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const status = searchParams.get('status');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const search = searchParams.get('search');
      const skip = (page - 1) * limit;

      const query: any = {};
      
      // Filter by status
      if (status) {
        query.status = status;
      }

      // Search in title and content
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Blog.countDocuments(query);

      return {
        success: true,
        data: blogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  }

  // Get single blog by ID
  static async getBlogById(id: string) {
    try {
      await connectDB();

      const blog = await Blog.findById(id);

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        data: blog,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  }

  // Get blog by slug
  static async getBlogBySlug(slug: string) {
    try {
      await connectDB();

      const blog = await Blog.findOne({ slug });

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        data: blog,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  }

  // Create new blog
  static async createBlog(data: {
    title: string;
    content: string;
    author?: string;
    status?: 'draft' | 'published';
    excerpt?: string;
    featuredImage?: string;
    images?: Array<{ url: string; hint: string }>;
    tags?: string[];
  }) {
    try {
      await connectDB();

      const { title, content, author, status, excerpt, featuredImage, images, tags } = data;

      if (!title || !content) {
        throw new Error('Title and content are required');
      }

      // Generate slug from title
      const baseSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      
      // Add timestamp to ensure uniqueness
      const timestamp = Date.now().toString(36);
      const slug = `${baseSlug}-${timestamp}`;

      const blog = await Blog.create({
        title,
        content,
        slug,
        author: author || 'Admin',
        status: status || 'draft',
        excerpt,
        featuredImage,
        images: images || [],
        tags,
      });

      return {
        success: true,
        data: blog,
        message: 'Blog post created successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create blog');
    }
  }

  // Update blog
  static async updateBlog(
    id: string,
    data: {
      title?: string;
      content?: string;
      author?: string;
      status?: 'draft' | 'published';
      excerpt?: string;
      featuredImage?: string;
      tags?: string[];
    }
  ) {
    try {
      await connectDB();

      // If title is being updated, regenerate slug
      let updateData: any = { ...data };
      if (data.title) {
        const baseSlug = data.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim();
        
        const timestamp = Date.now().toString(36);
        updateData.slug = `${baseSlug}-${timestamp}`;
      }

      const blog = await Blog.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        data: blog,
        message: 'Blog post updated successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update blog');
    }
  }

  // Delete blog
  static async deleteBlog(id: string) {
    try {
      await connectDB();

      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        message: 'Blog post deleted successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete blog');
    }
  }

  // Publish blog (change status from draft to published)
  static async publishBlog(id: string) {
    try {
      await connectDB();

      const blog = await Blog.findByIdAndUpdate(
        id,
        { status: 'published', publishedAt: new Date() },
        { new: true }
      );

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        data: blog,
        message: 'Blog post published successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to publish blog');
    }
  }

  // Unpublish blog (change status from published to draft)
  static async unpublishBlog(id: string) {
    try {
      await connectDB();

      const blog = await Blog.findByIdAndUpdate(
        id,
        { status: 'draft' },
        { new: true }
      );

      if (!blog) {
        throw new Error('Blog post not found');
      }

      return {
        success: true,
        data: blog,
        message: 'Blog post unpublished successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to unpublish blog');
    }
  }

  // Get published blogs only (for public view)
  static async getPublishedBlogs(request: NextRequest) {
    try {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const tag = searchParams.get('tag');
      const skip = (page - 1) * limit;

      const query: any = { status: 'published' };

      if (tag) {
        query.tags = tag;
      }

      const blogs = await Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();

      const total = await Blog.countDocuments(query);

      return {
        success: true,
        data: blogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch published blogs');
    }
  }

  // Get blog statistics
  static async getBlogStats() {
    try {
      await connectDB();

      const totalBlogs = await Blog.countDocuments();
      const publishedBlogs = await Blog.countDocuments({ status: 'published' });
      const draftBlogs = await Blog.countDocuments({ status: 'draft' });

      // Get all unique tags
      const allBlogs = await Blog.find({}, 'tags').lean();
      const allTags = allBlogs.reduce((acc: string[], blog: any) => {
        if (blog.tags) {
          return [...acc, ...blog.tags];
        }
        return acc;
      }, []);
      const uniqueTags = [...new Set(allTags)];

      return {
        success: true,
        data: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
          tags: uniqueTags.length,
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blog statistics');
    }
  }
}
