import { useCallback, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { downloadBlob } from '@/lib/download';
import type { ConvertedFile, ImageFormat, PageSize } from '@/lib/convertEngine';
import {
  AlertCircle, ArrowDown, ArrowUp, CheckCircle, CloudUpload, Download, FileImage, FileText, Plus, X,
} from 'lucide-react';

// The conversion libraries are loaded only once someone picks a file.
const loadEngine = () => import('@/lib/convertEngine');

export type ConverterMode = 'image' | 'pdf-to-image' | 'images-to-pdf' | 'merge-pdf' | 'split-pdf';

export interface ConverterToolProps {
  mode: ConverterMode;
  /** Output format for image and pdf-to-image modes */
  to?: ImageFormat;
  accept: string;
  dropHint: string;
}

const fmtSize = (b: number) =>
  b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : b >= 1024 ? `${(b / 1024).toFixed(1)} KB` : `${b} B`;

const MULTI: Record<ConverterMode, boolean> = {
  image: true, 'pdf-to-image': false, 'images-to-pdf': true, 'merge-pdf': true, 'split-pdf': false,
};
const ORDERED = (m: ConverterMode) => m === 'images-to-pdf' || m === 'merge-pdf';

const actionLabel = (mode: ConverterMode, to?: ImageFormat, n = 1) => {
  switch (mode) {
    case 'image': return `Convert to ${to?.toUpperCase()}`;
    case 'pdf-to-image': return `Convert to ${to?.toUpperCase()}`;
    case 'images-to-pdf': return n > 1 ? `Create PDF from ${n} images` : 'Create PDF';
    case 'merge-pdf': return `Merge ${n} PDFs`;
    case 'split-pdf': return 'Split PDF';
  }
};

const ConverterTool = ({ mode, to = 'jpg', accept, dropHint }: ConverterToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ConvertedFile[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dpi, setDpi] = useState(150);
  const [pageSize, setPageSize] = useState<PageSize>('fit');
  const [splitMode, setSplitMode] = useState<'all' | 'ranges'>('all');
  const [ranges, setRanges] = useState('');
  const [pageCount, setPageCount] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const multi = MULTI[mode];

  const addFiles = useCallback(async (picked: File[]) => {
    const maxSize = 100 * 1024 * 1024;
    const tooBig = picked.filter((f) => f.size > maxSize);
    if (tooBig.length) {
      toast({ title: 'File too large', description: `Max 100MB per file: ${tooBig.map((f) => f.name).join(', ')}`, variant: 'destructive' });
    }
    const ok = picked.filter((f) => f.size <= maxSize);
    if (!ok.length) return;
    void loadEngine();
    setResults(null);
    setErrors([]);
    setProgress(0);
    const next = multi ? [...files, ...ok] : [ok[0]];
    setFiles(next);
    if (mode === 'split-pdf') {
      setPageCount(null);
      try {
        setPageCount(await (await loadEngine()).getPdfPageCount(next[0]));
      } catch (e) {
        setErrors([e instanceof Error ? e.message : 'Could not open this PDF.']);
      }
    }
  }, [files, mode, multi, toast]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void addFiles(Array.from(e.dataTransfer.files));
  };

  const move = (i: number, d: -1 | 1) => setFiles((fs) => {
    const j = i + d;
    if (j < 0 || j >= fs.length) return fs;
    const copy = [...fs];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
  });

  const reset = () => {
    setFiles([]); setResults(null); setErrors([]); setProgress(0); setPageCount(null); setRanges('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const run = async () => {
    if (!files.length) return;
    setBusy(true); setErrors([]); setProgress(0);
    let engine: Awaited<ReturnType<typeof loadEngine>>;
    try {
      engine = await loadEngine();
    } catch {
      setBusy(false);
      toast({ title: "Couldn't load the converter", description: 'Check your internet connection and try again.', variant: 'destructive' });
      return;
    }
    const out: ConvertedFile[] = [];
    const errs: string[] = [];
    try {
      if (mode === 'image') {
        for (let i = 0; i < files.length; i++) {
          try {
            out.push(await engine.convertImage(files[i], to));
          } catch (e) {
            errs.push(`${files[i].name}: ${e instanceof Error ? e.message : 'conversion failed'}`);
          }
          setProgress(((i + 1) / files.length) * 100);
        }
      } else if (mode === 'pdf-to-image') {
        out.push(...await engine.pdfToImages(files[0], to === 'png' ? 'png' : 'jpg', dpi, (d, t) => setProgress((d / t) * 100)));
      } else if (mode === 'images-to-pdf') {
        const name = files.length === 1 ? engine.baseName(files[0].name) : 'images';
        out.push(await engine.imagesToPdf(files, pageSize, name));
      } else if (mode === 'merge-pdf') {
        out.push(await engine.mergePdfs(files));
      } else if (mode === 'split-pdf') {
        out.push(...await engine.splitPdf(files[0], splitMode === 'all' ? null : ranges));
      }
    } catch (e) {
      errs.push(e instanceof Error ? e.message : 'Something went wrong.');
    }
    setProgress(100);
    setResults(out);
    setErrors(errs);
    setBusy(false);
    if (!out.length && errs.length) toast({ title: 'Conversion failed', description: errs[0], variant: 'destructive' });
  };

  const downloadAll = async () => {
    if (!results?.length) return;
    if (results.length === 1) return downloadBlob(results[0].blob, results[0].filename);
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    const used = new Set<string>();
    for (const r of results) {
      let name = r.filename;
      for (let n = 2; used.has(name); n++) name = r.filename.replace(/(\.[^.]+)$/, `-${n}$1`);
      used.add(name);
      zip.file(name, await r.blob.arrayBuffer());
    }
    const base = files.length === 1 ? files[0].name.replace(/\.[^.]+$/, '') : 'converted';
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `${base}.zip`);
  };

  const isPdfIn = mode === 'pdf-to-image' || mode === 'merge-pdf' || mode === 'split-pdf';
  const InIcon = isPdfIn ? FileText : FileImage;
  const totalIn = files.reduce((a, f) => a + f.size, 0);
  const canRun = files.length > 0 && !busy && !(mode === 'merge-pdf' && files.length < 2)
    && !(mode === 'split-pdf' && (pageCount === null || (splitMode === 'ranges' && !ranges.trim())));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          {/* Drop zone — shown until there are results; stays small once files are added */}
          {!results && (
            <div
              className={`file-drop-area rounded-lg text-center cursor-pointer ${files.length ? 'p-4 mb-6' : 'p-10 md:p-12'} ${dragging ? 'active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false); }}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
            >
              {files.length === 0 ? (
                <div className="flex flex-col items-center">
                  <CloudUpload className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Drop {multi ? 'files' : 'a file'} here
                  </h3>
                  <p className="text-muted-foreground mb-4">{dropHint}</p>
                  <Button>Choose {multi ? 'Files' : 'File'}</Button>
                  <p className="text-xs text-muted-foreground mt-3">Max 100MB per file · Files never leave your device</p>
                </div>
              ) : (
                <p className="text-sm text-primary font-medium inline-flex items-center gap-1">
                  <Plus className="w-4 h-4" /> {multi ? 'Add more files' : 'Choose a different file'}
                </p>
              )}
              <input
                ref={inputRef} type="file" className="hidden" accept={accept} multiple={multi}
                onChange={(e) => { if (e.target.files) void addFiles(Array.from(e.target.files)); e.target.value = ''; }}
              />
            </div>
          )}

          {/* Selected files */}
          {files.length > 0 && !results && (
            <ul className="space-y-2 mb-6">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
                  <InIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-foreground truncate">{f.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {fmtSize(f.size)}{mode === 'split-pdf' && pageCount ? ` · ${pageCount} pages` : ''}
                    </span>
                  </span>
                  {ORDERED(mode) && files.length > 1 && !busy && (
                    <span className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Move down" disabled={i === files.length - 1} onClick={() => move(i, 1)}>
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </span>
                  )}
                  {!busy && (
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label={`Remove ${f.name}`}
                      onClick={() => { setFiles((fs) => fs.filter((_, j) => j !== i)); if (mode === 'split-pdf') setPageCount(null); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Options */}
          {files.length > 0 && !results && (
            <div className="mb-6 space-y-3">
              {mode === 'pdf-to-image' && (
                <OptionRow label="Image quality">
                  {[[150, 'Standard (150 DPI)'], [300, 'High (300 DPI)']].map(([v, l]) => (
                    <Chip key={v} active={dpi === v} onClick={() => setDpi(v as number)}>{l}</Chip>
                  ))}
                </OptionRow>
              )}
              {mode === 'images-to-pdf' && (
                <OptionRow label="Page size">
                  {([['fit', 'Same as image'], ['a4', 'A4'], ['letter', 'US Letter']] as const).map(([v, l]) => (
                    <Chip key={v} active={pageSize === v} onClick={() => setPageSize(v)}>{l}</Chip>
                  ))}
                </OptionRow>
              )}
              {mode === 'merge-pdf' && files.length < 2 && (
                <p className="text-sm text-muted-foreground">Add at least one more PDF to merge.</p>
              )}
              {mode === 'split-pdf' && (
                <>
                  <OptionRow label="Split into">
                    <Chip active={splitMode === 'all'} onClick={() => setSplitMode('all')}>One PDF per page</Chip>
                    <Chip active={splitMode === 'ranges'} onClick={() => setSplitMode('ranges')}>Custom ranges</Chip>
                  </OptionRow>
                  {splitMode === 'ranges' && (
                    <div>
                      <Input value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="e.g. 1-3, 5, 8-10" aria-label="Page ranges" className="max-w-xs" />
                      <p className="text-xs text-muted-foreground mt-1">Each range becomes its own PDF.</p>
                    </div>
                  )}
                </>
              )}
              {ORDERED(mode) && files.length > 1 && (
                <p className="text-xs text-muted-foreground">Use the arrows to change the order.</p>
              )}
            </div>
          )}

          {busy && (
            <div className="mb-6">
              <Progress value={progress} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-2">Working in your browser — nothing is uploaded.</p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 space-y-1">
              {errors.map((e, i) => (
                <p key={i} className="text-sm text-destructive flex gap-2"><AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />{e}</p>
              ))}
            </div>
          )}

          {files.length > 0 && !results && (
            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={reset} disabled={busy}>Reset</Button>
              <Button onClick={run} disabled={!canRun}>
                {busy ? 'Working…' : actionLabel(mode, to, files.length)}
              </Button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div>
              {results.length > 0 && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-5 mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {results.length === 1 ? 'Done!' : `Done! ${results.length} files ready`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {fmtSize(totalIn)} in → {fmtSize(results.reduce((a, r) => a + r.blob.size, 0))} out
                      </p>
                    </div>
                  </div>
                  <Button onClick={downloadAll}>
                    <Download className="w-4 h-4 mr-2" />
                    {results.length === 1 ? `Download ${results[0].filename}` : 'Download all (ZIP)'}
                  </Button>
                </div>
              )}

              {results.length > 1 && (
                <ul className="space-y-2 mb-5 max-h-80 overflow-y-auto">
                  {results.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-foreground truncate">{r.filename}</span>
                        <span className="block text-xs text-muted-foreground">
                          {fmtSize(r.blob.size)}
                          {r.width ? ` · ${r.width}×${r.height}px` : ''}
                          {r.pages ? ` · ${r.pages} page${r.pages === 1 ? '' : 's'}` : ''}
                        </span>
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => downloadBlob(r.blob, r.filename)} aria-label={`Download ${r.filename}`}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {results.length === 1 && (results[0].width || results[0].pages) && (
                <p className="text-sm text-muted-foreground mb-5 text-center">
                  {results[0].width ? `${results[0].width}×${results[0].height}px · ` : ''}
                  {results[0].pages ? `${results[0].pages} page${results[0].pages === 1 ? '' : 's'} · ` : ''}
                  {fmtSize(results[0].blob.size)}
                </p>
              )}

              <div className="text-center">
                <Button variant="ghost" onClick={reset} className="text-primary">
                  <Plus className="w-4 h-4 mr-2" /> Convert more files
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const OptionRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm font-medium text-foreground mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:bg-muted/50'
    }`}
  >
    {children}
  </button>
);

export default ConverterTool;
