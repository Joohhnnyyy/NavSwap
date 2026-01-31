"use client";

import React from 'react';

/**
 * AboutHero Section
 * 
 * Featured on the "About" page, this component replicates the large, 
 * split-character typography hero section.
 * 
 * Primary Guidance: "ABOUT THE SHIFT" with supporting sub-text 
 * "CREATED FOR THE THINGS AND PEOPLE DESIRING A SHIFT".
 */
const AboutHero: React.FC = () => {
  return (
    <div 
      className="page-header subpage-header section min-h-screen flex flex-col items-center justify-center relative px-[5vw] bg-background text-foreground" 
    >
      {/* Language Switcher - Positioned top-right relative to page layout */}
      <div className="absolute top-10 right-[5vw] z-10">
        <div className="ui-lang-a">
          <a href="/about/" className="block">
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
            {/* "ABOUT" - Serif Typography */}
            <div className="font-serif text-[clamp(4rem,12vw,200px)] font-normal flex">
              <div className="flex overflow-hidden">
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[0ms]">A</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms]">B</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[100ms]">O</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[150ms]">U</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[200ms]">T</span>
              </div>
            </div>

            {/* "THE SHIFT" - Sans-Serif Typography */}
            <div className="font-sans font-bold text-[clamp(3rem,10vw,140px)] leading-[1.0] tracking-[-0.02em] whitespace-nowrap flex overflow-hidden">
              <div className="flex mr-[0.2em]">
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[250ms]">T</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[300ms]">H</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[350ms]">E</span>
              </div>
              <div className="flex">
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms]">S</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[450ms]">H</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms]">I</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[550ms]">F</span>
                <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms]">T</span>
              </div>
            </div>
          </h1>

          {/* Supporting Sub-text */}
          <div className="page-title-support font-sans text-[10px] sm:text-[12px] font-medium tracking-[0.05em] uppercase text-center mt-6 flex flex-col gap-1 items-center overflow-hidden">
            <div className="overflow-hidden flex gap-x-2 flex-wrap justify-center">
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[700ms]">CREATED</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[750ms]">FOR</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[800ms]">THE</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[850ms]">THINGS</span>
            </div>
            <div className="overflow-hidden flex gap-x-2 flex-wrap justify-center">
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[900ms]">AND</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[950ms]">PEOPLE</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1000ms]">DESIRING</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1050ms]">A</span>
              <span className="block animate-in slide-in-from-bottom duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1100ms]">SHIFT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden py-1">
        <div className="animate-in slide-in-from-bottom duration-1000 delay-[1200ms] ease-out">
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

export default AboutHero;
