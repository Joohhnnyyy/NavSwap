import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  website?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Toshiyuki Hashimoto",
    role: "Creative Producer / Director",
    bio: "Founder of the creative studio \"aircord\". Launched \"The Shift\" in 2020, blurring the boundaries between technology, design, science, and creativity. Has won numerous awards, including Cannes Lions, iF Design, D&AD, and One Show. Has worked on a range of projects, such as opening event of Japan’s New National Stadium ”ONE RACE”, Nissan's concept car, the \"NISSAN IMx Demonstrator Experience\", the NYC MoMA \"Talk to Me\". Lives in Tokyo."
  },
  {
    name: "Jiyu Park",
    role: "Creative Junior / Art Director",
    bio: "Joined The Shift in 2020 and studied Lifestyle Transformation Design at Willem de Kooning Academy in the Netherlands. Focuses on creating concepts of projects as well as translating the concept into a visualization through various mediums. Has participated in exhibitions in Natuurhistorisch Museum Rotterdam and Het Nieuwe Instituut as well as designing The Shift Book for The Shift. Lives in Busan, Korea."
  },
  {
    name: "Mika Hirata",
    role: "Junior Designer",
    bio: "Joined The Shift in 2021 and is a graduate of OCAD University in Toronto. Primarily focuses in the research and 3D modeling/animation. Constantly trying to evolve visual design skills and integrate them with technical methods of problem solving and understanding. Has worked with Maple Leafs Sports and Entertainment as a Jr.Designer and C(group as a graphic design intern. Lives in Toronto.",
    website: "https://www.mikahirata.com/"
  },
  {
    name: "YIFAN ZHUANG",
    role: "Interaction Designer / Researcher",
    bio: "Joined the Shift in 2022. Received her Master’s degree in Human-Computer Interaction(HCI) at the Graduate School of Media Design, Keio University. With intense curiosity about Existentialism and digital physics, she started her journey of exploring the boundaries between what is Real and Virtual as an interaction designer and HCI researcher. Her wearable emotive device — Emolleia was accepted by the international conference TEI 2022. Lives in Tokyo.",
    website: "https://yifanzhuang.com/"
  },
  {
    name: "Shoya Dozono",
    role: "Interaction Designer / Researcher",
    bio: "Joined The Shift in 2022. IAMAS Graduate. Working in cross-disciplinary design and research using data, algorithms, and machine learning. Recent projects include video design for Ms. Lauryn Hill concerts, a project with Hiromasa Fukaji called 4D DRAWING, and Quasicrystal, an R&D project with Kyoto-based textile company HOSOO. Recipient of numerous awards including those from Ars Electronica and the Japan Media Arts Festival. Lives in Tokyo.",
    website: "https://shoyadozono.com/"
  },
  {
    name: "Maho Ishizaka",
    role: "Composer",
    bio: "Studied at Tokyo University of the Arts, received her bachelor's and master's degrees in composition. As part of the process of composition and sound production, she explores the possibility of using AI to assist humans and expand their capabilities. Her goal is to create sounds that harmonize with the images of visuals and other content. In addition to composing and arranging music, she also performs and teaches music. 2018-20: Teaching and Research Assistant, Department of Composition, Faculty of Music, Tokyo University of the Arts. Lives in São Paulo."
  },
  {
    name: "Kai Couts",
    role: "Intern",
    bio: "Studied design at Chiba University. Joined The Shift in 2023 as an intern. Assisting in various creative research and production tasks while exploring the intersection of traditional craftsmanship and digital workflows."
  },
  {
    name: "Giulia Principe",
    role: "Interaction Designer",
    bio: "Giulia Principe, born in Naples, lived in the UK to study Filmmaking, then moved to Amsterdam where she graduated Game Design at SAE Institute. Currently working as a VFX and post production lecturer at United POP Academy, as a freelance designer and VR Operator at EYE Filmmuseum. Giulia’s work explores the relationship between analog and digital graphics, from photography to interactive animation, coding and 3D printing. Co-founder of Xposed Lab Studio at NDSM Treehouse. Collaborated with The Shift in BorderLESS"
  }
];

const TeamList = () => {
  return (
    <section className="bg-[#F1F1F1] pb-24 lg:pb-40">
      <div className="container">
        {/* Title Spacing */}
        <div className="h-[15vh]"></div>

        {/* Massive Vertical/Large Team Heading */}
        <div className="overflow-hidden mb-12 lg:mb-20">
          <h2 className="font-hero-sans text-foreground leading-[0.8] tracking-[-0.03em] uppercase transition-transform duration-1000 ease-out">
            <span className="block">TEAM</span>
          </h2>
        </div>

        {/* Section Divider with (04) label style as per design patterns */}
        <div className="relative w-full mb-12 lg:mb-20">
          <div className="h-[1px] w-full bg-black/100"></div>
          <div className="absolute top-2 right-0 font-ui-label text-[10px] flex items-center">
            <span className="opacity-40">(</span>
            <span className="px-0.5">04</span>
            <span className="opacity-40">)</span>
          </div>
        </div>

        {/* Team List */}
        <div className="w-full">
          <ul className="flex flex-col">
            {teamMembers.map((member, index) => (
              <li key={index} className="group border-b border-black/100">
                <div className="grid grid-cols-1 lg:grid-cols-12 py-10 lg:py-16 gap-y-6 lg:gap-y-0">
                  {/* Left Column: Name */}
                  <div className="lg:col-span-4">
                    <h3 className="text-[24px] lg:text-[28px] font-sans font-medium uppercase tracking-tight leading-tight">
                      {member.name}
                    </h3>
                  </div>

                  {/* Right Column: Role and Bio */}
                  <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 lg:max-w-2xl lg:ml-auto xl:ml-0">
                    {/* Role */}
                    <div className="text-[12px] lg:text-[13px] font-sans uppercase font-medium tracking-wide">
                      {member.role}
                    </div>

                    {/* Bio */}
                    <div className="text-[15px] lg:text-[16px] font-sans leading-relaxed text-foreground/90 font-normal">
                      <p>
                        {member.bio}
                        {member.website && (
                          <a 
                            href={member.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center ml-2 border-b border-black hover:opacity-50 transition-opacity"
                          >
                            →Website
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
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