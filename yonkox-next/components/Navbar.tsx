"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { EASING } from "@/lib/animation-config";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    // Check initial theme preference or local storage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-xl border-[var(--neutral-200)] shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASING.smooth }}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="size-12 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                    src={isDarkMode ? "/dark-yonkox-nobg.png" : "/lightmode-yonkox-nobg.png"} 
                    alt="Yonko X Logo" 
                    fill
                    className="object-contain"
                />
             </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-display font-bold text-xl tracking-tight uppercase text-[var(--foreground)]">
              Yonko X
            </h2>
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
              The Collective
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <a
            className="font-display font-medium text-xs tracking-widest uppercase text-[var(--neutral-500)] hover:text-primary transition-colors"
            href="#merch"
          >
            Vault
          </a>
          <a
            className="font-display font-medium text-xs tracking-widest uppercase text-[var(--neutral-500)] hover:text-primary transition-colors"
            href="#events"
          >
            Events
          </a>
          <a
            className="font-display font-medium text-xs tracking-widest uppercase text-[var(--neutral-500)] hover:text-primary transition-colors"
            href="#lab"
          >
            The Lab
          </a>
          <a
            className="font-display font-medium text-xs tracking-widest uppercase text-[var(--neutral-500)] hover:text-primary transition-colors"
            href="#journey"
          >
            Our Journey
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <div 
            className="hidden md:flex items-center gap-3 px-4 py-2 border border-[var(--neutral-500)]/10 rounded-full cursor-pointer hover:bg-[var(--surface)] transition-colors"
            onClick={toggleTheme}
          >
            <span className={`material-symbols-outlined text-[18px] transition-colors ${!isDarkMode ? 'text-primary' : 'text-[var(--neutral-500)]'}`}>light_mode</span>
            <div className="w-8 h-4 bg-primary/20 rounded-full relative">
              <motion.div 
                className="absolute top-0.5 w-3 h-3 bg-primary rounded-full"
                animate={{ left: isDarkMode ? "1.25rem" : "0.125rem" }}
              />
            </div>
            <span className={`material-symbols-outlined text-[18px] transition-colors ${isDarkMode ? 'text-primary' : 'text-[var(--neutral-500)]'}`}>dark_mode</span>
          </div>

          <a href="/join" className="bg-primary text-white font-display font-bold text-xs uppercase px-8 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest border border-primary">
            Join the Collective
          </a>
        </div>
      </div>
    </motion.header>
  );
}
