"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 border-b border-[var(--neutral-900)]/5 bg-white dark:bg-[var(--background)]">
      {/* Background Images */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
            src="/light-hero-bg.png" 
            alt="Hero Background Light" 
            fill 
            className="object-cover block dark:hidden"
            priority
        />
        <Image 
            src="/dark-hero-bg.png" 
            alt="Hero Background Dark" 
            fill 
            className="object-cover hidden dark:block"
            priority
        />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-white/10 dark:from-transparent dark:to-black/40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center gap-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASING.smooth }}
          className="flex items-center gap-6 mb-2"
        >
          <div className="h-[1px] w-12 bg-primary"></div>
          <p className="font-display text-xs tracking-[0.5em] uppercase text-primary font-bold">
            YONKO X MALAYSIA
          </p>
          <div className="h-[1px] w-12 bg-primary"></div>
        </motion.div>

        <h1 className="font-display font-bold text-7xl md:text-[10rem] tracking-tighter uppercase leading-[0.85] text-[var(--foreground)] drop-shadow-sm flex flex-col items-center">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: DURATION.heroReveal, ease: EASING.smooth }}
              className="block"
            >
              Defy
            </motion.span>
          </div>
          <div className="relative inline-block px-2">
            <div className="italic font-light text-[var(--foreground)] relative z-10 flex">
              {"Gravity".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASING.smooth,
                    delay: STAGGER.loose + (i * 0.08)
                  }}
                  className="inline-block pr-[0.15em] -mr-[0.1em]" // Fix for italic clipping
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                delay: STAGGER.loose + 0.4, 
                duration: 0.8, 
                ease: EASING.smooth 
              }}
              className="absolute left-[-5%] bottom-[5px] w-[110%] h-[18px] bg-primary -z-0 origin-left"
              style={{
                transform: "rotate(-1.2deg) skewX(-10deg)",
                clipPath: "polygon(2% 10%, 98% 0%, 100% 85%, 5% 100%, 0% 50%)",
                opacity: 0.9
              }}
            />
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: DURATION.slow }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="font-display text-xl md:text-2xl font-bold tracking-[0.1em] text-[var(--foreground)] uppercase">
            Malaysia's Premier Stunt Collective.
          </p>
          <p className="font-body text-sm tracking-[0.3em] text-primary uppercase font-semibold opacity-90">
            Specialized Technical Workshops & International Athlete Summits
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: DURATION.normal }}
          className="mt-16"
        >
          <a href="#lab" className="inline-block bg-[var(--foreground)] text-[var(--background)] font-display font-bold text-sm uppercase px-14 py-5 hover:bg-primary hover:text-white transition-all tracking-widest shadow-elegant hover:shadow-lg transform hover:-translate-y-1 duration-300">
            Enter The Lab
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4 z-20">
        <span className="vertical-text font-display text-[10px] uppercase tracking-widest text-primary font-bold">
          Operational
        </span>
        <div className="h-16 w-[1px] bg-primary"></div>
      </div>
    </section>
  );
}
