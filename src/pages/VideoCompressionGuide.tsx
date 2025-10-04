import Header from '@/components/Header';
import BlogPost from '@/components/BlogPost';

const VideoCompressionGuide = () => {
  const content = (
    <>
      <h2 className="text-3xl font-bold mb-6">Understanding Video Compression</h2>
      <p className="mb-6">
        Video compression is essential for sharing, streaming, and storing video content efficiently. 
        With the right techniques, you can significantly reduce file sizes while maintaining excellent 
        visual quality that meets your specific needs.
      </p>

      <h2 className="text-3xl font-bold mb-6">Key Factors Affecting Video File Size</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Resolution</h3>
      <p className="mb-4">
        Resolution directly impacts file size. Consider your audience and platform requirements:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>4K (3840×2160):</strong> Best for professional content and large displays</li>
        <li><strong>1080p (1920×1080):</strong> Standard for most online platforms</li>
        <li><strong>720p (1280×720):</strong> Good for mobile viewing and faster loading</li>
        <li><strong>480p (854×480):</strong> Suitable for previews and low-bandwidth situations</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Frame Rate</h3>
      <p className="mb-6">
        Higher frame rates create smoother motion but increase file size. Choose based on content type:
        24fps for cinematic content, 30fps for standard video, 60fps for gaming or sports content.
      </p>

      <h3 className="text-2xl font-semibold mb-4">Bitrate</h3>
      <p className="mb-6">
        Bitrate determines quality and file size. Higher bitrates mean better quality but larger files. 
        Use variable bitrate (VBR) for optimal quality-to-size ratio.
      </p>

      <h2 className="text-3xl font-bold mb-6">Best Compression Techniques</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Choose the Right Codec</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>H.264 (AVC):</strong> Most compatible, excellent for web and mobile</li>
        <li><strong>H.265 (HEVC):</strong> Better compression, ideal for 4K content</li>
        <li><strong>VP9:</strong> Google's codec, great for YouTube and web streaming</li>
        <li><strong>AV1:</strong> Next-generation codec with superior compression</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Optimize Settings</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Use two-pass encoding for better quality at same file size</li>
        <li>Set appropriate keyframe intervals (2-4 seconds)</li>
        <li>Remove unnecessary audio tracks and subtitles</li>
        <li>Crop black bars and unnecessary content</li>
      </ul>

      <h2 className="text-3xl font-bold mb-6">Platform-Specific Guidelines</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Social Media</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>Instagram:</strong> Square (1:1) or vertical (9:16), max 60 seconds</li>
        <li><strong>YouTube:</strong> 1080p minimum, H.264 codec, AAC audio</li>
        <li><strong>TikTok:</strong> Vertical (9:16), 15-60 seconds, high engagement formats</li>
        <li><strong>Facebook:</strong> Various ratios, auto-play optimized</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Professional Use</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>Presentations:</strong> 720p-1080p, screen recording optimized</li>
        <li><strong>Training Videos:</strong> Clear audio priority, moderate compression</li>
        <li><strong>Marketing:</strong> High quality for brand image, optimized for web</li>
        <li><strong>Archive:</strong> Lossless or minimal compression for preservation</li>
      </ul>

      <h2 className="text-3xl font-bold mb-6">Advanced Tips</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Pre-Processing</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Denoise footage before compression</li>
        <li>Color correct and grade before final export</li>
        <li>Stabilize shaky footage to improve compression efficiency</li>
        <li>Remove duplicate or unnecessary frames</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Audio Optimization</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Use AAC codec for best compatibility</li>
        <li>128-192 kbps for most content</li>
        <li>Consider mono for speech-only content</li>
        <li>Remove silent portions to reduce file size</li>
      </ul>

      <h2 className="text-3xl font-bold mb-6">Quality Control</h2>
      <p className="mb-6">
        Always preview your compressed videos before final delivery. Check for artifacts, 
        audio sync issues, and overall quality. Use Compressnfly's advanced video compression 
        to achieve optimal results with minimal effort.
      </p>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8">
        <BlogPost 
          title="Video Compression Best Practices"
          content={content}
          category="Tutorial"
          readTime="7 min read"
          date="2024-01-05"
          author="Compressnfly Team"
        />
      </main>
    </div>
  );
};

export default VideoCompressionGuide;