import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    { id: 12, title: "How to Get a Photo Under 20 KB, 50 KB or 100 KB for Online Forms", excerpt: "What each size limit looks like on a real phone photo, how to keep tiny photos sharp, and fixes for the upload errors forms throw at you.", date: "2026-11-02", category: "Tutorial", readTime: "7 min read", link: "/blog/photo-size-for-online-forms" },
    { id: 13, title: "HEIC vs JPG: Why Your iPhone Photos Won't Open (and 4 Ways to Fix It)", excerpt: "What HEIC is, where it breaks, and what happened when we converted real iPhone photos to JPG and PNG.", date: "2026-11-02", category: "Guide", readTime: "6 min read", link: "/blog/heic-vs-jpg" },
        { id: 11, title: "How to Compress a PDF for Email — Fit Gmail's 25MB Limit", excerpt: "PDF too big to email? Learn why attachments bounce even under 25MB, and compress yours to fit Gmail and Outlook in seconds — free, no upload.", date: "2026-08-30", category: "Tutorial", readTime: "6 min read", link: "/blog/compress-pdf-for-email" },
    {
      id: 1,
      title: "How to Reduce PDF File Size for Free: The Complete 2024 Guide",
      excerpt: "Learn the easiest way to compress PDF files online for free. Step-by-step guide with tips for students and professionals.",
      date: "2026-01-20",
      category: "Tutorial",
      readTime: "8 min read",
      link: "/blog/pdf-compression-guide"
    },
    { id: 2, title: "File Compression Explained: What Shrinks, What Doesn't, and Why", excerpt: "A CSV shrank 84%. A ZIP of photos shrank 0.2%. Lossless vs lossy compression, tested on real files, with the right method for each file type.", date: "2026-11-02", category: "Guide", readTime: "7 min read", link: "/blog/file-compression-guide" },
    { id: 3, title: "File Size Limits for Email, WhatsApp and Upload Forms", excerpt: "Gmail, Outlook, Yahoo and WhatsApp limits, why a 20 MB file can bounce from a 20 MB inbox, and the target sizes that work.", date: "2026-11-02", category: "Guide", readTime: "7 min read", link: "/blog/file-size-importance" },
    {
      id: 4,
      title: "Video Compression Best Practices",
      excerpt: "Discover the latest techniques for compressing video files without losing quality.",
      date: "2026-04-05",
      category: "Tutorial",
      readTime: "7 min read",
      link: "/blog/video-compression-guide"
    },
    {
      id: 5,
      title: "Audio Compression Formats Explained",
      excerpt: "A comprehensive comparison of different audio compression formats and their use cases.",
      date: "2026-05-01",
      category: "Guide",
      readTime: "4 min read",
      link: "/blog/audio-compression-guide"
    },
    { id: 6, title: "How to Compress a PDF Without Losing Quality (We Tested 3 Real PDFs)", excerpt: "A text PDF, a photo report and a scanned contract, compressed and measured. What stays sharp, and how small a scan can get and still be readable.", date: "2026-11-02", category: "Tutorial", readTime: "8 min read", link: "/blog/compress-pdf-without-losing-quality" },
    { id: 7, title: "How to Compress Images Without Losing Quality: Real Results From 3 Phone Photos", excerpt: "Three phone photos, every setting, exact sizes and dimensions — and which size to use for email, websites, printing and forms.", date: "2026-11-02", category: "Tutorial", readTime: "8 min read", link: "/blog/compress-images-online" },
    { id: 8, title: "How to Reduce Word Document File Size — 7 Methods That Actually Work", excerpt: "A 10-page Word document should be 100KB, not 80MB. Learn the 7 methods to find and fix the hidden bloat — including the 30-second fix that requires no software at all.", date: "2026-05-05", category: "Tutorial", readTime: "9 min read", link: "/blog/reduce-word-document-file-size" },
    { id: 9, title: "Why Is My File So Large? (And How to Fix It in 30 Seconds)", excerpt: "Your document looks normal but is 75MB. Your photo is 14MB. Your PDF won't attach. This guide exposes the hidden causes and gives you the instant fix for every file type.", date: "2026-05-05", category: "Guide", readTime: "8 min read", link: "/blog/why-is-my-file-so-large" },
    { id: 10, title: "Compress Files Online Free — No Signup, No Upload, No Limits (2026)", excerpt: "Compress PDFs, images, Word docs, Excel files and ZIPs — free, no account, no file uploads to any server, and no software to install.", date: "2026-05-05", category: "Guide", readTime: "10 min read", link: "/blog/compress-files-online-free" },
  ];
    return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">✨ Compression Tips & Guides</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Compressnfly Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Expert guides on compressing PDFs, images, Word documents, and more — free, private, and in seconds.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-elevated transition-all duration-300 border-border/10 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <Link to={post.link || '#'} className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-200">Read more <span className="group-hover:translate-x-1 transition-transform duration-200">→</span></Link>
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
