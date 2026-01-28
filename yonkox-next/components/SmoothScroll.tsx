"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    });

    // Make Lenis instance globally accessible
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.hash && anchor.href.startsWith(window.location.origin)) {
        // Only prevent default if it's a hash link on the current page
        const element = document.querySelector(anchor.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { offset: 0, duration: 1.5 }); // Cinematic scroll duration
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
