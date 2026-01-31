import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * ResearchItemLogoBuilder Component
 * 
 * Clones the "LOGO BUILDER" research section with pixel-perfect accuracy.
 * Features: 2023 date, grid layout for images, and the staggered lead box description.
 */

const ResearchItemLogoBuilder = () => {
  return (
    <section className="section section-research mb-[200px] md:mb-[300px]" data-scroll-section>
      <div className="container px-[4vw]">
        <div className="body">
          {/* Section Header with Hairline Divider */}
          <div className="section-title mb-8">
            <h2 className="text-[32px] font-bold uppercase tracking-tight mb-4">
              LOGO BUILDER
            </h2>
            <div className="hairline-divider h-[1px] bg-foreground w-full flex items-center justify-between relative overflow-visible">
              <div className="absolute left-0 bg-secondary px-2 -top-[6px] text-[10px] font-medium tracking-[0.1em] uppercase">
                2023
              </div>
              <div className="absolute right-0 bg-secondary px-2 -top-[6px] text-[10px] font-medium tracking-[0.1em] uppercase">
                (02)
              </div>
            </div>
          </div>

          <div className="spr h-[100px]" />

          {/* Research Item Content */}
          <div className="research-li grid-wrap relative">
            {/* Top Image Grid - Staggered */}
            <div className="grid grid-neo mb-16">
              {/* Image 1: Logo-Builder-3 */}
              <div 
                className="col-start-12 col-span-5 relative" 
                style={{ marginTop: '0px', zIndex: 2 }}
              >
                <div className="parallax-element transition-transform duration-700 ease-out hover:scale-[1.02]">
                  <a href="/en/research/logo-builder/" className="block">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/Logo-Builder-3-720x421_png-4.webp"
                      alt="LOGO BUILDER"
                      width={720}
                      height={421}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                </div>
              </div>

              {/* Image 2: THE_SHIFT-8 (Overlapping/Staggered) */}
              <div 
                className="col-start-16 col-span-7 relative -mt-12" 
                style={{ zIndex: 1 }}
              >
                <div className="parallax-element transition-transform duration-700 ease-out hover:scale-[1.02]">
                  <a href="/en/research/logo-builder/" className="block">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/THE_SHIFT-8-720x287_png-5.webp"
                      alt="LOGO BUILDER"
                      width={720}
                      height={287}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Central Floating Title - Parallax Effect simulated with positioning */}
            <div className="grid-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-full text-center">
              <h2 className="font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.85] uppercase tracking-tighter opacity-90 mix-blend-difference text-background dark:text-foreground">
                <a href="/en/research/logo-builder/" className="pointer-events-auto">
                  LOGO BUILDER
                </a>
              </h2>
            </div>

            {/* Bottom Image Grid and Lead Box */}
            <div className="grid grid-neo mt-16 items-start">
              {/* Image 3: Logo-Builder-5 */}
              <div 
                className="col-start-2 col-span-9 relative"
                style={{ zIndex: 1 }}
              >
                <div className="parallax-element transition-transform duration-700 ease-out hover:scale-[1.02]">
                  <a href="/en/research/logo-builder/" className="block">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/Logo-Builder-5-720x421_png-6.webp"
                      alt="LOGO BUILDER"
                      width={720}
                      height={421}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                </div>
              </div>

              {/* Lead Box Section */}
              <div className="col-start-16 col-span-8 flex flex-col gap-6 pt-12">
                <div className="lead-box bg-[rgba(13,13,13,0.05)] p-8 md:p-12 relative overflow-hidden">
                  <p className="lead-body text-[16px] leading-[1.6] font-sans">
                    Researching new ways of expressing emotions in the upcoming meta world.
                  </p>
                </div>
                
                {/* Arrow Button */}
                <div className="ui-btn-r self-end">
                  <a 
                    href="/en/research/logo-builder/" 
                    className="group flex items-center justify-center w-12 h-12 border border-foreground transition-all hover:bg-foreground hover:text-background"
                  >
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchItemLogoBuilder;