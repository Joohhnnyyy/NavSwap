import React from 'react';
import Image from 'next/image';

const AboutGallery = () => {
  const galleryImages = [
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/0915_aircord_raw74751-1200x800_jpg-1.webp",
      alt: "Creative office environment with technical equipment",
      width: 1200,
      height: 800,
      className: "col-span-12 md:col-span-8 aspect-[3/2]"
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/Screenshot-2021-09-02-at-18_44_12-1200x803_jpg-2.webp",
      alt: "Team member portrait or creative work shot",
      width: 1200,
      height: 803,
      className: "col-span-12 md:col-span-4 aspect-[4/5] object-cover"
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/211206_0247-1200x1053_jpg-3.webp",
      alt: "Research and project visualization",
      width: 1200,
      height: 1053,
      className: "col-span-12 md:col-span-6 aspect-square md:aspect-[4/3.5]"
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6bc7a0c9-6ab9-43bc-bc40-41f533897bdc-theshift-tokyo/assets/images/20190520_170541-1-1200x900_jpg-4.webp",
      alt: "Collaborative studio space",
      width: 1200,
      height: 900,
      className: "col-span-12 md:col-span-6 aspect-square md:aspect-[4/3]"
    }
  ];

  return (
    <section className="section section-gallery py-[15vh]" data-scroll-section>
      <div className="container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end border-b border-black pb-4">
            <h2 className="text-[1.5rem] font-bold tracking-[0.1em] uppercase font-sans">
              GALLERY
            </h2>
            <div className="text-[10px] font-medium tracking-[0.1em] font-sans flex items-center">
              <span className="mr-1">(</span>
              <span>03</span>
              <span className="ml-1">)</span>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-12 gap-10 md:gap-x-10 md:gap-y-20">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`${image.className} relative overflow-hidden group`}
            >
              <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="object-cover w-full h-full"
                  priority={index < 2}
                />
              </div>
              
              {/* Subtle Overlay or numbering could go here if present in original, 
                  but based on screenshots and structure, it's clean */}
            </div>
          ))}
        </div>

        {/* Additional Grid Context - As per the "About" structure observed in other clones */}
        <div className="mt-20 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="h-[1px] w-full bg-black mb-8" />
            <p className="text-[10px] uppercase tracking-widest font-medium opacity-60">
              Creative Collective Portfolio
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 text-[1rem] leading-[1.8] font-sans">
            <p className="max-w-[600px]">
              Capturing moments of synthesis between design and technology. 
              Our gallery showcases the physical and digital environments where THE SHIFT manifests through rigorous research and collaborative experimentation.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .section-gallery {
          background-color: #F1F1F1;
        }
        
        @media (max-width: 768px) {
          .section-gallery {
            padding: 80px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutGallery;