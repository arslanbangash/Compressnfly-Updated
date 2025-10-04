import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  title: string;
  content: React.ReactNode;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

const BlogPost = ({ title, content, category, readTime, date, author }: BlogPostProps) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {author}
          </div>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>
      </div>
      
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </div>
      
      {/* Call to Action */}
      <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/10 text-center">
        <Link to="/">
          <Button size="lg" className="inline-flex items-center gap-2">
            Try Compressnfly Now
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;