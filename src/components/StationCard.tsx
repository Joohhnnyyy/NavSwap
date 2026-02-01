"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, MoreHorizontal, Activity, Battery, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Station } from '@/lib/data';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface StationCardProps {
  station: Station;
}

export function StationCard({ station }: StationCardProps) {
  const isHealthy = station.status === 'healthy';
  const isAtRisk = station.status === 'at-risk';
  const isCritical = station.status === 'critical';

  // Transform simple array to object array for Recharts
  const chartData = station.demandTrend.map((val, i) => ({ value: val, i }));

  const statusColor = isHealthy ? "#10b981" : isAtRisk ? "#f59e0b" : "#ef4444";
  const statusBg = isHealthy ? "bg-emerald-500/20" : isAtRisk ? "bg-amber-500/20" : "bg-red-500/20";
  const statusText = isHealthy ? "text-emerald-500" : isAtRisk ? "text-amber-500" : "text-red-500";
  const statusBorder = isHealthy ? "border-emerald-500/20" : isAtRisk ? "border-amber-500/20" : "border-red-500/20";

  return (
    <div className="group relative bg-zinc-950 border border-zinc-800/60 rounded-3xl p-6 transition-all duration-300 hover:border-zinc-700/80 shadow-sm hover:shadow-md h-full flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-white text-xl tracking-tight">{station.name}</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">{station.location}</p>
        </div>
        <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Status & Uptime */}
      <div className="flex items-center gap-4 mb-8">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
          statusBg,
          statusText,
          statusBorder
        )}>
          {isHealthy && <CheckCircle className="w-3.5 h-3.5" />}
          {isAtRisk && <AlertTriangle className="w-3.5 h-3.5" />}
          {isCritical && <Activity className="w-3.5 h-3.5" />}
          {station.status}
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <span className="text-zinc-400 text-sm font-medium">Uptime <span className="text-zinc-200">{station.uptime}%</span></span>
      </div>

      {/* Queue & Graph Section */}
      <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
        <div className="flex flex-col justify-end">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Queue Length</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">{station.queueLength}</span>
            <span className="text-sm font-medium text-zinc-500">veh</span>
          </div>
        </div>

        <div className="h-[60px] w-full self-end">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${station.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={statusColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={statusColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={statusColor} 
                strokeWidth={2} 
                fill={`url(#gradient-${station.id})`} 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Prediction */}
      <div className="mt-auto">
        <div className={cn(
          "w-full rounded-2xl p-4 flex items-center gap-3 border transition-colors",
          "bg-zinc-900/50 border-zinc-800/50"
        )}>
          <div className={cn("w-2 h-2 rounded-full shrink-0", isHealthy ? "bg-emerald-500" : "bg-amber-500")} />
          <span className="text-xs text-zinc-400 font-medium">
            {station.congestionPrediction || "Traffic flow stable"}
          </span>
        </div>
      </div>
    </div>
  );
}
