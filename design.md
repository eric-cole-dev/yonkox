# Premium Cinematic Design System
**A Brand-Agnostic Animation & Interaction Framework**

Version: 2.0
Last Updated: January 2026

---

## 📐 Design Philosophy

### Core Principles
1. **Cinematic Motion** - Every interaction feels intentional and premium
2. **Generous Spacing** - Ample white space guides user attention
3. **Performance First** - 60fps animations, optimized for all devices
4. **Accessible** - Respects reduced motion, maintains usability
5. **Modular** - Reusable patterns across any brand or project

### Emotional Goals
- **Arrival**: Instant premium feel with smooth hero reveals
- **Flow**: Guided scroll experience like a cinematic reel
- **Discovery**: Micro-interactions reward user attention
- **Confidence**: Crisp, controlled, performant, professional

---

## 🎨 Color System (Brand-Agnostic)

### Semantic Color Tokens
Define these CSS variables based on your brand:

```css
/* Foundation */
--background: ...;       /* Primary background */
--foreground: ...;       /* Primary text color */
--surface: ...;          /* Cards, elevated surfaces */

/* Brand Accent */
--accent-primary: ...;   /* Primary brand color */
--accent-hover: ...;     /* Hover state (typically darker/lighter) */
--accent-light: ...;     /* Subtle highlights */
--accent-medium: ...;    /* Medium emphasis */

/* Neutrals */
--neutral-50: ...;       /* Lightest gray */
--neutral-100: ...;
--neutral-200: ...;      /* Borders, dividers */
--neutral-300: ...;
--neutral-400: ...;
--neutral-500: ...;      /* Secondary text */
--neutral-600: ...;
--neutral-700: ...;
--neutral-800: ...;
--neutral-900: ...;      /* Darkest gray */

/* Functional */
--success: ...;
--warning: ...;
--error: ...;
```

### Usage Guidelines
- **Background**: Use primary background for main canvas
- **Text**: High contrast foreground for readability
- **Accent**: Use sparingly - CTAs, highlights, active states
- **Neutrals**: Create hierarchy with neutral shades
- **Borders**: Subtle neutrals for dividers, emphasis for visible borders

---

## ✍️ Typography System

### Font Strategy
Choose fonts that match your brand:

```typescript
// Body Font: Modern sans-serif (readable, professional)
// Examples: Inter, Helvetica Neue, SF Pro, Roboto, system-ui
font-family: var(--font-body), system-ui, sans-serif;

// Display Font: Distinctive headings (optional)
// Examples: Space Grotesk, Archivo, Manrope, or same as body
font-family: var(--font-display), var(--font-body), sans-serif;
```

### Type Scale
```css
/* Headings */
--text-8xl: 96px;   /* Hero titles */
--text-7xl: 72px;   /* Page titles */
--text-6xl: 60px;   /* Section titles */
--text-5xl: 48px;
--text-4xl: 36px;
--text-3xl: 30px;
--text-2xl: 24px;   /* Card titles */
--text-xl: 20px;    /* Large body */

/* Body */
--text-lg: 18px;    /* Large body */
--text-base: 16px;  /* Default body */
--text-sm: 14px;    /* Small text */
--text-xs: 12px;    /* Captions, labels */
```

### Font Weights
```css
--font-light: 300;     /* Large body text */
--font-regular: 400;   /* Default body */
--font-medium: 500;    /* Emphasized text */
--font-semibold: 600;  /* Subheadings */
--font-bold: 700;      /* Headings */
```

### Typography Patterns
```typescript
// Headings
"font-display font-bold tracking-tighter"   // H1-H3
"font-display font-semibold tracking-tight" // H4-H6

// Body
"font-body font-light"    // Large body text
"font-body font-regular"  // Default body
"font-body font-medium"   // Emphasized text
```

### Line Heights
```css
--leading-tight: 1.15;    /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
```

---

## 🎬 Animation System

### Easing Functions
**Core Animation Philosophy**: Use these consistent easing curves across all animations.

```typescript
// Centralized easing curves (cubic-bezier)
const EASING = {
  smooth: [0.16, 1, 0.3, 1],          // Primary - cinematic, smooth
  spring: [0.68, -0.55, 0.265, 1.55], // Playful bounce (use sparingly)
  elastic: [0.87, 0, 0.13, 1],        // Dramatic reveals
  easeInOut: [0.4, 0, 0.2, 1],        // Standard
  easeOut: [0, 0, 0.2, 1],            // Deceleration
  easeIn: [0.4, 0, 1, 1],             // Acceleration
}
```

