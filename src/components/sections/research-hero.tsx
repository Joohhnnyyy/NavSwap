import React from 'react';

/**
 * ResearchHero Component
 * 
 * Clones the research page hero section with:
 * - Extremely large "ALWAYS EXPLORING" typography (serif)
 * - Support text "WHAT IS SHIFTING AND WHAT CAN BE SHIFTED" (sans-serif)
 * - (SCROLL) progress indicator
 * 
 * Themes: Light
 */
const ResearchHero: React.FC = () => {
  return (
    <section 
      className="page-header section relative w-full flex flex-col items-center justify-center pt-[15vh] pb-[10vh] overflow-hidden bg-background"
      style={{ minHeight: '100vh' }}
    >
      {/* Centered JA Language Toggle (Matches Structure) */}
      <div className="absolute top-20 right-[4vw] z-10 md:hidden">
        <a href="/research/" className="text-[12px] font-sans font-medium uppercase tracking-[0.15em] border-b border-primary">
          JA
        </a>
      </div>

      <div className="subpage-title-wrap flex flex-col items-center text-center w-full px-[4vw]">
        <div className="subpage-title w-full max-w-[1440px]">
          {/* Main Hero Headline */}
          <h1 className="flex flex-col items-center mb-8">
            <div className="page-title-body leading-none">
              {/* ALWAYS (First Line) */}
              <div 
                className="font-hero text-fluid-hero block overflow-hidden"
                style={{ height: '0.85em' }}
              >
                <div className="flex justify-center flex-wrap">
                  {["A", "L", "W", "A", "Y", "S"].map((char, i) => (
                    <span 
                      key={`always-${i}`} 
                      className="inline-block"
                      style={{ 
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(4rem, 15vw, 20rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: '0.85'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* EXPLORING (Second Line) */}
              <div 
                className="font-hero text-fluid-hero block overflow-hidden mt-2"
                style={{ height: '0.85em' }}
              >
                <div className="flex justify-center flex-wrap">
                  {["E", "X", "P", "L", "O", "R", "I", "N", "G"].map((char, i) => (
                    <span 
                      key={`exploring-${i}`} 
                      className="inline-block"
                      style={{ 
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(4rem, 15vw, 20rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: '0.85'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </h1>

          {/* Support Text */}
          <div 
            className="page-title-support font-ui text-[12px] md:text-[14px] font-medium tracking-[0.2em] leading-[1.8] max-w-[400px] mx-auto opacity-100"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-primary)' }}
          >
            <div className="flex flex-col items-center">
              <span className="block">WHAT IS SHIFTING AND</span>
              <span className="block">WHAT CAN BE SHIFTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-[8vh] left-0 w-full flex justify-center">
        <div className="js-delay-n js-clip overflow-hidden">
          <div className="parts parts-b3 font-stats text-[9px] md:text-[10px] tracking-[0.15em] opacity-80">
            <div className="parentheses flex items-center gap-[2px]">
              <span className="s font-sans">(</span>
              <span className="n slide-scroll-progress font-sans uppercase">SCROLL</span>
              <span className="s font-sans">)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative spacing element matching page structure */}
      <div className="spr h-[200px]" data-n="1"></div>
    </section>
  );
};

export default ResearchHero;