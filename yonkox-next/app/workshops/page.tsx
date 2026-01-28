"use client";

import { WORKSHOPS } from "@/lib/workshops-config";
import type { LocalWorkshopConfig } from "@/lib/workshops-config";
import LocalWorkshopForm from "@/components/workshops/forms/LocalWorkshopForm";
import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Link from "next/link";
import Image from "next/image";
import { HeroSectionGradient, FixedGradientBackground } from "@/components/ui/hero-section-gradient";

export default function LocalWorkshopsPage() {
  const workshop = WORKSHOPS['local'] as LocalWorkshopConfig;

  if (!workshop || !workshop.active) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]/50">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold uppercase text-[var(--foreground)] mb-4">
            Coming Soon
          </h1>
          <p className="text-[var(--foreground)] opacity-60">
            Local workshops information will be available soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <FixedGradientBackground
        distortion={0.9}
        swirl={0.7}
        speed={0.4}
        veilOpacity="bg-white/30 dark:bg-black/20"
      />
      <main className="min-h-screen bg-[var(--background)]/50">
        {/* Hero Section with Gradient Background */}
        <HeroSectionGradient className="pt-24 pb-12">
        <div className="container mx-auto px-8 relative z-[100] flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.fast, ease: EASING.smooth }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-8 bg-[var(--accent-primary)]"></span>
            <span className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.4em]">
              {workshop.schedule.frequency} Workshops
            </span>
            <span className="h-px w-8 bg-[var(--accent-primary)]"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.heroReveal, ease: EASING.smooth, delay: STAGGER.tight }}
            className="font-display font-bold text-[8vw] leading-[0.9] uppercase tracking-tighter mb-8 text-[var(--foreground)]"
          >
            Local Circuit<br />Workshops
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: STAGGER.normal }}
            className="max-w-xl"
          >
            <p className="text-xl md:text-2xl font-light italic text-[var(--foreground)]/70 mb-12">
              &ldquo;{workshop.currentFocus}&rdquo;
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="h-20 w-px bg-[var(--accent-primary)]/30"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--accent-primary)]">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>
      </HeroSectionGradient>

      {/* Methodology Section - Structured Progression */}
      <section
        className="relative z-10 py-32 border-y border-black/5 dark:border-white/5 bg-white/60 dark:bg-[var(--surface)]/60"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          }}
        ></div>
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="space-y-8"
          >
            <span className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.3em] block">
              Our Methodology
            </span>
            <h2 className="font-display font-bold text-5xl uppercase tracking-tighter leading-none">
              Structured<br />Progression
            </h2>
            <div className="editorial-line w-24"></div>
            <p className="text-lg text-[var(--foreground)]/70 leading-relaxed font-light max-w-lg">
              {workshop.visionMission.vision}
            </p>
            <p className="text-sm text-[var(--foreground)]/50 leading-relaxed max-w-md uppercase tracking-wider font-medium">
              Based in {workshop.location}, open to athletes looking to bridge the gap between foundation and elite mastery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.tight }}
            className="relative pl-12"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5"></div>
            <div className="space-y-16">
              {[
                { title: "Technical Foundations", description: "The physics of the load and weight distribution." },
                { title: "Vertical Acceleration", description: "Explosive power transfer and timing precision." },
                { title: "Stability Cycles", description: "Center-of-mass control and grip refinement." },
                { title: "Advanced Variations", description: "Application to complex elite transitions." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: index * STAGGER.tight }}
                  className="relative flex items-start gap-8 group"
                >
                  <span className="font-display font-bold text-4xl text-[var(--accent-primary)]/20 group-hover:text-[var(--accent-primary)] transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-lg uppercase mb-2">{item.title}</h4>
                    <p className="text-sm text-[var(--foreground)]/60 font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Dynamics Section */}
      <section
        className="relative z-10 py-32 bg-[var(--background)]/50"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div className="container mx-auto px-8 mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="font-display font-bold text-4xl uppercase mb-4 tracking-tighter"
          >
            Workshop Dynamics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: STAGGER.tight }}
            className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            Consistency is the secret to height
          </motion.p>
        </div>

        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="bg-white/60 dark:bg-[var(--surface)]/60 border border-black/10 dark:border-white/10 p-12 shadow-sm relative group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="absolute top-0 right-0 p-6">
              <span className="font-display text-4xl font-black text-[var(--accent-primary)]/20 group-hover:text-[var(--accent-primary)] transition-colors">01</span>
            </div>
            <h3 className="font-display font-bold text-2xl uppercase mb-6 tracking-tight">When We Meet</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-4">
                <span className="text-xs uppercase font-bold text-[var(--foreground)]/40 tracking-widest">Time</span>
                <span className="text-sm font-bold">{workshop.schedule.timeSlots[0]?.time || "14:00 — 16:00 (Saturdays)"}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-4">
                <span className="text-xs uppercase font-bold text-[var(--foreground)]/40 tracking-widest">Frequency</span>
                <span className="text-sm font-bold">{workshop.schedule.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs uppercase font-bold text-[var(--foreground)]/40 tracking-widest">Location</span>
                <span className="text-sm font-bold">{workshop.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.tight }}
            className="bg-white/60 dark:bg-[var(--surface)]/60 border border-black/10 dark:border-white/10 p-12 shadow-sm relative group hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="absolute top-0 right-0 p-6">
              <span className="font-display text-4xl font-black text-[var(--accent-primary)]/20 group-hover:text-[var(--accent-primary)] transition-colors">02</span>
            </div>
            <h3 className="font-display font-bold text-2xl uppercase mb-6 tracking-tight">The 15-Minute Drill</h3>
            <p className="text-sm text-[var(--foreground)]/70 leading-relaxed mb-6">
              Every workshop starts with our signature &apos;Technical Primer&apos;. 15 minutes of hyper-focused repetition on a single micro-movement.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></span>
                Isolated Muscle Activation
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></span>
                Proprioceptive Mapping
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></span>
                High-Frequency Correction
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Stunt Specialists Section */}
      <section
        className="relative z-10 py-32 bg-white/60 dark:bg-[var(--surface)]/60"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          }}
        ></div>
        <div className="container mx-auto px-8 mb-20 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.fast, ease: EASING.smooth }}
            className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block"
          >
            Instructional Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="font-display font-bold text-5xl uppercase tracking-tighter"
          >
            Stunt Specialists
          </motion.h2>
        </div>

        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {workshop.instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: index * STAGGER.tight }}
              className="group text-center"
            >
              <div className="aspect-[4/5] bg-[var(--surface)] mb-8 overflow-hidden border border-black/5 dark:border-white/5 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                {instructor.imageUrl ? (
                  <Image
                    src={instructor.imageUrl}
                    alt={instructor.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--neutral-200)] text-[var(--foreground)]/20 text-6xl font-display font-bold">
                    {instructor.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/10 transition-all duration-500"></div>
              </div>
              <h4 className="font-display font-bold text-xl uppercase mb-1">{instructor.name}</h4>
              <p className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-widest">
                {instructor.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration Form Section */}
      <section
        className="relative z-10 py-32 bg-[var(--background)]/50 border-t border-black/5 dark:border-white/5"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div className="container mx-auto px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl uppercase mb-6 tracking-tighter">
              Secure Your Spot
            </h2>
            <p className="text-[var(--foreground)]/60 font-light">
              Join the next cycle of the Local Circuit Workshops. Limited capacity per session for maximum technical oversight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal }}
          >
            <LocalWorkshopForm sheetName={workshop.sheetName} termsUrl={workshop.termsUrl} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 bg-white/60 dark:bg-[var(--surface)]/60 border-t border-black/5 dark:border-white/5"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 100%)"
        }}
      >
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--foreground)]/40">
            © 2026 Yonko X Collective
          </div>
          <div className="flex gap-8">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Home
            </Link>
            <Link href={workshop.termsUrl} className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
