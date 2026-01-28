"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

interface HeroSectionGradientProps {
  title?: string;
  highlightText?: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  maxWidth?: string;
  veilOpacity?: string;
  children?: React.ReactNode;
}

// Separate component for the fixed gradient background
export function FixedGradientBackground({
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.35,
  offsetX = 0.08,
  veilOpacity = "bg-white/50 dark:bg-black/30",
}: Pick<HeroSectionGradientProps, 'distortion' | 'swirl' | 'speed' | 'offsetX' | 'veilOpacity'>) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };
    checkTheme();

    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();

    window.addEventListener("resize", update);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  // YonkoX brand colors - Light mode (more vibrant and visible)
  const lightModeColors = [
    "#F4F1E8", // Rice paper base
    "#E8D5D0", // Warm pink-beige
    "#D4B5B0", // Dusty rose
    "#C49A95", // Mauve
    "#B88078", // Terra cotta
    "#A86860", // Soft red-brown
  ];

  // YonkoX brand colors - Dark mode (deeper, ink black inspired)
  const darkModeColors = [
    "#0F0F0F", // Ink black base
    "#1A1515", // Deep charcoal
    "#2A1F1F", // Dark burgundy
    "#3A2828", // Rich brown
    "#4A3535", // Deep taupe
    "#5A4040", // Muted red
  ];

  const colors = isDarkMode ? darkModeColors : lightModeColors;

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      {mounted && (
        <>
          <div className="absolute inset-0">
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
          </div>
          <div className={`absolute inset-0 ${veilOpacity}`} />
        </>
      )}
    </div>
  );
}

export function HeroSectionGradient({
  title,
  highlightText,
  description,
  showButton = false,
  buttonText = "Learn More",
  buttonHref = "#",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-5xl",
  children,
}: HeroSectionGradientProps) {
  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center z-10 ${className}`}
    >
        <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        {children ? (
          children
        ) : (
          <div className="text-center">
            {title && (
              <h1
                className={`font-display font-bold text-[var(--foreground)] text-balance text-4xl sm:text-5xl md:text-6xl xl:text-[80px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] mb-6 lg:text-7xl tracking-tighter uppercase ${titleClassName}`}
              >
                {title}{" "}
                {highlightText && (
                  <span className="text-[var(--accent-primary)] italic">
                    {highlightText}
                  </span>
                )}
              </h1>
            )}
            {description && (
              <p
                className={`font-body text-lg sm:text-xl text-[var(--foreground)]/70 text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 font-light ${descriptionClassName}`}
              >
                {description}
              </p>
            )}
            {showButton && (
              <a
                href={buttonHref}
                className={`inline-block px-8 py-4 sm:px-10 sm:py-5 bg-[var(--accent-primary)] border-2 border-[var(--accent-primary)] text-sm sm:text-base text-white font-display font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:border-[var(--foreground)] transition-all shadow-elegant ${buttonClassName}`}
              >
                {buttonText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
