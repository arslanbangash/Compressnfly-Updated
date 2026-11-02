import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const FileCompressionGuide = () => {
  const content = (
    <>
      <p>
        Some files shrink by 90% when you compress them. Others won't budge by even 1%, no matter what tool you use.
        This guide explains why, using a set of real files we compressed ourselves, so you know what to expect before
        you start, and which method fits which file.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Plain data like text, CSV and spreadsheets shrinks a lot with lossless compression (ZIP).</li>
          <li>Photos, videos, music and most modern documents are already compressed. Zipping them does almost nothing.</li>
          <li>To shrink those, you need lossy compression: re-encoding the images inside at a smaller size or quality.</li>
        </ul>
      </div>

      <h2>Lossless vs lossy, in plain words</h2>
      <p>
        <strong>Lossless compression</strong> finds repetition and writes it down more efficiently. If a spreadsheet
        has the word "Islamabad" 5,000 times, a lossless compressor stores it once and points back to it. When you
        unzip the file, you get back every byte exactly. ZIP, PNG and FLAC work this way.
      </p>
      <p>
        <strong>Lossy compression</strong> throws away information you're unlikely to notice: fine detail in a photo,
        frequencies in music you can barely hear. The file you get back is not identical, just close enough. JPG, MP3,
        MP4 and WebP work this way, and it's why they're so much smaller than the raw data.
      </p>
      <p>
        The key consequence: <strong>once a file has been compressed well, compressing it again achieves little.</strong>
        The repetition has already been squeezed out. That's why zipping a folder of photos is so disappointing.
      </p>

      <h2>Our test: what actually shrinks</h2>
      <p>
        We put seven files through Compressnfly. The CSV and the ZIP went through lossless compression. The documents
        and PDFs were tested with lossless clean-up and with lossy image re-compression.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Original</th>
              <th>After</th>
              <th>Saved</th>
              <th>How</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sales data, CSV (30,000 rows)</td>
              <td>1.50 MB</td>
              <td>248 KB</td>
              <td>84%</td>
              <td>Lossless (ZIP)</td>
            </tr>
            <tr>
              <td>ZIP of 3 phone photos (no compression inside)</td>
              <td>11.64 MB</td>
              <td>11.61 MB</td>
              <td>0.2%</td>
              <td>Lossless (ZIP)</td>
            </tr>
            <tr>
              <td>Word document, text only</td>
              <td>49 KB</td>
              <td>48 KB</td>
              <td>3%</td>
              <td>Repacked</td>
            </tr>
            <tr>
              <td>Word document with 6 phone photos</td>
              <td>9.46 MB</td>
              <td>384 KB</td>
              <td>96%</td>
              <td>Photos inside re-compressed (Balanced)</td>
            </tr>
            <tr>
              <td>PDF, text only (19 pages)</td>
              <td>100 KB</td>
              <td>64 KB</td>
              <td>36%</td>
              <td>Lossless clean-up</td>
            </tr>
            <tr>
              <td>Scanned PDF (8 pages)</td>
              <td>9.49 MB</td>
              <td>9.48 MB</td>
              <td>0%</td>
              <td>Lossless clean-up</td>
            </tr>
            <tr>
              <td>Same scanned PDF</td>
              <td>9.49 MB</td>
              <td>804 KB</td>
              <td>92%</td>
              <td>Pages re-rendered (lossy)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Three lessons jump out:</p>
      <ol>
        <li>
          <strong>Text-like data compresses beautifully.</strong> The CSV is full of repeated city names, product names
          and dates, so ZIP cut it by 84%.
        </li>
        <li>
          <strong>Photos inside a ZIP don't shrink.</strong> JPGs are already compressed, so the ZIP saved 0.2%. A ZIP
          is a handy way to bundle files, not to shrink photos.
        </li>
        <li>
          <strong>Documents are big because of the pictures in them.</strong> The text-only Word file was 49 KB and
          barely changed. The one with photos dropped from 9.46 MB to 384 KB once the photos inside were re-compressed,
          and the text was untouched.
        </li>
      </ol>

      <h2>Why a .docx barely zips</h2>
      <p>
        Here's something most people don't know: a modern Word file (.docx), Excel file (.xlsx) or PowerPoint file
        (.pptx) <em>is already a ZIP archive</em>. Rename one to .zip and you can open it and see the folders inside,
        including a <code>media</code> folder holding every picture you inserted. That's why zipping a .docx gains
        almost nothing, and why the only real way to shrink one is to shrink those pictures.
      </p>
      <p>
        That's exactly what Compressnfly does with Office files. It opens the archive, re-compresses the images in the
        media folder, and repacks everything. Your text, formatting and layout stay as they were. In our test, the
        settings made a big difference:
      </p>
      <ul>
        <li><em>High Quality:</em> 9.46 MB → 2.45 MB (photos still large and sharp)</li>
        <li><em>Balanced:</em> 9.46 MB → 384 KB (photos fine at page size)</li>
        <li><em>Small Size:</em> 9.46 MB → 159 KB (photos noticeably softer if you zoom in)</li>
      </ul>
      <p>
        If you'd rather fix it inside Word, see our guide to{' '}
        <Link to="/blog/reduce-word-document-file-size">reducing Word document size</Link>.
      </p>

      <h2>Which method for which file</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>File type</th>
              <th>Already compressed?</th>
              <th>What works</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TXT, CSV, JSON, XML, logs</td>
              <td>No</td>
              <td>ZIP it: expect 60–90% smaller</td>
            </tr>
            <tr>
              <td>JPG, WebP, HEIC photos</td>
              <td>Yes (lossy)</td>
              <td>Resize and re-compress: <Link to="/compress-jpg">compress JPG</Link></td>
            </tr>
            <tr>
              <td>PNG screenshots and graphics</td>
              <td>Yes (lossless)</td>
              <td>
                <Link to="/compress-png">Compress PNG</Link>, or <Link to="/png-to-jpg">convert to JPG</Link> if it's
                a photo
              </td>
            </tr>
            <tr>
              <td>PDF</td>
              <td>Depends</td>
              <td>
                Lossless clean-up for text PDFs; re-render pages for scans. See our{' '}
                <Link to="/blog/compress-pdf-without-losing-quality">PDF test</Link>
              </td>
            </tr>
            <tr>
              <td>DOCX, XLSX, PPTX</td>
              <td>Yes (they're ZIPs)</td>
              <td>Re-compress the images inside</td>
            </tr>
            <tr>
              <td>MP4, MOV video</td>
              <td>Yes (lossy)</td>
              <td>Re-encode with a video tool such as HandBrake</td>
            </tr>
            <tr>
              <td>MP3, AAC audio</td>
              <td>Yes (lossy)</td>
              <td>Lower the bitrate in an audio editor such as Audacity</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Video and audio need dedicated software. Compressnfly focuses on images, PDFs, documents and archives, which it
        can handle well inside a browser.
      </p>

      <h2>Can compression damage a file?</h2>
      <p>
        Lossless compression can't: you always get the exact original back. Lossy compression changes the file by
        design, so the rules are simple:
      </p>
      <ul>
        <li><strong>Keep the original.</strong> Compress a copy, especially before deleting anything.</li>
        <li><strong>Compress once, from the original.</strong> Re-compressing a compressed JPG stacks up the damage.</li>
        <li><strong>Check the result</strong> at the size it will actually be viewed, not zoomed to 400%.</li>
      </ul>

      <h2>Where your files go</h2>
      <p>
        Most online compressors upload your file to their server, process it there, and send it back. Compressnfly
        does the work inside your browser instead. The compression code is downloaded to your device, and your files
        never leave it. For contracts, ID scans and personal photos, that's the difference between trusting a company
        with your documents and not having to.
      </p>

      <h2>FAQ</h2>
      <h3>Why did my file get only 1% smaller?</h3>
      <p>
        It was almost certainly already compressed: a photo, a video, a ZIP, or a PDF made of scans compressed with a
        lossless method. Use a lossy option that resizes the images inside.
      </p>
      <h3>Is ZIP or RAR better?</h3>
      <p>
        For already-compressed files, neither helps much. For text and data, both work well and the differences are
        small. ZIP opens on every computer without extra software.
      </p>
      <h3>What's the best format to send photos in?</h3>
      <p>
        JPG, resized for the purpose. See the size-by-size results in our{' '}
        <Link to="/blog/compress-images-online">image compression test</Link>.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/"
        ctaLabel="Compress a file now"
        title="File Compression Explained: What Shrinks, What Doesn't, and Why"
        content={content}
        category="Guide"
        readTime="7 min read"
        date="2026-02-15"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default FileCompressionGuide;
