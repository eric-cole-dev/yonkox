"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import type { WorkshopTier } from "@/lib/workshops-config";

interface TierSelectionCardsProps {
  tiers: WorkshopTier[];
  selectedTiers: string[];
  onTierChange: (tierIds: string[]) => void;
  allowMultiple?: boolean;
}

export default function TierSelectionCards({
  tiers,
  selectedTiers,
  onTierChange,
  allowMultiple = true
}: TierSelectionCardsProps) {
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

  const toggleSkills = (tierId: string) => {
    setExpandedSkills(prev => ({ ...prev, [tierId]: !prev[tierId] }));
  };

  const handleTierClick = (tierId: string) => {
    if (allowMultiple) {
      if (selectedTiers.includes(tierId)) {
        onTierChange(selectedTiers.filter(id => id !== tierId));
      } else {
        onTierChange([...selectedTiers, tierId]);
      }
    } else {
      onTierChange([tierId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tiers.map((tier) => {
          const isSelected = selectedTiers.includes(tier.id);
          const areSkillsExpanded = expandedSkills[tier.id];

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASING.smooth }}
              onClick={() => handleTierClick(tier.id)}
              className={`
                relative border-2 p-8 cursor-pointer transition-all duration-300 group
                ${isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-[var(--neutral-900)]/10 bg-[var(--background)] hover:border-[var(--neutral-900)]/30'
                }
              `}
            >
              {/* Checkbox */}
              <div className="absolute top-6 right-6">
                <div className={`
                  w-6 h-6 border-2 rounded flex items-center justify-center transition-all
                  ${isSelected ? 'bg-primary border-primary' : 'border-[var(--neutral-900)]/20'}
                `}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Tier Name */}
              <h3 className="font-display font-bold text-3xl uppercase text-[var(--foreground)] mb-2 pr-10">
                {tier.name}
              </h3>

              {/* Tagline */}
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {tier.tagline}
              </p>

              {/* Description */}
              <p className="text-[var(--foreground)] opacity-70 text-sm leading-relaxed mb-6">
                {tier.description}
              </p>

              {/* Philosophy */}
              <div className="bg-[var(--foreground)]/5 border-l-4 border-primary p-4 mb-6">
                <p className="text-[var(--foreground)] text-sm italic">
                  "{tier.philosophy}"
                </p>
              </div>

              {/* Prerequisites Badge (Elite only) */}
              {tier.prerequisites.required.length > 0 && (
                <div className="mb-4">
                  <span className="inline-block bg-[var(--foreground)] text-[var(--background)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Prerequisites Required
                  </span>
                  <div className="mt-3 space-y-1">
                    {tier.prerequisites.required.map((prereq, index) => (
                      <p key={index} className="text-primary text-sm font-mono">
                        • {prereq}
                      </p>
                    ))}
                  </div>
                  <p className="text-[var(--foreground)] opacity-60 text-xs mt-3 leading-relaxed">
                    {tier.prerequisites.note}
                  </p>
                </div>
              )}

              {tier.prerequisites.required.length === 0 && (
                <div className="mb-4">
                  <span className="inline-block bg-primary/20 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Open to All Levels
                  </span>
                  <p className="text-[var(--foreground)] opacity-60 text-xs mt-3 leading-relaxed">
                    {tier.prerequisites.note}
                  </p>
                </div>
              )}

              {/* View Skills Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSkills(tier.id);
                }}
                className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity text-sm font-bold uppercase tracking-wider group/btn"
              >
                View Skills
                <motion.svg
                  animate={{ rotate: areSkillsExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Expandable Skills List */}
              <AnimatePresence>
                {areSkillsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASING.smooth }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-[var(--neutral-900)]/10">
                      <h4 className="font-display font-bold text-sm uppercase text-[var(--foreground)] mb-4">
                        Skills Covered:
                      </h4>
                      <ul className="space-y-3">
                        {tier.skills.map((skill, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-primary mt-1">•</span>
                            <div className="flex-1">
                              <p className="text-[var(--foreground)] font-bold text-sm">
                                {skill.name}
                              </p>
                              <p className="text-[var(--foreground)] opacity-50 text-xs">
                                Level: {skill.level}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
