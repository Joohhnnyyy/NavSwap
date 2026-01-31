import React from 'react';
import Image from 'next/image';

interface ResearchItemProps {
  year: string;
  index: string;
  title: string;
  description?: string;
  images: {
    src: string;
    alt: string;
    x: number; // grid column start (1-24)
    y: number; // grid row offset
    w: number; // grid width (columns)
    h: number; // grid height (units)
    speed: number; // parallax speed
    position: 'left' | 'right';
  }[];
  isReversed?: boolean;
}

const ResearchItem: React.FC<ResearchItemProps> = ({
  year,
  index,
  title,
  description,
  images,
}) => {
  return (
    <section className="section section-research mb-[200px] md:mb-[300px]">
      <div className="container">
        {/* Section Header with Divider Line */}
        <div className="section-title mb-12">
          <h2 className="font-ui text-[12px] mb-4 tracking-[0.15em]">{title}</h2>
          <div className="hairline-divider">
            <span className="font-stats text-[10px] left-0 absolute ml-[-10px] bg-secondary px-[10px]">
              {year}
            </span>
            <span className="font-stats text-[10px] right-0 absolute mr-[-10px] bg-secondary px-[10px] parentheses">
              <span className="n">{index}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="relative pt-20">
          {/* Parallax Title Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none mix-blend-difference"
            style={{ transform: 'translateY(20%)' }}
          >
            <h2 className="font-hero text-fluid-section text-center text-foreground whitespace-pre-line leading-none">
              {title}
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-24 gap-4 min-h-[600px] relative">
            {images.map((img, i) => (
              <div
                key={i}
                className={`col-start-${img.x} col-span-${img.w} relative`}
                style={{ 
                  marginTop: `${img.y * 2}rem`,
                  zIndex: i === 1 ? 5 : 0
                }}
              >
                <div 
                  className="parallax-element overflow-hidden bg-muted"
                  style={{ 
                    aspectRatio: `${img.w}/${img.h}`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}

            {/* Editorial Lead Box (Optional) */}
            {description && (
              <div className="col-start-16 col-span-5 self-end mt-20">
                <div className="lead-box bg-foreground/5 p-8">
                  <p className="font-sans text-[16px] leading-[1.6] editorial-indent">
                    {description}
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <a href="#" className="group flex items-center justify-center w-12 h-12 border border-foreground hover:bg-foreground transition-colors duration-300">
                    <svg 
                      width="18" 
                      height="14" 
                      viewBox="0 0 18 14" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:stroke-background stroke-foreground transition-colors"
                    >
                      <path d="M1 7H17M17 7L11 1M17 7L11 13" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ResearchArchive() {
  const items = [
    {
      year: "2023",
      index: "03",
      title: "DIGITAL\nBIOTOPIA",
      description: "Exploring the intersection of biological systems and digital architecture through high-fidelity simulations.",
      images: [
        {
          src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/1-5x3_jpg-7.webp",
          alt: "Digital Biotopia Study 1",
          x: 10,
          y: 0,
          w: 7,
          h: 4,
          speed: 0.5,
          position: "right" as const
        },
        {
          src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/1-5x3_jpg-8.webp",
          alt: "Digital Biotopia Study 2",
          x: 16,
          y: 2,
          w: 4,
          h: 3,
          speed: 0.25,
          position: "right" as const
        },
        {
          src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/1-5x3_jpg-9.webp",
          alt: "Digital Biotopia Study 3",
          x: 5,
          y: 3,
          w: 8,
          h: 5,
          speed: 0.5,
          position: "left" as const
        }
      ]
    },
    {
      year: "2023",
      index: "04",
      title: "REMIX:\nMICRO & MACRO",
      images: [
        {
          src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/1-5x3_jpg-9.webp",
          alt: "Remix Lab 1",
          x: 4,
          y: 0,
          w: 9,
          h: 6,
          speed: -0.5,
          position: "left" as const
        },
        {
          src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/1-5x3_jpg-7.webp",
          alt: "Remix Lab 2",
          x: 14,
          y: 6,
          w: 6,
          h: 4,
          speed: 0.75,
          position: "right" as const
        }
      ],
      description: "A series of visual experiments decomposing everyday textures into abstract landscapes."
    }
  ];

  return (
    <div className="bg-secondary pt-[10vh]">
      {items.map((item, idx) => (
        <ResearchItem key={idx} {...item} />
      ))}
    </div>
  );
}