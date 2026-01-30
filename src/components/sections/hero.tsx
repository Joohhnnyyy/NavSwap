import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "IPSA AQUA PLAY ART",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2022/07/23125244/rainbow-2.mp4",
  },
  {
    title: "BBF Gate System Video",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2024/02/19164149/BBF-Instagram-post-4_1.mp4",
  },
  {
    title: "Level of Distance",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2023/02/09190304/Vid-1.mp4",
  },
  {
    title: "SHIFT LINK",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp-content/uploads/2022/05/19141516/Untitled.mp4",
  },
  {
    title: "kolor PARISCollection",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp/wp-content/uploads/2017/07/24102412/kolor.mp4",
  },
  {
    title: "Coca-Cola coke vision",
    video: "https://d17292ff19wl6v.cloudfront.net/v2/wp-content/uploads/2019/07/06141426/coca-cola.mp4",
  },
];

const HeroSection = () => {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const tokyoTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const [h, m, s] = tokyoTime.split(':');
      setTime({ h, m, s });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#EFEFEF] overflow-hidden flex flex-col">
      {/* Top Section */}
      <div className="container relative pt-[24vh] pb-10 flex flex-col md:flex-row items-baseline justify-between z-10">
        <h1 className="text-hero font-bold tracking-tighter flex flex-col">
          <span className="font-editorial italic font-normal text-reveal">EXPLORING</span>
          <span className="text-reveal mt-[-2vw]">THE SHIFT</span>
          <span className="font-editorial italic font-normal text-reveal mt-[-2vw]">OF TODAY</span>
        </h1>

        <div className="max-w-[320px] mt-8 md:mt-[-5vw] text-[11px] leading-[1.6] uppercase tracking-wider font-medium text-right self-end md:self-auto">
          <p className="indent-8 text-left">
            The Shift creates future-inspired projects for people and businesses desiring a shift. 
            Based in tokyo, working worldwide.
          </p>
        </div>
      </div>

      {/* Info Row */}
      <div className="container mt-auto mb-[10vh] flex justify-between items-end z-20">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase">
          <span className="text-muted-foreground mr-1">東京</span>
          <span>{time.h}</span>
          <span className="animate-pulse">:</span>
          <span>{time.m}</span>
          <span className="animate-pulse">:</span>
          <span>{time.s}</span>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-[11px] font-medium tracking-widest uppercase flex items-center gap-1">
            <span>(</span>
            <span className="min-w-[1.5rem] inline-block text-center">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-muted-foreground">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
            <span>)</span>
          </div>

          <div className="relative group cursor-pointer" onClick={nextProject}>
            <span className="absolute -top-6 right-0 text-[10px] tracking-[0.2em] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity uppercase">
              PROJECTS
            </span>
            <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-black group-hover:text-white overflow-hidden relative">
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1} />
              
              {/* Progress Circle SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="32"
                  cy="32"
                  r="31"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray={`${2 * Math.PI * 31}`}
                  strokeDashoffset={`${2 * Math.PI * 31 * (1 - (currentIndex + 1) / projects.length)}`}
                  className="transition-all duration-700 ease-in-out"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pill Video Slider Background-ish */}
      <div className="absolute right-0 bottom-0 w-[24vw] h-[40vh] md:w-[22vw] md:h-[55vh] z-0">
        <div className="relative w-full h-full capsule-mask bg-muted/20">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 bg-overlay-blue mix-blend-multiply z-10" />
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover grayscale brightness-110"
              />
            </div>
          ))}
        </div>
        <div className="absolute -top-8 right-0 text-[10px] tracking-[0.2em] font-bold uppercase pointer-events-none">
          PROJECTS
        </div>
      </div>
      
      {/* Decorative vertical divider extension */}
      <div className="absolute right-[5vw] top-0 bottom-0 w-[1px] bg-black/5 pointer-events-none hidden md:block" />
    </div>
  );
};

export default HeroSection;