"use client";

import React, { useState, useEffect, useRef } from "react";
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
    posterSrc: "", // Missing from high-level assets, fallback to empty or first
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

const ProjectSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION = 5000; // 5 seconds per slide

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  };

  useEffect(() => {
    const interval = 50; // Update progress every 50ms
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

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-full z-10 flex flex-col items-end px-[4vw]">
      {/* Label: PROJECTS */}
      <div className="w-full flex justify-end mb-4">
        <div className="text-stats opacity-60">PROJECTS</div>
      </div>

      <div className="relative flex flex-col items-end w-full max-w-[400px]">
        {/* Main Slider Container */}
        <div className="relative w-full aspect-[3/5] cursor-pointer group">
          <a href={projects[currentIndex].url} className="block w-full h-full">
            <div 
              className="w-full h-full overflow-hidden transition-all duration-700 ease-out"
              style={{
                borderRadius: "50% 50% 0 0",
                maskImage: "radial-gradient(ellipse at bottom, white 100%, transparent 100%)" // Approximation for the organic arch
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <video
                    src={project.videoSrc}
                    poster={project.posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                  />
                  {/* Invisible Alt for accessibility */}
                  <span className="sr-only">{project.title}</span>
                </div>
              ))}
            </div>
          </a>

          {/* Controls: Progress Ring + Arrow */}
          <div 
            className="absolute bottom-[-15px] right-[-15px] w-[140px] h-[140px] flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              {/* Background Path */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#CCCCCC"
                strokeWidth="1"
                fill="none"
              />
              {/* Progress Path */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#000000"
                strokeWidth="2"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-75 linear"
              />
            </svg>
            
            <div className="relative z-10 w-[100px] h-[100px] bg-foreground text-background rounded-full flex items-center justify-center overflow-hidden hover:scale-95 transition-transform duration-300">
              <ArrowRight size={24} className="mix-blend-difference" />
            </div>
          </div>
        </div>

        {/* Counter: (01/06) */}
        <div className="mt-12 flex justify-between items-center w-full">
          <div className="text-stats font-sans tracking-[0.2em] flex items-center gap-1">
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
          
          {/* Current Project Title (Fadable if needed) */}
          <div className="text-ui text-[10px] opacity-40 uppercase truncate max-w-[200px]">
            {projects[currentIndex].title}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pickup-slide-wrap {
          /* specific spacing from original design */
          margin-top: -10vh;
          margin-bottom: 5vh;
        }
        
        /* Arched mask implementation */
        .mask-arch {
          border-radius: 200px 200px 0 0;
        }
      `}</style>
    </div>
  );
};

export default ProjectSlider;