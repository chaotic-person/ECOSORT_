'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { rewardTiers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Award } from 'lucide-react';

export default function RewardSettings() {
  const [tiers, setTiers] = useState(rewardTiers);
  const { toast } = useToast();

  const handleSave = () => {
    // Here you would typically save the data to a backend
    console.log('Saving new tiers:', tiers);
    toast({
      title: 'Success!',
      description: 'Reward tiers have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Tier Settings</CardTitle>
        <CardDescription>Define the recyclable percentage needed for each reward tier.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Award className="h-6 w-6 text-yellow-500" />
          <Label htmlFor="gold" className="w-20">Gold Tier</Label>
          <Input
            id="gold"
            type="number"
            value={tiers.gold}
            onChange={(e) => setTiers({ ...tiers, gold: parseInt(e.target.value) })}
            className="w-40"
          />
           <span className="text-muted-foreground">%</span>
        </div>
         <div className="flex items-center gap-4">
          <Award className="h-6 w-6 text-gray-400" />
          <Label htmlFor="silver" className="w-20">Silver Tier</Label>
          <Input
            id="silver"
            type="number"
            value={tiers.silver}
            onChange={(e) => setTiers({ ...tiers, silver: parseInt(e.target.value) })}
            className="w-40"
          />
           <span className="text-muted-foreground">%</span>
        </div>
         <div className="flex items-center gap-4">
          <Award className="h-6 w-6" style={{color: '#CD7F32'}} />
          <Label htmlFor="bronze" className="w-20">Bronze Tier</Label>
          <Input
            id="bronze"
            type="number"
            value={tiers.bronze}
            onChange={(e) => setTiers({ ...tiers, bronze: parseInt(e.target.value) })}
            className="w-40"
          />
           <span className="text-muted-foreground">%</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
