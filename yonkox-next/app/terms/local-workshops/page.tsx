"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import { FixedGradientBackground } from "@/components/ui/hero-section-gradient";

export default function LocalWorkshopsTermsPage() {
  const terms = [
    {
      title: "Registration & Payment",
      content: [
        "Participation in the Local Circuit Workshops requires a bi-weekly commitment. Full payment for the scheduled block must be received prior to the first session to secure your spot.",
        "Payments are non-refundable once the cycle has commenced. Exceptions may be made for certified medical emergencies at the discretion of YonkoX management."
      ]
    },
    {
      title: "Skill Progression",
      content: [
        "Our curriculum emphasizes foundational mastery before advanced progression. Athletes are expected to respect the \"Foundational Focus\" methodology.",
        "Instructors reserve the right to regress a skill if safety parameters are not met. Attempts to bypass prerequisites without instructor approval may result in removal from the session."
      ]
    },
    {
      title: "Safety Protocols",
      content: [
        "All athletes must adhere to the specific safety rules of 'The Lab' and any local venue hosting the workshop. This includes proper footwear, attire (no jewelry, nails trimmed), and use of safety mats.",
        "Spotters are mandatory for all new skills. Failure to utilize a spotter during designated drills is a violation of safety protocol."
      ]
    },
    {
      title: "Attendance Policy",
      content: [
        "Due to the collaborative nature of stunting, attendance is critical. A \"No-Show\" without 24-hour prior notice disrupts the training group.",
        "Athletes with more than two unexcused absences in a single cycle may forfeit their reserved spot for future workshops without refund."
      ]
    },
    {
      title: "Waiver of Liability",
      content: [
        "Cheerleading and stunting involve inherent risks of physical injury. By registering, you voluntarily assume all risks associated with participation.",
        "You agree to release, indemnify, and hold harmless YonkoX, its instructors, 'The Lab', and venue owners from any liability regarding personal injury or property damage sustained during workshops."
      ]
    },
    {
      title: "Photo & Video Consent",
      content: [
        "Workshops are frequently documented for training analysis and promotional purposes. Registration grants YonkoX the right to use any photography or video footage taken during sessions.",
        "If you have specific privacy concerns, please submit a written request to the administration prior to the commencement of the workshop cycle."
      ]
    },
    {
      title: "Physical Readiness",
      content: [
        "Participants verify they are in good physical health and have no medical condition that would prevent safe participation in strenuous physical activity.",
        "It is the athlete's responsibility to disclose any recent injuries or physical limitations to the lead instructor before the session begins."
      ]
    },
    {
      title: "Instructor Authority",
      content: [
        "The decisions of YonkoX instructors are final regarding skill progression, group assignments, and safety interventions.",
        "Disrespectful behavior towards instructors or fellow athletes will not be tolerated and is grounds for immediate dismissal from the program."
      ]
    },
    {
      title: "Personal Property",
      content: [
        "YonkoX and hosting venues are not responsible for lost, stolen, or damaged personal belongings. Please leave valuables at home or keep them in designated storage areas at your own risk."
      ]
    },
    {
      title: "Contact Information",
      content: [
        "For inquiries regarding registration, billing, or program details, please contact our support team at support@yonkox.com.",
        "Location Base: Kuala Lumpur, Malaysia"
      ]
    }
  ];

  return (
    <>
      <FixedGradientBackground
        distortion={0.7}
        swirl={0.5}
        speed={0.3}
        veilOpacity="bg-white/40 dark:bg-black/25"
      />
      <div className="min-h-screen font-body selection:bg-[var(--accent-primary)] selection:text-white antialiased">
        {/* Main Content */}
        <main className="relative z-10 pt-32 pb-16 md:pb-24 min-h-screen">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.sectionReveal, ease: EASING.smooth }}
            className="max-w-[900px] mx-auto bg-white/70 dark:bg-[var(--surface)]/70 border border-black/5 dark:border-white/5 shadow-sm p-8 md:p-16"
          >
            {/* Title Section */}
            <div className="mb-12 text-center md:text-left border-b border-black/5 dark:border-white/5 pb-8">
              <span className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.3em] block mb-3">
                Legal Documentation
              </span>
              <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tighter text-[var(--foreground)] mb-4">
                Terms & Conditions
              </h1>
              <p className="text-[var(--foreground)]/60 font-light text-sm md:text-base max-w-2xl">
                Please read the following terms carefully before registering for the Local Circuit Workshops. These policies ensure a safe, productive, and professional environment for all athletes at 'The Lab' and our partner venues in Malaysia.
              </p>
              <p className="text-xs text-[var(--foreground)]/40 mt-4 font-mono">
                Last Updated: October 2023
              </p>
            </div>

            {/* Terms Content */}
            <div className="space-y-12">
              {terms.map((term, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: DURATION.normal,
                    ease: EASING.smooth,
                    delay: index * STAGGER.tight
                  }}
                >
                  <h2 className="font-display font-bold text-xl text-[var(--accent-primary)] uppercase mb-4 flex items-center gap-3">
                    <span className="text-black/10 dark:text-white/10 text-3xl select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {term.title}
                  </h2>
                  <div className="pl-0 md:pl-11 text-[var(--foreground)]/80 leading-relaxed space-y-3 font-light text-sm md:text-base">
                    {term.content.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 text-center">
              <p className="text-xs text-[var(--foreground)]/40 italic">
                By registering for any YonkoX workshop, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-white/70 dark:bg-[var(--surface)]/70 border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--foreground)]/40">
            © 2024 Yonko X Collective — Legal Department
          </div>
          <div className="flex gap-8">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Home
            </Link>
            <Link href="/workshops" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Workshops
            </Link>
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
