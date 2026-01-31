"use client";

import React from 'react';

const FeaturedList = () => {
  const projects = [
    {
      id: "01",
      title: ["FOCUS", "ON"],
      subtitle: ["STRETCH", "PLEATS"],
      href: "/project/focus-on-stretch-pleats/"
    },
    {
      id: "02",
      title: ["LEVEL", "OF"],
      subtitle: ["DISTANCE"],
      href: "/project/level-of-distance/"
    },
    {
      id: "03",
      title: ["IPSA", "AQUA"],
      subtitle: ["PLAY", "ART"],
      href: "/project/ipsa_aqua_play_art/"
    },
    {
      id: "04",
      title: ["ATELIER", "WEN"],
      href: "/project/atelier-wen/"
    },
    {
      id: "05",
      title: ["3D:MIX"],
      href: "/research/3dmix/"
    }
  ];

  return (
    <section className="section text-[#F0F0F0] bg-[#000000]">
      <div className="px-[4vw] pt-[15vh]">
        {/* Section Header */}
        <div className="mb-[10vh]">
          <h2 className="text-[1vw] font leading-[1.1] tracking-[-0.02em] uppercase mb-8">
            <div className="flex flex-wrap justify-center gap-x-[0.5em]">
              <span>FEATURED</span>
              <span>PROJECT</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.5em]">
              <span>AND</span>
              <span>RESEARCH</span>
            </div>
          </h2>
          
          <div className="relative mb-12">
            <a 
              href="/project/" 
              className="group inline-flex flex-col text-[12px] font-medium tracking-[0.1em] uppercase overflow-hidden"
            >
              <div className="flex flex-col relative">
                <span className="pb-1 transition-transform duration-500 group-hover:-translate-y-full">View all project</span>
                <span className="absolute top-full pb-1 transition-transform duration-500 group-hover:-translate-y-full">View all project</span>
              </div>
              <div className="h-[1px] w-full bg-[#000000] origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-0"></div>
              <div className="h-[1px] w-full bg-[#0000FF] origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100 absolute bottom-0"></div>
            </a>
          </div>

          <div className="w-full h-[1px] bg-[#CCCCCC]"></div>
        </div>

        {/* List Items */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="group relative block w-full outline-none transition-colors"
            >
              <div className="flex items-start py-[4vw] md:py-[3vw] gap-[2vw]">
                {/* Numbered Index */}
                <div className="pt-[1vw] text-[12px] font-medium tracking-[0.1em] opacity-100 transition-opacity">
                  <span className="flex items-center">
                    (<span className="inline-block min-w-[2ch]">{project.id}</span>)
                  </span>
                </div>

                {/* Typography Container */}
                <div className="flex-1">
                  <div className="font-custom text-[8vw] md:text-[7vw] leading-[0.9] tracking-[-0.03em] uppercase flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2vw]">
                    {/* First Line */}
                    <div className="flex flex-wrap gap-x-[0.3em] overflow-hidden">
                      {project.title.map((word, i) => (
                        <span key={i} className="inline-block transform transition-transform duration-700 delay-[50ms]">
                          {word}
                        </span>
                      ))}
                    </div>
                    {/* Second Line (Optional) */}
                    {project.subtitle && (
                      <div className="flex flex-wrap gap-x-[0.3em] overflow-hidden">
                        {project.subtitle.map((word, i) => (
                          <span key={i} className="inline-block transform transition-transform duration-700 delay-[100ms]">
                            {word}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#CCCCCC]"></div>
              
              {/* Animating Hover Divider */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#000000] scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"></div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .font-serif-display {
          font-family: var(--font-serif, "Noto Serif JP", serif);
          font-weight: 400;
        }
      `}</style>
    </section>
  );
};

export default FeaturedList;