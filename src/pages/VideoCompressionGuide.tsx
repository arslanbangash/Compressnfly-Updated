import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const VideoCompressionGuide = () => {
  const content = (
    <>
      <p>
        Video is the one file type where "just compress it" can go badly wrong. Push the settings too far and you get
        smeared faces and blocky shadows. Push them the wrong way and the "compressed" file comes out{' '}
        <em>bigger</em> than the original, which happened in our own test below.
      </p>
      <p>
        This guide gives you the one formula that predicts video file size, real results from re-encoding a clip at
        different settings, and the exact HandBrake settings to use when you need a video under a specific size.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Video size = bitrate × length. Cutting the length is the most effective compression there is.</li>
          <li>For a smaller file with good quality, use H.264 with a quality setting (RF/CRF) of 23–28.</li>
          <li>Lowering resolution (1080p → 720p) cuts size a lot and is barely noticeable on a phone screen.</li>
        </ul>
      </div>

      <h2>The formula that explains every video file</h2>
      <p>
        A video's size depends on two things: how many bits it uses per second (the <strong>bitrate</strong>) and how
        many seconds it lasts. Resolution, frame rate and codec only matter because they change the bitrate you need for
        good quality.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Total bitrate</th>
              <th>Size per minute</th>
              <th>Typical use</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1 Mbps</td><td>7.5 MB</td><td>Small 480p clips, screen recordings</td></tr>
            <tr><td>2.5 Mbps</td><td>19 MB</td><td>Good-looking 720p</td></tr>
            <tr><td>5 Mbps</td><td>38 MB</td><td>Good-looking 1080p</td></tr>
            <tr><td>10 Mbps</td><td>75 MB</td><td>High-quality 1080p</td></tr>
            <tr><td>20 Mbps</td><td>150 MB</td><td>Phone-camera 1080p, or 4K for sharing</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        (Megabytes in this table are 1,000,000 bytes: 1 Mbps × 60 seconds = 60 megabits = 7.5 megabytes. The test results below use the sizes your computer shows.)
      </p>
      <p>
        Phone cameras record at high bitrates so they capture motion cleanly the first time, which is why a short clip
        can run to hundreds of megabytes. On an iPhone, <strong>Settings → Camera → Record Video</strong> shows the
        approximate size of a minute of video for each option, which makes the trade-off easy to see.
      </p>

      <h2>Our test: re-encoding one clip at different settings</h2>
      <p>
        We took a 60-second clip of the open-source animated film <em>Big Buck Bunny</em> (640×360, H.264, 5.26 MB) and
        re-encoded it with x264, the same H.264 encoder that HandBrake uses. To measure quality we used SSIM, a standard
        score where 1.000 means identical to the source and anything above about 0.98 is very hard to tell apart by eye.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Setting</th>
              <th>File size</th>
              <th>vs original</th>
              <th>Quality (SSIM)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Original</td><td>5.26 MB</td><td>—</td><td>1.000</td></tr>
            <tr><td>H.264, CRF 18</td><td>7.80 MB</td><td><strong>+48%</strong></td><td>0.993</td></tr>
            <tr><td>H.264, CRF 23 (default)</td><td>4.94 MB</td><td>−6%</td><td>0.987</td></tr>
            <tr><td>H.264, CRF 28</td><td>3.08 MB</td><td>−41%</td><td>0.972</td></tr>
            <tr><td>H.264, CRF 32</td><td>2.09 MB</td><td>−60%</td><td>0.950</td></tr>
            <tr><td>H.264, CRF 23, scaled to 240p</td><td>2.96 MB</td><td>−44%</td><td>0.951</td></tr>
            <tr><td>H.265, CRF 28</td><td>3.24 MB</td><td>−38%</td><td>0.972</td></tr>
          </tbody>
        </table>
      </div>
      <p>What this taught us:</p>
      <ol>
        <li>
          <strong>"High quality" re-encoding can make a file bigger.</strong> CRF 18 grew the clip by 48%. The original
          was already compressed, so the encoder spent extra bits faithfully copying its existing blur and artifacts.
          If a video is already a reasonable size, re-encoding it at high quality is pointless.
        </li>
        <li>
          <strong>CRF 28 is the sweet spot for shrinking.</strong> 41% smaller, with a quality score still above 0.97.
          Watching it normally, the difference was hard to spot.
        </li>
        <li>
          <strong>Every step costs more quality.</strong> CRF 32 saved more, but it softened detail noticeably in
          darker scenes.
        </li>
        <li>
          <strong>H.265 isn't magic on small videos.</strong> On this low-resolution clip it was no smaller than H.264
          at the same quality. Its advantage shows up mainly at 1080p and 4K, and some older devices and websites can't
          play it, so H.264 is the safer choice for sharing.
        </li>
      </ol>

      <h2>How to hit a size limit exactly</h2>
      <p>
        When a video must fit under a limit, like a 25 MB email attachment, work backward from the formula:
      </p>
      <p>
        <strong>Video bitrate (kbps) = limit in MB × 8,000 ÷ length in seconds − audio bitrate</strong>
      </p>
      <p>
        Then take about 10% off for safety, since container overhead and the email encoding trap described in our{' '}
        <Link to="/blog/file-size-importance">file size limits guide</Link> both add size.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Video length</th>
              <th>Max video bitrate for 25 MB*</th>
              <th>Resolution that looks decent</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>30 seconds</td><td>~5,900 kbps</td><td>1080p</td></tr>
            <tr><td>1 minute</td><td>~2,880 kbps</td><td>720p</td></tr>
            <tr><td>2 minutes</td><td>~1,380 kbps</td><td>480p–720p</td></tr>
            <tr><td>5 minutes</td><td>~480 kbps</td><td>360p, or share a link instead</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        *With 128 kbps audio and a 10% safety margin. For a different limit, put your own number into the formula.
      </p>
      <p>
        Past about 5 minutes, email simply isn't the right tool. Upload the video to Google Drive, OneDrive or YouTube
        (unlisted) and send the link.
      </p>

      <h2>Step by step in HandBrake (free, Windows/Mac/Linux)</h2>
      <h3>To make a video smaller with good quality</h3>
      <ol>
        <li>Open the video in HandBrake.</li>
        <li>
          Pick a preset from the <em>General</em> list: <strong>Fast 720p30</strong> for sharing, or{' '}
          <strong>Fast 1080p30</strong> if you need full HD.
        </li>
        <li>
          On the <em>Video</em> tab, keep the encoder on <strong>H.264 (x264)</strong> and set{' '}
          <strong>Constant Quality</strong> to RF 24–28. Higher numbers mean smaller files.
        </li>
        <li>On the <em>Audio</em> tab, AAC at 128 kbps is plenty for most videos.</li>
        <li>Choose where to save and click <em>Start Encode</em>.</li>
      </ol>
      <h3>To hit a specific size</h3>
      <ol>
        <li>Calculate the video bitrate with the formula above.</li>
        <li>
          On the <em>Video</em> tab, choose <strong>Avg Bitrate (kbps)</strong> instead of Constant Quality and enter
          your number.
        </li>
        <li>
          Tick <strong>Multi-Pass Encoding</strong>. It takes twice as long but spreads the bits much more evenly, so
          fast scenes don't fall apart.
        </li>
      </ol>

      <h2>Three easier wins before you compress</h2>
      <ul>
        <li>
          <strong>Trim it.</strong> Cutting a 2-minute clip to the 40 seconds that matter shrinks it by two-thirds with
          zero quality loss. Both iPhone and Android galleries have a trim tool in the editor.
        </li>
        <li>
          <strong>Record smaller in the first place.</strong> If you're filming something just to send, 1080p at 30 fps
          is plenty. 4K at 60 fps creates huge files you'll only need to shrink later.
        </li>
        <li>
          <strong>Drop the audio if it isn't needed.</strong> For screen recordings and silent demos, removing the audio
          track saves a little and avoids background noise.
        </li>
      </ul>

      <h2>Why Compressnfly doesn't compress video (yet)</h2>
      <p>
        Compressnfly does everything inside your browser so your files are never uploaded. That works brilliantly for
        images, PDFs and documents. Video encoding is far heavier: a phone video can take many minutes to re-encode in a
        browser tab and use a lot of memory. Rather than offer a slow, unreliable video tool, we recommend HandBrake,
        which is free, runs on your own computer and is also private. For everything else, the{' '}
        <Link to="/">Compressnfly compressor</Link> is a click away.
      </p>

      <h2>FAQ</h2>
      <h3>What's the best video format for sharing?</h3>
      <p>MP4 with H.264 video and AAC audio. Virtually every phone, computer, browser and app can play it.</p>
      <h3>Does WhatsApp compress videos?</h3>
      <p>
        Yes, videos sent the normal way are compressed by WhatsApp. To send the original quality, send it as a
        document instead.
      </p>
      <h3>What does CRF or RF mean?</h3>
      <p>
        It's a quality target: the encoder uses whatever bitrate each scene needs to reach that quality. Lower numbers
        mean better quality and bigger files. About 6 steps roughly doubles or halves the size.
      </p>
      <h3>Will compressing a video twice make it worse?</h3>
      <p>
        Yes. Each lossy encode loses a little more detail, so always compress from the original file.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/blog/file-size-importance"
        ctaLabel="See email and upload size limits"
        title="How to Compress a Video Without Ruining It: Settings That Actually Work"
        content={content}
        category="Tutorial"
        readTime="8 min read"
        date="2026-04-05"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default VideoCompressionGuide;
