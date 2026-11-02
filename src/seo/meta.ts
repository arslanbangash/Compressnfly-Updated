// Single source of truth for every indexable page:
// used for <title>/meta/canonical, the generated sitemap, and prerendering.
// To add a page: add a Route in App.tsx AND an entry here.
// Tool pages are added automatically from src/tools/toolPages.ts.

import { toolPages } from "@/tools/toolPages";

export const SITE_URL = "https://compressnfly.com";
export const SITE_NAME = "Compressnfly";
export const CONTACT_EMAIL = "compressnfly@outlook.com";

export interface PageMeta {
  title: string;
  description: string;
  type?: "website" | "article" | "tool";
  /** Short name used in breadcrumbs */
  name?: string;
  /** ISO date, articles only */
  datePublished?: string;
  /** ISO date; used for sitemap lastmod and Article schema */
  dateModified?: string;
  /** sitemap priority, 0.0–1.0 */
  priority?: number;
}

export const pages: Record<string, PageMeta> = {
  "/": {
    title: "Free Online File Compressor — PDF, Images & ZIP | Compressnfly",
    description:
      "Compress PDFs, JPG, PNG and other files online for free. Everything runs in your browser — your files are never uploaded. No sign-up, no watermark.",
    priority: 1.0,
    dateModified: "2026-10-14",
  },
  "/blog": {
    title: "File Compression Guides & Tips | Compressnfly Blog",
    description:
      "Practical guides for shrinking PDFs, images and documents: email size limits, quality settings, and fixes for files that are too large.",
    priority: 0.8,
    dateModified: "2026-10-14",
  },
  "/blog/heic-vs-jpg": {
    title: "HEIC vs JPG: Why iPhone Photos Won't Open and How to Fix It",
    description:
      "What HEIC is, where it fails, and what happens when you convert real iPhone photos to JPG and PNG — plus 4 ways to stop HEIC causing problems.",
    type: "article",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/photo-size-for-online-forms": {
    title: "How to Get a Photo Under 20 KB, 50 KB or 100 KB for Online Forms",
    description:
      "What each size limit looks like on a real phone photo, how to keep small photos sharp, signatures and document scans, and fixes for common upload errors.",
    type: "article",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/compress-pdf-for-email": {
    title: "How to Compress a PDF for Email (Gmail 25MB, Outlook 20MB)",
    description:
      "PDF too big to email? Learn why attachments bounce even under 25MB, and compress yours to fit Gmail and Outlook in seconds — free, no upload.",
    type: "article",
    datePublished: "2026-08-30",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/compress-pdf-without-losing-quality": {
    title: "How to Compress a PDF Without Losing Quality (Tested on 3 PDFs)",
    description:
      "We compressed a text PDF, a photo report and a scanned contract. See the real sizes, what stays sharp, and how small a scan can get and still be readable.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/compress-images-online": {
    title: "How to Compress Images Without Losing Quality (Real Tests)",
    description:
      "Real results from three phone photos at every setting: file sizes, pixel dimensions, and which size to use for email, websites, printing and forms.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/reduce-word-document-file-size": {
    title: "How to Reduce Word Document File Size: 7 Methods (Real Results)",
    description:
      "Find what's bloating your .docx in 10 seconds, then fix it. A 9.46 MB report shrank to 384 KB with formatting untouched. 7 methods, tested.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/why-is-my-file-so-large": {
    title: "Why Is My File So Large? How to Find the Cause and Fix It",
    description:
      "How big files should be, a 10-second check that reveals what's bloating Word and PowerPoint files, and the real causes behind huge PDFs and photos.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/compress-files-online-free": {
    title: "Compress Files Online Free — No Signup, No Upload",
    description:
      "Real results for every file type: photos, PDFs, Word files, CSVs and ZIPs. Free, no account, and files are compressed in your browser, never uploaded.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-11-02",
    priority: 0.7,
  },
  "/blog/pdf-compression-guide": {
    title: "How to Reduce PDF File Size on Windows, Mac, iPhone and Android",
    description:
      "What's built into each device for shrinking PDFs (and what isn't), where Mac Preview falls short, and the method that works everywhere.",
    type: "article",
    datePublished: "2026-01-20",
    dateModified: "2026-11-02",
    priority: 0.6,
  },
  "/blog/file-compression-guide": {
    title: "File Compression Explained: What Shrinks and What Doesn't",
    description:
      "Why a CSV shrinks 84% but a ZIP of photos shrinks 0.2%. Lossless vs lossy compression, tested on real files, and the right method for each file type.",
    type: "article",
    datePublished: "2026-02-15",
    dateModified: "2026-11-02",
    priority: 0.6,
  },
  "/blog/file-size-importance": {
    title: "File Size Limits for Email, WhatsApp and Upload Forms",
    description:
      "Gmail, Outlook, Yahoo and WhatsApp limits, why a 20 MB file can bounce, the 1,000 vs 1,024 KB trap, and target sizes that work.",
    type: "article",
    datePublished: "2026-03-10",
    dateModified: "2026-11-02",
    priority: 0.5,
  },
  "/blog/video-compression-guide": {
    title: "How to Compress a Video Without Ruining It (Settings That Work)",
    description:
      "The formula that predicts video file size, real results from re-encoding a clip at different settings, and HandBrake steps to fit any size limit.",
    type: "article",
    datePublished: "2026-04-05",
    dateModified: "2026-11-02",
    priority: 0.5,
  },
  "/blog/audio-compression-guide": {
    title: "Audio Formats Explained: MP3 vs AAC vs FLAC vs WAV (Exact Sizes)",
    description:
      "Exact file sizes per minute for WAV, FLAC, MP3, AAC and Opus, which format to use for music, podcasts and voice, and mistakes to avoid.",
    type: "article",
    datePublished: "2026-05-01",
    dateModified: "2026-11-02",
    priority: 0.5,
  },
  "/about": {
    title: "About Compressnfly — Private, Browser-Based File Compression",
    description:
      "Who builds Compressnfly, why it compresses files in your browser instead of uploading them, and how the tool works.",
    priority: 0.4,
    dateModified: "2026-10-14",
  },
  "/contact": {
    title: "Contact Compressnfly",
    description:
      "Questions, bug reports or feature requests for Compressnfly? Get in touch by email — we read every message.",
    priority: 0.3,
    dateModified: "2026-10-14",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Compressnfly",
    description:
      "How Compressnfly handles your data: files are processed in your browser and never uploaded. Details on analytics, cookies and advertising.",
    priority: 0.2,
    dateModified: "2026-10-14",
  },
  "/terms": {
    title: "Terms of Use | Compressnfly",
    description: "The terms that apply when you use Compressnfly's free online file compression tools.",
    priority: 0.2,
    dateModified: "2026-10-14",
  },
};

// Tool pages rank highest after the homepage: they're what people search for.
for (const t of toolPages) {
  pages[t.path] = {
    title: t.title,
    description: t.description,
    type: "tool",
    name: t.name,
    priority: 0.9,
    dateModified: "2026-10-14",
  };
}

export const notFoundMeta: PageMeta = {
  title: "Page Not Found | Compressnfly",
  description: "This page doesn't exist. Head back to Compressnfly to compress your files for free.",
};
