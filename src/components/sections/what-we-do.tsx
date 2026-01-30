import React from 'react';

/**
 * WhatWeDo Section
 * 
 * Features:
 * - Dark background (#111111)
 * - Centered Japanese description with specific line-height and letter-spacing
 * - "WHAT WE DO" heading with character-split reveal style (approximated via layout)
 * - Circular "About us" button with hover fill animation
 */

export default function WhatWeDo() {
  return (
    <section 
      className="section section-what-we-do bg-[#111111] text-white py-[15vh] md:py-[20vh] overflow-hidden"
      data-bg="dark"
    >
      <div className="container mx-auto px-[5vw]">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-[8vh] md:mb-[10vh]">
            <h2 className="flex flex-wrap justify-center font-sans font-bold text-[10vw] md:text-[6vw] tracking-tighter leading-[0.9] uppercase overflow-hidden">
              <span className="block whitespace-nowrap">WHAT WE DO</span>
            </h2>
            <div className="mt-8 mx-auto w-full max-w-[1200px] h-[1px] bg-white/20 relative">
               <div className="absolute inset-0 bg-white origin-left scale-x-100 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        {/* Section Body */}
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="mb-[8vh] md:mb-[10vh]">
            <p className="text-jp-body text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] leading-[1.8] tracking-[0.05em] font-normal">
              The Shiftは東京を拠点としたクリエイティブコレクティブです。<br className="hidden md:block" />
              新しい視点やデザイン、課題解決を提供します。
            </p>
          </div>

          {/* Interactive Circle Button */}
          <div className="flex justify-center items-center">
            <a 
              href="/about/" 
              className="group relative flex items-center justify-center w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border border-white transition-all duration-500 hover:border-transparent overflow-hidden"
            >
              {/* Hover Fill Layer */}
              <div className="absolute inset-0 bg-white scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100"></div>
              
              {/* Text Layer */}
              <div className="relative z-10 font-sans text-[14px] md:text-[16px] font-medium uppercase tracking-widest text-white group-hover:text-[#111111] transition-colors duration-500">
                <div className="flex flex-col items-center">
                  <span className="block">About us</span>
                  {/* Underline helper often found in the design */}
                  <div className="w-full h-[1px] bg-current mt-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .text-jp-body {
          font-family: "YuGothic", "Yu Gothic", "Noto Sans JP", sans-serif;
        }
        
        @media (max-width: 768px) {
          .text-jp-body {
            font-size: 1.1rem;
            line-height: 1.7;
          }
        }
      `}</style>
    </section>
  );
}