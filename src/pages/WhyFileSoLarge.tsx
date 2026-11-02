import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const WhyFileSoLarge = () => {
  const content = (
    <>
      <p>
        A Word document that's mostly text, yet weighs 10 MB. A PDF of a few pages that won't attach to an email. A
        single photo bigger than a whole folder of documents. When a file is bigger than it "should" be, there's almost
        always one specific cause, and once you find it, the fix is usually quick.
      </p>
      <p>
        This guide shows how to find that cause for each file type, with real examples from files we took apart
        ourselves.
      </p>

      <h2>How big should a file be?</h2>
      <p>Start with a sense of normal. These are typical sizes, several from our own test files:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Normal size</th>
              <th>Suspicious if</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Word document, text only</td><td>Our 19-page handbook: 49 KB</td><td>Over 1 MB</td></tr>
            <tr><td>PDF exported from text</td><td>Our 19-page handbook: 100 KB (about 5 KB/page)</td><td>Over 100 KB per page</td></tr>
            <tr><td>Scanned PDF</td><td>100 KB–1.5 MB per page</td><td>Over 1.5 MB per page</td></tr>
            <tr><td>Phone photo (JPG)</td><td>Our 3 test photos: 3.5–4.2 MB</td><td>Over 8 MB, or any PNG photo</td></tr>
            <tr><td>Screenshot (PNG)</td><td>200 KB–2 MB</td><td>Over 5 MB</td></tr>
            <tr><td>1 minute of phone video</td><td>Tens to hundreds of MB</td><td>Normal: video is just big</td></tr>
          </tbody>
        </table>
      </div>
      <p>If your file is well into the "suspicious" column, one of the causes below is almost certainly to blame.</p>

      <h2>Word, PowerPoint and Excel files</h2>
      <h3>Look inside: the 10-second check</h3>
      <p>
        Modern Office files (.docx, .pptx, .xlsx) are ZIP archives in disguise. Make a copy of the file, rename the
        copy's extension to <code>.zip</code>, and open it. Inside, a folder called <code>media</code> (in{' '}
        <code>word</code>, <code>ppt</code> or <code>xl</code>) holds every picture, video and audio clip in the
        document, at its real size.
      </p>
      <p>
        We did this with our 9.46 MB test report. The <code>media</code> folder held three phone photos totalling{' '}
        <strong>9.44 MB</strong>. Everything else (all the text, styles and layout) took up about{' '}
        <strong>40 KB</strong> of the file. The photos were
        99% of the problem. Even though each photo was displayed twice in the document, Word stored each one only once.
      </p>
      <h3>The usual causes</h3>
      <ul>
        <li>
          <strong>Full-size photos.</strong> Pasting a phone photo into Word stores all 12 megapixels, even if it's
          shown as a thumbnail. This is the cause in most cases.
        </li>
        <li>
          <strong>"Do not compress images in file".</strong> In Word's <em>File → Options → Advanced</em>, this setting
          (and a high <em>Default resolution</em>) stops Word from shrinking pictures. Common in templates from design
          teams.
        </li>
        <li>
          <strong>Embedded fonts.</strong> <em>File → Options → Save → Embed fonts in the file</em> can add several MB
          per font family. Turn it off unless the recipient must have your exact fonts.
        </li>
        <li>
          <strong>Videos in presentations.</strong> An embedded video can be hundreds of MB. Link to it instead, or
          compress it first (see our <Link to="/blog/video-compression-guide">video guide</Link>).
        </li>
        <li>
          <strong>Excel's hidden extras.</strong> Formatting applied to whole columns, and PivotTables with "Save
          source data with file" turned on, both inflate workbooks quietly.
        </li>
      </ul>
      <p>
        <strong>Fix:</strong> Compressnfly's compressor re-compresses the pictures inside .docx, .pptx and .xlsx files
        and leaves everything else as it was. Our 9.46 MB report became 384 KB on the Balanced setting. Or fix it
        inside Word with our <Link to="/blog/reduce-word-document-file-size">Word file size guide</Link>.
      </p>

      <h2>PDFs</h2>
      <p>
        Divide the size by the number of pages. Text needs only a few KB per page, so anything far above that means
        images:
      </p>
      <ul>
        <li>
          <strong>Scanned pages.</strong> Every page is a photograph. Our 8-page test scan (each page a 300 DPI color
          image, the way scanning apps save them) was 9.49 MB, about 1.2 MB per page.
        </li>
        <li>
          <strong>Scanned in color.</strong> Our test pages contained only black text but were still stored as full
          color. Grayscale or black-and-white scans of text documents are far smaller.
        </li>
        <li>
          <strong>Photos from the source document.</strong> A report with photos exports them at high resolution: our
          9-page photo report was 2.31 MB, about 260 KB per page.
        </li>
        <li>
          <strong>Printed to PDF from an image.</strong> "Printing" a web page or image to PDF can turn the whole page
          into one big picture.
        </li>
      </ul>
      <p>
        <strong>Fix:</strong> <Link to="/compress-pdf">compress the PDF</Link>. Lossless clean-up suits text PDFs;
        scans need the pages re-compressed. The numbers are in our{' '}
        <Link to="/blog/compress-pdf-without-losing-quality">PDF compression test</Link>.
      </p>

      <h2>Photos</h2>
      <ul>
        <li>
          <strong>Megapixels.</strong> A 12 MP phone photo has about six times more pixels than a full HD screen can
          show. That's where the 3–5 MB comes from.
        </li>
        <li>
          <strong>Saved as PNG.</strong> PNG is lossless and made for graphics. A photo saved as PNG balloons: two iPhone
          photos we converted to PNG became 8.66 MB and 14.14 MB, against 1.14 MB and 2.38 MB as JPG.
        </li>
        <li>
          <strong>Converted from HEIC.</strong> iPhone HEIC photos grow when converted to JPG (1.7× in{' '}
          <Link to="/blog/heic-vs-jpg">our test</Link>). That's normal, not a fault.
        </li>
        <li>
          <strong>Edited and re-saved at maximum quality.</strong> Some editors save at 100% quality, which can double
          a JPG's size with no visible benefit.
        </li>
      </ul>
      <p>
        <strong>Fix:</strong> <Link to="/compress-jpg">compress the photo</Link> or{' '}
        <Link to="/png-to-jpg">convert PNG photos to JPG</Link>. A 4.16 MB photo dropped to 305 KB on Web Optimized
        and still looked sharp on screen. See the full results in our{' '}
        <Link to="/blog/compress-images-online">image test</Link>.
      </p>

      <h2>Screenshots</h2>
      <p>
        On high-resolution screens (Retina Macs, most modern phones and laptops), screenshots are captured at two or
        three times the resolution you see, and saved as PNG. A screenshot of a photo or a colorful web page is
        especially heavy, because PNG compresses smooth color poorly.
      </p>
      <p>
        <strong>Fix:</strong> crop to what matters, then <Link to="/compress-png">compress the PNG</Link>, or convert to
        JPG if it's mostly photo content.
      </p>

      <h2>ZIP files that won't get smaller</h2>
      <p>
        Zipping only helps with text-like data. Our ZIP of three phone photos went from 11.64 MB to 11.61 MB (0.2%),
        because JPGs are already compressed. A CSV file, on the other hand, shrank 84%. To shrink a ZIP of photos,
        compress the photos themselves first, then zip them. More in our{' '}
        <Link to="/blog/file-compression-guide">file compression guide</Link>.
      </p>

      <h2>Video and audio</h2>
      <p>
        These are big by nature: size is bitrate × length. A WAV recording is about 10.6 MB per minute; video can be
        tens or hundreds of MB per minute. See the{' '}
        <Link to="/blog/video-compression-guide">video</Link> and{' '}
        <Link to="/blog/audio-compression-guide">audio</Link> guides for settings that cut them down.
      </p>

      <h2>FAQ</h2>
      <h3>Why is my file bigger after I edited it?</h3>
      <p>
        Usually because the editor re-saved images at a higher quality, or stored edit history. Export a fresh copy
        rather than repeatedly saving over the same file.
      </p>
      <h3>Why does the size differ between my phone and my computer?</h3>
      <p>
        Partly units: some systems count a kilobyte as 1,000 bytes, others as 1,024. And some apps convert the file when
        you transfer it (iPhones can convert HEIC to JPG automatically), which changes the size.
      </p>
      <h3>Is it safe to compress private files online?</h3>
      <p>
        Compressnfly processes files inside your browser and never uploads them. With other tools, check whether files
        are sent to a server.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/"
        ctaLabel="Shrink your file now"
        title="Why Is My File So Large? How to Find the Cause (and Fix It)"
        content={content}
        category="Guide"
        readTime="8 min read"
        date="2026-05-05"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};
export default WhyFileSoLarge;
