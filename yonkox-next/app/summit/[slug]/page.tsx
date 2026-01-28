"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { WORKSHOPS, getSummitWorkshops } from "@/lib/workshops-config";
import type { SummitWorkshopConfig } from "@/lib/workshops-config";
import HaileyKollinForm from "@/components/workshops/forms/HaileyKollinForm";
import GenericSummitForm from "@/components/workshops/forms/GenericSummitForm";
import SilhouetteGuestCard from "@/components/workshops/SilhouetteGuestCard";
import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Link from "next/link";
import Image from "next/image";
import { HeroSectionGradient, FixedGradientBackground } from "@/components/ui/hero-section-gradient";

interface SummitPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function SummitPage({ params }: SummitPageProps) {
  const { slug } = use(params);
  const workshop = WORKSHOPS[slug] as SummitWorkshopConfig;

  if (!workshop || workshop.type !== 'summit' || !workshop.active) {
    notFound();
  }

  const showHaileyKollinForm = workshop.formType === 'hailey-kollin';
  const showDanielBaileyContent = workshop.formType === 'generic-summit' && workshop.confirmed;
  const isHaileyKollin = slug === 'hailey-kollin';

  // Hailey & Kollin Summit - Editorial Design
  if (isHaileyKollin) {
    return (
      <>
        <FixedGradientBackground
          distortion={1.0}
          swirl={0.8}
          speed={0.45}
          veilOpacity="bg-white/25 dark:bg-black/15"
        />
        <main className="min-h-screen bg-[var(--background)]/50">
          {/* Hero Section with Gradient Background */}
          <HeroSectionGradient className="pt-32 pb-20">
          <div className="absolute inset-x-0 top-0 h-[70vh] z-0 px-4 triptych-container flex gap-4 opacity-20">
            <div className="flex-1 h-full bg-[var(--neutral-200)] overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-5tpibSE9Rr60DSOdqM4gItAo3CYzICH4lTUYj8pBDHq87XyLCR0hLjwdw-Cq9fSqPgY2aq0yB_YsQhw1PsyRxoOiDU_jy5WzfkAUa1eleLD-9kVmUddxyXizJBJgyRHq8assbqOOdxr3rfagL_S0H7yXR1pfSd4sWIK63bQvLfo0j2sQZFtjaUuOkbrIQLdZ3dIzeXlLV05QK3aj68BwkhVKAf_Qy8jax_U-wW2O9wiEcNXXDJ6FxyICnQbhIEus_X9R4dtc-pY"
                alt="Athlete 1"
                fill
                className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="flex-1 h-full bg-[var(--neutral-200)] overflow-hidden mt-12">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYt2TXuWoYQiviq2288hdibroQS-oeGECD56sl3lUf6Jf40aupx1lVW6wuR5mPK0uPmRMrboWLQ2YZsHrwM0ZsvLn2IzoJ-R_h60VvqtN2N6WPVoh0Wp7klb-N2O72J9PpHU27RsXqZIeyfgtqyLclX7W81CvdXh71AFELFFEWn1F-nGNwA6_osNQ3zgdxbQPYgaquv7yY4krsQRJWPBwP1pnJEp6UyeirKRog8ml0OezL6H70H5bIRm-CjMicGYit14nEfYyIy9g"
                alt="Athlete 2"
                fill
                className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="flex-1 h-full bg-[var(--neutral-200)] overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC85Da5KndKDpmj2I9EAPJQ1jK6qBJmSz2vh-YHrXnqLlpU30-VO49IDDcbf1h5axhwhhryR4zESctMidA1rSNaQbAyaunblJDWUyHJtrtnc04_JhEORp58qYutCpvknVi0dn_Tzbfr_JE51-_qnDpRvgqua8zYAcg4sAF6ei4iNqH5avx7jjEj5w_bQmGIO3L3M-SnI1JupCjWLu0krycB0Uo5z58YNJORvNv9TXOdKrGm1femw3WCLp0CAFn103iSwH7_0re5FQk"
                alt="Athlete 3"
                fill
                className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

          <div className="container mx-auto px-8 relative z-[100] mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.heroReveal, ease: EASING.smooth }}
              className="max-w-6xl"
            >
              <p className="text-[var(--accent-primary)] font-bold text-xs uppercase tracking-[0.6em] mb-4">
                Elite International Performance
              </p>
              <h1 className="font-display font-black text-[9vw] leading-[0.85] uppercase tracking-tighter mb-10">
                {workshop.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-12 border-t border-[var(--foreground)]/10 pt-10">
                <p className="text-2xl font-light text-[var(--foreground)]/60 max-w-xl">
                  {workshop.subtitle} <span className="text-[var(--accent-primary)] font-medium">• {workshop.date} • {workshop.location}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </HeroSectionGradient>

        {/* Overview Section - Technical Blueprint */}
        <section
          className="relative z-10 py-32 bg-white/60 dark:bg-[var(--surface)]/60"
          id="overview"
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
          <div className="container mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
                className="lg:col-span-6"
              >
                <span className="text-[var(--accent-primary)] font-extrabold text-xs uppercase tracking-[0.4em] block mb-8">
                  Technical Blueprint
                </span>
                <h2 className="font-display font-bold text-6xl uppercase tracking-tighter leading-[0.9] mb-10">
                  A Narrative of <br /><span className="text-[var(--accent-primary)] italic">Progression</span>
                </h2>
                <div className="space-y-6 text-xl text-[var(--foreground)]/70 leading-relaxed font-light max-w-xl">
                  <p>Our curriculum is built on a rigorous <span className="text-[var(--foreground)] font-bold">biomechanical focus</span>, dissecting every micro-movement to achieve world-class efficiency.</p>
                  <p>This isn&apos;t just a clinic; it&apos;s a technical reconstruction designed to elevate your athletic IQ to the Team USA standard.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.tight }}
                className="lg:col-span-6 space-y-px bg-[var(--foreground)]/5 border border-[var(--foreground)]/5"
              >
                <div className="bg-white dark:bg-[var(--background)]/50 p-12 group hover:bg-[var(--accent-primary)] transition-colors duration-500">
                  <div className="flex items-start gap-8">
                    <span className="font-display font-black text-4xl text-[var(--foreground)]/10 group-hover:text-white/20">01</span>
                    <div>
                      <h3 className="font-display font-bold text-2xl uppercase mb-4 group-hover:text-white">Day 1: Fundamentals</h3>
                      <p className="text-[var(--foreground)]/60 group-hover:text-white/70 leading-relaxed">
                        Systematic breakdown of vertical velocity, grip stabilization, and the essential physics of elite-level tossing and catching.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[var(--background)]/50 p-12 group hover:bg-[var(--accent-primary)] transition-colors duration-500">
                  <div className="flex items-start gap-8">
                    <span className="font-display font-black text-4xl text-[var(--foreground)]/10 group-hover:text-white/20">02</span>
                    <div>
                      <h3 className="font-display font-bold text-2xl uppercase mb-4 group-hover:text-white">Day 2: Refinement</h3>
                      <p className="text-[var(--foreground)]/60 group-hover:text-white/70 leading-relaxed">
                        Transitioning core principles into high-to-high variations, technical twisting sequences, and elite world-stage mastery.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tiers Section - Summit Access */}
        <section
          className="relative z-10 py-32 bg-[var(--background)]/50"
          id="tiers"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          }}
        >
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
                className="max-w-2xl"
              >
                <h2 className="font-display font-bold text-5xl uppercase tracking-tighter italic mb-4">Summit Access</h2>
                <p className="text-[var(--foreground)]/50 uppercase tracking-widest text-xs font-bold">
                  Select your path to elite performance
                </p>
              </motion.div>
              <div className="h-px flex-1 bg-[var(--foreground)]/10 hidden md:block mb-4 mx-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
                className="group relative bg-white/60 dark:bg-[var(--surface)]/60 border border-[var(--foreground)]/5 p-16 hover:border-[var(--accent-primary)] transition-all duration-500 shadow-sm"
              >
                <span className="text-[var(--accent-primary)] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                  Levels 3-5 Proficiency
                </span>
                <h3 className="font-display font-black text-5xl uppercase mb-8">Foundation</h3>
                <p className="text-[var(--foreground)]/60 mb-12 text-lg">
                  Focusing on the architectural integrity of stunting. Perfecting the core movements that enable high-level progression.
                </p>
                <div className="space-y-4 border-t border-[var(--foreground)]/10 pt-8">
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-[var(--accent-primary)]"></span> Extension Technique
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-[var(--accent-primary)]"></span> Technical Toss Mechanics
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-[var(--accent-primary)]"></span> Inversion Logic
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.tight }}
                className="group relative bg-[var(--foreground)] dark:bg-[var(--ink-black)] text-white p-16 hover:bg-[var(--accent-primary)] transition-all duration-500 shadow-2xl"
              >
                <span className="text-white/50 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                  Worlds & Collegiate Elite
                </span>
                <h3 className="font-display font-black text-5xl uppercase mb-8 italic">Elite</h3>
                <p className="text-white/70 mb-12 text-lg">
                  High-intensity immersion into the most complex stunting sequences currently being performed on the world stage.
                </p>
                <div className="space-y-4 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white"></span> High-to-High Mastery
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white"></span> Advanced Twisting
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white"></span> Elite Dismount Profiles
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Private Coaching Section */}
        <section
          className="relative z-10 py-32 bg-white/60 dark:bg-[var(--surface)]/60"
          id="privates"
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
          <div className="container mx-auto px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
              className="mb-20 text-center"
            >
              <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-4">
                Private Technical Coaching
              </h2>
              <p className="text-[var(--accent-primary)] font-bold uppercase tracking-[0.3em] text-xs">
                Register Interest for Pricing
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
                className="border-2 border-[var(--foreground)] p-12 hover:bg-[var(--foreground)] hover:text-white dark:hover:bg-[var(--ink-black)] transition-all group"
              >
                <div className="flex justify-between items-start mb-10">
                  <h4 className="font-display font-bold text-2xl uppercase">1-on-1<br />Specialist</h4>
                  <span className="text-[var(--accent-primary)] group-hover:text-white font-bold tracking-tighter">
                    1-2 HOURS
                  </span>
                </div>
                <p className="text-[var(--foreground)]/60 group-hover:text-white/60 text-sm leading-relaxed mb-10">
                  Intensive solo session focusing on hyper-individualized biomechanical corrections.
                </p>
                <a
                  href="#register"
                  className="inline-block text-[10px] font-black uppercase tracking-widest border-b-2 border-[var(--accent-primary)] pb-1 group-hover:border-white"
                >
                  Inquire Availability
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.tight }}
                className="border-2 border-[var(--foreground)] p-12 hover:bg-[var(--foreground)] hover:text-white dark:hover:bg-[var(--ink-black)] transition-all group"
              >
                <div className="flex justify-between items-start mb-10">
                  <h4 className="font-display font-bold text-2xl uppercase">2-on-1<br />Partner Work</h4>
                  <span className="text-[var(--accent-primary)] group-hover:text-white font-bold tracking-tighter">
                    1-2 HOURS
                  </span>
                </div>
                <p className="text-[var(--foreground)]/60 group-hover:text-white/60 text-sm leading-relaxed mb-10">
                  Synchronized technical training for stunt pairs aiming for peak competitive synergy.
                </p>
                <a
                  href="#register"
                  className="inline-block text-[10px] font-black uppercase tracking-widest border-b-2 border-[var(--accent-primary)] pb-1 group-hover:border-white"
                >
                  Inquire Availability
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interest Registration CTA Banner */}
        <div className="relative z-10 bg-[var(--accent-primary)] py-20">
          <div className="container mx-auto px-8 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
              className="font-display font-black text-5xl uppercase text-white tracking-tight mb-4"
            >
              Register Your Interest
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: STAGGER.tight }}
              className="text-white/80 uppercase tracking-[0.3em] text-sm font-bold mb-10 italic"
            >
              Be the first to know when dates & pricing are confirmed
            </motion.p>
            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: STAGGER.normal }}
              href="#register"
              className="bg-white text-[var(--accent-primary)] px-16 py-6 font-display font-black uppercase text-sm tracking-[0.3em] hover:bg-[var(--foreground)] hover:text-white transition-all inline-block shadow-2xl"
            >
              Register Interest Now
            </motion.a>
          </div>
        </div>

        {/* Registration Form - The Registry */}
        <section
          className="relative z-10 py-32 bg-[var(--background)]/50"
          id="register"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          }}
        >
          <div className="container mx-auto px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
              className="text-center mb-16"
            >
              <h2 className="font-display font-black text-6xl uppercase tracking-tighter mb-4 italic">
                The Registry
              </h2>
              <p className="text-[var(--foreground)]/40 uppercase tracking-[0.2em] text-[10px] font-bold">
                Malaysia Summit Interest 2026
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth, delay: STAGGER.normal }}
            >
              <HaileyKollinForm workshop={workshop} />
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

  // Coming Soon and other summits
  return (
    <>
      <FixedGradientBackground
        distortion={1.2}
        swirl={0.6}
        speed={0.35}
        veilOpacity="bg-white/30 dark:bg-black/20"
      />
      <main className="min-h-screen bg-[var(--background)]/50">
        {/* Hero - Coming Soon Summit */}
        <HeroSectionGradient className="pt-32 pb-20">
        <div className="container mx-auto px-8 relative z-[100] flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.heroReveal, ease: EASING.smooth }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.fast, ease: EASING.smooth }}
              className="mb-8 flex items-center gap-4 justify-center"
            >
              <span className="h-px w-12 bg-[var(--accent-primary)]"></span>
              <span className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.5em]">
                Summit Series
              </span>
              <span className="h-px w-12 bg-[var(--accent-primary)]"></span>
            </motion.div>

            <h1 className="font-display font-black text-[12vw] md:text-[8rem] leading-[0.9] uppercase tracking-tighter mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.heroReveal, ease: EASING.smooth, delay: STAGGER.tight }}
              >
                {workshop.title}
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth, delay: STAGGER.normal }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl font-light text-[var(--foreground)]/70 italic">
                {workshop.subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-widest font-bold text-[var(--accent-primary)]">
                <span>{workshop.date}</span>
                <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></span>
                <span>{workshop.location}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.slow, delay: 2 }}
            className="flex flex-col items-center gap-4 mt-20"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--accent-primary)]">
              Scroll to learn more
            </span>
            <div className="h-12 w-px bg-[var(--accent-primary)]/30"></div>
          </motion.div>
        </div>
      </HeroSectionGradient>

      {/* Overview Section */}
      {workshop.overview && (
        <section
          className="relative z-10 w-full bg-[var(--background)]/50 py-24 md:py-32 border-t border-[var(--neutral-900)]/5"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
          }}
        >
          <div className="container mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)] mb-6">
                {workshop.overview.headline}
              </h2>
              <p className="text-[var(--foreground)] opacity-70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
                {workshop.overview.description}
              </p>
              <p className="text-primary font-display text-sm uppercase tracking-wider">
                {workshop.overview.format}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Confirmed Guest + Mystery Guests (Daniel Bailey) */}
      {showDanielBaileyContent && (
        <section
          className="relative z-10 w-full bg-[var(--surface)] py-24 md:py-32 border-t border-[var(--neutral-900)]/5"
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
          <div className="container mx-auto max-w-[1200px] px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="font-display text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
                Elite Coaching
              </span>
              <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)]">
                Meet Your Instructors
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Confirmed Guest: Daniel Bailey */}
              <SilhouetteGuestCard
                name={workshop.confirmed?.name}
                country={workshop.confirmed?.country}
                flag={workshop.confirmed?.flag}
                team={workshop.confirmed?.team}
                teamNote={workshop.confirmed?.teamNote}
                bio={workshop.confirmed?.bio}
                photo={workshop.confirmed?.photo || null}
                silhouette={false}
                index={0}
              />

              {/* Mystery Guests */}
              {workshop.mysteryGuests?.map((guest, index) => (
                <SilhouetteGuestCard
                  key={index}
                  hint={guest.hint}
                  photo={guest.photo}
                  silhouette={guest.silhouette}
                  index={index + 1}
                />
              ))}
            </div>

            {workshop.suspenseMessage && (
              <p className="text-center text-[var(--foreground)] opacity-60 text-lg italic mt-12">
                {workshop.suspenseMessage}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Registration Form Section */}
      <section
        className="relative z-10 w-full bg-[var(--background)]/50 py-24 md:py-32 border-t border-[var(--neutral-900)]/5"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div className="container mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
              Secure Your Spot
            </span>
            <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)] mb-6">
              Register Interest
            </h2>
            <p className="text-[var(--foreground)] opacity-70 text-lg max-w-2xl mx-auto leading-relaxed">
              Be the first to know when registration opens and early bird pricing is available.
            </p>
          </div>

          <GenericSummitForm sheetName={workshop.sheetName} termsUrl={workshop.termsUrl} />
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
