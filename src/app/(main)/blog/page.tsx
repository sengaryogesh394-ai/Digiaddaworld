import { BlogPostCard } from '@/components/shared/BlogPostCard';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

interface BlogData {
  _id: string;
  title: string;
  content: string;
  author: string;
  status: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  images?: Array<{ url: string; hint: string }>;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

async function getPublishedBlogs(): Promise<BlogData[]> {
  try {
    await connectDB();
    
    const blogs = await Blog.find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(50)
      .select('-__v')
      .lean();
    
    // Convert Mongoose documents to plain objects
    const blogsData = JSON.parse(JSON.stringify(blogs));
    return blogsData;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          The DigiAddaWorld Blog
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Insights, tips, and stories for digital creators.
        </p>
      </header>
      
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => {
            // Safely get the image object
            const getImage = () => {
              if (post.featuredImage) {
                return {
                  id: post._id + '-featured',
                  url: post.featuredImage,
                  hint: post.title
                };
              }
              if (post.images && Array.isArray(post.images) && post.images.length > 0 && post.images[0]?.url) {
                return {
                  id: post._id + '-img-0',
                  url: post.images[0].url,
                  hint: post.images[0].hint || post.title
                };
              }
              return {
                id: post._id + '-default',
                url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
                hint: post.title
              };
            };

            return (
              <BlogPostCard 
                key={post._id} 
                post={{
                  id: post._id,
                  title: post.title,
                  slug: post.slug,
                  excerpt: post.excerpt || post.content.substring(0, 150) + '...',
                  content: post.content,
                  date: new Date(post.publishedAt || post.createdAt).toISOString(),
                  author: post.author,
                  image: getImage()
                }} 
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No blog posts published yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Check back soon for new content!</p>
        </div>
      )}
    </div>
  );
}
