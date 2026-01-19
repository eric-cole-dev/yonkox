"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="footer" className="border-t border-[var(--neutral-900)]/5 text-[var(--foreground)] py-24 relative overflow-hidden bg-[var(--surface)] transition-colors duration-300">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black)",
        }}
      ></div>
      <div className="ink-stain opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="size-24 relative overflow-hidden">
                <Image 
                    src={isDarkMode ? "/dark-yonkox-nobg.png" : "/lightmode-yonkox-nobg.png"} 
                    alt="Yonko X Logo" 
                    fill
                    className="object-contain dark:brightness-150 dark:contrast-125"
                />
              </div>
              <h2 className="font-display font-bold text-4xl uppercase tracking-tighter">
                Yonko X
              </h2>
            </div>
            <p className="font-body text-[var(--foreground)] opacity-60 font-light max-w-sm text-sm leading-relaxed uppercase tracking-wider">
              High-performance stunting collective. Based in Malaysia, hosting
              premier bi-annual international clinics and bi-weekly local
              technical workshops.
            </p>
            <div className="flex gap-4">
              <a
                className="w-12 h-12 border border-[var(--neutral-900)]/10 flex items-center justify-center hover:bg-primary group transition-all bg-[var(--background)]/50 backdrop-blur-sm"
                href="#"
              >
                <span className="material-symbols-outlined text-sm group-hover:text-white">
                  terminal
                </span>
              </a>
              <a
                className="w-12 h-12 border border-[var(--neutral-900)]/10 flex items-center justify-center hover:bg-primary group transition-all bg-[var(--background)]/50 backdrop-blur-sm"
                href="#"
              >
                <span className="material-symbols-outlined text-sm group-hover:text-white">
                  podcasts
                </span>
              </a>
            </div>
          </div>
          <div className="bg-[var(--background)]/40 p-12 border border-[var(--neutral-900)]/10 backdrop-blur-md shadow-card">
            <h3 className="font-display font-bold text-xl uppercase mb-2 text-[var(--foreground)]">
              Join the Family
            </h3>
            <p className="text-[var(--foreground)] opacity-40 text-[10px] mb-8 uppercase tracking-widest">
              Receive technical updates and event alerts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                className="bg-[var(--background)] border border-[var(--neutral-900)]/10 text-[var(--foreground)] px-6 py-4 font-body text-sm placeholder-[var(--foreground)]/20 focus:border-primary focus:ring-0 w-full"
                placeholder="EMAIL@ADDRESS.COM"
                type="email"
              />
              <button className="bg-primary text-white font-display font-bold text-xs uppercase px-10 py-4 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors tracking-widest whitespace-nowrap shadow-md">
                Join Us
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-[var(--neutral-900)]/10">
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold uppercase text-[10px] tracking-widest text-primary mb-2">
              Clinics
            </h4>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Summit Series
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              The Lab KL
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Our Journey
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold uppercase text-[10px] tracking-widest text-primary mb-2">
              Community
            </h4>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Merch Vault
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Elite Family
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold uppercase text-[10px] tracking-widest text-primary mb-2">
              Connect
            </h4>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Inquiries
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Location
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold uppercase text-[10px] tracking-widest text-primary mb-2">
              Info
            </h4>
            <a
              className="text-xs text-primary font-medium hover:text-[var(--foreground)] transition-colors"
              href="#"
            >
              Privacy
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-[var(--neutral-900)]/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase text-[var(--foreground)] opacity-40 tracking-[0.3em]">
          <div>© 2024 YonkoX Collective. All Rights Reserved.</div>
          <div>Operational // Kuala Lumpur, Malaysia</div>
        </div>
      </div>
    </footer>
  );
}
