import { ImageIcon, FileTextIcon, FileSpreadsheetIcon, PresentationIcon, ArchiveIcon, FileIcon, Music2Icon, VideoIcon, PlusIcon } from 'lucide-react';
import ParticleSystem from './ParticleSystem';

const Hero = () => {
  return <section className="relative subtle-hero-gradient py-24 lg:py-32 px-6 text-center overflow-hidden">
      {/* Subtle Animated Background with Gentle Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleSystem />
        <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full filter blur-2xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight lg:text-6xl">
          Free Online File Compressor
          <br />
          
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed md:text-lg font-normal">
          Reduce the size of your images, PDFs, and documents instantly with our free online file compression tool. Fast, secure, and easy to use. Try it now!
        </p>
        <div className="mt-8 space-y-6">
          {/* Privacy and Support Info */}
          

          {/* Supported Formats */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-base font-semibold text-center mb-3 text-foreground">Supported File Formats</h3>
            
            {/* All Formats in One Section */}
            <div className="flex flex-wrap justify-center gap-2">
              {/* Images */}
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">JPG</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">PNG</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">WEBP</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">GIF</span>
              </div>
              
              {/* Documents */}
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileTextIcon className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-medium">PDF</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileTextIcon className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-medium">DOC</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileTextIcon className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-medium">DOCX</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileSpreadsheetIcon className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium">XLS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileSpreadsheetIcon className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium">XLSX</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <PresentationIcon className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium">PPT</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <PresentationIcon className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium">PPTX</span>
              </div>
              
              {/* Archives & Media */}
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ArchiveIcon className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-medium">ZIP</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <ArchiveIcon className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-medium">RAR</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <Music2Icon className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-xs font-medium">MP3</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <VideoIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-xs font-medium">MP4</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <FileIcon className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-medium">TXT</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/40 backdrop-blur-sm border border-border/40 rounded-md px-2.5 py-1.5">
                <PlusIcon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">30+ More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;