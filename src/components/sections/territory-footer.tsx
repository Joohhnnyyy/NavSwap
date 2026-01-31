"use client";

import React from 'react';

/**
 * TerritoryFooter Component
 * Includes "OUR TERRITORY AND FIELDS" and "BASED IN TOKYO WORKING WORLDWIDE"
 * Matches the requested pixel-perfect layout and dark-themed avant-garde aesthetic.
 */
export default function TerritoryFooter() {
  return (
    <div className="w-full bg-[#000000] text-white">
      {/* OUR TERRITORY AND FIELDS Section */}
      <section className="container py-[15vh] px-[4vw]">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <div className="w-full md:w-[50vw]">
            <h2 className="text-[8vw] font-bold leading-[1.1] tracking-[-0.02em] font-sans">
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                <span>OUR</span>
                <span>TERRITORY</span>
              </div>
              <div className="flex flex-wrap gap-x-[0.3em] items-center">
                <span>AND</span>
                <span className="font-serif italic font-normal">FIELDS</span>
              </div>
            </h2>
            
            <div className="w-full h-[1px] bg-[#CCCCCC]/30 my-12" />
          </div>

          <div className="md:w-[35vw] mt-12 md:mt-[4vh]">
            <ul className="space-y-6 text-[18px] leading-[1.8] tracking-[0.05em] font-sans font-normal">
              {[
                "Branding",
                "Design Strategy",
                "Digital Experience",
                "Space Design",
                "Visual Identity",
                "Creative Engineering"
              ].map((item, index) => (
                <li key={index} className="group flex items-center gap-4 cursor-default">
                  <span className="text-[10px] tracking-[0.2em] font-normal opacity-50">
                    ({(index + 1).toString().padStart(2, '0')})
                  </span>
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                      {item}
                    </span>
                    <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full italic font-serif">
                      {item}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BASED IN TOKYO WORKING WORLDWIDE Section */}
      <section className="text-[#FFFFFF] bg-[#000000] py-[20vh] overflow-hidden">
        <div className="container px-[4vw]">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-[-0.05em] uppercase w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-x-6">
                <span>BASED</span>
                <span>IN</span>
                <span className="font-serif italic font-normal">TOKYO</span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 mt-4">
                <span>WORKING</span>
                <span className="relative">
                  WORLDWIDE
                </span>
              </div>
            </h2>
          </div>
        </div>
      </section>

      {/* Global Footer Navigation */}
      <footer className="text-[#FFFFFF] bg-[#000000] pb-12 pt-12 border-t border-[#CCCCCC] px-[4vw]">
        <div className="container flex flex-col md:flex-row justify-between items-end md:items-center">
          <div className="mb-8 md:mb-0">
            <p className="text-[12px] font-medium tracking-[0.1em] uppercase mb-2">Social</p>
            <div className="flex gap-6">
              <a href="#" className="text-[12px] tracking-[0.1em] hover:opacity-50 transition-opacity uppercase">Instagram</a>
              <a href="#" className="text-[12px] tracking-[0.1em] hover:opacity-50 transition-opacity uppercase">LinkedIn</a>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] font-light opacity-60 uppercase">
              © {new Date().getFullYear()} THE SHIFT
            </p>
            <div className="mt-2">
              <a href="/#projects" className="text-[12px] tracking-[0.1em] uppercase hover:underline">Projects</a>
              <span className="mx-2 opacity-30">/</span>
              <a href="/about" className="text-[12px] tracking-[0.1em] uppercase hover:underline">About</a>
              <span className="mx-2 opacity-30">/</span>
              <a href="mailto:info@theshift.tokyo" className="text-[12px] tracking-[0.1em] uppercase hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
