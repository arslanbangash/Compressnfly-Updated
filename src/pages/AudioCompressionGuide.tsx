import { Link } from 'react-router-dom';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';

const AudioCompressionGuide = () => {
  const content = (
    <>
      <p>
        WAV, FLAC, MP3, AAC, Opus. Audio formats come with a lot of jargon, but choosing between them comes down to two
        questions: do you need a perfect copy, and how much space or bandwidth do you have? This guide answers both,
        with exact file sizes for each format so you can see the trade-off in megabytes rather than marketing.
      </p>

      <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold text-foreground mb-2">The short answer</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>For recording and editing, use WAV. For archiving music, use FLAC (same quality, about half the size).</li>
          <li>For listening and sharing music, use AAC or MP3 at 192–256 kbps.</li>
          <li>For voice (podcasts, lectures, voice notes), mono at 64–96 kbps is plenty.</li>
        </ul>
      </div>

      <h2>Exact sizes: one minute of audio in each format</h2>
      <p>
        For constant-bitrate audio, file size comes straight from the bitrate: kilobits per second × 60 ÷ 8. So these
        numbers aren't estimates. They're what you'll actually get (plus a few kilobytes of metadata).
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Format and setting</th>
              <th>Bitrate</th>
              <th>Per minute</th>
              <th>4-minute song</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>WAV, CD quality (16-bit, 44.1 kHz, stereo)</td><td>1,411 kbps</td><td>10.6 MB</td><td>42.3 MB</td></tr>
            <tr><td>FLAC (lossless)</td><td>varies</td><td>~5–7 MB</td><td>~20–30 MB</td></tr>
            <tr><td>MP3 320 kbps</td><td>320 kbps</td><td>2.4 MB</td><td>9.6 MB</td></tr>
            <tr><td>AAC 256 kbps</td><td>256 kbps</td><td>1.9 MB</td><td>7.7 MB</td></tr>
            <tr><td>MP3 192 kbps</td><td>192 kbps</td><td>1.4 MB</td><td>5.8 MB</td></tr>
            <tr><td>MP3 128 kbps</td><td>128 kbps</td><td>0.96 MB</td><td>3.8 MB</td></tr>
            <tr><td>Voice, mono MP3 64 kbps</td><td>64 kbps</td><td>0.48 MB</td><td>1.9 MB</td></tr>
            <tr><td>Voice, Opus 32 kbps</td><td>32 kbps</td><td>0.24 MB</td><td>0.96 MB</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        MB = 1,000,000 bytes. FLAC's size depends on the music: quiet, simple recordings compress more than loud,
        dense ones, so treat its row as a typical range.
      </p>
      <p>
        The gap is huge. A WAV file is about 11 times the size of a 128 kbps MP3, and a 64 kbps voice recording is a
        twentieth of the WAV.
      </p>

      <h2>Lossless formats: perfect copies</h2>
      <h3>WAV (and AIFF on Mac)</h3>
      <p>
        Uncompressed audio: every sample stored as-is. It's what recording software and audio editors work with,
        because there's nothing to decode and no quality is ever lost when you save. The downside is size: 10.6 MB per
        minute at CD quality, and more at studio settings like 24-bit/48 kHz.
      </p>
      <h3>FLAC</h3>
      <p>
        FLAC compresses audio the way ZIP compresses a document: it finds patterns and stores them efficiently, and
        decoding gives back the <em>exact</em> original samples. Files are typically half to two-thirds the size of
        WAV, so it's the best format for archiving a music collection or ripped CDs. Most modern phones, computers and
        music apps play FLAC. Apple's equivalent is <strong>ALAC</strong> (Apple Lossless), which plays natively on
        iPhones and in Apple Music.
      </p>

      <h2>Lossy formats: small files that sound the same (mostly)</h2>
      <p>
        Lossy codecs remove sounds that human hearing is bad at noticing, such as very quiet sounds right next to loud
        ones and the highest frequencies. At a sensible bitrate, most people on most headphones can't tell the result
        from the original.
      </p>
      <h3>MP3</h3>
      <p>
        The format that plays absolutely everywhere, from old car stereos to smart TVs. At 192–320 kbps it sounds
        excellent. Below 128 kbps, cymbals and applause start to sound swishy.
      </p>
      <h3>AAC</h3>
      <p>
        MP3's more efficient successor: about the same quality at a lower bitrate. It's the standard for Apple devices,
        YouTube and most streaming. Files usually end in <code>.m4a</code>. If you're choosing today for music, AAC at
        256 kbps is a great default.
      </p>
      <h3>Opus</h3>
      <p>
        The most efficient of the three, especially for speech. It's what WhatsApp voice notes and many video-call apps
        use. Opus sounds clear at 24–32 kbps for voice. Support in older music players and car stereos is patchier, so
        use it for voice and web audio rather than a music library.
      </p>

      <h2>Which format for what</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Use</th>
              <th>Format</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Recording, editing, mixing</td><td>WAV</td><td>No quality lost on each save</td></tr>
            <tr><td>Archiving music, ripped CDs</td><td>FLAC or ALAC</td><td>Perfect quality at about half the size</td></tr>
            <tr><td>Music on your phone</td><td>AAC 256 or MP3 192–320</td><td>Sounds like the original, fraction of the space</td></tr>
            <tr><td>Podcasts and lectures</td><td>MP3 mono 64–96 kbps</td><td>Voice needs far less data than music</td></tr>
            <tr><td>Sending a voice recording</td><td>Opus or AAC, mono</td><td>Tiny files, clear speech</td></tr>
            <tr><td>Maximum compatibility</td><td>MP3</td><td>Plays on literally everything</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Three mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Converting MP3 to FLAC or WAV "to improve quality".</strong> The detail removed by MP3 is gone for
          good. You get a file several times bigger that sounds exactly like the MP3.
        </li>
        <li>
          <strong>Re-compressing lossy files.</strong> Turning a 320 kbps MP3 into a 128 kbps AAC stacks two rounds of
          loss. Always convert from the best source you have.
        </li>
        <li>
          <strong>Using stereo for voice.</strong> A single person speaking doesn't need two channels. Exporting voice
          as mono halves the bitrate you need for the same clarity.
        </li>
      </ul>

      <h2>How to convert or shrink audio for free</h2>
      <p>
        <strong>Audacity</strong> (free, Windows/Mac/Linux) handles almost everything. Open your file, choose{' '}
        <em>File → Export Audio</em>, pick the format (MP3, FLAC, WAV, Ogg/Opus and more), set the bitrate or quality,
        and export. For voice, use <em>Tracks → Mix → Mix Stereo Down to Mono</em> first.
      </p>
      <p>
        If you just need to make an audio file smaller to send it, lowering the bitrate is the whole trick. A
        10-minute recording at 64 kbps mono is under 5 MB, small enough for any email.
      </p>
      <p>
        Compressnfly focuses on images, PDFs and documents, which can be processed quickly and privately inside your
        browser. For those, the <Link to="/">file compressor</Link> and our{' '}
        <Link to="/blog/file-compression-guide">guide to what compresses and what doesn't</Link> are good places to
        start. Our <Link to="/blog/video-compression-guide">video compression guide</Link> covers video.
      </p>

      <h2>FAQ</h2>
      <h3>Can people really hear the difference between FLAC and MP3?</h3>
      <p>
        At 256–320 kbps, most listeners can't reliably tell them apart in blind tests, especially through Bluetooth,
        which applies its own compression anyway. At 128 kbps, trained ears and good headphones often can.
      </p>
      <h3>Why is my audio file so large?</h3>
      <p>
        It's almost certainly WAV or another uncompressed format, at around 10 MB per minute. Exporting it as AAC or
        MP3 cuts it by 80–90%.
      </p>
      <h3>Does zipping an MP3 make it smaller?</h3>
      <p>
        Barely. MP3s are already compressed, just like the photos in our{' '}
        <Link to="/blog/file-compression-guide">ZIP test</Link>, which shrank by 0.2%.
      </p>
    </>
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPost
        ctaHref="/blog/file-compression-guide"
        ctaLabel="What compresses and what doesn't"
        title="Audio Formats Explained: MP3 vs AAC vs FLAC vs WAV (With Exact File Sizes)"
        content={content}
        category="Guide"
        readTime="7 min read"
        date="2026-05-01"
        updated="2026-11-02"
        author="Compressnfly Team"
      />
    </div>
  );
};

export default AudioCompressionGuide;
