
import React from 'react';
import { RotateCcw, Activity, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';
import { ScenarioId } from '../types';

interface SimulationControlsProps {
  onStartScenario: (id: ScenarioId) => void;
  onReset: () => void;
  activeScenario: ScenarioId | null;
  isSimulating: boolean;
  theme: 'modern' | 'tactical';
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ 
  onStartScenario, 
  onReset, 
  activeScenario, 
  // isSimulating, // Unused
  theme
}) => {
  const isTactical = theme === 'tactical';

  return (
    <div className="absolute top-4 left-4 z-[500] flex flex-col gap-4 w-60 pointer-events-none">
      <div className={`
        frosted-glass rounded-2xl p-5 transition-all duration-700 pointer-events-auto
        ${isTactical ? 'text-white bg-black/40 backdrop-blur-md border border-white/10' : 'text-slate-900 border-slate-300/40 bg-white/40 backdrop-blur-md'}
      `}>
        <div className={`flex items-center gap-3 mb-5 border-b pb-4 ${isTactical ? 'border-white/10' : 'border-blue-200/50'}`}>
          <Cpu className={`w-5 h-5 ${isTactical ? 'text-[#0A84FF]' : 'text-[#007AFF]'}`} strokeWidth={3} />
          <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isTactical ? 'opacity-60' : 'text-blue-800/60'}`}>
            SIMULATION
          </h2>
        </div>
        
        <div className="space-y-3">
          {[
            { id: ScenarioId.STATION_CONGESTION, label: 'Congestion', icon: Activity, desc: 'Smart Reroute' },
            { id: ScenarioId.TRAFFIC_REROUTE, label: 'Optimization', icon: AlertTriangle, desc: 'Live Traffic' },
            { id: ScenarioId.STATION_FAULT, label: 'Emergency', icon: ShieldAlert, desc: 'Fault Relay' }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeScenario === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onStartScenario(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 text-left group ${
                  isActive 
                    ? 'bg-[#0A84FF] text-white border-[#0A84FF] shadow-[0_8px_24px_rgba(10,132,255,0.4)] scale-[1.02]' 
                    : (isTactical 
                        ? 'bg-white/5 text-slate-300 border-white/20 hover:bg-white/10' 
                        : 'bg-white/70 text-slate-800 border-slate-300/70 hover:bg-white/95 hover:border-slate-400/80 hover:shadow-xl hover:shadow-blue-500/10')
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : (isTactical ? 'bg-black/40 shadow-inner' : 'bg-blue-50/80 shadow-inner border border-blue-100')}`}>
                  <Icon className="w-4 h-4" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-tight leading-none">{item.label}</p>
                  <p className={`text-[9px] font-bold mt-1 ${isTactical ? 'opacity-40' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-2">
          <button
            onClick={onReset}
            className={`
              w-full flex items-center justify-center gap-2 py-3 px-4 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl
              ${isTactical 
                ? 'bg-white/5 text-slate-400 border border-white/10 hover:bg-[#FF453A]/10 hover:text-[#FF453A]' 
                : 'bg-white/90 text-blue-600 border border-slate-300 shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300'}
            `}
          >
            <RotateCcw className="w-3 h-3" strokeWidth={3} /> RECALIBRATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
