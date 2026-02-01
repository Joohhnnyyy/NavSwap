"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, AlertTriangle, CheckCircle2, MoreHorizontal, Calendar, Tooltip } from 'lucide-react';
import { cn } from '@/lib/utils';

const TICKETS = [
  { id: 'TKT-882', station: 'Sector 12', issue: 'Cooling fan degradation', priority: 'medium', status: 'open', assigned: 'Tech A', created: '2h ago' },
  { id: 'TKT-883', station: 'Sector 04', issue: 'Emergency shutdown test', priority: 'high', status: 'in-progress', assigned: 'Tech B', created: '5h ago' },
  { id: 'TKT-884', station: 'Sector 22', issue: 'Sensor recalibration', priority: 'low', status: 'completed', assigned: 'Tech C', created: '1d ago' },
  { id: 'TKT-885', station: 'Sector 09', issue: 'Power module replacement', priority: 'critical', status: 'open', assigned: 'Unassigned', created: '15m ago' },
];

export default function MaintenancePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance Control</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage service tickets and scheduled hardware maintenance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-300 text-sm font-medium hover:text-white transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Service
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            Create Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Active Service Tickets</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase">Filter:</span>
                <select className="bg-zinc-800 border-none text-[10px] font-bold uppercase tracking-wider text-zinc-300 rounded-lg px-2 py-1 focus:ring-0">
                  <option>All Priority</option>
                  <option>Critical</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <th className="py-4 px-6">Ticket ID</th>
                    <th className="py-4 px-6">Issue & Station</th>
                    <th className="py-4 px-6">Priority</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {TICKETS.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-zinc-800/20 last:border-0 hover:bg-zinc-800/20 transition-all group">
                      <td className="py-5 px-6 font-mono text-zinc-400">{ticket.id}</td>
                      <td className="py-5 px-6">
                        <p className="font-medium text-zinc-200">{ticket.issue}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{ticket.station}</p>
                      </td>
                      <td className="py-5 px-6">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          ticket.priority === 'critical' ? "bg-red-500/10 text-red-500" :
                          ticket.priority === 'high' ? "bg-amber-500/10 text-amber-500" :
                          ticket.priority === 'medium' ? "bg-blue-500/10 text-blue-500" :
                          "bg-zinc-500/10 text-zinc-500"
                        )}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            ticket.status === 'open' ? "bg-blue-500 animate-pulse" :
                            ticket.status === 'in-progress' ? "bg-amber-500" : "bg-emerald-500"
                          )} />
                          <span className="text-xs text-zinc-400 capitalize">{ticket.status}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button className="text-zinc-500 hover:text-white transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-600/20 rounded-3xl p-8 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-500">
                <Wrench className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-sm">AI Maintenance Predictor</h3>
              </div>
              <p className="text-zinc-400 text-sm max-w-md">
                Based on vibration patterns and heat signatures, Charger CH-002 (Sector 12) is predicted to require service in 4 days.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
              Pre-empt Service
            </button>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Upcoming Tasks</h3>
            <div className="space-y-6">
              {[
                { time: 'Tomorrow, 09:00', task: 'Annual Safety Audit', loc: 'Sector 01-08' },
                { time: 'Wed, Jan 29', task: 'Firmware Update v2.4', loc: 'Entire Network' },
                { time: 'Fri, Jan 31', task: 'Battery Cycle Testing', loc: 'Main Depot' },
              ].map((task, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-all" />
                    <div className="flex-1 w-px bg-zinc-800 my-2" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{task.time}</p>
                    <p className="text-sm font-bold text-zinc-200 mt-1">{task.task}</p>
                    <p className="text-xs text-zinc-500">{task.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Maintenance Score</h3>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-4xl font-bold text-emerald-500 tracking-tighter">94</span>
              <span className="text-zinc-500 text-xs font-bold uppercase mb-1.5">Network Health</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }} />
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed">
              * Score based on MTBF (Mean Time Between Failures) and average ticket resolution speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
