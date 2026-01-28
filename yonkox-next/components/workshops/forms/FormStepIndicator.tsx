"use client";

import { motion } from "framer-motion";

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function FormStepIndicator({ currentStep, totalSteps, stepLabels }: FormStepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors
                    ${isActive ? 'bg-primary text-white' : ''}
                    ${isCompleted ? 'bg-[var(--foreground)] text-[var(--background)]' : ''}
                    ${!isActive && !isCompleted ? 'bg-[var(--foreground)]/10 text-[var(--foreground)] opacity-50' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                <p className={`
                  text-[10px] uppercase font-bold tracking-wider mt-2 whitespace-nowrap
                  ${isActive ? 'text-primary' : 'text-[var(--foreground)] opacity-50'}
                `}>
                  {stepLabels[index]}
                </p>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 h-[2px] bg-[var(--foreground)]/10 mx-2 relative">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
