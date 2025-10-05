import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm">
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Bottom Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by NASA Exoplanet Archive & Machine Learning</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://exoplanetarchive.ipac.caltech.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              NASA Exoplanet Archive
            </a>
            <span className="text-border">|</span>
            <span>© 2025 Planopticon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
