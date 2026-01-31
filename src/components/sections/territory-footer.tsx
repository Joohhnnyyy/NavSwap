"use client";

import React from 'react';
import Marquee from "react-fast-marquee";
import { ArrowUp } from 'lucide-react';

/**
 * TerritoryFooter Component
 * Includes "OUR TERRITORY AND FIELDS" and "BASED IN TOKYO WORKING WORLDWIDE"
 * Matches the requested pixel-perfect layout and dark-themed avant-garde aesthetic.
 */
export default function TerritoryFooter() {
  const items = [
    "Agentic AI",
    "Signal Flow",
    "Auto Action",
    "Grid Sync",
    "Zero Down",
    "Urban Pulse"
  ];

  const midPoint = Math.ceil(items.length / 2);
  const row1 = items.slice(0, midPoint);
  const row2 = items.slice(midPoint);

  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#080808] text-secondary-foreground">
      {/* OUR TERRITORY AND FIELDS Section */}
      <section className="container py-[15vh] px-[4vw]">
        <div className="flex flex-col w-full items-center">
          <div className="w-full mb-24 text-center">
            <h2 className="text-[12px] font-medium leading-[1.4] tracking-[0.1em] uppercase font-sans">
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                <span>CORE</span>
                <span className="font-serif italic font-normal text-[13px]">DYNAMICS</span>
              </div>
            </h2>
            
            <div className="w-full h-[1px] bg-border my-12" />
          </div>

          <div className="w-full overflow-hidden">
             <div className="flex flex-col gap-1">
               <Marquee gradient={false} speed={50} direction="left" autoFill>
                 {row1.map((item, index) => (
                   <div key={index} className="flex items-center gap-6 mx-12">
                     <span className="text-[6vw] leading-none font-custom tracking-tight whitespace-nowrap uppercase">
                       {item}
                     </span>
                   </div>
                 ))}
               </Marquee>
               
               <Marquee gradient={false} speed={50} direction="right" autoFill>
                 {row2.map((item, index) => (
                   <div key={index} className="flex items-center gap-6 mx-12">
                     <span className="text-[6vw] leading-none font-custom tracking-tight whitespace-nowrap uppercase">
                       {item}
                     </span>
                   </div>
                 ))}
               </Marquee>
             </div>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="w-full bg-background text-foreground px-[4vw] pb-[10vh]">
        {/* Top Border */}
        <div className="w-full h-[1px] bg-border mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[20vh] gap-8 md:gap-0">
          {/* Left: JA Button */}
          <div className="order-2 md:order-1">
            <button className="border border-muted-foreground rounded-full px-4 py-1 text-[12px] hover:bg-foreground hover:text-background transition-colors uppercase tracking-widest">
              JA
            </button>
          </div>

          {/* Center: Text + Red Dot */}
          <div className="flex flex-col items-center text-center relative order-1 md:order-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[14px] leading-tight tracking-wider font-medium">EMBEDDED IN OPS</p>
              <p className="text-[14px] leading-tight tracking-wider font-medium mt-1">SCALING GLOBALLY</p>
            </div>
          </div>

          {/* Right: Back to Top */}
          <div className="flex items-center gap-4 order-3 md:order-3">
            <span className="text-[12px] tracking-widest uppercase hidden md:block">Back to Top</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="w-full h-[1px] bg-border mt-8" />
      </footer>

      {/* Extended Footer - NavSwap "No-Mercy" Style Layout */}
      <div className="w-full bg-background text-foreground border-border">
        {/* Big Title Section */}
        <div className="w-full border-b border-border">
          <h1 className="text-[13vw] leading-[0.8] tracking-tighter font-medium text-center py-4 relative select-none">
            NavSwap
            <span className="text-[2vw] absolute top-[20%] ml-4 font-light">©</span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Left Column: Tagline */}
          <div className="p-[4vw] md:border-r border-border flex flex-col justify-between min-h-[40vh]">
            <div className="text-3xl font-light mb-8">+</div>
            <p className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] tracking-tight font-light max-w-xl">
              Engineering the Pulse of Urban Energy.
            </p>
          </div>

          {/* Right Column: Navigation */}
          <div className="p-[4vw] flex flex-col justify-end items-start md:items-end text-xl md:text-2xl font-light leading-relaxed">
            <a href="#" className="hover:opacity-60 transition-opacity">Home</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Platform</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Solutions</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="w-full px-[4vw] py-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[12px] uppercase tracking-widest text-muted-foreground">
          <div className="flex gap-8 mb-4 md:mb-0">
            <span>Tokyo</span>
            <span>San Francisco</span>
            <span>London</span>
          </div>
          <div className="flex gap-2">
            <span>©NAVSWAP 2026</span>
            <span>|</span>
            <span>Terms of Service</span>
            <span>|</span>
            <span>Coded by Nexora</span>
          </div>
        </div>
      </div>
    </div>
  );
}
