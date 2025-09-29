'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trash2, Weight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'Empty' | 'Half' | 'Full' | 'Overfilled';

export default function DustbinStatusCard() {
  const fillLevel = 50; // Fixed fill level
  const weight = 10; // Fixed weight
  const status: Status = 'Half';
  const statusColor = 'text-yellow-600';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dustbin Status</CardTitle>
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
            <div>
                <div className={cn("text-2xl font-bold", statusColor)}>{status}</div>
                <div className="text-xs text-muted-foreground">{Math.round(fillLevel)}% Full</div>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <Weight className="h-5 w-5 text-muted-foreground"/>
                    <div className="text-2xl font-bold">{weight.toFixed(1)} kg</div>
                </div>
                 <div className="text-xs text-muted-foreground">Current Weight</div>
            </div>
        </div>

        <Progress value={fillLevel} className={cn("mt-4 h-3 transition-all",
           '[&>div]:bg-yellow-500'
        )} />
        <p className="text-xs text-muted-foreground mt-2">Last updated: just now</p>
      </CardContent>
    </Card>
  );
}
