import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const PhotoForOnlineForms = () => {
  const content = (
    <>
      <p>
        "Photo must be JPG, maximum 50 KB." Job portals, university admissions, scholarship applications and
        government services all have rules like this, and a photo straight from your phone is usually 3–4 MB. That's
        70 to 80 times over the limit.
      </p>
      <p>
        Getting under the limit is easy. Getting under it with a photo that still looks good takes a bit of know-how.
        This guide shows what each common size actually gives you (we tested real phone photos), the steps that keep
        small photos sharp, and fixes for the errors forms throw at you.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
          <li>Crop the photo to just what's needed (usually your head and shoulders).</li>
          <li>Make sure it's a JPG. Convert HEIC, PNG or WebP first.</li>
          <li>Compress to an exact size about 10% below the limit, e.g. 45 KB for a 50 KB form.</li>
        </ol>
      </div>

      <h2>What 20 KB, 50 KB and 100 KB actually look like</h2>
      <p>
        We compressed 12-megapixel photos from three phones (Pixel 2, iPhone 6 Plus, Galaxy S7 Edge) to each common
        target with Compressnfly's exact-size mode. All three landed on almost the same dimensions, so this works as a
        general guide:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Target</th>
              <th>Dimensions (full photo)</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20 KB</td>
              <td>277×370 px</td>
              <td>Clean and recognisable at form-preview size. Fine detail is gone.</td>
            </tr>
            <tr>
              <td>50 KB</td>
              <td>438×584 px</td>
              <td>Sharp at normal viewing size. The most common form limit, and comfortable.</td>
            </tr>
            <tr>
              <td>100 KB</td>
              <td>620×826 px</td>
              <td>Looks like a normal photo on a laptop screen.</td>
            </tr>
            <tr>
              <td>200 KB</td>
              <td>876×1168 px</td>
              <td>More than any form photo needs.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Each one took under a second. The tool lowers both the pixel dimensions and the JPG quality, balancing the two
        so the photo doesn't turn blocky. The result card shows the final size and dimensions, so you can check them
        against the form's rules before uploading.
      </p>
      <p>
        These numbers are for the <em>whole</em> photo. That's why cropping matters so much.
      </p>

      <h2>Step 1: Crop first</h2>
      <p>
        Most form photos only need your face and shoulders, but a phone photo also includes the wall behind you, the
        ceiling and your surroundings. All of that eats into your byte budget.
      </p>
      <p>
        Crop before you compress, using the edit button in your phone's gallery app. If you crop the photo down to a
        third of the frame, the same 50 KB is spent on a much smaller area, so your face comes out far sharper than in
        the uncropped version.
      </p>
      <p>
        If the form asks for a specific shape, like a square or a passport-style rectangle, use your phone's crop ratio
        presets to match it.
      </p>

      <h2>Step 2: Make sure it's a JPG</h2>
      <p>
        Most forms want JPG (sometimes written JPEG; they're the same thing). Fix the format before compressing:
      </p>
      <ul>
        <li>
          <strong>iPhone photos</strong> are often HEIC. Use <Link to="/heic-to-jpg">HEIC to JPG</Link>. Our{' '}
          <Link to="/blog/heic-vs-jpg">HEIC vs JPG guide</Link> explains why.
        </li>
        <li>
          <strong>Screenshots</strong> are PNG. Use <Link to="/png-to-jpg">PNG to JPG</Link>.
        </li>
        <li>
          <strong>Images saved from websites or WhatsApp</strong> can be WebP. Use{' '}
          <Link to="/webp-to-jpg">WebP to JPG</Link>.
        </li>
      </ul>

      <h2>Step 3: Compress to an exact size</h2>
      <ol>
        <li>
          Open the page for your limit: <Link to="/compress-image-to-20kb">20 KB</Link>,{' '}
          <Link to="/compress-image-to-30kb">30 KB</Link>, <Link to="/compress-image-to-50kb">50 KB</Link>,{' '}
          <Link to="/compress-image-to-100kb">100 KB</Link> or <Link to="/compress-image-to-200kb">200 KB</Link>. For
          any other number, use <Link to="/reduce-image-size-in-kb">reduce image size in KB</Link> and type it in.
        </li>
        <li>Drop in your cropped JPG. It's processed on your device, not uploaded.</li>
        <li>Check the result: it shows the final size, the dimensions and a ✓ when it's under your target.</li>
        <li>Download and upload to the form.</li>
      </ol>
      <p>
        <strong>Why 10% under?</strong> Some forms count a kilobyte as 1,000 bytes, others as 1,024. A 50,500-byte
        file is 49.3 KB one way and 50.5 KB the other, so it can pass on your computer and fail on the form. Typing 45
        instead of 50 avoids that and costs nothing visible.
      </p>

      <h2>Signatures</h2>
      <p>Many forms want a scanned signature at 10–50 KB. To get a clean one:</p>
      <ul>
        <li>Sign with a dark pen on plain white paper. Thin ballpoint lines can disappear when compressed.</li>
        <li>Photograph it in daylight, straight-on, with no shadow from your phone.</li>
        <li>Crop tightly around the signature. The blank paper around it is wasted bytes.</li>
        <li>Compress to the limit. A tightly cropped signature on a white background usually fits in 10–20 KB without trouble.</li>
      </ul>

      <h2>Document scans (ID cards, certificates, transcripts)</h2>
      <p>
        When a form wants documents as one PDF under 200 KB or 500 KB:
      </p>
      <ol>
        <li>Photograph or scan each page.</li>
        <li>
          Combine them with <Link to="/jpg-to-pdf">JPG to PDF</Link> (or <Link to="/merge-pdf">merge PDFs</Link> if you
          already have PDFs).
        </li>
        <li>
          Compress to the limit with <Link to="/compress-pdf-to-200kb">PDF to 200 KB</Link>,{' '}
          <Link to="/compress-pdf-to-500kb">500 KB</Link> or <Link to="/compress-pdf-to-1mb">1 MB</Link>.
        </li>
      </ol>
      <p>
        In our tests, scanned pages stayed clearly readable at about 40 KB per page, and got fuzzy at around 20 KB per
        page. So a 4-page document under 200 KB will look fine, while 10 pages under 200 KB will be hard to read. Our{' '}
        <Link to="/blog/compress-pdf-without-losing-quality">PDF compression test</Link> has the full numbers.
      </p>
      <p>
        For Pakistani passport applications, see{' '}
        <Link to="/compress-documents-for-pakistan-passport">compress documents for passport applications</Link>. For job
        portals, see <Link to="/compress-photo-for-job-application">compress a photo for a job application</Link>.
      </p>

      <h2>Common upload errors and fixes</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Error</th>
              <th>Likely cause</th>
              <th>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"File size exceeds limit" when it looks under</td>
              <td>1,000 vs 1,024 byte kilobytes</td>
              <td>Compress to 10% below the limit</td>
            </tr>
            <tr>
              <td>"Invalid file type"</td>
              <td>HEIC, PNG or WebP, or a .jpeg/.jpg mismatch</td>
              <td>Convert to JPG; if it still fails, check the extension the form lists</td>
            </tr>
            <tr>
              <td>"Image dimensions too small"</td>
              <td>The form sets a minimum pixel size</td>
              <td>Crop tighter instead of compressing harder, or use the next size up if allowed</td>
            </tr>
            <tr>
              <td>Upload works, but the photo is rejected later</td>
              <td>Too blurry, or face too small in the frame</td>
              <td>Crop to head and shoulders, use good light, and use more of the size limit</td>
            </tr>
            <tr>
              <td>Upload fails with no clear message</td>
              <td>Special characters or spaces in the file name</td>
              <td>Rename to something simple like <code>photo.jpg</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>FAQ</h2>
      <h3>Can I set exact pixel dimensions, like 200×230?</h3>
      <p>
        Compressnfly chooses the dimensions automatically to hit the file size. If a form demands exact pixel
        dimensions, crop and resize to those in your phone's editor or a desktop editor first, then compress to the
        size limit and check the dimensions on the result.
      </p>
      <h3>Will a 20 KB photo be accepted?</h3>
      <p>
        If the form's limit is 20 KB, it's designed for photos that size, and the images in our test were perfectly
        recognisable. Cropping first makes a visible difference at this size.
      </p>
      <h3>Is it safe to compress ID documents online?</h3>
      <p>
        On Compressnfly, yes: files are processed in your browser and never uploaded to a server. Be cautious with
        sites that upload your documents for processing.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/compress-image-to-50kb"
        ctaLabel="Compress a photo to 50 KB"
        title="How to Get a Photo Under 20 KB, 50 KB or 100 KB for Online Forms"
        content={content}
        category="Tutorial"
        readTime="7 min read"
        date="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default PhotoForOnlineForms;
