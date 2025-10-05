import { Satellite, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardFooter = () => {
  const catalogs = [
    {
      icon: "🔭",
      title: "Kepler Mission",
      mission: "Kepler Space Telescope (2009-2018)",
      description: "NASA's first planet-hunting mission that stared at a single patch of sky containing over 150,000 stars. The Kepler mission discovered over 2,700 confirmed exoplanets by detecting the slight dimming of stars as planets pass in front of them. Its high-precision photometry revolutionized our understanding of planetary systems beyond our solar system.",
      stats: "4,000+ confirmed planets • 150,000+ stars monitored"
    },
    {
      icon: "🌟",
      title: "K2 Mission",
      mission: "Kepler Extended Mission (2014-2018)",
      description: "After the failure of two reaction wheels on the Kepler spacecraft, NASA repurposed the telescope for the K2 mission. Using solar pressure for stability, K2 observed different fields across the ecliptic plane in ~80-day campaigns. This extended mission discovered additional exoplanets and studied young stars, supernovae, and other astronomical phenomena.",
      stats: "500+ confirmed planets • Multiple campaign fields"
    },
    {
      icon: "🛰️",
      title: "TESS Mission",
      mission: "Transiting Exoplanet Survey Satellite (2018-Present)",
      description: "TESS is NASA's current all-sky transit survey mission, designed to discover exoplanets around bright, nearby stars. Unlike Kepler's focused approach, TESS divides the sky into 26 sectors, observing each for 27 days. TESS prioritizes finding planets around stars bright enough for follow-up observations, making it ideal for atmospheric characterization studies.",
      stats: "400+ confirmed planets • All-sky survey ongoing"
    }
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm">
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12">
        {/* Mission Catalogs Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold glow-text mb-2 text-center">Mission Catalogs</h3>
          <p className="text-center text-muted-foreground mb-6">
            Standardized exoplanet databases from NASA's premier space telescope missions
          </p>
        </div>

        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {catalogs.map((catalog, idx) => (
            <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{catalog.icon}</div>
                  <div>
                    <CardTitle className="text-lg glow-text">{catalog.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{catalog.mission}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {catalog.description}
                </CardDescription>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-xs text-primary/80 font-medium">{catalog.stats}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

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

        {/* Additional Info Section */}
        <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Standardization</h4>
              <ul className="space-y-1">
                <li>• Unified format across all mission catalogs</li>
                <li>• Quality flags and validation metrics included</li>
                <li>• Regular updates from NASA Exoplanet Archive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Model Performance</h4>
              <ul className="space-y-1">
                <li>• Random Forest: 74% accuracy on tabular data</li>
                <li>• CNN Model: Time-series lightcurve analysis</li>
                <li>• 3,197 flux measurements per lightcurve</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
