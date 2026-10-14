import { Link } from "react-router-dom";
import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/seo/meta";

const About = () => (
  <InfoPage title="About Compressnfly">
    <p>
      Compressnfly is a free online file compressor for PDFs, images and other everyday files. It's built and
      maintained by <strong>AZM Developers</strong>, an independent developer studio based in Pakistan that makes
      web tools and mobile apps.
    </p>

    <h2>Why we built it</h2>
    <p>
      Most "free" compression sites upload your file to their servers to process it. That's a problem when the file
      is a contract, an invoice, a passport scan or a payslip. Compressnfly was built so that nothing has to leave
      your device: you pick a file, it's compressed right there in your browser, and you download the result.
    </p>

    <h2>How it works</h2>
    <p>
      When you open Compressnfly, your browser downloads the compression code once. From then on all the work
      happens locally on your computer or phone:
    </p>
    <ul>
      <li>
        <strong>Images</strong> are re-encoded and resized in the browser to cut file size while keeping them
        looking the same on screen.
      </li>
      <li>
        <strong>PDFs</strong> are rebuilt with open-source PDF tooling to strip unneeded data and shrink embedded
        images.
      </li>
      <li>
        <strong>Other files</strong> can be packed into a compressed ZIP archive.
      </li>
    </ul>
    <p>
      Because no upload is involved, compression is usually faster than server-based tools, and there's no queue,
      account or file-size paywall.
    </p>

    <h2>What we're working on</h2>
    <p>
      We're adding more targeted tools — for example compressing an image to an exact size like 100KB for online
      forms — and writing practical guides in our <Link to="/blog">blog</Link>.
    </p>

    <h2>Get in touch</h2>
    <p>
      Found a bug, or need a format we don't support yet? Email us at{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact">contact page</Link>.
    </p>
  </InfoPage>
);

export default About;
