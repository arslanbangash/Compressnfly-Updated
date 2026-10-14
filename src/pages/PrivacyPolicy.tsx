import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/seo/meta";

const PrivacyPolicy = () => (
  <InfoPage title="Privacy Policy" updated="October 14, 2026">
    <p>
      This policy explains what information Compressnfly ("we", "us") collects when you use compressnfly.com, how
      it's used, and the choices you have.
    </p>

    <h2>Your files never leave your device</h2>
    <p>
      All compression happens inside your web browser. The files you select are read and processed locally on your
      device and are <strong>not uploaded</strong> to our servers or anyone else's. We never see, store or have access
      to the contents of your files. When you close or refresh the page, the processed files are gone from memory.
    </p>

    <h2>Information collected automatically</h2>
    <p>
      We use <strong>Google Analytics</strong> to understand how the site is used — for example which pages are
      visited, how long visits last, the type of device and browser, and the approximate country or city (derived
      from your IP address). Google Analytics uses cookies and similar technologies to collect this information. It
      does not tell us who you are, and it does not receive your files.
    </p>
    <p>
      You can learn how Google uses this data at{" "}
      <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
        How Google uses information from sites that use its services
      </a>
      , and you can opt out with the{" "}
      <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
        Google Analytics opt-out browser add-on
      </a>
      .
    </p>

    <h2>Advertising and cookies</h2>
    <p>
      We may show ads served by <strong>Google AdSense</strong> to keep Compressnfly free. Third-party vendors,
      including Google, use cookies to serve ads based on your previous visits to this website and other websites.
      Google's use of advertising cookies enables it and its partners to serve ads to you based on those visits.
    </p>
    <p>
      You can opt out of personalised advertising by visiting{" "}
      <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
        Google Ads Settings
      </a>
      , or opt out of some third-party vendors' use of cookies for personalised advertising at{" "}
      <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
        www.aboutads.info
      </a>
      . Where required by law (for example in the EEA and UK), we ask for your consent before personalised ads or
      non-essential cookies are used.
    </p>

    <h2>Information stored in your browser</h2>
    <p>
      We store your light/dark theme preference in your browser's local storage so the site remembers it. This stays
      on your device and is not sent to us.
    </p>

    <h2>If you contact us</h2>
    <p>
      If you email us, we receive your email address and whatever you include in your message. We use it only to
      reply to you and to improve the site, and we don't sell or share it.
    </p>

    <h2>Children</h2>
    <p>
      Compressnfly is a general-audience tool and is not directed at children under 13. We do not knowingly collect
      personal information from children.
    </p>

    <h2>Your rights</h2>
    <p>
      Depending on where you live, you may have the right to access, correct or delete personal data about you, or
      to object to its processing. Because we don't receive your files and analytics data is held by Google, the
      quickest options are usually the opt-out tools linked above. For anything else, email us and we'll help.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      If we change this policy, we'll update the "Last updated" date at the top of this page. Significant changes
      will be noted on the site.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about this policy: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </p>
  </InfoPage>
);

export default PrivacyPolicy;
