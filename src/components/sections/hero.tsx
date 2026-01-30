"use client";

import React, { useEffect, useState } from "react";

const HeroSection: React.FC = () => {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const tokyoTimeStr = new Intl.DateTimeFormat("en-US", options).format(now);
      const [h, m, s] = tokyoTimeStr.split(":");
      setTime({ h, m, s });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderSplitText = (text: string, serif = true) => {
    return text.split("").map((char, i) => (
      <div
        key={i}
        className={`c o inline-block overflow-hidden h-[1.1em] align-top`}
        style={{
          fontFamily: serif ? "var(--font-serif)" : "var(--font-sans)",
          fontWeight: serif ? 400 : 700,
        }}
      >
        <div className="t transition-transform duration-700 ease-out transform translate-y-0">
          {char === " " ? "\u00A0" : char}
        </div>
      </div>
    ));
  };

  return (
    <section 
      className="section page-header relative min-h-screen w-full bg-[#F0F0F0] pt-[15vh] px-[4vw]"
      data-scroll-section
    >
      {/* Language Switcher */}
      <div className="site-lang fixed top-[80px] right-[240px] z-10 hidden lg:block">
        <a href="/en/" className="group">
          <div className="ui-btn-link px-4 py-1 border border-border rounded-full hover:bg-black hover:text-white transition-colors duration-300">
            <div className="o overflow-hidden h-4">
              <div className="t text-[10px] font-medium tracking-[0.2em]">EN</div>
            </div>
          </div>
        </a>
      </div>

      <div className="page-title-pivot relative z-[2]">
        <div className="in max-w-full">
          {/* Main Headline */}
          <h1 className="page-title page-home-title text-[#000000] mb-12">
            <div className="page-title-body flex flex-col items-start leading-[0.85] tracking-[-0.05em] text-[14vw]">
              {/* Row 1: EXPLORING (Serif) */}
              <div className="l l1 odd overflow-hidden whitespace-nowrap">
                <div className="w">{renderSplitText("EXPLORING", true)}</div>
              </div>
              
              {/* Row 2: THE SHIFT (Sans) */}
              <div className="l l2 even overflow-hidden whitespace-nowrap flex">
                <div className="w">{renderSplitText("THE", false)}</div>
                <div className="s w-[2vw]"></div>
                <div className="w">{renderSplitText("SHIFT", false)}</div>
              </div>

              {/* Row 3: OF TODAY (Serif) */}
              <div className="l l3 odd last overflow-hidden whitespace-nowrap flex">
                <div className="w">{renderSplitText("OF", true)}</div>
                <div className="s w-[2vw]"></div>
                <div className="w">{renderSplitText("TODAY", true)}</div>
              </div>
            </div>
          </h1>

          {/* Intro Text Block */}
          <div className="lead-box relative flex justify-end mt-[-5vw] lg:mt-[-12vw] mb-[5vh] lg:pr-[12vw]">
            <div className="lead-body max-w-[320px] lg:max-w-[380px]">
              <div className="o overflow-hidden">
                <p className="t text-[12px] lg:text-[14px] leading-[1.6] font-normal uppercase tracking-normal text-black indent-[2em]">
                  The Shift creates future-inspired projects for people and businesses desiring a shift.&nbsp;
                  <br />
                  Based in tokyo, working worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Elements of Hero */}
      <div className="relative flex justify-between items-end pb-10 w-full mt-12 lg:mt-24">
        {/* Tokyo Clock */}
        <div className="parts parts-b1">
          <div className="clock flex flex-col items-start text-[10px] tracking-[0.2em] font-normal">
            <div className="clock-th mb-1">東京</div>
            <div className="clock-tb js-date flex tabular-nums">
              <div className="h">{time.h}</div>
              <div className="k animate-pulse ml-0.5 mr-0.5">:</div>
              <div className="m">{time.m}</div>
              <div className="k animate-pulse ml-0.5 mr-0.5">:</div>
              <div className="s">{time.s}</div>
            </div>
          </div>
        </div>

        {/* Project Navigation Preview */}
        <div className="flex items-center gap-12">
            <div className="text-[10px] tracking-[0.2em] font-normal">( 01/06 )</div>
            <div className="hidden lg:block">
                <div className="text-[10px] tracking-[0.2em] mb-2 text-right">PROJECTS</div>
                <div className="group relative">
                    <div className="w-[180px] h-[240px] bg-[#D4D4D8] rounded-full overflow-hidden mask-pill transition-transform duration-700 ease-out hover:scale-105">
                        <div className="bg-gradient-to-b from-[#C7D2FE] to-[#F0F0F0] w-full h-full"></div>
                    </div>
                    <div className="absolute bottom-4 right-[-10px] w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-zinc-800 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <style jsx>{`
        .page-title {
          font-kerning: none;
        }
        .c .t {
          display: inline-block;
          animation: slideUpChar 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform: translateY(110%);
        }
        @keyframes slideUpChar {
          to {
            transform: translateY(0);
          }
        }
        .l1 .c { animation-delay: 0.1s; }
        .l2 .c { animation-delay: 0.4s; }
        .l3 .c { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
};

export default HeroSection;