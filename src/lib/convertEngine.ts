/**
 * In-browser file conversion for Compressnfly.
 * Images: HEIC / AVIF / WebP / PNG / JPG / GIF / BMP → JPG, PNG or WebP
 * PDF: PDF → JPG/PNG pages, images → PDF, merge PDFs, split PDF
 *
 * Nothing here is uploaded anywhere. Heavy libraries (HEIC decoder, WebP
 * encoder, pdf.js, pdf-lib) are loaded on demand.
 */

import { canvasToBlob, loadPdfJs } from './media';

export type ImageFormat = 'jpg' | 'png' | 'webp';

export interface ConvertedFile {
  blob: Blob;
  filename: string;
  width?: number;
  height?: number;
  /** Page count, for PDF outputs */
  pages?: number;
}

const MIME: Record<ImageFormat, string> = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const QUALITY = 0.92;

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '') || 'file';
}

function isHeicFile(file: File): boolean {
  return /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
}

/** Decode any supported image (including HEIC) into an ImageBitmap. */
async function decodeImage(file: File): Promise<ImageBitmap> {
  if (isHeicFile(file)) {
    // Safari can often decode HEIC natively — try that first, it's instant.
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      const { heicTo } = await import('heic-to');
      try {
        return await heicTo({ blob: file, type: 'bitmap', options: { imageOrientation: 'from-image' } });
      } catch {
        throw new Error("This HEIC file couldn't be read. It may be damaged or use an unusual format.");
      }
    }
  }
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    const ext = file.name.split('.').pop()?.toUpperCase() ?? 'this';
    throw new Error(
      ext === 'AVIF'
        ? "Your browser can't open AVIF files. Update your browser or try Chrome, Edge or Firefox."
        : `Your browser can't open ${ext} files.`,
    );
  }
}

/** Encode a bitmap. JPG gets a white background (it has no transparency). */
async function encodeBitmap(bitmap: ImageBitmap, to: ImageFormat, quality = QUALITY): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d')!;
  if (to === 'jpg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0);

  try {
    const blob = await canvasToBlob(canvas, MIME[to], to === 'png' ? undefined : quality);
    // Some browsers (older Safari) silently return PNG when asked for WebP.
    if (to !== 'webp' || blob.type === 'image/webp') return blob;
    const { default: encodeWebp } = await import('@jsquash/webp/encode');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buf = await encodeWebp(data, { quality: Math.round(quality * 100) });
    return new Blob([buf], { type: 'image/webp' });
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
}

export async function convertImage(file: File, to: ImageFormat): Promise<ConvertedFile> {
  const bitmap = await decodeImage(file);
  try {
    const blob = await encodeBitmap(bitmap, to);
    return { blob, filename: `${baseName(file.name)}.${to}`, width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

// ─── PDF → images ────────────────────────────────────────────────────────────────

/** Render every page of a PDF. dpi 150 ≈ sharp on screen, 300 ≈ print quality. */
export async function pdfToImages(
  file: File,
  to: 'jpg' | 'png',
  dpi = 150,
  onPage?: (done: number, total: number) => void,
): Promise<ConvertedFile[]> {
  const pdfjs = await loadPdfJs();
  let doc;
  try {
    doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  } catch (e) {
    const msg = String((e as Error)?.name || e);
    throw new Error(/Password/i.test(msg) ? 'This PDF is password-protected. Remove the password first.' : "This PDF couldn't be opened.");
  }
  const out: ConvertedFile[] = [];
  const pad = String(doc.numPages).length;
  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const base = page.getViewport({ scale: 1 });
      // Cap very large pages so phones don't run out of memory.
      const scale = Math.min(dpi / 72, 6000 / Math.max(base.width, base.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, intent: 'print' }).promise;
      const blob = await canvasToBlob(canvas, MIME[to], to === 'jpg' ? QUALITY : undefined);
      out.push({
        blob,
        filename: `${baseName(file.name)}-page-${String(i).padStart(pad, '0')}.${to}`,
        width: canvas.width,
        height: canvas.height,
      });
      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
      onPage?.(i, doc.numPages);
    }
  } finally {
    await doc.destroy();
  }
  return out;
}

// ─── Images → PDF ────────────────────────────────────────────────────────────────

export type PageSize = 'fit' | 'a4' | 'letter';
const PAGE_POINTS: Record<Exclude<PageSize, 'fit'>, [number, number]> = { a4: [595.28, 841.89], letter: [612, 792] };

export async function imagesToPdf(files: File[], pageSize: PageSize = 'fit', outName = 'images'): Promise<ConvertedFile> {
  const { PDFDocument } = await import('pdf-lib');
  const pdf = await PDFDocument.create();

  for (const file of files) {
    // pdf-lib embeds JPG and PNG directly; everything else is converted to JPG first.
    const isJpg = /\.(jpe?g)$/i.test(file.name) || file.type === 'image/jpeg';
    const isPng = /\.png$/i.test(file.name) || file.type === 'image/png';
    let bytes: ArrayBuffer;
    let kind: 'jpg' | 'png';
    if (isJpg || isPng) {
      bytes = await file.arrayBuffer();
      kind = isJpg ? 'jpg' : 'png';
    } else {
      bytes = await (await convertImage(file, 'jpg')).blob.arrayBuffer();
      kind = 'jpg';
    }
    let img;
    try {
      img = kind === 'jpg' ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);
    } catch {
      // Unusual JPG/PNG variants pdf-lib can't parse — re-encode through the browser.
      img = await pdf.embedJpg(await (await convertImage(file, 'jpg')).blob.arrayBuffer());
    }

    if (pageSize === 'fit') {
      // 1 image pixel = 0.75pt (96 DPI), so the page matches the photo.
      const w = img.width * 0.75;
      const h = img.height * 0.75;
      pdf.addPage([w, h]).drawImage(img, { x: 0, y: 0, width: w, height: h });
    } else {
      let [pw, ph] = PAGE_POINTS[pageSize];
      if (img.width > img.height) [pw, ph] = [ph, pw]; // landscape photo → landscape page
      const margin = 24;
      const s = Math.min((pw - margin * 2) / img.width, (ph - margin * 2) / img.height);
      const w = img.width * s;
      const h = img.height * s;
      pdf.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
    }
  }
  const bytes = await pdf.save();
  return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), filename: `${outName}.pdf`, pages: files.length };
}

