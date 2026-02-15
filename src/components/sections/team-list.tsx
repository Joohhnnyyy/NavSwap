"use client";

import React, { useEffect, useRef, useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  website?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ansh Johnson",
    role: "Frontend Designer",
    bio: "I’m Ansh Johnson, Frontend Developer at NavSwap, where I design and build intuitive, responsive interfaces that power our intelligent EV battery swap platform. I focus on creating seamless user experiences, translating complex backend systems into clean, accessible, and high-performance web applications that make smart mobility simple and efficient."
  },
  {
    name: "Nandika Gupta",
    role: "Agentic AI Developer & Architecture",
    bio: "I’m Nandika Gupta, AI Developer at NavSwap, contributing to the development of our agentic AI-powered battery swap optimization system. I focus on building intelligent forecasting, optimization, and predictive maintenance models that improve efficiency, reduce downtime, and enable scalable electric mobility solutions."
  },
  {
    name: "Akshat Arya",
    role: "Agentic AI Developer & Architecture",
    bio: "I’m Akshat Arya, AI Developer at NavSwap, where I work on building scalable AI systems that enable intelligent decision-making across EV battery swap networks. I focus on optimizing real-time operations and integrating automation to improve efficiency, reliability, and overall system performance."
  },
  {
    name: "Madhur Prakash",
    role: "Backend & DevOps",
    bio: "I’m Madhur Prakash, Backend Developer at NavSwap, where I design and build the core backend systems and deployment infrastructure that power our intelligent EV battery swap platform. I focus on creating scalable, reliable, and high-performance services, ensuring smooth system integration, efficient data flow, and stable production environments that enable seamless operation of our smart mobility solutions."
  },
  {
    name: "Nidhi Singh",
    role: "App Developer",
    bio: "I’m Nidhi Singh, the App Developer of NavSwap, an AI-powered EV battery swapping platform focused on making electric mobility faster and more accessible. I work on building intuitive mobile experiences using Flutter, translating complex systems into smooth, user-friendly applications. I’m passionate about creating impactful tech solutions at the intersection of AI, mobility, and real-world problem solving."
  }
];

const imageMap: Record<string, string> = {
  "Ansh Johnson": "/Ansh.jpeg",
  "Nandika Gupta": "/Nandika.jpeg",
  "Madhur Prakash": "/Madhur.jpeg",
  "Nidhi Singh": "/Nidhi.jpeg",
  "Akshat Arya": "/Akshat.jpeg",
};

const TeamList = () => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-secondary dark:bg-[#050505] text-secondary-foreground dark:text-white pb-24 lg:pb-40 px-[5vw]">
      <div className="container mx-auto">
        {/* Title Spacing */}
        <div className="h-[15vh]"></div>

        {/* Massive Vertical/Large Team Heading */}
        <div className="overflow-hidden mb-12 lg:mb-20">
          <h2 className="text-[15vw] lg:text-[10vw] font-bold leading-[0.8] tracking-[-0.03em] uppercase">
            <span className="block">TEAM</span>
          </h2>
        </div>

        {/* Section Divider with (04) label style as per design patterns */}
        <div className="relative w-full mb-12 lg:mb-20">
          <div className="h-[1px] w-full bg-foreground/20 dark:bg-white/20"></div>
          <div className="absolute top-2 right-0 font-sans text-[10px] flex items-center">
            <span className="opacity-40">(</span>
            <span className="px-0.5 font-bold">04</span>
            <span className="opacity-40">)</span>
          </div>
        </div>

        {/* Team List */}
        <div className="w-full">
          <ul className="flex flex-col group/list">
            {teamMembers.map((member, index) => (
              <li
                key={index}
                className="group relative border-b border-foreground/20 dark:border-white/20 transition-all duration-500 group-hover/list:blur-sm hover:!blur-none focus-within:!blur-none"
              >
                <div
                  className="relative block w-full outline-none transition-all duration-500"
                  tabIndex={0}
                  onMouseEnter={() => setHoveredName(imageMap[member.name] ? member.name : null)}
                  onMouseLeave={() => {
                    setHoveredName(null);
                    if (rafRef.current !== null) {
                      cancelAnimationFrame(rafRef.current);
                      rafRef.current = null;
                    }
                  }}
                  onMouseMove={(e) => {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                    if (rafRef.current === null) {
                      const step = () => {
                        const t = targetRef.current;
                        const c = currentRef.current;
                        c.x += (t.x - c.x) * 0.2;
                        c.y += (t.y - c.y) * 0.2;
                        currentRef.current = c;
                        setCursorPos({ x: c.x, y: c.y });
                        rafRef.current = requestAnimationFrame(step);
                      };
                      rafRef.current = requestAnimationFrame(step);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 py-10 lg:py-16 gap-y-6 lg:gap-y-0">
                  {/* Left Column: Name */}
                  <div className="lg:col-span-4">
                    <h3 className="text-[24px] lg:text-[28px] font-sans font-bold uppercase tracking-tight leading-tight">
                      {member.name}
                    </h3>
                  </div>

                  {/* Right Column: Role and Bio */}
                  <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 lg:max-w-2xl lg:ml-auto xl:ml-0">
                    {/* Role */}
                    <div className="text-[12px] lg:text-[13px] font-sans uppercase font-bold tracking-wide opacity-60">
                      {member.role}
                    </div>

                    {/* Bio */}
                    <div className="text-[15px] lg:text-[16px] font-sans leading-relaxed text-foreground/90 dark:text-white/90 font-normal">
                      <p>
                        {member.bio}
                        {member.website && (
                          <a 
                            href={member.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center ml-2 border-b border-foreground dark:border-white hover:opacity-50 transition-opacity"
                          >
                            →Website
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                  </div>
                  {imageMap[member.name] && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute z-20 hidden md:block"
                      style={{
                        left: 0,
                        top: 0,
                        transform: `translate(${cursorPos.x - 90}px, ${cursorPos.y - 90}px) scale(${hoveredName === member.name ? 1 : 0.92})`,
                        opacity: hoveredName === member.name ? 1 : 0,
                        width: 180,
                        height: 180,
                        borderRadius: 12,
                        border: "2px solid rgba(255,255,255,0.6)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                        backgroundImage: `url(${imageMap[member.name]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "opacity 220ms ease, scale 220ms cubic-bezier(0.16,1,0.3,1)",
                        willChange: "transform, opacity",
                      }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TeamList;
