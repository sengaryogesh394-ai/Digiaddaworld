import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockBlogPosts } from '@/lib/mock-data';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="relative h-[50vh] flex items-center justify-center text-center text-white">
        <Image 
          src={post.image.url}
          alt={post.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={post.image.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-headline">{post.title}</h1>
            <p className="mt-4 text-lg">
                By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-3xl mx-auto dark:prose-invert">
          <p>{post.excerpt}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
          </p>
          <h2>A Deeper Dive</h2>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          </p>
          <p>
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
          </p>
        </div>
      </div>
    </article>
  );
}
