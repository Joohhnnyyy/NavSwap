import React from 'react';
import Image from 'next/image';

const AboutGallery = () => {
  const galleryImages: {
    url: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }[] = [];

  return (
    <section className="section section-gallery py-[15vh] bg-secondary text-secondary-foreground" data-scroll-section>
      <div className="container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end border-b border-foreground pb-4">
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

        {/* Image Grid - Empty as requested */}
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
            </div>
          ))}
        </div>

        {/* Additional Grid Context */}
        <div className="mt-20 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="h-[1px] w-full bg-foreground mb-8" />
            <p className="text-[10px] uppercase tracking-widest font-medium opacity-60">
              NavSwap Infrastructure Portfolio
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 text-[1rem] leading-[1.8] font-sans">
            <p className="max-w-[600px]">
              Capturing the seamless integration of AI and energy. Our platform manifests through rigorous data analysis and infrastructure optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGallery;