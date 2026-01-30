import React, { useState, useEffect } from "react";

/**
 * Header component for THE SHIFT.
 * Features:
 * - Minimalist branding "THE SHIFT" (Logo)
 * - Language switcher (EN/JA)
 * - Navigation menu with side-drawer effect
 * - Precise layout matching based on computed styles and design system
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Project", href: "/project/" },
    { label: "Research", href: "/research/" },
    { label: "About", href: "/about/" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] h-0">
      {/* Site Logo */}
      <a
        href="/"
        className="absolute top-[-11.6938px] left-0 flex flex-col justify-start items-start z-[9] transition-opacity duration-500 ease-in-out"
        style={{
          width: "255.125px",
          height: "143.375px",
          padding: "80px 4vw 40px", // 4vw matching side margins
          color: "rgb(20, 20, 20)",
          fontSize: "17.9904px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span className="block overflow-hidden h-[23px] relative">
          <span className="relative block transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-full">
            <span className="block">THE SHIFT</span>
            <span className="absolute top-full left-0 block">THE SHIFT</span>
          </span>
        </span>
      </a>

      {/* Language Switcher (Top Right Pillar/Box) */}
      <div
        className={`absolute top-[80px] right-[4vw] z-[8] flex items-center transition-opacity duration-500 ${
          isMenuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center space-x-4">
          <a
            href="/en/"
            className="flex items-center justify-center border border-border px-3 py-1 text-[12px] font-medium tracking-[0.1em] hover:bg-black hover:text-white transition-all duration-300 rounded-full"
            style={{ minWidth: "48px", height: "auto" }}
          >
            EN
          </a>
        </div>
      </div>

      {/* Navigation Toggle & Drawer */}
      <nav className="absolute top-0 right-0 z-[7]" style={{ width: "240px" }}>
        {/* Menu Button */}
        <div
          className="absolute top-[80px] right-[4vw] z-[10] cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="text-[12px] font-medium tracking-[0.1em] text-right uppercase overflow-hidden h-[18px]">
            <div
              className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen ? "-translate-y-full" : "translate-y-0"
              }`}
            >
              <div className="hover:opacity-60">MENU</div>
              <div className="hover:opacity-60">CLOSE</div>
            </div>
          </div>
        </div>

        {/* Side Drawer Body */}
        <div
          className={`fixed top-0 right-0 h-screen bg-[#F0F0F0] border-l border-border transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "400px" }}
        >
          <div className="flex flex-col h-full pt-[200px] px-[80px]">
            <ul className="space-y-6">
              {navLinks.map((link, idx) => (
                <li key={link.label} className="overflow-hidden">
                  <a
                    href={link.href}
                    className="group relative inline-block text-[32px] font-bold tracking-tight uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.02em",
                      transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                      transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s`,
                    }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-500 ease-in-out"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Language Switcher inside menu */}
            <ul className="mt-[100px] flex space-x-6">
              <li className="overflow-hidden">
                <a
                  href="/en/"
                  className="text-[12px] font-medium uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                    display: "block",
                  }}
                >
                  EN
                </a>
              </li>
              <li className="overflow-hidden">
                <a
                  href="/"
                  className="text-[12px] font-medium uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
                    display: "block",
                  }}
                >
                  JA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Backdrop for Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/5 z-[-1]"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </nav>

      <style jsx global>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
        }
        .flip .o {
          overflow: hidden;
          position: relative;
        }
        .flip .t {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .flip:hover .t {
          transform: translateY(-100%);
        }
        .flip .t::after {
          content: attr(data-text);
          position: absolute;
          top: 100%;
          left: 0;
        }
      `}</style>
    </header>
  );
};

export default Header;