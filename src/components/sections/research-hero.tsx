"use client";

import React from 'react';

/**
 * ResearchHero Component
 * 
 * Clones the "About" page hero section style but for "NAV SWAP".
 * 
 * Primary Guidance: "NAV SWAP" with supporting sub-text 
 * "THE OPERATING SYSTEM FOR BATTERY SWAPPING".
 */
const ResearchHero: React.FC = () => {
  return (
    <div 
      className="page-header subpage-header section min-h-screen flex flex-col items-center justify-center relative px-[5vw] bg-background text-foreground" 
    >
      {/* Language Switcher - Positioned top-right relative to page layout */}
      <div className="absolute top-10 right-[5vw] z-10">
        <div className="ui-lang-a">
          <a href="/research/" className="block">
            <div className="ui-btn-link text-[10px] font-medium tracking-[0.1em] uppercase">
              <div className="overflow-hidden h-[1.2em]">
                <div className="transition-transform duration-500 hover:-translate-y-full">
                  <div className="h-[1.2em]">JA</div>
                  <div className="h-[1.2em]">JA</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="subpage-title-wrap w-full flex flex-col items-center text-center">
        <div className="subpage-title relative mb-8 lg:mb-12">
          <h1 className="page-title leading-[0.9] tracking-[-0.05em] flex flex-col items-center">
            {/* "NAV" - Serif Typography */}
            <div className="font-serif text-[clamp(4rem,12vw,200px)] font-normal flex">
              <div className="flex overflow-hidden">
                <span className="block">N</span>
                <span className="block">A</span>
                <span className="block">V</span>
              </div>
            </div>

            {/* "SWAP" - Sans-Serif Typography (Matching About Hero's second line style) */}
            <div className="font-sans font-bold text-[clamp(3rem,10vw,140px)] leading-[1.0] tracking-[-0.02em] whitespace-nowrap flex overflow-hidden">
              <div className="flex">
                <span className="block">S</span>
                <span className="block">W</span>
                <span className="block">A</span>
                <span className="block">P</span>
              </div>
            </div>
          </h1>

          {/* Supporting Sub-text */}
          <div className="page-title-support font-sans text-[10px] sm:text-[12px] font-medium tracking-[0.05em] uppercase text-center mt-6 flex flex-col gap-1 items-center overflow-hidden">
            <div className="overflow-hidden flex gap-x-2 flex-wrap justify-center">
              <span className="block">THE</span>
              <span className="block">OPERATING</span>
              <span className="block">SYSTEM</span>
            </div>
            <div className="overflow-hidden flex gap-x-2 flex-wrap justify-center">
              <span className="block">FOR</span>
              <span className="block">BATTERY</span>
              <span className="block">SWAPPING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden py-1">
        <div>
          <div className="flex items-center text-[10px] font-medium tracking-[0.1em] text-foreground uppercase">
            <span className="mr-0.5">(</span>
            <span className="relative">SCROLL</span>
            <span className="ml-0.5">)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchHero;
