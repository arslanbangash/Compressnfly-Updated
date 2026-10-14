import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/seo/meta";

const ContactPage = () => (
  <InfoPage title="Contact Us">
    <p>
      Questions, bug reports, feature requests or partnership enquiries — we'd like to hear from you. Email is the
      fastest way to reach us, and we aim to reply within 2 business days.
    </p>

    <div className="not-prose my-8 bg-card p-8 rounded-xl shadow-md text-center">
      <div className="text-primary mb-4 flex justify-center">
        <Mail size={40} />
      </div>
      <Button asChild>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </Button>
    </div>

    <h2>Reporting a problem</h2>
    <p>To help us fix it quickly, please include:</p>
    <ul>
      <li>The file type and roughly how large it was (please don't attach confidential files)</li>
      <li>The compression setting you chose</li>
      <li>Your browser and device (for example, Chrome on Android)</li>
      <li>What happened, and what you expected to happen</li>
    </ul>
  </InfoPage>
);

export default ContactPage;
