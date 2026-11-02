import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const FileSizeImportance = () => {
  const content = (
    <>
      <p>
        Storage is cheap and internet is fast, so why does file size still cause so much trouble? Because the limits
        that matter aren't on your phone or laptop. They're set by email servers, upload forms and messaging apps, and
        they haven't grown at anything like the speed of camera resolutions.
      </p>
      <p>
        This page collects the limits you're most likely to run into, explains a couple of traps that catch people
        out, and gives you target sizes that work.
      </p>

      <h2>The limits you'll actually hit</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Where</th>
              <th>Limit</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gmail (personal)</td>
              <td>25 MB</td>
              <td>For all attachments combined. Above that, Gmail offers a Google Drive link instead.</td>
            </tr>
            <tr>
              <td>Yahoo Mail</td>
              <td>25 MB</td>
              <td>Total size of the message.</td>
            </tr>
            <tr>
              <td>Outlook desktop app (personal/IMAP accounts)</td>
              <td>20 MB</td>
              <td>Microsoft's default for internet email accounts.</td>
            </tr>
            <tr>
              <td>Work email (Exchange / Microsoft 365)</td>
              <td>Often 10–35 MB</td>
              <td>Set by your IT team, and the receiving company may have a lower limit than yours.</td>
            </tr>
            <tr>
              <td>WhatsApp documents</td>
              <td>Up to 2 GB</td>
              <td>Photos sent the normal way are compressed by WhatsApp; send as a document to keep the original.</td>
            </tr>
            <tr>
              <td>Job portals and government forms</td>
              <td>Often 20 KB–2 MB</td>
              <td>Photos and signatures usually 20–100 KB; document scans 200 KB–2 MB.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Limits change, and company and university accounts often set their own. If an email bounces, the error message
        usually states the exact limit.
      </p>

      <h2>Trap 1: your 20 MB file is really 27 MB in an email</h2>
      <p>
        Email was designed for text, so attachments are converted to text before sending, using an encoding called
        Base64. That conversion turns every 3 bytes into 4 characters, making the attachment about{' '}
        <strong>33% bigger</strong> on its way through the mail system.
      </p>
      <p>
        Many mail services account for this and show you the original size, but some servers check the encoded size.
        This is why an 18 MB PDF can bounce from a server with a 20 MB limit, and why the sender is left confused
        because "it was under the limit". The safe habit: <strong>keep attachments to about 70% of the stated
        limit</strong>. For a 20 MB limit, aim for 14 MB or less. For a 10 MB work server, aim for 7 MB.
      </p>
      <p>
        Our guide to <Link to="/blog/compress-pdf-for-email">compressing a PDF for email</Link> walks through this
        step by step.
      </p>

      <h2>Trap 2: "50 KB" doesn't always mean the same thing</h2>
      <p>
        A kilobyte can mean 1,000 bytes or 1,024 bytes, depending on who's counting. A file of 50,500 bytes is 49.3 KB
        by one measure and 50.5 KB by the other, so it can be "under 50 KB" on your computer and "too large" on the
        form.
      </p>
      <p>
        When a form's limit is strict, aim a little lower: <strong>45 KB for a 50 KB limit, 90 KB for 100 KB</strong>.
        On Compressnfly's exact-size mode you can type any custom number, so just enter the lower figure.
      </p>

      <h2>Why big files hurt websites</h2>
      <p>
        If you run a website, image weight is one of the main things that slows pages down, especially on mobile data.
        In our own test, a 4.16 MB phone photo compressed to 305 KB with Web Optimized, still sharp at full screen width
        on a laptop. That's about <strong>14 times less data</strong> for every visitor who loads the page.
      </p>
      <p>
        Visitors on a slow connection notice the difference immediately, and Google's page-experience signals measure
        how quickly the main content appears. A homepage with five uncompressed phone photos can easily weigh 20 MB;
        the same page with compressed images might be under 2 MB.
      </p>

      <h2>Storage and backups</h2>
      <p>
        Free cloud storage fills up fast with original-quality photos and scans. Compressed copies are worth keeping
        for things you only need to view: receipts, scanned forms, reference photos. Keep originals of anything you
        might print or edit later. One scanned 8-page contract in our tests went from 9.49 MB to 894 KB at a 1 MB
        target, still sharp on screen, so you could store ten compressed copies in the space of one original.
      </p>

      <h2>Target sizes that work</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Aim for</th>
              <th>Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photo on a job or government form</td>
              <td>The stated limit minus 10%</td>
              <td>
                <Link to="/compress-image-to-20kb">20 KB</Link> · <Link to="/compress-image-to-50kb">50 KB</Link> ·{' '}
                <Link to="/compress-image-to-100kb">100 KB</Link>
              </td>
            </tr>
            <tr>
              <td>Document scan for an upload portal</td>
              <td>40 KB+ per page if possible</td>
              <td>
                <Link to="/compress-pdf-to-200kb">200 KB</Link> · <Link to="/compress-pdf-to-500kb">500 KB</Link> ·{' '}
                <Link to="/compress-pdf-to-1mb">1 MB</Link>
              </td>
            </tr>
            <tr>
              <td>Email attachment</td>
              <td>About 70% of the limit</td>
              <td>
                <Link to="/compress-pdf">Compress PDF</Link> · <Link to="/compress-jpg">compress JPG</Link>
              </td>
            </tr>
            <tr>
              <td>Website photo</td>
              <td>100–300 KB</td>
              <td>
                <Link to="/compress-image-to-200kb">200 KB</Link> · <Link to="/jpg-to-webp">JPG to WebP</Link>
              </td>
            </tr>
            <tr>
              <td>Sharing with family or on social media</td>
              <td>300 KB–1 MB</td>
              <td>
                <Link to="/compress-image-to-500kb">500 KB</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When a file is too big to compress enough</h2>
      <p>Sometimes the honest answer is that compression isn't the right fix:</p>
      <ul>
        <li>
          <strong>Long videos</strong> won't fit in an email at any reasonable quality. Share a cloud link instead.
        </li>
        <li>
          <strong>Long scanned documents</strong> under a tiny limit get blurry. Check whether the form accepts several
          smaller uploads, or <Link to="/split-pdf">split the PDF</Link> and send it in parts.
        </li>
        <li>
          <strong>Files that need full quality</strong>, like artwork for printing, should go through a file-sharing
          service rather than be squeezed.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Why does my email say the file is too big when it's under 25 MB?</h3>
      <p>
        Either the encoding overhead pushed it over (see Trap 1), or the <em>recipient's</em> server has a lower limit
        than yours. Compressing to well under the limit fixes both.
      </p>
      <h3>Does WhatsApp reduce photo quality?</h3>
      <p>
        Photos sent the normal way are compressed by WhatsApp. If quality matters, send the photo as a document, or use
        the HD option where your app offers it.
      </p>
      <h3>How do I check a file's exact size?</h3>
      <p>
        On Windows, right-click the file and choose Properties. On a Mac, select it and press Cmd+I. Both show the
        size in bytes, which removes any doubt about the 1,000 vs 1,024 question.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/"
        ctaLabel="Shrink a file now"
        title="File Size Limits for Email, WhatsApp and Upload Forms (and How to Stay Under Them)"
        content={content}
        category="Guide"
        readTime="7 min read"
        date="2026-03-10"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default FileSizeImportance;
