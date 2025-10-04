import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '@/assets/compressnfly-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Compressnfly" className="h-10 w-10" />
              <span className="text-2xl font-bold text-foreground">
                Compressnfly
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                Home
              </Link>
            <a href="/#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
              Features
            </a>
              <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                Blog
              </Link>
              <a href="/#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                Contact
              </a>
            </nav>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-muted/50 focus:outline-none transition-all duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-border/10">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200">
              Home
            </Link>
            <a href="/#features" className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200">
              Features
            </a>
            <Link to="/blog" className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200">
              Blog
            </Link>
            <a href="/#contact" className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;