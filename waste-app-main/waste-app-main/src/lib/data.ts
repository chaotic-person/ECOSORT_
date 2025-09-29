export type StreetDustbin = {
  id: string;
  streetName: string;
  district: string;
  dustbinStatus: 'Full' | 'Half' | 'Empty';
  assignedWorkman: string | null;
  completed?: boolean;
};


export const householdData = [
  { id: 'HH-001', address: '123 Green St', dustbinStatus: 'Full', recyclablePercent: 82, lastUpdate: '2m ago' },
  { id: 'HH-002', address: '456 Eco Ave', dustbinStatus: 'Half', recyclablePercent: 55, lastUpdate: '15m ago' },
  { id: 'HH-003', address: '789 Recycle Rd', dustbinStatus: 'Empty', recyclablePercent: 91, lastUpdate: '1h ago' },
  { id: 'HH-004', address: '101 Nature Way', dustbinStatus: 'Full', recyclablePercent: 45, lastUpdate: '5m ago' },
  { id: 'HH-005', address: '212 Planet Pl', dustbinStatus: 'Half', recyclablePercent: 76, lastUpdate: '30m ago' },
  { id: 'HH-006', address: '333 Earth Blvd', dustbinStatus: 'Full', recyclablePercent: 68, lastUpdate: '1m ago' },
];

export const streetDustbinData: StreetDustbin[] = [
    { id: 'ST-01', streetName: 'Green Street', district: 'North', dustbinStatus: 'Full', assignedWorkman: null },
    { id: 'ST-02', streetName: 'Eco Avenue', district: 'North', dustbinStatus: 'Half', assignedWorkman: 'W-002' },
    { id: 'ST-03', streetName: 'Recycle Road', district: 'South', dustbinStatus: 'Empty', assignedWorkman: null },
    { id: 'ST-04', streetName: 'Nature Way', district: 'South', dustbinStatus: 'Full', assignedWorkman: 'W-001' },
    { id: 'ST-05', streetName: 'Planet Place', district: 'East', dustbinStatus: 'Full', assignedWorkman: null },
];

export const workmenData = [
    { id: 'W-001', name: 'John Doe' },
    { id: 'W-002', name: 'Jane Smith' },
    { id: 'W-003', name: 'Peter Jones' },
];

export type ServiceRequest = {
  householdId: string;
  address: string;
  issue: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  notes?: string;
};

export const serviceRequestsData: ServiceRequest[] = [
    { householdId: 'HH-004', address: '101 Nature Way', issue: 'Dustbin sensor not responding', status: 'Pending' },
    { householdId: 'HH-001', address: '123 Green St', issue: 'Dustbin lid broken', status: 'In Progress', notes: 'Replacement part ordered.' },
    { householdId: 'HH-002', address: '456 Eco Ave', issue: 'Weight sensor inaccurate', status: 'Resolved', notes: 'Recalibrated the sensor.' },
];

export const collectionSchedule = [
  { area: 'North District', day: 'Monday', items: 'General & Recyclables' },
  { area: 'South District', day: 'Tuesday', items: 'General & Recyclables' },
  { area: 'East District', day: 'Wednesday', items: 'General & Recyclables' },
  { area: 'West District', day: 'Thursday', items: 'General & Recyclables' },
  { area: 'Central District', day: 'Friday', items: 'General, Recyclables & Organics' },
];

export const wasteCompositionData = [
  { name: 'Recyclable', value: 65, fill: 'hsl(var(--chart-1))' },
  { name: 'Organic', value: 20, fill: 'hsl(var(--chart-2))' },
  { name: 'General', value: 15, fill: 'hsl(var(--chart-3))' },
];

export const districtRecyclingData = [
  { name: 'North', tonnes: 12.5 },
  { name: 'South', tonnes: 8.2 },
  { name: 'East', tonnes: 15.1 },
  { name: 'West', tonnes: 7.8 },
  { name: 'Central', tonnes: 18.9 },
];


export const rewardTiers = {
  bronze: 50,
  silver: 70,
  gold: 90,
};

export const monthlyCollectionData = [
  { month: 'Jan', total: 350, recyclable: 220 },
  { month: 'Feb', total: 380, recyclable: 240 },
  { month: 'Mar', total: 410, recyclable: 260 },
  { month: 'Apr', total: 400, recyclable: 250 },
  { month: 'May', total: 420, recyclable: 270 },
  { month: 'Jun', total: 450, recyclable: 290 },
  { month: 'Jul', total: 470, recyclable: 300 },
  { month: 'Aug', total: 460, recyclable: 295 },
  { month: 'Sep', total: 440, recyclable: 280 },
  { month: 'Oct', total: 430, recyclable: 275 },
  { month: 'Nov', total: 480, recyclable: 310 },
  { month: 'Dec', total: 520, recyclable: 340 },
];

export const currentMonthTotal = monthlyCollectionData[4].total;
