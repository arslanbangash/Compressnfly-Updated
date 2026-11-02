import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import BlogPost from '@/components/BlogPost';

const PDFCompressionGuide = () => {
  const content = (
    <>
      <p>
        Every computer and phone can open a PDF, but very few can shrink one. Windows has no built-in PDF compressor at
        all, the Mac has one hidden in a menu, and phones leave you to find your own way. This guide goes device by
        device: what's built in, what it does well, where it falls short, and the method that works on all of them.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li><strong>Mac:</strong> Preview's "Reduce File Size" filter works, but it's aggressive and has no settings.</li>
          <li><strong>Windows:</strong> nothing built in. Fix the PDF at the source (Word) or use a browser tool.</li>
          <li><strong>iPhone and Android:</strong> nothing built in. A browser-based compressor works on both.</li>
        </ul>
      </div>

      <h2>First, check what kind of PDF you have</h2>
      <p>
        Divide the file size by the number of pages. This quick sum tells you which fix will work:
      </p>
      <ul>
        <li>
          <strong>Under about 50 KB per page:</strong> a text PDF. It's already efficient. A lossless clean-up may trim
          a third (our 19-page text PDF went from 100 KB to 64 KB), but don't expect miracles.
        </li>
        <li>
          <strong>Several hundred KB to over 1 MB per page:</strong> scanned pages or large photos. These shrink by
          70–90%, but only with a method that re-compresses the images.
        </li>
      </ul>
      <p>
        Our <Link to="/blog/compress-pdf-without-losing-quality">PDF compression test</Link> shows both cases with real
        numbers, including how small a scan can go and still be readable.
      </p>

      <h2>On a Mac: Preview</h2>
      <ol>
        <li>Open the PDF in Preview.</li>
        <li>Choose <strong>File → Export…</strong></li>
        <li>In the <em>Quartz Filter</em> menu, choose <strong>Reduce File Size</strong>.</li>
        <li>Give the file a new name, so you keep the original, and click Save.</li>
      </ol>
      <p>
        <strong>The catch:</strong> the filter has no settings. It shrinks every image heavily, which is fine for
        text documents with a few pictures but often leaves scans blurry and photos blotchy. Some files even come out
        bigger. If the result looks rough, use the browser method below, which lets you pick a quality level or an exact
        target size.
      </p>

      <h2>On Windows: there's no built-in compressor</h2>
      <p>
        Windows can open PDFs in Edge, but neither Edge nor any other built-in app can compress them. You have two good
        options.
      </p>
      <h3>Option 1: fix it at the source in Word</h3>
      <p>If the PDF came from a Word document you still have, re-export it smaller:</p>
      <ol>
        <li>
          Shrink the pictures first: click any picture, go to <strong>Picture Format → Compress Pictures</strong>,
          untick "Apply only to this picture", and choose a lower resolution such as <em>Web (150 ppi)</em> or{' '}
          <em>E-mail (96 ppi)</em>.
        </li>
        <li>
          Choose <strong>File → Save As</strong>, pick PDF as the file type, and set <em>Optimize for</em> to{' '}
          <strong>Minimum size (publishing online)</strong>.
        </li>
      </ol>
      <p>
        This keeps text sharp and selectable, because only the pictures get smaller. Our guide to{' '}
        <Link to="/blog/reduce-word-document-file-size">reducing Word file size</Link> has more fixes.
      </p>
      <h3>Option 2: compress the PDF in your browser</h3>
      <p>
        If you only have the PDF, or it's a scan, use a browser tool (steps below). It works the same on Windows,
        Mac, Linux and Chromebook.
      </p>

      <h2>On iPhone and iPad</h2>
      <p>
        iOS can <em>create</em> PDFs (the Notes app has a document scanner, and in the Files app you can select images
        and choose <em>Create PDF</em>), but it can't compress them. Two tips:
      </p>
      <ul>
        <li>
          <strong>Scan smaller to begin with.</strong> Scanner apps often default to color. For text documents,
          switching to grayscale or black-and-white makes much smaller files.
        </li>
        <li>
          <strong>Compress in Safari.</strong> Open <Link to="/compress-pdf">compressnfly.com/compress-pdf</Link>, tap
          the upload area, choose <em>Browse</em> to pick the PDF from Files, then save the result back to Files.
        </li>
      </ul>

      <h2>On Android</h2>
      <p>
        Android has no built-in PDF compressor either. The Google Drive app can scan documents to PDF (tap{' '}
        <strong>+ → Scan</strong>), and like iOS, a browser tool handles compression: open the{' '}
        <Link to="/compress-pdf">PDF compressor</Link> in Chrome, pick the file from your Downloads or Drive, and
        download the smaller copy.
      </p>
      <p>
        On any phone, very long scanned PDFs (dozens of pages) take longer to process than on a computer, because each
        page is re-drawn on the device. For big jobs, a laptop is faster.
      </p>

      <h2>On any device: compress in the browser</h2>
      <ol>
        <li>Open the <Link to="/compress-pdf">PDF compressor</Link> and drop in your file.</li>
        <li>
          Choose <strong>By quality level</strong> for a quick result, or <strong>To an exact size</strong> when a
          website or email has a hard limit. There are ready-made pages for{' '}
          <Link to="/compress-pdf-to-200kb">200 KB</Link>, <Link to="/compress-pdf-to-500kb">500 KB</Link>,{' '}
          <Link to="/compress-pdf-to-1mb">1 MB</Link> and <Link to="/compress-pdf-to-2mb">2 MB</Link>.
        </li>
        <li>Download the result and open it once to check the smallest text is readable.</li>
      </ol>
      <p>
        Compressnfly runs the compression inside your browser, so the PDF is never uploaded to a server, which matters
        for contracts, bank statements and ID documents. Most online PDF tools work differently: they upload your file,
        process it on their servers and send it back.
      </p>

      <h2>Which method should you use?</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Situation</th>
              <th>Best method</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>You still have the Word file</td><td>Compress pictures in Word, export with "Minimum size"</td></tr>
            <tr><td>Text PDF with a few images, on a Mac</td><td>Preview → Reduce File Size</td></tr>
            <tr><td>Scanned document</td><td>Browser compressor with a quality level or target size</td></tr>
            <tr><td>Upload form with a strict limit</td><td>Browser compressor, "To an exact size"</td></tr>
            <tr><td>Too many pages for the limit</td><td><Link to="/split-pdf">Split the PDF</Link> and upload in parts</td></tr>
            <tr><td>Several PDFs that must be one file</td><td><Link to="/merge-pdf">Merge</Link> first, then compress</td></tr>
          </tbody>
        </table>
      </div>

      <h2>FAQ</h2>
      <h3>Why did Preview make my PDF bigger?</h3>
      <p>
        The Reduce File Size filter re-encodes every image with fixed settings. If the images were already well
        compressed, re-encoding them can add size. Keep the original and try a different method.
      </p>
      <h3>Is there a free PDF compressor for Windows?</h3>
      <p>
        Not built in. A browser-based compressor is free and needs no install. If the PDF came from Word, exporting it
        again with "Minimum size" also works.
      </p>
      <h3>Will compressing a PDF remove my signature?</h3>
      <p>
        No. A signature image stays on the page. A <em>digital</em> signature (a cryptographic one, shown in a
        signature panel) is invalidated by any change to the file, though, so compress before signing digitally.
      </p>
      <h3>Can I compress a password-protected PDF?</h3>
      <p>Remove the password first (you'll need to know it), compress, then add protection again if needed.</p>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/compress-pdf"
        ctaLabel="Compress a PDF now"
        title="How to Reduce PDF File Size on Windows, Mac, iPhone and Android"
        content={content}
        category="Tutorial"
        readTime="7 min read"
        date="2026-01-20"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default PDFCompressionGuide;
