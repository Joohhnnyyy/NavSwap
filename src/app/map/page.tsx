'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component with SSR disabled
const SmartMap = dynamic(() => import('@/components/map/SmartMap'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center bg-zinc-950 text-white">Loading Map...</div>
});

export default function MapPage() {
  return (
    <div className="w-full h-screen">
      <SmartMap />
    </div>
  );
}