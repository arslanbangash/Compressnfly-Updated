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
  "/blog/compress-pdf-for-email": {
    title: "How to Compress a PDF for Email (Gmail 25MB, Outlook 20MB)",
    description:
      "PDF too big to email? Learn why attachments bounce even under 25MB, and compress yours to fit Gmail and Outlook in seconds — free, no upload.",
    type: "article",
    datePublished: "2026-08-30",
    dateModified: "2026-08-30",
    priority: 0.7,
  },
  "/blog/compress-pdf-without-losing-quality": {
    title: "How to Compress a PDF Without Losing Quality (2026 Guide)",
    description:
      "Why PDFs get huge and how to shrink one by up to 90% while keeping text sharp — free, private, and right in your browser.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-08-29",
    priority: 0.7,
  },
  "/blog/compress-images-online": {
    title: "How to Compress Images Online Without Losing Quality",
    description:
      "Shrink phone photos and JPG, PNG or WebP images by up to 90% while keeping them visually identical — all in your browser, no upload.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-08-29",
    priority: 0.7,
  },
  "/blog/reduce-word-document-file-size": {
    title: "How to Reduce Word Document File Size — 7 Methods That Work",
    description:
      "A 10-page Word file should be 100KB, not 80MB. Find and fix the hidden bloat with 7 methods, including a 30-second fix with no software.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-08-29",
    priority: 0.7,
  },
  "/blog/why-is-my-file-so-large": {
    title: "Why Is My File So Large? (And How to Fix It in 30 Seconds)",
    description:
      "Your document looks normal but is 75MB? The hidden causes of oversized PDFs, photos and documents — and the quick fix for each file type.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-08-29",
    priority: 0.7,
  },
  "/blog/compress-files-online-free": {
    title: "Compress Files Online Free — No Signup, No Upload",
    description:
      "Compress PDFs, images, documents and ZIPs for free with no account and no server uploads. Here's how browser-based compression works.",
    type: "article",
    datePublished: "2026-05-05",
    dateModified: "2026-08-29",
    priority: 0.7,
  },
  "/blog/pdf-compression-guide": {
    title: "How to Reduce PDF File Size for Free: Step-by-Step Guide",
    description:
      "The easiest way to compress PDF files online for free, with step-by-step instructions and tips for students and professionals.",
    type: "article",
    datePublished: "2026-01-20",
    dateModified: "2026-01-20",
    priority: 0.6,
  },
  "/blog/file-compression-guide": {
    title: "The Ultimate Guide to File Compression",
    description:
      "Everything you need to know about compressing files efficiently while keeping quality: lossy vs lossless, formats, and settings.",
    type: "article",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    priority: 0.6,
  },
  "/blog/file-size-importance": {
    title: "Why File Size Matters for Speed, Storage and Sharing",
    description:
      "How optimized file sizes improve page speed, user experience, email delivery and storage costs — and where to start.",
    type: "article",
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    priority: 0.5,
  },
  "/blog/video-compression-guide": {
    title: "Video Compression Best Practices",
    description:
      "Techniques for compressing video files without visible quality loss: codecs, bitrate, resolution and the settings that matter.",
    type: "article",
    datePublished: "2026-04-05",
    dateModified: "2026-04-05",
    priority: 0.5,
  },
  "/blog/audio-compression-guide": {
    title: "Audio Compression Formats Explained (MP3, AAC, FLAC & More)",
    description:
      "A plain-English comparison of audio compression formats and when to use each one for music, podcasts and voice recordings.",
    type: "article",
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
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
