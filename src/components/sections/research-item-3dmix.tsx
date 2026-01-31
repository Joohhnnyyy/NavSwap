import React from 'react';
import Image from 'next/image';

/**
 * ResearchItem3DMix Component
 * Clones the "3D:MIX" research section with pixel-perfect accuracy.
 * Features: Hairline divider (2025/01), staggered image grid, and large parallax title.
 */
export default function ResearchItem3DMix() {
  return (
    <section 
      className="section section-research relative mb-[200px] md:mb-[300px]" 
      data-scroll-section
    >
      <div className="container">
        <div className="body">
          {/* Section Title & Hairline Divider */}
          <div className="section-title mb-[80px]">
            <h2 className="h2 font-sans text-[32px] font-bold uppercase tracking-tighter mb-4 overflow-hidden">
              <span className="block transform transition-transform duration-700 ease-out translate-y-0">
                3D:MIX
              </span>
            </h2>
            
            <div className="hairline-divider">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[1px] bg-border"></div>
              </div>
              <div className="relative flex justify-between w-full">
                <div className="bg-secondary pr-4 font-stats text-[10px]">
                  2025
                </div>
                <div className="bg-secondary pl-4 font-stats text-[10px]">
                  <span className="parentheses">01</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staggered Image Grid with Parallax Placeholder Structure */}
          <div className="research-li grid-wrap relative">
            {/* Top Grid Layer */}
            <div className="relative z-10 grid grid-cols-24 gap-4 mb-[-15vw]">
              {/* Image 1: Left Staggered */}
              <div 
                className="col-start-4 col-span-6 aspect-[4/3] relative overflow-hidden transition-transform duration-700 delay-100"
                style={{ transform: 'translateY(10%)' }}
              >
                <a href="/en/research/3dmix/" className="block w-full h-full group">
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/ViewCapture20250107_124835-720x540_jpg-1.webp"
                      alt="3D:mix"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </a>
              </div>

              {/* Image 2: Right Staggered (Higher contrast position) */}
              <div 
                className="col-start-14 col-span-8 aspect-[4/3] relative overflow-hidden transition-transform duration-700 delay-200"
                style={{ transform: 'translateY(-10%)' }}
              >
                <a href="/en/research/3dmix/" className="block w-full h-full group">
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/0206_2-720x480_jpg-2.webp"
                      alt="3D:mix"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Central Large Title (Parallax Overlay) */}
            <div className="grid-title relative z-20 pointer-events-none my-10 md:my-0">
              <div className="flex justify-center items-center h-[20vw] md:h-[15vw]">
                <h2 className="font-hero text-fluid-hero text-center leading-none tracking-tighter">
                  <a href="/en/research/3dmix/" className="pointer-events-auto block transition-opacity hover:opacity-70">
                    3D:MIX
                  </a>
                </h2>
              </div>
            </div>

            {/* Bottom Grid Layer */}
            <div className="relative z-10 grid grid-cols-24 gap-4 mt-[-10vw]">
              {/* Image 3: Bottom Left Offset */}
              <div 
                className="col-start-6 col-span-6 aspect-[4/3] relative overflow-hidden transition-transform duration-700 delay-300"
                style={{ transform: 'translateY(5%)' }}
              >
                <a href="/en/research/3dmix/" className="block w-full h-full group">
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/IMG_7418-720x480_jpg-3.webp"
                      alt="3D:mix"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing for next section */}
      <div className="h-[100px] md:h-[200px]" aria-hidden="true" />
    </section>
  );
}