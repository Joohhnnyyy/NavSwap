"use client";

import React from 'react';

/**
 * AboutConcept Component
 * 
 * Clones the concept section of THE SHIFT "About" page.
 * Features:
 * - Large "CONCEPT" heading with reveal animation style
 * - Horizontal border with (01) marker
 * - Two-column layout for lead text and detailed description
 * - Adheres strictly to the light theme and specified design system
 */
const AboutConcept: React.FC = () => {
  return (
    <section 
      className="section section-concept bg-secondary text-secondary-foreground py-[15vh] px-[5vw]" 
      data-scroll-section
    >
      <div className="container mx-auto p-0 max-w-none">
        {/* Section Header: CONCEPT + Horizontal Border + (01) */}
        <div className="section-header mb-[10vh]">
          <div className="reveal-container overflow-hidden mb-4">
            <h2 className="font-sans font-bold text-[1.5rem] tracking-[0.1em] uppercase leading-[1.2]">
              CONCEPT
            </h2>
          </div>
          
          <div className="relative w-full h-[1px] bg-foreground flex items-center justify-between mt-4">
            <div className="bg-secondary pr-4 h-[1px]"></div>
            <div className="num-marker flex items-center bg-secondary pl-4 font-sans text-[12px] font-medium tracking-tight">
              <span className="opacity-100 flex items-center">
                <span className="mr-[2px]">(</span>
                <span>01</span>
                <span className="ml-[2px]">)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Body: Two columns / Lead text */}
        <div className="content-body flex flex-col max-w-[90vw]">
          {/* Main Lead Paragraph */}
          <div className="mb-[8vh] lg:max-w-[70vw]">
            <p className="font-lead text-secondary-foreground text-[24px] md:text-[32px] lg:text-[40px] leading-[1.4] font-medium">
              NavSwap is the operating system for battery swapping infrastructure. We provide the digital backbone for sustainable urban mobility.
            </p>
          </div>

          {/* Detailed Description Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] items-start">
            {/* Empty left column for spacing (matching original grid) */}
            <div className="hidden md:block"></div>
            
            {/* Right detailed column */}
            <div className="description-text">
              <p className="font-sans text-[1rem] leading-[1.8] tracking-[0.02em] text-secondary-foreground">
                We are an AI-powered platform that connects energy grids, battery stations, and vehicles with intelligent decision engines. We transcend the boundaries of physical infrastructure and digital intelligence to optimize the flow of energy. We will continue to build the future of smart transportation and sustainable cities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer to match original layout vertical rhythm */}
      <div className="h-[5vh]"></div>
    </section>
  );
};

export default AboutConcept;
