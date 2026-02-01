"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line 
} from 'recharts';
import { BarChart3, TrendingUp, Users, Zap, ArrowUpRight, ArrowDownRight, Calendar, Activity, PieChart as PieChartIcon, Shield } from 'lucide-react';
import { RadarVisualization, RadialVisualization, RoseVisualization } from '@/components/AdvancedVisualizations';

const DATA = [
  { time: '00:00', swaps: 40, demand: 24, efficiency: 98 },
  { time: '04:00', swaps: 20, demand: 18, efficiency: 99 },
  { time: '08:00', swaps: 85, demand: 90, efficiency: 92 },
  { time: '12:00', swaps: 110, demand: 115, efficiency: 88 },
  { time: '16:00', swaps: 95, demand: 98, efficiency: 94 },
  { time: '20:00', swaps: 70, demand: 75, efficiency: 96 },
  { time: '23:59', swaps: 45, demand: 42, efficiency: 98 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Analytics</h1>
          <p className="text-zinc-500 text-sm mt-1">Historical performance data and predictive network trends.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-300 uppercase">Last 24 Hours</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Swaps', value: '1,284', trend: '+12.5%', isUp: true },
          { label: 'Avg Swap Time', value: '2.4m', trend: '-0.3m', isUp: true },
          { label: 'Peak Demand', value: '142/hr', trend: '+8.2%', isUp: true },
          { label: 'AI Success Rate', value: '96.8%', trend: '+1.2%', isUp: true },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-3xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-white tracking-tighter">{stat.value}</p>
              <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Swap Volume vs Demand</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Swaps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Demand</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorSwaps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="swaps" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSwaps)" strokeWidth={2} />
                <Area type="monotone" dataKey="demand" stroke="#a855f7" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Network Efficiency (%)</h3>
              <span className="text-[10px] font-bold text-zinc-500 uppercase bg-zinc-800 px-2 py-1 rounded">Real-time</span>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} domain={[80, 100]} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Line type="stepAfter" dataKey="efficiency" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={2000} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* New Advanced Visualizations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">System Health Balance</h3>
            </div>
            <RadarVisualization />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-zinc-800/30 p-2 rounded-lg border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">AI Stability</p>
                <p className="text-sm font-bold text-emerald-500">94.2%</p>
              </div>
              <div className="bg-zinc-800/30 p-2 rounded-lg border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Safety Index</p>
                <p className="text-sm font-bold text-blue-500">0.98</p>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Regional Distribution</h3>
            </div>
            <RadialVisualization />
            <p className="text-center text-[10px] font-medium text-zinc-500 uppercase mt-4">Load distribution across primary sectors</p>
          </section>

          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Energy Lifecycle Mix</h3>
            </div>
            <RoseVisualization />
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {['Solar', 'Grid', 'Battery'].map((label, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'}`} />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

    </div>
  );
}
