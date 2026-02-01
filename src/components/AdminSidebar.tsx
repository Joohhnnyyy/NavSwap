"use client";

import React from 'react';
import {
  LayoutDashboard,
  Map,
  Zap,
  Settings,
  LogOut,
  ShieldCheck,
  Bell,
  Wrench,
  BarChart3,
  BrainCircuit,
  Lightbulb,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  currentView: 'station' | 'control';
  onViewChange: (view: 'station' | 'control') => void;
}

export const AdminSidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Map, label: 'Map', href: '/admin/map' },
    { icon: MapPin, label: 'Stations', href: '/admin/stations' },
    { icon: Zap, label: 'Chargers', href: '/admin/chargers' },
    { icon: Bell, label: 'Alerts', href: '/admin/alerts' },
    { icon: Wrench, label: 'Maintenance', href: '/admin/maintenance' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Lightbulb, label: 'Recommendations', href: '/admin/recommendations' },
    { icon: BrainCircuit, label: 'AI Settings', href: '/admin/ai-settings' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="relative w-8 h-8 shrink-0">
            <Image 
              src="/white_logo.png" 
              alt="NavSwap Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground">NAVSWAP</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-primary/10 text-sidebar-primary"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-accent-foreground"
              )} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-5 bg-sidebar-primary rounded-full"
                />
              )}
            </Link>
          );
        })}

        <div className="pt-8 pb-4">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/40 mb-4">Role Selection</p>
          <div className="bg-sidebar-accent/30 p-1.5 rounded-2xl flex flex-col gap-1">
            <button
              onClick={() => onViewChange('control')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                currentView === 'control' ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              Control Center Admin
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/admin/ai-settings"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500/80 hover:bg-red-500/5 hover:text-red-500 transition-all mt-1">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
