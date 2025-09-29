'use client';

import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { serviceRequestsData, ServiceRequest } from '@/lib/data';
import { Wrench, CheckCircle, Clock, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function ServiceDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>(serviceRequestsData);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<ServiceRequest | null>(null);
  const [progressNotes, setProgressNotes] = useState('');
  const { toast } = useToast();

  const handleUpdateStatus = (householdId: string, status: ServiceRequest['status'], notes?: string) => {
    setIsLoading(householdId);
    // Simulate API call
    setTimeout(() => {
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.householdId === householdId ? { ...req, status, notes: notes || req.notes } : req
        )
      );
      toast({
        title: 'Status Updated!',
        description: `Request for ${householdId} is now ${status}.`,
      });
      setIsLoading(null);
      if(isModalOpen) {
        setIsModalOpen(false);
        setProgressNotes('');
        setCurrentRequest(null);
      }
    }, 1000);
  };

  const handleStartService = (request: ServiceRequest) => {
    setCurrentRequest(request);
    setProgressNotes('');
    setIsModalOpen(true);
  };

  const handleSubmitNotes = () => {
    if (currentRequest) {
      handleUpdateStatus(currentRequest.householdId, 'In Progress', progressNotes);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'destructive';
      case 'In Progress':
        return 'secondary';
      case 'Resolved':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'In Progress':
        return <Wrench className="h-4 w-4" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userType="Service">
      <Card>
        <CardHeader>
          <CardTitle>Active Service Requests</CardTitle>
          <CardDescription>
            List of households requiring dustbin maintenance or repair.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Household ID</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Issue Reported</TableHead>
                <TableHead>Status & Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(req => (
                <TableRow key={req.householdId}>
                  <TableCell className="font-medium">{req.householdId}</TableCell>
                  <TableCell>{req.address}</TableCell>
                  <TableCell>{req.issue}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(req.status)} className="flex items-center gap-2 w-fit mb-2">
                      {getStatusIcon(req.status)}
                      {req.status}
                    </Badge>
                    {req.notes && (
                      <div className="text-xs text-muted-foreground flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p>{req.notes}</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {req.status === 'Pending' && (
                      <Button size="sm" onClick={() => handleStartService(req)} disabled={isLoading === req.householdId}>
                        {isLoading === req.householdId ? <Loader2 className="animate-spin" /> : 'Start Service'}
                      </Button>
                    )}
                    {req.status === 'In Progress' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(req.householdId, 'Resolved')} disabled={isLoading === req.householdId}>
                         {isLoading === req.householdId ? <Loader2 className="animate-spin" /> : 'Mark as Resolved'}
                      </Button>
                    )}
                     {req.status === 'Resolved' && (
                      <span className="text-sm text-muted-foreground">Completed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Service for {currentRequest?.householdId}</DialogTitle>
            <DialogDescription>
              Add progress notes before changing the status to "In Progress". This is optional.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="e.g., On-site, beginning diagnostics..."
              value={progressNotes}
              onChange={(e) => setProgressNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNotes} disabled={isLoading === currentRequest?.householdId}>
              {isLoading === currentRequest?.householdId ? <Loader2 className="animate-spin" /> : 'Confirm & Start'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
