import { DashboardLayout } from '../components/dashboard-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Settings, CalendarClock, MapPin, Recycle, Trash2, Leaf } from 'lucide-react';
import WasteReportsChart from './components/waste-reports-chart';
import RewardSettings from './components/reward-settings';
import ScheduleEditor from './components/schedule-editor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import StreetDustbinList from './components/street-dustbin-list';
import DistrictRecyclingChart from './components/district-recycling-chart';
import TotalWasteCard from './components/total-waste-card';
import { wasteCompositionData, currentMonthTotal } from '@/lib/data';

export default function MunicipalDashboard() {
  const recyclableWaste = (currentMonthTotal * (wasteCompositionData.find(d => d.name === 'Recyclable')?.value ?? 0)) / 100;
  const organicWaste = (currentMonthTotal * (wasteCompositionData.find(d => d.name === 'Organic')?.value ?? 0)) / 100;
  const generalWaste = (currentMonthTotal * (wasteCompositionData.find(d => d.name === 'General')?.value ?? 0)) / 100;

  return (
    <DashboardLayout userType="Municipal">
      <Tabs defaultValue="streets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="streets" className="py-2"><MapPin className="mr-2 h-4 w-4" />Street Monitoring</TabsTrigger>
          <TabsTrigger value="reports" className="py-2"><BarChart3 className="mr-2 h-4 w-4" />Reports</TabsTrigger>
          <TabsTrigger value="rewards" className="py-2"><Settings className="mr-2 h-4 w-4" />Reward Settings</TabsTrigger>
          <TabsTrigger value="schedule" className="py-2"><CalendarClock className="mr-2 h-4 w-4" />Schedule</TabsTrigger>
        </TabsList>
         <TabsContent value="streets">
          <StreetDustbinList />
        </TabsContent>
        <TabsContent value="reports" className="grid gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <TotalWasteCard />
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Recyclable Waste</CardTitle>
                      <Recycle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{recyclableWaste.toFixed(1)} Tonnes</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Organic Waste</CardTitle>
                      <Leaf className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{organicWaste.toFixed(1)} Tonnes</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">General Waste</CardTitle>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{generalWaste.toFixed(1)} Tonnes</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>City-Wide Waste Composition</CardTitle>
                         <CardDescription>Percentage breakdown for the current month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <WasteReportsChart />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Recyclable Waste by District</CardTitle>
                        <CardDescription>Tonnes collected this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DistrictRecyclingChart />
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="rewards">
            <RewardSettings />
        </TabsContent>
        <TabsContent value="schedule">
            <ScheduleEditor />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
