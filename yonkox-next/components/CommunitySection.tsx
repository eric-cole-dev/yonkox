"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Image from "next/image";

const LEADS = [
  {
    name: "Eric",
    role: "Founder",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-5tpibSE9Rr60DSOdqM4gItAo3CYzICH4lTUYj8pBDHq87XyLCR0hLjwdw-Cq9fSqPgY2aq0yB_YsQhw1PsyRxoOiDU_jy5WzfkAUa1eleLD-9kVmUddxyXizJBJgyRHq8assbqOOdxr3rfagL_S0H7yXR1pfSd4sWIK63bQvLfo0j2sQZFtjaUuOkbrIQLdZ3dIzeXlLV05QK3aj68BwkhVKAf_Qy8jax_U-wW2O9wiEcNXXDJ6FxyICnQbhIEus_X9R4dtc-pY",
  },
  {
    name: "Shen Qian",
    role: "Stunt Specialist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYt2TXuWoYQiviq2288hdibroQS-oeGECD56sl3lUf6Jf40aupx1lVW6wuR5mPK0uPmRMrboWLQ2YZsHrwM0ZsvLn2IzoJ-R_h60VvqtN2N6WPVoh0Wp7klb-N2O72J9PpHU27RsXqZIeyfgtqyLclX7W81CvdXh71AFELFFEWn1F-nGNwA6_osNQ3zgdxbQPYgaquv7yY4krsQRJWPBwP1pnJEp6UyeirKRog8ml0OezL6H70H5bIRm-CjMicGYit14nEfYyIy9g",
  },
  {
    name: "Mayven",
    role: "Stunt Specialist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85Da5KndKDpmj2I9EAPJQ1jK6qBJmSz2vh-YHrXnqLlpU30-VO49IDDcbf1h5axhwhhryR4zESctMidA1rSNaQbAyaunblJDWUyHJtrtnc04_JhEORp58qYutCpvknVi0dn_Tzbfr_JE51-_qnDpRvgqua8zYAcg4sAF6ei4iNqH5avx7jjEj5w_bQmGIO3L3M-SnI1JupCjWLu0krycB0Uo5z58YNJORvNv9TXOdKrGm1femw3WCLp0CAFn103iSwH7_0re5FQk",
  },
];

export default function CommunitySection() {
  return (
    <section className="py-32 bg-[var(--background)] border-b border-[var(--neutral-900)]/5">
      <div className="container mx-auto px-6 text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.sectionReveal }}
          className="font-display font-bold text-5xl uppercase text-[var(--foreground)] mb-6"
        >
          Community Vanguards
        </motion.h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {LEADS.map((lead, index) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.normal,
              delay: index * STAGGER.relaxed,
              ease: EASING.smooth,
            }}
            className="group text-center"
          >
            <div className="aspect-[3/4] bg-[var(--surface)] overflow-hidden relative mb-6 border border-[var(--neutral-900)]/5 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-card group-hover:shadow-lg">
              <Image
                src={lead.img}
                alt={lead.name}
                fill
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--foreground)] uppercase mb-1">
              {lead.name}
            </h3>
            <p className="text-primary text-[10px] font-mono uppercase tracking-widest">
              {lead.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
