import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div id="contact" className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-card p-8 rounded-xl shadow-md text-center">
        <div className="text-primary text-4xl mb-4 flex justify-center">
          <Mail size={48} />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Contact Developer</h2>
        <p className="text-muted-foreground mb-4">Have questions, feedback, or need help?</p>
        <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
          <a href="mailto:compressnfly@outlook.com">
            compressnfly@outlook.com
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Contact;