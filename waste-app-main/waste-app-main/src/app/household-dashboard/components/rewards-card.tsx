import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function RewardsCard() {
  const recyclablePercent = 82; // Mock data
  let tier = 'Bronze';
  let tierColor = 'text-orange-900';
  if (recyclablePercent > 90) {
    tier = 'Gold';
    tierColor = 'text-yellow-500';
  } else if (recyclablePercent > 70) {
    tier = 'Silver';
    tierColor = 'text-gray-400';
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">My Rewards</CardTitle>
        <Award className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <span className={tierColor}>{tier} Tier</span>
        </div>
        <p className="text-xs text-muted-foreground">Based on {recyclablePercent}% recyclable contribution</p>
      </CardContent>
    </Card>
  );
}
