architectural vision
src/components/sections/featured-projects.tsx
light
Clone the "FEATURED PROJECT AND RESEARCH" list section featuring large, animated typography"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProjectItem {
  id: string;
  number: string;
  lines: string[][];
  href: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: "2322",
    number: "01",
    lines: [
      ["FOCUS", "ON"],
      ["STRETCH", "PLEATS"],
    ],
    href: "/project/focus-on-stretch-pleats/",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/ipsa_aqua_play_art-home-slider-3x5_jpg-1.webp",
  },
  {
    id: "1851",
    number: "02",
    lines: [["LEVEL", "OF"], ["DISTANCE"]],
    href: "/project/level-of-distance/",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/level-of-distance-home-slider-5x3_jpg-3.webp",
  },
  {
    id: "1781",
    number: "03",
    lines: [
      ["IPSA", "AQUA"],
      ["PLAY", "ART"],
    ],
    href: "/project/ipsa_aqua_play_art/",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/ipsa_aqua_play_art-home-slider-3x5_jpg-1.webp",
  },
  {
    id: "2124",
    number: "04",
    lines: [["ATELIER", "WEN"]],
    href: "/project/atelier-wen/",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/level-of-distance-home-slider-5x3_jpg-3.webp",
  },
  {
    id: "2427",
    number: "05",
    lines: [["3D:MIX"]],
    href: "/research/3dmix/",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/level-of-distance-home-slider-5x3_jpg-3.webp",
  },
];

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="bg-[#EFEFEF] py-[10vh] border-t border-black relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-[5vw]">
        {/* Section Header */}
        <div className="mb-[15vh]">
          <h2 className="text-[6vw] font-extrabold leading-[0.9] uppercase tracking-tighter mb-8">
            <div className="overflow-hidden">
              <span className="block">FEATURED PROJECT</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">AND RESEARCH</span>
            </div>
          </h2>
          <div className="flex justify-between items-end">
            <a
              href="/project/"
              className="group relative inline-block text-[14px] font-medium uppercase tracking-widest pb-1"
            >
              <span className="relative z-10">View all project</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform origin-left transition-transform duration-500 ease-out group-hover:scale-x-0"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>

        {/* Projects List */}
        <div className="border-t border-black">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="group relative block border-b border-black py-12 transition-colors duration-500 hover:bg-black hover:text-[#EFEFEF]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-start">
                {/* Project Number */}
                <div className="text-[14px] font-medium mr-8 mt-4">
                  ({project.number})
                </div>

                {/* Project Title */}
                <div className="flex-1">
                  {project.lines.map((words, idx) => (
                    <div key={idx} className="overflow-hidden h-[12vw] md:h-[8vw] lg:h-[7vw]">
                      <div className="flex gap-x-[0.5em] flex-wrap transition-transform duration-500 ease-out group-hover:-translate-y-full">
                        {/* Original Text Layer */}
                        <div className="flex gap-x-[0.5em] w-full h-full items-center">
                          {words.map((word, wIdx) => (
                            <span
                              key={wIdx}
                              className="text-[10vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase leading-[1] tracking-tighter"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                        {/* Hover Text Layer */}
                        <div className="flex gap-x-[0.5em] w-full h-full items-center">
                          {words.map((word, wIdx) => (
                            <span
                              key={wIdx}
                              className="text-[10vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase font-serif italic leading-[1] tracking-tighter"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Cursor Thumbnail */}
      {hoveredProject && (
        <div
          className="pointer-events-none fixed z-50 flex h-[400px] w-[300px] items-center justify-center overflow-hidden rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            opacity: hoveredProject ? 1 : 0,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                hoveredProject === project.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                sizes="300px"
                priority
              />
              <div className="absolute inset-0 bg-[#B5C4E680] mix-blend-multiply opacity-40"></div>
            </div>
          ))}
        </div>
      )}

      {/* Spacing spacer from high-level design */}
      <div className="h-[15vh]"></div>
    </section>
  );
}