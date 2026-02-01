"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const CHARGERS = [
  { id: 'CH-001', station: 'Sector 12', status: 'active', power: '150kW', health: 98, batteries: 8, load: 85 },
  { id: 'CH-002', station: 'Sector 12', status: 'active', power: '150kW', health: 95, batteries: 6, load: 42 },
  { id: 'CH-003', station: 'Sector 04', status: 'warning', power: '120kW', health: 76, batteries: 4, load: 92 },
  { id: 'CH-004', station: 'Sector 09', status: 'active', power: '150kW', health: 99, batteries: 10, load: 15 },
  { id: 'CH-005', station: 'Sector 22', status: 'offline', power: '0kW', health: 42, batteries: 0, load: 0 },
  { id: 'CH-006', station: 'Sector 12', status: 'active', power: '150kW', health: 92, batteries: 5, load: 68 },
  { id: 'CH-007', station: 'Sector 04', status: 'active', power: '150kW', health: 97, batteries: 7, load: 35 },
  { id: 'CH-008', station: 'Sector 09', status: 'active', power: '150kW', health: 94, batteries: 9, load: 50 },
];

export default function ChargersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Charger Fleet</h1>
        <p className="text-zinc-500 text-sm mt-1">Real-time status of individual charging units across the network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Chargers', value: '48', icon: Zap, color: 'text-blue-500' },
          { label: 'Active Units', value: '42', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Warning / Fault', value: '6', icon: AlertCircle, color: 'text-amber-500' },
          { label: 'Avg Uptime', value: '98.4%', icon: Activity, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-2xl flex items-center gap-4"
          >
            <div className={cn("p-2 rounded-xl bg-zinc-800", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CHARGERS.map((charger, index) => (
          <motion.div
            key={charger.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 hover:border-zinc-700/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  charger.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                  charger.status === 'warning' ? "bg-amber-500 animate-pulse" : "bg-red-500"
                )} />
                <span className="text-sm font-bold text-white">{charger.id}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded uppercase">{charger.power}</span>
            </div>

            <p className="text-xs text-zinc-500 mb-4">{charger.station}</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <span className="text-zinc-500">Current Load</span>
                  <span className="text-zinc-300">{charger.load}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${charger.load}%` }}
                    className={cn(
                      "h-full rounded-full",
                      charger.load > 90 ? "bg-red-500" : charger.load > 70 ? "bg-amber-500" : "bg-blue-600"
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/30 p-2.5 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase mb-1">
                    <Battery className="w-3 h-3" />
                    Batteries
                  </div>
                  <p className="text-sm font-bold text-zinc-200">{charger.batteries} <span className="text-[10px] text-zinc-600">UNITS</span></p>
                </div>
                <div className="bg-zinc-800/30 p-2.5 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase mb-1">
                    <Activity className="w-3 h-3" />
                    Health
                  </div>
                  <p className="text-sm font-bold text-zinc-200">{charger.health}%</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
              Diagnostics
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
