"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, ShieldCheck, Zap, Sliders, Save, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { RoseVisualization, RadarVisualization } from '@/components/AdvancedVisualizations';

export default function AISettingsPage() {
  const [aiMode, setAiMode] = useState<'conservative' | 'aggressive'>('aggressive');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 max-w-6xl pb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <BrainCircuit className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Copilot Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure intelligence thresholds and automated decision logic.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-muted-foreground" />
                Operational Intelligence Mode
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setAiMode('conservative')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all text-left group",
                    aiMode === 'conservative' ? "bg-accent border-primary ring-1 ring-primary/50" : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <ShieldCheck className={cn("w-6 h-6", aiMode === 'conservative' ? "text-primary" : "text-muted-foreground")} />
                    <div className={cn("w-4 h-4 rounded-full border-2", aiMode === 'conservative' ? "bg-primary border-primary" : "border-muted")} />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">Conservative</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Prioritizes system stability. Requires human approval for all rerouting and maintenance actions.</p>
                </button>


                <button 
                  onClick={() => setAiMode('aggressive')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all text-left group",
                    aiMode === 'aggressive' ? "bg-accent border-primary ring-1 ring-primary/50" : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Zap className={cn("w-6 h-6", aiMode === 'aggressive' ? "text-amber-500" : "text-muted-foreground")} />
                    <div className={cn("w-4 h-4 rounded-full border-2", aiMode === 'aggressive' ? "bg-primary border-primary" : "border-muted")} />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">Aggressive</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Prioritizes network throughput. Auto-approves low-risk optimizations and driver rerouting.</p>
                </button>
              </div>
            </section>

            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-muted-foreground" />
                Decision Thresholds
              </h2>

              <div className="space-y-8">
                {[
                  { label: 'Auto-Approval Confidence', value: '92%', desc: 'AI actions with confidence above this score will be executed automatically.' },
                  { label: 'Anomaly Sensitivity', value: 'High', desc: 'Determines how quickly the AI triggers security or maintenance alerts.' },
                  { label: 'Reroute Optimization', value: 'Balanced', desc: 'Priority between driver travel distance and station wait times.' },
                ].map((setting, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                    <div className="max-w-md">
                      <h3 className="text-sm font-bold text-foreground mb-1">{setting.label}</h3>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-lg border border-border">{setting.value}</span>
                      <button className="text-muted-foreground hover:text-foreground transition-all">
                        <Sliders className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Model Performance Distribution</h3>
              <RoseVisualization />
            </section>

            <section className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Neural Network Bias</h3>
              <RadarVisualization />
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex items-start gap-4">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Changes to AI settings are logged and attributed to your session. These settings affect the behavior of the <span className="text-foreground font-medium">NavSwap AI Copilot</span> across all stations you manage.
              </p>
            </section>

            <div className="flex flex-col gap-3">
              <Button className="w-full h-12 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground text-sm font-bold uppercase">
                Reset to Default
              </Button>
            </div>
          </div>
        </div>

    </div>
  );
}
