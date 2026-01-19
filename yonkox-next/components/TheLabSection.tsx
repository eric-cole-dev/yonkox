"use client";

import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import Image from "next/image";
import { useState } from "react";
import ReservationModal from "./ReservationModal";

export default function TheLabSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="lab" className="relative w-full py-32 overflow-hidden bg-[var(--surface)] border-b border-[var(--neutral-900)]/5">
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultEvent="The Lab - Show Interest"
      />

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

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="relative group self-center"
        >
          <div className="relative aspect-square border border-[var(--neutral-900)]/10 overflow-hidden shadow-elegant bg-[var(--background)] p-2">
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAJcW5_Y0h5N5zDQZvkFLW3E4CTgD309NbWqID_aFD_qHIv_N9FOnojwc3Sw2qaFpz9BSN9cj4ARNyhx_CA6vqWBgI0yjfM-ZkI5zRzaEx0dvvnNESftMm1GQrJhvohiRKS4q74EwzvTue3gz7HxjsLvmUduv0aaYAjSvH9kmmIqd94N09mu6jJ2jw34nlafJ3duW6IXPwP0vXoJCywoXnfGibod9nM5dhO1e5mMjmZ0MXfAAeY7Tr1UGQlnkyk6phTmql4b2vyjQ"
                alt="Technical analysis"
                fill
                className="object-cover filter grayscale contrast-110"
              />
            </div>
            <div className="absolute top-[30%] left-[40%] tech-crosshair opacity-80"></div>
            <div className="absolute bottom-[20%] right-[30%] tech-crosshair opacity-80"></div>
            
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-primary/90 text-white px-6 py-3 transform -rotate-12 border border-white/20 shadow-xl">
                    <span className="font-display font-bold text-xl tracking-[0.2em] uppercase">Coming Soon</span>
                </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 bg-primary p-10 hidden lg:block shadow-xl z-20">
            <span className="vertical-text font-display font-black text-3xl text-white/40">
              MALAYSIA
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary">
              architecture
            </span>
            <span className="font-display text-xs uppercase tracking-[0.4em] text-primary font-bold">
              Bi-Weekly Local Workshops
            </span>
          </div>
          <h2 className="font-display font-bold text-6xl uppercase text-[var(--foreground)] mb-12 leading-none">
            The Lab
          </h2>
          <div className="space-y-10">
            <div className="border-l-2 border-primary pl-8 group hover:bg-[var(--background)]/40 transition-colors p-6 cursor-pointer rounded-r-sm opacity-60">
              <span className="text-primary font-mono text-xs mb-3 block tracking-widest opacity-80">
                DECONSTRUCTION_01
              </span>
              <h4 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-3 group-hover:text-primary transition-colors">
                Anatomy of the High Toss
              </h4>
              <p className="text-[var(--foreground)] opacity-70 text-sm leading-relaxed max-w-md">
                Mastering the explosive vertical velocity and the physics of
                terminal height transition in our local Kuala Lumpur sessions.
              </p>
            </div>
            <div className="border-l-2 border-primary pl-8 group hover:bg-[var(--background)]/40 transition-colors p-6 cursor-pointer rounded-r-sm opacity-60">
              <span className="text-primary font-mono text-xs mb-3 block tracking-widest opacity-80">
                DECONSTRUCTION_02
              </span>
              <h4 className="font-display font-bold text-2xl uppercase text-[var(--foreground)] mb-3 group-hover:text-primary transition-colors">
                Mastering the Extension Physics
              </h4>
              <p className="text-[var(--foreground)] opacity-70 text-sm leading-relaxed max-w-md">
                Bi-weekly deep dives into alignment and center-of-mass
                stabilization during high-impact hold cycles.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-4 text-[var(--foreground)] font-display text-xs font-bold uppercase tracking-widest mt-16 hover:text-primary transition-colors group text-left"
          >
            Show Interest <span className="opacity-50 text-[10px] ml-1">(Coming Soon)</span>
            <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform text-primary">
              arrow_forward_ios
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
