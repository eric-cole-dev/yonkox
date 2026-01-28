/**
 * YonkoX Workshop Configuration System
 * Single source of truth for all workshop data, metadata, and settings
 */

export interface WorkshopTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  skills: Array<{ name: string; level: string }>;
  philosophy: string;
  prerequisites: {
    required: string[];
    recommended: string;
    note: string;
  };
  schedule: {
    day1: string;
    day2: string;
  };
}

export interface WorkshopVideo {
  title: string;
  description: string;
  url: string;
  thumbnail?: string | null;
  autoplay: boolean;
  defaultExpanded: boolean;
}

export interface WorkshopInstructor {
  name: string;
  title: string;
  photo: string | null;
  bio?: string | null;
}

export interface ProgressionSession {
  number: number;
  title: string;
  content: string;
  prerequisite: string;
}

export interface LocalWorkshopConfig {
  id: string;
  type: 'local';
  active: boolean;
  title: string;
  tagline: string;
  currentFocus: string;
  schedule: {
    frequency: string;
    timeSlots: Array<{ time: string; focus: string }>;
    format: string;
    philosophy: string;
  };
  visionMission: {
    headline: string;
    introduction: string;
    methodology: {
      title: string;
      description: string;
      example: {
        title: string;
        sessions: ProgressionSession[];
      };
    };
    entryPoints: {
      title: string;
      description: string;
      exampleExpectation: string;
    };
    sessionFormat: {
      title: string;
      duration: string;
      structure: string;
      takeaway: string;
    };
    currentOfferings: {
      title: string;
      skills: string[];
      note: string;
    };
  };
  instructors: WorkshopInstructor[];
  formType: string;
  sheetName: string;
  termsUrl: string;
}

export interface SummitWorkshopConfig {
  id: string;
  type: 'summit';
  active: boolean;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  duration?: string;
  videos?: {
    left?: WorkshopVideo;
    center: WorkshopVideo;
    right?: WorkshopVideo;
  };
  overview?: {
    headline: string;
    description: string;
    format: string;
    workshopStructure: {
      day1: { title: string; description: string };
      day2: { title: string; description: string };
    };
  };
  tiers?: WorkshopTier[];
  tierSelectionNote?: {
    bothTiers: string;
    encouragement: string;
  };
  privateClasses?: {
    available: boolean;
    headline: string;
    description: string;
    types: Array<{ id: string; name: string; description: string }>;
    schedule: string;
    availability: string;
    pricing: {
      disclosed: boolean;
      note: string;
    };
    limitations: string;
  };
  earlyBirdMessage?: string;
  confirmed?: {
    name: string;
    country: string;
    flag: string;
    team: string;
    teamNote: string;
    bio: string;
    photo: string | null;
    skills: string[];
  };
  mysteryGuests?: Array<{
    silhouette: boolean;
    hint: string;
    photo: string | null;
    revealed: boolean;
  }>;
  suspenseMessage?: string;
  formType: string;
  sheetName: string;
  termsUrl: string;
}

export type WorkshopConfig = LocalWorkshopConfig | SummitWorkshopConfig;

