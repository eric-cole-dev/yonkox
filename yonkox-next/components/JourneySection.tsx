"use client";

import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";

export default function JourneySection() {
  return (
    <section
      id="journey"
      className="relative z-10 py-20 md:py-32 bg-[var(--surface)]/50 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
      }}
    >
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      ></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.slow }}
          className="font-display font-bold text-4xl md:text-5xl uppercase text-[var(--foreground)] mb-16 md:mb-24 text-center tracking-tighter"
        >
          The Evolution: Our Journey
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop timeline (center) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2 hidden md:block"></div>
          {/* Mobile timeline (left side) */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-primary/20 md:hidden"></div>
          <div className="space-y-6 md:space-y-16 lg:space-y-24 relative z-10">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative"
            >
              {/* Mobile: Dot indicator on left */}
              <div className="absolute left-0 top-0 w-8 h-8 md:hidden flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-[var(--background)]" />
              </div>

              <div className="pl-12 md:pl-0 md:w-1/2 md:pr-20 text-left md:text-right w-full">
                <span className="text-primary font-mono text-xs tracking-wider mb-2 block md:hidden">
                  Established 2026
                </span>
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  Origins: Kuala Lumpur
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  The birth of Yonko X in Malaysia. Establishing the hybrid
                  methodology that merges engineering with elite stunt culture.
                </p>
              </div>

              {/* Desktop: Center dot */}
              <div className="hidden md:block w-4 h-4 rounded-full bg-primary border-4 border-[var(--background)] z-20 shadow-md"></div>

              <div className="hidden md:block md:w-1/2 md:pl-20 text-left">
                <span className="font-mono text-primary text-sm font-bold uppercase tracking-widest">
                  Established 2026
                </span>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.1 }}
              className="flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-0 relative"
            >
              {/* Mobile: Dot indicator on left */}
              <div className="absolute left-0 top-0 w-8 h-8 md:hidden flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--background)] border-2 border-primary shadow-glow" />
              </div>

              <div className="pl-12 md:pl-0 md:w-1/2 md:pl-20 text-left w-full">
                <span className="text-primary font-mono text-xs tracking-wider mb-2 block md:hidden">
                  Current Active
                </span>
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  Local Workshop Milestone
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  Launching bi-weekly local workshops in KL, deconstructing the
                  mechanics of stunting for the growing Malaysian community.
                </p>
              </div>

              {/* Desktop: Center dot */}
              <div className="hidden md:block w-6 h-6 rounded-full bg-[var(--background)] border-4 border-primary z-20 shadow-glow"></div>

              <div className="hidden md:block md:w-1/2 md:pr-20 text-right">
                <span className="font-mono text-primary text-sm font-bold uppercase tracking-widest">
                  Current Active
                </span>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative"
            >
              {/* Mobile: Dot indicator on left */}
              <div className="absolute left-0 top-0 w-8 h-8 md:hidden flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[var(--foreground)]/20 border-2 border-[var(--background)]" />
              </div>

              <div className="pl-12 md:pl-0 md:w-1/2 md:pr-20 text-left md:text-right w-full">
                <span className="text-[var(--foreground)] opacity-40 font-mono text-xs tracking-wider mb-2 block md:hidden">
                  Upcoming 2025
                </span>
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  International Clinics
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  Upcoming major summits in Malaysia twice a year, inviting
                  world-class athletes to our home turf.
                </p>
              </div>

              {/* Desktop: Center dot */}
              <div className="hidden md:block w-4 h-4 rounded-full bg-[var(--foreground)]/20 border-4 border-[var(--background)] z-20"></div>

              <div className="hidden md:block md:w-1/2 md:pl-20 text-left">
                <span className="font-mono text-[var(--foreground)] opacity-40 text-sm font-bold uppercase tracking-widest">
                  Upcoming 2025
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
