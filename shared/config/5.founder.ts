// {CONFIG}: Your founder profile and story

export const founder = {
  me: {
    role: '⚠️ Your role or title',
    title: 'Sir/Dr.',
    first: '⚠️ Your first name',
    surname: '⚠️ Your last name',
    hook_intro: "⚠️ Hi, I'm [Name]; brief intro",
    avatar: {
      src: '/images/avatar.png',
      alt: '⚠️ Your name',
    },
    portrait: {
      src: '/images/portrait.png',
      alt: '⚠️ Your name',
    },
    videos: {
      src: '/videos/founder-message.mp4',
      alt: '⚠️ Video description',
    },
  },

  business: {
    name: '⚠️ Business name',
    legal_name: '⚠️ Legal entity name',
    founding_year: 2024,
    location: '⚠️ City, Country',
  },

  story: {
    timeline: [
      {
        date: '2024',
        title: '⚠️ Key milestone',
        description: '⚠️ What happened and its significance',
        icon: 'i-lucide-lightbulb',
        value: 'milestone-id',
      },
    ],

    learnings: [
      '⚠️ Key lesson or insight from your journey',
    ],

    mission: {
      hook: "⚠️ Compelling statement about your journey or transformation",
      elevator: '⚠️ Your mission in one sentence',
      challenge: "⚠️ Your challenge or call-to-action for the reader",
    },
  },

  accessibility: {
    availability: '⚠️ How available you are and where',
    links: [
      {
        platform: 'youtube',
        label: 'YouTube',
        url: 'https://youtube.com/@yourchannel',
      },
      {
        platform: 'github',
        label: 'GitHub',
        url: 'https://github.com/yourusername',
      },
      {
        platform: 'x',
        label: 'X',
        url: 'https://x.com/yourusername',
      },
    ],
  },
} satisfies FounderConfig;