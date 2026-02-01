"use client";

import React from 'react';
import Marquee from "react-fast-marquee";

/**
 * ShiftTicker Section
 * 
 * Replicates the "SHIFT THE..." scrolling text ticker found on the About page.
 * Uses react-fast-marquee for smooth, high-performance scrolling.
 */
const ShiftTicker: React.FC = () => {
  const tickerItems = [
    "NAVIGATE THE FUTURE",
    "SWAP THE BATTERY",
    "OPTIMIZE THE ENERGY",
    "POWER THE GRID",
    "DRIVE THE CHANGE",
    "SMART INFRASTRUCTURE",
    "AI DECISION ENGINE"
  ];

  return (
    <div className="section-ticker py-[5vh] lg:py-[8vh] bg-secondary dark:bg-[#050505] border-y border-foreground/10 dark:border-white/10 overflow-hidden">
      <Marquee speed={100} gradient={false}>
        <div className="flex items-center">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10vw] lg:text-[6vw] font-bold font-sans tracking-tight text-foreground dark:text-white px-8">
                {item}
              </span>
              <div className="w-[1.5vw] h-[1.5vw] bg-red-500 rounded-full mx-4" />
            </div>
          ))}
        </div>
      </Marquee>
      
      {/* Reverse Ticker for dynamic visual interest */}
      <Marquee speed={80} gradient={false} direction="right" className="mt-4 lg:mt-8">
        <div className="flex items-center">
          {tickerItems.slice().reverse().map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10vw] lg:text-[6vw] font-serif italic font-normal tracking-tight text-foreground dark:text-white px-8">
                {item}
              </span>
              <div className="w-[1.5vw] h-[1.5vw] bg-foreground dark:bg-white rounded-full mx-4" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ShiftTicker;
