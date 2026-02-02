"use client";

import React from 'react';

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
    bio: "B.Tech Computer Science & Engineering student with strong hands-on experience in AI, machine learning, and full-stack web development. Focused on building real-world, production-ready products and crafting high-quality frontends with smooth, intuitive UI/UX. Deeply drawn to product engineering where technology, design, and user needs intersect."
  },
  {
    name: "Nandika Gupta",
    role: "Agentic AI Developer & Architecture",
    bio: "B.Tech student in Artificial Intelligence, passionate about using technology to enhance well-being and build accessible, human-centered digital experiences. Focused on exploring meaningful applications of AI that improve everyday life and make interactions with technology more intuitive and trustworthy."
  },
  {
    name: "Akshat Arya",
    role: "Agentic AI Developer & Architecture",
    bio: "B.Tech Computer Science & Engineering student passionate for AI, ML, Generative AI, Agentic AI, and Cybersecurity. Co-developed Galaxy PowerAI – a proactive on-device AI guardian for Android – recognized as a Top 5 Finalist at the Samsung EnnovateX 2025 AI Challenge. Aims to build secure, robust, and human-centric AI solutions."
  },
  {
    name: "Madhur Prakash",
    role: "Backend & DevOps",
    bio: "Backend engineer expanded into full-stack development, designing functional, scalable, user-friendly, and secure applications. Experienced in system architecture, data modeling, and authentication systems. Focuses on building resilient, future-ready solutions that ensure both performance and data integrity."
  },
  {
    name: "Nidhi Singh",
    role: "App Developer",
    bio: "App Developer of NavSwap, focused on making electric mobility faster and more accessible. Builds intuitive mobile experiences using Flutter, translating complex systems into smooth, user-friendly applications. Passionate about creating impactful tech solutions at the intersection of AI, mobility, and real-world problem solving."
  }
];

const TeamList = () => {
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
