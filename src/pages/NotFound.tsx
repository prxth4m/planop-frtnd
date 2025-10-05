import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background stars-bg relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="text-center mb-20">
          <h1 className="mb-4 text-8xl font-bold glow-text">404</h1>
          <p className="mb-8 text-2xl text-muted-foreground">Oops! Lost in space</p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 glow-border"
          >
            Return to Home Base
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
