"use client";

import { motion } from "framer-motion";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";
import Image from "next/image";
import { useState } from "react";
import ReservationModal from "./ReservationModal";

const PRODUCTS = [
  {
    name: "Ares Technical Jacket",
    version: "v1.0",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChaf0JPbdfBQE7q2SWmecj83vLkemfqSD1pAuo__akDkQnwEh7Z2ZH33kOwTo2mgFi_zPJdSwNA3184QFoKknCu_c-YdcjbZfvpZQNOWNl2q8QshoMx8ExxSRa_GDTfhL7ACeD9rUTPOMRir-TcdBZkh52kjUt-UATEPlNvdlUkNtjEjHXnbVb_IvD8ZrcJ0mwXHH5dmKq9bFgl6JBGsAi33pDJTu99HOahAwqLDuTEbs9oMKf1fobS_6-s9cKBZfcYfzJrI3NaAI",
  },
  {
    name: "Elite Performance Tee",
    version: "v1.2",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCJNMqrglDLI6TvO2eiAPlUQxE_HojCxjR9IKY5qJ0EaK26ESeiyEKFV10IyXkU6cBumCzZM8Gv_foceQ2U3OAcyMeDPQIcKa68G0gjuXHbEXoABfJC1LdRMkBabCr0ayeAH0xcxTON154ytDS6sdkeyVwfIvi1cnknrZs5PBml2HcUH15MvUfVwFcgOtHqLH2tpkQepot1fP_hZhpDNc4RCauwhpCG1Rz4we3FPGRlx4zWAsuuKFIJmjn9Zd2ggBlSFg3l0-oVMc",
  },
  {
    name: "Shadow Graphix Tee",
    version: "v2.0",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9z43f5Nr-Xd8tEve-u2tMOU-t-e-cWafgTBiRiM5A8JvDs1tbVgDWETAiLTSXKVyRs8Vf-OMShfqbaF2HGoxXe1wh7gsQ8ALgwWdOm2W3xIPlh-UE7AGUEZnfIkQ2W_6lqCd6n2UYLgvyUcohE9oDvoi7Zuk2b6Wy-0pnidZnvGG7Nxl1nffjPJPFidLemWyPCPY9Y1zYzA1rdA_b_5JQ5f2u_MhZi88HX3XoT6gFXRdcVKnX8Ew16qhEkvwr630ZTRkzQlURM3E",
  },
];

export default function MerchSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="merch"
      className="relative z-10 py-32 bg-[var(--background)]/50 border-t border-[var(--neutral-900)]/5"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
      }}
    >
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultEvent="Join Family / Newsletter"
        customMessage="Join the collective to be notified when limited Member-Only assets are released."
      />

      <div className="container mx-auto px-6 mb-20 text-center">
        <span className="font-display text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4 block">
          Limited Assets
        </span>
        <h2 className="font-display font-bold text-5xl uppercase text-[var(--foreground)] mb-6">
          Merch Vault
        </h2>
        <div className="w-16 h-[2px] bg-primary mx-auto mb-6"></div>
        <p className="font-body text-[var(--foreground)] opacity-50 text-sm max-w-sm mx-auto uppercase tracking-widest">
          Available to the Collective only.
        </p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-12">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.normal,
              delay: index * STAGGER.relaxed,
              ease: EASING.smooth,
            }}
            className={`relative group ${index === PRODUCTS.length - 1 ? 'col-span-2 lg:col-span-1 max-w-[calc(50%-0.375rem)] lg:max-w-none mx-auto lg:mx-0' : ''}`}
          >
            <div className="aspect-[4/5] overflow-hidden p-12 frosted-vault relative shadow-card border border-[var(--neutral-900)]/5 transition-transform hover:-translate-y-2 duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-contain filter blur-2xl opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-4 drop-shadow-sm">
                  lock
                </span>
                <span className="font-display text-[10px] font-bold text-[var(--foreground)] uppercase tracking-[0.3em]">
                  MEMBER_ONLY
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h4 className="font-display font-bold text-xl text-[var(--foreground)] uppercase mb-1">
                {product.name}
              </h4>
              <p className="text-[var(--foreground)] opacity-40 text-[10px] uppercase font-mono mb-2">
                Prototype // {product.version}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-transparent border border-[var(--foreground)] text-[var(--foreground)] font-display font-bold text-xs uppercase px-12 py-4 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all tracking-widest cursor-pointer"
        >
          Request Member Access
        </button>
      </div>
    </section>
  );
}
