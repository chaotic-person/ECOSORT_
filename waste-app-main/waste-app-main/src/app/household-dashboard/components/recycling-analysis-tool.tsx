'use client';

import { useState } from 'react';
import { analyzeRecyclingPerformance } from '@/ai/flows/recycling-performance-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2 } from 'lucide-react';

export default function RecyclingAnalysisTool() {
  const [percentage, setPercentage] = useState(50);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const result = await analyzeRecyclingPerformance({
        recyclableWastePercentage: percentage,
        householdDetails: 'Standard urban family of 4.', // This is now a fixed value
        municipalityName: 'EcoSort City',
      });
      setAnalysis(result.analysis);
    } catch (err) {
      setError('Failed to get analysis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Recycling Performance Analysis</CardTitle>
          <CardDescription>Get AI-powered insights on your recycling habits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recyclable-percentage">Recyclable Waste Percentage: {percentage}%</Label>
            <Slider
              id="recyclable-percentage"
              min={0}
              max={100}
              step={1}
              value={[percentage]}
              onValueChange={(value) => setPercentage(value[0])}
              disabled={isLoading}
            />
          </div>
          
          {analysis && !isLoading && (
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>AI Analysis</AlertTitle>
              <AlertDescription>{analysis}</AlertDescription>
            </Alert>
          )}
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze My Performance'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
