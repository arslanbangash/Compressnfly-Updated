import { Link } from "react-router-dom";
import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/seo/meta";

const Terms = () => (
  <InfoPage title="Terms of Use" updated="October 14, 2026">
    <p>
      By using compressnfly.com ("Compressnfly", "the service") you agree to these terms. If you don't agree, please
      don't use the service.
    </p>

    <h2>The service</h2>
    <p>
      Compressnfly provides free tools that compress files directly in your web browser. Files are processed on your
      own device and are not uploaded to us. See our <Link to="/privacy-policy">Privacy Policy</Link> for details.
    </p>

    <h2>Your files and your responsibility</h2>
    <ul>
      <li>You must have the right to use and modify any file you process with Compressnfly.</li>
      <li>
        Compression can reduce quality and, for some files, may not produce a usable result. Always keep your
        original file and check the compressed version before relying on it or deleting the original.
      </li>
      <li>You're responsible for how you use the files you create.</li>
    </ul>

    <h2>Acceptable use</h2>
    <p>
      Don't use Compressnfly for anything unlawful, to infringe anyone's rights, or in a way that interferes with the
      site — for example automated scraping or attempts to disrupt or break it.
    </p>

    <h2>No warranty</h2>
    <p>
      The service is provided "as is" and "as available", free of charge, without warranties of any kind. We don't
      guarantee that it will be uninterrupted, error-free, or that compressed files will meet any particular size or
      quality requirement.
    </p>

    <h2>Limitation of liability</h2>
    <p>
      To the fullest extent permitted by law, Compressnfly and AZM Developers are not liable for any loss of data,
      loss of profits, or indirect or consequential damages arising from your use of the service.
    </p>

    <h2>Third-party content and ads</h2>
    <p>
      The site may display ads and link to other websites. We're not responsible for the content or practices of
      third-party sites or advertisers.
    </p>

    <h2>Changes</h2>
    <p>
      We may update these terms or change the service at any time. Continued use after changes means you accept the
      updated terms.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </p>
  </InfoPage>
);

export default Terms;
