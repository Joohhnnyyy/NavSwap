import React from 'react';

/**
 * JoinUs Section
 * 
 * A pixel-perfect clone of "THE SHIFT" join us section.
 * Features:
 * - Minimalist brutalist design
 * - Precise typography based on computed styles
 * - Animated border dividers
 * - Responsive grid layout
 * - Hover effects for the contact link
 */
const JoinUs: React.FC = () => {
  return (
    <section 
      className="section section-join-us relative overflow-hidden" 
      style={{ 
        backgroundColor: '#F1F1F1', 
        paddingTop: '15vh', 
        paddingBottom: '15vh' 
      }}
    >
      <div className="container" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        
        {/* Section Header */}
        <div className="flex flex-col mb-[2rem]">
          <h2 
            className="font-sans font-bold text-[1.5rem] tracking-[0.1em] uppercase mb-4"
            style={{ color: '#000000' }}
          >
            JOIN US
          </h2>
          
          {/* Animated/Static Border Divider */}
          <div className="relative w-full h-[1px] bg-black flex justify-end items-center">
            <div 
              className="absolute right-0 bg-[#F1F1F1] pl-4 font-sans text-[10px] font-medium tracking-[0.1em] uppercase translate-y-[-1px]"
              style={{ color: '#000000' }}
            >
              <span className="opacity-100 flex items-center">
                (<span className="px-[2px]">03</span>)
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-[4rem]">
          {/* Left spacer/column */}
          <div className="hidden lg:block lg:col-span-1"></div>
          
          {/* Main call to action text */}
          <div className="lg:col-span-7">
            <p 
              className="font-sans text-[1rem] leading-[1.8] tracking-[0.02em]"
              style={{ color: '#000000' }}
            >
              The Shift would like to create new projects with people all over the world. 
              You can work remotely from anywhere in the world. 
              We are happy to discuss about your hours and salaries based on your skills and experiences. 
              If you are interested in our works, please send a portfolio and CV from below.
            </p>
          </div>

          {/* Right link/contact column */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <a 
              href="mailto:info@the-shift.jp"
              className="group relative inline-flex items-center font-sans font-bold text-[14px] tracking-[0.1em] uppercase border-b border-black pb-2 overflow-hidden"
              style={{ color: '#000000' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                info@the-shift.jp
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;