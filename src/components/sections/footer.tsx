apprenticeship
think
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer 
      className="page-footer bg-[#111111] text-white overflow-hidden py-[100px] md:py-[150px]"
      data-scroll-section
    >
      <div className="container mx-auto px-[5vw]">
        {/* Section Title */}
        <div className="mb-[60px] md:mb-[100px]">
          <h2 className="text-[10vw] md:text-[6.5vw] font-bold leading-[0.9] uppercase tracking-[-0.05em] flex flex-col">
            <span className="block overflow-hidden h-fit">
              <span className="inline-block animate-in slide-in-from-bottom duration-700">OUR TERRITORY</span>
            </span>
            <span className="block overflow-hidden h-fit">
              <span className="inline-block animate-in slide-in-from-bottom duration-700 delay-100">AND FIELDS</span>
            </span>
          </h2>
          <div className="mt-[40px] md:mt-[60px] h-[1px] w-full bg-white/20"></div>
        </div>

        {/* Territory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[60px] md:gap-y-0">
          <div>
            <h3 className="text-[6vw] md:text-[3.5vw] font-bold uppercase leading-[1] mb-[30px] md:mb-[50px] tracking-[-0.03em]">
              BASED IN TOKYO<br />
              WORKING WORLDWIDE
            </h3>
            
            <div className="space-y-[40px] max-w-[400px]">
              <div>
                <p className="font-body-jp text-[14px] md:text-[16px] leading-[1.8] tracking-[0.05em] mb-[15px]">
                  The Shiftは、戦略、クリエイティブ、テクノロジー、カルチャーの交差点で活動しています。
                  私たちはビジネスの変革や新しい体験の創出を目指すパートナーと共に、未来へ向かう「シフト」を設計します。
                </p>
                <div className="text-[12px] md:text-[14px] opacity-60 flex flex-col space-y-1">
                  <span>Aoyama-Bldg. 4F, 1-2-3 Kita-Aoyama, </span>
                  <span>Minato-ku, Tokyo 107-0061 Japan</span>
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex flex-col space-y-[10px]">
                <a 
                  href="mailto:info@theshift.tokyo" 
                  className="group relative w-fit text-[14px] md:text-[16px] uppercase font-medium"
                >
                  info@theshift.tokyo
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </a>
                <a 
                  href="https://www.google.com/maps" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-fit text-[14px] md:text-[16px] uppercase font-medium"
                >
                  Google Maps
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between h-full pt-[20px] md:pt-0">
            {/* Social Links */}
            <div className="flex flex-col md:items-end space-y-[15px]">
              {['Instagram', 'Linkedin', 'Facebook'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="group relative w-fit text-[14px] md:text-[16px] uppercase font-medium"
                >
                  {link}
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-[60px] md:mt-0 w-[120px] h-[120px] md:w-[160px] md:h-[160px] border border-white/30 rounded-full flex items-center justify-center group hover:bg-white hover:text-black transition-colors duration-500"
            >
              <div className="relative overflow-hidden h-fit w-fit">
                <span className="block text-[12px] md:text-[14px] uppercase font-bold tracking-widest translate-y-0 group-hover:-translate-y-[150%] transition-transform duration-500">
                  TOP
                </span>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 block text-[12px] md:text-[14px] uppercase font-bold tracking-widest translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500">
                  TOP
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Secondary Divider */}
        <div className="mt-[100px] mb-[40px] h-[1px] w-full bg-white/10"></div>

        {/* Footer Meta */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-[11px] uppercase tracking-widest opacity-40">
          <div className="flex space-x-[40px] mb-4 md:mb-0">
            <span>&copy; THE SHIFT 2024</span>
            <a href="#" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline">Privacy Policy</a>
          </div>
          <div className="flex space-x-[40px]">
            <span>Tokyo, Japan</span>
            <span>Design by The Shift</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;