"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Clones the site navigation for THE SHIFT.
 * Featuring a minimalist top bar and a full-screen overlay menu.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] mix-blend-difference">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-start pt-[80px] px-[80px] pb-[40px] pointer-events-none">
        {/* Logo */}
        <Link 
          href="/" 
          className="pointer-events-auto group"
        >
          <div className="overflow-hidden h-[24px]">
            <h1 className="text-[18px] font-sans font-bold tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-full">
              THE SHIFT
            </h1>
            <h1 className="text-[18px] font-sans font-bold tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-full">
              THE SHIFT
            </h1>
          </div>
        </Link>

        {/* Menu Trigger */}
        <div className="flex flex-col items-end pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative h-[24px] overflow-hidden"
          >
            <div className={cn(
              "text-[10px] font-sans font-medium tracking-[0.1em] text-white uppercase transition-transform duration-500",
              isMenuOpen ? "-translate-y-full" : "group-hover:-translate-y-full"
            )}>
              MENU
            </div>
            <div className={cn(
              "text-[10px] font-sans font-medium tracking-[0.1em] text-white uppercase transition-transform duration-500",
              isMenuOpen ? "-translate-y-full" : "group-hover:-translate-y-full"
            )}>
              {isMenuOpen ? "CLOSE" : "MENU"}
            </div>
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-[#F1F1F1] z-[-1] transition-transform duration-700 ease-[cubic-bezier(0.85, 0, 0.15, 1)]",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="w-full h-full flex flex-col justify-center items-center px-[5vw]">
          <nav className="flex flex-col items-center gap-10">
            {/* Nav Links */}
            <ul className="flex flex-col items-center gap-4">
              {["Home", "Project", "Research", "About"].map((item) => (
                <li key={item} className="overflow-hidden">
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <div className="relative text-[48px] md:text-[80px] font-bold font-sans tracking-tighter leading-none text-black transition-transform duration-500 hover:italic">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <ul className="flex gap-8 mt-10">
              <li>
                <button className="text-[12px] font-sans font-bold tracking-widest text-black border-b border-black">
                  EN
                </button>
              </li>
              <li>
                <button className="text-[12px] font-sans font-medium tracking-widest text-[#737373] hover:text-black transition-colors">
                  JA
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 origin-left scale-x-0 transition-transform duration-1000 delay-300 group-data-[state=open]:scale-x-100" />
      </div>

      {/* Language Indicator (Small circle appearing in original design) */}
      {!isMenuOpen && (
        <div className="fixed top-[80px] right-[240px] pointer-events-auto hidden md:block">
            <Link href="/ja">
                <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group overflow-hidden bg-transparent hover:bg-black transition-colors duration-300">
                    <span className="text-[10px] font-sans font-medium text-black group-hover:text-white transition-colors duration-300">JA</span>
                </div>
            </Link>
        </div>
      )}

      <style jsx global>{`
        .site-navi-bg {
          transform-origin: top;
          transform: scaleY(0);
          transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .site-navi.active .site-navi-bg {
          transform: scaleY(1);
        }
      `}</style>
    </header>
  );
}