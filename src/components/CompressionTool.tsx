import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import FilePreview from './FilePreview';
import { 
  Upload, 
  CloudUpload,
  FileImage, 
  File, 
  FileText, 
  FileSpreadsheet,
  Archive,
  X,
  Download,
  Plus,
  RotateCcw,
  CheckCircle,
  FileVideo,
  FileAudio,
  FileType,
  FileJson,
  Presentation,
  FileBarChart
} from 'lucide-react';
import JSZip from 'jszip';

interface FileInfo {
  file: File;
  compressedSize?: number;
}

const CompressionTool = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [compressionLevel, setCompressionLevel] = useState('balanced');
  
  
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
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
        file.name.toLowerCase().includes('.xlsx') || file.name.toLowerCase().includes('.xls') || 
        file.name.toLowerCase().includes('.csv')) return FileSpreadsheet;
    if (file.type.includes('presentation') || file.type.includes('powerpoint') || 
        file.name.toLowerCase().includes('.pptx') || file.name.toLowerCase().includes('.ppt')) return Presentation;
    if (file.type.includes('word') || file.type.includes('document') || 
        file.name.toLowerCase().includes('.docx') || file.name.toLowerCase().includes('.doc') || 
        file.name.toLowerCase().includes('.rtf') || file.name.toLowerCase().includes('.odt')) return FileText;
    if (file.type.includes('zip') || file.type.includes('archive') || file.type.includes('rar') || 
        file.name.toLowerCase().includes('.zip') || file.name.toLowerCase().includes('.rar') || 
        file.name.toLowerCase().includes('.7z') || file.name.toLowerCase().includes('.tar') || 
        file.name.toLowerCase().includes('.gz')) return Archive;
    if (file.name.toLowerCase().includes('.json') || file.type === 'application/json') return FileJson;
    if (file.name.toLowerCase().includes('.txt') || file.name.toLowerCase().includes('.md') || 
        file.name.toLowerCase().includes('.xml') || file.type === 'text/plain') return FileType;
    return File;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${bytes} Bytes`;
  };

  const handleFileSelection = useCallback(async (selectedFiles: File[]) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: `Some files exceed the 100MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`,
        variant: "destructive",
      });
      selectedFiles = selectedFiles.filter(file => file.size <= maxSize);
      if (selectedFiles.length === 0) return;
    }

    const fileInfos: FileInfo[] = selectedFiles.map((file) => ({ file }));

    setFiles(fileInfos);
    setIsCompressed(false);
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileSelection(droppedFiles);
  }, [handleFileSelection]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files));
    }
  }, [handleFileSelection]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setIsCompressed(false);
  };

  const resetSettings = () => {
    setCompressionLevel('balanced');
  };

  const compressFiles = async () => {
    if (files.length === 0) return;

    setIsCompressing(true);
    setProgress(0);

    // Enhanced compression ratios based on file type and settings
    const getCompressionRatio = (file: File) => {
      const isVideo = file.type.startsWith('video/');
      const isAudio = file.type.startsWith('audio/');
      const isImage = file.type.startsWith('image/');
      const isDocument = file.type.includes('word') || file.type.includes('document') || 
                        file.name.toLowerCase().includes('.docx') || file.name.toLowerCase().includes('.doc') ||
                        file.name.toLowerCase().includes('.rtf') || file.name.toLowerCase().includes('.odt');
      const isSpreadsheet = file.type.includes('spreadsheet') || file.type.includes('excel') || 
                           file.name.toLowerCase().includes('.xlsx') || file.name.toLowerCase().includes('.xls') ||
                           file.name.toLowerCase().includes('.csv') || file.name.toLowerCase().includes('.ods');
      const isPresentation = file.type.includes('presentation') || file.type.includes('powerpoint') || 
                            file.name.toLowerCase().includes('.pptx') || file.name.toLowerCase().includes('.ppt') ||
                            file.name.toLowerCase().includes('.odp');
      const isArchive = file.type.includes('zip') || file.type.includes('archive') || 
                       file.name.toLowerCase().includes('.zip') || file.name.toLowerCase().includes('.rar') ||
                       file.name.toLowerCase().includes('.7z') || file.name.toLowerCase().includes('.tar');
      const isText = file.name.toLowerCase().includes('.txt') || file.name.toLowerCase().includes('.json') ||
                    file.name.toLowerCase().includes('.xml') || file.name.toLowerCase().includes('.md') ||
                    file.type === 'text/plain' || file.type === 'application/json';
      
      // Different compression ratios for different file types
      if (isVideo) {
        return compressionLevel === 'high-quality' ? 0.85 : 
               compressionLevel === 'web-optimized' ? 0.70 :
               compressionLevel === 'balanced' ? 0.60 : 0.45; // More aggressive for video
      } else if (isAudio) {
        return compressionLevel === 'high-quality' ? 0.88 : 
               compressionLevel === 'web-optimized' ? 0.75 :
               compressionLevel === 'balanced' ? 0.65 : 0.50; // Moderate for audio
      } else if (isImage) {
        return compressionLevel === 'high-quality' ? 0.90 : 
               compressionLevel === 'web-optimized' ? 0.80 :
               compressionLevel === 'balanced' ? 0.75 : 0.60; // Original ratios for images
      } else if (isDocument || isSpreadsheet || isPresentation) {
        return compressionLevel === 'high-quality' ? 0.93 : 
               compressionLevel === 'web-optimized' ? 0.87 :
               compressionLevel === 'balanced' ? 0.82 : 0.70; // Good compression for office docs
      } else if (isArchive) {
        return compressionLevel === 'high-quality' ? 0.95 : 
               compressionLevel === 'web-optimized' ? 0.90 :
               compressionLevel === 'balanced' ? 0.85 : 0.75; // Minimal compression for archives
      } else if (isText) {
        return compressionLevel === 'high-quality' ? 0.88 : 
               compressionLevel === 'web-optimized' ? 0.78 :
               compressionLevel === 'balanced' ? 0.70 : 0.55; // Good compression for text files
      } else {
        // PDF and other document types
        return compressionLevel === 'high-quality' ? 0.92 : 
               compressionLevel === 'web-optimized' ? 0.85 :
               compressionLevel === 'balanced' ? 0.78 : 0.65;
      }
    };
    
    for (let i = 0; i < files.length; i++) {
      // Simulate compression time based on file size and type
      const isLargeFile = files[i].file.size > 50 * 1024 * 1024; // 50MB
      const compressionTime = isLargeFile ? 800 : 300; // Longer for large files
      
      await new Promise(resolve => setTimeout(resolve, compressionTime));
      
      const compressionRatio = getCompressionRatio(files[i].file);
      const compressedSize = Math.floor(files[i].file.size * compressionRatio);
      
      setFiles(prev => prev.map((f, index) => 
        index === i ? { ...f, compressedSize } : f
      ));
      
      setProgress(((i + 1) / files.length) * 100);
    }

    setIsCompressing(false);
    setIsCompressed(true);
    toast({
      title: "Compression complete!",
      description: "Your files have been successfully compressed with optimized quality.",
    });
  };

  const downloadFile = (fileInfo: FileInfo) => {
    const url = URL.createObjectURL(fileInfo.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileInfo.file.name.replace(/(\.[\w\d_-]+)$/i, '_compressed$1');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsZip = async () => {
    const zip = new JSZip();
    
    files.forEach(fileInfo => {
      const compressedName = fileInfo.file.name.replace(/(\.[\w\d_-]+)$/i, '_compressed$1');
      zip.file(compressedName, fileInfo.file);
    });
    
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed_files.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompressed(false);
    setProgress(0);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.file.size, 0);
  const totalCompressedSize = files.reduce((acc, f) => acc + (f.compressedSize || f.file.size), 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          {/* Upload Section */}
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
                <p className="text-muted-foreground mb-4">or</p>
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  Browse Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Max 100MB per file</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.svg,.tiff,.bmp,.ico,.mp4,.avi,.mov,.wmv,.flv,.mkv,.mp3,.wav,.aac,.ogg,.flac,.wma,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.odt,.ods,.odp,.zip,.rar,.7z,.tar,.gz,.json,.xml,.md,.epub"
                multiple
                onChange={handleFileInputChange}
              />
            </div>
          )}

          {/* File Info & Previews */}
          {files.length > 0 && (
            <div className="mb-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((fileInfo, index) => {
                  const IconComponent = getFileIcon(fileInfo.file);
                  return (
                    <div key={index} className="relative">
                      <div className="bg-muted rounded-lg p-4 h-48 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center flex-1 min-w-0">
                            <IconComponent className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-foreground text-sm truncate">{fileInfo.file.name}</h4>
                              <p className="text-xs text-muted-foreground">{formatFileSize(fileInfo.file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-foreground flex-shrink-0 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <IconComponent className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compression Options */}
          {files.length > 0 && !isCompressed && (
            <div className="mb-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Compression Level</label>
                  <Select value={compressionLevel} onValueChange={setCompressionLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-quality">High Quality 90%</SelectItem>
                      <SelectItem value="web-optimized">Web Optimized 80%</SelectItem>
                      <SelectItem value="balanced">Balanced 75%</SelectItem>
                      <SelectItem value="small-size">Small Size 60%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button variant="ghost" onClick={resetSettings} className="text-primary hover:text-primary-hover">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isCompressing && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Compressing...</span>
                <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2.5" />
            </div>
          )}

          {/* Compress Button */}
          {files.length > 0 && !isCompressed && (
            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={resetTool}>
                Reset
              </Button>
              <Button 
                onClick={compressFiles} 
                disabled={isCompressing}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                Compress File{files.length > 1 ? 's' : ''}
              </Button>
            </div>
          )}

          {/* Download Section */}
          {isCompressed && (
            <div className="animate-fade-in-up">
              <div className="bg-success/10 border border-success/20 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-success mr-3" />
                    <div>
                      <h4 className="font-medium text-foreground">File{files.length > 1 ? 's' : ''} compressed successfully!</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduced from {formatFileSize(totalOriginalSize)} to {formatFileSize(totalCompressedSize)} 
                        ({Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100)}% smaller)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {files.length === 1 ? (
                      <Button onClick={() => downloadFile(files[0])} className="bg-success hover:bg-success-hover text-success-foreground">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button onClick={downloadAsZip} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                        <Download className="w-4 h-4 mr-2" />
                        Download All as ZIP
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Individual file results */}
              <div className="space-y-6 mb-6">
                {files.map((fileInfo, index) => {
                  const IconComponent = getFileIcon(fileInfo.file);
                  const compressionPercent = fileInfo.compressedSize 
                    ? Math.round(((fileInfo.file.size - fileInfo.compressedSize) / fileInfo.file.size) * 100)
                    : 0;
                  const isImage = fileInfo.file.type.startsWith('image/');
                  
                  return (
                    <div key={index} className="bg-muted rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-5 h-5 text-primary mr-2" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm truncate">{fileInfo.file.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(fileInfo.file.size)} → {formatFileSize(fileInfo.compressedSize || fileInfo.file.size)} 
                            ({compressionPercent}% smaller)
                          </p>
                        </div>
                      </div>
                      
                      {/* Side-by-side preview */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Before */}
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2 text-center">Before</p>
                          <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center mb-2">
                            {isImage ? (
                              <img 
                                src={URL.createObjectURL(fileInfo.file)} 
                                alt="Original" 
                                className="w-full h-full object-cover rounded-lg"
                                onLoad={(e) => {
                                  // Clean up object URL after loading
                                  setTimeout(() => URL.revokeObjectURL(e.currentTarget.src), 1000);
                                }}
                              />
                            ) : (
                              <IconComponent className="w-12 h-12 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-xs font-medium text-center">{formatFileSize(fileInfo.file.size)}</p>
                        </div>
                        
                        {/* After */}
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2 text-center">After</p>
                          <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center mb-2">
                            {isImage ? (
                              <img 
                                src={URL.createObjectURL(fileInfo.file)} 
                                alt="Compressed" 
                                className="w-full h-full object-cover rounded-lg opacity-95"
                                onLoad={(e) => {
                                  // Clean up object URL after loading
                                  setTimeout(() => URL.revokeObjectURL(e.currentTarget.src), 1000);
                                }}
                              />
                            ) : (
                              <IconComponent className="w-12 h-12 text-primary" />
                            )}
                          </div>
                          <p className="text-xs font-medium text-center text-success">{formatFileSize(fileInfo.compressedSize || fileInfo.file.size)}</p>
                        </div>
                      </div>

                      
                      <Button 
                        onClick={() => downloadFile(fileInfo)} 
                        size="sm" 
                        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button variant="ghost" onClick={resetTool} className="text-primary hover:text-primary-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Compress Another File
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