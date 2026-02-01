"use client";

import React from 'react';

/**
 * Footer Component: Clones the section of "THE SHIFT" website containing 
 * "OUR TERRITORY AND FIELDS" and "BASED IN TOKYO WORKING WORLDWIDE" 
 * as well as social links and copyright info.
 */
export default function Footer() {
  return (
    <footer className="w-full text-foreground bg-background px-[5vw] pt-[15vh] pb-[5vh]">
      {/* Territory & Fields Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[40px] mb-[10vh]">
        <div className="flex flex-col">
          <div className="w-full h-[1px] bg-border mb-8 opacity-20" />
          <h2 className="font-sans font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.0] tracking-tight uppercase">
            DIGITAL TWIN<br />
            & AI ENGINE
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-full h-[1px] bg-border mb-8 opacity-20" />
          <h2 className="font-sans font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.0] tracking-tight uppercase justify-center">
            SMART ENERGY<br />
            INFRASTRUCTURE
          </h2>
        </div>
      </div>

      {/* Profile/Address and Awards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[40px] mb-[15vh]">
        <div className="flex flex-col space-y-4">
          <div className="text-[10px] font-medium tracking-[0.1em] uppercase opacity-50">Profile</div>
          <div className="text-[14px] leading-relaxed">
            <p>NavSwap is the operating system for battery swapping.</p>
            <p className="mt-4">
              9-1-7-10F Akasaka, Minato-ku, Tokyo<br />
              107-0052 Japan
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="text-[10px] font-medium tracking-[0.1em] uppercase opacity-50">Platform</div>
          <ul className="text-[14px] leading-relaxed space-y-1">
            <li>DECISION ENGINE</li>
            <li>SMART ROUTING</li>
            <li>DEMAND PREDICTION</li>
            <li>GRID SYNC</li>
            <li>ZERO DOWN</li>
            <li>URBAN PULSE</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="text-[10px] font-medium tracking-[0.1em] uppercase opacity-50">Social</div>
          <div className="flex flex-col space-y-1">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:underline uppercase">Instagram</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:underline uppercase">Twitter</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:underline uppercase">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="w-full pt-10 border-t border-foreground/10 flex flex-col md:row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="text-[10px] font-medium tracking-[0.1em] uppercase">
          © NAV SWAP ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#top" className="text-[10px] font-medium tracking-[0.1em] uppercase hover:opacity-50 transition-opacity flex items-center">
            <span className="mr-2">(</span>
            BACK TO TOP
            <span className="ml-2">)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
