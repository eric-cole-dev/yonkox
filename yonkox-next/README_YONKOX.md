# YonkoX Next.js Project Status

## Overview
This project is a high-performance, cinematic Next.js application built for YonkoX, adhering to the "Premium Cinematic Design System". It features fluid animations using Framer Motion, smooth scrolling with Lenis, and a responsive design that works across devices.

## What has been built
1.  **Core Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4.
2.  **Design System**: Implemented the typography (Space Grotesk, Manrope) and Color System (Rice Paper, Ink Black, Primary Red) as defined in `design.md`.
3.  **Animations**:
    *   **Smooth Scroll**: Integrated `lenis` for a premium scroll feel.
    *   **Hero Reveal**: Staggered text reveal animations.
    *   **Section Reveals**: Scroll-triggered animations for all sections.
    *   **Interactive Elements**: Hover states for cards and buttons.
4.  **Components**:
    *   `Navbar`: Fixed, backdrop-blur, responsive, with Dark Mode toggle and logo switching.
    *   `Hero`: Cinematic entry with background Kanji and parallax-like feel.
    *   `EventsSection`: Showcase for upcoming summits.
    *   `TheLabSection`: Technical workshop details.
    *   `CommunitySection`: Elite community leads grid.
    *   `JourneySection`: Timeline of the collective.
    *   `MerchSection`: "Vault" section for member-only gear.
    *   `Footer`: Comprehensive footer.
5.  **Pages**:
    *   `/`: Main Landing Page.
    *   `/join`: Simple waitlist signup page (Placeholder functionality).
6.  **Dark Mode**: Fully implemented with a manual toggle in the Navbar. It persists preference in `localStorage`.

## Placeholders
The following content is currently placeholder and needs to be replaced with real data/assets:

1.  **Images**:
    *   The project currently uses external images from `lh3.googleusercontent.com` (from the original `example.html`). You should replace these with your own high-resolution assets in the `public/` folder or a CMS.
2.  **Links**:
    *   The "Join the Collective" button links to `/join`, which is a static form. It does not actually submit data.
    *   Footer links are currently `#` or generic.
3.  **Videos**:
    *   No videos are currently implemented. The `design.md` mentioned "videos and images i would need to provide". See below.

## Assets Needed from You
To finalize the site, please provide:

1.  **High-Res Images**:
    *   **Hero Background**: Currently using a texture. If you have a specific hero video or image, let me know.
    *   **Event Images**: High quality photos for "Local Circuit", "Winter Summit", etc.
    *   **The Lab**: Technical diagram or photo for the "Anatomy of the High Toss" section.
    *   **Community**: Headshots for Eric, Shen Qian, Mayven, Marcus.
    *   **Merch**: Transparent PNGs or studio shots of the Hoodie, Cap, and Compression gear.
2.  **Videos** (Optional but recommended for "Cinematic" feel):
    *   A short, looped background video for the **Hero Section** (replacing the static gradient/texture) would significantly boost the "premium" feel.
    *   A showreel for the **Events Section**.

## Improvements / Next Steps
1.  **CMS Integration**: Connect to a CMS (Sanity, Contentful) to manage events and merch easily without code changes.
2.  **Form Backend**: Connect the `/join` form and footer newsletter form to an email service (Resend, Mailchimp).
3.  **SEO Optimization**: Add proper meta tags, OpenGraph images, and structured data.
4.  **Performance**: Optimize local images using `next/image` (once you provide the files) instead of hotlinking external URLs.
5.  **Mobile Menu**: The current Navbar hides links on mobile but doesn't have a hamburger menu implementation. This is a critical usability improvement needed for mobile users.

## How to Run
```bash
npm install
npm run dev
```
