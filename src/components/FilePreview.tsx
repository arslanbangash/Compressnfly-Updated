import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileImage, 
  File, 
  FileText, 
  FileSpreadsheet,
  Archive,
  FileVideo,
  FileAudio,
  FileType,
  FileJson,
  Presentation,
  FileBarChart,
  Eye,
  Download
} from 'lucide-react';

interface FilePreviewProps {
  file: File;
  compressedSize?: number;
  showComparison?: boolean;
  onDownload?: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ 
  file, 
  compressedSize, 
  showComparison = false,
  onDownload 
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileIcon, setFileIcon] = useState<React.ComponentType<any>>(File);

  useEffect(() => {
    generatePreview();
    setFileIcon(getFileIcon(file));
  }, [file]);

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

  const generatePreview = async () => {
    try {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setPreview('pdf-preview');
      } else if (file.type.startsWith('text/') || file.name.toLowerCase().includes('.txt') || 
                 file.name.toLowerCase().includes('.json') || file.name.toLowerCase().includes('.md')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setPreview(text.substring(0, 500) + (text.length > 500 ? '...' : ''));
        };
        reader.readAsText(file);
      } else if (file.type.startsWith('audio/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error generating preview:', error);
    }
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

  const renderPreviewContent = (isCompressed?: boolean) => {
    const IconComponent = fileIcon;
    
    if (file.type.startsWith('image/') && preview) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg overflow-hidden">
          <img 
            src={preview} 
            alt={`${isCompressed ? 'Compressed ' : ''}${file.name}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }
    
    if (file.type.startsWith('video/') && preview) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg overflow-hidden">
          <video 
            src={preview} 
            className="max-w-full max-h-full object-contain"
            controls
            muted
          />
        </div>
      );
    }
    
    if (file.type.startsWith('audio/') && preview) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
          <FileAudio className="w-12 h-12 text-primary mb-4" />
          <audio src={preview} controls className="w-full max-w-xs" />
        </div>
      );
    }
    
    if (file.type.startsWith('text/') && preview) {
      return (
        <div className="w-full h-full bg-muted rounded-lg p-4 overflow-auto">
          <pre className="text-xs whitespace-pre-wrap text-foreground font-mono">
            {preview.length > 500 ? preview.substring(0, 500) + '...' : preview}
          </pre>
        </div>
      );
    }
    
    if (file.type === 'application/pdf') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
          <FileText className="w-12 h-12 text-primary mb-2" />
          <p className="text-xs text-muted-foreground text-center">PDF Preview</p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            {formatFileSize(isCompressed && compressedSize ? compressedSize : file.size)}
          </p>
        </div>
      );
    }
    
    // Fallback for other file types
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
        <IconComponent className="w-12 h-12 text-primary mb-2" />
        <p className="text-xs text-muted-foreground text-center">{file.name}</p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          {formatFileSize(isCompressed && compressedSize ? compressedSize : file.size)}
        </p>
      </div>
    );
  };

  // Regular comparison view
  if (showComparison && compressedSize) {
    const compressionPercent = Math.round(((file.size - compressedSize) / file.size) * 100);
    
    return (
      <div className="w-full bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">Compression Result</h3>
            {onDownload && (
              <Button onClick={onDownload} size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            File compressed by {compressionPercent}% - Original: {formatFileSize(file.size)} → Compressed: {formatFileSize(compressedSize)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div>
            <h4 className="font-medium text-foreground mb-3 text-center">Original</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-48">
              {renderPreviewContent(false)}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Size: {formatFileSize(file.size)}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3 text-center">Compressed</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-48">
              {renderPreviewContent(true)}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Size: {formatFileSize(compressedSize)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Single preview
  return (
    <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-48">
      {renderPreviewContent()}
    </div>
  );
};

export default FilePreview;