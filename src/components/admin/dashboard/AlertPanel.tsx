"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Battery, Thermometer, WifiOff } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Mock Data for Alerts
const alerts = [
  {
    id: 1,
    title: "Station B-12 Overheating",
    type: "Critical",
    icon: Thermometer,
    time: "2m ago",
    description: "Internal temperature exceeding 45°C",
  },
  {
    id: 2,
    title: "Low Inventory at Central Hub",
    type: "Warning",
    icon: Battery,
    time: "15m ago",
    description: "Only 12 charged batteries remaining",
  },
  {
    id: 3,
    title: "Connectivity Lost: Transport Unit 4",
    type: "Error",
    icon: WifiOff,
    time: "42m ago",
    description: "GPS signal lost in Sector 7",
  },
  {
    id: 4,
    title: "Unauthorized Access Attempt",
    type: "Critical",
    icon: AlertTriangle,
    time: "1h ago",
    description: "Multiple failed login attempts detected",
  },
];

// Mock Data for Alert Categories (Nightingale Chart approximation using Radar)
const alertCategories = [
  { subject: "Hardware", A: 120, fullMark: 150 },
  { subject: "Software", A: 98, fullMark: 150 },
  { subject: "Network", A: 86, fullMark: 150 },
  { subject: "Security", A: 99, fullMark: 150 },
  { subject: "Power", A: 85, fullMark: 150 },
  { subject: "Environment", A: 65, fullMark: 150 },
];

export function AlertPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* High Priority Alerts List */}
      <Card className="col-span-1 lg:col-span-2 xl:col-span-3 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            High Priority Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    alert.type === "Critical"
                      ? "bg-red-500/10 text-red-500"
                      : alert.type === "Warning"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-orange-500/10 text-orange-500"
                  }`}
                >
                  <alert.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm leading-none">{alert.title}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    alert.type === "Critical"
                      ? "border-red-500/50 text-red-500"
                      : alert.type === "Warning"
                      ? "border-yellow-500/50 text-yellow-500"
                      : "border-orange-500/50 text-orange-500"
                  }`}
                >
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Categories - Radar Chart */}
      <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            Alert Categorization
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={alertCategories}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "currentColor", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Alerts"
                dataKey="A"
                stroke="#ef4444"
                strokeWidth={2}
                fill="#ef4444"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
