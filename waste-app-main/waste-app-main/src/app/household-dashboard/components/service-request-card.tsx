'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wrench, Send, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

export default function ServiceRequestCard() {
  const [issueDescription, setIssueDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!issueDescription) {
        toast({
            title: 'Error',
            description: 'Please describe the issue before submitting.',
            variant: 'destructive'
        })
        return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        console.log('Service Request Submitted:', { issueDescription });
        toast({
            title: 'Request Sent!',
            description: 'A service team will be in touch shortly.',
        });
        setIsLoading(false);
        setIsSubmitted(true);
        setIssueDescription('');
    }, 1500);
  };

  if (isSubmitted) {
    return (
        <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Service Request Submitted</AlertTitle>
            <AlertDescription>
                Your request has been sent. You can submit another request if needed by refreshing the page.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5"/> Request Dustbin Service</CardTitle>
          <CardDescription>If you're facing issues with your dustbin (e.g., sensor malfunction, physical damage), please describe the problem below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., The weight sensor is not showing any data, the lid is broken..."
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Submitting...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4"/>
                    Submit Request
                </>
            )}
            
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
