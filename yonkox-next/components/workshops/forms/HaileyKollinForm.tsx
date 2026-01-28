"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import Link from "next/link";
import TierSelectionCards from "../TierSelectionCards";
import FormStepIndicator from "./FormStepIndicator";
import type { SummitWorkshopConfig } from "@/lib/workshops-config";
import { scrollToTop } from "@/lib/scroll-utils";

interface HaileyKollinFormProps {
  workshop: SummitWorkshopConfig;
}

export default function HaileyKollinForm({ workshop }: HaileyKollinFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tiers: [] as string[],
    privateClassInterest: false,
    privateClassType: "",
    name: "",
    email: "",
    phone: "",
    instagram: "",
    agreedToTerms: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleTierChange = (tiers: string[]) => {
    setFormData({ ...formData, tiers });
  };

  const handleNextStep = () => {
    if (step === 1 && formData.tiers.length === 0) {
      alert("Please select at least one tier before continuing.");
      return;
    }
    setStep(step + 1);
    scrollToTop();
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    scrollToTop();
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
      sheetName: workshop.sheetName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
      tiersSelected: formData.tiers.join(", "),
      privateClassInterest: formData.privateClassInterest ? "Yes" : "No",
      privateClassType: formData.privateClassType || "N/A",
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
        className="flex flex-col items-center justify-center py-16 text-center max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-4xl font-display font-bold uppercase text-[var(--foreground)] mb-4">
          You're on the list!
        </h3>
        <p className="text-[var(--foreground)] opacity-70 mb-8 max-w-lg mx-auto leading-relaxed text-lg">
          We'll contact you soon with workshop details, pricing, and early bird discount information. Keep an eye on your email and WhatsApp!
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setStep(1);
            setFormData({
              tiers: [],
              privateClassInterest: false,
              privateClassType: "",
              name: "",
              email: "",
              phone: "",
              instagram: "",
              agreedToTerms: false,
            });
            scrollToTop();
          }}
          className="bg-[var(--foreground)] text-[var(--background)] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Submit Another Response
        </button>
      </motion.div>
    );
  }

  const stepLabels = ["Select Tier", "Private Classes", "Contact Info"];

  return (
    <div className="max-w-5xl mx-auto">
      <FormStepIndicator currentStep={step} totalSteps={3} stepLabels={stepLabels} />

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Tier Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth }}
            >
              <div className="text-center mb-12">
                <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-[var(--foreground)] mb-4">
                  Select Your Tier(s)
                </h2>
                <p className="text-[var(--foreground)] opacity-70 text-lg max-w-2xl mx-auto">
                  {workshop.tierSelectionNote?.encouragement}
                </p>
              </div>

              <TierSelectionCards
                tiers={workshop.tiers || []}
                selectedTiers={formData.tiers}
                onTierChange={handleTierChange}
                allowMultiple={true}
              />

              {/* Both Tiers Message */}
              {formData.tiers.length === 2 && workshop.tierSelectionNote && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-primary/10 border-l-4 border-primary p-6"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-bold text-[var(--foreground)] mb-2">Both tiers selected</p>
                      <p className="text-[var(--foreground)] opacity-80 text-sm leading-relaxed">
                        {workshop.tierSelectionNote.bothTiers}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end mt-12">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={formData.tiers.length === 0}
                  className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  Continue to Private Classes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Private Class Interest */}
          {step === 2 && workshop.privateClasses && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth }}
            >
              <div className="text-center mb-12">
                <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-[var(--foreground)] mb-4">
                  {workshop.privateClasses.headline}
                </h2>
                <p className="text-[var(--foreground)] opacity-70 text-lg max-w-2xl mx-auto">
                  {workshop.privateClasses.description}
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-8">
                {/* Yes/No Toggle */}
                <div>
                  <p className="font-display font-bold text-xl text-[var(--foreground)] mb-4">
                    Are you interested in private coaching?
                  </p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, privateClassInterest: true })}
                      className={`flex-1 py-4 px-6 border-2 font-bold uppercase tracking-wider text-sm transition-all ${
                        formData.privateClassInterest
                          ? 'border-primary bg-primary text-white'
                          : 'border-[var(--neutral-900)]/20 text-[var(--foreground)] hover:border-[var(--neutral-900)]/40'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, privateClassInterest: false, privateClassType: "" })}
                      className={`flex-1 py-4 px-6 border-2 font-bold uppercase tracking-wider text-sm transition-all ${
                        !formData.privateClassInterest
                          ? 'border-primary bg-primary text-white'
                          : 'border-[var(--neutral-900)]/20 text-[var(--foreground)] hover:border-[var(--neutral-900)]/40'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Private Class Type (if Yes) */}
                <AnimatePresence>
                  {formData.privateClassInterest && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-display font-bold text-xl text-[var(--foreground)] mb-4">
                        Select your preferred coaching format:
                      </p>
                      <div className="space-y-4">
                        {workshop.privateClasses.types.map((type) => (
                          <label
                            key={type.id}
                            className={`flex items-start gap-4 p-6 border-2 cursor-pointer transition-all ${
                              formData.privateClassType === type.id
                                ? 'border-primary bg-primary/5'
                                : 'border-[var(--neutral-900)]/20 hover:border-[var(--neutral-900)]/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name="privateClassType"
                              value={type.id}
                              checked={formData.privateClassType === type.id}
                              onChange={handleChange}
                              className="mt-1 w-5 h-5 accent-primary"
                            />
                            <div className="flex-1">
                              <p className="font-bold text-[var(--foreground)] mb-1">{type.name}</p>
                              <p className="text-[var(--foreground)] opacity-60 text-sm">{type.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Info Box */}
                      <div className="bg-[var(--foreground)]/5 border-l-4 border-primary p-6 mt-6">
                        <p className="font-bold text-primary text-sm uppercase tracking-wider mb-3">
                          ℹ️ Private Coaching Details
                        </p>
                        <ul className="space-y-2 text-[var(--foreground)] opacity-70 text-sm">
                          <li>• {workshop.privateClasses.schedule}</li>
                          <li>• {workshop.privateClasses.availability}</li>
                          <li>• {workshop.privateClasses.pricing.note}</li>
                          <li>• {workshop.privateClasses.limitations}</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-[var(--foreground)]/10 text-[var(--foreground)] px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[var(--foreground)]/20 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-3"
                >
                  Continue to Contact Info
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth }}
            >
              <div className="text-center mb-12">
                <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-[var(--foreground)] mb-4">
                  Your Information
                </h2>
                <p className="text-[var(--foreground)] opacity-70 text-lg max-w-2xl mx-auto">
                  We'll use this to contact you with workshop details and early bird pricing.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Early Bird Callout */}
                {workshop.earlyBirdMessage && (
                  <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary p-8 text-center mb-8">
                    <p className="text-2xl mb-2">🎉</p>
                    <h3 className="font-display font-bold text-xl uppercase text-[var(--foreground)] mb-3">
                      Don't miss out on our early bird discounts!
                    </h3>
                    <p className="text-[var(--foreground)] opacity-80 text-sm leading-relaxed">
                      {workshop.earlyBirdMessage}
                    </p>
                  </div>
                )}

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

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-4">
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
                    <Link href={workshop.termsUrl} className="text-primary hover:underline font-bold">
                      terms and conditions
                    </Link>
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-[var(--foreground)]/10 text-[var(--foreground)] px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[var(--foreground)]/20 transition-colors flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={status === "submitting" || !formData.agreedToTerms}
                    className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center min-w-[200px]"
                  >
                    {status === "submitting" ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center mt-4">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
