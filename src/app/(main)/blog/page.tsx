import { BlogPostCard } from '@/components/shared/BlogPostCard';
import { mockBlogPosts } from '@/lib/mock-data';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-headline">The Digiaddaworld Blog</h1>
        <p className="text-lg text-muted-foreground mt-2">Insights, tips, and stories for digital creators.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
