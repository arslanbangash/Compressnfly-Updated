import { 
  Zap, 
  Shield, 
  FileType, 
  Upload, 
  Sliders, 
  ShieldCheck, 
  RefreshCw, 
  Gauge, 
  Smartphone 
} from 'lucide-react';

const Features = () => {
  const whyChooseFeatures = [
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Our optimized algorithms compress files quickly without long wait times."
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Files are processed in your browser and never uploaded to our servers."
    },
    {
      icon: FileType,
      title: "Multiple Formats",
      description: "Supports all Image, Documents, Spreadsheets, CSVs, Archives, PDFs and Presentations formats with quality options."
    }
  ];

  const allFeatures = [
    {
      icon: Upload,
      title: "Multi-Format Support",
      description: "Compress images, documents, spreadsheets, archives, and more with one tool."
    },
    {
      icon: Sliders,
      title: "Custom Compression",
      description: "Choose your compression level and remove metadata for privacy and size savings."
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description: "All processing is done in your browser. Your files never leave your device."
    },
    {
      icon: RefreshCw,
      title: "Batch Compression",
      description: "Compress multiple files at once and download them all as a ZIP archive."
    },
    {
      icon: Gauge,
      title: "Fast & Efficient",
      description: "Optimized algorithms ensure quick results without sacrificing quality."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Works seamlessly on desktop and mobile devices for on-the-go compression."
    }
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Upload Your File",
      description: "Drag & drop or click to browse files from your device."
    },
    {
      step: "2",
      title: "Choose Settings",
      description: "Select compression level and other options if needed."
    },
    {
      step: "3",
      title: "Download Result",
      description: "Get your compressed file instantly with one click."
    }
  ];

  return (
    <div className="space-y-24">
      {/* Why Choose Our Compressor */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Compressor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced compression technology that delivers exceptional results every time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="glass-card p-8 rounded-2xl text-center hover:shadow-elevated transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional file compression in one simple tool
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/10 hover:border-primary/20 hover:shadow-soft transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, fast, and secure file compression in just 3 steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
          
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass-card p-8 rounded-2xl text-center hover:shadow-elevated transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-full mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="font-semibold text-xl mb-3 text-card-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;