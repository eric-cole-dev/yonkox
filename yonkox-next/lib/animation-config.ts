// animation-config.ts
export const EASING = {
  smooth: [0.16, 1, 0.3, 1] as const,
  spring: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.87, 0, 0.13, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
};

export const DURATION = {
  pageTransition: 0.8,
  maskWipe: 1.2,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
  heroReveal: 0.8,
  sectionReveal: 0.6,
  hoverTransition: 0.3,
};

export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
  loose: 0.2,
};

// Helper to check reduced motion (Run on client side)
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
