/**
 * Real compression engine for CompressNFly
 * Handles: Images (JPG/PNG/WebP/GIF), PDFs, Office docs (DOCX/XLSX/PPTX), ZIP archives, Text files
 */

import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { fitToTarget, initialScaleFor } from './targetSize';

export type CompressionLevel = 'high-quality' | 'web-optimized' | 'balanced' | 'small-size';

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionPercent: number;
  filename: string;
  /** Set when compressing to an exact size. */
  targetBytes?: number;
  hitTarget?: boolean;
  /** Output pixel size for images compressed to a target. */
  width?: number;
  height?: number;
  /** Anything the user should know about the result. */
  note?: string;
}

// ─── Image Compression ─────────────────────────────────────────────────────────
// Each level has meaningfully different maxSizeMB, dimensions AND quality
// so the output size is visibly different across all 4 levels

const IMAGE_SETTINGS: Record<CompressionLevel, {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  initialQuality: number;
}> = {
  'high-quality':  { maxSizeMB: 1.2,  maxWidthOrHeight: 3840, initialQuality: 0.88 },
  'web-optimized': { maxSizeMB: 0.4,  maxWidthOrHeight: 1920, initialQuality: 0.72 },
  'balanced':      { maxSizeMB: 0.15, maxWidthOrHeight: 1280, initialQuality: 0.55 },
  'small-size':    { maxSizeMB: 0.05, maxWidthOrHeight: 800,  initialQuality: 0.30 },
};

async function compressImage(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const settings = IMAGE_SETTINGS[level];
  const options = {
    maxSizeMB: settings.maxSizeMB,
    maxWidthOrHeight: settings.maxWidthOrHeight,
    initialQuality: settings.initialQuality,
    useWebWorker: true,
    fileType: file.type as string,
  };

  const compressed = await imageCompression(file, options);
  // Only use compressed if actually smaller
  const result = compressed.size < file.size ? compressed : file;
  const blob = new Blob([result], { type: result.type || file.type });

  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    compressionPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100)),
    filename: getCompressedFilename(file.name),
  };
}

// ─── PDF Compression ───────────────────────────────────────────────────────────
// Strategy: re-save with pdf-lib (structural cleanup) + downsample embedded
// images by drawing pages onto scaled canvases for higher levels

const PDF_SCALE: Record<CompressionLevel, number> = {
  'high-quality':  0.95,
  'web-optimized': 0.80,
  'balanced':      0.65,
  'small-size':    0.45,
};

async function compressPDF(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    // Re-save with object streams — compresses redundant structures
    const savedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    });

    // "Small Size" also re-renders pages as images, which is what shrinks
    // scanned/photo-heavy PDFs. Only used when it saves a lot, because text
    // stops being selectable.
    if (level === 'small-size') {
      try {
        const scale = PDF_SCALE[level];
        const canvasResult = await renderPDFPagesAsImages(savedBytes, scale, 0.5, file.name);
        if (canvasResult && canvasResult.size < Math.min(file.size, savedBytes.byteLength) * 0.8) {
          return {
            blob: canvasResult,
            originalSize: file.size,
            compressedSize: canvasResult.size,
            compressionPercent: Math.max(0, Math.round(((file.size - canvasResult.size) / file.size) * 100)),
            filename: getCompressedFilename(file.name),
            note: 'Pages were converted to images for maximum compression, so text is no longer selectable.',
          };
        }
      } catch {
        // fall through to basic re-save
      }
    }

    const finalBlob = savedBytes.byteLength < file.size
      ? new Blob([savedBytes], { type: 'application/pdf' })
      : new Blob([arrayBuffer], { type: 'application/pdf' });

    return {
      blob: finalBlob,
      originalSize: file.size,
      compressedSize: finalBlob.size,
      compressionPercent: Math.max(0, Math.round(((file.size - finalBlob.size) / file.size) * 100)),
      filename: getCompressedFilename(file.name),
    };
  } catch {
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    return {
      blob,
      originalSize: file.size,
      compressedSize: file.size,
      compressionPercent: 0,
      filename: getCompressedFilename(file.name),
    };
  }
}

async function renderPDFPagesAsImages(
  pdfBytes: Uint8Array,
  scale: number,
  quality: number,
  _filename: string
): Promise<Blob | null> {
  // Re-render every page as a JPEG at a lower resolution. This is what actually
  // shrinks scanned and image-heavy PDFs (text becomes part of the image).
  try {
    // pdf.js renders at 72 DPI for scale 1; PDF_SCALE values map to ~100–140 DPI.
    const bytes = await rasterizePdf(pdfBytes, 1 + scale, quality);
    return new Blob([bytes], { type: 'application/pdf' });
  } catch {
    return null;
  }
}

