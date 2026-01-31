"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Logo3D from "@/components/ui/logo-3d";
import { useThemeToggle } from "@/hooks/use-theme-transition";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { LiquidMetal } from "@/components/ui/liquid-metal";

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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
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
                isPortalOpen ? "text-background" : ""
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
          "fixed inset-0 z-[101]",
          isPortalOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Background Curtain - Matches Menu Animation */}
        <div 
          className={cn(
            "absolute inset-0 bg-foreground transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform",
            isPortalOpen ? "origin-right scale-x-100" : "origin-left scale-x-0"
          )}
        />

        <button
          onClick={() => setIsPortalOpen(false)}
          className={cn(
            "absolute top-[40px] left-[20px] md:top-[80px] md:left-[80px] p-2 text-background/50 hover:text-background transition-colors duration-300 z-50",
            isPortalOpen ? "pointer-events-auto opacity-100 delay-300" : "pointer-events-none opacity-0 delay-0"
          )}
        >
          <ArrowLeft size={32} strokeWidth={1.5} />
        </button>

        {/* Decorative Horizontal Line - Behind Content */}
        <div 
          className={cn(
            "absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-background/20 to-transparent pointer-events-none z-0 transition-opacity duration-700 ease-out",
            isPortalOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"
          )} 
        />

        <div 
          className={cn(
            "relative z-10 w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ease-out",
            isPortalOpen ? "opacity-100 delay-300" : "opacity-0 delay-0"
          )}
        >
          {/* Glass Card Container */}
          <div className="relative w-full max-w-[480px] mx-4 p-8 md:p-12 bg-gradient-to-br from-background/10 via-background/5 to-transparent backdrop-blur-2xl border-t border-l border-background/20 border-b border-r border-background/10 shadow-2xl flex flex-col items-center text-background overflow-hidden">
            
            {/* Decorative Corner Brackets */}
            <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-background/30 z-10" />
            <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-background/30 z-10" />
            <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-background/30 z-10" />
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-background/30 z-10" />

            {/* Logo Container */}
            <div className="mb-8 relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] z-10 rounded-full overflow-hidden group">
              {/* Default State: Chrome */}
              <LiquidMetal 
                colorBack="#aaaaac" 
                colorTint="#ffffff" 
                speed={0.5} 
                repetition={4} 
                distortion={0.1} 
                scale={1}
                shiftRed={0.3}
                shiftBlue={-0.3} 
                className="absolute inset-0 z-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
              />

              {/* Hover State: Prism */}
              <LiquidMetal 
                colorBack="#000000" 
                colorTint="#ffffff" 
                speed={0.8} 
                repetition={5} 
                distortion={0.4} 
                scale={1.2}
                shiftRed={1.5}
                shiftBlue={-1.5}
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Logo - Black on Chrome, White on Prism */}
              <div className="absolute inset-0 z-10 transition-all duration-500 group-hover:invert">
                <Image 
                  src="/black_logo.png" 
                  alt="NavSwap Logo" 
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>

            <h2 className="relative z-10 text-[20px] md:text-[24px] font-regular tracking-tighter uppercase leading-none text-center mb-10">
              NavSwap Operations Portal
            </h2>
            
            <div className="relative z-10 flex flex-col gap-4 w-full">
              <Link 
                href="/admin-registration" 
                onClick={() => setIsPortalOpen(false)}
                className="group relative w-full py-4 border border-background/20 hover:border-background transition-colors duration-300 overflow-hidden  bg-background/5"
              >
                <span className="relative z-10 flex items-center justify-center text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-bold group-hover:text-foreground transition-colors duration-300 text-center w-full">
                   Sign in to Admin Portal 
                </span>
                <div className="absolute inset-0 bg-background transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              
              <Link 
                href="/station-registration" 
                onClick={() => setIsPortalOpen(false)}
                className="group relative w-full py-4 border border-background/20 hover:border-background transition-colors duration-300 overflow-hidden  bg-background/5"
              >
                <span className="relative z-10 flex items-center justify-center text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-bold group-hover:text-foreground transition-colors duration-300 text-center w-full">
                   Apply for Station Registration 
                </span>
                <div className="absolute inset-0 bg-background transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
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
                        setIsMenuOpen(false); // Close menu first
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
