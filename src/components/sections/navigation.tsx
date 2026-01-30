import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Research");

  // Handle scroll lock when menu is theoretically open on mobile if needed
  // But based on designs, this is a desktop-first editorial layout

  const navLinks = [
    { name: "Home", href: "/en/" },
    { name: "Project", href: "/en/project/" },
    { name: "Research", href: "/en/research/" },
    { name: "About", href: "/en/about/" },
  ];

  return (
    <header className="site-header fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Logo Section */}
      <div className="absolute top-0 left-0 pointer-events-auto">
        <a
          href="/en/"
          className="site-name block pt-[80px] px-[80px] pb-[40px] -mt-[11.69px]"
          style={{
            zIndex: 9,
            color: "rgb(20, 20, 20)",
            fontFamily: 'everett, "Noto Sans JP", sans-serif',
          }}
        >
          <div className="fadein">
            <h1 className="text-[17.99px] font-medium tracking-[0.05em] leading-none m-0 p-0">
              THE SHIFT
            </h1>
          </div>
        </a>
      </div>

      {/* Navigation Container */}
      <nav className="site-navi absolute right-[80px] top-[80px] pointer-events-auto flex flex-col items-end">
        <div className="site-navi-origin relative flex flex-col items-end">
          
          {/* Menu Toggle - Often hidden on full desktop width but present in DOM */}
          <div className="site-navi-head mb-4 md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ui-btn-link text-[16.8px] font-medium tracking-[0.05em] uppercase hover:opacity-50 transition-opacity"
            >
              MENU
            </button>
          </div>

          {/* Primary Nav Links */}
          <div className="site-navi-body flex flex-col items-end">
            <ul className="site-navi-ul flex flex-col items-end space-y-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      // Small logic to show active state for demo
                      if(link.name === "Research") e.preventDefault();
                      setActiveLink(link.name);
                    }}
                    className={`block py-0.5 text-[14px] uppercase tracking-widest transition-opacity duration-300 font-sans ${
                      activeLink === link.name ? "opacity-100" : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    <div className="flex flex-col items-end">
                      <div className="w-full h-[1px] bg-foreground origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100" 
                           style={activeLink === link.name ? { transform: 'scaleX(1)' } : {}} />
                      <span className="mt-1">{link.name}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <ul className="site-navi-lang mt-10 flex space-x-4 items-center">
              <li className="ui-lang-a">
                <a 
                  href="/en/research/" 
                  className="text-[12px] font-bold tracking-widest underline decoration-1 underline-offset-4"
                >
                  EN
                </a>
              </li>
              <li className="ui-lang-a">
                <a 
                  href="/research/" 
                  className="text-[12px] font-medium tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  JA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Language Switcher Floating (Alternative position seen in some views) */}
      <div className="hidden lg:block absolute top-[80px] right-[240px] pointer-events-auto">
        <div className="site-lang border border-black rounded-full px-4 py-1.5 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
           <a href="/research/" className="text-[10px] font-bold tracking-[0.1em] leading-none">JA</a>
        </div>
      </div>
    </header>
  );
};

export default Navigation;