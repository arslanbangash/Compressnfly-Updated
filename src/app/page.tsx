import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CompressionTool from "@/components/CompressionTool";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CompressionTool />
      <Features />
      <FAQ />
      <Contact />
    </div>
  );
}
