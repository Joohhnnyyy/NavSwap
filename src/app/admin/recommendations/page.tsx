"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, Zap, ShieldCheck, ArrowRight, BrainCircuit, Sparkles, RefreshCw, X, FileText, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStrategicInsights } from '@/lib/map/geminiService';
import { STATIONS, NETWORK_KPIS } from '@/lib/data';

import { RadarVisualization, RadialVisualization } from '@/components/AdvancedVisualizations';

interface StrategicInsight {
  title: string;
  desc: string;
  impact: 'High' | 'Medium' | 'Critical';
  category: 'Revenue' | 'Ops' | 'Maintenance' | 'Growth';
  iconName: string;
  detailedPlan?: string[];
  dataSource?: string;
}

// Initial static data as fallback
const INITIAL_INSIGHTS: StrategicInsight[] = [
  { 
    title: 'Dynamic Pricing Implementation', 
    desc: 'Based on Sector 12 demand spikes, implementing a 15% incentive for off-peak swaps could balance load by 22%.', 
    impact: 'High', 
    category: 'Revenue',
    iconName: 'TrendingUp',
    detailedPlan: [
      'Analyze peak hours (18:00-21:00) traffic data from last 30 days.',
      'Deploy 15% discount push notifications to users in Sector 12.',
      'Monitor queue reduction and revenue impact for 2 weeks.'
    ],
    dataSource: 'Aggregated demand trends from Sector 12 stations (Stn-01, Stn-04) showing consistent 40% spikes at 19:00.'
  },
  { 
    title: 'Proactive Battery Re-balancing', 
    desc: 'Predicted shortfall in Sector 04 within 6 hours. Moving 40 charged units from Sector 09 is recommended.', 
    impact: 'Critical', 
    category: 'Ops',
    iconName: 'Zap',
    detailedPlan: [
      'Dispatch 2 logistics trucks to Sector 09 Hub.',
      'Load 20 units per truck (Total 40).',
      'Route to Sector 04 via Expressway to avoid downtown traffic.'
    ],
    dataSource: 'Real-time inventory levels: Sector 04 (12 units) vs Sector 09 (85 units). Demand forecast model v4.'
  },
  { 
    title: 'Fleet Maintenance Batching', 
    desc: 'Three chargers in Sector 22 show similar wear patterns. Scheduling single-trip maintenance saves $420 in logistics.', 
    impact: 'Medium', 
    category: 'Maintenance',
    iconName: 'ShieldCheck',
    detailedPlan: [
      'Flag Chargers C2, C5, and C8 in Maintenance Dashboard.',
      'Assign Ticket #4029 to Tech Team Alpha.',
      'Combine parts procurement into single PO #9921.'
    ],
    dataSource: 'IoT Telemetry: Voltage ripple > 20mV detected across 3 distinct units in same subnet.'
  }
];

const ICON_MAP: Record<string, any> = {
  TrendingUp,
  Zap,
  ShieldCheck,
  Target,
  Lightbulb
};

export default function RecommendationsPage() {
  const [insights, setInsights] = useState<StrategicInsight[]>(INITIAL_INSIGHTS);
  const [loading, setLoading] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<StrategicInsight | null>(null);
  const [viewMode, setViewMode] = useState<'plan' | 'source'>('plan');

  const openModal = (insight: StrategicInsight, mode: 'plan' | 'source') => {
    setSelectedInsight(insight);
    setViewMode(mode);
  };

  const closeModal = () => {
    setSelectedInsight(null);
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Prepare context data for Gemini
      const contextData = {
        stations: STATIONS.map(s => ({ name: s.name, status: s.status, demand: s.demandTrend })),
        kpis: NETWORK_KPIS,
        timestamp: new Date().toISOString()
      };
      
      const newInsights = await getStrategicInsights(contextData);
      if (newInsights && newInsights.length > 0) {
        setInsights(newInsights);
      }
    } catch (error) {
      console.error("Failed to generate insights:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <button 
            onClick={generateInsights}
            disabled={loading}
            className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl px-4 py-2 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4 text-zinc-400", loading && "animate-spin")} />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
              {loading ? 'Analyzing...' : 'Refresh Strategy'}
            </span>
          </button>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">AI Mode: Aggressive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Strategic Roadmap</h2>
            {loading && <span className="text-xs text-amber-500 animate-pulse">Generating new strategies...</span>}
          </div>
          
          {insights.map((insight, i) => {
            const IconComponent = ICON_MAP[insight.iconName] || Lightbulb;
            
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:bg-zinc-900/50 hover:border-amber-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 text-zinc-400 group-hover:text-amber-500 transition-colors" />
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
                    <button 
                      onClick={() => openModal(insight, 'plan')}
                      className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-xl transition-all"
                    >
                      Review Plan
                    </button>
                    <button 
                      onClick={() => openModal(insight, 'source')}
                      className="text-xs font-bold text-zinc-500 hover:text-white transition-all flex items-center gap-2"
                    >
                      View Data Source <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
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

      <AnimatePresence>
        {selectedInsight && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl shadow-black/50"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center">
                  {ICON_MAP[selectedInsight.iconName] ? React.createElement(ICON_MAP[selectedInsight.iconName], { className: "w-6 h-6 text-amber-500" }) : <Lightbulb className="w-6 h-6 text-amber-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">{selectedInsight.category}</span>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Impact: {selectedInsight.impact}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedInsight.title}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Tabs / Toggle */}
                <div className="flex p-1 bg-zinc-800/50 rounded-xl w-fit">
                  <button 
                    onClick={() => setViewMode('plan')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                      viewMode === 'plan' ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <FileText className="w-4 h-4" />
                    Execution Plan
                  </button>
                  <button 
                    onClick={() => setViewMode('source')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                      viewMode === 'source' ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <Database className="w-4 h-4" />
                    Data Sources
                  </button>
                </div>

                <div className="min-h-[150px]">
                  {viewMode === 'plan' ? (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Recommended Steps</h3>
                      {selectedInsight.detailedPlan ? (
                        <ul className="space-y-3">
                          {selectedInsight.detailedPlan.map((step: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm p-3 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-zinc-500 italic">No detailed plan available for this strategy.</p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                       <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Data Context</h3>
                       <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                         <p className="text-zinc-300 text-sm leading-relaxed">
                           {selectedInsight.dataSource || "Analysis based on aggregated network telemetry and historical patterns."}
                         </p>
                       </div>
                       
                       <div className="mt-4 grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Confidence Score</p>
                            <p className="text-2xl font-custom text-white">94.2%</p>
                         </div>
                         <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
                            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Data Points</p>
                            <p className="text-2xl font-custom text-white">12.5k</p>
                         </div>
                       </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-6 border-t border-zinc-800 flex justify-end">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2 bg-zinc-100 hover:bg-white text-black font-bold rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
