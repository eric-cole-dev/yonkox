# YonkoX - Malaysia's Premier Stunt Collective

A high-performance, cinematic Next.js application showcasing YonkoX, Malaysia's premier stunt collective specializing in technical workshops and international athlete summits.

## 🎯 Features

### Core Functionality
- **Dynamic Landing Page** with cinematic hero section and animated text reveals
- **Event Management** - Summit and workshop event cards with registration modal
- **Dark/Light Mode** - Seamless theme switching with no flash (FICT prevention)
- **Smooth Scrolling** - Lenis-powered 60fps smooth scroll experience
- **Responsive Design** - Optimized for all screen sizes from mobile to desktop
- **GDPR Compliance** - Cookie consent banner with localStorage persistence

### Visual Design
- **Mesh Gradient Background** - WebGL-powered animated gradients using @paper-design/shaders-react
- **Framer Motion Animations** - Scroll-triggered reveals, stagger animations, and micro-interactions
- **Editorial Design System** - Brutalist typography with generous spacing and minimal aesthetic
- **Premium UX** - GPU-accelerated animations, reduced motion support, WCAG AA compliance

### Technical Features
- **Zero Flash Dark Mode** - Blocking script prevents FICT (Flash of Inaccurate Color Theme)
- **Optimized Images** - Next.js Image component with priority loading for above-fold content
- **Centralized Animation Config** - Consistent easing, duration, and stagger tokens
- **Hash Navigation** - Smart scroll-to-section with auto-scroll delay support
- **Scroll-to-Top** - Smooth return to top functionality

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Fonts**: Space Grotesk (Display), Manrope (Body)
- **Gradient Engine**: @paper-design/shaders-react
- **UI Components**: Custom component library

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd yonkox-next

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
yonkox-next/
├── app/
│   ├── globals.css           # Global styles, CSS variables, theme system
│   ├── layout.tsx            # Root layout with dark mode script
│   ├── page.tsx              # Landing page
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms pages
│   ├── summit/               # Summit event pages
│   └── workshops/            # Workshop pages
├── components/
│   ├── Navbar.tsx            # Navigation with theme toggle
│   ├── Hero.tsx              # Hero section with fade-in backgrounds
│   ├── EventsSection.tsx     # Event cards display
│   ├── TheLabSection.tsx     # Workshop section
│   ├── CommunitySection.tsx  # Team/community grid
│   ├── JourneySection.tsx    # Timeline section
│   ├── MerchSection.tsx      # Merchandise showcase
│   ├── Footer.tsx            # Site footer
│   ├── ReservationModal.tsx  # Event registration form
│   ├── CookieConsent.tsx     # GDPR cookie banner
│   ├── SmoothScroll.tsx      # Lenis scroll wrapper
│   ├── ScrollToTop.tsx       # Scroll-to-top button
│   └── ui/
│       ├── hero-section-gradient.tsx  # Mesh gradient component
│       └── ...               # Other UI primitives
├── lib/
│   ├── animation-config.ts   # Animation tokens (EASING, DURATION, STAGGER)
│   ├── scroll-utils.ts       # Scroll helper functions
│   ├── workshops-config.ts   # Workshop data configuration
│   └── utils.ts              # Utility functions
└── public/                   # Static assets (images, logos)
```

## 🎨 Design System

### Animation System
The project uses centralized animation tokens from `lib/animation-config.ts`:

- **EASING**: Consistent cubic-bezier curves (`smooth`, `spring`, `elastic`)
- **DURATION**: Timing constants (`fast`, `normal`, `slow`, `heroReveal`)
- **STAGGER**: Sequential delays (`tight`, `normal`, `relaxed`, `loose`)

All animations use GPU-accelerated properties (`transform`, `opacity`) for 60fps performance.

### Color System
Semantic color tokens defined in `app/globals.css`:

- **Light Mode**: Rice paper background (#F4F1E8), ink black text (#0F0F0F)
- **Dark Mode**: Ink black background (#0F0F0F), rice paper text (#F4F1E8)
- **Primary Accent**: YonkoX Red (#80011E light, #BF002F dark)

### Typography
- **Display**: Space Grotesk (headings, bold, tracking-tighter)
- **Body**: Manrope (paragraphs, font-light to font-regular)
- **Accent**: Oswald (uppercase labels, tracking-widest)

## 🔧 Key Technical Implementations

### Dark Mode Flash Prevention
A blocking inline script in `app/layout.tsx` detects theme preference before first paint:

```typescript
// Prevents FICT (Flash of Inaccurate Color Theme)
const theme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (theme === 'dark' || (!theme && prefersDark)) {
  document.documentElement.classList.add('dark');
}
```

The `<html>` tag includes `suppressHydrationWarning` to prevent React hydration mismatches.

### Smooth Scrolling
Lenis smooth scroll implemented in `components/SmoothScroll.tsx`:
- 60fps requestAnimationFrame loop
- Respects `prefers-reduced-motion`
- Hash navigation support with auto-scroll

### Image Optimization
- Next.js Image component with `priority` for hero images
- `fill` layout with `object-cover` for full-section backgrounds
- Lazy loading for below-fold content

## 🌐 Deployment

The application is optimized for deployment on Vercel:

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

For other platforms, ensure Node.js 18+ is available and run:
```bash
npm run build && npm start
```

## 📝 Environment Variables

Currently, the application uses:
- **Google Apps Script URL** for form submissions (hardcoded in `ReservationModal.tsx`)

To configure, update the `SCRIPT_URL` constant in `components/ReservationModal.tsx`.

## 🎯 Performance

- **LCP**: < 2.5s (optimized images, priority loading)
- **CLS**: < 0.1 (reserved space for images, no layout shifts)
- **FID**: < 100ms (GPU-accelerated animations, minimal JavaScript)

## 📄 Documentation

For detailed project guidelines and conventions, see:
- `CLAUDE.md` - Development guidelines and architecture decisions
- `WORKSHOP_SYSTEM_SPEC.md` - Workshop system specifications

## 🤝 Contributing

This is a private project for YonkoX Malaysia. For inquiries, contact the YonkoX team.

## 📜 License

Proprietary - All rights reserved by YonkoX Malaysia.

---

Built with ❤️ for the YonkoX community.
