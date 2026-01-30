"use client";

import React from 'react';

/**
 * WHAT WE DO section. 
 * Featuring a minimalist Japanese description and a circular "About us" button with a hover-underline effect.
 * Theme: Light (The section itself is dark-themed #141414 per design instructions).
 */

const WhatWeDo: React.FC = () => {
  return (
    <section 
      className="section section-what-we-do bg-[#141414] text-white overflow-hidden relative"
      style={{
        paddingTop: '15vh',
        paddingBottom: '15vh',
      }}
    >
      <div className="container px-[4vw]">
        <div className="flex flex-col items-center">
          
          {/* Section Title */}
          <div className="w-full mb-[10vh]">
            <div className="section-title text-center lg:text-left">
              <h2 className="text-section-title font-sans font-bold flex flex-wrap justify-center lg:justify-start gap-x-[2vw] mb-4">
                <span className="inline-block relative overflow-hidden group">
                  <span className="inline-block">WHAT</span>
                </span>
                <span className="inline-block relative overflow-hidden group">
                  <span className="inline-block">WE</span>
                </span>
                <span className="inline-block relative overflow-hidden group">
                  <span className="inline-block">DO</span>
                </span>
              </h2>
              
              {/* Border Reveal */}
              <div className="w-full h-[1px] bg-[#333333] mt-8 relative">
                <div className="absolute top-0 left-0 h-full w-full bg-white origin-left transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="w-full max-w-[900px] text-center lg:text-left mx-auto">
            {/* The Shift Description */}
            <div className="section-lead mb-[12vh]">
              <p className="text-[20px] md:text-[24px] lg:text-[28px] leading-[1.8] font-sans tracking-tight text-center">
                The Shiftは東京を拠点としたクリエイティブコレクティブです。<br className="hidden md:block" />
                新しい視点やデザイン、課題解決を提供します。
              </p>
            </div>

            {/* Circular About Us Button */}
            <div className="section-footer flex justify-center">
              <a 
                href="/about/" 
                className="group relative flex items-center justify-center w-[160px] h-[160px] md:w-[180px] md:h-[180px] rounded-full border border-white/30 hover:bg-white hover:text-[#141414] transition-all duration-700 ease-in-out overflow-hidden"
              >
                <div className="z-10 text-center flex flex-col items-center justify-center">
                  <span className="text-[14px] font-sans font-medium uppercase tracking-[0.2em] relative">
                    About us
                    {/* Hover Underline Reveal */}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#141414] transition-all duration-500 group-hover:w-full" />
                  </span>
                </div>
                
                {/* Background sliding effect is handled by transition-all above */}
              </a>
            </div>
          </div>

          {/* Spacer to match layout rhythm */}
          <div className="h-[5vh]" />
        </div>
      </div>

      <style jsx>{`
        /* Minimalist text animations or layout fixes if needed */
        .text-section-title {
          font-size: clamp(48px, 8vw, 150px);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;