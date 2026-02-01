export interface Station {
  id: string;
  name: string;
  location: string;
  status: 'healthy' | 'at-risk' | 'critical';
  uptime: number;
  queueLength: number;
  demandTrend: number[];
  congestionPrediction?: string;
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
}

export const STATIONS: Station[] = [
  {
    id: '1',
    name: 'Sector 12',
    location: 'Central Hub',
    status: 'healthy',
    uptime: 99.8,
    queueLength: 6,
    demandTrend: [30, 45, 32, 50, 40, 60, 42],
    congestionPrediction: 'Congestion predicted in 18 min'
  },
  {
    id: '2',
    name: 'Sector 04',
    location: 'North Entry',
    status: 'at-risk',
    uptime: 94.2,
    queueLength: 12,
    demandTrend: [50, 60, 75, 80, 85, 90, 88],
    congestionPrediction: 'Critical queue threshold in 5 min'
  },
  {
    id: '3',
    name: 'Sector 09',
    location: 'West industrial',
    status: 'healthy',
    uptime: 98.5,
    queueLength: 2,
    demandTrend: [10, 15, 12, 18, 14, 20, 16]
  },
  {
    id: '4',
    name: 'Sector 22',
    location: 'South Plaza',
    status: 'critical',
    uptime: 88.0,
    queueLength: 18,
    demandTrend: [80, 85, 90, 95, 100, 98, 95],
    congestionPrediction: 'Station offline: Fault detected'
  }
];

export const AI_ACTIONS: AIAction[] = [
  { id: '1', type: 'Rerouting drivers from Station A → B', status: 'active', timestamp: '2m ago' },
  { id: '2', type: 'Maintenance ticket auto-generated', status: 'completed', timestamp: '15m ago' },
  { id: '3', type: 'Power draw optimized for Sector 12', status: 'active', timestamp: 'Just now' }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    issue: 'High queue depth at Sector 12',
    action: 'Activate overflow station 04',
    impact: 'Reduces wait time by 4.2 min',
    confidence: 94
  },
  {
    id: '2',
    issue: 'Potential battery depletion in Sector 09',
    action: 'Prioritize logistics drone delivery',
    impact: 'Avoids 15% service downtime',
    confidence: 88
  }
];

export const NETWORK_KPIS = {
  avgQueueTime: '3.2 min',
  chargersOffline: 4,
  preventedIncidents: 12,
  humanReviewCount: 8
};
