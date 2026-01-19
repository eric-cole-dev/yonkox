"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { EASING } from "@/lib/animation-config";
import Image from "next/image";
import { flushSync } from "react-dom";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

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
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    const switchState = () => {
      flushSync(() => {
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
          setIsDarkMode(true);
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
          setIsDarkMode(false);
        }
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(switchState);
    } else {
      switchState();
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
      transition={{ duration: 0.8, ease: EASING.smooth, delay: 1.5 }}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="size-16 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                    src={isDarkMode ? "/dark-yonkox-nobg.png" : "/lightmode-yonkox-nobg.png"} 
                    alt="Yonko X Logo" 
                    fill
                    className="object-contain dark:brightness-150 dark:contrast-125"
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
          <AnimatedThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />

          <a href="#footer" className="bg-primary text-white font-display font-bold text-xs uppercase px-8 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest border border-primary">
            Join the Collective
          </a>
        </div>
      </div>
    </motion.header>
  );
}