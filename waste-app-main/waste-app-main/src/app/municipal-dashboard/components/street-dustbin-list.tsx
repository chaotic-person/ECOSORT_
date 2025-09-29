'use client';

import { useState } from 'react';
import { streetDustbinData, workmenData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Truck } from 'lucide-react';

export default function StreetDustbinList() {
  const [dustbins, setDustbins] = useState(streetDustbinData);
  const { toast } = useToast();

  const getStatusVariant = (status: string): 'destructive' | 'secondary' | 'outline' => {
    switch (status) {
      case 'Full':
        return 'destructive';
      case 'Half':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleAssign = (streetId: string, workmanId: string | null) => {
    setDustbins(dustbins.map(db => db.id === streetId ? { ...db, assignedWorkman: workmanId } : db));
    if (workmanId) {
        toast({
            title: 'Workman Assigned',
            description: `Workman ${workmanId} has been assigned to street ${streetId}.`
        })
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Street Dustbin Monitoring</CardTitle>
        <CardDescription>Live status of street-level dustbins and workman assignments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Street</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Dustbin Status</TableHead>
              <TableHead className="text-right">Assign Worksman</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dustbins.map((dustbin) => (
              <TableRow key={dustbin.id}>
                <TableCell className="font-medium">{dustbin.streetName}</TableCell>
                <TableCell>{dustbin.district}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(dustbin.dustbinStatus)}>{dustbin.dustbinStatus}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {dustbin.dustbinStatus === 'Full' && !dustbin.assignedWorkman ? (
                     <Select onValueChange={(value) => handleAssign(dustbin.id, value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign..." />
                        </SelectTrigger>
                        <SelectContent>
                            {workmenData.map(w => <SelectItem key={w.id} value={w.id}>{w.name} ({w.id})</SelectItem>)}
                        </SelectContent>
                    </Select>
                  ) : dustbin.assignedWorkman ? (
                    <Badge variant="secondary" className="flex items-center gap-2">
                        <Truck className="h-4 w-4"/>
                        {dustbin.assignedWorkman} Dispatched
                    </Badge>
                  ): (
                    <span className="text-sm text-muted-foreground">Not required</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