// ─── PDF rasterization (pdf.js, loaded only when needed) ─────────────────────────

type PdfJs = typeof import('pdfjs-dist');
let pdfjsPromise: Promise<PdfJs> | null = null;

function loadPdfJs(): Promise<PdfJs> {
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      const pdfjs = await import('pdfjs-dist');
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjs;
    })();
  }
  return pdfjsPromise;
}

const MAX_CANVAS_SIDE = 4096;

/**
 * Render each page with pdf.js and rebuild the PDF from JPEGs.
 * pageScale 1 = 72 DPI. Page sizes (in points) are preserved.
 */
async function rasterizePdf(pdfBytes: Uint8Array, pageScale: number, quality: number): Promise<Uint8Array> {
  const pdfjs = await loadPdfJs();
  const doc = await pdfjs.getDocument({ data: pdfBytes.slice() }).promise;
  const out = await PDFDocument.create();

  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const fit = Math.min(pageScale, MAX_CANVAS_SIDE / Math.max(base.width, base.height));
      const viewport = page.getViewport({ scale: fit });

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      const jpg = await canvasToBlob(canvas, 'image/jpeg', quality);
      const img = await out.embedJpg(await jpg.arrayBuffer());
      const p = out.addPage([base.width, base.height]);
      p.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });

      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
    }
    return await out.save({ useObjectStreams: true });
  } finally {
    await doc.destroy();
  }
}

/** Ordered from best quality to smallest file: [pageScale (1 = 72 DPI), JPEG quality]. */
const PDF_TARGET_STEPS: [number, number][] = [
  [2.0, 0.8], [2.0, 0.65], [1.6, 0.65], [1.6, 0.5], [1.3, 0.5],
  [1.3, 0.4], [1.1, 0.4], [1.0, 0.3], [0.85, 0.3], [0.7, 0.25],
];

async function compressPDFToTarget(file: File, targetBytes: number): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const original: Uint8Array = new Uint8Array(arrayBuffer);
  const finish = (bytes: Uint8Array, hitTarget: boolean, rasterized: boolean): CompressionResult => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100)),
      filename: getCompressedFilename(file.name),
      targetBytes,
      hitTarget,
      note: rasterized
        ? 'Pages were converted to images to reach this size, so text is no longer selectable.'
        : undefined,
    };
  };

  if (file.size <= targetBytes) return finish(original, true, false);

  // 1) Lossless clean-up first — keeps text selectable.
  let smallest: Uint8Array = original;
  try {
    const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const saved = await doc.save({ useObjectStreams: true, addDefaultPage: false, updateFieldAppearances: false });
    if (saved.byteLength < smallest.byteLength) smallest = saved;
    if (saved.byteLength <= targetBytes) return finish(saved, true, false);
  } catch {
    // Damaged or unusual PDF — try rendering it anyway.
  }

  // 2) Re-render pages at decreasing resolution/quality until it fits.
  for (const [pageScale, quality] of PDF_TARGET_STEPS) {
    let bytes: Uint8Array;
    try {
      bytes = await rasterizePdf(original, pageScale, quality);
    } catch {
      break; // password-protected or unreadable by pdf.js
    }
    if (bytes.byteLength < smallest.byteLength) smallest = bytes;
    if (bytes.byteLength <= targetBytes) return finish(bytes, true, true);
  }

  return finish(smallest, false, smallest !== original);
}

// ─── Image: compress to an exact target size ─────────────────────────────────────

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not encode image'))), type, quality),
  );
}

async function compressImageToTarget(file: File, targetBytes: number): Promise<CompressionResult> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error("This image format can't be opened in your browser. Try a JPG, PNG or WebP.");
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const encode = async (scale: number, quality: number) => {
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    ctx.fillStyle = '#ffffff'; // JPEG has no transparency: use a white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvasToBlob(canvas, 'image/jpeg', quality);
  };

  const result = await fitToTarget(encode, targetBytes, {
    initialScale: initialScaleFor(bitmap.width, bitmap.height, targetBytes),
    minScale: Math.min(1, 64 / Math.max(bitmap.width, bitmap.height)),
  });
  const width = Math.round(bitmap.width * result.scale);
  const height = Math.round(bitmap.height * result.scale);
  bitmap.close();
  canvas.width = 0;
  canvas.height = 0;

  return {
    blob: result.blob,
    originalSize: file.size,
    compressedSize: result.blob.size,
    compressionPercent: Math.max(0, Math.round(((file.size - result.blob.size) / file.size) * 100)),
    filename: file.name.replace(/\.[^.]+$/, '') + '_compressed.jpg',
    targetBytes,
    hitTarget: result.hitTarget,
    width,
    height,
  };
}

