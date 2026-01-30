import React from 'react';

/**
 * Footer Section
 * Features the large "OUR TERRITORY AND FIELDS" and "BASED IN TOKYO WORKING WORLDWIDE" text.
 * Maintains minimalist typography and neo-editorial layout.
 */
const Footer = () => {
  return (
    <footer className="w-full bg-[#F2F2F2] pt-32 pb-16 px-[4vw]">
      {/* Upper Footer: Terrace/Territory Section */}
      <div className="flex flex-col items-center justify-center text-center mb-48">
        <h2 
          className="font-serif uppercase leading-[0.85] tracking-[-0.02em] text-[#0D0D0D]" 
          style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
        >
          OUR TERRITORY<br />
          AND FIELDS
        </h2>
      </div>

      {/* Middle Footer: Location Prompts */}
      <div className="flex flex-col items-center justify-center text-center mb-64">
        <h2 
          className="font-sans font-bold uppercase tracking-[-0.02em] text-[#0D0D0D] leading-[0.9]"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
        >
          BASED IN TOKYO<br />
          WORKING WORLDWIDE
        </h2>
      </div>

      {/* Divider */}
      <div className="hairline-divider mb-8">
        <span className="font-stats left-[4vw] bg-[#F2F2F2] px-2 text-[10px] tracking-[0.1em]">2025</span>
        <span className="font-stats right-[4vw] bg-[#F2F2F2] px-2 text-[10px] tracking-[0.1em] parentheses">
          04
        </span>
      </div>

      {/* Bottom Footer Credits */}
      <div className="flex justify-between items-end w-full mt-12">
        <div className="flex flex-col gap-2">
          <div className="font-ui text-[12px] tracking-[0.15em] text-[#0D0D0D]">
            THE SHIFT
          </div>
          <div className="font-stats text-[10px] tracking-[0.1em] opacity-50">
            © 2025 THE SHIFT ALL RIGHTS RESERVED.
          </div>
        </div>

        <nav className="flex gap-12">
          <a href="/en/project/" className="font-ui text-[12px] tracking-[0.15em] hover:opacity-50 transition-opacity">
            PROJECT
          </a>
          <a href="/en/research/" className="font-ui text-[12px] tracking-[0.15em] hover:opacity-50 transition-opacity">
            RESEARCH
          </a>
          <a href="/en/about/" className="font-ui text-[12px] tracking-[0.15em] hover:opacity-50 transition-opacity">
            ABOUT
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;