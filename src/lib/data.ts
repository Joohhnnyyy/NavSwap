export interface Station {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  status: 'healthy' | 'at-risk' | 'critical' | 'offline' | 'maintenance';
  uptime: number;
  queueLength: number;
  avgWaitTime: number;
  batteryInventory: {
    total: number;
    available: number;
    charging: number;
    faulty: number;
  };
  demandTrend: number[];
  congestionPrediction?: string;
  lastMaintenance: string;
}

export interface Ticket {
  id: string;
  stationId: string;
  stationName: string;
  issue: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  assignedTo?: string;
}

export interface Delivery {
  id: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  status: 'pending' | 'en-route' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  eta: string;
  batteryLevel: number;
}

export interface AIAction {
  id: string;
  type: string;
  status: string;
  timestamp: string;
}

export interface Recommendation {
  id: string;
  issue: string;
  action: string;
  impact: string;
  confidence: number;
  stationId?: string; // Optional linkage
}

export interface Metric {
  timestamp: string;
  energyConsumption: number;
  totalSwaps: number;
  revenue: number;
  activeChargers: number;
}

// --- MOCK DATA ---

export const STATIONS: Station[] = [
  {
    id: 'station-01',
    name: 'Sector 12 Central',
    location: 'Central Hub',
    coordinates: [28.6139, 77.2090],
    status: 'healthy',
    uptime: 99.9,
    queueLength: 4,
    avgWaitTime: 2.5,
    batteryInventory: { total: 50, available: 42, charging: 6, faulty: 2 },
    demandTrend: [30, 45, 32, 50, 40, 60, 42],
    congestionPrediction: 'Stable flow expected',
    lastMaintenance: '2024-01-15'
  },
  {
    id: 'station-02',
    name: 'Sector 04 North',
    location: 'North Entry',
    coordinates: [28.6200, 77.2100],
    status: 'at-risk',
    uptime: 94.2,
    queueLength: 12,
    avgWaitTime: 8.5,
    batteryInventory: { total: 40, available: 10, charging: 25, faulty: 5 },
    demandTrend: [50, 60, 75, 80, 85, 90, 88],
    congestionPrediction: 'Critical queue threshold in 5 min',
    lastMaintenance: '2023-12-20'
  },
  {
    id: 'station-03',
    name: 'Sector 09 Industrial',
    location: 'West Industrial',
    coordinates: [28.6100, 77.2000],
    status: 'healthy',
    uptime: 98.5,
    queueLength: 1,
    avgWaitTime: 1.2,
    batteryInventory: { total: 60, available: 55, charging: 4, faulty: 1 },
    demandTrend: [10, 15, 12, 18, 14, 20, 16],
    congestionPrediction: 'Low traffic',
    lastMaintenance: '2024-01-28'
  },
  {
    id: 'station-04',
    name: 'Sector 22 Plaza',
    location: 'South Plaza',
    coordinates: [28.6000, 77.2200],
    status: 'critical',
    uptime: 88.0,
    queueLength: 18,
    avgWaitTime: 15.0,
    batteryInventory: { total: 45, available: 5, charging: 30, faulty: 10 },
    demandTrend: [80, 85, 90, 95, 100, 98, 95],
    congestionPrediction: 'Station offline: Fault detected',
    lastMaintenance: '2023-11-10'
  },
  {
    id: 'station-05',
    name: 'Cyber City Hub',
    location: 'Tech Park',
    coordinates: [28.4900, 77.0900],
    status: 'healthy',
    uptime: 99.5,
    queueLength: 5,
    avgWaitTime: 3.0,
    batteryInventory: { total: 80, available: 60, charging: 18, faulty: 2 },
    demandTrend: [40, 42, 45, 48, 50, 55, 60],
    congestionPrediction: 'Moderate increase expected',
    lastMaintenance: '2024-01-05'
  },
  {
    id: 'station-06',
    name: 'Airport Express',
    location: 'Terminal 3',
    coordinates: [28.5562, 77.1000],
    status: 'maintenance',
    uptime: 0.0,
    queueLength: 0,
    avgWaitTime: 0,
    batteryInventory: { total: 30, available: 0, charging: 0, faulty: 0 },
    demandTrend: [0, 0, 0, 0, 0, 0, 0],
    congestionPrediction: 'Closed for scheduled maintenance',
    lastMaintenance: '2024-02-01'
  },
  {
    id: 'station-07',
    name: 'Dwarka Sector 21',
    location: 'Metro Interchange',
    coordinates: [28.5500, 77.0500],
    status: 'healthy',
    uptime: 97.8,
    queueLength: 3,
    avgWaitTime: 2.0,
    batteryInventory: { total: 55, available: 40, charging: 12, faulty: 3 },
    demandTrend: [20, 25, 22, 28, 30, 35, 32],
    congestionPrediction: 'Stable',
    lastMaintenance: '2024-01-10'
  },
  {
    id: 'station-08',
    name: 'Noida City Centre',
    location: 'Shopping District',
    coordinates: [28.5700, 77.3200],
    status: 'at-risk',
    uptime: 92.0,
    queueLength: 9,
    avgWaitTime: 6.5,
    batteryInventory: { total: 50, available: 15, charging: 30, faulty: 5 },
    demandTrend: [60, 65, 70, 75, 72, 78, 80],
    congestionPrediction: 'High demand approaching',
    lastMaintenance: '2023-12-15'
  },
  {
    id: 'station-09',
    name: 'Vasant Kunj',
    location: 'Residential Area',
    coordinates: [28.5200, 77.1500],
    status: 'healthy',
    uptime: 99.0,
    queueLength: 2,
    avgWaitTime: 1.5,
    batteryInventory: { total: 35, available: 28, charging: 5, faulty: 2 },
    demandTrend: [15, 18, 20, 18, 22, 25, 20],
    congestionPrediction: 'Clear',
    lastMaintenance: '2024-01-20'
  },
  {
    id: 'station-10',
    name: 'Connaught Place',
    location: 'Inner Circle',
    coordinates: [28.6300, 77.2150],
    status: 'healthy',
    uptime: 96.5,
    queueLength: 8,
    avgWaitTime: 4.5,
    batteryInventory: { total: 40, available: 20, charging: 15, faulty: 5 },
    demandTrend: [70, 75, 80, 78, 82, 85, 90],
    congestionPrediction: 'Peak hours active',
    lastMaintenance: '2024-01-25'
  }
];