/**
 * Compress to at most `targetBytes`. Images are saved as JPG; PDFs are cleaned up
 * first and only converted to page images if that's needed to reach the size.
 */
export async function compressToTarget(file: File, targetBytes: number): Promise<CompressionResult> {
  const category = getFileCategory(file);
  if (category === 'image') return compressImageToTarget(file, targetBytes);
  if (category === 'pdf') return compressPDFToTarget(file, targetBytes);
  throw new Error('Exact-size compression works with images and PDFs.');
}

// ─── Office / DOCX / XLSX / PPTX Compression ──────────────────────────────────

const OFFICE_IMG_SETTINGS: Record<CompressionLevel, {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  initialQuality: number;
  deflateLevel: number;
}> = {
  'high-quality':  { maxSizeMB: 1.0,  maxWidthOrHeight: 2560, initialQuality: 0.85, deflateLevel: 3 },
  'web-optimized': { maxSizeMB: 0.4,  maxWidthOrHeight: 1920, initialQuality: 0.70, deflateLevel: 5 },
  'balanced':      { maxSizeMB: 0.15, maxWidthOrHeight: 1280, initialQuality: 0.55, deflateLevel: 7 },
  'small-size':    { maxSizeMB: 0.05, maxWidthOrHeight: 800,  initialQuality: 0.35, deflateLevel: 9 },
};

async function compressOfficeFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const settings = OFFICE_IMG_SETTINGS[level];

  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const newZip = new JSZip();
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i;
    const processPromises: Promise<void>[] = [];

    zip.forEach((relativePath, zipEntry) => {
      if (zipEntry.dir) return;

      const task = async () => {
        const content = await zipEntry.async('arraybuffer');

        if (imageExtensions.test(relativePath)) {
          try {
            const ext = relativePath.split('.').pop()?.toLowerCase() || 'jpeg';
            const mimeMap: Record<string, string> = {
              jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
              gif: 'image/gif', bmp: 'image/bmp', tiff: 'image/tiff', webp: 'image/webp',
            };
            const mime = mimeMap[ext] || 'image/jpeg';
            const imgFile = new File([content], relativePath, { type: mime });

            const compressed = await imageCompression(imgFile, {
              maxSizeMB: settings.maxSizeMB,
              maxWidthOrHeight: settings.maxWidthOrHeight,
              initialQuality: settings.initialQuality,
              useWebWorker: true,
            });

            const finalContent = compressed.size < content.byteLength
              ? await compressed.arrayBuffer()
              : content;

            newZip.file(relativePath, finalContent, {
              compression: 'DEFLATE',
              compressionOptions: { level: settings.deflateLevel },
            });
          } catch {
            newZip.file(relativePath, content, {
              compression: 'DEFLATE',
              compressionOptions: { level: settings.deflateLevel },
            });
          }
        } else {
          newZip.file(relativePath, content, {
            compression: 'DEFLATE',
            compressionOptions: { level: settings.deflateLevel },
          });
        }
      };

      processPromises.push(task());
    });

    await Promise.all(processPromises);

    const compressedBuffer = await newZip.generateAsync({
      type: 'arraybuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: settings.deflateLevel },
    });

    const finalBuffer = compressedBuffer.byteLength < arrayBuffer.byteLength
      ? compressedBuffer
      : arrayBuffer;

    const blob = new Blob([finalBuffer], { type: file.type });
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100)),
      filename: getCompressedFilename(file.name),
    };
  } catch {
    const blob = new Blob([arrayBuffer], { type: file.type });
    return { blob, originalSize: file.size, compressedSize: file.size, compressionPercent: 0, filename: getCompressedFilename(file.name) };
  }
}

// ─── ZIP Compression ────────────────────────────────────────────────────────────

const ZIP_DEFLATE_LEVEL: Record<CompressionLevel, number> = {
  'high-quality':  3,
  'web-optimized': 5,
  'balanced':      7,
  'small-size':    9,
};

