"use client";

import React, { useEffect, useState } from 'react';
import { STATIONS as MOCK_STATIONS, Station } from '@/lib/data';
import { StationCard } from '@/components/StationCard';
import { motion } from 'framer-motion';
import { Map, Filter, Search, MoreHorizontal } from 'lucide-react';
import { getAdminStations } from '@/lib/api';

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>(MOCK_STATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await getAdminStations();
        if (response.data && Array.isArray(response.data)) {
            // Map backend data to Station interface if necessary
            // Assuming backend returns matching structure or we map it
            // For now, let's assume it matches or we fallback to mock
            setStations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch stations, using mock data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Network Stations</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage and monitor all swap stations across the city.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search stations..." 
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all w-64"
            />
          </div>
          <button className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-xl text-zinc-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            Add Station
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stations.map((station, index) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StationCard station={station} />
          </motion.div>
        ))}
      </div>

      <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Live Status Monitor</h2>
          <button className="text-zinc-500 hover:text-zinc-300 transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-800/50">
                <th className="pb-4 px-4">Station Name</th>
                <th className="pb-4 px-4">Location</th>
                <th className="pb-4 px-4">Uptime</th>
                <th className="pb-4 px-4">Queue</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {stations.map((station) => (
                <tr key={station.id} className="border-b border-zinc-800/20 last:border-0 hover:bg-zinc-800/20 transition-all group">
                  <td className="py-4 px-4 font-medium text-zinc-200">{station.name}</td>
                  <td className="py-4 px-4 text-zinc-500">{station.location}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${station.uptime}%` }}
                        />
                      </div>
                      <span className="text-zinc-400 text-xs font-mono">{station.uptime}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-zinc-300 text-xs font-mono">
                      {station.queueLength} vh
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      station.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-500' :
                      station.status === 'at-risk' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        station.status === 'healthy' ? 'bg-emerald-500' :
                        station.status === 'at-risk' ? 'bg-amber-500' :
                        'bg-red-500 animate-pulse'
                      }`} />
                      {station.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
