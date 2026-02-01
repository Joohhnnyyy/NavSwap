"use client";

import { StationCard } from '@/components/StationCard';
import { Station } from '@/lib/data';

// Demo Input Data
const demoStation: Station = {
  id: 'demo-station-1',
  name: 'Test Station Alpha',
  location: 'Demo Sector',
  coordinates: [35.6895, 139.6917],
  status: 'healthy',
  uptime: 99.9,
  queueLength: 5,
  avgWaitTime: 2.5,
  batteryInventory: {
    total: 50,
    available: 45,
    charging: 5,
    faulty: 0
  },
  demandTrend: [10, 25, 40, 35, 50, 65, 55],
  congestionPrediction: 'Optimal flow predicted',
  lastMaintenance: '2024-01-20'
};

const criticalStation: Station = {
  id: 'demo-station-2',
  name: 'Test Station Beta',
  location: 'Critical Sector',
  coordinates: [35.6762, 139.6503],
  status: 'critical',
  uptime: 85.5,
  queueLength: 25,
  avgWaitTime: 15.0,
  batteryInventory: {
    total: 50,
    available: 5,
    charging: 40,
    faulty: 5
  },
  demandTrend: [80, 85, 90, 92, 95, 98, 100],
  congestionPrediction: 'Immediate maintenance required',
  lastMaintenance: '2023-11-15'
};

export default function TestStationPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">StationCard Component Test</h1>
        <p className="text-zinc-400 mb-10">
          Verifying UI rendering with demo inputs. 
          Note: Real-time data fetching will fail for these demo IDs (falling back to static props), 
          which effectively tests the fallback logic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
          {/* Test Case 1: Healthy Station */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-emerald-500">Case 1: Healthy Station</h2>
            <div className="h-full">
              <StationCard station={demoStation} />
            </div>
          </div>

          {/* Test Case 2: Critical Station */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-red-500">Case 2: Critical Station</h2>
            <div className="h-full">
              <StationCard station={criticalStation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
