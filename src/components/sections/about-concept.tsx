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
      className="section section-concept bg-[#F1F1F1] text-[#000000] py-[15vh] px-[5vw]" 
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
          
          <div className="relative w-full h-[1px] bg-[#000000] flex items-center justify-between mt-4">
            <div className="bg-[#F1F1F1] pr-4 h-[1px]"></div>
            <div className="num-marker flex items-center bg-[#F1F1F1] pl-4 font-sans text-[12px] font-medium tracking-tight">
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
            <p className="font-lead text-[#000000] text-[24px] md:text-[32px] lg:text-[40px] leading-[1.4] font-medium">
              The Shift is a creative collective based in Tokyo. We provide new perspectives and solutions to our users.
            </p>
          </div>

          {/* Detailed Description Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] items-start">
            {/* Empty left column for spacing (matching original grid) */}
            <div className="hidden md:block"></div>
            
            {/* Right detailed column */}
            <div className="description-text">
              <p className="font-sans text-[1rem] leading-[1.8] tracking-[0.02em] text-[#000000]">
                We are a creative collective that connects creators and artists with various specialties in Japan and abroad, and we are engaged in projects that transcend the boundaries of technology, design, science, and creativity to &quot;shift&quot; things. We will continue to work on projects and research to &quot;shift&quot; different things around the world.
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