// ─── Merge / split ───────────────────────────────────────────────────────────────

async function loadPdf(file: File) {
  const { PDFDocument } = await import('pdf-lib');
  try {
    return await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: false });
  } catch (e) {
    const msg = String((e as Error)?.message || e);
    throw new Error(
      /encrypt/i.test(msg)
        ? `"${file.name}" is password-protected. Remove the password first.`
        : `"${file.name}" couldn't be opened as a PDF.`,
    );
  }
}

export async function mergePdfs(files: File[]): Promise<ConvertedFile> {
  const { PDFDocument } = await import('pdf-lib');
  const out = await PDFDocument.create();
  for (const file of files) {
    const src = await loadPdf(file);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const bytes = await out.save({ useObjectStreams: true });
  return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), filename: 'merged.pdf', pages: out.getPageCount() };
}

/**
 * Parse "1-3, 5, 8-" into page groups (1-based, inclusive).
 * Each comma-separated part becomes its own output file.
 */
export function parseRanges(input: string, pageCount: number): number[][] {
  const groups: number[][] = [];
  for (const raw of input.split(',')) {
    const part = raw.trim();
    if (!part) continue;
    const m = part.match(/^(\d*)\s*-\s*(\d*)$/);
    let from: number, to: number;
    if (m) {
      from = m[1] ? parseInt(m[1], 10) : 1;
      to = m[2] ? parseInt(m[2], 10) : pageCount;
    } else if (/^\d+$/.test(part)) {
      from = to = parseInt(part, 10);
    } else {
      throw new Error(`"${part}" isn't a valid page range. Use something like 1-3, 5.`);
    }
    if (from < 1 || to > pageCount || from > to) {
      throw new Error(`Pages ${part} don't exist — this PDF has ${pageCount} page${pageCount === 1 ? '' : 's'}.`);
    }
    groups.push(Array.from({ length: to - from + 1 }, (_, i) => from + i));
  }
  if (!groups.length) throw new Error('Enter the pages to extract, like 1-3, 5.');
  return groups;
}

export async function getPdfPageCount(file: File): Promise<number> {
  return (await loadPdf(file)).getPageCount();
}

/** ranges = null → one PDF per page. */
export async function splitPdf(file: File, ranges: string | null): Promise<ConvertedFile[]> {
  const { PDFDocument } = await import('pdf-lib');
  const src = await loadPdf(file);
  const count = src.getPageCount();
  const groups = ranges === null ? src.getPageIndices().map((i) => [i + 1]) : parseRanges(ranges, count);
  const name = baseName(file.name);
  const out: ConvertedFile[] = [];
  for (const group of groups) {
    const doc = await PDFDocument.create();
    const pages = await doc.copyPages(src, group.map((n) => n - 1));
    pages.forEach((p) => doc.addPage(p));
    const bytes = await doc.save({ useObjectStreams: true });
    const label = group.length === 1 ? `page-${group[0]}` : `pages-${group[0]}-${group[group.length - 1]}`;
    out.push({ blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), filename: `${name}-${label}.pdf`, pages: group.length });
  }
  return out;
}