**When to use each**:
- `smooth`: Default for most animations (hero reveals, page transitions)
- `spring`: Playful interactions (like buttons, emoji reactions)
- `elastic`: Dramatic reveals (modals, important callouts)
- `easeInOut/Out/In`: Functional animations (dropdowns, tooltips)

### Duration Tokens
**Core Animation Philosophy**: Consistent timing creates cohesive feel.

```typescript
const DURATION = {
  // Page transitions
  pageTransition: 0.8,    // Full page transitions
  maskWipe: 1.2,          // Hero mask reveals

  // Element animations
  fast: 0.3,              // Micro-interactions (hovers, clicks)
  normal: 0.5,            // Standard animations
  slow: 0.8,              // Section reveals
  verySlow: 1.2,          // Hero animations

  // Specific use cases
  heroReveal: 0.8,        // Hero text reveals
  sectionReveal: 0.6,     // Section scroll reveals
  hoverTransition: 0.3,   // Hover effects
}
```

### Stagger Delays
**Core Animation Philosophy**: Create rhythm with sequential reveals.

```typescript
const STAGGER = {
  tight: 0.05,     // 50ms - tight sequences (nav items)
  normal: 0.1,     // 100ms - default stagger (cards)
  relaxed: 0.15,   // 150ms - relaxed spacing (features)
  loose: 0.2,      // 200ms - dramatic reveals (hero lines)
}
```

### Smooth Scroll Configuration
```typescript
const SCROLL = {
  smoothness: 1.2,      // Higher = smoother but less responsive
  lerp: 0.07,           // Linear interpolation (0-1)
  duration: 1.5,        // Scroll duration multiplier
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  // Scroll-triggered reveals
  revealThreshold: 0.15,  // 15% of viewport
  revealMargin: '-100px', // Start animation before element enters
}
```

### Custom Cursor (Desktop)
```typescript
const CURSOR = {
  size: 12,               // Base cursor size (px)
  hoverScale: 2,          // Scale on interactive elements
  clickScale: 0.8,        // Scale on click
  transitionDuration: 0.2 // Cursor transition speed
}
```

---

## 🎭 Animation Variants (Framer Motion)

### Core Patterns
```typescript
// Fade In
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

// Fade In Up (Most common)
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Fade In Down
{
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

// Scale In
{
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

// Slide In Left
{
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

// Slide In Right
{
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
}
```

### Transition Presets
```typescript
// Smooth (Default - use this most often)
{
  duration: DURATION.normal,
  ease: EASING.smooth
}

// Spring (Physics-based)
{
  type: 'spring',
  stiffness: 100,
  damping: 20
}

// Bounce (Playful)
{
  type: 'spring',
  stiffness: 300,
  damping: 10
}
```

---

## 📦 Component Patterns

### Navigation Bar
```typescript
// Behavior
- Fixed top position (z-50)
- Transparent initially, solid background on scroll
- Smooth height compression on scroll
- Active section indicator

// State Classes
{
  default: "py-5 bg-transparent border-transparent",
  scrolled: "py-3 bg-[var(--surface)]/90 backdrop-blur-xl
             border-[var(--neutral-200)] shadow-sm"
}

// Timing
- Transition: 500ms smooth easing
- Mobile menu: 300ms easeInOut
```

### Buttons
```typescript
// Primary Button
{
  base: "px-8 py-4 rounded-lg font-semibold",
  style: "bg-[var(--accent-primary)] text-white",
  hover: "hover:bg-[var(--accent-hover)] transition-all duration-300",
  shadow: "shadow-xl hover:shadow-2xl"
}

// Secondary Button
{
  base: "px-8 py-4 rounded-lg font-semibold",
  style: "border border-[var(--neutral-200)] bg-[var(--surface)]/50",
  hover: "hover:border-[var(--accent-light)] hover:text-[var(--accent-primary)]",
  transition: "transition-colors duration-300"
}

// Hover Effects
- translateY: -2px (lift)
- scale: 1.02
- Shadow bloom
- Icon translation (arrows: +2px)
```

