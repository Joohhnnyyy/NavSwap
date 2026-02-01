"use client";

import React from 'react';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Map as MapIcon, 
  Activity,
  Timer,
  ShieldCheck,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { NETWORK_KPIS, STATIONS } from '@/lib/data';
import { motion } from 'framer-motion';
import { RadarVisualization, RadialVisualization } from './AdvancedVisualizations';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CityMap = dynamic(() => import('./map/CityMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading Map...</div>
});

export const ControlCenterView = () => {
  const rankedStations = [...STATIONS].sort((a, b) => {
    const priority = { critical: 0, 'at-risk': 1, healthy: 2 };
    return priority[a.status] - priority[b.status];
  });

  const reviewQueue = [
    { id: '1', task: 'Approve Reroute: Sector 12', sla: '02:45', priority: 'high' },
    { id: '2', task: 'Maintenance Override: Sector 22', sla: '08:12', priority: 'medium' },
    { id: '3', task: 'Logistics Priority: Sector 09', sla: '14:20', priority: 'low' },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* City-wide Heatmap Placeholder */}
      <Card className="col-span-8 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col min-h-[600px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
            <MapIcon className="w-4 h-4 text-blue-500" />
            City-wide Network Heatmap
          </CardTitle>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 border border-zinc-700/50 uppercase">Live Traffic</span>
            <span className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-bold border border-blue-500/20 uppercase">Optimizer Active</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative overflow-hidden rounded-b-xl">
          <CityMap />
        </CardContent>
      </Card>

      {/* Network KPIs */}
      <div className="col-span-4 flex flex-col gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Network KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Timer className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-zinc-300">Avg City Queue</span>
              </div>
              <span className="text-lg font-bold text-foreground">{NETWORK_KPIS.avgQueueTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm font-medium text-zinc-300">Chargers Offline</span>
              </div>
              <span className="text-lg font-bold text-red-500">{NETWORK_KPIS.chargersOffline}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-zinc-300">Prevented Incidents</span>
              </div>
              <span className="text-lg font-bold text-emerald-500">{NETWORK_KPIS.preventedIncidents}</span>
            </div>
          </CardContent>
        </Card>

        {/* Human Review Queue */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Review Queue</CardTitle>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full border border-amber-500/20">{NETWORK_KPIS.humanReviewCount} ACTIVE</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewQueue.map((item) => (
              <div key={item.id} className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-700/30 group hover:border-blue-500/30 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors">{item.task}</span>
                  <span className={`text-[10px] font-bold ${item.priority === 'high' ? 'text-red-500' : 'text-zinc-500'}`}>{item.sla}</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: item.priority === 'high' ? '80%' : '40%' }}
                    className={`h-full ${item.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Ranking */}
      <Card className="col-span-12 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Stations Ranked by Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {rankedStations.map((s) => (
              <div key={s.id} className="p-4 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 flex items-center justify-between group hover:bg-zinc-800/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${s.status === 'healthy' ? 'bg-emerald-500' : s.status === 'at-risk' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`} />
                  <div>
                    <p className="text-xs font-bold text-zinc-100">{s.name}</p>
                    <p className="text-[10px] text-zinc-500">{s.location}</p>
                  </div>
                </div>
                <BarChart3 className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
