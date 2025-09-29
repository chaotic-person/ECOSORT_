import { DashboardLayout } from '../components/dashboard-layout';
import DustbinStatusCard from './components/dustbin-status-card';
import CollectionScheduleCard from './components/collection-schedule-card';
import RewardsCard from './components/rewards-card';
import RecyclingAnalysisTool from './components/recycling-analysis-tool';
import NotificationsCard from './components/notifications-card';
import ServiceRequestCard from './components/service-request-card';

export default function HouseholdDashboard() {
  return (
    <DashboardLayout userType="Household">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <DustbinStatusCard />
        <CollectionScheduleCard />
        <RewardsCard />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
         <RecyclingAnalysisTool />
         <NotificationsCard />
      </div>
      <div>
        <ServiceRequestCard />
      </div>
    </DashboardLayout>
  );
}
