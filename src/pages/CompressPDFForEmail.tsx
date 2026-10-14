import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const CompressPDFForEmail = () => {
  const content = (
    <div className="space-y-8">

      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <p className="text-lg font-medium text-foreground">You attach your PDF, hit send, and the email bounces back: <strong>"Attachment too large."</strong> Now you're stuck — the file has to go out, but your email won't let it.</p>
        <p className="mt-3 text-muted-foreground">You can fix this in under a minute. Compress your PDF right here in your browser — free, no software, and nothing gets uploaded to anyone's server. Your file stays on your device the entire time, which matters when you're emailing contracts, invoices, or ID scans. <a href="/compress-pdf" className="text-primary font-medium underline">Compress your PDF now →</a></p>
      </div>

      <h2 className="text-2xl font-bold">What Are the Email Attachment Size Limits?</h2>
      <p>Before you compress, it helps to know the exact number you're trying to get under. Every email provider caps attachment size, and the limits are lower than most people expect:</p>

      <div className="space-y-2">
        <p><strong>Gmail:</strong> 25MB per email (total across all attachments). Go over, and Gmail quietly uploads your file to Google Drive and sends a link instead of a real attachment.</p>
        <p><strong>Outlook / Microsoft 365:</strong> 20MB for the desktop app. Corporate IT departments often lower this to 10MB or even 5MB.</p>
        <p><strong>Outlook.com (web):</strong> 25MB.</p>
        <p><strong>Yahoo Mail:</strong> 25MB.</p>
        <p><strong>Apple Mail (iCloud):</strong> 20MB via direct attachment.</p>
        <p><strong>HR portals and job boards:</strong> Often just 2–5MB per document.</p>
      </div>

      <p>The safest target is <strong>under 20MB</strong>. That keeps you clear of every major provider in one shot, instead of guessing which limit applies.</p>

      <h2 className="text-2xl font-bold">Why Your PDF Bounces Even When It Looks Under the Limit</h2>
      <p>Here's the frustrating one that trips almost everyone up. You check your PDF — it says 24MB on your computer, safely under Gmail's 25MB cap. You attach it. It <em>still</em> bounces.</p>
      <p>The reason: email doesn't send your file as-is. To travel over email, attachments get re-encoded into a text format called Base64, and that encoding adds roughly <strong>30% to the file size</strong> in transit. So a 24MB PDF on disk becomes about 31MB once your email client wraps it up — and now it's over the limit.</p>
      <p>This is exactly why "just barely under the limit" fails. The fix is simple: aim a few megabytes below the cap. If Gmail's limit is 25MB, compress your PDF to around 18–20MB and it'll sail through with room to spare.</p>

      <h2 className="text-2xl font-bold">Why PDFs Get Too Big in the First Place</h2>
      <p>PDFs balloon in size for a handful of predictable reasons — and knowing which one applies tells you how much you can shrink it:</p>

      <h3 className="text-xl font-semibold">Scanned pages</h3>
      <p>Scanners save each page as a high-resolution image, usually at 300 DPI. For reading on a screen you only need 72–96 DPI. A 50-page scanned contract can be 50–150MB — and compress down to 5–10MB with no visible difference on screen.</p>

      <h3 className="text-xl font-semibold">Embedded photos and graphics</h3>
      <p>A report or brochure packed with product photos carries all that image data at full print resolution. Compressed for screen viewing, it often drops by 80–90% while looking identical on any monitor.</p>

      <h3 className="text-xl font-semibold">Hidden bloat</h3>
      <p>Every time a PDF is re-saved, it can accumulate old revision history, unused fonts, and metadata you never see. This invisible baggage adds size without adding anything useful — and compression strips it out.</p>

      <h2 className="text-2xl font-bold">How to Compress a PDF for Email (Step by Step)</h2>
      <p>This takes about 30 seconds and works on any device with a browser — desktop or phone, no app required.</p>

      <div className="space-y-3">
        <p><strong>Step 1:</strong> Open the <a href="/compress-pdf" className="text-primary font-medium underline">CompressNFly compressor</a> in your browser.</p>
        <p><strong>Step 2:</strong> Drag your PDF onto the page, or click to select it. Your file stays on your device — it's never uploaded to a server.</p>
        <p><strong>Step 3:</strong> Choose a compression level. For email, "Balanced" or "Web Optimized" gives you the biggest size drop while keeping text sharp and readable.</p>
        <p><strong>Step 4:</strong> Download your compressed PDF. Check that the new size is comfortably under your email provider's limit (aim for 18–20MB for Gmail).</p>
        <p><strong>Step 5:</strong> Attach the compressed file to your email and send. It'll go through.</p>
      </div>

      <h2 className="text-2xl font-bold">What If Compression Isn't Enough?</h2>
      <p>Sometimes a file is just too big — a 300-page scanned document, or a graphics-heavy report that's still over the limit after compression. You have two good options:</p>

      <h3 className="text-xl font-semibold">Split the PDF into parts</h3>
      <p>Break the document into smaller sections and send them across two or three emails. It's not elegant, but it works for any size and the recipient can view each part on its own.</p>

      <h3 className="text-xl font-semibold">Send a link instead</h3>
      <p>For anything above about 50MB, stop fighting email limits and upload the file to Google Drive, Dropbox, or a similar service, then paste the share link into your email. The recipient downloads it on their own time and your message never bounces.</p>

      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <p className="text-lg font-medium text-foreground">Ready to get your PDF under the limit?</p>
        <p className="mt-2 text-muted-foreground">Compress it in seconds, right in your browser — free, private, and no sign-up. <a href="/compress-pdf" className="text-primary font-medium underline">Compress your PDF now →</a></p>
      </div>

      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How do I compress a PDF to send in Gmail?", a: "Open the CompressNFly compressor, drag your PDF in, pick the Balanced level, and download. Aim for under 20MB so it stays clear of Gmail's 25MB limit even after email encoding." },
          { q: "Why is my PDF too large to email even though it's under 25MB?", a: "Email re-encodes attachments in a format that adds about 30% to the size in transit. A 24MB file can become around 31MB when sent, pushing it over the limit. Compress to a few MB below the cap to be safe." },
          { q: "Will compressing my PDF ruin the quality?", a: "No. Compression targets screen resolution, which is far lower than print resolution. Text stays sharp and selectable, and images look identical on screen. The difference is only visible if you zoom far in or print at high quality." },
          { q: "Is it safe to compress confidential documents?", a: "With CompressNFly, yes. Compression happens entirely in your browser — your file never leaves your device or gets uploaded to a server. That's especially important for contracts, invoices, and ID scans." },
          { q: "Can I compress a PDF for email on my phone?", a: "Yes. CompressNFly works in any mobile browser on iOS and Android — no app to install. Compress the file and attach it straight from your phone." },
          { q: "What size should I compress my PDF to for email?", a: "Aim for under 20MB. That keeps you safely under Gmail, Outlook, and Yahoo limits at once, with headroom for the encoding overhead that email adds in transit." },
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
      <BlogPost ctaHref="/compress-pdf" ctaLabel="Compress Your PDF Now" title="How to Compress a PDF for Email — Fit Gmail's 25MB Limit (and Outlook's 20MB)" content={content} category="Tutorial" readTime="6 min read" date="2026-08-30" author="CompressNFly Team" />
    </div>
  );
};

export default CompressPDFForEmail;