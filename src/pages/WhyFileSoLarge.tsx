import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const WhyFileSoLarge = () => {
  const content = (
    <div className="space-y-8">
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <p className="text-lg font-medium">A 10-page Word document showing 75MB. A simple invoice PDF at 22MB. A phone photo at 14MB. Your attachment got rejected — again. The cause is almost always hidden. This guide exposes exactly what is going on and how to fix it in 30 seconds.</p>
      </div>
      <h2 className="text-2xl font-bold">Why Is My PDF So Large?</h2>
      <h3 className="text-xl font-semibold">Scanned Pages Are Actually Photos</h3>
      <p>Your scanner photographs each page at 300 DPI. A 50-page contract = 50–150MB. For screen viewing, 72–96 DPI is all you need. Compress with CompressNFly Balanced setting for 80–90% reduction.</p>
      <h3 className="text-xl font-semibold">It Was Exported for Print, Not Screens</h3>
      <p>A 300 DPI brochure with 15 photos = 200MB. The same document for screen = 5MB. No visible difference on any monitor. Solution: re-export using Web quality, or compress the existing file with CompressNFly.</p>
      <h3 className="text-xl font-semibold">It Has Grown With Every Edit</h3>
      <p>Some software keeps old content instead of replacing it on each re-save. Old text, deleted pages, earlier versions all lurk invisibly. CompressNFly strips all this accumulated overhead.</p>
      <h2 className="text-2xl font-bold">Why Is My Photo So Large?</h2>
      <h3 className="text-xl font-semibold">Your Camera Captures More Than Any Screen Can Show</h3>
      <p>A 12MP photo is 4032x3024 pixels. A laptop screen is 1920x1080. Your photo has 4x more pixels than any screen can display. Compress with CompressNFly: a 12MP photo at 8MB drops to under 800KB, looking identical on every screen.</p>
      <h3 className="text-xl font-semibold">PNG Files Store Every Pixel Uncompressed</h3>
      <p>PNG is lossless — every pixel stored at full quality. A screenshot can be 5–15MB when a compressed version would be under 500KB with no visible difference.</p>
      <h2 className="text-2xl font-bold">Why Is My Word Document So Large?</h2>
      <h3 className="text-xl font-semibold">Photos Stored at Full Resolution</h3>
      <p>Word embeds photos at full original resolution even if they appear tiny on the page. Ten inserted photos = potentially 60MB of hidden image data.</p>
      <h3 className="text-xl font-semibold">Tracked Changes Never Disappear</h3>
      <p>Every insertion, deletion, and formatting change from every reviewer is recorded invisibly. Fix: Review tab → Accept All Changes, then run Document Inspector.</p>
      <h2 className="text-2xl font-bold">Quick Reference — Fix Any File in 30 Seconds</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left py-3 pr-4 font-semibold">Your File</th><th className="text-left py-3 pr-4 font-semibold">Most Likely Cause</th><th className="text-left py-3 font-semibold">Best Fix</th></tr></thead>
          <tbody className="divide-y">
            <tr><td className="py-3 pr-4">PDF from scanner</td><td className="py-3 pr-4">Pages are high-res photos</td><td className="py-3">CompressNFly → Balanced</td></tr>
            <tr><td className="py-3 pr-4">PDF from design software</td><td className="py-3 pr-4">Print-quality export</td><td className="py-3">CompressNFly → Web Optimized</td></tr>
            <tr><td className="py-3 pr-4">Word doc with photos</td><td className="py-3 pr-4">Full-res embedded images</td><td className="py-3">CompressNFly → Balanced</td></tr>
            <tr><td className="py-3 pr-4">Phone photo</td><td className="py-3 pr-4">Max camera resolution</td><td className="py-3">CompressNFly → Balanced</td></tr>
            <tr><td className="py-3 pr-4">PNG screenshot</td><td className="py-3 pr-4">Uncompressed lossless format</td><td className="py-3">CompressNFly → Balanced</td></tr>
            <tr><td className="py-3 pr-4">PowerPoint with videos</td><td className="py-3 pr-4">Embedded video files</td><td className="py-3">Remove videos then CompressNFly</td></tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold">The Universal Fix — CompressNFly</h2>
      <ol className="list-decimal list-inside space-y-2 pl-4">
        <li>Go to <strong>compressnfly.com</strong></li>
        <li>Drag your file in — PDF, image, DOCX, PPTX, ZIP, 30+ formats</li>
        <li>Choose <strong>Balanced</strong> compression</li>
        <li>Click <strong>Compress File</strong></li>
        <li>Download — 70–90% smaller</li>
      </ol>
      <p>Everything runs in your browser. Your files never leave your device.</p>
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How do I make a file small enough to email?", a: "Use CompressNFly. For files still too large after compression, share via Google Drive using a link instead of attachment." },
          { q: "Will compressing reduce document quality?", a: "At Balanced compression, quality change is invisible at normal viewing sizes. Text is completely unaffected." },
          { q: "Is it safe for confidential documents?", a: "Yes. Files never leave your device — nothing is uploaded anywhere." },
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
      <BlogPost title="Why Is My File So Large? (And How to Fix It in 30 Seconds)" content={content} category="Guide" readTime="8 min read" date="2026-05-05" author="CompressNFly Team" />
    </div>
  );
};
export default WhyFileSoLarge;
