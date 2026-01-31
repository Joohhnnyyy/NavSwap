"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  videoSrc: string;
  posterSrc: string;
  url: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "IPSA AQUA PLAY ART",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2022/07/23125244/rainbow-2.mp4",
    posterSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/ipsa_aqua_play_art-home-slider-3x5_jpg-1.webp",
    url: "/project/ipsa_aqua_play_art/",
  },
  {
    id: "02",
    title: "BBF Gate System Video",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2024/02/19164149/BBF-Instagram-post-4_1.mp4",
    posterSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/BBF-gate-design-5x3_jpg-2.webp",
    url: "/project/bbf-gate-system-vid/",
  },
  {
    id: "03",
    title: "Level of Distance",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2023/02/09190304/Vid-1.mp4",
    posterSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/level-of-distance-home-slider-5x3_jpg-3.webp",
    url: "/project/level-of-distance/",
  },
  {
    id: "04",
    title: "SHIFT LINK",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2022/05/19141516/Untitled.mp4",
    posterSrc: "", 
    url: "/project/shift_link/",
  },
  {
    id: "05",
    title: "kolor PARIS Collection",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2017/07/24102412/kolor.mp4",
    posterSrc: "",
    url: "/project/kolor-paris-collection/",
  },
  {
    id: "06",
    title: "Coca-Cola coke vision",
    videoSrc: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2019/07/06141426/coca-cola.mp4",
    posterSrc: "",
    url: "/project/co-ca-cola-coke-vision/",
  },
];