export const WORKSHOPS: Record<string, WorkshopConfig> = {
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
        description: 'We set clear expectations for each workshop so you know exactly where you stand before you walk in. No ambiguity, no intimidation – just honest guidance on what you need to know before attending.',
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
        photo: null,
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
  },

  'hailey-kollin': {
    id: 'hailey-kollin',
    type: 'summit',
    active: true,
    title: 'Hailey & Kollin Summit',
    subtitle: 'Team USA Elite In Malaysia',
    date: 'TBC 2026',
    location: 'Kuala Lumpur',
    duration: 'TBC',

    videos: {
      center: {
        title: 'Stunts Compilation',
        description: 'Watch Hailey & Kollin in action',
        url: 'YOUR_S3_OR_YOUTUBE_URL', // Replace with actual video URL
        thumbnail: null,
        autoplay: true,
        defaultExpanded: true
      },
      left: {
        title: 'Hailey has something to say to u!',
        description: 'Personal message from Hailey to Malaysia',
        url: 'HAILEY_HI_MALAYSIA_VIDEO_URL', // Replace with actual video URL
        thumbnail: null,
        autoplay: false,
        defaultExpanded: false
      },
      right: {
        title: 'Kollin has something to say to u!',
        description: 'Personal message from Kollin to Malaysia',
        url: 'KOLLIN_HI_MALAYSIA_VIDEO_URL', // Replace with actual video URL
        thumbnail: null,
        autoplay: false,
        defaultExpanded: false
      }
    },

    overview: {
      headline: 'Learn from Team USA\'s Elite Athletes',
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
        description: 'This tier focuses on building world-class fundamentals. Learn WHY USA has such incredible basics – it\'s not about hitting skills, it\'s about understanding technique, body awareness, and proper form. Expect to refine your foundation and develop a deeper understanding of skill execution.',
        skills: [
          { name: 'Toss Hands', level: 'Foundational' },
          { name: 'Toss Block', level: 'Foundational' },
          { name: 'Full Up / Any Full Skills', level: 'Foundational' },
          { name: 'Hand Hand', level: 'Foundational' }
        ],
        philosophy: 'Technique over repetition. Form over flash. Understanding over execution.',
        prerequisites: {
          required: [],
          recommended: 'Willingness to learn and refine fundamentals, regardless of current skill level',
          note: 'This tier is open to all levels. Whether you\'re new to these skills or have been doing them for years, you\'ll gain insight into elite-level technique.'
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
          required: ['Hand Hand Extension', 'Fronthand Up'],
          recommended: 'Strong body awareness and comfort with advanced stunting',
          note: 'Participants are expected to have the listed prerequisites before attending. If you\'re not quite there yet, we encourage you to join Foundation Tier or work on these skills and attend future summits. Understanding the risks of attending without meeting prerequisites is your responsibility.'
        },
        schedule: {
          day1: 'Advanced skill introduction & technique breakdown',
          day2: 'Refinement, consistency, and pushing limits'
        }
      }
    ],

    tierSelectionNote: {
      bothTiers: 'Selecting both tiers means you\'re committing to attend BOTH workshops, not choosing between them. You\'ll receive details for both Foundation and Elite sessions.',
      encouragement: 'Choose the tier(s) that align with your current skill level and goals. There\'s no wrong choice – both tiers offer incredible value.'
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
  },

  'coming-soon': {
    id: 'coming-soon',
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
      teamNote: 'Weber State University is recognized as one of the world\'s strongest university cheer teams.',
      bio: 'Elite athlete with world-class experience from the strongest university cheer program globally. Daniel brings high-level technique and training methodology honed at the top tier of competitive cheerleading.',
      photo: null,
      skills: []
    },

    mysteryGuests: [
      {
        silhouette: true,
        hint: 'Elite International Coach',
        photo: null,
        revealed: false
      },
      {
        silhouette: true,
        hint: 'World Champion Athlete',
        photo: null,
        revealed: false
      }
    ],

    suspenseMessage: 'We\'re bringing more elite talent to Malaysia. Stay tuned for reveals...',

    formType: 'generic-summit',
    sheetName: 'Special_Guest_Summit',
    termsUrl: '/terms/international-summit',
  }
};

/**
 * Get workshop config by ID
 */
export function getWorkshopById(id: string): WorkshopConfig | undefined {
  return WORKSHOPS[id];
}

/**
 * Get all active workshops
 */
export function getActiveWorkshops(): WorkshopConfig[] {
  return Object.values(WORKSHOPS).filter(w => w.active);
}

/**
 * Get all summit workshops
 */
export function getSummitWorkshops(): SummitWorkshopConfig[] {
  return Object.values(WORKSHOPS).filter(w => w.type === 'summit') as SummitWorkshopConfig[];
}
