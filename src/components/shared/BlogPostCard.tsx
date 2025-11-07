
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col group transition-shadow duration-300 hover:shadow-2xl border border-border/50 bg-card">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.image.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={post.image.hint}
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground pt-2">By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{post.excerpt}</CardDescription>
        </CardContent>
        <div className="p-6 pt-0">
          <Button asChild variant="link" className="p-0 group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

    