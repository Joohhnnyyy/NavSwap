import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ResearchSolutions: React.FC = () => {
  return (
    <section className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Problem Solving Taglines */}
        <div className="mb-24 flex flex-col items-center text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-light tracking-tight"
          >
            Redefining Urban Mobility Infrastructure
          </motion.h2>
          
          <div className="max-w-3xl space-y-4">
             <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-sans font-light text-muted-foreground"
            >
              Solving the fragmentation of energy distribution through AI-driven synchronization.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-sans font-light text-muted-foreground"
            >
              Eliminating range anxiety with predictive battery availability and smart routing.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl font-sans font-light text-muted-foreground"
            >
              Transforming static charging stations into dynamic, responsive energy nodes.
            </motion.p>
          </div>
        </div>

        {/* Solutions: NavSwap App & Business */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* NavSwap App */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8 p-8 rounded-3xl bg-zinc-900 border border-zinc-800"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
               {/* Assuming white logo for dark background/App */}
               <Image 
                src="/white_logo.png" 
                alt="NavSwap App Logo" 
                width={256} 
                height={256}
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-serif text-white tracking-wide">NavSwap App</h3>
              <p className="text-zinc-400 font-sans text-sm tracking-widest uppercase">For Drivers & Commuters</p>
              <p className="text-zinc-500 font-sans text-sm pt-2 max-w-xs mx-auto">
                Real-time station availability, route optimization, and seamless swap payments.
              </p>
            </div>
          </motion.div>

          {/* NavSwap Business */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8 p-8 rounded-3xl bg-white border border-zinc-200"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
               {/* Black logo for white background/Business */}
               <Image 
                src="/black_logo.png" 
                alt="NavSwap Business Logo" 
                width={256} 
                height={256}
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-serif text-black tracking-wide">NavSwap Business</h3>
              <p className="text-zinc-500 font-sans text-sm tracking-widest uppercase">For Fleet Operators</p>
              <p className="text-zinc-600 font-sans text-sm pt-2 max-w-xs mx-auto">
                Fleet management, energy consumption analytics, and priority access control.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ResearchSolutions;
