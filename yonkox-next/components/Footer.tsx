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
    <footer className="border-t border-white/5 text-white py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="ink-stain opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="size-12 relative overflow-hidden">
                <Image 
                    src={isDarkMode ? "/dark-yonkox-nobg.png" : "/lightmode-yonkox-nobg.png"} 
                    alt="Yonko X Logo" 
                    fill
                    className="object-contain"
                />
              </div>
              <h2 className="font-display font-bold text-3xl uppercase tracking-tighter">
                Yonko X
              </h2>
            </div>
            <p className="font-body text-white/60 font-light max-w-sm text-sm leading-relaxed uppercase tracking-wider">
              High-performance stunting collective. Based in Malaysia, hosting
              premier bi-annual international clinics and bi-weekly local
              technical workshops.
            </p>
            <div className="flex gap-4">
              <a
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-primary group transition-all bg-white/5 backdrop-blur-sm"
                href="#"
              >
                <span className="material-symbols-outlined text-sm group-hover:text-white">
                  terminal
                </span>
              </a>
              <a
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-primary group transition-all bg-white/5 backdrop-blur-sm"
                href="#"
              >
                <span className="material-symbols-outlined text-sm group-hover:text-white">
                  podcasts
                </span>
              </a>
            </div>
          </div>
          <div className="bg-white/5 p-12 border border-white/10 backdrop-blur-md shadow-card">
            <h3 className="font-display font-bold text-xl uppercase mb-2 text-white">
              Join the Family
            </h3>
            <p className="text-white/40 text-[10px] mb-8 uppercase tracking-widest">
              Receive technical updates and event alerts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                className="bg-black/20 border border-white/10 text-white px-6 py-4 font-body text-sm placeholder-white/20 focus:border-primary focus:ring-0 w-full"
                placeholder="EMAIL@ADDRESS.COM"
                type="email"
              />
              <button className="bg-primary text-white font-display font-bold text-xs uppercase px-10 py-4 hover:bg-white hover:text-black transition-colors tracking-widest whitespace-nowrap shadow-md">
                Join Us
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold uppercase text-[10px] tracking-widest text-primary mb-2">
              Clinics
            </h4>
            <a
              className="text-xs text-primary font-medium hover:text-white transition-colors"
              href="#"
            >
              Summit Series
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-white transition-colors"
              href="#"
            >
              The Lab KL
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-white transition-colors"
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
              className="text-xs text-primary font-medium hover:text-white transition-colors"
              href="#"
            >
              Merch Vault
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-white transition-colors"
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
              className="text-xs text-primary font-medium hover:text-white transition-colors"
              href="#"
            >
              Inquiries
            </a>
            <a
              className="text-xs text-primary font-medium hover:text-white transition-colors"
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
              className="text-xs text-primary font-medium hover:text-white transition-colors"
              href="#"
            >
              Privacy
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase text-white/40 tracking-[0.3em]">
          <div>© 2024 YonkoX Collective. All Rights Reserved.</div>
          <div>Operational // Kuala Lumpur, Malaysia</div>
        </div>
      </div>
    </footer>
  );
}
