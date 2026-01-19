"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { EASING } from "@/lib/animation-config";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [targetMode, setTargetMode] = useState<'light' | 'dark' | null>(null);
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
      if (isTransitioning) return;
      
      const nextMode = isDarkMode ? 'light' : 'dark';
      setTargetMode(nextMode);
      setIsTransitioning(true);
    };
  
    const handleTransitionComplete = () => {
      // This runs after the screen is fully covered
      if (targetMode === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        setIsDarkMode(false);
      }
      
      // Slight delay before un-wiping to ensure DOM updates
      setTimeout(() => {
        setTargetMode(null); // Triggers exit animation? No, we need a sequence.
        // Better approach: One animation sequence that calls a function in the middle.
      }, 100);
    };
  
    // We'll use a single motion component that handles the full lifecycle
    // Entrance: clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" -> "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    // Exit: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" -> "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
  
    return (
      <>
        {/* Theme Transition Overlay */}
        {isTransitioning && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 150% 0, 150% 100%, 0% 100%)" }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }} // Cinematic ease
            onAnimationComplete={() => {
               // 1. Switch Theme
               if (targetMode === 'dark') {
                 document.documentElement.classList.add('dark');
                 localStorage.theme = 'dark';
                 setIsDarkMode(true);
               } else {
                 document.documentElement.classList.remove('dark');
                 localStorage.theme = 'light';
                 setIsDarkMode(false);
               }
               
               // 2. Start Exit Animation (by changing key or removing this component? No, we need to animate out)
               // We can't animate out easily with the same component unless we change variants.
               // Let's use a 2-stage animation or a separate "Exit" component.
               // Actually, "AnimatePresence" is best here, but complex for "wipe through".
               
               // Simpler hack: Keep this div, change its clipPath target to "uncover" from left?
               // No, standard wipe is: Cover L->R, then Uncover L->R (reveal new content).
               // Current animate covers screen.
               // To uncover L->R, we need to animate the LEFT points to the right.
               // "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" -> "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
               
               setIsTransitioning(false); // This removes the component, instant cut. Bad.
            }}
            className={`fixed inset-0 z-[100] pointer-events-none ${targetMode === 'dark' ? 'bg-[#0F0F0F]' : 'bg-[#F4F1E8]'}`}
          />
        )}
        
        {/* 
           Re-thinking implementation for smoother "Wipe Through":
           We need the overlay to stay after "isTransitioning" seems "done" with step 1.
           Let's use a specialized component or logic.
        */}
        <ThemeWipe 
          isActive={isTransitioning} 
          targetMode={targetMode} 
          onSwitch={() => {
               if (targetMode === 'dark') {
                 document.documentElement.classList.add('dark');
                 localStorage.theme = 'dark';
                 setIsDarkMode(true);
               } else {
                 document.documentElement.classList.remove('dark');
                 localStorage.theme = 'light';
                 setIsDarkMode(false);
               }
          }}
          onComplete={() => {
              setIsTransitioning(false);
              setTargetMode(null);
          }}
        />
  
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
  
                          <a href="#footer" className="bg-primary text-white font-display font-bold text-xs uppercase px-8 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest border border-primary">
                            Join the Collective
                          </a>            </div>
          </div>
        </motion.header>
      </>
    );
  }
  
  // Sub-component for the animation logic
  function ThemeWipe({ isActive, targetMode, onSwitch, onComplete }: { isActive: boolean, targetMode: 'light' | 'dark' | null, onSwitch: () => void, onComplete: () => void }) {
    const [stage, setStage] = useState<'idle' | 'covering' | 'revealing'>('idle');
  
    useEffect(() => {
      if (isActive && stage === 'idle') {
        setStage('covering');
      }
    }, [isActive]);
  
    if (!isActive) return null;
  
    return (
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }} // Start from left
        animate={
          stage === 'covering' 
            ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" } // Cover full
            : { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" } // Reveal from left (move left edge to right)
        }
        transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }} // Fast, cinematic elastic/exponential
        onAnimationComplete={() => {
          if (stage === 'covering') {
            onSwitch(); // Change theme while covered
            setStage('revealing'); // Trigger reveal
          } else if (stage === 'revealing') {
            onComplete(); // Done
            setStage('idle');
          }
        }}
        className={`fixed inset-0 z-[100] pointer-events-none ${targetMode === 'dark' ? 'bg-[#0F0F0F]' : 'bg-[#F4F1E8]'}`}
      />
    );
  }
