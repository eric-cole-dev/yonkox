# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YonkoX is a high-performance, cinematic Next.js application built with the App Router. It implements a premium design system with fluid animations using Framer Motion, smooth scrolling with Lenis, and a fully responsive dark/light mode system.

**Technology Stack:**
- Next.js 16 (App Router)
- TypeScript 5
- React 19
- Tailwind CSS v4
- Framer Motion (animations)
- Lenis (smooth scroll)

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
yonkox-next/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles, CSS variables, theme system
│   ├── layout.tsx               # Root layout with fonts, metadata
│   ├── page.tsx                 # Home page (landing page)
│   ├── privacy/                 # Privacy policy page
│   └── terms/                   # Terms page
├── components/                   # React components
│   ├── Navbar.tsx               # Fixed navbar with dark mode toggle
│   ├── Hero.tsx                 # Hero section with background switching
│   ├── EventsSection.tsx        # Summit/workshop cards
│   ├── TheLabSection.tsx        # Technical workshop section
│   ├── CommunitySection.tsx     # Team/community grid
│   ├── JourneySection.tsx       # Timeline section
│   ├── MerchSection.tsx         # Merchandise showcase
│   ├── Footer.tsx               # Footer with links
│   ├── ReservationModal.tsx     # Event registration modal (Google Apps Script backend)
│   ├── CookieConsent.tsx        # GDPR cookie consent banner
│   ├── SmoothScroll.tsx         # Lenis smooth scroll wrapper
│   └── ui/                      # UI primitives (button, animated-theme-toggle)
├── lib/
│   ├── animation-config.ts      # Centralized animation constants (EASING, DURATION, STAGGER)
│   └── utils.ts                 # Utility functions (cn for className merging)
└── public/                       # Static assets (images, logos)
```

## Architecture & Design System

### Animation System

The project implements a **centralized animation configuration** in `lib/animation-config.ts`:

- **EASING**: Consistent cubic-bezier curves (`smooth`, `spring`, `elastic`, `easeInOut`, `easeOut`, `easeIn`)
- **DURATION**: Timing constants for all animations (`fast`, `normal`, `slow`, `heroReveal`, `sectionReveal`, etc.)
- **STAGGER**: Sequential animation delays (`tight`, `normal`, `relaxed`, `loose`)
- **shouldReduceMotion()**: Utility to respect user accessibility preferences

**When modifying animations:**
- Always use tokens from `animation-config.ts` instead of magic numbers
- Use GPU-accelerated properties only: `transform` and `opacity`
- Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Use Framer Motion's `initial`, `animate`, `whileInView` variants
- Add `viewport={{ once: true, margin: "-50px" }}` for scroll-triggered reveals

### Color System

The design uses a **semantic color token system** defined in `app/globals.css`:

**Brand Colors:**
- `--color-primary: #80011E` (YonkoX Red)
- `--color-rice-paper: #F4F1E8` (Light background)
- `--color-ink-black: #0F0F0F` (Dark background)

**Light/Dark Mode:**
- Theme toggle uses CSS custom variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Dark mode state managed in `Navbar.tsx` with `localStorage` persistence
- Theme transitions use View Transitions API with diagonal wipe animation (`::view-transition-new(root)`)

**When adding new colors:**
- Define CSS variables in `@theme` block in `globals.css`
- Use `var(--color-name)` in Tailwind classes
- Ensure sufficient contrast for WCAG AA compliance (4.5:1 for body text)

### Typography

**Fonts:**
- Display: Space Grotesk (`--font-space-grotesk`)
- Body: Manrope (`--font-manrope`)
- Loaded via `next/font/google` in `app/layout.tsx`

**Type Scale:**
- Headings: `font-display font-bold tracking-tighter`
- Body: `font-body font-light` (large body) or `font-regular` (default)

### Smooth Scroll

The project uses **Lenis** for cinematic smooth scrolling:
- Implemented in `components/SmoothScroll.tsx`
- Wraps all content in `app/layout.tsx`
- Uses `requestAnimationFrame` loop for 60fps performance
- Respects `prefers-reduced-motion`

### Component Patterns

**Scroll-Triggered Reveals:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{
    duration: DURATION.sectionReveal,
    ease: EASING.smooth,
    delay: index * STAGGER.normal
  }}
>
```

**Hero Text Reveals:**
```tsx
<div className="overflow-hidden">
  <motion.div
    initial={{ y: "110%" }}
    animate={{ y: 0 }}
    transition={{
      duration: DURATION.heroReveal,
      ease: EASING.smooth,
      delay: lineIndex * STAGGER.loose
    }}
  >