### Cards
```typescript
// Hover Effect
{
  transform: "hover:-translate-y-2",
  shadow: "hover:shadow-2xl",
  duration: "duration-500",
  border: "hover:border-[var(--accent-light)]"
}

// Reveal Animation (Scroll-triggered)
{
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: DURATION.sectionReveal,
    ease: EASING.smooth,
    delay: index * STAGGER.normal
  }
}
```

### Text Reveals
```typescript
// Line-by-line reveal (Hero)
{
  container: "overflow-hidden",
  animation: {
    initial: { y: "110%" },
    whileInView: { y: 0 },
    transition: {
      duration: DURATION.heroReveal,
      ease: EASING.smooth,
      delay: lineIndex * STAGGER.loose
    }
  }
}

// Fade in (Body)
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    delay: 0.6,
    duration: DURATION.slow
  }
}

// Word-by-word reveal (Advanced)
{
  words: text.split(' '),
  animation: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: (wordIndex) => ({
      duration: DURATION.fast,
      delay: wordIndex * STAGGER.tight
    })
  }
}
```

### Image Reveals
```typescript
// Mask reveal (Ken Burns effect)
{
  container: "overflow-hidden",
  image: {
    initial: { scale: 1.1 },
    whileInView: { scale: 1 },
    transition: {
      duration: DURATION.maskWipe,
      ease: EASING.easeOut
    }
  }
}

// Parallax (subtle depth)
{
  scrollY: useScroll(),
  y: useTransform(scrollY, [0, 500], [0, 150]),
  maxMovement: "6-12%" // Keep subtle
}

// Fade + Scale reveal
{
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: {
    duration: DURATION.slow,
    ease: EASING.smooth
  }
}
```

---

## 📏 Spacing System

### Scale (Tailwind Default)
```css
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
40: 160px
```

### Section Spacing
```typescript
// Vertical section padding
"py-24 md:py-32"    // Standard sections
"py-16 md:py-20"    // Compact sections
"py-32 md:py-40"    // Hero sections
"py-12 md:py-16"    // Tight sections

// Container widths
"max-w-7xl mx-auto px-6"  // Standard container (1280px)
"max-w-4xl mx-auto px-6"  // Narrow content (896px)
"max-w-6xl mx-auto px-6"  // Wide content (1152px)
```

### Gap Spacing
```typescript
gap-3   // Tight (12px) - Tags, small groups
gap-6   // Normal (24px) - Cards, grid items
gap-8   // Relaxed (32px) - Feature sections
gap-12  // Loose (48px) - Major section breaks
gap-16  // Very loose (64px) - Page sections
```

---

## 🎯 Interactive States

### Hover States
```typescript
// Links
"hover:text-[var(--accent-primary)] transition-colors duration-300"

// Buttons
"hover:bg-[var(--accent-hover)] transition-all duration-300"
"group-hover:translate-x-1 transition-transform"

// Cards
"hover:shadow-xl hover:border-[var(--accent-light)]
 transition-all duration-500"

// Icons
"group-hover:scale-110 transition-transform"
"group-hover:rotate-45 transition-transform" // For arrows, external links
```

### Focus States (Accessibility)
```typescript
// Keyboard focus
"focus-visible:outline-none focus-visible:ring-2
 focus-visible:ring-[var(--accent-primary)]
 focus-visible:ring-offset-2"
```

### Active States
```typescript
// Links/Nav
"text-[var(--accent-primary)]"  // Active navigation item

// Buttons
"active:scale-95"  // Click feedback
"active:brightness-95" // Darken on click
```

### Loading States
```typescript
// Progress bars
<motion.div
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
  transition={{ duration: 2, ease: EASING.easeOut }}
  className="h-full bg-[var(--accent-primary)] rounded-full"
/>

// Pulse indicators
"animate-pulse bg-[var(--accent-light)]"

// Skeleton loading
"animate-pulse bg-[var(--neutral-200)] rounded"
```

---

## 🏗️ Layout System

### Grid
```typescript
// Standard grid
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Bento grid (varied heights)
"grid auto-rows-[minmax(280px,auto)] gap-6"

// Responsive patterns
sm: 1-2 cols (mobile)
md: 2-3 cols (tablet)
lg: 3-4 cols (desktop)
xl: 4-6 cols (large desktop)
```

