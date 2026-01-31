"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Logo3D from "@/components/ui/logo-3d";
import { useThemeToggle } from "@/hooks/use-theme-transition";

/**
 * Header Component
 * Clones the site navigation for THE SHIFT.
 * Featuring a minimalist top bar and a full-screen overlay menu.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const { toggleTheme } = useThemeToggle({
    variant: "circle-blur",
    start: "top-left",
    blur: true,
  });

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen || isPortalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen, isPortalOpen]);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Platform", href: "/#projects" },
    { label: "Solutions", href: "/research" },
    { label: "Contact", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-start pt-[40px] md:pt-[80px] px-[20px] md:px-[80px] pb-[40px] pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto group cursor-pointer">
          <div className="w-[100px] h-[100px] -mt-[38px] -ml-[20px] relative z-50">
            <Logo3D className="w-full h-full" onClick={toggleTheme} />
          </div>
        </div>

        {/* Menu Trigger */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => {
              if (isPortalOpen) {
                setIsPortalOpen(false);
              } else {
                setIsMenuOpen(!isMenuOpen);
              }
            }}
            className="group relative h-[24px] overflow-hidden"
          >
            <div className={cn(
              "flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.85, 0, 0.15, 1)]",
              (isMenuOpen || isPortalOpen) ? "-translate-y-1/2" : ""
            )}>
              <div className="h-[24px] text-[12px] font-custom font-bold tracking-[0.2em] text-foreground uppercase flex items-center justify-end">
                MENU
              </div>
              <div className={cn(
                "h-[24px] text-[12px] font-custom font-bold tracking-[0.2em] uppercase flex items-center justify-end transition-colors duration-300",
                isMenuOpen ? "text-background" : "text-foreground",
                isPortalOpen ? "text-white" : ""
              )}>
                {isPortalOpen ? "BACK" : (isMenuOpen ? "CLOSE" : "MENU")}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* NavSwap Operations Portal Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[101] bg-black/80 backdrop-blur-xl text-white flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]",
          isPortalOpen ? "opacity-100 pointer-events-auto clip-path-full" : "opacity-0 pointer-events-none clip-path-circle"
        )}
        style={{
          clipPath: isPortalOpen ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)"
        }}
      >
        <div className="text-center space-y-12 md:space-y-16 opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-forwards px-4" style={{ animationPlayState: isPortalOpen ? 'running' : 'paused' }}>
          <h2 className="text-[24px] md:text-[40px] lg:text-[3vw] font-custom tracking-tighter uppercase leading-none max-w-[90vw] mx-auto">
            NavSwap Operations Portal
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-4xl mx-auto">
            <a href="#" className="group relative w-full md:w-auto min-w-[280px] px-8 py-5 border border-white/20 hover:border-white/100 transition-colors duration-300 overflow-hidden bg-black/20 backdrop-blur-sm">
              <span className="relative z-10 flex items-center justify-center text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-bold group-hover:text-black transition-colors duration-300 text-center w-full">
                [ Sign in to Admin Portal ]
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
            
            <a href="#" className="group relative w-full md:w-auto min-w-[280px] px-8 py-5 border border-white/20 hover:border-white/100 transition-colors duration-300 overflow-hidden bg-black/20 backdrop-blur-sm">
              <span className="relative z-10 flex items-center justify-center text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-bold group-hover:text-black transition-colors duration-300 text-center w-full">
                [ Apply for Station Registration ]
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[-1]",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Background Curtain */}
        <div 
          className={cn(
            "absolute inset-0 bg-foreground transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform",
            isMenuOpen ? "origin-right scale-x-100" : "origin-left scale-x-0"
          )}
        />

        {/* Content Container */}
        <div className={cn(
          "relative w-full h-full flex flex-col md:flex-row text-background transition-opacity duration-700",
          isMenuOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"
        )}>
          {/* Left Column: Branding */}
          <div className="w-full md:w-1/2 h-full border-r border-background/20 p-8 md:p-12 flex flex-col justify-between">
            {/* Top Left Branding */}
            <div className="text-[14px] font-sans font-medium opacity-50">
            </div>

            {/* Center Large Text */}
            <div className="text-[11vw] leading-[1] font-custom border tracking-tighter">
              NAVSWAP
            </div>

            {/* Bottom Left Description */}
            <div className="max-w-md text-[12px] md:text-[14px] leading-relaxed opacity-70 font-sans">
              NavSwap is an Agentic AI Operations Copilot for battery swap stations. It watches live station signals, predicts failures and congestion, and recommends concrete actions.
            </div>
          </div>

          {/* Right Column: Navigation */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-8 md:p-12">
            {/* Spacer for top alignment */}
            <div className="hidden md:block h-[100px]"></div>

            {/* Menu Items */}
            <nav className="flex flex-col w-full">
              {menuItems.map((item, index) => (
                <div key={item.label} className="group border-t border-background/20 hover:bg-background/10 transition-colors duration-300">
                  <Link 
                    href={item.href}
                    onClick={(e) => {
                      if (item.label === "Platform") {
                        e.preventDefault();
                        setIsPortalOpen(true);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between py-6 md:py-8 w-full"
                  >
                    {/* Plus Icon */}
                    <span className="text-xl font-light opacity-50 group-hover:opacity-100 transition-opacity duration-300">+</span>
                    
                    {/* Label */}
                    <TextRoll 
                      className="text-[40px] md:text-[60px] lg:text-[80px] font-bold font-custom tracking-tighter leading-none uppercase"
                      active={isMenuOpen}
                      baseDelay={0.4 + (index * 0.1)}
                    >
                      {item.label}
                    </TextRoll>
                  </Link>
                </div>
              ))}
              {/* Bottom Border for last item */}
              <div className="border-t border-neutral-200"></div>
            </nav>

            {/* Footer Socials */}
            <div className="flex flex-wrap justify-end gap-6 md:gap-8 text-[12px] md:text-[14px] uppercase tracking-wide pt-8">
              {["Instagram", "Behance", "X", "Savee", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="hover:opacity-50 transition-opacity duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language Indicator - Removed as it's now in the main nav area */}
      {/* {!isMenuOpen && (
        <div className="fixed top-[40px] md:top-[80px] right-[160px] md:right-[240px] pointer-events-auto hidden sm:block">
            <Link href="#">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group overflow-hidden bg-transparent hover:bg-white transition-colors duration-300">
                    <span className="text-[10px] font-sans font-medium text-white group-hover:text-black transition-colors duration-300">JA</span>
                </div>
            </Link>
        </div>
      )} */}
    </header>
  );
}

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
  baseDelay?: number;
}> = ({ children, className, center = false, active = false, baseDelay = 0 }) => {
  return (
    <motion.span
      initial="initial"
      animate={active ? "hovered" : "initial"}
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay: baseDelay + delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay: baseDelay + delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};
