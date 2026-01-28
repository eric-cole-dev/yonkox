"use client";

import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import Image from "next/image";
import Link from "next/link";

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative z-10 w-full bg-[var(--background)]/50 py-32 border-b border-[var(--neutral-900)]/5"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
      }}
    >
      
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <span className="font-display text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
              Current Focus
            </span>
            <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter text-[var(--foreground)]">
              Workshop Series <span className="text-primary opacity-30">/</span>
            </h2>
          </div>
          <div className="max-w-md md:text-right">
            <p className="font-body text-primary font-bold text-sm uppercase tracking-widest mb-2">
              Bi-Weekly Technical Training
            </p>
            <p className="font-body text-[var(--foreground)] opacity-60 text-sm">
              Structured skill progression every two weeks in Kuala Lumpur, with international summits coming soon.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="flex flex-wrap lg:flex-nowrap w-full gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* Card 1 - Hailey & Kollin (TBC) */}
          <Link href="/summit/hailey-kollin" className="w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[25%] order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, delay: 0 }}
              className="group cursor-pointer h-full"
            >
            <div className="relative overflow-hidden aspect-[4/5] mb-6 border border-[var(--neutral-900)]/10 bg-[var(--surface)] shadow-card transition-shadow hover:shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJfH3J1rUxZSGVDhR5TOUtr5wqpTGz25-VE5eU6mj3sL6oc8itKh3jyr5IH5bqv2aqeK7Sd36lLuu-tuDvs2nLDNpRIxiv-j_N_s_G7twrzfRuTIjbTOISv_WWuZj-BPNLu8el18lK5BMJF4LnOylwseFXYkEKTvEkysstrAe3-FLPLtNMvG2zsLd9dJ57B1hLyITmZGPTz2f1AkQkLP1MyfmpTfPJ-jpzKpcwX_91hL-qjD-xYp_-a7g10AGZ0kAsj4g6MNJZ7Ss"
                  alt="Hailey & Kollin Summit"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-0 left-0 bg-[var(--foreground)] px-4 py-2">
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white">
                  TBC 2026
                </span>
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-1">
              Hailey & Kollin
            </h3>
            <p className="text-primary font-mono text-xs tracking-wider">
              TEAM USA ELITE
            </p>
            </motion.div>
          </Link>

          {/* Main Card - Local Workshop */}
          <Link href="/workshops" className="w-full lg:w-[50%] order-1 lg:order-2 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, delay: 0.1 }}
              className="group cursor-pointer h-full"
            >
              <div className="relative overflow-hidden aspect-[4/5] md:aspect-[16/10] shadow-elegant border border-primary/20 hover:border-primary transition-colors">
              <div className="absolute inset-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwB7o-0vwVZf0RvmOkCw6p006NkokRy-xCfQu-eOvi6fbLeVU3Lv0BxYj3ifhqgiQDluQKNn1iBsesSD_TXq3p7CVbXHKMl17UMYN6aaWmhi3nZx-tQ_vR5vsAgwrqKZiqIN88evxNde7ghe-bwm296OS3PDZHk52vGb-9tt1l62SogAm3bZLXWE5V8vxrW90Pk25sBpZzmZMDKUn-aJygRxC-lm6AFq5LrM0bIvzAlMScq9ziqTBetQyPEekEOIGnV0JvhS1WsF8"
                  alt="Local Circuit Workshops"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105 contrast-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                <div className="bg-primary px-3 py-1 mb-6 shadow-glow">
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                    Bi-Weekly Workshops
                  </span>
                </div>
                <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl uppercase text-white mb-3 italic tracking-tighter">
                  Local Circuit
                </h3>
                <p className="text-white font-display text-sm uppercase tracking-widest flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white"></span> Technical Skill Development
                </p>
              </div>
              <div className="absolute top-8 right-8 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="font-mono text-[10px] text-white bg-black/60 px-3 py-1 backdrop-blur-sm border border-white/10">
                  ACTIVE_NOW
                </span>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center px-2">
              <div className="flex flex-col">
                <h4 className="font-display font-bold text-2xl text-[var(--foreground)] uppercase">
                  The Main Focus
                </h4>
                <p className="text-[var(--foreground)] opacity-50 text-xs uppercase tracking-widest mt-1">
                  Kuala Lumpur • Every Two Weeks
                </p>
              </div>
              <span className="border border-[var(--neutral-900)]/20 px-8 py-3 text-xs font-bold uppercase text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-wider">
                View Details
              </span>
            </div>
            </motion.div>
          </Link>

          {/* Card 3 - Special Guest */}
          <Link href="/summit/coming-soon" className="w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[25%] order-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.sectionReveal, delay: 0.2 }}
              className="group cursor-pointer h-full"
            >
            <div className="relative overflow-hidden aspect-[4/5] mb-6 border border-[var(--neutral-900)]/10 bg-[var(--surface)] shadow-card transition-shadow hover:shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLDvQPyYngVb-ieRgR5E406-YVWMK2Vg38oJG87u_unFaURLNKL_GRwsDkbs2AtQcfsG7gR8PJxwjCa2n5k2one4cfPU3gCfaHA3sQ5TfT54C9j0D8qVXAj0QeZarYIQrZKAnnnzOdAB3Jegyq8wCjlZgDkXC1WdHCh45h2zCUnPjKvkjMRYG40quvm25nvztlVMxwkAp454o1A0KjdGadIfcaotXbVTfFGQsOeoW5dfLZUaXTdYRyosUMsVPBJvDZFzj3dTZxH0c"
                  alt="Special Guest"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-0 right-0 bg-[var(--surface)] border-l border-b border-[var(--neutral-900)]/10 px-4 py-2">
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--foreground)]">
                  Upcoming
                </span>
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-1">
              Special Guest
            </h3>
            <p className="text-primary font-mono text-xs tracking-wider">
              SEPT/OCT 2026
            </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
