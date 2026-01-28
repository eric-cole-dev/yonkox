"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import Link from "next/link";
import { scrollToTop } from "@/lib/scroll-utils";

interface LocalWorkshopFormProps {
  sheetName: string;
  termsUrl: string;
}

export default function LocalWorkshopForm({ sheetName, termsUrl }: LocalWorkshopFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    learningGoals: "",
    agreedToTerms: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    setStatus("submitting");

    // Placeholder URL - will be replaced with actual Google Apps Script URL
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

    const payload = {
      sheetName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
      learningGoals: formData.learningGoals,
    };

    try {
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        console.warn("Script URL not set. Simulating success.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        return;
      }

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      setStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-3xl font-display font-bold uppercase text-[var(--foreground)] mb-4">
          Interest Registered!
        </h3>
        <p className="text-[var(--foreground)] opacity-70 mb-8 max-w-md mx-auto leading-relaxed">
          We'll notify you when the next workshop session opens for registration. Based on community feedback, we're planning workshops around the skills you want to learn most.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({ name: "", email: "", phone: "", instagram: "", learningGoals: "", agreedToTerms: false });
            scrollToTop();
          }}
          className="bg-[var(--foreground)] text-[var(--background)] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Submit Another Response
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70 text-[var(--foreground)]">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30 text-[var(--foreground)]"
            placeholder="YONKO X"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70 text-[var(--foreground)]">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30 text-[var(--foreground)]"
            placeholder="hello@yonkox.com"
          />
        </div>

        {/* Phone & Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70 text-[var(--foreground)]">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30 text-[var(--foreground)]"
              placeholder="+60 12-345 6789"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70 text-[var(--foreground)]">
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30 text-[var(--foreground)]"
              placeholder="@username"
            />
          </div>
        </div>

        {/* Learning Goals */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70 text-[var(--foreground)]">
            What do you wish to learn from these workshops? *
          </label>
          <textarea
            name="learningGoals"
            required
            value={formData.learningGoals}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            className="w-full bg-[var(--foreground)]/5 dark:bg-white/10 border border-[var(--foreground)]/10 px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-[var(--foreground)]/30 resize-none text-[var(--foreground)]"
            placeholder="Share your goals, current skill level, or specific skills you want to improve. This helps us plan future workshop topics."
          />
          <p className="text-xs text-[var(--foreground)] opacity-50 mt-2">
            {formData.learningGoals.length}/500 characters
          </p>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreedToTerms"
            id="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 accent-primary"
          />
          <label htmlFor="agreedToTerms" className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed">
            I agree to the{' '}
            <Link href={termsUrl} className="text-primary hover:underline font-bold">
              terms and conditions
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting" || !formData.agreedToTerms}
          className="w-full mt-6 bg-primary text-white px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {status === "submitting" ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            "Register Interest"
          )}
        </button>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
