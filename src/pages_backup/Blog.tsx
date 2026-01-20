import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Reduce PDF File Size for Free: The Complete 2024 Guide",
      excerpt: "Learn the easiest way to compress PDF files online for free. Step-by-step guide with tips for students and professionals.",
      date: "2024-01-20",
      category: "Tutorial",
      readTime: "8 min read",
      link: "/blog/pdf-compression-guide"
    },
    {
      id: 2,
      title: "The Ultimate Guide to File Compression",
      excerpt: "Learn everything you need to know about compressing files efficiently while maintaining quality.",
      date: "2024-01-15",
      category: "Tutorial",
      readTime: "5 min read",
      link: "/blog/file-compression-guide"
    },
    {
      id: 3,
      title: "Why File Size Matters in 2025",
      excerpt: "Explore the importance of optimized file sizes for web performance and user experience.",
      date: "2024-01-10",
      category: "Insights",
      readTime: "3 min read",
      link: "/blog/file-size-importance"
    },
    {
      id: 4,
      title: "Video Compression Best Practices",
      excerpt: "Discover the latest techniques for compressing video files without losing quality.",
      date: "2024-01-05",
      category: "Tutorial",
      readTime: "7 min read",
      link: "/blog/video-compression-guide"
    },
    {
      id: 5,
      title: "Audio Compression Formats Explained",
      excerpt: "A comprehensive comparison of different audio compression formats and their use cases.",
      date: "2024-01-01",
      category: "Guide",
      readTime: "4 min read",
      link: "/blog/audio-compression-guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            ✨ Featured Blog Posts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Compressnfly Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest tips, tutorials, and insights about file compression
          </p>
        </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-elevated transition-all duration-300 border-border/10 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                   <Link 
                     to={post.link || '#'} 
                     className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-200"
                   >
                     Read more 
                     <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                   </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;