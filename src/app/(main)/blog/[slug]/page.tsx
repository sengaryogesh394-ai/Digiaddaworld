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
  images?: Array<{ url: string; hint: string }>;
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
    <article className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Header with Featured Image */}
      <header className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image 
          src={post.featuredImage || defaultImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Published
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm md:text-base mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <span className="text-white/60">•</span>
            <time className="text-white/80">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl border border-blue-100 dark:border-blue-900">
              <p className="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-ul:my-6 prose-ol:my-6">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Image Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Image Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                      {image.url.startsWith('data:') ? (
                        <img
                          src={image.url}
                          alt={image.hint || `Blog image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={image.url}
                          alt={image.hint || `Blog image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {image.hint && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">
                          {image.hint}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Share it with your network!
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors">
                  Share on Twitter
                </button>
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-full font-medium transition-colors">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
