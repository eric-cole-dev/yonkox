"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { EASING } from "@/lib/animation-config";
import Image from "next/image";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
  };

  const handleThemeSwitch = () => {
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
    <>
      <AnimatePresence>
        {isTransitioning && (
          <ThemeTransitionOverlay 
            targetTheme={isDarkMode ? 'light' : 'dark'}
            onSwitch={handleThemeSwitch}
            onComplete={() => setIsTransitioning(false)}
          />
        )}
      </AnimatePresence>

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
              <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex justify-start shrink-0">
                  <a href="/" className="flex items-center gap-2 md:gap-4 group cursor-pointer z-[60] relative">
                    <div className="size-10 md:size-16 flex items-center justify-center relative overflow-hidden">
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
                      <h2 className="font-display font-bold text-sm md:text-xl tracking-tight uppercase text-[var(--foreground)] leading-none whitespace-nowrap">
                        Yonko X
                      </h2>
                      <span className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-primary font-bold mt-1 whitespace-nowrap">
                        The Collective
                      </span>
                    </div>
                  </a>
                </div>
        
                <nav className="hidden md:flex items-center justify-center gap-10">
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
                  <a
                    className="font-display font-medium text-xs tracking-widest uppercase text-[var(--neutral-500)] hover:text-primary transition-colors"
                    href="#merch"
                  >
                    Vault
                  </a>
                </nav>
        
                <div className="flex items-center justify-end gap-3 md:gap-6 z-[60] relative shrink-0">
                  <AnimatedThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
        
                  <a href="#footer" className="hidden md:block bg-primary text-white font-display font-bold text-xs uppercase px-8 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest border border-primary">
                    Join the Collective
                  </a>
        
                  {/* Mobile Menu Button */}
                  <button 
                    className="md:hidden text-[var(--foreground)] focus:outline-none p-1"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {isMenuOpen ? "close" : "menu"}
                    </span>
                  </button>
                </div>
              </div>
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: EASING.smooth }}
              className="fixed inset-0 bg-[var(--background)]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <nav className="flex flex-col items-center gap-8">
                {["events", "lab", "journey", "merch"].map((item) => (
                  <a
                    key={item}
                    className="font-display font-bold text-3xl tracking-widest uppercase text-[var(--foreground)] hover:text-primary transition-colors"
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item === "merch" ? "Vault" : item === "journey" ? "Our Journey" : item === "lab" ? "The Lab" : "Events"}
                  </a>
                ))}
                <a 
                  href="#footer" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary text-white font-display font-bold text-sm uppercase px-10 py-4 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest border border-primary mt-4"
                >
                  Join the Collective
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

const ThemeTransitionOverlay = ({ 
  targetTheme, 
  onSwitch, 
  onComplete 
}: { 
  targetTheme: 'light' | 'dark', 
  onSwitch: () => void, 
  onComplete: () => void 
}) => {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
      animate={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)" }}
      transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
      onAnimationComplete={(definition) => {
        // If we finished the 'animate' phase (covering screen)
        if ((definition as any).clipPath === "polygon(0 0, 150% 0, 100% 100%, 0% 100%)") {
          onSwitch();
          onComplete(); // Triggers exit animation via AnimatePresence
        }
      }}
      className={`fixed inset-0 z-[9999] pointer-events-none ${
        targetTheme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-[#F4F1E8]'
      }`}
    />
  );
};