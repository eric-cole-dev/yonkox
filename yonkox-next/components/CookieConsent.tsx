"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 z-[9999] md:max-w-md md:left-auto"
        >
          <div className="bg-[var(--surface)] border border-[var(--neutral-900)]/10 p-6 shadow-2xl backdrop-blur-md bg-opacity-95 flex flex-col gap-4 relative overflow-hidden">
             {/* Checkered BG overlay */}
             <div
                className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            
            <div className="relative z-10">
                <h4 className="font-display font-bold text-lg text-[var(--foreground)] mb-2 uppercase tracking-wide">
                Cookie Notice
                </h4>
                <p className="font-body text-sm text-[var(--foreground)] opacity-70 mb-4 leading-relaxed">
                We use strictly necessary storage to save your theme preference (Light/Dark mode) and ensure the site functions correctly. We do not use tracking cookies.
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                <button
                    onClick={handleAccept}
                    className="bg-primary text-white font-display font-bold text-[10px] uppercase px-6 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest shadow-md"
                >
                    Acknowledge
                </button>
                <Link 
                    href="/privacy" 
                    className="text-[10px] font-display font-bold uppercase text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-primary transition-colors tracking-widest border-b border-transparent hover:border-primary"
                >
                    Privacy Policy
                </Link>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