async function compressZip(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const deflateLevel = ZIP_DEFLATE_LEVEL[level];
  const arrayBuffer = await file.arrayBuffer();

  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const newZip = new JSZip();
    const tasks: Promise<void>[] = [];

    zip.forEach((relativePath, zipEntry) => {
      if (zipEntry.dir) { newZip.folder(relativePath); return; }
      tasks.push(
        zipEntry.async('arraybuffer').then(content => {
          newZip.file(relativePath, content, { compression: 'DEFLATE', compressionOptions: { level: deflateLevel } });
        })
      );
    });

    await Promise.all(tasks);
    const compressedBuffer = await newZip.generateAsync({
      type: 'arraybuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: deflateLevel },
    });

    const finalBuffer = compressedBuffer.byteLength < arrayBuffer.byteLength ? compressedBuffer : arrayBuffer;
    const blob = new Blob([finalBuffer], { type: 'application/zip' });
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100)),
      filename: getCompressedFilename(file.name),
    };
  } catch {
    const blob = new Blob([arrayBuffer], { type: file.type });
    return { blob, originalSize: file.size, compressedSize: file.size, compressionPercent: 0, filename: getCompressedFilename(file.name) };
  }
}

// ─── Text / JSON / CSV / XML ────────────────────────────────────────────────────

async function compressTextFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const deflateLevel = ZIP_DEFLATE_LEVEL[level];
  const text = await file.text();
  const zip = new JSZip();
  zip.file(file.name, text, { compression: 'DEFLATE', compressionOptions: { level: deflateLevel } });
  const compressedBuffer = await zip.generateAsync({ type: 'arraybuffer' });

  if (compressedBuffer.byteLength < file.size * 0.9) {
    const blob = new Blob([compressedBuffer], { type: 'application/zip' });
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.round(((file.size - blob.size) / file.size) * 100),
      filename: getCompressedFilename(file.name) + '.zip',
    };
  }

  const blob = new Blob([text], { type: file.type });
  return { blob, originalSize: file.size, compressedSize: blob.size, compressionPercent: 0, filename: getCompressedFilename(file.name) };
}

// ─── Generic Fallback ───────────────────────────────────────────────────────────

async function compressGeneric(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const deflateLevel = ZIP_DEFLATE_LEVEL[level];
  const arrayBuffer = await file.arrayBuffer();
  const zip = new JSZip();
  zip.file(file.name, arrayBuffer, { compression: 'DEFLATE', compressionOptions: { level: deflateLevel } });
  const compressedBuffer = await zip.generateAsync({ type: 'arraybuffer' });

  if (compressedBuffer.byteLength < file.size * 0.95) {
    const blob = new Blob([compressedBuffer], { type: 'application/zip' });
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.round(((file.size - blob.size) / file.size) * 100),
      filename: getCompressedFilename(file.name) + '.zip',
    };
  }

  const blob = new Blob([arrayBuffer], { type: file.type });
  return { blob, originalSize: file.size, compressedSize: blob.size, compressionPercent: 0, filename: getCompressedFilename(file.name) };
}

// ─── Router ─────────────────────────────────────────────────────────────────────

function getFileCategory(file: File): 'image' | 'pdf' | 'office' | 'zip' | 'text' | 'generic' {
  const name = file.name.toLowerCase();
  const type = file.type;

  if (type.startsWith('image/')) return 'image';
  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';

  if (
    type.includes('word') || type.includes('document') ||
    type.includes('spreadsheet') || type.includes('excel') ||
    type.includes('presentation') || type.includes('powerpoint') ||
    name.endsWith('.docx') || name.endsWith('.doc') ||
    name.endsWith('.xlsx') || name.endsWith('.xls') ||
    name.endsWith('.pptx') || name.endsWith('.ppt') ||
    name.endsWith('.odt') || name.endsWith('.ods') || name.endsWith('.odp')
  ) return 'office';

  if (
    type.includes('zip') || type.includes('archive') ||
    name.endsWith('.zip') || name.endsWith('.gz') || name.endsWith('.tar')
  ) return 'zip';

  if (
    type === 'text/plain' || type === 'application/json' ||
    type === 'text/xml' || type === 'application/xml' || type === 'text/csv' ||
    name.endsWith('.txt') || name.endsWith('.json') || name.endsWith('.xml') ||
    name.endsWith('.csv') || name.endsWith('.md') || name.endsWith('.rtf')
  ) return 'text';

  return 'generic';
}

export async function compressFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const category = getFileCategory(file);
  switch (category) {
    case 'image':  return compressImage(file, level);
    case 'pdf':    return compressPDF(file, level);
    case 'office': return compressOfficeFile(file, level);
    case 'zip':    return compressZip(file, level);
    case 'text':   return compressTextFile(file, level);
    default:       return compressGeneric(file, level);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getCompressedFilename(filename: string): string {
  return filename.replace(/(\.[^.]+)$/, '_compressed$1');
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}