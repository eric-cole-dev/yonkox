"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import { FixedGradientBackground } from "@/components/ui/hero-section-gradient";

export default function InternationalSummitTermsPage() {
  const terms = [
    {
      title: "No Refund Policy",
      content: [
        "Due to the extensive overheads required to secure international venues, travel logistics for elite staff, and specialized equipment for our clinics, all registration fees are strictly non-refundable. This policy applies regardless of injury, illness, or personal schedule changes.",
        "In specific hardship cases, credit for future domestic workshops may be offered at the sole discretion of YonkoX management."
      ]
    },
    {
      title: "Language Requirement",
      content: [
        "To ensure safety during high-risk maneuvers and clarity in technical coaching, the official language of instruction is English.",
        "While we welcome global athletes, participants must possess a working proficiency in English to understand rapid-fire safety cues and technical feedback during stunting sequences."
      ]
    },
    {
      title: "Skill Expectations",
      content: [
        "This summit is designed for elite progression. Athletes must meet the stated prerequisites for their registered division. Instructors reserve the right to assess skills on Day 1.",
        "Athletes failing to demonstrate the required baseline competency may be moved to a non-stunting observational role for their own safety, without refund."
      ]
    },
    {
      title: "Safety & Liability",
      content: [
        "Cheerleading involves inherent risks of severe injury. By participating, you voluntarily assume all risks associated with the activity, including but not limited to falls, contact with other participants, and equipment usage.",
        "YonkoX, its affiliates, and venue partners are released from liability for injuries sustained during the summit, except in cases of proven gross negligence."
      ]
    },
    {
      title: "Media Release",
      content: [
        "The International Summit is a documented event. Participants grant YonkoX the irrevocable right to use their name, likeness, and image in photographs, video recordings, and other media captured during the event.",
        "This media may be used for marketing, promotional, and educational purposes worldwide, without compensation."
      ]
    },
    {
      title: "Health & Insurance",
      content: [
        "Comprehensive travel and health insurance is mandatory for all international attendees. Proof of insurance covering athletic activities and emergency medical evacuation must be provided 14 days prior to the event start date.",
        "Failure to provide documentation may result in forfeiture of your spot."
      ]
    },
    {
      title: "Code of Conduct",
      content: [
        "We foster an environment of elite professionalism. Participants are expected to treat instructors, staff, and fellow athletes with absolute respect.",
        "Bullying, harassment, or unsafe behavior will result in immediate expulsion from the summit without refund. Respect for the host culture and venue regulations is equally mandatory."
      ]
    },
    {
      title: "Schedule Changes",
      content: [
        "While we strive to adhere to the published itinerary, YonkoX reserves the right to modify the schedule, instructor lineup, or curriculum content at any time due to unforeseen circumstances.",
        "Changes may be made to better suit the progression rate of the attending athletes."
      ]
    },
    {
      title: "Force Majeure",
      content: [
        "YonkoX is not liable for failure to perform its obligations if such failure is as a result of Acts of God (including fire, flood, earthquake, storm, hurricane or other natural disaster), war, invasion, act of foreign enemies, hostilities, civil war, rebellion, revolution, insurrection, military or usurped power or confiscation, terrorist activities, nationalization, government sanction, blockage, embargo, labor dispute, strike, lockout or interruption or failure of electricity or telephone service."
      ]
    },
    {
      title: "Data Privacy",
      content: [
        "Personal data collected during registration is used solely for the administration of the event and internal safety records. We adhere to strict data protection standards.",
        "We will not sell or share your personal information with third parties unrelated to the direct logistics of the summit without your explicit consent."
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
                International Summit<br />
                <span className="text-[var(--accent-primary)]">Terms & Conditions</span>
              </h1>
              <p className="text-[var(--foreground)]/60 font-light text-sm md:text-base max-w-2xl">
                The following terms govern participation in our international cheerleading summits. By registering, athletes and guardians acknowledge the rigor of these global events and agree to the stipulations below.
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
                By registering for any YonkoX international summit, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
              </p>
              <div className="mt-6">
                <p className="text-xs text-[var(--foreground)]/40 font-bold uppercase tracking-widest mb-2">
                  Questions?
                </p>
                <a
                  href="mailto:legal@yonkox.com"
                  className="text-sm font-bold text-[var(--accent-primary)] hover:underline"
                >
                  legal@yonkox.com
                </a>
              </div>
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
            <Link href="/summit/hailey-kollin" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[var(--accent-primary)] transition-colors">
              Summit
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
