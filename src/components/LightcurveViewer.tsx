import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const LIGHTCURVE_API = `${API_BASE_URL}/api/predict/lightcurve`;
const LIGHTCURVE_BATCH_API = `${API_BASE_URL}/api/predict/lightcurve/batch`;

interface ClassificationResult {
  filename: string;
  prediction: string;
  probability: number;
  confidence: number;
  data_points: number;
  error?: string;
  original_label?: string;
}

const LightcurveViewer = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ClassificationResult[] | null>(null);

  const handleClassify = async () => {
    if (!files || files.length === 0) {
      toast.error('Please select lightcurve file(s)');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      if (files.length === 1) {
        formData.append('file', files[0]);
        const res = await fetch(LIGHTCURVE_API, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Classification failed');
        }

        const data = await res.json();
        
        // Handle both single result and array of results
        if (Array.isArray(data)) {
          setResults(data);
          toast.success(`Classified ${data.length} lightcurve(s)!`);
        } else {
          setResults([{
            filename: files[0].name,
            prediction: data.prediction,
            probability: data.probability,
            confidence: data.confidence,
            data_points: data.data_points,
            original_label: data.original_label
          }]);
          toast.success('Classification complete!');
        }
      } else {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }

        const res = await fetch(LIGHTCURVE_BATCH_API, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Batch classification failed');
        }

        const data = await res.json();
        setResults(Array.isArray(data) ? data : [data]);
        toast.success(`Classified ${files.length} lightcurve(s)!`);
      }
    } catch (err) {
      toast.error(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="glow-border bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 glow-text">
            <FileText className="h-6 w-6" />
            Lightcurve Classification
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Upload lightcurve files for AI-based exoplanet detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-all">
            <Input
              type="file"
              accept=".txt,.dat,.csv"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
              id="lightcurve-upload"
            />
            <Label htmlFor="lightcurve-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-12 w-12 text-primary/70" />
                <p className="text-sm font-medium">
                  {files && files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload lightcurve file(s)'}
                </p>
                <p className="text-xs text-muted-foreground">
                  TXT, DAT, or CSV format (TIME FLUX FLUX_ERR columns)
                </p>
              </div>
            </Label>
          </div>

          <Button 
            onClick={handleClassify} 
            disabled={loading || !files || files.length === 0}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold glow-border"
          >
            {loading ? 'Classifying...' : 'Classify Lightcurve(s)'}
          </Button>
        </CardContent>
      </Card>

      {results && results.length > 0 && (
        <Card className="glow-border bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="glow-text">Classification Results</CardTitle>
            <CardDescription>AI-based exoplanet detection analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border/50 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30 hover:bg-secondary/50">
                    <TableHead className="font-semibold">Filename</TableHead>
                    <TableHead className="font-semibold">Classification</TableHead>
                    <TableHead className="font-semibold">Probability</TableHead>
                    <TableHead className="font-semibold">Confidence</TableHead>
                    <TableHead className="font-semibold">Data Points</TableHead>
                    <TableHead className="font-semibold">Actual Label</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r, idx) => (
                    <TableRow key={idx} className="hover:bg-secondary/20">
                      <TableCell className="font-mono text-sm">{r.filename}</TableCell>
                      <TableCell>
                        {r.error ? (
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-destructive/20 text-destructive">ERROR</span>
                        ) : (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${r.prediction === 'CONFIRMED' ? 'bg-primary/20 text-primary' : r.prediction === 'CANDIDATE' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-destructive/20 text-destructive'}`}>
                            {r.prediction}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm font-mono">{r.error ? 'N/A' : `${(r.probability * 100).toFixed(1)}%`}</TableCell>
                      <TableCell className="text-sm font-mono">{r.error ? 'N/A' : `${(r.confidence * 100).toFixed(1)}%`}</TableCell>
                      <TableCell className="text-sm">{r.error ? r.error : r.data_points.toLocaleString()}</TableCell>
                      <TableCell>
                        {r.original_label ? (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${r.original_label === 'EXOPLANET' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
                            {r.original_label}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LightcurveViewer;
