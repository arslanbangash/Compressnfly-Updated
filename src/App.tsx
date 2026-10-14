import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import RouteSeo from "./components/RouteSeo";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import PDFCompressionGuide from "./pages/PDFCompressionGuide";
import FileCompressionGuide from "./pages/FileCompressionGuide";
import FileSizeImportance from "./pages/FileSizeImportance";
import VideoCompressionGuide from "./pages/VideoCompressionGuide";
import AudioCompressionGuide from "./pages/AudioCompressionGuide";
import CompressPDFGuide from "./pages/CompressPDFGuide";
import CompressImagesGuide from "./pages/CompressImagesGuide";
import ReduceWordDocSize from "./pages/ReduceWordDocSize";
import WhyFileSoLarge from "./pages/WhyFileSoLarge";
import CompressFilesOnlineFree from "./pages/CompressFilesOnlineFree";
import CompressPDFForEmail from "./pages/CompressPDFForEmail";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// The router (BrowserRouter in the browser, StaticRouter during prerender)
// and HelmetProvider are added in main.tsx / entry-server.tsx.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouteSeo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/pdf-compression-guide" element={<PDFCompressionGuide />} />
          <Route path="/blog/file-compression-guide" element={<FileCompressionGuide />} />
          <Route path="/blog/file-size-importance" element={<FileSizeImportance />} />
          <Route path="/blog/video-compression-guide" element={<VideoCompressionGuide />} />
          <Route path="/blog/audio-compression-guide" element={<AudioCompressionGuide />} />
          <Route path="/blog/compress-pdf-without-losing-quality" element={<CompressPDFGuide />} />
          <Route path="/blog/compress-images-online" element={<CompressImagesGuide />} />
          <Route path="/blog/reduce-word-document-file-size" element={<ReduceWordDocSize />} />
          <Route path="/blog/why-is-my-file-so-large" element={<WhyFileSoLarge />} />
          <Route path="/blog/compress-pdf-for-email" element={<CompressPDFForEmail />} />
          <Route path="/blog/compress-files-online-free" element={<CompressFilesOnlineFree />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
