import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListChecks, Truck } from 'lucide-react';
import AssignedTasksCard from './components/assigned-tasks-card';

export default function WorksmanDashboard() {
  return (
    <DashboardLayout userType="Worksman">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Route
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">North & South Districts</div>
            <p className="text-xs text-muted-foreground">
              Assigned collection route
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 / 5</div>
            <p className="text-xs text-muted-foreground">
              Street dustbins emptied today
            </p>
          </CardContent>
        </Card>
      </div>
       <AssignedTasksCard />
    </DashboardLayout>
  );
}