```

**Hover Effects:**
- Cards: `hover:-translate-y-2 hover:shadow-xl transition-all duration-500`
- Buttons: `hover:bg-[var(--accent-hover)] transition-all duration-300`
- Use `group` and `group-hover:` for nested hover effects

## Important Conventions

### Styling
- Use Tailwind CSS classes exclusively (no inline styles or CSS modules)
- Use `className` merging via `cn()` utility from `lib/utils.ts`
- Prefix custom CSS variables with `--color-`, `--font-`, `--shadow-`, etc.
- Responsive breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`

### Component Structure
- All components that use Framer Motion or browser APIs must be `"use client"`
- Server components by default (no directive needed)
- Import animation constants: `import { EASING, DURATION, STAGGER } from "@/lib/animation-config"`
- Use `next/image` for all images with `priority` for above-fold content

### Accessibility
- All interactive elements have focus states: `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`
- Buttons with icons have `aria-label` attributes
- Navigation landmarks use semantic HTML (`<nav>`, `<main>`, `<footer>`)
- Respect `prefers-reduced-motion` using `shouldReduceMotion()` helper

### File Paths
- Use `@/` alias for imports (configured in `tsconfig.json`)
- Example: `import { EASING } from "@/lib/animation-config"`

## Backend Integration

**Reservation Form:**
- Component: `components/ReservationModal.tsx`
- Backend: Google Apps Script (Web App URL)
- Setup: See `yonkox-next/APPS_SCRIPT_README.md` for deployment steps
- Update `SCRIPT_URL` constant in `ReservationModal.tsx` after deployment

**Cookie Consent:**
- Component: `components/CookieConsent.tsx`
- Stores consent in `localStorage` (`cookieConsent` key)
- GDPR-compliant banner with accept/reject options

## Design Philosophy

This project follows the **Premium Cinematic Design System** documented in `/design.md`:

1. **Cinematic Motion**: Every interaction feels intentional with smooth, physics-based animations
2. **Generous Spacing**: Ample white space (`py-24 md:py-32` for sections)
3. **Performance First**: 60fps animations, optimized images, code splitting
4. **Accessible**: Reduced motion support, keyboard navigation, WCAG AA contrast
5. **Modular**: Reusable animation patterns and component structure

**Core Principles:**
- Use animation tokens consistently (no magic numbers)
- Prefer `transform` and `opacity` for animations (GPU-accelerated)
- Keep animations subtle and purposeful (not distracting)
- Test on mobile with reduced CPU throttling
- Stagger sequential animations for rhythm (50-200ms delays)

## Common Tasks

**Adding a new section:**
1. Create component in `components/` (e.g., `NewSection.tsx`)
2. Use `"use client"` if adding animations
3. Import animation constants: `import { EASING, DURATION, STAGGER } from "@/lib/animation-config"`
4. Wrap section in scroll-triggered reveal using `motion.section`
5. Add section to `app/page.tsx`

**Adding a new page:**
1. Create folder in `app/` (e.g., `app/about/`)
2. Add `page.tsx` inside the folder
3. Export default React component
4. Add link to `components/Navbar.tsx` and `components/Footer.tsx`

**Modifying dark mode:**
- Colors: Update CSS variables in `app/globals.css` (use `dark:` prefix)
- Toggle logic: `components/Navbar.tsx` (theme state management)
- Transition animation: `::view-transition-new(root)` in `globals.css`

**Optimizing images:**
1. Place images in `public/` directory
2. Use `next/image` component with `width` and `height`
3. Add `priority` prop for above-fold images
4. Use `loading="lazy"` for below-fold images
5. Configure `remotePatterns` in `next.config.ts` for external images

## Known Placeholders

These items need real content/assets:
- External images from `lh3.googleusercontent.com` (replace with local assets)
- Footer links (currently `#` placeholders)
- Privacy and Terms pages (basic templates exist)
- Google Apps Script URL in `ReservationModal.tsx` (requires setup)

## Performance Guidelines

- Target metrics: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Use `next/image` with responsive sizes: `sizes="(max-width: 768px) 100vw, 50vw"`
- Lazy load components below the fold: `const Component = dynamic(() => import('./Component'))`
- Minimize `will-change` usage (only for persistent animations)
- Remove `will-change` after animations complete
- Test performance with Chrome DevTools (Performance tab, 4x CPU throttling)
