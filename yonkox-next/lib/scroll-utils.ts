// Extend Window interface for TypeScript
declare global {
  interface Window {
    lenis?: any;
  }
}

export const scrollToTop = (smooth: boolean = false) => {
  if (typeof window !== 'undefined') {
    // Use Lenis if available for smooth scrolling
    if (window.lenis && smooth) {
      window.lenis.scrollTo(0, { duration: 0.8 });
    } else {
      // Force instant scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
};

export const scrollToElement = (elementId: string, offset: number = 100) => {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(elementId);
    if (element) {
      // Use Lenis if available
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -offset, duration: 1.2 });
      } else {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
};
