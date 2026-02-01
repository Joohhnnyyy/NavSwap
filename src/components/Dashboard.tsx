"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Activity, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  Users, Calendar, BarChart3, Clock, CheckCircle2,
  ExternalLink, Ticket, Shuffle,
  Bot, ShieldCheck, ArrowRight, Info
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { AI_ACTIONS, RECOMMENDATIONS, NETWORK_KPIS as MOCK_KPIS, STATIONS as MOCK_STATIONS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertsFeed } from './AlertsFeed';
import { 
  getAdminSummary, getAdminMetrics, getAdminStations, getRecommendations, 
  getAdminEvents, getAdminDeliveries, getAdminTickets,
  alertDelivery, reportFault, createManualTicket, confirmDelivery, getHealth,
  submitRecommendationRequest, selectRecommendation, feedbackRecommendation
} from '@/lib/api';
import { getDashboardInsights, getAnalysisAndRecommendations } from '@/lib/map/geminiService';
import { toast } from 'sonner';

// Reuse data for chart
const MOCK_DATA = [
  { time: '00:00', swaps: 40, demand: 24, efficiency: 98 },
  { time: '04:00', swaps: 20, demand: 18, efficiency: 99 },
  { time: '08:00', swaps: 85, demand: 90, efficiency: 92 },
  { time: '12:00', swaps: 110, demand: 115, efficiency: 88 },
  { time: '16:00', swaps: 95, demand: 98, efficiency: 94 },
  { time: '20:00', swaps: 70, demand: 75, efficiency: 96 },
  { time: '23:59', swaps: 45, demand: 42, efficiency: 98 },
];

const ClientClock = () => {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{time}</>;
};

