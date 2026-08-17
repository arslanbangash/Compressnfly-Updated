import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const CompressImagesGuide = () => {
  const content = (
    <div className="space-y-8">
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <p className="text-lg font-medium">A single photo from a modern smartphone is 8–15MB. Upload 10 to your website and visitors wait 20 seconds for the page to load. Try to email them and the attachment gets rejected. The fix takes under 30 seconds.</p>
      </div>
      <h2 className="text-2xl font-bold">Why Are Image Files So Large?</h2>
      <h3 className="text-xl font-semibold">Modern Cameras Shoot at Extreme Resolutions</h3>
      <p>Smartphones shoot at 12–200 megapixels. At 12MP (4032x3024 pixels), a single photo is 4–8MB. A laptop screen displays at 1920x1080 — your photo has 4x more pixels than any screen can show. All that excess is invisible but very real in file size.</p>
      <h3 className="text-xl font-semibold">PNG Files Are Not Compressed by Default</h3>
      <p>PNG stores every pixel at full quality. A PNG screenshot can be 3–10MB when a properly compressed version would be under 500KB with no visible difference.</p>
      <h3 className="text-xl font-semibold">Retina Screenshots Are Double-Sized</h3>
      <p>Screenshots on Retina displays are captured at 2x resolution. A 1200x800 screenshot on screen is saved at 2400x1600 — 4x the expected file size.</p>
      <h2 className="text-2xl font-bold">How to Compress Images Using CompressNFly</h2>
      <p>CompressNFly supports JPG, PNG, WebP, GIF, BMP and all major image formats. Everything runs in your browser — your photos never leave your device.</p>
      <ol className="list-decimal list-inside space-y-3 pl-4">
        <li><strong>Go to compressnfly.com</strong></li>
        <li><strong>Drag your images</strong> into the upload area — multiple files supported</li>
        <li><strong>Choose compression level</strong> — Balanced recommended</li>
        <li><strong>Click Compress File</strong> — results appear instantly</li>
        <li><strong>Download</strong> your compressed images</li>
      </ol>
      <h2 className="text-2xl font-bold">Compression Levels</h2>
      <div className="space-y-3">
        <div className="border rounded-lg p-4"><h4 className="font-semibold">High Quality</h4><p className="text-sm text-muted-foreground">Product photography, portfolios, real estate — ~60–70% reduction. Example: 8MB → 2.4MB</p></div>
        <div className="border rounded-lg p-4"><h4 className="font-semibold">Web Optimized</h4><p className="text-sm text-muted-foreground">Hero images, blog posts, website banners — ~72–80% reduction. Example: 8MB → 1.6MB</p></div>
        <div className="border border-primary/30 bg-primary/5 rounded-lg p-4"><h4 className="font-semibold">Balanced ⭐ Recommended</h4><p className="text-sm text-muted-foreground">Email, social media, everyday sharing — ~80–88% reduction. Example: 8MB → 960KB</p></div>
        <div className="border rounded-lg p-4"><h4 className="font-semibold">Small Size</h4><p className="text-sm text-muted-foreground">Thumbnails, strict upload limits, bulk compression — ~88–94% reduction. Example: 8MB → 480KB</p></div>
      </div>
      <h2 className="text-2xl font-bold">Real-World Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left py-3 pr-4 font-semibold">Image Type</th><th className="text-left py-3 pr-4 font-semibold">Original</th><th className="text-left py-3 pr-4 font-semibold">Compressed</th><th className="text-left py-3 font-semibold">Reduction</th></tr></thead>
          <tbody className="divide-y">
            <tr><td className="py-3 pr-4">iPhone photo (12MP JPG)</td><td className="py-3 pr-4">9.2 MB</td><td className="py-3 pr-4">1.0 MB</td><td className="py-3 text-green-600 font-semibold">89%</td></tr>
            <tr><td className="py-3 pr-4">DSLR product photo</td><td className="py-3 pr-4">14 MB</td><td className="py-3 pr-4">1.6 MB</td><td className="py-3 text-green-600 font-semibold">89%</td></tr>
            <tr><td className="py-3 pr-4">MacBook Retina screenshot</td><td className="py-3 pr-4">4.5 MB</td><td className="py-3 pr-4">750 KB</td><td className="py-3 text-green-600 font-semibold">83%</td></tr>
            <tr><td className="py-3 pr-4">Website banner</td><td className="py-3 pr-4">3.8 MB</td><td className="py-3 pr-4">520 KB</td><td className="py-3 text-green-600 font-semibold">86%</td></tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold">Privacy — Your Photos Never Leave Your Device</h2>
      <p>CompressNFly processes every image entirely in your browser using WebAssembly technology. Your photos never leave your device — not when selected, not during compression, not at any point. Critical for personal photos, medical images, and sensitive business imagery.</p>
      <h2 className="text-2xl font-bold">Best Practices</h2>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li><strong>Always keep originals</strong> — compress copies, never originals</li>
        <li><strong>Resize before compressing</strong> — if an image displays at 800px, resize to 800px first then compress</li>
        <li><strong>Never compress already-compressed images</strong> — always start from the original</li>
        <li><strong>Compress before inserting into documents</strong> — keeps Word, PDF, and PowerPoint files small</li>
      </ul>
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "What image formats are supported?", a: "JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF — all major image formats." },
          { q: "Will compression change image dimensions?", a: "No. Compression reduces file size but never changes pixel dimensions." },
          { q: "Can I compress multiple images at once?", a: "Yes. Upload multiple images and download them all compressed in one batch." },
          { q: "How do I compress an image to under 200KB?", a: "Start with Balanced compression. If still above 200KB, try Small Size." },
        ].map((faq, i) => (
          <div key={i} className="bg-muted/30 rounded-lg p-4">
            <p className="font-semibold mb-1">{faq.q}</p>
            <p className="text-muted-foreground text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost title="How to Compress Images Online Without Losing Quality in 2026" content={content} category="Tutorial" readTime="11 min read" date="2026-05-05" author="CompressNFly Team" />
    </div>
  );
};
export default CompressImagesGuide;
