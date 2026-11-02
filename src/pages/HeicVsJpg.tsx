import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const HeicVsJpg = () => {
  const content = (
    <>
      <p>
        You send photos from your iPhone to a Windows PC, or try to upload one to a job portal, and get an error, a
        blank thumbnail or a file called <code>IMG_2927.HEIC</code> that nothing will open. The photo is fine. It's
        just saved in a format a lot of software still doesn't understand.
      </p>
      <p>
        Here's what HEIC is, why your iPhone uses it, what happens when you convert it (we tested real iPhone photos),
        and four ways to stop it being a problem.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>HEIC is Apple's default photo format. It's about half the size of JPG for the same quality.</li>
          <li>Many websites, Windows PCs and apps still can't open it, so you need JPG for sharing and uploading.</li>
          <li>Converting to JPG makes the file bigger (about 1.7× in our test), but it then works everywhere.</li>
        </ul>
      </div>

      <h2>What is HEIC?</h2>
      <p>
        HEIC (High Efficiency Image Container) is a photo format built on the same compression technology as modern
        HEVC video. Apple made it the default camera format in iOS 11, and every iPhone since the iPhone 7 saves photos
        as HEIC unless you change a setting. In iPhone settings it's called <em>High Efficiency</em>.
      </p>
      <p>
        The reason is storage. A HEIC photo looks the same as a JPG at roughly half the file size, which on a phone with
        thousands of photos adds up to many gigabytes. HEIC also supports things JPG can't, like 16-bit color and
        storing several images in one file, which is how Live Photos and burst shots work.
      </p>

      <h2>Where HEIC causes problems</h2>
      <ul>
        <li>
          <strong>Windows PCs.</strong> Windows can't show HEIC photos out of the box on many computers. You need
          Microsoft's free <em>HEIF Image Extensions</em> from the Microsoft Store, and some PCs also need the{' '}
          <em>HEVC Video Extensions</em>.
        </li>
        <li>
          <strong>Websites and upload forms.</strong> Most forms accept JPG and PNG only. Chrome, Edge and Firefox can't
          display HEIC images, so even sites that accept the upload often can't show a preview.
        </li>
        <li>
          <strong>Older Android phones and apps</strong>, printing kiosks and some photo editors.
        </li>
        <li>
          <strong>Email to non-Apple users.</strong> The recipient gets an attachment they can't open.
        </li>
      </ul>
      <p>
        Apple devices handle HEIC natively, so the problem only appears once the photo leaves the Apple world, which is
        exactly when you're trying to send it somewhere.
      </p>

      <h2>Our test: converting real iPhone photos</h2>
      <p>
        We converted two real iPhone HEIC photos, both 12 megapixels, with Compressnfly's{' '}
        <Link to="/heic-to-jpg">HEIC to JPG</Link> and <Link to="/heic-to-png">HEIC to PNG</Link> converters in Chrome
        on an ordinary laptop:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>HEIC</th>
              <th>→ JPG</th>
              <th>→ PNG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photo 1 (3024×4032)</td>
              <td>704 KB</td>
              <td>1.14 MB (1.7×)</td>
              <td>8.66 MB (12.6×)</td>
            </tr>
            <tr>
              <td>Photo 2 (4032×3024)</td>
              <td>1.43 MB</td>
              <td>2.38 MB (1.7×)</td>
              <td>14.14 MB (9.9×)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Each JPG conversion took about 3–4 seconds, and the full resolution was kept. Three takeaways:
      </p>
      <ol>
        <li>
          <strong>The JPG is bigger, and that's expected.</strong> JPG is an older, less efficient format, so it needs
          more bytes to hold the same picture. Our converter saves JPGs at high quality (92%) so nothing visible is lost.
        </li>
        <li>
          <strong>Don't convert photos to PNG</strong> unless something specifically asks for PNG. PNG is lossless, so
          a photo becomes enormous: 14 MB for one picture.
        </li>
        <li>
          <strong>If you need a small file, convert first, then compress.</strong> A 2.38 MB JPG can go straight into
          the <Link to="/compress-image-to-100kb">100 KB compressor</Link> or whatever size your form needs.
        </li>
      </ol>

      <h2>4 ways to deal with HEIC</h2>
      <h3>1. Convert the photos you need to share</h3>
      <p>
        The quickest fix when you have a few photos to send right now. Open the{' '}
        <Link to="/heic-to-jpg">HEIC to JPG converter</Link>, drop in your photos (several at once is fine), and
        download the JPGs one by one or as a ZIP. The conversion runs in your browser, so private photos aren't
        uploaded anywhere. This keeps the space-saving HEIC originals on your phone.
      </p>
      <h3>2. Make your iPhone shoot JPG</h3>
      <p>
        Go to <strong>Settings → Camera → Formats</strong> and choose <strong>Most Compatible</strong>. New photos are
        saved as JPG from then on. Existing photos stay HEIC. The cost is storage: expect new photos to take up roughly
        twice the space.
      </p>
      <h3>3. Let the iPhone convert when you copy to a computer</h3>
      <p>
        Go to <strong>Settings → Photos</strong>, scroll to <em>Transfer to Mac or PC</em>, and choose{' '}
        <strong>Automatic</strong>. When you copy photos to a computer over a cable, the iPhone converts them to a
        compatible format on the way. Your phone keeps shooting space-saving HEIC.
      </p>
      <h3>4. Teach Windows to open HEIC</h3>
      <p>
        Install <em>HEIF Image Extensions</em> from the Microsoft Store. The Photos app can then open HEIC files and
        File Explorer shows thumbnails. It doesn't help when a website rejects the file, though; for uploads you still
        need a JPG.
      </p>

      <h2>Which should you use?</h2>
      <ul>
        <li>
          <strong>Keep HEIC</strong> if you mostly stay within Apple devices and care about phone storage.
        </li>
        <li>
          <strong>Switch to Most Compatible</strong> if you constantly send photos to Windows users or upload them to
          websites.
        </li>
        <li>
          <strong>Convert as needed</strong> if you share occasionally. You keep the storage savings and fix the
          problem only when it comes up.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Does converting HEIC to JPG lose quality?</h3>
      <p>
        Technically, yes, a little, because JPG is lossy. At 92% quality the difference isn't visible in normal
        viewing. The photo also loses HEIC-only extras like the motion part of a Live Photo.
      </p>
      <h3>Why is the JPG bigger than the HEIC?</h3>
      <p>
        HEIC compresses about twice as efficiently. In our test, JPGs came out 1.7× the size of the HEIC originals at
        the same resolution.
      </p>
      <h3>Can I convert HEIC to a specific size, like 50 KB?</h3>
      <p>
        Do it in two steps: convert to JPG, then use the <Link to="/compress-image-to-50kb">50 KB compressor</Link>. Our
        guide to <Link to="/blog/photo-size-for-online-forms">photos for online forms</Link> shows what each size looks
        like.
      </p>
      <h3>Are my photos uploaded during conversion?</h3>
      <p>No. Everything happens in your browser, and the photos stay on your device.</p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/heic-to-jpg"
        ctaLabel="Convert HEIC to JPG"
        title="HEIC vs JPG: Why Your iPhone Photos Won't Open (and 4 Ways to Fix It)"
        content={content}
        category="Guide"
        readTime="6 min read"
        date="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default HeicVsJpg;
