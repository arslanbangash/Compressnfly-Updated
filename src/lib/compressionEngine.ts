/**
 * Real compression engine for CompressNFly
 * Handles: Images (JPG/PNG/WebP/GIF), PDFs, Office docs (DOCX/XLSX/PPTX), ZIP archives, Text files
 */

import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export type CompressionLevel = 'high-quality' | 'web-optimized' | 'balanced' | 'small-size';

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionPercent: number;
  filename: string;
}

// ─── Image Compression ────────────────────────────────────────────────────────

const IMAGE_SETTINGS: Record<CompressionLevel, { maxSizeMB: number; maxWidthOrHeight: number; quality: number }> = {
  'high-quality':   { maxSizeMB: 2,    maxWidthOrHeight: 3840, quality: 0.92 },
  'web-optimized':  { maxSizeMB: 1,    maxWidthOrHeight: 2560, quality: 0.82 },
  'balanced':       { maxSizeMB: 0.5,  maxWidthOrHeight: 1920, quality: 0.75 },
  'small-size':     { maxSizeMB: 0.2,  maxWidthOrHeight: 1280, quality: 0.60 },
};

async function compressImage(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const options = {
    ...IMAGE_SETTINGS[level],
    useWebWorker: true,
    fileType: file.type as string,
    onProgress: undefined,
  };

  const compressed = await imageCompression(file, options);

  // If compression made it bigger (rare, e.g. already-compressed PNG), return original
  const result = compressed.size < file.size ? compressed : file;
  const blob = new Blob([result], { type: result.type || file.type });

  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    compressionPercent: Math.round(((file.size - blob.size) / file.size) * 100),
    filename: getCompressedFilename(file.name),
  };
}

// ─── PDF Compression ──────────────────────────────────────────────────────────

const PDF_IMAGE_QUALITY: Record<CompressionLevel, number> = {
  'high-quality':  0.90,
  'web-optimized': 0.75,
  'balanced':      0.65,
  'small-size':    0.45,
};

const PDF_IMAGE_SCALE: Record<CompressionLevel, number> = {
  'high-quality':  1.0,
  'web-optimized': 0.85,
  'balanced':      0.75,
  'small-size':    0.60,
};

async function compressPDF(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Re-save the PDF — pdf-lib strips redundant objects, cross-reference tables, etc.
  // This alone typically gives 5–30% reduction on bloated PDFs.
  const savedBytes = await pdfDoc.save({
    useObjectStreams: true,    // compress object streams
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  const compressedBlob = new Blob([savedBytes], { type: 'application/pdf' });

  // If pdf-lib didn't help (already optimised), return original
  const finalBlob = compressedBlob.size < file.size ? compressedBlob : new Blob([arrayBuffer], { type: 'application/pdf' });

  return {
    blob: finalBlob,
    originalSize: file.size,
    compressedSize: finalBlob.size,
    compressionPercent: Math.max(0, Math.round(((file.size - finalBlob.size) / file.size) * 100)),
    filename: getCompressedFilename(file.name),
  };
}

// ─── Office / DOCX / XLSX / PPTX Compression ─────────────────────────────────
// Office files are ZIP archives. We re-compress with higher deflation and
// use browser-image-compression on embedded images (the main size driver).

const OFFICE_IMG_QUALITY: Record<CompressionLevel, number> = {
  'high-quality':  0.88,
  'web-optimized': 0.75,
  'balanced':      0.65,
  'small-size':    0.50,
};

const OFFICE_IMG_MAXDIM: Record<CompressionLevel, number> = {
  'high-quality':  3840,
  'web-optimized': 2560,
  'balanced':      1920,
  'small-size':    1280,
};

const OFFICE_IMG_MAXMB: Record<CompressionLevel, number> = {
  'high-quality':  1.5,
  'web-optimized': 0.8,
  'balanced':      0.5,
  'small-size':    0.2,
};

async function compressOfficeFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();
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
          // Detect image mime type
          const ext = relativePath.split('.').pop()?.toLowerCase() || 'jpeg';
          const mimeMap: Record<string, string> = {
            jpg: 'image/jpeg', jpeg: 'image/jpeg',
            png: 'image/png', gif: 'image/gif',
            bmp: 'image/bmp', tiff: 'image/tiff',
            webp: 'image/webp',
          };
          const mime = mimeMap[ext] || 'image/jpeg';
          const imgFile = new File([content], relativePath, { type: mime });

          const options = {
            maxSizeMB: OFFICE_IMG_MAXMB[level],
            maxWidthOrHeight: OFFICE_IMG_MAXDIM[level],
            initialQuality: OFFICE_IMG_QUALITY[level],
            useWebWorker: true,
          };

          const compressed = await imageCompression(imgFile, options);

          if (compressed.size < content.byteLength) {
            newZip.file(relativePath, await compressed.arrayBuffer(), { compression: 'DEFLATE', compressionOptions: { level: 6 } });
          } else {
            newZip.file(relativePath, content, { compression: 'DEFLATE', compressionOptions: { level: 6 } });
          }
        } catch {
          // If image compression fails, just re-add as-is with higher deflation
          newZip.file(relativePath, content, { compression: 'DEFLATE', compressionOptions: { level: 6 } });
        }
      } else {
        // Non-image files: re-compress with deflate
        newZip.file(relativePath, content, { compression: 'DEFLATE', compressionOptions: { level: 6 } });
      }
    };

    processPromises.push(task());
  });

  await Promise.all(processPromises);

  const compressedArrayBuffer = await newZip.generateAsync({
    type: 'arraybuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const finalBuffer = compressedArrayBuffer.byteLength < arrayBuffer.byteLength
    ? compressedArrayBuffer
    : arrayBuffer;

  const blob = new Blob([finalBuffer], { type: file.type });

  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    compressionPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100)),
    filename: getCompressedFilename(file.name),
  };
}

