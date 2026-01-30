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

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Project", href: "/#projects" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] mix-blend-difference">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-start pt-[40px] md:pt-[80px] px-[20px] md:px-[80px] pb-[40px] pointer-events-none">
        {/* Logo */}
        <Link 
          href="/" 
          className="pointer-events-auto group"
        >
          <div className="overflow-hidden h-[24px]">
            <div className="transition-transform duration-500 group-hover:-translate-y-full">
              <h1 className="text-[18px] font-sans font-bold tracking-tight text-white h-[24px]">
                THE SHIFT
              </h1>
              <h1 className="text-[18px] font-sans font-bold tracking-tight text-white h-[24px]">
                THE SHIFT
              </h1>
            </div>
          </div>
        </Link>

        {/* Menu Trigger */}
        <div className="flex flex-col items-end pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative h-[24px] overflow-hidden"
          >
            <div className={cn(
              "flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.85, 0, 0.15, 1)]",
              isMenuOpen ? "-translate-y-1/2" : "group-hover:-translate-y-1/2"
            )}>
              <div className="h-[24px] text-[10px] font-sans font-medium tracking-[0.1em] text-white uppercase flex items-center justify-end">
                MENU
              </div>
              <div className="h-[24px] text-[10px] font-sans font-medium tracking-[0.1em] text-white uppercase flex items-center justify-end">
                {isMenuOpen ? "CLOSE" : "MENU"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-[#F1F1F1] z-[-1] transition-transform duration-700 ease-[cubic-bezier(0.85, 0, 0.15, 1)] origin-top",
          isMenuOpen ? "scale-y-100" : "scale-y-0"
        )}
      >
        <div className="w-full h-full flex flex-col justify-center items-center px-[5vw]">
          <nav className="flex flex-col items-center gap-10">
            {/* Nav Links */}
            <ul className="flex flex-col items-center gap-4">
              {menuItems.map((item) => (
                <li key={item.label} className="overflow-hidden">
                  <Link 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <div className="relative text-[48px] md:text-[80px] font-bold font-sans tracking-tighter leading-none text-black transition-transform duration-500 hover:italic">
                      {item.label}
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
        <div className={cn(
          "absolute bottom-0 left-0 w-full h-[1px] bg-black/10 origin-left transition-transform duration-1000 delay-300",
          isMenuOpen ? "scale-x-100" : "scale-x-0"
        )} />
      </div>

      {/* Language Indicator */}
      {!isMenuOpen && (
        <div className="fixed top-[40px] md:top-[80px] right-[160px] md:right-[240px] pointer-events-auto hidden sm:block">
            <Link href="#">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group overflow-hidden bg-transparent hover:bg-white transition-colors duration-300">
                    <span className="text-[10px] font-sans font-medium text-white group-hover:text-black transition-colors duration-300">JA</span>
                </div>
            </Link>
        </div>
      )}
    </header>
  );
}
