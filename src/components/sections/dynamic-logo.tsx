"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const DynamicLogoSection = () => {
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({
        h: h.toString().padStart(2, "0"),
        m: m.toString().padStart(2, "0"),
        s: s.toString().padStart(2, "0")
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Numbers for the fragmented logo grid display (randomized visual state)
  const logoGridNumbers = [5, 8, 1, 3, 6, 4, 1, 3, 0, 0, 4, 0];

  return (
    <div className="section section-logo w-full px-[5vw] py-[15vh] lg:py-[20vh] bg-background">
      <div className="body thin max-w-[1200px] mx-auto">
        {/* Fragmented Logo Container */}
        <div className="relative w-full aspect-[1200/537] mb-12 lg:mb-20 overflow-hidden bg-secondary">
          <div className="absolute inset-0 z-0">
             <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/logo-1200x537_png-5.webp"
                alt="THE SHIFT LOGO"
                fill
                className="object-contain opacity-30 grayscale"
                priority
             />
          </div>
          
          {/* Fragment Overlay Grid */}
          <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 grid-rows-2 gap-0 z-10">
            {logoGridNumbers.map((num, idx) => (
              <div key={idx} className="relative border-[0.5px] border-foreground/10 flex items-center justify-center overflow-hidden group">
                 {/* Visual glitch/fragment effect simulation */}
                 <div className="text-[10px] font-sans opacity-20 absolute top-2 right-2 text-foreground">( {num} )</div>
                 <div 
                    className="w-full h-full bg-no-repeat grayscale"
                    style={{
                        backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/logo-1200x537_png-5.webp')`,
                        backgroundSize: '1200px 537px',
                        backgroundPosition: `${(idx % 6) * -200}px ${Math.floor(idx / 6) * -268}px`,
                        filter: `contrast(${100 + num * 5}%) brightness(${90 + num}%)`
                    }}
                 />
              </div>
            ))}
          </div>

          {/* Time indicator overlay */}
          <div className="absolute bottom-4 right-4 z-20 flex space-x-1">
            {logoGridNumbers.slice(0, 12).map((n, i) => (
                <div key={i} className="text-[10px] font-mono leading-none border-x border-foreground/20 px-1 overflow-hidden h-[12px] text-foreground">
                    <div className="flex flex-col transition-transform duration-500" style={{ transform: `translateY(-${n * 12}px)` }}>
                        {[0,1,2,3,4,5,6,7,8,9].map(num => <div key={num} className="h-[12px]">{num}</div>)}
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10">
          {/* Empty spacer for alignment */}
          <div className="hidden md:block md:col-span-4" />

          {/* Countdown Clock */}
          <div className="md:col-span-3">
            <div className="clock-wrap reveal-container">
              <div className="reveal-item active">
                <div className="clock flex flex-col items-start">
                  <div className="clock-th font-sans text-[10px] uppercase tracking-[0.1em] font-medium mb-1">
                    NEXT SHIFT
                  </div>
                  <div className="clock-tb font-sans text-[24px] font-bold tabular-nums tracking-wider flex items-center">
                    <span className="h">{timeLeft.h}</span>
                    <span className="k mx-1">:</span>
                    <span className="m">{timeLeft.m}</span>
                    <span className="k mx-1">:</span>
                    <span className="s">{timeLeft.s}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descriptive Text */}
          <div className="md:col-span-5">
            <div className="lead-box reveal-container">
              <div className="reveal-item active">
                <p className="font-sans text-[14px] leading-[1.8] text-foreground/80 indent-12 max-w-[400px]">
                  The logo is restructured every midnight based on the year, month and date information input. 
                  It encapsulates The Shift's concept that focuses on the things and people that are ever-shifting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .reveal-container {
          overflow: hidden;
        }
        .reveal-item {
          transform: translateY(0);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default DynamicLogoSection;