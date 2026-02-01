"use client"

import React, { useState } from 'react'
import { AdminSidebar } from "@/components/AdminSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<'station' | 'control'>('control');
  const pathname = usePathname();

  // Helper to determine breadcrumb title based on path
  const getBreadcrumbTitle = (path: string) => {
    if (path === '/admin') return 'Dashboard';
    const segment = path.split('/').pop();
    if (!segment) return 'Dashboard';
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  const roleTitle = currentView === 'station' ? 'Station Ops' : 'Control Center Admin';

  return (
    <div className="flex h-screen bg-background w-full overflow-hidden">
      <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <AdminHeader role={roleTitle} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-[1800px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
