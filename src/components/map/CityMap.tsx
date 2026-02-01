"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polyline, 
  Circle, 
  useMap 
} from 'react-leaflet';
import { 
  ScenarioId, 
  SimulationState, 
  LogEntry, 
  LatLng, 
  SwapStation 
} from './types';
import { 
  INITIAL_CENTER, 
  SWAP_STATIONS, 
  START_POINT,
  SHOPS
} from './constants';
import { getRoute } from './services/routingService';
import { getEventNarration } from './services/geminiService';
import SimulationControls from './components/SimulationControls';
import EventLog from './components/EventLog';
import { Fuel, Moon, Sun, Pause, Play, RotateCw, Maximize, Minimize } from 'lucide-react';

// MapUpdater component to handle map interactions
const MapUpdater = ({ center }: { center: LatLng }) => {
  const map = useMap();
  useEffect(() => {
    map.panTo(center, { animate: true, duration: 0.15 });
  }, [center, map]);
  return null;
};

type Theme = 'modern' | 'tactical';

const carIcon = (theme: Theme) => L.divIcon({
  html: `
    <div class="relative w-10 h-10 flex items-center justify-center ${theme === 'tactical' ? 'bg-[#0A84FF]' : 'bg-[#007AFF]'} rounded-full shadow-[0_0_25px_rgba(10,132,255,0.6)] border-2 border-white/90 backdrop-blur-xl group transition-all duration-700">
      <div class="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-20"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
    </div>
  `,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const stationIcon = (status: string, theme: Theme) => {
  let bgColor = theme === 'tactical' ? 'bg-[#2C2C2E]/95 border-white/20' : 'bg-white/80 border-white shadow-lg';
  let iconColor = theme === 'tactical' ? '#0A84FF' : '#007AFF';
  let pulseClass = '';
  
  if (status === 'busy') {
    bgColor = theme === 'tactical' ? 'bg-[#FF9F0A]/20 border-[#FF9F0A]/50' : 'bg-amber-50/70 border-amber-300 shadow-md';
    iconColor = '#FF9F0A';
  } else if (status === 'fault') {
    bgColor = theme === 'tactical' ? 'bg-[#FF453A]/20 border-[#FF453A]/50' : 'bg-rose-50/70 border-rose-300 shadow-md';
    iconColor = '#FF453A';
    pulseClass = 'marker-pulse-red';
  }

  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-8 h-8 ${bgColor} ${pulseClass} border rounded-full group transition-all duration-500 backdrop-blur-xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v3"/><path d="m19 11-3-3"/><path d="M13 22v-3"/><path d="m5 11 3-3"/><path d="M5 18H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2h-2"/><path d="M9 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z"/><path d="M12 18H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v10a2 2 0 0 1-2 2h-2"/></svg>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const CityMap: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('tactical');
  const [state, setState] = useState<SimulationState & { isPaused: boolean; currentStep: number }>({
    currentScenario: null,
    carPosition: START_POINT,
    targetStationId: null,
    route: [],
    isSimulating: false,
    isPaused: false,
    currentStep: 0,
    logs: [],
    progress: 0,
  });

  const [stations, setStations] = useState<SwapStation[]>(SWAP_STATIONS);
  const simTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'tactical' ? 'modern' : 'tactical');
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const addLog = useCallback(async (message: string, type: LogEntry['type'] = 'info', useAi: boolean = false) => {
    let narration = undefined;
    if (useAi) {
      const contextStr = "High-end Autonomous EV dashboard. Informative and smooth.";
      narration = await getEventNarration(message, contextStr);
    }

    const newLog: LogEntry = {
      id: Math.random().toString(36).slice(2, 11),
      timestamp: new Date(),
      message,
      type,
      aiNarration: narration,
    };
    setState(prev => ({ ...prev, logs: [...prev.logs, newLog] }));
  }, []);

  const handleReset = useCallback(() => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setState(prev => ({
      ...prev,
      currentScenario: null,
      carPosition: START_POINT,
      targetStationId: null,
      route: [],
      isSimulating: false,
      isPaused: false,
      currentStep: 0,
      logs: [],
      progress: 0,
    }));
    setStations(SWAP_STATIONS);
  }, []);

  const runSimulationStep = useCallback((route: LatLng[], scenario: ScenarioId, startIndex: number = 0) => {
    let step = startIndex;
    const totalSteps = route.length;
    if (simTimerRef.current) clearInterval(simTimerRef.current);

    simTimerRef.current = window.setInterval(async () => {
      if (step >= totalSteps - 1) {
        if (simTimerRef.current) clearInterval(simTimerRef.current);
        setState(prev => ({ ...prev, isSimulating: false, progress: 100, carPosition: route[totalSteps - 1], currentStep: step }));
        addLog("ARRIVAL: Final destination reached. Locking safety protocols and initiating rapid swap.", "success", true);
        return;
      }

      const currentPos = route[step];
      const progressPercent = (step / totalSteps) * 100;

      setState(prev => ({ 
        ...prev, 
        carPosition: currentPos,
        progress: progressPercent,
        currentStep: step
      }));

      // Trigger Rerouting
      if (scenario === ScenarioId.STATION_CONGESTION && step === Math.floor(totalSteps * 0.4)) {
        clearInterval(simTimerRef.current!);
        addLog("ADVISORY: Hub overcrowding detected. Re-routing to secondary optimal station...", "warning", true);
        const nextStation = stations[1]; 
        const newRouteData = await getRoute(currentPos, nextStation.location);
        setState(prev => ({ 
          ...prev, 
          targetStationId: nextStation.id, 
          route: newRouteData.coordinates,
          currentScenario: ScenarioId.TRAFFIC_REROUTE
        }));
        runSimulationStep(newRouteData.coordinates, ScenarioId.TRAFFIC_REROUTE, 0);
        return;
      }

      if (scenario === ScenarioId.STATION_FAULT && step === Math.floor(totalSteps * 0.6)) {
        clearInterval(simTimerRef.current!);
        addLog("ALERT: Destination offline due to sudden power surge. Diverting to backup terminal...", "error", true);
        setStations(prev => prev.map(s => s.id === 'sta-1' ? { ...s, status: 'fault' } : s));
        const fallback = stations[2];
        const newRouteData = await getRoute(currentPos, fallback.location);
        setState(prev => ({ 
          ...prev, 
          targetStationId: fallback.id, 
          route: newRouteData.coordinates,
          currentScenario: ScenarioId.TRAFFIC_REROUTE
        }));
        runSimulationStep(newRouteData.coordinates, ScenarioId.TRAFFIC_REROUTE, 0);
        return;
      }

      step++;
    }, 150);
  }, [addLog, stations]);

  const togglePause = () => {
    if (state.isPaused) {
      setState(prev => ({ ...prev, isPaused: false, isSimulating: true }));
      runSimulationStep(state.route, state.currentScenario!, state.currentStep);
    } else {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
      setState(prev => ({ ...prev, isPaused: true, isSimulating: false }));
      addLog("System Paused. Current position maintained.", "info");
    }
  };

  const restartScenario = () => {
    if (state.currentScenario) {
      startScenario(state.currentScenario);
    }
  };

  const startScenario = async (id: ScenarioId) => {
    handleReset();
    const target = stations[0];
    addLog(`INITIALIZING: Autonomous Profile [${id}] active. Calculating optimal trajectory...`, "info", true);
    const routeData = await getRoute(START_POINT, target.location);
    setState(prev => ({
      ...prev,
      currentScenario: id,
      isSimulating: true,
      isPaused: false,
      targetStationId: target.id,
      route: routeData.coordinates,
      carPosition: START_POINT,
      currentStep: 0,
    }));
    runSimulationStep(routeData.coordinates, id);
  };

  // Ensure map is only rendered on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-zinc-900 animate-pulse rounded-2xl" />;

  return (
    <div ref={containerRef} className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-700 ${theme === 'tactical' ? 'bg-[#1c1c1e] theme-tactical' : 'bg-[#F2F2F7] theme-modern'}`}>
      
      {/* Mini Controls */}
      <div className="absolute top-4 right-1/2 translate-x-1/2 z-[1000] flex gap-2">
        <button 
          onClick={togglePause}
          disabled={!state.isSimulating && !state.isPaused}
          className={`p-2 rounded-full border transition-all duration-300 disabled:opacity-20 ${theme === 'modern' ? 'bg-white border-slate-200 text-blue-600' : 'bg-black/40 backdrop-blur-md border-white/10 text-blue-400'}`}
          title={state.isPaused ? "Resume" : "Pause"}
        >
          {state.isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
        </button>
        <button 
          onClick={restartScenario}
          disabled={!state.currentScenario}
          className={`p-2 rounded-full border transition-all duration-300 disabled:opacity-20 ${theme === 'modern' ? 'bg-white border-slate-200 text-slate-600' : 'bg-black/40 backdrop-blur-md border-white/10 text-slate-400'}`}
          title="Restart Scenario"
        >
          <RotateCw className="w-3 h-3" />
        </button>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-all duration-500 hover:scale-110 active:scale-95 ${theme === 'tactical' ? 'bg-black/40 backdrop-blur-md text-[#FFD60A] border-white/10' : 'bg-white/80 text-blue-500 border-white shadow-sm'}`}
          title="Toggle Theme"
        >
          {theme === 'tactical' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
        </button>
        <button 
          onClick={toggleFullscreen}
          className={`p-2 rounded-full border transition-all duration-500 hover:scale-110 active:scale-95 ${theme === 'tactical' ? 'bg-black/40 backdrop-blur-md text-white/70 border-white/10' : 'bg-white/80 text-slate-500 border-white shadow-sm'}`}
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />}
        </button>
      </div>

      <MapContainer 
        key={`${theme}-${mounted ? 'mounted' : 'unmounted'}`}
        center={INITIAL_CENTER} 
        zoom={13} 
        className="w-full h-full z-0" 
        zoomControl={false}
      >
        <TileLayer
          url={theme === 'tactical' 
            ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution='&copy; OpenStreetMap'
        />
        <MapUpdater center={state.carPosition} />
        {/* Draw regions and station markers */}
        {stations.map((station) => {
          // Get shops for this station
          const shops = SHOPS.filter(shop => shop.stationId === station.id);
          // Compute region center (station) and radius to cover all shops (max distance)
          const distances = shops.map(shop => {
            const [lat1, lon1] = station.location;
            const [lat2, lon2] = shop.location;
            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;
            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
          });
          const regionRadius = Math.max(100, ...distances) + 40; // meters, min 100m
          return (
            <React.Fragment key={station.id}>
              <Circle
                center={station.location}
                radius={regionRadius}
                pathOptions={{
                  color: theme === 'tactical' ? '#FFD60A' : '#34C759',
                  fillColor: theme === 'tactical' ? '#FFD60A33' : '#34C75933',
                  fillOpacity: 0.18,
                  weight: 2,
                  dashArray: '6 8',
                }}
              />
              <Marker position={station.location} icon={stationIcon(station.status, theme)}>
                <Popup>
                  <div className="font-bold text-sm text-slate-800 tracking-tight">{station.name}</div>
                </Popup>
              </Marker>
              {/* Shop markers */}
              {shops.map(shop => (
                <Marker key={shop.id} position={shop.location} icon={L.divIcon({
                  html: `<div class='bg-white/90 border border-green-400 rounded-full w-5 h-5 flex items-center justify-center shadow-md'><svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='#34C759' stroke-width='2.2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='20' x='4' y='2' rx='2' ry='2'/><path d='M9 22v-4h6v4'/><path d='M8 6h.01'/><path d='M16 6h.01'/><path d='M12 6h.01'/><path d='M12 10h.01'/><path d='M12 14h.01'/><path d='M16 10h.01'/><path d='M16 14h.01'/><path d='M8 10h.01'/><path d='M8 14h.01'/></svg></div>`,
                  className: '',
                  iconSize: [20, 20],
                  iconAnchor: [10, 10],
                })}>
                  <Popup>
                    <div className="font-semibold text-xs text-green-700">{shop.name}</div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
        <Marker position={state.carPosition} icon={carIcon(theme)} />
        {state.route.length > 0 && (
          <Polyline 
            positions={state.route} 
            pathOptions={{ 
              color: theme === 'tactical' ? '#0A84FF' : '#007AFF', 
              weight: 6,
              opacity: 0.8,
            }} 
          />
        )}
      </MapContainer>

      <SimulationControls 
        onStartScenario={startScenario} 
        onReset={handleReset} 
        activeScenario={state.currentScenario}
        isSimulating={state.isSimulating}
        theme={theme}
      />
      
      <EventLog 
        logs={state.logs} 
        theme={theme} 
        isSimulating={state.isSimulating} 
        className="center bottom-30  right-3"
      />

      <div className="absolute bottom-4 left-4 z-[500] w-64 pointer-events-none">
        <div className={`
          frosted-glass p-4 rounded-3xl transition-all duration-700 border pointer-events-auto
          ${theme === 'modern' ? 'text-slate-900 border-white shadow-xl bg-white/40' : 'text-white border-white/10 bg-black/40 backdrop-blur-md'}
        `}>
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'tactical' ? 'bg-white/5 text-[#0A84FF]' : 'bg-blue-50 text-[#007AFF] shadow-inner shadow-blue-100/50'}`}>
                <Fuel className="w-5 h-5" strokeWidth={3} />
             </div>
             <div className="flex-1 overflow-hidden">
                <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme === 'modern' ? 'text-blue-600/50' : 'opacity-40'} mb-0.5`}>DESTINATION</p>
                <p className="text-xs font-bold truncate uppercase tracking-tight">
                  {state.targetStationId ? stations.find(s => s.id === state.targetStationId)?.name : 'IDLE - STANDBY'}
                </p>
                <div className={`w-full h-1.5 rounded-full mt-2 ${theme === 'modern' ? 'bg-blue-100/30 ring-1 ring-white' : 'bg-black/40 ring-1 ring-white/5'} overflow-hidden`}>
                  <div className={`h-full rounded-full transition-all duration-1000 ${theme === 'tactical' ? 'bg-[#0A84FF] shadow-[0_0_10px_#0A84FF]' : 'bg-[#007AFF] shadow-[0_0_15px_rgba(0,122,255,0.4)]'}`} style={{ width: `${state.progress}%` }} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;