### Flexbox
```typescript
// Common layouts
"flex items-center justify-between"  // Navbar
"flex flex-col gap-6"                // Vertical stacks
"flex flex-wrap gap-2"               // Tags, badges
"flex items-start gap-4"             // Icon + text pairs
```

### Z-Index Layers
```css
z-0   : Background elements, decorative shapes
z-10  : Content, cards, default layer
z-20  : Sticky elements, floating UI
z-30  : Dropdowns, tooltips
z-40  : Modal overlays, mobile menu backdrop
z-50  : Fixed navigation, modals
z-[9998]: Custom cursor ring
z-[9999]: Custom cursor dot
```

---

## ♿ Accessibility

### Reduced Motion Support
```typescript
// Check user preference
const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Conditional animation
if (shouldReduceMotion()) {
  return <div>{children}</div>;  // No animation
}

return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);
```

### Keyboard Navigation
```typescript
// Focus visible states
"focus-visible:outline-none focus-visible:ring-2"

// Tab order (natural document flow)
tabIndex={0}  // Interactive elements
tabIndex={-1} // Decorative elements (skip)

// Skip to content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### ARIA Labels
```typescript
// Navigation
aria-label="Main navigation"
role="navigation"

// Buttons with icons only
aria-label="Toggle menu"
aria-expanded={isOpen}

// Landmarks
role="main"
role="complementary"
role="contentinfo"

// Dynamic content
aria-live="polite"
aria-atomic="true"
```

### Color Contrast
- **Body text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text** (18px+): Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against background
- **Focus indicators**: Minimum 3:1 contrast ratio

---

## 🚀 Performance Guidelines

### Animation Performance
```typescript
// ✅ GPU-accelerated properties (60fps capable)
transform: translate/scale/rotate
opacity

// ❌ Avoid (triggers layout/paint)
width, height, top, left, margin, padding

// Example: Move element right
❌ left: 0 → left: 100px       // Bad (layout)
✅ transform: translateX(100px) // Good (composite)
```

### Will-Change Usage
```css
/* Use sparingly, only for persistent animations */
.custom-cursor {
  will-change: transform;
}

.animating-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
onAnimationComplete={() => {
  element.style.willChange = 'auto';
}}
```

### Loading Strategy
```typescript
// Critical path (prioritize)
1. Critical CSS (inline)
2. Fonts (preload, font-display: swap)
3. Hero content (SSR/SSG)
4. Above-fold images (priority)

// Deferred (lazy load)
1. Below-fold images (loading="lazy")
2. Non-critical animations (delay initialization)
3. Analytics, third-party scripts (defer)
4. Heavy libraries (code split)
```

### Image Optimization
```typescript
// Next.js Image component (or equivalent)
<Image
  src="/hero.jpg"
  alt="Description"
  width={1920}
  height={1080}
  priority={isAboveFold}  // True for hero images
  loading={isAboveFold ? 'eager' : 'lazy'}
  quality={90}  // 80-90 is good balance
/>

// Responsive images
srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
sizes="(max-width: 768px) 100vw, 50vw"
```

---

## 🎨 Component Library Spec

### Required Components

**1. Custom Cursor** (Desktop only)
- Dot (12px) + ring (40px hover) design
- Hover state expansion (scale: 2)
- Click feedback (scale: 0.8)
- Blend mode: `mix-blend-difference` (inverts on hover)
- Hide on touch devices: `@media (hover: none)`

**2. Page Transitions**
- Mask wipe overlay (full-screen)
- 5 transition types: wipe-right, wipe-left, wipe-up, wipe-down, circle-expand
- Duration: DURATION.maskWipe (1.2s)
- Layered depth effect (use z-index)

**3. Section Reveals**
- Scroll-triggered animations (Intersection Observer or Framer Motion viewport)
- Stagger children support
- Direction variants: fade-up (default), fade-down, fade-left, fade-right, fade
- Margin trigger: `-50px` to `-100px` (start before visible)

**4. Smooth Scroll**
- Lenis library integration (or similar)
- RAF (requestAnimationFrame) loop for 60fps
- Programmatic scrollTo helpers
- Optional on mobile (performance consideration)

**5. Text Reveal**
- Line-by-line stagger animation
- Overflow-hidden container wrapper
- translateY(110%) to translateY(0)
- Respects reduced motion (instant reveal)

**6. Animation Orchestrator** (Hook)
- Manages cleanup of all animations
- Prevents memory leaks
- Pauses animations when tab is hidden
- Centralized RAF, timeout, interval management

---

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Small tablets, large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large desktops
}
```

