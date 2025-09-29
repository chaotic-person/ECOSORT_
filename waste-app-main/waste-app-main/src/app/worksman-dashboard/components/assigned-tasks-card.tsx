'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { streetDustbinData } from '@/lib/data';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mocking the current worksman ID
const CURRENT_WORKSMAN_ID = 'W-001';

export default function AssignedTasksCard() {
  const [tasks, setTasks] = useState(
    streetDustbinData.filter(task => task.assignedWorkman === CURRENT_WORKSMAN_ID && !task.completed)
  );
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCompleteTask = (taskId: string) => {
    setLoading(taskId);
    // Simulate API call
    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      // You would also update the master data source here
      const task = streetDustbinData.find(t => t.id === taskId);
      if (task) {
          toast({
              title: 'Task Completed!',
              description: `Collection for ${task.streetName} marked as complete.`
          })
      }
      setLoading(null);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Collection Tasks</CardTitle>
        <CardDescription>Your collection tasks for the day.</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Street</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.streetName}</TableCell>
                        <TableCell>{task.district}</TableCell>
                        <TableCell>
                            <Badge variant="destructive">{task.dustbinStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Button 
                                size="sm" 
                                onClick={() => handleCompleteTask(task.id)}
                                disabled={loading === task.id}
                            >
                                {loading === task.id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                ) : (
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                )}
                                Mark as Complete
                           </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
           </Table>
        ) : (
            <p className="text-sm text-muted-foreground">You have no pending tasks.</p>
        )}
      </CardContent>
    </Card>
  );
}