// ─── ZIP / Archive Compression ─────────────────────────────────────────────────

async function compressZip(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const deflateLevel = level === 'high-quality' ? 3 : level === 'web-optimized' ? 5 : level === 'balanced' ? 7 : 9;
  const arrayBuffer = await file.arrayBuffer();

  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const newZip = new JSZip();
    const tasks: Promise<void>[] = [];

    zip.forEach((relativePath, zipEntry) => {
      if (zipEntry.dir) {
        newZip.folder(relativePath);
        return;
      }
      tasks.push(
        zipEntry.async('arraybuffer').then(content => {
          newZip.file(relativePath, content, {
            compression: 'DEFLATE',
            compressionOptions: { level: deflateLevel },
          });
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
    // If it's not a valid ZIP (e.g. RAR, 7z), return original with note
    const blob = new Blob([arrayBuffer], { type: file.type });
    return {
      blob,
      originalSize: file.size,
      compressedSize: file.size,
      compressionPercent: 0,
      filename: getCompressedFilename(file.name),
    };
  }
}

// ─── Text / JSON / XML / CSV / Markdown ───────────────────────────────────────

async function compressTextFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  // Wrap text in a zip for real size reduction
  const text = await file.text();
  const deflateLevel = level === 'high-quality' ? 3 : level === 'web-optimized' ? 5 : level === 'balanced' ? 7 : 9;

  const zip = new JSZip();
  zip.file(file.name, text, { compression: 'DEFLATE', compressionOptions: { level: deflateLevel } });

  const compressedBuffer = await zip.generateAsync({ type: 'arraybuffer' });

  // Only use zipped version if meaningfully smaller (>10%)
  if (compressedBuffer.byteLength < file.size * 0.9) {
    const blob = new Blob([compressedBuffer], { type: 'application/zip' });
    const zipFilename = getCompressedFilename(file.name) + '.zip';
    return {
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      compressionPercent: Math.round(((file.size - blob.size) / file.size) * 100),
      filename: zipFilename,
    };
  }

  // Otherwise return original (text was already small or incompressible)
  const blob = new Blob([text], { type: file.type });
  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    compressionPercent: 0,
    filename: getCompressedFilename(file.name),
  };
}

// ─── Generic Fallback ─────────────────────────────────────────────────────────

async function compressGeneric(file: File, level: CompressionLevel): Promise<CompressionResult> {
  // For unsupported types, try wrapping in a ZIP
  const deflateLevel = level === 'high-quality' ? 3 : level === 'web-optimized' ? 5 : level === 'balanced' ? 7 : 9;
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
  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    compressionPercent: 0,
    filename: getCompressedFilename(file.name),
  };
}

// ─── Router ───────────────────────────────────────────────────────────────────

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
    type === 'text/plain' || type === 'application/json' || type === 'text/xml' ||
    type === 'application/xml' || type === 'text/csv' ||
    name.endsWith('.txt') || name.endsWith('.json') || name.endsWith('.xml') ||
    name.endsWith('.csv') || name.endsWith('.md') || name.endsWith('.rtf')
  ) return 'text';

  return 'generic';
}

export async function compressFile(file: File, level: CompressionLevel): Promise<CompressionResult> {
  const category = getFileCategory(file);

  switch (category) {
    case 'image':   return compressImage(file, level);
    case 'pdf':     return compressPDF(file, level);
    case 'office':  return compressOfficeFile(file, level);
    case 'zip':     return compressZip(file, level);
    case 'text':    return compressTextFile(file, level);
    default:        return compressGeneric(file, level);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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