export default function Dashboard() {
  const router = useRouter();
  const [kpis, setKpis] = useState(MOCK_KPIS);
  const [stations, setStations] = useState(MOCK_STATIONS);
  const [recommendations, setRecommendations] = useState(RECOMMENDATIONS);
  const [metrics, setMetrics] = useState(MOCK_DATA);
  const [aiActions, setAiActions] = useState(AI_ACTIONS);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState({
    optimization: "Rerouted 12 vehicles to Sector 7 to prevent congestion.",
    maintenance: "Station 4 charger B2 showing early signs of voltage fluctuation."
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, stationsRes, recsRes, metricsRes, eventsRes, deliveriesRes, ticketsRes, healthRes] = await Promise.all([
          getAdminSummary().catch(e => ({ data: MOCK_KPIS })),
          getAdminStations().catch(e => ({ data: MOCK_STATIONS })),
          getRecommendations().catch(e => ({ data: RECOMMENDATIONS })),
          getAdminMetrics().catch(e => ({ data: MOCK_DATA })),
          getAdminEvents().catch(e => ({ data: AI_ACTIONS })),
          getAdminDeliveries().catch(e => ({ data: [] })),
          getAdminTickets().catch(e => ({ data: [] })),
          getHealth().catch(e => ({ data: { status: 'ok', uptime: 99.9 } }))
        ]);

        if (kpiRes.data) setKpis(kpiRes.data);
        if (stationsRes.data && Array.isArray(stationsRes.data)) setStations(stationsRes.data);
        if (recsRes.data && Array.isArray(recsRes.data)) setRecommendations(recsRes.data);
        if (metricsRes.data && Array.isArray(metricsRes.data)) {
           // Map API data to chart format
           const mappedMetrics = metricsRes.data.map((m: any) => ({
             time: m.timestamp || m.time,
             swaps: m.totalSwaps || m.swaps,
             demand: m.energyConsumption ? Math.round(m.energyConsumption / 5) : (m.demand || 0),
             efficiency: m.efficiency || 95
           }));
           setMetrics(mappedMetrics);
        }
        if (eventsRes.data && Array.isArray(eventsRes.data)) setAiActions(eventsRes.data);
        if (deliveriesRes.data && Array.isArray(deliveriesRes.data)) setDeliveries(deliveriesRes.data);
        if (ticketsRes.data && Array.isArray(ticketsRes.data)) setTickets(ticketsRes.data);
        if (healthRes?.data) setSystemHealth(healthRes.data);

        // Generate AI insights based on the fetched data
         const insights = await getDashboardInsights({
           activeStations: stationsRes.data?.length || 0,
           // @ts-ignore - kpi property compatibility
           avgWaitTime: kpiRes.data?.avgWaitTime || "3 min",
           criticalAlerts: recsRes.data?.length || 0
         });
         setAiInsights(insights);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAlertDelivery = async () => {
    setActionLoading(true);
    try {
      await alertDelivery({ stationId: 'demo-station-1', driverCount: 3 });
      toast.success("Delivery Alert Broadcasted!", {
        description: "All nearby stations have been notified.",
      });
    } catch (e) {
      console.error("Failed to alert delivery", e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReportFault = async () => {
    setActionLoading(true);
    try {
      await reportFault({ stationId: 'demo-station-1', description: 'Manual fault report' });
      // Simulate adding ticket since backend is mocked
      const newTicket = { 
        id: `fault-${Date.now()}`, 
        issue: 'Manual Fault Report', 
        stationId: 'demo-station-1', 
        priority: 'high',
        status: 'open'
      };
      setTickets(prev => [newTicket, ...prev]);
      toast.error("Fault Reported", {
        description: "Maintenance team has been dispatched.",
      });
    } catch (e) {
      console.error("Failed to report fault", e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleManualTicket = async () => {
    setActionLoading(true);
    try {
      await createManualTicket({ stationId: 'demo-station-1', issue: 'Manual Inspection Required', priority: 'medium' });
      // Simulate adding ticket since backend is mocked
      const newTicket = { 
        id: `ticket-${Date.now()}`, 
        issue: 'Manual Inspection Required', 
        stationId: 'demo-station-1', 
        priority: 'medium',
        status: 'open'
      };
      setTickets(prev => [newTicket, ...prev]);
      toast.success("Ticket Created", {
        description: "Support ticket has been generated.",
      });
    } catch (e) {
      console.error("Failed to create ticket", e);
      // Fallback for demo/error
      const newTicket = { 
        id: `ticket-${Date.now()}`, 
        issue: 'Manual Inspection Required', 
        stationId: 'demo-station-1', 
        priority: 'medium',
        status: 'open'
      };
      setTickets(prev => [newTicket, ...prev]);
      toast.success("Ticket Created (Demo)", {
        description: "Backend unreachable, running in demo mode.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelivery = async (id: string) => {
    try {
      await confirmDelivery(id);
      setDeliveries(prev => prev.filter(d => d.id !== id));
    } catch (e) {
      console.error("Failed to confirm delivery", e);
    }
  };

  const handleRerouteDrivers = async () => {
    setActionLoading(true);
    try {
      // Simulate broadcasting a reroute alert to multiple drivers
      await alertDelivery({ 
        stationId: 'demo-station-reroute', 
        message: 'Reroute instruction: Proceed to Sector 7 for load balancing',
        priority: 'high' 
      });
      toast.info("Route Optimization Complete", {
        description: "Reroute command broadcasted to 12 active drivers.",
      });
    } catch (e) {
      console.error("Failed to reroute drivers", e);
      // Fallback for demo
      toast.info("Route Optimization Complete (Demo)", {
        description: "Reroute command broadcasted to 12 active drivers.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewAnalysis = async () => {
    setActionLoading(true);
    try {
      // Gather current context for AI analysis
      const contextData = {
        stations: stations.map(s => ({ 
          name: s.name, 
          status: s.status, 
          queue: s.queueLength, 
          inventory: s.batteryInventory 
        })),
        kpis: kpis,
        activeAlerts: recommendations.length
      };
      
      const result = await getAnalysisAndRecommendations(contextData);
      
      if (result) {
        setAiInsights({
          optimization: result.optimization,
          maintenance: result.maintenance
        });
        
        if (result.recommendations && result.recommendations.length > 0) {
          setRecommendations(result.recommendations);
        }
        
        toast.success("AI Analysis Complete", {
          description: "New insights & recommendations have been generated.",
        });
      }
    } catch (e) {
      console.error("Analysis failed", e);
      // Fallback: Shuffle recommendations to show update
      setRecommendations(prev => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled;
      });
      toast.warning("Analysis Updated (Fallback Mode)", {
        description: "Unable to connect to AI service. Displaying cached insights.",
      });
    } finally {
       setActionLoading(false);
     }
   };

   const handleSelectRecommendation = async (id: string) => {
    try {
      // Mock station selection since recommendation object doesn't carry stationId explicitly
      await selectRecommendation(id, 'station-04');
      setRecommendations(prev => prev.filter(r => r.id !== id));
      toast.success("Recommendation Applied", {
        description: "System parameters have been updated.",
      });
    } catch (e) {
      console.error("Failed to select recommendation", e);
      // Fallback
      setRecommendations(prev => prev.filter(r => r.id !== id));
      toast.success("Recommendation Applied (Demo)", {
        description: "System parameters have been updated.",
      });
    }
  };

  const handleFeedbackRecommendation = async (id: string, type: 'modify' | 'escalate') => {
    try {
      await feedbackRecommendation(id, { type, comment: "User feedback from dashboard" });
      toast.success("Feedback Recorded", {
        description: `You marked this as ${type}.`,
      });
    } catch (e) {
      console.error("Failed to submit feedback", e);
      toast.success("Feedback Recorded (Demo)", {
        description: `You marked this as ${type}.`,
      });
    }
  };
 
    const kpiItems = [
    { label: "Active Chargers", value: `${stations.filter(s => s.status === 'healthy').length}/${stations.length}`, icon: Zap, color: "text-emerald-500" },
    { label: "Queue Size", value: kpis.avgQueueTime || "4", icon: Users, color: "text-blue-500" }, // Mapping avgQueueTime to Queue Size roughly or use another field if available
    { label: "Wait Time", value: kpis.avgQueueTime, icon: Clock, color: "text-amber-500" },
    { label: "Efficiency", value: "94%", icon: Activity, color: "text-purple-500" },
  ];

  const subsections = [
    { label: "Power Output", value: "450 kW", icon: Zap, color: "text-yellow-500" },
    { label: "Grid Status", value: "Stable", icon: Activity, color: "text-emerald-500" },
    { label: "Daily Swaps", value: "124", icon: ArrowUpRight, color: "text-blue-500" },
    { label: "Maintenance", value: "None", icon: AlertTriangle, color: "text-zinc-500" },
  ];

  return (
    <div className="space-y-8 p-6 min-h-screen bg-black/20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-zinc-500 text-sm mt-1">Real-time network overview and AI operational status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-300 uppercase">System Online</span>
          </div>
          <div className="text-sm text-zinc-500 font-mono min-w-[100px] text-right">
            <ClientClock />
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Active Stations" 
          value={`${stations.filter(s => s.status === 'healthy').length}/${stations.length}`} 
          trend="+2 New" 
          icon={Zap} 
          trendUp={true}
        />
        <KPICard 
          label="Avg Queue Time" 
          value={kpis.avgQueueTime || "3.2 min"} 
          trend="-0.5m" 
          icon={Clock} 
          trendUp={true}
        />
        <KPICard 
          label="Prevented Incidents" 
          value={kpis.preventedIncidents?.toString() || "12"} 
          trend="+3 Today" 
          icon={AlertTriangle} 
          trendUp={true}

          color="text-amber-500"
        />
        <KPICard 
          label="AI Success Rate" 
          value="98.4%" 
          trend="+0.2%" 
          icon={Activity} 
          trendUp={true}
          color="text-blue-500"
        />
      </div>

      {/* Station Detail & AI Copilot Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Station Detail Section */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 h-full relative overflow-hidden"> 
          <div className="flex justify-between items-center mb-10"> 
            <div> 
              <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Station: NavSwap – Sector 12</h2> 
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Active Station Detail</p> 
            </div> 
            <div className="flex gap-2"> 
              <button 
                onClick={() => router.push('/test-station')}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold rounded-xl transition-all border border-zinc-700/50 group"
              > 
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                View Station 
              </button> 
              <button 
                onClick={handleManualTicket}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold rounded-xl transition-all border border-zinc-700/50 group"
              > 
                <Ticket className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                Raise Ticket 
              </button> 
              <button 
                onClick={handleRerouteDrivers}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
              > 
                <Shuffle className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                Reroute Drivers 
              </button> 
            </div> 
          </div> 

          <div className="grid grid-cols-4 gap-8 mb-12"> 
            {kpiItems.map((kpi, i) => ( 
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className="p-4 rounded-2xl bg-zinc-800/20 border border-zinc-800/50" 
              > 
                <div className="flex items-center gap-3 mb-2"> 
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} /> 
                  <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">{kpi.label}</p> 
                </div> 
                <p className="text-3xl font-bold text-zinc-100">{kpi.value}</p> 
              </motion.div> 
            ))} 
          </div> 

          <div className="grid grid-cols-2 gap-x-12 gap-y-6"> 
            {subsections.map((sub, i) => ( 
              <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-0"> 
                <div className="flex items-center gap-3"> 
                  <div className="p-2 bg-zinc-800/50 rounded-lg"> 
                    <sub.icon className={`w-4 h-4 ${sub.color}`} /> 
                  </div> 
                  <span className="text-sm font-medium text-zinc-400">{sub.label}</span> 
                </div> 
                <span className={`text-sm font-bold ${sub.color}`}>{sub.value}</span> 
              </div> 
            ))} 
          </div> 
        </div>

        {/* AI Copilot Section */}
        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-zinc-900/40 border border-indigo-500/20 rounded-3xl p-6 h-full min-h-[600px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Bot className="w-32 h-32 text-indigo-500" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Bot className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">NavSwap AI Copilot</h2>
              </div>
              <p className="text-zinc-400 text-sm">Real-time optimization engine active. Analyzing network patterns.</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-zinc-200 mb-1">System Optimization</p>
                    <p className="text-xs text-zinc-400">{aiInsights.optimization}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                 <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-zinc-200 mb-1">Predictive Maintenance</p>
                    <p className="text-xs text-zinc-400">{aiInsights.maintenance}</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleViewAnalysis}
              disabled={actionLoading}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 group">
              <span>{actionLoading ? "Analyzing..." : "View Full Analysis"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Section */}
        <section className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Network Load</h3>
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
          <div className="h-[350px] w-full">
            {metrics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics}>
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
                  />
                  <Area 
                    type="monotone" 
                    dataKey="swaps" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorSwaps)" 
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#a855f7" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorDemand)" 
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 text-xs animate-pulse">
                Loading network metrics...
              </div>
            )}
          </div>
        </section>

        {/* Side Panel: Recent Actions */}
        <section className="space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 h-full">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Live AI Actions
            </h3>
            <div className="space-y-4">
              {aiActions.map((action) => (
                <div key={action.id} className="flex gap-4 items-start p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/50">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-200 font-medium leading-tight">{action.type}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">{action.timestamp}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 uppercase font-bold">{action.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Critical Alerts
              </h3>
               <div className="space-y-3">
                {recommendations.slice(0, 2).map((rec) => (
                  <div key={rec.id} className="p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                    <p className="text-xs font-bold text-red-400 uppercase mb-1">{rec.issue}</p>
                    <p className="text-xs text-zinc-400">{rec.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* AI Recommendation Feed */}
      <section className="mb-8">
        <AlertsFeed 
          recommendations={recommendations} 
          onSelect={handleSelectRecommendation}
          onFeedback={handleFeedbackRecommendation}
        />
      </section>

      {/* Station Status Grid */}
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Station Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stations.map((station) => (
            <div key={station.id} className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white">{station.name}</h4>
                  <p className="text-xs text-zinc-500">{station.location}</p>
                </div>
                <StatusBadge status={station.status} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Uptime</span>
                  <span className="text-zinc-200 font-mono">{station.uptime}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Queue</span>
                  <span className="text-zinc-200 font-mono">{station.queueLength} vehicles</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", station.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500')} 
                    style={{ width: `${station.uptime}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics & Faults Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Deliveries */}
        <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Active Deliveries
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={handleAlertDelivery}
                disabled={actionLoading}
                className="text-[10px] font-bold bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Broadcast Alert
              </button>
              <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2 py-1 rounded-lg border border-blue-500/20 flex items-center">
                {deliveries.length} Active
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {deliveries.length === 0 ? (
              <p className="text-zinc-500 text-sm">No active deliveries currently.</p>
            ) : (
              deliveries.map((delivery, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <div>
                      <p className="text-sm font-bold text-white">{delivery.id || `Delivery #${i+1}`}</p>
                      <p className="text-xs text-zinc-500">Driver: {delivery.driverId || "Unassigned"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400">{delivery.status || "Pending"}</span>
                    <button 
                      onClick={() => handleConfirmDelivery(delivery.id)}
                      className="p-1 hover:bg-emerald-500/20 text-emerald-500 rounded transition-colors"
                      title="Confirm Delivery"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Fault Tickets */}
        <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-500" />
              Open Tickets
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={handleReportFault}
                disabled={actionLoading}
                className="text-[10px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg transition-colors border border-zinc-700"
              >
                Report Fault
              </button>
              <button 
                onClick={handleManualTicket}
                disabled={actionLoading}
                className="text-[10px] font-bold bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                + Ticket
              </button>
            </div>
          </div>
          <div className="space-y-4">
             {tickets.length === 0 ? (
              <p className="text-zinc-500 text-sm">No open fault tickets.</p>
            ) : (
              tickets.map((ticket, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-white">{ticket.issue || "System Fault"}</p>
                      <p className="text-xs text-zinc-500">Station: {ticket.stationId || "Unknown"}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                    {ticket.priority || "High"}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, icon: Icon, trendUp, color = "text-white" }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-3xl hover:bg-zinc-900/60 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl bg-zinc-800/50", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-zinc-800/50", trendUp ? 'text-emerald-400' : 'text-red-400')}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    healthy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "at-risk": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    critical: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  
  return (
    <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase border", styles[status as keyof typeof styles])}>
      {status}
    </span>
  );
}
