import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BlogController } from '@/controllers/blogController';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  status: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

async function getBlogPost(slug: string): Promise<Blog | null> {
  try {
    const result = await BlogController.getBlogBySlug(slug);
    // Convert Mongoose document to plain object
    const blogData = JSON.parse(JSON.stringify(result.data));
    return blogData;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const defaultImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop';

  return (
    <article>
      <header className="relative h-[50vh] flex items-center justify-center text-center text-white">
        <Image 
          src={post.featuredImage || defaultImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold">{post.title}</h1>
            <p className="mt-4 text-lg">
                By {post.author} on {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-3xl mx-auto dark:prose-invert">
          {post.excerpt && (
            <p className="lead text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>
          )}
          <div 
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>
    </article>
  );
}
