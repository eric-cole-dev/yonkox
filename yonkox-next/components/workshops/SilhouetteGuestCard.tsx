"use client";

import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import Image from "next/image";

interface SilhouetteGuestCardProps {
  name?: string;
  country?: string;
  flag?: string;
  team?: string;
  teamNote?: string;
  bio?: string;
  photo: string | null;
  hint?: string;
  silhouette?: boolean;
  index?: number;
}

export default function SilhouetteGuestCard({
  name,
  country,
  flag,
  team,
  teamNote,
  bio,
  photo,
  hint,
  silhouette = false,
  index = 0
}: SilhouetteGuestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: DURATION.sectionReveal,
        ease: EASING.smooth,
        delay: index * 0.1
      }}
      className="border border-[var(--neutral-900)]/10 bg-[var(--background)] overflow-hidden group"
    >
      {/* Photo/Silhouette */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
        {silhouette ? (
          // Silhouette placeholder
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--foreground)]/10 to-[var(--foreground)]/5">
            <svg
              className="w-32 h-32 text-[var(--foreground)] opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        ) : photo ? (
          <Image
            src={photo}
            alt={name || "Guest Instructor"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          // Empty placeholder for confirmed guest without photo yet
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--foreground)]/5">
            <svg
              className="w-24 h-24 text-[var(--foreground)] opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/* Mystery Badge (for silhouettes) */}
        {silhouette && (
          <div className="absolute top-6 right-6 bg-primary px-4 py-2">
            <span className="text-white text-[10px] font-display font-bold uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {silhouette ? (
          // Mystery guest hint
          <>
            <div className="h-8 w-3/4 bg-[var(--foreground)]/10 mb-3 rounded"></div>
            <p className="text-primary font-mono text-sm tracking-wider mb-4">
              {hint || "Mystery Guest"}
            </p>
            <p className="text-[var(--foreground)] opacity-50 text-sm italic">
              Identity will be revealed soon...
            </p>
          </>
        ) : (
          // Confirmed guest details
          <>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display font-bold text-3xl uppercase text-[var(--foreground)]">
                {name}
              </h3>
              {flag && (
                <span className="text-4xl" aria-label={country}>
                  {flag}
                </span>
              )}
            </div>

            {country && (
              <p className="text-primary font-mono text-xs tracking-wider uppercase mb-2">
                {country}
              </p>
            )}

            {team && (
              <div className="mb-4">
                <p className="text-[var(--foreground)] font-bold text-sm mb-1">{team}</p>
                {teamNote && (
                  <p className="text-[var(--foreground)] opacity-60 text-xs italic">
                    {teamNote}
                  </p>
                )}
              </div>
            )}

            {bio && (
              <p className="text-[var(--foreground)] opacity-70 text-sm leading-relaxed">
                {bio}
              </p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
