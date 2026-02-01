"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// Mock Data
const capacityData = [
  { name: "Mon", charged: 4000, depleted: 2400 },
  { name: "Tue", charged: 3000, depleted: 1398 },
  { name: "Wed", charged: 2000, depleted: 9800 },
  { name: "Thu", charged: 2780, depleted: 3908 },
  { name: "Fri", charged: 1890, depleted: 4800 },
  { name: "Sat", charged: 2390, depleted: 3800 },
  { name: "Sun", charged: 3490, depleted: 4300 },
];

const swapsData = [
  { name: "00:00", swaps: 120 },
  { name: "04:00", swaps: 80 },
  { name: "08:00", swaps: 450 },
  { name: "12:00", swaps: 580 },
  { name: "16:00", swaps: 600 },
  { name: "20:00", swaps: 350 },
];

const hrData = [
  { name: "Active", value: 45 },
  { name: "On Break", value: 15 },
  { name: "Off Duty", value: 40 },
];

const maintenanceData = [
  {
    name: "Available",
    uv: 80,
    fill: "#22c55e",
  },
];

const transportData = [
  {
    name: "Available",
    uv: 65,
    fill: "#3b82f6",
  },
];

const energyLoadData = [
  { time: "00:00", load: 30 },
  { time: "04:00", load: 45 },
  { time: "08:00", load: 75 },
  { time: "12:00", load: 90 },
  { time: "16:00", load: 85 },
  { time: "20:00", load: 60 },
  { time: "23:59", load: 40 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export function ResourceStatusPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {/* Daily Battery Capacity - Stacked Bar */}
      <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            Daily Battery Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={capacityData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCharged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDepleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#71717a'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#71717a'}} />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
              />
              <Legend iconType="circle" />
              <Area type="monotone" dataKey="charged" stackId="1" stroke="#22c55e" fill="url(#colorCharged)" name="Charged" />
              <Area type="monotone" dataKey="depleted" stackId="1" stroke="#ef4444" fill="url(#colorDepleted)" name="Depleted" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Battery Swaps - Area Chart */}
      <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            Daily Battery Swaps
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={swapsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSwaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#71717a'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#71717a'}} />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="swaps" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSwaps)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* HR Availability - Mixed Charts */}
      <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            HR & Staff Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col justify-between">
          
          {/* Donut Chart - HR Status */}
          <div className="h-[140px] w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hrData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {hrData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}
                     itemStyle={{ color: "#fff" }}
                  />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: "12px" }}/>
                </PieChart>
             </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
             {/* Maintenance Radial */}
             <div className="flex flex-col items-center">
                <span className="text-[10px] text-muted-foreground uppercase mb-1">Maintenance</span>
                <div className="h-[80px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      innerRadius="70%" 
                      outerRadius="100%" 
                      barSize={10} 
                      data={maintenanceData} 
                      startAngle={180} 
                      endAngle={0}
                    >
                      <RadialBar
                        background
                        dataKey="uv"
                      />
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-bold text-lg">
                        80%
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Transport Radial */}
             <div className="flex flex-col items-center">
                <span className="text-[10px] text-muted-foreground uppercase mb-1">Transport</span>
                <div className="h-[80px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      innerRadius="70%" 
                      outerRadius="100%" 
                      barSize={10} 
                      data={transportData} 
                      startAngle={180} 
                      endAngle={0}
                    >
                      <RadialBar
                        background
                        dataKey="uv"
                      />
                       <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-bold text-lg">
                        65%
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

        </CardContent>
      </Card>

      {/* Energy Grid Load - Area Chart (New 4th Card) */}
      <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            Energy Grid Load
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={energyLoadData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}
                itemStyle={{ color: "#fff" }}
              />
              <Area type="monotone" dataKey="load" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLoad)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
