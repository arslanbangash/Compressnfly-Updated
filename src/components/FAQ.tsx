import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Is my data secure?",
      answer: "Yes! All compression is done locally in your browser. We don't store or have access to your files."
    },
    {
      question: "What file formats are supported?",
      answer: "We support a wide range of formats including images (JPEG, PNG, GIF), documents (PDF, DOCX), spreadsheets (XLSX, CSV), and archives (ZIP, RAR)."
    },
    {
      question: "Do I need to install any software?",
      answer: "No software installation is required. Our tool works entirely in your browser."
    },
    {
      question: "How do I compress a file?",
      answer: "Simply upload your file, choose your desired compression settings, and click on the \"Compress File\" button. Your compressed file will be ready for download in seconds."
    },
    {
      question: "What is the maximum file size?",
      answer: "The maximum file size for compression is 100MB per file."
    }
  ];

  return (
    <div id="faq" className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="bg-card rounded-xl shadow-md border-0 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 transition-colors">
              <span className="font-medium text-card-foreground">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;