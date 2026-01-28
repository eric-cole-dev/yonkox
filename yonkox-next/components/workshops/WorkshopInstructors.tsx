"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Image from "next/image";
import type { WorkshopInstructor } from "@/lib/workshops-config";

interface WorkshopInstructorsProps {
  instructors: WorkshopInstructor[];
}

export default function WorkshopInstructors({ instructors }: WorkshopInstructorsProps) {
  return (
    <section className="w-full bg-[var(--background)] py-24 md:py-32 border-t border-[var(--neutral-900)]/5">
      <div className="container mx-auto max-w-[1440px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="mb-16"
        >
          <span className="font-display text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Meet the Team
          </span>
          <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)]">
            Your Instructors
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: DURATION.sectionReveal,
                ease: EASING.smooth,
                delay: index * STAGGER.normal
              }}
              className="group"
            >
              <div className="relative aspect-square mb-6 overflow-hidden border border-[var(--neutral-900)]/10 bg-[var(--surface)]">
                {instructor.photo ? (
                  <Image
                    src={instructor.photo}
                    alt={instructor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  // Placeholder profile icon (Facebook-style)
                  <div className="w-full h-full flex items-center justify-center bg-[var(--foreground)]/5">
                    <svg
                      className="w-24 h-24 text-[var(--foreground)] opacity-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-2">
                {instructor.name}
              </h3>
              <p className="text-primary font-mono text-xs tracking-wider mb-3">
                {instructor.title}
              </p>
              {instructor.bio && (
                <p className="text-[var(--foreground)] opacity-60 text-sm leading-relaxed">
                  {instructor.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
