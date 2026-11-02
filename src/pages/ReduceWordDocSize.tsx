import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const ReduceWordDocSize = () => {
  const content = (
    <>
      <p>
        Text barely weighs anything. Our 19-page, text-only test document was just <strong>49 KB</strong>. So when a
        Word file runs to 5, 10 or 50 MB, the text isn't the problem. Something else is riding along inside, and in
        most cases it's pictures.
      </p>
      <p>
        Below: how to find exactly what's bloating your document, then 7 ways to fix it, starting with the one that
        usually makes the biggest difference. We tested the main fix on a real 9.46 MB report so you can see the
        numbers.
      </p>

      <h2>Step 0: find out what's actually taking up space</h2>
      <p>
        A .docx file is a ZIP archive with a different name. Make a <em>copy</em> of your document, rename the copy
        from <code>.docx</code> to <code>.zip</code>, and open it. Look inside the <code>word/media</code> folder:
        every picture in the document is there, at the size Word actually stored it.
      </p>
      <p>
        In our 9.46 MB test report, that folder held three phone photos adding up to 9.44 MB. All the text, styles and
        layout together took about 40 KB. If your media folder looks like that, start with methods 1 and 2. If it's
        small, jump to methods 4–7.
      </p>

      <h2>Method 1: compress the whole file in your browser</h2>
      <p>
        Compressnfly opens the .docx, re-compresses the pictures in the media folder, and packs everything back up.
        Text, formatting, tables and layout are left exactly as they were, and the file opens normally in Word, Google
        Docs and LibreOffice. It runs in your browser, so the document isn't uploaded anywhere.
      </p>
      <p>Our 9.46 MB report (9 pages, six photos) at each level:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Result</th>
              <th>Saved</th>
              <th>Photos looked</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>High Quality</td><td>2.45 MB</td><td>74%</td><td>No visible change</td></tr>
            <tr><td>Balanced</td><td>384 KB</td><td>96%</td><td>Sharp at page size</td></tr>
            <tr><td>Small Size</td><td>159 KB</td><td>98%</td><td>Fine on the page, soft if zoomed in</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For comparison, the text-only document went from 49 KB to 48 KB. With no pictures inside, there's almost
        nothing to compress, which is also how you can tell pictures aren't your problem.
      </p>
      <p>
        <strong>How:</strong> open the <Link to="/">compressor</Link>, drop in the .docx, choose a level (Balanced is
        right for email), and download the copy.
      </p>

      <h2>Method 2: compress pictures inside Word</h2>
      <p>Word has its own picture compressor. It's well hidden:</p>
      <ul>
        <li>
          <strong>Windows:</strong> click any picture → <strong>Picture Format → Compress Pictures</strong> → untick
          <em> Apply only to this picture</em> → choose <em>Web (150 ppi)</em> or <em>E-mail (96 ppi)</em> → OK, then save.
        </li>
        <li>
          <strong>Mac:</strong> click a picture → <strong>Picture Format → Compress Pictures</strong> → choose the
          picture quality and apply it to all pictures in the file, then save.
        </li>
      </ul>
      <p>
        Also tick <em>Delete cropped areas of pictures</em> in the same dialog. Cropping a photo in Word only hides the
        edges. The full photo stays inside the file until you delete the cropped areas.
      </p>

      <h2>Method 3: stop Word keeping full-size pictures</h2>
      <p>
        In <strong>File → Options → Advanced</strong> (Windows) under <em>Image Size and Quality</em>, check that{' '}
        <em>Do not compress images in file</em> is <strong>unticked</strong>, and set the default resolution to 150 or
        220 ppi rather than "High fidelity". Templates made by design teams often have these set to keep every picture
        at full size.
      </p>

      <h2>Method 4: shrink pictures before you insert them</h2>
      <p>
        The best fix is never letting a 4 MB photo in. A document photo shown at half-page width needs about 1,200
        pixels at most. Run your photos through the <Link to="/compress-jpg">image compressor</Link> first.{' '}
        <em>Balanced</em> brought our phone photos down to 78–153 KB each. Our{' '}
        <Link to="/blog/compress-images-online">image compression test</Link> shows what each setting looks like.
      </p>

      <h2>Method 5: turn off embedded fonts</h2>
      <p>
        <strong>File → Options → Save → Embed fonts in the file</strong> packs the font files into your document so it
        looks identical on other computers. Each font family can add from a few hundred KB to several MB. Unless the
        recipient really needs your exact custom font, untick it. If you must embed, tick <em>Embed only the characters
        used in the document</em> and <em>Do not embed common system fonts</em>.
      </p>

      <h2>Method 6: replace embedded charts and objects</h2>
      <p>
        A chart created in Word, or pasted from Excel with its workbook embedded, carries a copy of that spreadsheet
        data inside the document. For a large workbook, that can be a lot. If the chart no longer needs editing, copy it
        and use <strong>Paste Special → Picture (PNG)</strong> to replace it with an image. The same goes for embedded
        PDFs, videos and other objects: link to them, or replace them with an image.
      </p>

      <h2>Method 7: clean up and save as a new file</h2>
      <ul>
        <li>Accept or reject all tracked changes, and delete comments you no longer need.</li>
        <li>
          Run <strong>File → Info → Check for Issues → Inspect Document</strong> to remove hidden data such as
          personal information, invisible content and hidden text.
        </li>
        <li>Then use <strong>File → Save As</strong> with a new name to write a clean copy.</li>
      </ul>
      <p>
        These usually save less than fixing the pictures, since tracked changes are mostly text. But they matter for
        documents that have been edited for months, and removing hidden data is good practice before sending anything
        outside your organisation.
      </p>

      <h2>Which method to use</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Situation</th>
              <th>Fastest fix</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Need it smaller right now</td><td>Method 1 (browser), 30 seconds</td></tr>
            <tr><td>You'll keep editing the document</td><td>Methods 2 and 3 inside Word</td></tr>
            <tr><td>Building a new document with photos</td><td>Method 4: compress photos first</td></tr>
            <tr><td>Media folder is small but the file is big</td><td>Methods 5–7</td></tr>
            <tr><td>The file is a PDF, not a .docx</td><td>See <Link to="/blog/pdf-compression-guide">reducing PDF size on any device</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2>FAQ</h2>
      <h3>Will compressing change my formatting?</h3>
      <p>
        No. Only the pictures are re-compressed. Text, fonts, tables, headers and page layout stay exactly as they were.
      </p>
      <h3>Can I compress a .doc file (older Word format)?</h3>
      <p>
        The old .doc format isn't a ZIP, so pictures inside can't be re-compressed the same way. Open it in Word and
        save it as .docx first. That alone often makes it smaller, and then Method 1 works.
      </p>
      <h3>Will the compressed file open in Google Docs?</h3>
      <p>Yes. It's still a standard .docx file.</p>
      <h3>Does the same work for PowerPoint and Excel?</h3>
      <p>
        Yes. .pptx and .xlsx files are ZIP archives too, with pictures in <code>ppt/media</code> and{' '}
        <code>xl/media</code>. The browser compressor handles them the same way.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/"
        ctaLabel="Compress a Word file now"
        title="How to Reduce Word Document File Size: 7 Methods (With Real Results)"
        content={content}
        category="Tutorial"
        readTime="8 min read"
        date="2026-05-05"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default ReduceWordDocSize;