export const TICKETS: Ticket[] = [
  { id: 'tkt-001', stationId: 'station-04', stationName: 'Sector 22 Plaza', issue: 'Charging Arm Calibration Error', priority: 'critical', status: 'in-progress', createdAt: '2024-02-01T08:30:00Z', assignedTo: 'Tech-A' },
  { id: 'tkt-002', stationId: 'station-02', stationName: 'Sector 04 North', issue: 'Battery Cooling System Warning', priority: 'high', status: 'open', createdAt: '2024-02-01T09:15:00Z' },
  { id: 'tkt-003', stationId: 'station-08', stationName: 'Noida City Centre', issue: 'Network Latency High', priority: 'medium', status: 'resolved', createdAt: '2024-01-31T14:20:00Z', assignedTo: 'NetOps-1' },
  { id: 'tkt-004', stationId: 'station-06', stationName: 'Airport Express', issue: 'Scheduled Maintenance', priority: 'low', status: 'in-progress', createdAt: '2024-02-01T06:00:00Z', assignedTo: 'Maint-Team-C' },
  { id: 'tkt-005', stationId: 'station-04', stationName: 'Sector 22 Plaza', issue: 'Sensor array drift', priority: 'high', status: 'open', createdAt: '2024-02-01T10:05:00Z' }
];

export const DELIVERIES: Delivery[] = [
  { id: 'del-101', driverId: 'drv-01', driverName: 'Rajesh Kumar', vehicleId: 'TS-01-EV-1234', status: 'en-route', origin: 'Sector 12', destination: 'Sector 04', eta: '15 min', batteryLevel: 45 },
  { id: 'del-102', driverId: 'drv-02', driverName: 'Amit Singh', vehicleId: 'TS-02-EV-5678', status: 'pending', origin: 'Sector 09', destination: 'Sector 22', eta: 'Pending', batteryLevel: 12 },
  { id: 'del-103', driverId: 'drv-03', driverName: 'Priya Sharma', vehicleId: 'TS-03-EV-9012', status: 'delivered', origin: 'Cyber City', destination: 'Airport Express', eta: '0 min', batteryLevel: 88 },
  { id: 'del-104', driverId: 'drv-04', driverName: 'Vikram Malhotra', vehicleId: 'TS-04-EV-3456', status: 'en-route', origin: 'Vasant Kunj', destination: 'Connaught Place', eta: '22 min', batteryLevel: 30 }
];

export const AI_ACTIONS: AIAction[] = [
  { id: 'act-1', type: 'Rerouting drivers from Station 04 → 01', status: 'active', timestamp: '2m ago' },
  { id: 'act-2', type: 'Maintenance ticket auto-generated for Station 04', status: 'completed', timestamp: '15m ago' },
  { id: 'act-3', type: 'Power draw optimized for Sector 12', status: 'active', timestamp: 'Just now' },
  { id: 'act-4', type: 'Inventory rebalancing triggered for Noida', status: 'pending', timestamp: '5m ago' }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    issue: 'High queue depth at Sector 12',
    action: 'Activate overflow station 04',
    impact: 'Reduces wait time by 4.2 min',
    confidence: 94,
    stationId: 'station-12'
  },
  {
    id: 'rec-2',
    issue: 'Potential battery depletion in Sector 09',
    action: 'Prioritize logistics drone delivery',
    impact: 'Avoids 15% service downtime',
    confidence: 88,
    stationId: 'station-09'
  },
  {
    id: 'rec-3',
    issue: 'Station 22 Critical Fault',
    action: 'Dispatch Emergency Tech Team',
    impact: 'Restores service in < 2 hrs',
    confidence: 99,
    stationId: 'station-04'
  }
];

export const NETWORK_KPIS = {
  avgQueueTime: '3.2 min',
  chargersOffline: 4,
  preventedIncidents: 12,
  humanReviewCount: 8,
  activeDrivers: 142,
  totalEnergyDispensed: '4.2 MWh',
  systemUptime: '99.98%'
};

export const METRICS_HISTORY: Metric[] = [
  { timestamp: '00:00', energyConsumption: 120, totalSwaps: 15, revenue: 300, activeChargers: 45 },
  { timestamp: '04:00', energyConsumption: 80, totalSwaps: 5, revenue: 100, activeChargers: 48 },
  { timestamp: '08:00', energyConsumption: 450, totalSwaps: 60, revenue: 1200, activeChargers: 42 },
  { timestamp: '12:00', energyConsumption: 600, totalSwaps: 85, revenue: 1700, activeChargers: 40 },
  { timestamp: '16:00', energyConsumption: 550, totalSwaps: 70, revenue: 1400, activeChargers: 41 },
  { timestamp: '20:00', energyConsumption: 300, totalSwaps: 40, revenue: 800, activeChargers: 46 }
];
