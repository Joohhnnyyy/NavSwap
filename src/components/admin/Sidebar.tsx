"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Truck,
  Users,
  Package,
  Warehouse,
  Siren,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Live Stations",
    href: "/admin/live-stations",
    icon: MapPin,
  },
  {
    title: "Transport",
    href: "/admin/battery-transport",
    icon: Truck,
  },
  {
    title: "Staff Diversion",
    href: "/admin/staff-diversion",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Partners",
    href: "/admin/partner-storage",
    icon: Warehouse,
  },
  {
    title: "AI Alerts",
    href: "/admin/ai-alerts",
    icon: Siren,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2 font-bold uppercase tracking-widest text-lg">
          <Zap className="h-5 w-5 text-primary" />
          <span>NavSwap</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-border/40">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
