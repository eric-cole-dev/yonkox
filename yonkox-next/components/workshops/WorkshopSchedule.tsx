"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";

interface WorkshopScheduleProps {
  schedule: {
    day1: { title: string; description: string; timeSlots?: Array<{time: string; activity: string}> };
    day2: { title: string; description: string; timeSlots?: Array<{time: string; activity: string}> };
  };
}

export default function WorkshopSchedule({ schedule }: WorkshopScheduleProps) {
  return (
    <section className="w-full bg-[var(--surface)] py-24 md:py-32 border-t border-[var(--neutral-900)]/5">
      <div className="container mx-auto max-w-[1440px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="mb-16"
        >
          <span className="font-display text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            2-Day Format
          </span>
          <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)]">
            Workshop Schedule
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal }}
            className="border border-[var(--neutral-900)]/10 bg-[var(--background)] p-8 md:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary text-white font-display font-bold text-2xl w-16 h-16 flex items-center justify-center">
                01
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-2">
                  {schedule.day1.title}
                </h3>
                <p className="text-[var(--foreground)] opacity-60 text-sm">
                  {schedule.day1.description}
                </p>
              </div>
            </div>

            {schedule.day1.timeSlots && schedule.day1.timeSlots.length > 0 && (
              <div className="space-y-4 mt-6 pl-20">
                {schedule.day1.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-primary tracking-wider whitespace-nowrap">
                      {slot.time}
                    </span>
                    <span className="text-[var(--foreground)] opacity-70 text-sm">
                      {slot.activity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Day 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal * 2 }}
            className="border border-[var(--neutral-900)]/10 bg-[var(--background)] p-8 md:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-[var(--foreground)] text-[var(--background)] font-display font-bold text-2xl w-16 h-16 flex items-center justify-center">
                02
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-2">
                  {schedule.day2.title}
                </h3>
                <p className="text-[var(--foreground)] opacity-60 text-sm">
                  {schedule.day2.description}
                </p>
              </div>
            </div>

            {schedule.day2.timeSlots && schedule.day2.timeSlots.length > 0 && (
              <div className="space-y-4 mt-6 pl-20">
                {schedule.day2.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-primary tracking-wider whitespace-nowrap">
                      {slot.time}
                    </span>
                    <span className="text-[var(--foreground)] opacity-70 text-sm">
                      {slot.activity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
