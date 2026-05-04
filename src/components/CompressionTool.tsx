import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { compressFile, downloadBlob, CompressionLevel, CompressionResult } from '@/lib/compressionEngine';
import JSZip from 'jszip';
import {
  CloudUpload, FileImage, File, FileText, FileSpreadsheet,
  Archive, X, Download, Plus, RotateCcw, CheckCircle,
  FileVideo, FileAudio, FileType, FileJson, Presentation, AlertCircle
} from 'lucide-react';

interface FileInfo {
  file: File;
  result?: CompressionResult;
  error?: string;
}

const CompressionTool = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('balanced');
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileName, setCurrentFileName] = useState('');
  const [isCompressed, setIsCompressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return FileImage;
    if (file.type.startsWith('video/')) return FileVideo;
    if (file.type.startsWith('audio/')) return FileAudio;
    if (file.type === 'application/pdf') return FileText;
    if (file.type.includes('spreadsheet') || file.type.includes('excel') ||
      file.name.toLowerCase().match(/\.(xlsx|xls|csv|ods)$/)) return FileSpreadsheet;
    if (file.type.includes('presentation') || file.type.includes('powerpoint') ||
      file.name.toLowerCase().match(/\.(pptx|ppt|odp)$/)) return Presentation;
    if (file.type.includes('word') || file.type.includes('document') ||
      file.name.toLowerCase().match(/\.(docx|doc|rtf|odt)$/)) return FileText;
    if (file.type.includes('zip') || file.type.includes('archive') ||
      file.name.toLowerCase().match(/\.(zip|rar|7z|tar|gz)$/)) return Archive;
    if (file.name.toLowerCase().match(/\.(json)$/) || file.type === 'application/json') return FileJson;
    if (file.name.toLowerCase().match(/\.(txt|md|xml)$/) || file.type === 'text/plain') return FileType;
    return File;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} Bytes`;
  };

  const handleFileSelection = useCallback(async (selectedFiles: File[]) => {
    const maxSize = 100 * 1024 * 1024;
    const oversized = selectedFiles.filter(f => f.size > maxSize);
    if (oversized.length > 0) {
      toast({
        title: "File too large",
        description: `Files exceeding 100MB: ${oversized.map(f => f.name).join(', ')}`,
        variant: "destructive",
      });
      selectedFiles = selectedFiles.filter(f => f.size <= maxSize);
      if (selectedFiles.length === 0) return;
    }
    setFiles(selectedFiles.map(file => ({ file })));
    setIsCompressed(false);
    setProgress(0);
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    handleFileSelection(Array.from(e.dataTransfer.files));
  }, [handleFileSelection]);
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFileSelection(Array.from(e.target.files));
  }, [handleFileSelection]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setIsCompressed(false);
  };

  // ── REAL compression using compressionEngine ──────────────────────────────
  const compressFiles = async () => {
    if (files.length === 0) return;
    setIsCompressing(true);
    setProgress(0);

    const updatedFiles: FileInfo[] = [...files];

    for (let i = 0; i < files.length; i++) {
      const fileInfo = files[i];
      setCurrentFileName(fileInfo.file.name);
      try {
        const result = await compressFile(fileInfo.file, compressionLevel);
        updatedFiles[i] = { ...fileInfo, result };
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Compression failed';
        updatedFiles[i] = { ...fileInfo, error: msg };
        toast({
          title: `Failed: ${fileInfo.file.name}`,
          description: msg,
          variant: "destructive",
        });
      }
      setProgress(((i + 1) / files.length) * 100);
      setFiles([...updatedFiles]);
    }

    setIsCompressing(false);
    setIsCompressed(true);
    setCurrentFileName('');

    const succeeded = updatedFiles.filter(f => f.result).length;
    const failed = updatedFiles.filter(f => f.error).length;
    toast({
      title: succeeded > 0 ? "Compression complete!" : "Compression failed",
      description: failed > 0
        ? `${succeeded} file(s) compressed, ${failed} failed.`
        : `${succeeded} file(s) compressed successfully.`,
      variant: succeeded > 0 ? "default" : "destructive",
    });
  };

  const downloadSingle = (fileInfo: FileInfo) => {
    if (!fileInfo.result) return;
    downloadBlob(fileInfo.result.blob, fileInfo.result.filename);
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    for (const fileInfo of files) {
      if (fileInfo.result) {
        const ab = await fileInfo.result.blob.arrayBuffer();
        zip.file(fileInfo.result.filename, ab);
      }
    }
    const content = await zip.generateAsync({ type: 'blob' });
    downloadBlob(content, 'compressed_files.zip');
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompressed(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalOriginal = files.reduce((acc, f) => acc + f.file.size, 0);
  const totalCompressed = files.reduce((acc, f) => acc + (f.result?.compressedSize ?? f.file.size), 0);
  const overallSaving = totalOriginal > 0
    ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">

          {/* ── Drop Zone ── */}
          {files.length === 0 && (
            <div
              className={`file-drop-area rounded-lg p-12 text-center cursor-pointer mb-6 ${isDragging ? 'active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center">
                <CloudUpload className="w-12 h-12 text-primary mb-4 animate-bounce" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Drag & drop files here</h3>
                <p className="text-muted-foreground mb-4">PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, ZIP & more</p>
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">Browse Files</Button>
                <p className="text-xs text-muted-foreground mt-2">Max 100MB per file · Files never leave your device</p>
              </div>
              <input
                ref={fileInputRef} type="file" className="hidden" multiple
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.odt,.ods,.odp,.zip,.tar,.gz,.json,.xml,.md"
                onChange={handleFileInputChange}
              />
            </div>
          )}

          {/* ── File cards ── */}
          {files.length > 0 && (
            <div className="mb-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((fileInfo, index) => {
                  const Icon = getFileIcon(fileInfo.file);
                  return (
                    <div key={index} className="relative bg-muted rounded-lg p-4 h-48 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center flex-1 min-w-0">
                          <Icon className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-foreground text-sm truncate">{fileInfo.file.name}</h4>
                            <p className="text-xs text-muted-foreground">{formatFileSize(fileInfo.file.size)}</p>
                          </div>
                        </div>
                        {!isCompressing && (
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-foreground flex-shrink-0 h-6 w-6 p-0">
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        {fileInfo.error ? (
                          <div className="text-center">
                            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-1" />
                            <p className="text-xs text-destructive">{fileInfo.error}</p>
                          </div>
                        ) : fileInfo.result ? (
                          <div className="text-center">
                            <CheckCircle className="w-8 h-8 text-success mx-auto mb-1" />
                            <p className="text-xs text-success font-medium">
                              {fileInfo.result.compressionPercent}% smaller
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(fileInfo.file.size)} → {formatFileSize(fileInfo.result.compressedSize)}
                            </p>
                          </div>
                        ) : (
                          <Icon className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Options ── */}
          {files.length > 0 && !isCompressed && (
            <div className="mb-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Compression Level</label>
                  <Select value={compressionLevel} onValueChange={(v) => setCompressionLevel(v as CompressionLevel)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-quality">High Quality — minimal size reduction</SelectItem>
                      <SelectItem value="web-optimized">Web Optimized — good quality, smaller</SelectItem>
                      <SelectItem value="balanced">Balanced — recommended</SelectItem>
                      <SelectItem value="small-size">Small Size — maximum compression</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" onClick={() => setCompressionLevel('balanced')} className="text-primary">
                    <RotateCcw className="w-4 h-4 mr-1" /> Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ── Progress ── */}
          {isCompressing && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground truncate max-w-xs">
                  Compressing {currentFileName}…
                </span>
                <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2.5" />
              <p className="text-xs text-muted-foreground mt-1">Files are processed entirely in your browser — nothing is uploaded.</p>
            </div>
          )}

          {/* ── Action buttons ── */}
          {files.length > 0 && !isCompressed && (
            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={resetTool} disabled={isCompressing}>Reset</Button>
              <Button
                onClick={compressFiles}
                disabled={isCompressing}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {isCompressing ? 'Compressing…' : `Compress File${files.length > 1 ? 's' : ''}`}
              </Button>
            </div>
          )}

          {/* ── Results ── */}
          {isCompressed && (
            <div className="animate-fade-in-up">
              <div className="bg-success/10 border border-success/20 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-success mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Compression complete!</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(totalOriginal)} → {formatFileSize(totalCompressed)}
                        {overallSaving > 0 && ` (${overallSaving}% smaller)`}
                      </p>
                    </div>
                  </div>
                  {files.length > 1 && (
                    <Button onClick={downloadAllAsZip} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      <Download className="w-4 h-4 mr-2" /> Download All as ZIP
                    </Button>
                  )}
                </div>
              </div>

              {/* Per-file results */}
              <div className="space-y-4 mb-6">
                {files.map((fileInfo, index) => {
                  const Icon = getFileIcon(fileInfo.file);
                  const isImage = fileInfo.file.type.startsWith('image/');
                  const objectUrl = fileInfo.result ? URL.createObjectURL(fileInfo.result.blob) : null;

                  return (
                    <div key={index} className="bg-muted rounded-lg p-5">
                      <div className="flex items-center mb-3">
                        <Icon className="w-5 h-5 text-primary mr-2" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm truncate">{fileInfo.file.name}</h4>
                          {fileInfo.result && (
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(fileInfo.file.size)} → {formatFileSize(fileInfo.result.compressedSize)}
                              {' '}({fileInfo.result.compressionPercent}% smaller)
                            </p>
                          )}
                          {fileInfo.error && (
                            <p className="text-xs text-destructive">{fileInfo.error}</p>
                          )}
                        </div>
                      </div>

                      {/* Before / After preview for images */}
                      {isImage && fileInfo.result && (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-background rounded-lg p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2 text-center">Before</p>
                            <div className="aspect-square bg-muted/50 rounded overflow-hidden">
                              <img src={URL.createObjectURL(fileInfo.file)} alt="Original"
                                className="w-full h-full object-cover" />
                            </div>
                            <p className="text-xs font-medium text-center mt-1">{formatFileSize(fileInfo.file.size)}</p>
                          </div>
                          <div className="bg-background rounded-lg p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2 text-center">After</p>
                            <div className="aspect-square bg-muted/50 rounded overflow-hidden">
                              {objectUrl && <img src={objectUrl} alt="Compressed" className="w-full h-full object-cover" />}
                            </div>
                            <p className="text-xs font-medium text-center mt-1 text-success">
                              {formatFileSize(fileInfo.result.compressedSize)}
                            </p>
                          </div>
                        </div>
                      )}

                      {fileInfo.result && (
                        <Button onClick={() => downloadSingle(fileInfo)} size="sm"
                          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                          <Download className="w-4 h-4 mr-1" />
                          Download {fileInfo.result.filename}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button variant="ghost" onClick={resetTool} className="text-primary hover:text-primary-hover">
                  <Plus className="w-4 h-4 mr-2" /> Compress Another File
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default CompressionTool;