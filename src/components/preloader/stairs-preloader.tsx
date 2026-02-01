"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function StairsPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Total duration logic:
    // 1. Mount (instant)
    // 2. Text Visible (stay for ~2s)
    // 3. Trigger Exit (loading -> false)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <>
          {/* Text Container */}
          <motion.div
            key="preloader-text"
            className="fixed inset-0 z-[50001] flex items-center justify-center text-foreground pointer-events-none bg-background"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: "blur(10px)", 
              transition: { duration: 0.5, ease: "easeInOut" } 
            }}
          >
            <div className="relative w-100 h-50">
              <Image 
                src="/black_logo.png" 
                alt="NavSwap" 
                fill
                className="object-contain dark:hidden"
                priority
              />
              <Image 
                src="/white_logo.png" 
                alt="NavSwap" 
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </motion.div>

          {/* Stairs Background Container */}
          <motion.div
            key="preloader-bars"
            className="fixed inset-0 z-[50000] flex"
            // We need to keep this container in the DOM while children animate
            // AnimatePresence will wait for this component's exit to finish.
            // By defining variants on children and using staggerChildren (optional), we ensure flow.
            // But explicitly, if this div is removed, children are removed.
            // So we make this a motion.div that persists.
            exit={{ transition: { staggerChildren: 0.1 } }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`stair-${i}`}
                className="h-full flex-1 bg-black relative"
                style={{ backgroundColor: "white" }} // Force solid black
                initial={{ y: 0 }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.4 + (i * 0.1) // Manual delay to sync with text blur
                  }
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
