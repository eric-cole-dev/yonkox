# YonkoX Workshop System - Complete Implementation Specification

**Date:** 2026-01-22
**Project:** YonkoX Next.js Website Workshop System Redesign
**Status:** Planning Complete - Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current System Analysis](#current-system-analysis)
3. [Proposed Architecture](#proposed-architecture)
4. [Route Structure](#route-structure)
5. [Workshop Configuration System](#workshop-configuration-system)
6. [Component Architecture](#component-architecture)
7. [Workshop Detail Pages](#workshop-detail-pages)
8. [Form Systems](#form-systems)
9. [Terms & Conditions](#terms--conditions)
10. [Backend Integration](#backend-integration)
11. [UI/UX Specifications](#uiux-specifications)
12. [Copy & Messaging](#copy--messaging)
13. [Implementation Phases](#implementation-phases)
14. [Technical Requirements](#technical-requirements)

---

## Executive Summary

### Overview
YonkoX is migrating from a modal-based registration system to a dedicated page-based workshop system. This allows for richer content presentation, multi-step registration flows, and scalable workshop management for both local and international summit events.

### Key Changes
- **Remove:** Simple modal with basic form fields
- **Add:** Dedicated workshop detail pages with video content, schedules, instructor bios, and sophisticated multi-step forms
- **Route Structure:** `/workshops` for local, `/summit/[slug]` for international guests
- **Backend:** Single Google Spreadsheet with multiple sheets for different workshop types
- **Forms:** Context-aware forms that collect different data based on workshop type

### Workshop Types
1. **Local Circuit Workshops** - Recurring bi-weekly skill-focused sessions
2. **Hailey & Kollin Summit** - 2-day international elite training (Foundation + Elite tiers)
3. **Daniel Bailey Special Guest** - International summit with mystery co-instructors
4. **Future International Summits** - Scalable architecture for future guests

---

## Current System Analysis

### Existing Components

**EventsSection.tsx** (yonkox-next/components/EventsSection.tsx)
- Displays 3 workshop cards: Local Circuit, Hailey & Kollin, Special Guest
- Uses modal-based registration via `ReservationModal`
- Simple click handlers: `onClick={() => openModal("Event Name")}`
- Current implementation lines 20-24, 63, 98, 143

**ReservationModal.tsx** (yonkox-next/components/ReservationModal.tsx)
- Universal modal for all registrations (workshops, newsletter, merch access)
- Fields: Name, Email, Phone, Instagram, Event dropdown
- Single-step form with conditional messaging based on event type
- Google Apps Script integration (placeholder URL at line 45)
- Success/error states with visual feedback

### Limitations of Current System
- Cannot display rich media (videos, photo galleries)
- No space for detailed schedules or instructor bios
- Single-step form cannot handle complex flows (tier selection, private class interest)
- All registrations use same basic fields regardless of workshop needs
- No dedicated space for vision/mission, terms, or workshop-specific content

---

## Proposed Architecture

### Design Philosophy
**Scalable, Content-Rich, Workshop-Specific**

Each workshop type gets dedicated pages that can showcase:
- Video introductions from instructors
- Detailed skill breakdowns
- Schedules and progression paths
- Custom registration flows
- Workshop-specific terms and conditions

### Core Principles
1. **Single Source of Truth:** Workshop data centralized in `lib/workshops-config.ts`
2. **Dynamic Routing:** Reusable page templates with slug-based content
3. **Component Modularity:** Shared UI components with workshop-specific overrides
4. **Form Flexibility:** Different forms for different workshop types
5. **Easy Activation/Deactivation:** Control workshop visibility via config flags
6. **Maintainable:** Add new workshops without duplicating code

---

## Route Structure

### URL Architecture

```
├── /workshops                           # Local Circuit workshops landing page
├── /summit/hailey-kollin               # Hailey & Kollin Summit detail page
├── /summit/daniel-bailey               # Daniel Bailey special guest page
├── /summit/[future-slug]               # Future international summits
├── /terms/international-summit         # T&Cs for international events
└── /terms/local-workshops              # T&Cs for local workshops
```

### Route Rationale

**Why `/workshops` vs `/summit/[slug]`?**
- Clear namespace separation: Local (ongoing) vs Summit (special events)
- Allows different page layouts and messaging tone
- Easy to communicate: "Visit yonkox.com/workshops" vs "Visit yonkox.com/summit/hailey-kollin"
- SEO benefit: Targeted keywords for each category
- Future-proof: Can add `/workshops/[slug]` later if local workshops expand to multiple types

**Why `/summit/[slug]` over `/workshops/usa-2026-05`?**
- Cleaner, more memorable URLs
- "Summit" conveys prestige and exclusivity
- Country/date in page metadata instead of URL
- Easy to remove/archive old summits by simply deactivating config

### File Structure

```
app/
├── workshops/
│   └── page.tsx                        # Local Circuit workshops page
├── summit/
│   └── [slug]/
│       └── page.tsx                    # Dynamic summit detail page (Hailey & Kollin, Daniel Bailey, etc.)
└── terms/
    ├── international-summit/
    │   └── page.tsx                    # International summit T&Cs
    └── local-workshops/
        └── page.tsx                    # Local workshop T&Cs
```

---

## Workshop Configuration System

### Central Configuration File
**Location:** `lib/workshops-config.ts`

This file contains all workshop data, metadata, and form configurations. Updating content requires editing this file only, not individual pages.

### Configuration Schema

```typescript
// lib/workshops-config.ts

export interface WorkshopConfig {
  id: string;                           // URL slug
  type: 'local' | 'summit';            // Workshop category
  active: boolean;                      // Show/hide from site
  title: string;                        // Display title
  subtitle?: string;                    // Optional subtitle
  tagline?: string;                     // Short descriptor
  date?: string;                        // Event date (for summits)
  location?: string;                    // Event location
  duration?: string;                    // Event duration
  formType: string;                     // Which form component to render
  sheetName: string;                    // Google Sheets tab name
  termsUrl: string;                     // Link to T&Cs page
  // ... additional fields based on workshop type
}

export const WORKSHOPS: Record<string, WorkshopConfig> = {
  'local': { /* ... */ },
  'hailey-kollin': { /* ... */ },
  'daniel-bailey': { /* ... */ },
};
```

### Complete Workshop Configurations

#### **Local Circuit Workshops**

```typescript
'local': {
  id: 'local',
  type: 'local',
  active: true,
  title: 'Local Circuit Workshops',
  tagline: 'How to Toss Higher',
  currentFocus: 'Toss Hands & Toss Block Fundamentals',

  schedule: {
    frequency: 'Bi-weekly',
    timeSlots: [
      { time: '2:00 PM - 3:00 PM', focus: 'Skill Session 1' },
      { time: '3:00 PM - 4:00 PM', focus: 'Skill Session 2' }
    ],
    format: '15-minute focused drills per skill',
    philosophy: 'Each session teaches drills you can take home and practice independently.',
  },

  visionMission: {
    headline: 'Our Approach to Skill Development',

    introduction: 'We believe in structured, progressive learning with clear entry points. Each workshop builds on the last, with realistic goals you can achieve and practice independently.',

    methodology: {
      title: 'Structured Progression',
      description: 'Rather than one-off workshops, we offer multi-session learning paths. Each session builds on the previous, creating a clear roadmap from beginner to advanced.',
      example: {
        title: 'Example: Toss Progression Path',
        sessions: [
          {
            number: 1,
            title: 'Foundations of a Toss',
            content: 'Introduction to toss mechanics – drills and foundational movements',
            prerequisite: 'Open to all levels'
          },
          {
            number: 2,
            title: 'How to Catch a Toss',
            content: 'Body positioning and timing – balance and stability in the air',
            prerequisite: 'Attended Session 1 or can perform basic toss prep'
          },
          {
            number: 3,
            title: 'How to Toss Higher',
            content: 'Explosive power and technique – achieving better height and control',
            prerequisite: 'Comfortable with basic tosses and catching'
          },
          {
            number: 4,
            title: 'Advanced Toss Variations',
            content: 'Full ups, kick fulls, and specialty tosses – refining technique',
            prerequisite: 'Consistent with standard tosses'
          }
        ]
      }
    },

    entryPoints: {
      title: 'Clear Entry Points',
      description: 'We set clear expectations for each workshop so you know exactly where you stand. No ambiguity, no intimidation – just honest guidance on what you need to know before attending.',
      exampleExpectation: 'Attending "How to Toss Higher"? We expect you to be comfortable catching basic tosses. This way, you can focus on technique, not struggling with fundamentals.',
    },

    sessionFormat: {
      title: 'Focused, Practical Learning',
      duration: '1 hour per session',
      structure: '15-minute focused drills per skill',
      takeaway: 'Every session is designed to give you actionable drills you can practice at home or during free training time. Learn it here, master it on your own.',
    },

    currentOfferings: {
      title: 'Current Workshop Focus',
      skills: ['Toss Hands', 'Toss Block'],
      note: 'Based on community interest, we adapt our workshop schedule to focus on the skills you want to learn most.',
    }
  },

  instructors: [
    {
      name: 'TBD',
      title: 'Stunt Specialist',
      photo: null,  // Placeholder - empty Facebook-style profile icon
      bio: null
    },
    {
      name: 'TBD',
      title: 'Stunt Specialist',
      photo: null,
      bio: null
    }
  ],

  formType: 'local',
  sheetName: 'Local_Workshops',
  termsUrl: '/terms/local-workshops',
}
```

#### **Hailey & Kollin Summit**

```typescript
'hailey-kollin': {
  id: 'hailey-kollin',
  type: 'summit',
  active: true,
  title: 'Hailey & Kollin Summit',
  subtitle: 'Team USA Elite In Malaysia',
  date: 'May 2026',
  location: 'Kuala Lumpur',
  duration: '2 Days',

  videos: {
    center: {
      title: 'Stunts Compilation',
      description: 'Watch Hailey & Kollin in action',
      url: 'YOUR_S3_OR_YOUTUBE_URL',  // Replace with actual video URL
      thumbnail: null,
      autoplay: true,
      defaultExpanded: true
    },
    left: {
      title: 'Hailey has something to say to u!',
      description: 'Personal message from Hailey to Malaysia',
      url: 'HAILEY_HI_MALAYSIA_VIDEO_URL',  // Replace with actual video URL
      thumbnail: null,
      autoplay: false,
      defaultExpanded: false
    },
    right: {
      title: 'Kollin has something to say to u!',
      description: 'Personal message from Kollin to Malaysia',
      url: 'KOLLIN_HI_MALAYSIA_VIDEO_URL',  // Replace with actual video URL
      thumbnail: null,
      autoplay: false,
      defaultExpanded: false
    }
  },

  overview: {
    headline: 'Learn from Team USA's Elite Athletes',
    description: 'Hailey and Kollin bring world-class technique and training methodology directly to Kuala Lumpur. This is a rare opportunity to learn from athletes who represent the pinnacle of American cheerleading.',
    format: '2-day intensive workshop with separate Foundation and Elite tiers',
    workshopStructure: {
      day1: {
        title: 'Day 1: Skill Introduction & Fundamentals',
        description: 'Introduction to techniques, drills, and foundational movements. Focus on understanding the "why" behind each skill.'
      },
      day2: {
        title: 'Day 2: Refinement & Repetition',
        description: 'Refine what you learned on Day 1. Repetition, feedback, and building consistency.'
      }
    }
  },

  tiers: [
    {
      id: 'foundation',
      name: 'Foundation Tier',
      tagline: 'Build Elite-Level Basics',

      description: 'This tier focuses on building world-class fundamentals. Learn WHY USA has such incredible basics – it's not about hitting skills, it's about understanding technique, body awareness, and proper form. Expect to refine your foundation and develop a deeper understanding of skill execution.',

      skills: [
        { name: 'Toss Hands', level: 'Foundational' },
        { name: 'Toss Block', level: 'Foundational' },
        { name: 'Full Up / Any Full Skills', level: 'Foundational' },
        { name: 'Hand Hand', level: 'Foundational' }
      ],

      philosophy: 'Technique over repetition. Form over flash. Understanding over execution.',

      prerequisites: {
        required: [],  // Open to all levels
        recommended: 'Willingness to learn and refine fundamentals, regardless of current skill level',
        note: 'This tier is open to all levels. Whether you're new to these skills or have been doing them for years, you'll gain insight into elite-level technique.'
      },

      schedule: {
        day1: 'Skill introduction & fundamentals',
        day2: 'Refinement & repetition'
      }
    },
    {
      id: 'elite',
      name: 'Elite Tier',
      tagline: 'Advanced Technique Mastery',

      description: 'This tier is designed for athletes ready to push their limits. Focus on high-level skills, advanced technique work, and building consistency in complex movements. Expect intensive drills, detailed feedback, and progression toward mastery.',

      skills: [
        { name: 'Rewind (Basic)', level: 'Advanced' },
        { name: 'Fronthand Up Cupie Fronthand Full', level: 'Advanced' },
        { name: 'Handski', level: 'Advanced' },
        { name: '1 Arm Rewinds', level: 'Elite' }
      ],

      philosophy: 'Precision, power, and control. Building consistency in advanced movements.',

      prerequisites: {
        required: [
          'Hand Hand Extension',
          'Fronthand Up'
        ],
        recommended: 'Strong body awareness and comfort with advanced stunting',
        note: 'Participants are expected to have the listed prerequisites before attending. If you're not quite there yet, we encourage you to join Foundation Tier or work on these skills and attend future summits. Understanding the risks of attending without meeting prerequisites is your responsibility.'
      },

      schedule: {
        day1: 'Advanced skill introduction & technique breakdown',
        day2: 'Refinement, consistency, and pushing limits'
      }
    }
  ],

  tierSelectionNote: {
    bothTiers: 'Selecting both tiers means you're committing to attend BOTH workshops, not choosing between them. You'll receive details for both Foundation and Elite sessions.',
    encouragement: 'Choose the tier(s) that align with your current skill level and goals. There's no wrong choice – both tiers offer incredible value.'
  },

  privateClasses: {
    available: true,
    headline: 'Private Coaching with Hailey & Kollin',
    description: 'Get personalized, one-on-one (or paired) coaching directly from Hailey and Kollin. Limited availability.',

    types: [
      {
        id: '1-on-1',
        name: '1-on-1 Coaching',
        description: 'Individual attention focused on your specific goals and skills'
      },
      {
        id: '2-on-1',
        name: '2-on-1 (Flyer & Base Pair)',
        description: 'Partner coaching for flyer/base pairs to build chemistry and technique'
      }
    ],

    schedule: 'Weekdays only',
    availability: 'First-come, first-serve time slots',
    pricing: {
      disclosed: false,
      note: 'Premium pricing applies. Details provided upon inquiry.'
    },
    limitations: 'Extremely limited availability – register interest early to secure your spot.',
  },

  earlyBirdMessage: "Don't miss out on our early bird discounts! Register your interest now to be notified when pricing drops and early bird slots open up.",

  formType: 'hailey-kollin',
  sheetName: 'Hailey_Kollin_Summit',
  termsUrl: '/terms/international-summit',
}
```

#### **Daniel Bailey Special Guest Summit**

```typescript
'daniel-bailey': {
  id: 'daniel-bailey',
  type: 'summit',
  active: true,
  title: 'Special Guest Summit',
  subtitle: 'International Elite Coaching',
  date: 'Sept/Oct 2026',
  location: 'Kuala Lumpur',

  confirmed: {
    name: 'Daniel Bailey',
    country: 'Australia',
    flag: '🇦🇺',
    team: 'ex Weber State University',
    teamNote: 'Weber State University is recognized as one of the world's strongest university cheer teams.',
    bio: 'Elite athlete with world-class experience from the strongest university cheer program globally. Daniel brings high-level technique and training methodology honed at the top tier of competitive cheerleading.',
    photo: null,  // Placeholder - will be updated when photo is provided
    skills: [],   // TBD based on workshop focus
  },

  mysteryGuests: [
    {
      silhouette: true,
      hint: 'Elite International Coach',
      photo: null,  // Silhouette placeholder
      revealed: false
    },
    {
      silhouette: true,
      hint: 'World Champion Athlete',
      photo: null,  // Silhouette placeholder
      revealed: false
    }
  ],

  suspenseMessage: 'We're bringing more elite talent to Malaysia. Stay tuned for reveals...',

  formType: 'generic-summit',
  sheetName: 'Daniel_Bailey_Summit',
  termsUrl: '/terms/international-summit',
}
```

---

## Component Architecture

### Directory Structure

```
components/
├── workshops/
│   ├── WorkshopHero.tsx                    # Video hero with expandable cards
│   ├── WorkshopOverview.tsx                # Workshop description and overview section
│   ├── WorkshopSchedule.tsx                # Schedule timeline component
│   ├── WorkshopInstructors.tsx             # Instructor bios with photos
│   ├── WorkshopVisionMission.tsx           # Vision/mission for local workshops
│   ├── TierSelectionCards.tsx              # Tier selection UI for summits
│   ├── SilhouetteGuestCard.tsx             # Mystery guest card with silhouette
│   └── forms/
│       ├── HaileyKollinForm.tsx            # Multi-step form for H&K summit
│       ├── LocalWorkshopForm.tsx           # Local workshop registration form
│       ├── GenericSummitForm.tsx           # Generic form for future summits
│       └── FormStepIndicator.tsx           # Progress indicator for multi-step forms
├── EventsSection.tsx                        # Updated to link to pages (not modal)
├── TheLabSection.tsx                        # Updated to link to /workshops
└── ReservationModal.tsx                     # DEPRECATED (or kept for legacy routes)
```

### Component Descriptions

#### **WorkshopHero.tsx**
Expandable video card hero section.

**Features:**
- 3 video cards: Left (Hailey), Center (Compilation), Right (Kollin)
- Default state: Center card expanded and autoplaying
- Click interaction: Expand clicked card, collapse others, pause previous video
- Smooth horizontal expansion animation
- Video playback controls
- Responsive: Stack vertically on mobile (future enhancement)

**Props:**
```typescript
interface WorkshopHeroProps {
  videos: {
    left?: { title: string; url: string; autoplay: boolean };
    center: { title: string; url: string; autoplay: boolean };
    right?: { title: string; url: string; autoplay: boolean };
  };
  title: string;
  subtitle?: string;
}
```

#### **WorkshopSchedule.tsx**
Visual timeline/schedule component.

**Features:**
- Day-by-day breakdown
- Time slots with descriptions
- Visual timeline with animations (scroll-triggered reveals)
- Prerequisite callouts

**Props:**
```typescript
interface WorkshopScheduleProps {
  schedule: {
    day1: { title: string; description: string; timeSlots?: Array<{time: string; activity: string}> };
    day2: { title: string; description: string; timeSlots?: Array<{time: string; activity: string}> };
  };
}
```

#### **WorkshopInstructors.tsx**
Instructor showcase with bios and photos.

**Features:**
- Grid layout (2-4 instructors)
- Photo placeholder if image is null (Facebook-style empty profile)
- Name, title, and bio
- Hover effects with scale animation

**Props:**
```typescript
interface InstructorCardProps {
  instructors: Array<{
    name: string;
    title: string;
    photo: string | null;
    bio?: string;
  }>;
}
```

#### **TierSelectionCards.tsx**
Interactive tier selection for multi-tier summits.

**Features:**
- Checkbox-style cards (can select multiple if allowed)
- Expandable skill lists
- Prerequisite badges
- Conditional message when both tiers selected
- Animated selection states

**Props:**
```typescript
interface TierSelectionCardsProps {
  tiers: Array<{
    id: string;
    name: string;
    tagline: string;
    skills: Array<{ name: string; level: string }>;
    prerequisites: { required: string[]; recommended: string; note: string };
  }>;
  selectedTiers: string[];
  onTierChange: (tierIds: string[]) => void;
  allowMultiple: boolean;
}
```

---

## Workshop Detail Pages

### Local Workshops Page
**Route:** `/workshops`
**Component:** `app/workshops/page.tsx`

**Page Sections (Top to Bottom):**

1. **Hero Section**
   - Title: "Local Circuit Workshops"
   - Tagline: "How to Toss Higher"
   - Subtitle: "Bi-weekly skill-focused training sessions in Kuala Lumpur"
   - Background: Subtle gradient or team photo

2. **Vision & Mission Section**
   - Headline: "Our Approach to Skill Development"
   - Introduction paragraph
   - Methodology breakdown (structured progression)
   - Example progression path (Toss series)
   - Entry points explanation
   - Session format details

3. **Current Workshop Focus**
   - "Currently Offering: Toss Hands & Toss Block Fundamentals"
   - Brief skill descriptions
   - Next session date (if available)

4. **Schedule & Format**
   - Bi-weekly schedule
   - Time slots: 2-3pm, 3-4pm
   - 15-minute drill format explanation
   - Visual timeline/calendar

5. **Instructors**
   - Grid of instructor cards (placeholders with "Stunt Specialist" title)
   - Empty profile icons

6. **Registration Form Section**
   - Headline: "Register Your Interest in Our Local Workshops"
   - LocalWorkshopForm component
   - Early bird discount message (if applicable)

7. **Terms & Conditions Link**
   - Link to `/terms/local-workshops`

---

### Hailey & Kollin Summit Page
**Route:** `/summit/hailey-kollin`
**Component:** `app/summit/[slug]/page.tsx` (with slug="hailey-kollin")

**Page Sections (Top to Bottom):**

1. **Hero Section with Expandable Videos**
   - WorkshopHero component
   - 3 video cards: Hailey intro, Compilation (center, default expanded), Kollin intro
   - Title overlay: "Hailey & Kollin Summit"
   - Subtitle: "Team USA Elite In Malaysia • May 2026 • Kuala Lumpur"

2. **Overview Section**
   - Headline: "Learn from Team USA's Elite Athletes"
   - Description paragraph
   - 2-day format explanation
   - Day 1 vs Day 2 breakdown

3. **Tier Selection Section**
   - Headline: "Choose Your Tier"
   - TierSelectionCards component
   - Foundation Tier card (skills, description, prerequisites)
   - Elite Tier card (skills, description, prerequisites)
   - Both tiers message (when both selected)

4. **Private Coaching Section**
   - Headline: "Private Coaching with Hailey & Kollin"
   - Description
   - 1-on-1 vs 2-on-1 options
   - Availability and pricing note
   - Encouraging CTA

5. **Early Bird Discount Callout**
   - Large banner: "Don't miss out on our early bird discounts!"
   - CTA: "Register interest to be notified"

6. **Registration Form Section**
   - HaileyKollinForm component (multi-step)
   - Terms checkbox with link to `/terms/international-summit`

7. **FAQ Section (Optional)**
   - Common questions about summit
   - Accommodation, travel, what to bring, etc.

---

### Daniel Bailey Special Guest Page
**Route:** `/summit/daniel-bailey`
**Component:** `app/summit/[slug]/page.tsx` (with slug="daniel-bailey")

**Page Sections (Top to Bottom):**

1. **Hero Section**
   - Title: "Special Guest Summit"
   - Subtitle: "International Elite Coaching • Sept/Oct 2026"
   - Background: Dark, mysterious gradient

2. **Confirmed Guest Section**
   - Large card with:
     - Name: "Daniel Bailey"
     - Country: "Australia 🇦🇺"
     - Team: "ex Weber State University" (with note about team prestige)
     - Bio paragraph
     - Photo placeholder (empty until provided)

3. **Mystery Guests Section**
   - Headline: "More Elite Talent Coming to Malaysia..."
   - 2 silhouette cards:
     - Card 1: Silhouette image, "Elite International Coach"
     - Card 2: Silhouette image, "World Champion Athlete"
   - Suspense message: "Stay tuned for reveals..."

4. **Registration Form Section**
   - GenericSummitForm component
   - Simple interest registration (Name, Email, Phone, Instagram)
   - Terms checkbox

---

## Form Systems

### Multi-Step Form Architecture

All forms use a shared state management pattern:
```typescript
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({...});
const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
```

Visual progress indicator shows current step (FormStepIndicator component).

---

### HaileyKollinForm.tsx

**Multi-Step Flow:**

#### **Step 1: Tier Selection**

**Heading:** "Select Your Tier(s)"

**Subheading:** "Choose the tier that matches your skill level and goals. Both tiers offer world-class training."

**UI:**
- Two large interactive cards: Foundation Tier and Elite Tier
- Each card shows:
  - Tier name and tagline
  - Description paragraph
  - Expandable skills list (click to expand/collapse)
  - Prerequisites badge
  - Checkbox (can select both)

**Conditional Message:**
When both tiers are selected, show:
```
✓ Both tiers selected

This means you're committing to attend BOTH workshops, not choosing between them.
You'll receive details for both Foundation and Elite sessions.
```

**Validation:**
- At least one tier must be selected to proceed

**CTA Button:** "Continue to Private Classes →"

---

#### **Step 2: Private Class Interest**

**Heading:** "Private Coaching with Hailey & Kollin"

**Subheading:** "Limited availability for personalized 1-on-1 or partner coaching sessions."

**UI:**
- Question: "Are you interested in private coaching?"
- Toggle or radio buttons: Yes / No

**If Yes, show:**
- "Select your preferred coaching format:"
- Radio buttons:
  - ○ 1-on-1 Coaching (Individual attention)
  - ○ 2-on-1 (Flyer & Base Pair coaching)

**Info Box (if Yes selected):**
```
ℹ️ Private Coaching Details
• Weekdays only
• First-come, first-serve time slots
• Premium pricing (details provided upon inquiry)
• Extremely limited availability
```

**CTA Button:** "Continue to Contact Info →"

---

#### **Step 3: Contact Information & Submit**

**Heading:** "Your Information"

**Subheading:** "We'll use this to contact you with workshop details and early bird pricing."

**Form Fields:**
- Full Name (required)
- Email Address (required)
- Phone / WhatsApp (required, placeholder: "+60 12-345 6789")
- Instagram Handle (optional, placeholder: "@username")

**Large Callout Banner:**
```
🎉 Don't miss out on our early bird discounts!

Register your interest now to be notified when pricing drops and
early bird slots open up. Limited spots available.
```

**Terms Checkbox:**
```
□ I agree to the terms and conditions
```
Link "terms and conditions" to `/terms/international-summit`

**Submit Button:** "Submit Registration"

**Loading State:** Spinner with text "Submitting..."

**Success State:**
- Checkmark icon
- Heading: "You're on the list!"
- Message: "We'll contact you soon with workshop details, pricing, and early bird discount information. Keep an eye on your email and WhatsApp!"
- Button: "Close"

---

### LocalWorkshopForm.tsx

**Single-Page Form**

**Heading:** "Register Your Interest in Local Workshops"

**Subheading:** "Join our progressive skill development sessions. We'll notify you when spots open for upcoming workshops."

**Form Fields:**
- Full Name (required)
- Email Address (required)
- Phone / WhatsApp (required)
- Instagram Handle (optional)

**Textarea Field:**
- Label: "What do you wish to learn from these workshops?"
- Placeholder: "Share your goals, current skill level, or specific skills you want to improve. This helps us plan future workshop topics."
- Rows: 4
- Character limit: 500 (optional)

**Terms Checkbox:**
```
□ I agree to the terms and conditions
```
Link to `/terms/local-workshops`

**Submit Button:** "Submit Interest"

**Success State:**
- Checkmark icon
- Heading: "Interest Registered!"
- Message: "We'll notify you when the next workshop session opens for registration. Based on community feedback, we're planning workshops around the skills you want to learn most."
- Button: "Close"

---

### GenericSummitForm.tsx

**Single-Page Form** (for Daniel Bailey and future guests)

**Heading:** "Register Your Interest"

**Subheading:** "Be the first to know when registration opens and early bird pricing is available."

**Form Fields:**
- Full Name (required)
- Email Address (required)
- Phone / WhatsApp (required)
- Instagram Handle (optional)

**Optional Textarea:**
- Label: "Anything you'd like us to know?" (optional)
- Placeholder: "Skill level, specific interests, questions..."

**Terms Checkbox:**
```
□ I agree to the terms and conditions
```
Link to `/terms/international-summit`

**Submit Button:** "Submit Interest"

**Success State:**
- Checkmark icon
- Heading: "You're on the list!"
- Message: "We'll reach out with workshop details, pricing, and registration information soon."
- Button: "Close"

---

## Terms & Conditions

### International Summit T&Cs
**Route:** `/terms/international-summit`

**Page Title:** "International Summit Terms & Conditions"

**Sections:**

#### 1. Agreement to Terms
By registering for any YonkoX International Summit, you agree to the following terms and conditions.

#### 2. Workshop Prerequisites
Elite tier participants are expected to have the stated prerequisite skills before attending. If you do not meet these prerequisites, you understand the risks of attending and acknowledge that instruction will proceed at the level advertised.

#### 3. Payment & Refunds
- All payments are final once workshop dates are confirmed.
- No refunds will be issued for cancellations made by participants.
- If YonkoX cancels the event due to unforeseen circumstances, full refunds will be issued.

#### 4. Language of Instruction
- All instruction is conducted in English.
- Participants acknowledge this language requirement and agree that no complaints regarding language barriers will be accepted.

#### 5. Liability Waiver
- Participants attend at their own risk.
- YonkoX, its instructors, and affiliated organizations hold no responsibility for injuries sustained during workshops.
- Cheerleading and stunting involve inherent physical risks. Participants acknowledge and assume all risks.

#### 6. Medical Clearance
Participants are expected to be in good physical health and free from medical conditions that could be aggravated by physical activity. YonkoX is not responsible for pre-existing conditions.

#### 7. Photography & Video Consent
- By attending, participants consent to being photographed and recorded for promotional purposes.
- Media may be used on YonkoX social media, website, and marketing materials.
- If you do not wish to be photographed, inform staff on arrival.

#### 8. Code of Conduct
- Respect instructors, staff, and fellow participants.
- Follow all safety guidelines and instructions.
- YonkoX reserves the right to remove disruptive participants without refund.

#### 9. Event Modifications
YonkoX reserves the right to modify workshop schedules, content, or instructors due to unforeseen circumstances. Reasonable effort will be made to notify participants of changes.

#### 10. Contact
Questions about these terms? Contact us at [contact email].

---

### Local Workshops T&Cs
**Route:** `/terms/local-workshops`

**Page Title:** "Local Workshops Terms & Conditions"

**Sections:**

#### 1. Agreement to Terms
By registering for YonkoX Local Circuit Workshops, you agree to the following terms.

#### 2. Workshop Prerequisites
Each workshop session has stated prerequisites. Participants are expected to meet these prerequisites before attending. If you do not meet the prerequisites, you understand the risks of attending and acknowledge that instruction will proceed at the advertised level.

#### 3. Assumption of Risk
- Cheerleading and stunting involve inherent physical risks, including but not limited to falls, collisions, and injuries.
- Participants acknowledge these risks and voluntarily assume them by attending.

#### 4. Liability Waiver
- YonkoX, its instructors, staff, and affiliated organizations hold no liability for injuries sustained during workshops.
- Participants attend entirely at their own risk.
- By registering, participants waive all claims against YonkoX for injuries or damages.

#### 5. Medical Clearance
Participants are expected to be in good physical health. YonkoX is not responsible for aggravation of pre-existing medical conditions.

#### 6. Session Cancellations
- YonkoX reserves the right to cancel sessions due to unforeseen circumstances.
- Participants will be notified at least 24 hours in advance when possible.
- Cancelled sessions may be rescheduled or refunded at YonkoX's discretion.

#### 7. Payment & Refunds
- Payment terms will be communicated when registration opens.
- Refund policy will be stated at time of payment.

#### 8. Photography & Video Consent
- By attending, participants consent to being photographed and recorded.
- Media may be used for promotional purposes on YonkoX platforms.
- Inform staff on arrival if you do not wish to be photographed.

#### 9. Code of Conduct
- Treat all participants, instructors, and staff with respect.
- Follow safety instructions at all times.
- Disruptive behavior may result in removal without refund.

#### 10. Contact
Questions? Reach us at [contact email].

---

## Backend Integration

### Google Apps Script Setup

#### Architecture: Option A (Recommended)
**Single Google Spreadsheet with Multiple Sheets**

**Spreadsheet Name:** `YonkoX_Workshop_Registrations`

**Sheets:**
1. `Hailey_Kollin_Summit`
2. `Local_Workshops`
3. `Daniel_Bailey_Summit`
4. `[Future_Workshop_Name]` (add as needed)

#### Sheet Column Structures

**Hailey_Kollin_Summit Columns:**
```
A: Timestamp
B: Name
C: Email
D: Phone
E: Instagram
F: Tier(s) Selected (e.g., "Foundation", "Elite", "Both")
G: Private Class Interest (Yes/No)
H: Private Class Type (1-on-1, 2-on-1, or N/A)
```

**Local_Workshops Columns:**
```
A: Timestamp
B: Name
C: Email
D: Phone
E: Instagram
F: Learning Goals (textarea content)
```

**Daniel_Bailey_Summit Columns:**
```
A: Timestamp
B: Name
C: Email
D: Phone
E: Instagram
F: Additional Notes (optional textarea)
```

---

### Google Apps Script Code

**File:** `Code.gs` (in Google Apps Script project)

```javascript
/**
 * YonkoX Workshop Registration Handler
 * Receives POST requests from website forms and writes to appropriate sheet
 */

function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Get the target sheet name from the request
    const sheetName = data.sheetName;

    // Open the spreadsheet and get the correct sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Sheet not found: ' + sheetName
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get current timestamp
    const timestamp = new Date();

    // Build row data based on sheet type
    let rowData = [];

    if (sheetName === 'Hailey_Kollin_Summit') {
      rowData = [
        timestamp,
        data.name || '',
        data.email || '',
        data.phone || '',
        data.instagram || '',
        data.tiersSelected || '',  // e.g., "Foundation, Elite"
        data.privateClassInterest || 'No',
        data.privateClassType || 'N/A'
      ];
    }
    else if (sheetName === 'Local_Workshops') {
      rowData = [
        timestamp,
        data.name || '',
        data.email || '',
        data.phone || '',
        data.instagram || '',
        data.learningGoals || ''
      ];
    }
    else if (sheetName === 'Daniel_Bailey_Summit') {
      rowData = [
        timestamp,
        data.name || '',
        data.email || '',
        data.phone || '',
        data.instagram || '',
        data.notes || ''
      ];
    }
    else {
      // Generic fallback for future workshops
      rowData = [
        timestamp,
        data.name || '',
        data.email || '',
        data.phone || '',
        data.instagram || '',
        JSON.stringify(data)  // Dump all data as JSON for manual review
      ];
    }

    // Append row to sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Registration received'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function (run manually to verify setup)
 */
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Spreadsheet name: ' + ss.getName());
  Logger.log('Sheets: ' + ss.getSheets().map(s => s.getName()).join(', '));
}
```

---

### Deployment Instructions

1. **Create Google Spreadsheet**
   - Go to Google Sheets: sheets.google.com
   - Create new spreadsheet named `YonkoX_Workshop_Registrations`
   - Create sheets: `Hailey_Kollin_Summit`, `Local_Workshops`, `Daniel_Bailey_Summit`
   - Add column headers to each sheet (see "Sheet Column Structures" above)

2. **Create Apps Script Project**
   - In your spreadsheet, go to Extensions > Apps Script
   - Delete any default code
   - Paste the Google Apps Script code above
   - Save project (name it "YonkoX Registration Handler")

3. **Deploy as Web App**
   - Click "Deploy" button (top right)
   - Select "New deployment"
   - Click gear icon, select "Web app"
   - Configuration:
     - Description: "YonkoX Workshop Registration v1"
     - Execute as: "Me"
     - Who has access: "Anyone" (important for public forms)
   - Click "Deploy"
   - Copy the Web App URL (looks like: `https://script.google.com/macros/s/XXXXX/exec`)

4. **Authorize Script**
   - First time deploying, you'll need to authorize
   - Click "Authorize access"
   - Select your Google account
   - Click "Advanced" > "Go to [Project Name] (unsafe)" (this is normal)
   - Click "Allow"

5. **Update Form Components**
   - In each form component (`HaileyKollinForm.tsx`, `LocalWorkshopForm.tsx`, etc.)
   - Replace `const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";` with your actual Web App URL
   - Example: `const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz.../exec";`

6. **Test Submission**
   - Submit a test form from your website
   - Check the appropriate sheet in Google Sheets
   - Verify data appears correctly

---

### Form Submission Logic

Each form component sends POST request:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("submitting");

  const SCRIPT_URL = "YOUR_DEPLOYED_WEB_APP_URL";

  const payload = {
    sheetName: "Hailey_Kollin_Summit",  // Or "Local_Workshops", etc.
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    instagram: formData.instagram,
    // Additional fields based on form type
    tiersSelected: formData.tiers.join(", "),
    privateClassInterest: formData.privateClass ? "Yes" : "No",
    privateClassType: formData.privateClassType || "N/A"
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",  // Required for Google Apps Script
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });

    setStatus("success");
  } catch (error) {
    console.error("Submission error:", error);
    setStatus("error");
  }
};
```

**Note:** `mode: "no-cors"` is required for Google Apps Script. This means you won't receive response data (success/error), so we optimistically assume success. For production, consider using a Next.js API route as a proxy to get proper error handling.

---

## UI/UX Specifications

### Design System Adherence

All new components follow the existing YonkoX Premium Cinematic Design System:

**Fonts:**
- Display: Space Grotesk (headings, titles)
- Body: Manrope (paragraphs, descriptions)

**Colors:**
- Primary: `var(--color-primary)` (#80011E - YonkoX Red)
- Background: `var(--background)`
- Foreground: `var(--foreground)`
- Surface: `var(--surface)`

**Animation:**
- Import from `@/lib/animation-config`
- Use `EASING.smooth`, `DURATION.sectionReveal`, `STAGGER.normal`
- GPU-accelerated properties only (transform, opacity)
- Scroll-triggered reveals with `whileInView`

**Spacing:**
- Sections: `py-24 md:py-32`
- Container: `container mx-auto px-6`
- Max width: `max-w-[1440px]`

**Cards:**
- Border: `border border-[var(--neutral-900)]/10`
- Shadow: `shadow-card` or `shadow-elegant`
- Hover: `hover:-translate-y-2 hover:shadow-xl transition-all duration-500`

---

### Expandable Video Cards UI

**Default State:**
```
┌──────────┐  ┌────────────────────────┐  ┌──────────┐
│  Hailey  │  │    COMPILATION        │  │  Kollin  │
│ (Click)  │  │   [Playing Video]      │  │ (Click)  │
│          │  │                        │  │          │
└──────────┘  └────────────────────────┘  └──────────┘
   Collapsed         Expanded (50vw)         Collapsed
```

**After Clicking Hailey:**
```
┌────────────────────────┐  ┌──────────┐  ┌──────────┐
│       HAILEY          │  │   Comp   │  │  Kollin  │
│   [Playing Video]      │  │(Paused)  │  │ (Click)  │
│                        │  │          │  │          │
└────────────────────────┘  └──────────┘  └──────────┘
     Expanded (50vw)          Collapsed      Collapsed
```

**Behavior:**
- Only one card expanded at a time
- Expanded card width: 50vw (or responsive)
- Collapsed card width: 25vw (or responsive)
- Smooth transition: `transition-all duration-700 ease-in-out`
- Video autoplay when expanded
- Video pause when collapsed
- Card titles visible even when collapsed (overlay or below)

**Mobile (Future):**
- Stack vertically
- Each card full width when collapsed
- Tap to expand (push others down)

---

### Tier Selection Cards

**Visual Design:**
- Two large cards side by side (Foundation | Elite)
- Each card:
  - Border: 2px, changes color when selected
  - Checkbox indicator (top-right corner)
  - Tier name (large, bold, uppercase)
  - Tagline (small, uppercase, primary color)
  - Description paragraph
  - "View Skills ▼" expandable section
  - Prerequisites badge (Elite only)

**Selected State:**
- Border color: `var(--color-primary)`
- Background: `var(--color-primary)/5`
- Checkmark visible

**Hover State:**
- Slight scale: `hover:scale-105`
- Shadow increase

**Skills Expandable:**
- Default: Collapsed, shows "View Skills ▼"
- Click: Expands to show bullet list of skills
- Arrow icon rotates: ▼ → ▲
- Animation: smooth height transition

---

## Copy & Messaging

### Tone & Voice
- **Encouraging, not demanding:** Use "expected" instead of "must"
- **Inclusive, not gatekeeping:** Acknowledge risks, but welcome all levels
- **Professional, not confrontational:** Avoid "The Problem" framing when discussing other workshops
- **Aspirational:** Focus on growth, skill development, elite training
- **Clear & Direct:** No fluff, actionable information

---

### Key Messaging Examples

#### **Prerequisites (Elite Tier):**
❌ "Participants MUST have Hand Hand Extension and Fronthand Up."
✅ "Participants are expected to have Hand Hand Extension and Fronthand Up before attending."

**Follow-up:**
"If you're not quite there yet, we encourage you to join Foundation Tier or work on these skills and attend future summits. Understanding the risks of attending without meeting prerequisites is your responsibility."

---

#### **Entry Points (Local Workshops):**
❌ "Clear entry points so you don't feel like you're going in naked."
✅ "Clear entry points so you know exactly where you stand before you walk in."

**Alternative:**
"Clear entry points – no ambiguity, no intimidation. You'll know exactly what to expect before you attend."

---

#### **Workshop Philosophy (Local):**
❌ "The Problem: Random workshops with unrealistic expectations..."
✅ "Our Approach to Skill Development"

**Body Copy:**
"We believe in structured, progressive learning with clear entry points. Rather than one-off workshops, we offer multi-session learning paths where each session builds on the last. This creates a realistic roadmap from beginner to advanced, with skills you can actually achieve and practice independently."

---

#### **Multi-Session Progression Example:**
❌ "Example: Hand Hand Progression"
✅ "Example: Toss Progression Path"

**Sessions:**
1. Foundations of a Toss
2. How to Catch a Toss
3. How to Toss Higher
4. Advanced Toss Variations

---

#### **Early Bird Messaging:**
❌ "Register now to be notified of early bird discounts."
✅ "Don't miss out on our early bird discounts! Register your interest now to be notified when pricing drops and early bird slots open up."

---

#### **Private Classes:**
❌ "Premium pricing (we'll tell you later)."
✅ "Premium pricing applies. Details provided upon inquiry."

**Context:**
"Extremely limited availability – register interest early to secure your spot."

---

#### **Tier Selection Both Message:**
❌ "Selecting both means you want both, not either."
✅ "Selecting both tiers means you're committing to attend BOTH workshops, not choosing between them. You'll receive details for both Foundation and Elite sessions."

---

#### **Success Message (After Form Submission):**
❌ "Form submitted successfully."
✅ "You're on the list! We'll contact you soon with workshop details, pricing, and early bird discount information. Keep an eye on your email and WhatsApp!"

---

## Implementation Phases

### Phase 1: Foundation & Configuration
**Goal:** Set up architecture, routing, and config system

**Tasks:**
1. Create `lib/workshops-config.ts` with all workshop data
2. Set up route structure:
   - `app/workshops/page.tsx`
   - `app/summit/[slug]/page.tsx`
   - `app/terms/international-summit/page.tsx`
   - `app/terms/local-workshops/page.tsx`
3. Create base component structure in `components/workshops/`
4. Test dynamic routing with slug-based content loading

**Deliverables:**
- Workshop config system
- Page templates (empty for now)
- Routing functional

---

### Phase 2: Local Workshops Page
**Goal:** Complete `/workshops` page with form

**Tasks:**
1. Build `WorkshopVisionMission.tsx` component
2. Build `WorkshopInstructors.tsx` with placeholder profiles
3. Build `WorkshopSchedule.tsx` component
4. Build `LocalWorkshopForm.tsx` component
5. Create `/terms/local-workshops` page
6. Integrate all components into `app/workshops/page.tsx`
7. Add animations and scroll-triggered reveals

**Deliverables:**
- Fully functional local workshops page
- Working form (backend connection pending)

---

### Phase 3: Hailey & Kollin Summit Page
**Goal:** Complete `/summit/hailey-kollin` page with multi-step form

**Tasks:**
1. Build `WorkshopHero.tsx` with expandable video cards
2. Build `TierSelectionCards.tsx` component
3. Build `HaileyKollinForm.tsx` multi-step form
4. Build `FormStepIndicator.tsx` progress indicator
5. Create `/terms/international-summit` page
6. Integrate all components into `app/summit/[slug]/page.tsx` (for slug="hailey-kollin")
7. Add workshop overview, schedule, and private class sections

**Deliverables:**
- Fully functional Hailey & Kollin summit page
- Multi-step form with tier selection and private class interest
- Video hero working (with placeholder URLs for now)

---

### Phase 4: Daniel Bailey Special Guest Page
**Goal:** Complete `/summit/daniel-bailey` page with silhouettes

**Tasks:**
1. Build `SilhouetteGuestCard.tsx` component
2. Build confirmed guest section (Daniel Bailey card)
3. Build mystery guests section (2 silhouette cards)
4. Build `GenericSummitForm.tsx` component
5. Integrate into `app/summit/[slug]/page.tsx` (for slug="daniel-bailey")

**Deliverables:**
- Fully functional Daniel Bailey page
- Silhouette mystery guest cards
- Simple interest form

---

### Phase 5: Update Existing Sections
**Goal:** Update EventsSection and TheLabSection to link to new pages

**Tasks:**
1. Update `EventsSection.tsx`:
   - Change Hailey & Kollin card click to link: `/summit/hailey-kollin`
   - Change Local Circuit card click to link: `/workshops`
   - Change Special Guest card click to link: `/summit/daniel-bailey`
   - Change "Reserve Spot" button to "View Details"
   - Remove `ReservationModal` integration from these cards
2. Update `TheLabSection.tsx`:
   - Change CTA button to link to `/workshops`
   - Update button text to "Explore Workshops" or "View Schedule"
3. Decision: Keep or remove `ReservationModal.tsx` entirely

**Deliverables:**
- Updated EventsSection with navigation links
- Updated TheLabSection with navigation link
- Clean navigation flow throughout site

---

### Phase 6: Google Apps Script Backend
**Goal:** Set up Google Sheets and Apps Script for form submissions

**Tasks:**
1. Create Google Spreadsheet: `YonkoX_Workshop_Registrations`
2. Create sheets: `Hailey_Kollin_Summit`, `Local_Workshops`, `Daniel_Bailey_Summit`
3. Add column headers to each sheet
4. Create Apps Script project with provided code
5. Deploy as Web App
6. Test with sample POST requests
7. Update all form components with deployed Web App URL
8. Test end-to-end form submissions

**Deliverables:**
- Google Sheets set up with proper structure
- Apps Script deployed and accessible
- All forms connected to backend
- Documentation for future sheet additions

---

### Phase 7: Testing & Polish
**Goal:** Test all flows, fix bugs, add polish

**Tasks:**
1. Test all navigation links
2. Test all forms (validation, submission, success/error states)
3. Test animations and scroll-triggered reveals
4. Test dark mode compatibility
5. Verify responsive design (desktop primarily, note mobile for future)
6. Check accessibility (focus states, ARIA labels)
7. Performance check (Lighthouse, Core Web Vitals)
8. Copy review (spelling, grammar, tone)

**Deliverables:**
- Bug-free system
- Smooth animations
- Accessible and performant
- Copy finalized

---

### Phase 8: Content Population (Future)
**Goal:** Replace placeholders with real content

**Tasks (when ready):**
1. Upload instructor photos for local workshops
2. Upload videos (Hailey intro, Kollin intro, compilation)
3. Upload Daniel Bailey photo
4. Update video URLs in workshop config
5. Add FAQ sections if needed
6. Add accommodation/travel info for summits

**Deliverables:**
- Fully populated content
- No more placeholders

---

## Technical Requirements

### Dependencies
All required dependencies already exist in the project:
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Framer Motion (animations)
- Tailwind CSS v4

**No new dependencies needed.**

---

### Environment Variables
None required for frontend. Google Apps Script Web App URL will be hardcoded in form components (can be moved to env vars later if desired).

---

### File Creation Checklist

**New Files to Create:**
```
lib/
└── workshops-config.ts

app/
├── workshops/
│   └── page.tsx
├── summit/
│   └── [slug]/
│       └── page.tsx
└── terms/
    ├── international-summit/
    │   └── page.tsx
    └── local-workshops/
        └── page.tsx

components/
└── workshops/
    ├── WorkshopHero.tsx
    ├── WorkshopOverview.tsx
    ├── WorkshopSchedule.tsx
    ├── WorkshopInstructors.tsx
    ├── WorkshopVisionMission.tsx
    ├── TierSelectionCards.tsx
    ├── SilhouetteGuestCard.tsx
    └── forms/
        ├── HaileyKollinForm.tsx
        ├── LocalWorkshopForm.tsx
        ├── GenericSummitForm.tsx
        └── FormStepIndicator.tsx
```

**Files to Update:**
```
components/
├── EventsSection.tsx       # Update to link to pages instead of modal
└── TheLabSection.tsx       # Update to link to /workshops
```

**Files to Keep (No Changes):**
```
components/
└── ReservationModal.tsx    # Keep for legacy support or remove entirely
```

---

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- No IE11 support needed

---

### Performance Targets
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms

**Optimization Strategies:**
- Use `next/image` for all images
- Lazy load videos (only load when expanded)
- Code split workshop forms (dynamic imports)
- Optimize animations (GPU-accelerated only)

---

## Future Enhancements (Out of Scope for Initial Build)

### Mobile Optimization
- Responsive video cards (stack vertically)
- Touch-friendly tier selection
- Mobile-optimized forms

### Advanced Features
- Email confirmation system (send auto-reply after registration)
- Calendar integration (.ics file download for workshop dates)
- Payment integration (Stripe, PayPal)
- Waitlist management
- Admin dashboard for viewing registrations
- Automated reminder emails

### Content Enhancements
- Workshop photo galleries
- Testimonials from past participants
- Skill progression videos
- FAQ accordion sections

---

## Appendix: Quick Reference

### Workshop Config IDs
- `local` → `/workshops`
- `hailey-kollin` → `/summit/hailey-kollin`
- `daniel-bailey` → `/summit/daniel-bailey`

### Form Types
- `local` → `LocalWorkshopForm.tsx`
- `hailey-kollin` → `HaileyKollinForm.tsx`
- `generic-summit` → `GenericSummitForm.tsx`

### Sheet Names
- Hailey & Kollin: `Hailey_Kollin_Summit`
- Local Workshops: `Local_Workshops`
- Daniel Bailey: `Daniel_Bailey_Summit`

### Terms Pages
- International: `/terms/international-summit`
- Local: `/terms/local-workshops`

---

## Document Version History

**v1.0 - 2026-01-22**
- Initial specification document
- Complete architecture and implementation plan
- All copy and messaging finalized
- Ready for implementation

---

**END OF SPECIFICATION DOCUMENT**

---

## Notes for Implementation

This document serves as the single source of truth for the workshop system redesign. All implementation decisions, copy, UI specifications, and technical requirements are documented here.

When implementing:
1. Follow the phased approach (don't skip phases)
2. Refer to this document for exact copy and messaging
3. Use the workshop config structure as defined
4. Maintain YonkoX design system consistency
5. Test each phase before moving to the next

For questions or clarifications, refer to the relevant section in this document first.

**This specification is comprehensive and complete. Nothing has been omitted for brevity.**
