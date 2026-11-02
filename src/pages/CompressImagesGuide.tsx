import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const CompressImagesGuide = () => {
  const content = (
    <>
      <p>
        Every image compressor promises "no quality loss". The honest version is this: a phone photo holds far more
        detail than any screen can show, and most of the size you remove is detail nobody would ever see. Go too far,
        though, and the photo does start to suffer. The useful question is where that line sits.
      </p>
      <p>
        So we tested it. We took three real photos straight off three different phones and ran each one through every
        setting in Compressnfly's <Link to="/compress-jpg">image compressor</Link>. Below are the exact results: sizes,
        pixel dimensions, and what we'd use each setting for.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>A 3.5–4.2 MB phone photo shrank to about 1 MB with no visible change, even at full-screen size.</li>
          <li>At 200–350 KB it still looked sharp on a laptop or phone screen. That's the sweet spot for sharing.</li>
          <li>Most of the saving comes from reducing pixel dimensions, not from cranking up compression.</li>
        </ul>
      </div>

      <h2>Why phone photos are so big</h2>
      <p>
        Our three test photos came from a Google Pixel 2, an iPhone 6 Plus and a Samsung Galaxy S7 Edge. Each is a
        12-megapixel image, roughly 3000 × 4000 pixels, and they weighed 4.16 MB, 3.51 MB and 3.97 MB.
      </p>
      <p>
        Now compare that with where photos are usually viewed. A full HD laptop screen is 1920 × 1080, about 2
        megapixels. A phone screen shows even fewer pixels at a time, unless you zoom in. So a 12 MP photo shown
        full-screen is already being scaled down to a sixth of its pixels or less. That extra detail matters for
        printing large or cropping tightly, and for not much else.
      </p>
      <p>
        There's a second, hidden passenger: <strong>metadata</strong>. The Pixel photo carried its GPS coordinates,
        recording exactly where it was taken. Compressnfly's output files don't include that metadata, which is a
        small privacy win when you share photos publicly.
      </p>

      <h2>Our test: three phones, four settings</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Setting</th>
              <th>Pixel 2 (4.16 MB)</th>
              <th>iPhone 6 Plus (3.51 MB)</th>
              <th>Galaxy S7 Edge (3.97 MB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High Quality</td>
              <td>1.11 MB · 2599×3465</td>
              <td>1.06 MB · 2208×2945</td>
              <td>986 KB · 3648×2736</td>
            </tr>
            <tr>
              <td>Web Optimized</td>
              <td>305 KB · 1368×1824</td>
              <td>353 KB · 1299×1732</td>
              <td>214 KB · 1920×1440</td>
            </tr>
            <tr>
              <td>Balanced</td>
              <td>117 KB · 912×1216</td>
              <td>153 KB · 866×1155</td>
              <td>78 KB · 1280×960</td>
            </tr>
            <tr>
              <td>Small Size</td>
              <td>45 KB · 600×800</td>
              <td>50 KB · 541×722</td>
              <td>25 KB · 800×600</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Each photo took between half a second and 1.6 seconds on a regular laptop. Two things stand out. First, even
        <em> High Quality</em> cut every photo by 70–76%. Second, the same setting gives different results for
        different photos. The Samsung shot, a building at night with a lot of plain dark sky, compressed far more
        easily than the iPhone close-up of fir needles. Busy detail like leaves, gravel and fabric costs more bytes than
        smooth sky, snow or shadow.
      </p>

      <h2>Which setting to use</h2>
      <ul>
        <li>
          <strong>High Quality (~1 MB):</strong> keeping or printing. Dimensions stay large enough for sharp prints up
          to about 8×10 inches, and you can't tell it apart from the original on screen.
        </li>
        <li>
          <strong>Web Optimized (~200–350 KB):</strong> sharing, social posts, websites and blogs. Still sharp on a
          laptop or phone screen, and about 13× lighter than the original.
        </li>
        <li>
          <strong>Balanced (~80–150 KB):</strong> email attachments, Word documents and presentations, where the photo
          is shown smaller than full-screen.
        </li>
        <li>
          <strong>Small Size (~25–50 KB):</strong> thumbnails, profile pictures and upload forms with strict limits.
          Fine at small sizes, soft if you blow it up.
        </li>
      </ul>

      <h2>When you need an exact size</h2>
      <p>
        Job portals and government forms don't care about "quality levels". They say "under 50 KB" and reject
        anything bigger. For that, use <em>To an exact size</em> mode, which keeps resizing and re-compressing until the
        file fits. Here's what happened to the Pixel photo:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Target</th>
              <th>Result</th>
              <th>Dimensions</th>
              <th>Good for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20 KB</td>
              <td>20 KB</td>
              <td>277×370</td>
              <td>Form photos, ID-style pictures</td>
            </tr>
            <tr>
              <td>50 KB</td>
              <td>49 KB</td>
              <td>438×584</td>
              <td>Application photos, avatars</td>
            </tr>
            <tr>
              <td>100 KB</td>
              <td>97 KB</td>
              <td>620×826</td>
              <td>Small web images, documents</td>
            </tr>
            <tr>
              <td>200 KB</td>
              <td>196 KB</td>
              <td>876×1168</td>
              <td>Email, listings</td>
            </tr>
            <tr>
              <td>500 KB</td>
              <td>498 KB</td>
              <td>1386×1848</td>
              <td>Websites, sharing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The iPhone and Samsung photos landed on almost exactly the same dimensions at each target, so the table works
        as a general guide for 12 MP photos. Even the 20 KB version was perfectly recognisable at the size a form would
        display it. There are ready-made pages for the common limits:{' '}
        <Link to="/compress-image-to-20kb">20 KB</Link>, <Link to="/compress-image-to-50kb">50 KB</Link>,{' '}
        <Link to="/compress-image-to-100kb">100 KB</Link> and <Link to="/compress-image-to-200kb">200 KB</Link>. Our
        guide to <Link to="/blog/photo-size-for-online-forms">photos for online forms</Link> covers the tricks that make
        tiny files look better.
      </p>

      <h2>JPG, PNG or WebP?</h2>
      <p>The format matters as much as the setting:</p>
      <ul>
        <li>
          <strong>JPG</strong> is built for photos. It's what every phone and every upload form understands, so it's
          the safe choice.
        </li>
        <li>
          <strong>PNG</strong> is lossless and suits screenshots, logos and anything with sharp edges or transparency.
          For photos it's a poor fit: the Pixel photo saved as PNG was 20.94 MB, and simply{' '}
          <Link to="/png-to-jpg">converting it back to JPG</Link> made it 3.46 MB at full size. Compressing it as PNG
          with <em>Web Optimized</em> got it to 551 KB, but only by shrinking it to 859×1145. On the other hand, a
          screenshot of a text-heavy web page came out 11% <em>bigger</em> as JPG, because PNG handles sharp text better.
        </li>
        <li>
          <strong>WebP</strong> makes smaller files than JPG at the same quality and works in all modern browsers, which
          makes it great for websites. Some upload forms and older apps still reject it, so{' '}
          <Link to="/webp-to-jpg">convert WebP to JPG</Link> when a form complains.
        </li>
      </ul>
      <p>
        One warning about PNG to JPG: JPG has no transparency. Transparent areas become white, which is fine for photos
        but not for a logo you want to place on a coloured background.
      </p>

      <h2>Mistakes that make photos look worse</h2>
      <ul>
        <li>
          <strong>Compressing the same photo again and again.</strong> Every JPG save loses a little. Always go back to
          the original rather than re-compressing a compressed copy.
        </li>
        <li>
          <strong>Enlarging a small image.</strong> Making a 400-pixel photo bigger doesn't add detail. It just makes
          the blur more obvious and the file larger.
        </li>
        <li>
          <strong>Choosing quality over size when the limit is strict.</strong> For a 50 KB limit, a smaller image with
          decent quality looks better than a big image squeezed to the point of blocky artifacts. The exact-size mode
          makes that trade for you.
        </li>
        <li>
          <strong>Forgetting to crop.</strong> If only the face matters, crop first. The pixels you keep get more of the
          byte budget.
        </li>
      </ul>

      <h2>iPhone photos (HEIC)</h2>
      <p>
        Recent iPhones save photos as HEIC rather than JPG. Many websites and Windows PCs can't open those, and most
        browsers can't compress them directly either. Convert them first with the{' '}
        <Link to="/heic-to-jpg">HEIC to JPG converter</Link>, then compress the JPG. Our{' '}
        <Link to="/blog/heic-vs-jpg">HEIC vs JPG test</Link> explains why the JPG comes out bigger than the HEIC.
      </p>

      <h2>FAQ</h2>
      <h3>Can you really compress an image without losing quality?</h3>
      <p>
        Without <em>visible</em> loss, yes. In our test, High Quality removed 70–76% of each file with no difference we
        could see on screen. Without <em>any</em> loss, only lossless formats like PNG manage that, and the savings are
        much smaller.
      </p>
      <h3>Are my photos uploaded?</h3>
      <p>No. Compression runs in your browser, so photos stay on your device.</p>
      <h3>Does compression remove location data?</h3>
      <p>
        Yes, in our tests the compressed files contained no EXIF metadata, including GPS location. Keep the original if
        you need that information.
      </p>
      <h3>Can I compress several images at once?</h3>
      <p>Yes. Drop in multiple files and download them individually or as a ZIP.</p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/compress-jpg"
        ctaLabel="Compress an image now"
        title="How to Compress Images Without Losing Quality: Real Results From 3 Phone Photos"
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
export default CompressImagesGuide;
