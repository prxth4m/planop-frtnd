import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataExplorer from '@/components/DataExplorer';
import PredictForm from '@/components/PredictForm';
import LightcurveViewer from '@/components/LightcurveViewer';
import DashboardFooter from '@/components/DashboardFooter';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background stars-bg relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold glow-text mb-2">
              🌌 Planopticon Dashboard
            </h1>
            <p className="text-muted-foreground">
              Explore and analyze exoplanet data
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </header>

        {/* Main Content */}
        <Tabs defaultValue="explorer" className="w-full">
          <TooltipProvider>
            <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="explorer">Data Explorer</TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-4 bg-card/95 backdrop-blur-sm border-primary/20">
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">Data Explorer</p>
                    <p className="text-sm text-muted-foreground">
                      Browse and analyze comprehensive exoplanet databases from NASA missions.
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs font-medium mb-1">Input Type:</p>
                      <p className="text-xs text-muted-foreground">• Interactive filters and search</p>
                      <p className="text-xs text-muted-foreground">• Kepler, K2, and TESS mission data</p>
                      <p className="text-xs text-muted-foreground">• Browse pre-loaded catalog databases</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="lightcurve">Lightcurve</TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-4 bg-card/95 backdrop-blur-sm border-primary/20">
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">Lightcurve Classifier</p>
                    <p className="text-sm text-muted-foreground">
                      Analyze time-series brightness measurements to detect planetary transits using CNN model.
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs font-medium mb-1">Input Accepts:</p>
                      <p className="text-xs text-muted-foreground">• CSV files with flux data (3,197 points)</p>
                      <p className="text-xs text-muted-foreground">• exoTrain.csv or exoTest.csv format</p>
                      <p className="text-xs text-muted-foreground">• LABEL column + FLUX.1 to FLUX.3197</p>
                      <p className="text-xs text-muted-foreground">• Single or multiple lightcurve files</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="classifier">AI Classifier</TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-4 bg-card/95 backdrop-blur-sm border-primary/20">
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">AI Classifier</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced machine learning model predicts exoplanet confirmation using Random Forest.
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs font-medium mb-1">Input Accepts:</p>
                      <p className="text-xs text-muted-foreground">• CSV files with planetary parameters</p>
                      <p className="text-xs text-muted-foreground">• Manual entry of exoplanet features</p>
                      <p className="text-xs text-muted-foreground">• Orbital period, radius, mass, temperature</p>
                      <p className="text-xs text-muted-foreground">• Single predictions or batch processing</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </TooltipProvider>

          <TabsContent value="explorer">
            <DataExplorer />
          </TabsContent>

          <TabsContent value="lightcurve">
            <LightcurveViewer />
          </TabsContent>

          <TabsContent value="classifier">
            <PredictForm />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