### Mobile Adaptations
- **Disable custom cursor** on touch devices
- **Simplify animations**: Reduce duration by 25%, skip heavy effects
- **Touch targets**: Minimum 44x44px tap targets
- **Reduce stagger**: Use tighter stagger values on mobile
- **Optional smooth scroll**: Consider disabling Lenis on mobile

---

## 🔧 Implementation Checklist

### Setup
- [ ] Install dependencies (framer-motion, lenis if using smooth scroll)
- [ ] Configure Tailwind with custom fonts and colors
- [ ] Create `animation-config.ts` with EASING, DURATION, STAGGER tokens
- [ ] Set up `globals.css` with CSS variables and base styles
- [ ] Configure font loading strategy (next/font, preload, etc.)

### Core Systems
- [ ] Smooth scroll with Lenis (optional)
- [ ] Custom cursor component (desktop only)
- [ ] Page transition system (if multi-page)
- [ ] Section reveal components (scroll-triggered)
- [ ] Reduced motion detection and support
- [ ] Animation orchestrator hook

### Components
- [ ] Responsive navigation (fixed, scrolled states)
- [ ] Button variants (primary, secondary, with hover effects)
- [ ] Card components with hover effects
- [ ] Text reveal animations (hero, body)
- [ ] Form focus states (accessible)

### Quality Assurance
- [ ] 60fps animations (Chrome DevTools Performance)
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Accessibility audit (keyboard nav, screen reader)
- [ ] Mobile performance check (throttle CPU 4x)
- [ ] Reduced motion testing

---

## 💼 Usage Example

### Complete Animation Config
```typescript
// animation-config.ts
export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  spring: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.87, 0, 0.13, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
}

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
}

export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
  loose: 0.2,
}

// Helper to check reduced motion
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

### Component Implementation Example
```typescript
// Animated Card Component
import { motion } from 'framer-motion';
import { EASING, DURATION, STAGGER } from './animation-config';

interface CardProps {
  index: number;
  title: string;
  content: string;
}

export const AnimatedCard = ({ index, title, content }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: DURATION.sectionReveal,
        ease: EASING.smooth,
        delay: index * STAGGER.normal
      }}
      whileHover={{ y: -8 }}
      className="group bg-[var(--surface)] rounded-2xl p-8
                 border border-[var(--neutral-200)]
                 hover:border-[var(--accent-light)]
                 hover:shadow-xl transition-all duration-500"
    >
      <h3 className="font-display font-bold text-2xl mb-4
                     text-[var(--foreground)]">
        {title}
      </h3>
      <p className="font-body text-[var(--neutral-600)] leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};
```

### Hero Text Reveal Example
```typescript
// Hero with line-by-line reveal
import { motion } from 'framer-motion';
import { EASING, DURATION, STAGGER } from './animation-config';

export const HeroText = ({ lines }: { lines: string[] }) => {
  return (
    <div className="space-y-2">
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: DURATION.heroReveal,
              ease: EASING.smooth,
              delay: index * STAGGER.loose
            }}
            className="font-display font-bold text-6xl md:text-8xl
                       tracking-tighter text-[var(--foreground)]"
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
```

---

## 📝 Implementation Notes

### Key Principles
1. **Consistency**: Use animation tokens everywhere (no magic numbers)
2. **Accessibility**: Always respect `prefers-reduced-motion`
3. **Performance**: Prefer `transform` and `opacity` for animations
4. **Responsiveness**: Adapt animations for mobile (simplify or disable)
5. **Modularity**: Extract reusable animation variants

### Browser Support
- Modern browsers (last 2 versions)
- Graceful degradation for older browsers
- CSS Grid with flexbox fallback
- Intersection Observer with fallback (instant reveals)

### Design Tokens
All visual values (colors, spacing, typography) should be defined as:
- CSS variables for runtime flexibility
- Tailwind config for build-time optimization
- TypeScript constants for animation timing

---

**This design system is brand-agnostic and project-portable.**

To implement in a new project:
1. Define your brand colors in CSS variables
2. Choose your fonts and configure them
3. Copy `animation-config.ts` as-is
4. Implement components using the patterns above
5. Customize spacing/typography to match brand guidelines

For questions or contributions, refer to implementation examples in your codebase.
