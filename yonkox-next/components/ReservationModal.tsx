"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEvent?: string;
  customMessage?: string;
}

export default function ReservationModal({
  isOpen,
  onClose,
  defaultEvent = "Hailey & Kollin Summit",
  customMessage,
}: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    event: defaultEvent,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
        setFormData(prev => ({ ...prev, event: defaultEvent }));
        setStatus("idle");
    }
  }, [isOpen, defaultEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Placeholder URL - User will replace this with their deployed Web App URL
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; 

    try {
      // In a real scenario, you might use a Next.js API route to proxy this to avoid CORS or hide the URL.
      // For this prototype, we'll simulate a submission or attempt a fetch.
      // Note: Direct fetch to Google Apps Script often requires 'no-cors' or specific setup.
      // We will assume the user sets up the script correctly or we use a hidden iframe method, 
      // but for a modern app, a simple fetch to a backend API is best.
      // Here we will just simulate success after a delay if the URL is not set, 
      // or try to fetch if it looks real.
      
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
          console.warn("Script URL not set. Simulating success.");
          await new Promise(resolve => setTimeout(resolve, 1500));
          setStatus("success");
          return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        // Google Apps Script simple triggers require specific handling. 
        // We use 'no-cors' to allow the request to go through from the browser.
        mode: "no-cors", 
        headers: {
            "Content-Type": "text/plain", // Avoids preflight OPTIONS request
        },
      });
      
      setStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  // Determine content based on event type
  const getModalContent = () => {
    const event = formData.event;
    if (event === "Join Family / Newsletter") {
        return {
            category: "Stay Connected",
            title: "Join The Fam",
            subtitle: "Get exclusive updates on clinics, drops, and local events.",
            buttonText: "Join Now",
            successTitle: "Welcome to the Fam!",
            successMsg: "We'll keep you posted with the latest from the collective."
        };
    } else if (event === "The Lab - Show Interest") {
        return {
            category: "Local Workshops",
            title: "The Lab Interest",
            subtitle: "Show your interest for our upcoming local workshops in KL.",
            buttonText: "Show Interest",
            successTitle: "Interest Registered!",
            successMsg: "We'll notify you when the next Lab session opens for booking."
        };
    } else if (event === "Merch Access Request") {
        return {
            category: "Limited Access",
            title: "Request Access",
            subtitle: "The Vault is currently locked. Request access for future drops.",
            buttonText: "Request Access",
            successTitle: "Request Received",
            successMsg: "You've been added to the priority list for the next drop."
        };
    } else {
        return {
            category: "Join The Movement",
            title: "Reserve Spot",
            subtitle: "Secure your place at the upcoming summit.",
            buttonText: "Confirm Reservation",
            successTitle: "You're on the list!",
            successMsg: "We'll contact you when there's an update, since everything is still in a \"Coming Soon\" state for now."
        };
    }
  };

  const content = getModalContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASING.smooth }}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: DURATION.normal, ease: EASING.smooth }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[var(--surface)] border border-[var(--neutral-900)]/20 w-full max-w-md pointer-events-auto shadow-2xl overflow-hidden relative">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

              <div className="p-8">
                <div className="mb-6">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">
                        {content.category}
                    </span>
                    <h2 className="text-3xl font-display font-bold uppercase text-[var(--foreground)] tracking-tighter">
                        {content.title}
                    </h2>
                    <p className="text-[var(--foreground)] opacity-60 text-sm mt-2">
                        {content.subtitle}
                    </p>
                </div>

                {status === "success" ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h3 className="text-xl font-bold uppercase text-[var(--foreground)] mb-2">
                            {content.successTitle}
                        </h3>
                        <p className="text-sm opacity-60 mb-6 max-w-[80%] mx-auto">
                            {content.successMsg}
                        </p>
                        <button 
                            onClick={onClose}
                            className="bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Full Name</label>
                        <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30"
                        placeholder="YONKO X"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Email Address</label>
                        <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30"
                        placeholder="hello@yonkox.com"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Phone (WhatsApp)</label>
                            <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30"
                            placeholder="+60 12-345 6789"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Instagram</label>
                            <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30"
                            placeholder="@username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Event</label>
                        <select
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                        >
                            <option value="Hailey & Kollin Summit">Hailey & Kollin Summit (May)</option>
                            <option value="Special Guest Summit">Special Guest Summit (Sept/Oct)</option>
                            <option value="Local Circuit Workshop">Local Circuit Workshop</option>
                            <option value="The Lab - Show Interest">The Lab - Show Interest</option>
                            <option value="Merch Access Request">Merch Access Request</option>
                            <option value="Join Family / Newsletter">Join Family / Newsletter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="mt-4 bg-primary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {status === "submitting" ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : content.buttonText}
                    </button>
                    </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
