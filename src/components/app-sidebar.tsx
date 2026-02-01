"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Zap,
  BatteryCharging,
  BarChart3,
  Siren,
  Wrench,
  Lightbulb,
  LayoutDashboard
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const data = {
  user: {
    name: "Admin",
    email: "admin@navswap.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "NavSwap Inc",
      logo: Zap,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Alerts",
      url: "/admin/alerts",
      icon: Siren,
    },
    {
      title: "Stations",
      url: "/admin/stations",
      icon: Map,
    },
    {
      title: "Chargers",
      url: "/admin/chargers",
      icon: BatteryCharging,
    },
    {
      title: "Maintenance",
      url: "/admin/maintenance",
      icon: Wrench,
    },
    {
      title: "Recommendations",
      url: "/admin/recommendations",
      icon: Lightbulb,
    },
    {
      title: "AI Settings",
      url: "/admin/ai-settings",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">NavSwap</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground text-center">
          v2.4.0-rc
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
