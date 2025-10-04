import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import PDFCompressionGuide from "./pages/PDFCompressionGuide";
import FileCompressionGuide from "./pages/FileCompressionGuide";
import FileSizeImportance from "./pages/FileSizeImportance";
import VideoCompressionGuide from "./pages/VideoCompressionGuide";
import AudioCompressionGuide from "./pages/AudioCompressionGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/pdf-compression-guide" element={<PDFCompressionGuide />} />
            <Route path="/blog/file-compression-guide" element={<FileCompressionGuide />} />
            <Route path="/blog/file-size-importance" element={<FileSizeImportance />} />
            <Route path="/blog/video-compression-guide" element={<VideoCompressionGuide />} />
            <Route path="/blog/audio-compression-guide" element={<AudioCompressionGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
