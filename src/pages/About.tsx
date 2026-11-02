import { Link } from "react-router-dom";
import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/seo/meta";

const About = () => (
  <InfoPage title="About Compressnfly" updated="November 2, 2026">
    <p>
      Compressnfly is a free tool for making PDFs, photos and documents smaller, and for converting between common
      formats like HEIC, WebP, PNG and JPG. It's built and run by <strong>AZM Developers</strong>, an independent
      studio in Pakistan that makes web tools and mobile apps.
    </p>

    <h2>Why it exists</h2>
    <p>
      Compressnfly is built for a common problem: an online form that rejects a photo for being over 50KB, or a
      portal that won't take a scanned document over 1MB. Free tools exist, but most of them upload your file to
      their server to process it. That's not something you want to do with a
      passport scan, a CNIC copy, a contract or a bank statement.
    </p>
    <p>
      So Compressnfly does the work on your device. You pick a file, it's compressed in your browser, and you download
      the result. The file is never sent to us or anyone else.
    </p>

    <h2>How it works</h2>
    <p>
      When you open a tool, your browser downloads the code needed for that job. Everything after that happens
      locally on your computer or phone, using well-known open-source libraries:
    </p>
    <ul>
      <li>
        <strong>Photos</strong> are resized and re-encoded with the browser's own image engine and{" "}
        <em>browser-image-compression</em>. Exact-size mode searches for the largest, sharpest version that fits
        your limit.
      </li>
      <li>
        <strong>PDFs</strong> are cleaned up losslessly with <em>pdf-lib</em>. For scans, pages can be re-rendered
        with Mozilla's <em>pdf.js</em> at a lower resolution, and the tool tells you when it does this.
      </li>
      <li>
        <strong>iPhone HEIC photos</strong> are decoded with <em>heic-to</em> when your browser can't open them
        natively.
      </li>
      <li>
        <strong>Word, Excel and PowerPoint files</strong> have the pictures inside them re-compressed with{" "}
        <em>JSZip</em>; text and layout aren't touched.
      </li>
    </ul>
    <p>
      There's no account, no daily limit and no watermark, because there's no server doing the work and nothing to
      ration. Files can be up to 100MB each.
    </p>

    <h2>How we test tools and write guides</h2>
    <p>
      Every tool page and guide on this site is based on running the tools on real files, not on estimates. Our test
      set includes 12-megapixel photos from a Pixel 2, an iPhone 6 Plus and a Galaxy S7 Edge, real iPhone HEIC photos,
      a 19-page text PDF, a 9-page Word report with photos, and an 8-page contract saved the way scanning apps save
      pages. The sizes, dimensions and timings you see in the "We tested it" tables come from those runs, in Chrome on
      an ordinary laptop.
    </p>
    <p>
      Each guide shows the date it was last updated. If you spot something that's wrong or out of date, please tell
      us and we'll fix it.
    </p>

    <h2>What Compressnfly doesn't do</h2>
    <p>
      Video and audio aren't supported yet, because encoding them in a browser tab is too slow to be useful. Our{" "}
      <Link to="/blog/video-compression-guide">video</Link> and{" "}
      <Link to="/blog/audio-compression-guide">audio</Link> guides explain the best free tools for those instead.
      Compressnfly also doesn't add OCR (searchable text) to scans.
    </p>

    <h2>How the site is funded</h2>
    <p>
      Compressnfly is free to use and is supported by advertising. Ads never have access to your files, which stay on
      your device. See the <Link to="/privacy-policy">privacy policy</Link> for details on analytics and ads.
    </p>

    <h2>Get in touch</h2>
    <p>
      Found a bug, need a format we don't support, or have a form whose limits we should cover? Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact">contact page</Link>.
    </p>
  </InfoPage>
);

export default About;
