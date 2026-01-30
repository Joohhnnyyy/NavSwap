"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/project" },
    { name: "Research", href: "/research" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] px-[5vw] pt-20 md:pt-20 pointer-events-none">
        <div className="flex justify-between items-start w-full pointer-events-auto">
          {/* Logo */}
          <Link
            href="/"
            className="block text-[17.99px] font-sans tracking-tight leading-none group"
          >
            <div className="overflow-hidden h-[1.2em]">
              <div
                className={cn(
                  "transition-transform duration-500 ease-out flex flex-col",
                  isMenuOpen ? "-translate-y-full" : "translate-y-0"
                )}
              >
                <span className="block italic font-serif">THE SHIFT</span>
                <span className="block italic font-serif opacity-0">THE SHIFT</span>
              </div>
            </div>
          </Link>

          {/* Center Language Toggle (Static in Light header) */}
          {!isMenuOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 top-20 hidden md:block">
              <Link
                href="/en"
                className="text-[11px] border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition-colors duration-300"
              >
                EN
              </Link>
            </div>
          )}

          {/* Menu Button / Menu Nav */}
          <div className="flex flex-col items-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[14px] font-sans font-medium uppercase tracking-[0.1em] mb-4 hover:opacity-60 transition-opacity"
            >
              <div className="overflow-hidden h-[1.2em]">
                <div
                  className={cn(
                    "transition-transform duration-500 ease-out flex flex-col",
                    isMenuOpen ? "-translate-y-full" : "translate-y-0"
                  )}
                >
                  <span>MENU</span>
                  <span>CLOSE</span>
                </div>
              </div>
            </button>

            {/* In-header nav list (desktop only, hidden when menu open) */}
            {!isMenuOpen && (
              <nav className="hidden md:block text-right">
                <ul className="space-y-0.5">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[14px] font-sans font-medium uppercase tracking-[0.1em] hover:opacity-60 transition-opacity inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Full-screen Overlay Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-[#EFEFEF] z-[90] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-center items-center",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="w-full max-w-[90vw] md:max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center">
          <ul className="flex flex-col space-y-4 md:space-y-6 text-right">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className={cn(
                  "overflow-hidden transition-all duration-700 delay-[100ms]",
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[8vw] md:text-[6vw] font-sans font-extrabold uppercase leading-[0.9] hover:italic transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-20 md:mt-0 flex flex-col items-end space-y-4 transition-all duration-700 delay-500",
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="flex space-x-4 text-[14px] font-medium tracking-widest">
              <Link href="/en" className="underline underline-offset-4">EN</Link>
              <Link href="/" className="opacity-40">JA</Link>
            </div>
            <div className="text-right text-[11px] leading-relaxed opacity-60 max-w-[200px]">
              Exploring the shift of today. Based in Tokyo, working worldwide.
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;