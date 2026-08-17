import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const ReduceWordDocSize = () => {
  const content = (
    <div className="space-y-8">
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
        <p className="text-lg font-medium">A Word document with 10 pages of text should be around 50–100KB. If yours is 10MB, 30MB, or 80MB — something hidden inside the file is causing it. This guide exposes exactly what and shows you 7 methods to fix it.</p>
      </div>
      <h2 className="text-2xl font-bold">What Is Actually Inside a Bloated Word Document?</h2>
      <p>A .docx file is a ZIP archive. Word packages everything — text, images, fonts, styles, metadata — into a compressed container. The problem is Word stores things at full quality by default.</p>
      <h3 className="text-xl font-semibold">1. High-Resolution Embedded Images (Biggest Cause)</h3>
      <p>When you paste a photo into Word, it embeds the full original image at full resolution — even if it appears as a tiny thumbnail. Ten inserted photos = potentially 60MB of hidden image data.</p>
      <h3 className="text-xl font-semibold">2. Tracked Changes and Revision History</h3>
      <p>Every tracked change is stored as hidden data. A document through 30 rounds of editing accumulates megabytes of invisible revision history.</p>
      <h3 className="text-xl font-semibold">3. Embedded Excel Charts</h3>
      <p>Charts from Excel store a complete copy of the Excel workbook inside the Word file. A simple bar chart might carry a 5MB spreadsheet.</p>
      <h3 className="text-xl font-semibold">4. Embedded Fonts for Compatibility</h3>
      <p>Custom fonts with embed enabled store full font data. Each embedded font adds 500KB to several MB.</p>
      <h2 className="text-2xl font-bold">Method 1: Compress with CompressNFly (Fastest — 30 Seconds)</h2>
      <p>CompressNFly compresses DOCX files in your browser. No uploads, no software, no account needed. It unpacks the internal ZIP, recompresses embedded images, then repacks — the result opens identically in Word, Google Docs, and LibreOffice.</p>
      <ol className="list-decimal list-inside space-y-2 pl-4">
        <li>Go to <strong>compressnfly.com</strong></li>
        <li>Drag your .docx file in</li>
        <li>Choose <strong>Balanced</strong> compression</li>
        <li>Click <strong>Compress File</strong></li>
        <li>Download the compressed file</li>
      </ol>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm mt-4">
          <thead><tr className="border-b"><th className="text-left py-3 pr-4 font-semibold">Document Type</th><th className="text-left py-3 pr-4 font-semibold">Original</th><th className="text-left py-3 font-semibold">Compressed</th></tr></thead>
          <tbody className="divide-y">
            <tr><td className="py-3 pr-4">Report with 10 photos</td><td className="py-3 pr-4">65 MB</td><td className="py-3 text-green-600 font-medium">9 MB</td></tr>
            <tr><td className="py-3 pr-4">Contract with tracked changes</td><td className="py-3 pr-4">18 MB</td><td className="py-3 text-green-600 font-medium">3.5 MB</td></tr>
            <tr><td className="py-3 pr-4">Presentation-style DOCX</td><td className="py-3 pr-4">42 MB</td><td className="py-3 text-green-600 font-medium">7 MB</td></tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold">Method 2: Compress Images Inside Word</h2>
      <p><strong>Windows:</strong> Click image → Picture Format → Compress Pictures → uncheck "Apply only to this picture" → select Email (96 ppi) → OK → Save</p>
      <p><strong>Mac:</strong> Click image → Format → Reduce File Size → apply to all → OK → Save</p>
      <h2 className="text-2xl font-bold">Method 3: Accept All Tracked Changes</h2>
      <p>Review tab → Accept → Accept All Changes → Delete → Delete All Comments → File → Info → Inspect Document → remove hidden data → Save</p>
      <h2 className="text-2xl font-bold">Method 4: Save as a Fresh File</h2>
      <p>File → Save As → new filename → Save. This strips accumulated temporary data and internal artifacts.</p>
      <h2 className="text-2xl font-bold">Method 5: Convert Charts to Images</h2>
      <p>Right-click chart → Copy → delete original → Home → Paste Special → Picture PNG. Chart looks identical but stored as lightweight image instead of full Excel workbook.</p>
      <h2 className="text-2xl font-bold">Method 6: Compress Images Before Inserting</h2>
      <p>Compress images at <strong>compressnfly.com</strong> first, then insert the compressed images into Word. Your document stays small from the start.</p>
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "Will compressing affect text formatting?", a: "No. All text, fonts, tables, headers, and structure are preserved exactly. Only embedded image resolution is reduced — invisibly." },
          { q: "Can I compress DOCX without Microsoft Word?", a: "Yes. CompressNFly compresses DOCX in your browser — no Word required." },
          { q: "Why is my document large with very little text?", a: "Almost certainly embedded images stored at full resolution internally despite appearing small on the page." },
          { q: "Will the compressed file open in Google Docs?", a: "Yes. Fully compatible with all word processors that support .docx format." },
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
      <BlogPost title="How to Reduce Word Document File Size — 7 Methods That Actually Work" content={content} category="Tutorial" readTime="9 min read" date="2026-05-05" author="CompressNFly Team" />
    </div>
  );
};
export default ReduceWordDocSize;
