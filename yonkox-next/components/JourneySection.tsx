"use client";

import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";

export default function JourneySection() {
  return (
    <section id="journey" className="py-32 bg-[var(--surface)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.slow }}
          className="font-display font-bold text-5xl uppercase text-[var(--foreground)] mb-24 text-center tracking-tighter"
        >
          The Saga: Our Journey
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-24 relative z-10">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal }}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-0"
            >
              <div className="md:w-1/2 md:pr-20 md:text-right">
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  Origins: Kuala Lumpur
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  The birth of Yonko X in Malaysia. Establishing the hybrid
                  methodology that merges engineering with elite stunt culture.
                </p>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-[var(--background)] z-20 shadow-md"></div>
              <div className="md:w-1/2 md:pl-20">
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
              className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-0"
            >
              <div className="md:w-1/2 md:pl-20">
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  Local Workshop Milestone
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  Launching bi-weekly local workshops in KL, deconstructing the
                  mechanics of stunting for the growing Malaysian community.
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[var(--background)] border-4 border-primary z-20 shadow-glow"></div>
              <div className="md:w-1/2 md:pr-20 md:text-right">
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
              className="flex flex-col md:flex-row items-center gap-12 md:gap-0"
            >
              <div className="md:w-1/2 md:pr-20 md:text-right">
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase mb-2">
                  International Clinics
                </h4>
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed font-light">
                  Upcoming major summits in Malaysia twice a year, inviting
                  world-class athletes to our home turf.
                </p>
              </div>
              <div className="w-4 h-4 rounded-full bg-[var(--foreground)]/20 border-4 border-[var(--background)] z-20"></div>
              <div className="md:w-1/2 md:pl-20">
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
