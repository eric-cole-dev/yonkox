"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import type { LocalWorkshopConfig } from "@/lib/workshops-config";

interface WorkshopVisionMissionProps {
  visionMission: LocalWorkshopConfig['visionMission'];
}

export default function WorkshopVisionMission({ visionMission }: WorkshopVisionMissionProps) {
  return (
    <section className="w-full bg-[var(--surface)] py-24 md:py-32 border-t border-[var(--neutral-900)]/5">
      <div className="container mx-auto max-w-[1200px] px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="mb-16 text-center"
        >
          <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)] mb-6">
            {visionMission.headline}
          </h2>
          <p className="text-[var(--foreground)] opacity-70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {visionMission.introduction}
          </p>
        </motion.div>

        {/* Structured Progression */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal }}
          className="mb-16 border border-[var(--neutral-900)]/10 bg-[var(--background)] p-8 md:p-12"
        >
          <h3 className="font-display font-bold text-3xl uppercase text-[var(--foreground)] mb-4">
            {visionMission.methodology.title}
          </h3>
          <p className="text-[var(--foreground)] opacity-70 mb-8 leading-relaxed">
            {visionMission.methodology.description}
          </p>

          {/* Example Progression */}
          <div className="bg-[var(--foreground)]/5 p-6 md:p-8 border-l-4 border-primary">
            <h4 className="font-display font-bold text-xl uppercase text-primary mb-6">
              {visionMission.methodology.example.title}
            </h4>
            <div className="space-y-6">
              {visionMission.methodology.example.sessions.map((session, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary text-white font-display font-bold flex items-center justify-center text-sm">
                      {session.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-display font-bold text-lg text-[var(--foreground)] mb-1">
                      {session.title}
                    </h5>
                    <p className="text-[var(--foreground)] opacity-60 text-sm mb-2">
                      {session.content}
                    </p>
                    <p className="text-primary text-xs font-mono tracking-wider">
                      Prerequisite: {session.prerequisite}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Clear Entry Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal * 2 }}
            className="border border-[var(--neutral-900)]/10 bg-[var(--background)] p-8"
          >
            <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-4">
              {visionMission.entryPoints.title}
            </h3>
            <p className="text-[var(--foreground)] opacity-70 mb-4 leading-relaxed">
              {visionMission.entryPoints.description}
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-4 mt-4">
              <p className="text-[var(--foreground)] text-sm italic">
                {visionMission.entryPoints.exampleExpectation}
              </p>
            </div>
          </motion.div>

          {/* Focused Learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal * 3 }}
            className="border border-[var(--neutral-900)]/10 bg-[var(--background)] p-8"
          >
            <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-4">
              {visionMission.sessionFormat.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <div>
                  <span className="font-bold text-[var(--foreground)]">Duration:</span>{' '}
                  <span className="text-[var(--foreground)] opacity-70">{visionMission.sessionFormat.duration}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">•</span>
                <div>
                  <span className="font-bold text-[var(--foreground)]">Structure:</span>{' '}
                  <span className="text-[var(--foreground)] opacity-70">{visionMission.sessionFormat.structure}</span>
                </div>
              </div>
              <div className="bg-[var(--foreground)]/5 p-4 mt-4">
                <p className="text-[var(--foreground)] opacity-80 text-sm leading-relaxed">
                  {visionMission.sessionFormat.takeaway}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Current Offerings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal * 4 }}
          className="text-center border-t border-[var(--neutral-900)]/10 pt-16"
        >
          <h3 className="font-display font-bold text-3xl uppercase text-[var(--foreground)] mb-4">
            {visionMission.currentOfferings.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {visionMission.currentOfferings.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary text-white px-6 py-3 font-display font-bold text-sm uppercase tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-[var(--foreground)] opacity-60 text-sm max-w-2xl mx-auto">
            {visionMission.currentOfferings.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
