"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity, Battery, Users, AlertTriangle } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

// Mock Data for Sparklines
const data1 = [
  { val: 40 }, { val: 30 }, { val: 45 }, { val: 50 }, { val: 65 }, { val: 60 }, { val: 70 }
];
const data2 = [
  { val: 20 }, { val: 40 }, { val: 30 }, { val: 50 }, { val: 40 }, { val: 60 }, { val: 80 }
];
const data3 = [
  { val: 80 }, { val: 70 }, { val: 60 }, { val: 50 }, { val: 40 }, { val: 30 }, { val: 20 }
];

interface KPICardProps {
  title: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  chartData?: any[];
  color?: string;
}

function KPICard({ title, value, subValue, trend, trendValue, icon, chartData, color = "#22c55e" }: KPICardProps) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold font-mono tracking-tighter">{value}</div>
            {(subValue || trendValue) && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {trend === "up" && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                {trend === "down" && <ArrowDownRight className="h-3 w-3 text-red-500" />}
                <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}>
                  {trendValue}
                </span>
                {subValue && <span className="opacity-70">{subValue}</span>}
              </p>
            )}
          </div>
          {chartData && (
            <div className="h-[40px] w-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false} // Performance
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KPIStrip() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
      <KPICard
        title="Active Stations"
        value="124"
        subValue="Operational"
        trend="up"
        trendValue="+2"
        icon={<Activity className="h-4 w-4" />}
        chartData={data1}
        color="#22c55e"
      />
      <KPICard
        title="Daily Traffic"
        value="8,432"
        subValue="Users Onboarded"
        trend="up"
        trendValue="+12%"
        icon={<Users className="h-4 w-4" />}
        chartData={data2}
        color="#3b82f6"
      />
      <KPICard
        title="Avg Wait Time"
        value="1m 42s"
        subValue="City Wide"
        trend="down"
        trendValue="-8s"
        chartData={data3}
        color="#f59e0b"
      />
      <KPICard
        title="Batteries (City)"
        value="4,250"
        subValue="98% Charged"
        icon={<Battery className="h-4 w-4" />}
        chartData={data1}
        color="#8b5cf6"
      />
      <KPICard
        title="Staff Available"
        value="312"
        subValue="HR Pool"
        chartData={data2}
        color="#ec4899"
      />
      <KPICard
        title="Risk Probability"
        value="Low"
        subValue="2 Stations at Risk"
        trend="down"
        trendValue="Stable"
        icon={<AlertTriangle className="h-4 w-4 text-orange-500" />}
        color="#f97316"
      />
      <KPICard
        title="AI Optimizations"
        value="1,204"
        subValue="Actions Today"
        trend="up"
        trendValue="+150"
        chartData={data2}
        color="#06b6d4"
      />
      <KPICard
        title="In Transit"
        value="450"
        subValue="Batteries Moving"
        chartData={data1}
        color="#eab308"
      />
    </div>
  );
}
