"use client";

import React from 'react';
import { RECOMMENDATIONS } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Check, X, ShieldAlert, ArrowRight, Zap, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Recommendation Feed</h1>
          <p className="text-zinc-500 text-sm mt-1">Real-time operational alerts and AI-driven decision intelligence.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-zinc-300 uppercase">Live Feed</span>
            </div>
            <div className="w-px h-3 bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-500">Last updated: Just now</span>
          </div>
          <button className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-xl text-zinc-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {[...RECOMMENDATIONS, ...RECOMMENDATIONS].map((rec, i) => (
              <motion.div
                key={`${rec.id}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 hover:border-blue-600/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-50" />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">{rec.issue}</h3>
                      <p className="text-xs text-zinc-500 font-medium">Detected at Station Sector {12 + i}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-600/10 px-2 py-0.5 rounded uppercase">Confidence: {rec.confidence}%</span>
                    <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">ID: EV-A{100 + i}</span>
                  </div>
                </div>

                <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase mb-2">
                    <ArrowRight className="w-3 h-3" />
                    AI Suggested Action
                  </div>
                  <p className="text-sm text-zinc-200 font-medium">{rec.action}</p>
                  <p className="text-xs text-blue-400 mt-2 flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    Expected Impact: {rec.impact}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/10">
                    Accept & Execute
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-bold uppercase transition-all">
                    Modify
                  </button>
                  <button className="p-2 rounded-xl bg-zinc-800 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Alert Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Operational', count: 12, color: 'bg-blue-500' },
                { label: 'Technical', count: 8, color: 'bg-purple-500' },
                { label: 'Security', count: 3, color: 'bg-red-500' },
                { label: 'System', count: 15, color: 'bg-zinc-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-zinc-300">{item.count}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(item.count / 40) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldAlert className="text-white w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Security Watch</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                AI has monitored 1.2k transactions today. No anomalies detected in current network segment.
              </p>
              <button className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-all flex items-center gap-2">
                View Audit Logs <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
