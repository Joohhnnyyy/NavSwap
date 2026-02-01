"use client";

import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
  PieChart, Pie, Cell, Tooltip
} from 'recharts';

// Mock Data for Radar Chart
const RADAR_DATA = [
  { subject: 'Efficiency', A: 120, fullMark: 150 },
  { subject: 'Uptime', A: 98, fullMark: 150 },
  { subject: 'Speed', A: 86, fullMark: 150 },
  { subject: 'Cost', A: 99, fullMark: 150 },
  { subject: 'Safety', A: 85, fullMark: 150 },
  { subject: 'Capacity', A: 65, fullMark: 150 },
];

// Mock Data for Radial Chart
const RADIAL_DATA = [
  { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
  { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
  { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
  { name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658' },
];

// Mock Data for Rose Chart (Pie Chart)
const ROSE_DATA = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const ROSE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function RadarVisualization() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RadialVisualization() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="30%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={RADIAL_DATA}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RoseVisualization() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ROSE_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {ROSE_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={ROSE_COLORS[index % ROSE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
             itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
