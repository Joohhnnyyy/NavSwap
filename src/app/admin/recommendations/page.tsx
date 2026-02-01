"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, Zap, ShieldCheck, ArrowRight, BrainCircuit, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

import { RadarVisualization, RadialVisualization } from '@/components/AdvancedVisualizations';

const STRATEGIC_INSIGHTS = [
  { 
    title: 'Dynamic Pricing Implementation', 
    desc: 'Based on Sector 12 demand spikes, implementing a 15% incentive for off-peak swaps could balance load by 22%.', 
    impact: 'High', 
    category: 'Revenue',
    icon: TrendingUp
  },
  { 
    title: 'Proactive Battery Re-balancing', 
    desc: 'Predicted shortfall in Sector 04 within 6 hours. Moving 40 charged units from Sector 09 is recommended.', 
    impact: 'Critical', 
    category: 'Ops',
    icon: Zap
  },
  { 
    title: 'Fleet Maintenance Batching', 
    desc: 'Three chargers in Sector 22 show similar wear patterns. Scheduling single-trip maintenance saves $420 in logistics.', 
    impact: 'Medium', 
    category: 'Maintenance',
    icon: ShieldCheck
  }
];

export default function RecommendationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
            <Lightbulb className="text-amber-500 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Strategy & Insights</h1>
            <p className="text-zinc-500 text-sm mt-1">Long-term operational improvements and strategic AI recommendations.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">AI Mode: Aggressive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Strategic Roadmap</h2>
          {STRATEGIC_INSIGHTS.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:bg-zinc-900/50 hover:border-amber-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <insight.icon className="w-7 h-7 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">{insight.category}</span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      insight.impact === 'Critical' ? "text-red-500" : insight.impact === 'High' ? "text-blue-500" : "text-zinc-500"
                    )}>Impact: {insight.impact}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{insight.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{insight.desc}</p>
                  <div className="pt-4 flex items-center gap-4">
                    <button className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-xl transition-all">
                      Review Plan
                    </button>
                    <button className="text-xs font-bold text-zinc-500 hover:text-white transition-all flex items-center gap-2">
                      View Data Source <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Confidence Metrics</h3>
            </div>
            <RadarVisualization />
            <p className="text-center text-xs text-zinc-400 mt-4 leading-relaxed">
              Target efficiency of <span className="text-blue-500 font-bold">92%</span> is achievable by implementing 2 more strategic actions.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Impact Forecast</h3>
            </div>
            <RadialVisualization />
          </div>

          <div className="bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-600/20 rounded-3xl p-6">
            <BrainCircuit className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">ML Training State</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Model v4.2.1 is currently training on Jan 2026 dataset. Predicted accuracy improvement: +2.4%.
            </p>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full animate-pulse" style={{ width: '68%' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
