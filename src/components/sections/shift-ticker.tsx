import React from 'react';

/**
 * ShiftTicker Component
 * 
 * A high-contrast (black background) section featuring horizontal marquee-style 
 * scrolling text tickers moving in opposite directions.
 * 
 * Design characteristics:
 * - Theme: Dark (black background, white text)
 * - Typography: Inter (Sans-serif)
 * - Motion: Two-way scrolling (forward and reverse)
 */

const TICKER_ITEMS = [
  "Virtual Experience",
  "Perspective",
  "Boundary",
  "Communication",
  "Digital Experience",
];

const ShiftTicker: React.FC = () => {
  return (
    <section 
      className="section section-tagline section-territory section-shift-the bg-black text-white overflow-hidden py-[15vh]" 
      style={{ backgroundColor: '#000000' }}
    >
      <div className="container">
        {/* Section Title */}
        <div className="section-title mb-8 overflow-hidden">
          <h2 className="font-hero-sans text-white text-[clamp(3rem,10vw,140px)] leading-none tracking-tight uppercase">
            <span className="block overflow-hidden">
              <span className="inline-block animate-in slide-in-from-bottom duration-700">SHIFT THE</span>
            </span>
          </h2>
        </div>

        {/* Top Border */}
        <div className="w-full h-[1px] bg-white/20 mb-20"></div>

        {/* Ticker Container */}
        <div className="relative flex flex-col gap-16 py-10">
          
          {/* Forward Scrolling Ticker */}
          <div className="relative overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                <div key={`forward-${i}`} className="flex shrink-0">
                  {TICKER_ITEMS.map((item, index) => (
                    <span 
                      key={index} 
                      className="font-ticker text-[clamp(2rem,5vw,4rem)] px-8 text-white uppercase tracking-wider transition-opacity hover:opacity-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Scrolling Ticker */}
          <div className="relative overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                <div key={`reverse-${i}`} className="flex shrink-0">
                  {TICKER_ITEMS.map((item, index) => (
                    <span 
                      key={index} 
                      className="font-ticker text-[clamp(2rem,5vw,4rem)] px-8 text-white uppercase tracking-wider transition-opacity hover:opacity-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Spacing */}
        <div className="h-[10vh] md:h-[15vh]"></div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ShiftTicker;