const HeroSection: React.FC = () => {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  
  // Slider Logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION = 5000; // 5 seconds per slide

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  };

  useEffect(() => {
    const interval = 50; 
    const step = (interval / DURATION) * 100;

    autoplayTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [currentIndex]);

  const radius = 48; // Scaled down for Hero? Or keep same? Original was 48 (96px diameter). My hero button is w-14 (56px).
  // I should adjust the radius to match the hero button size. 
  // Hero button is w-14 = 3.5rem = 56px.
  // Radius should be approx 28 - stroke. Let's say 26.
  // But wait, the ProjectSlider button was w-[140px] h-[140px] container with radius 48.
  // My Hero button is small.
  // I'll stick to the Hero's small button style but maybe add a small ring if it fits, or just keep the functionality.
  // User asked for "content of this div". The ring is part of the content.
  // I will make the button larger to accommodate the ring, or scale the ring down.
  // Let's use a slightly smaller ring for the hero to keep it elegant.
  const heroRadius = 22; 
  const heroCircumference = 2 * Math.PI * heroRadius;
  const heroOffset = heroCircumference - (progress / 100) * heroCircumference;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const tokyoTimeStr = new Intl.DateTimeFormat("en-US", options).format(now);
      const [h, m, s] = tokyoTimeStr.split(":");
      setTime({ h, m, s });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderSplitText = (text: string, fontVar = "var(--font-custom)") => {
    return text.split("").map((char, i) => (
      <div
        key={i}
        className={`c o inline-block overflow-hidden h-[1.1em] align-top`}
        style={{
          fontFamily: fontVar,
          fontWeight: 400,
        }}
      >
        <div className="t transition-transform duration-700 ease-out transform translate-y-0">
          {char === " " ? "\u00A0" : char}
        </div>
      </div>
    ));
  };

  return (
    <section 
      className="section page-header relative h-screen w-full bg-background text-foreground z-10 pb-[25vh]"
      data-scroll-section
    >
      {/* 2. CENTER STAGE (The Hero) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-full text-center">
          {/* Main Headline */}
          <h1 className="page-title text-foreground flex flex-col items-center leading-[1] tracking-[-0.02em] text-[10vw] lg:text-[12vw] px-[10vw]">
             {/* Row 1: DEFINING (Serif) */}
             <div className="l l1 overflow-hidden whitespace-nowrap">
                <div className="w">{renderSplitText("DEFINING")}</div>
              </div>
              
              {/* Row 2: THE FLOW (Sans) */}
              <div className="l l2 overflow-hidden whitespace-nowrap -mt-[3vw] text-[0.85em] -translate-x-[10vw]">
                <div className="w">{renderSplitText("THE FLOW", "var(--font-secondary)")}</div>
              </div>

              {/* Row 3: OF ENERGY (Serif) */}
              <div className="l l3 overflow-hidden whitespace-nowrap -mt-[1.5vw]">
                <div className="w">{renderSplitText("OF ENERGY")}</div>
              </div>
          </h1>
        </div>

        {/* Middle-Right Overlay */}
        <div className="absolute top-1/2.5 left-[70%] -translate-y-1/2 w-[200px] lg:w-[280px] text-left hidden md:block pointer-events-none">
          <div className="relative">
            <p className="text-[10px] lg:text-[12px] leading-[1.3] font-sans font-normal uppercase tracking-wide text-muted-foreground">
              NavSwap is an Agentic AI Copilot that continuously monitors swap station signals and recommends operational actions to prevent congestion, downtime, and stockouts.
            </p>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW (The Footer) */}
      <div className="absolute bottom-0 left-0 w-full h-[15vh] flex items-end justify-between px-[20px] md:px-[80px] pb-8 z-20 pointer-events-none">
        {/* Bottom-Left: Metadata (Location + Time) */}
        <div className="flex flex-col items-start text-[10px] tracking-[0.2em] font-normal pointer-events-auto">
            <div className="clock flex items-center gap-2">
                <span className="opacity-50">TIME</span>
                <div className="flex tabular-nums">
                    <span>{time.h}</span>
                    <span className="animate-pulse mx-0.5">:</span>
                    <span>{time.m}</span>
                    <span className="animate-pulse mx-0.5">:</span>
                    <span>{time.s}</span>
                </div>
            </div>
        </div>

        {/* Bottom-Right: Project Preview Complex */}
        <div className="pointer-events-auto relative flex flex-col items-end">
             <div className="relative group">
                {/* Label */}
                <div className="absolute right-0 top-20 text-[10px] tracking-[0.2em] uppercase text-muted-foreground z-40 transition-transform duration-700 ease-out translate-y-[60%] group-hover:translate-y-[40%]">
                    PROJECTS
                </div>

                {/* Pagination - Left of window */}
                <div className="absolute top-[115%] -left-20 -translate-y-[40%] text-[10px] tracking-[0.2em] font-normal opacity-80 flex items-center gap-1 z-30 pointer-events-none">
                    <span>(</span>
                    <div className="relative h-[1.2em] overflow-hidden w-[2ch]">
                        <div 
                            className="transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
                        >
                            {projects.map((p) => (
                                <div key={p.id} className="h-[1.2em] flex items-center justify-center">{p.id}</div>
                            ))}
                        </div>
                    </div>
                    <span>/</span>
                    <span>{projects.length.toString().padStart(2, '0')}</span>
                    <span>)</span>
                </div>

                {/* Large Arched Window */}
                <div 
                    className="w-[220px] h-[300px] md:w-[270px] md:h-[360px] bg-card rounded-full overflow-hidden relative translate-y-[60%] border border-border group-hover:translate-y-[40%] transition-transform duration-700 ease-out cursor-pointer z-30"
                    onClick={nextSlide}
                >
                    {/* Videos with Crossfade */}
                    <div className="absolute inset-0 bg-black">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <video
                                    src={project.videoSrc}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] opacity-80 group-hover:opacity-100"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* White Arrow Button - Overlapping with Progress Ring */}
                <div 
                    className="absolute bottom-12 -right-6 w-16 h-16 bg-foreground rounded-full flex items-center justify-center text-background z-40 cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle
                            cx="32"
                            cy="32"
                            r={heroRadius}
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-muted"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r={heroRadius}
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={heroCircumference}
                            strokeDashoffset={heroOffset}
                            strokeLinecap="round"
                            className="transition-[stroke-dashoffset] duration-75 linear text-background"
                        />
                    </svg>
                    <ArrowRight size={20} strokeWidth={1.5} />
                </div>
             </div>
        </div>
      </div>

      <style jsx>{`
        .page-title {
          font-kerning: none;
        }
        .c .t {
          display: inline-block;
          animation: slideUpChar 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform: translateY(110%);
        }
        @keyframes slideUpChar {
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
