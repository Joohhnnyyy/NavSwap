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
    "SHIFT THE WORLD",
    "SHIFT THE DESIGN",
    "SHIFT THE TECHNOLOGY",
    "SHIFT THE PERSPECTIVE",
    "SHIFT THE CREATIVE",
    "SHIFT THE CULTURE",
    "SHIFT THE FUTURE"
  ];

  return (
    <div className="section-ticker py-[5vh] lg:py-[8vh] bg-[#F1F1F1] border-y border-black/10 overflow-hidden">
      <Marquee speed={100} gradient={false}>
        <div className="flex items-center">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10vw] lg:text-[6vw] font-bold font-sans tracking-tight text-black px-8">
                {item}
              </span>
              <div className="w-[1.5vw] h-[1.5vw] bg-[#FF3B30] rounded-full mx-4" />
            </div>
          ))}
        </div>
      </Marquee>
      
      {/* Reverse Ticker for dynamic visual interest */}
      <Marquee speed={80} gradient={false} direction="right" className="mt-4 lg:mt-8">
        <div className="flex items-center">
          {tickerItems.slice().reverse().map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10vw] lg:text-[6vw] font-serif italic font-normal tracking-tight text-black px-8">
                {item}
              </span>
              <div className="w-[1.5vw] h-[1.5vw] bg-black rounded-full mx-4" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ShiftTicker;
