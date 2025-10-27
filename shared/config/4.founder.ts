import type {
  FounderProfile,
  BusinessInfo,
  FounderStory,
  FounderAccessibility,
} from '#types';

/**
 * {CONFIG}: FOUNDER PROFILE & STORY
 *
 * Share WHO you are and WHY you're qualified to help.
 *
 * SOURCES:
 * - Step 2: Your background, expertise, breakthrough story, authority
 *
 * Key sections:
 * - profile: Basic info and images
 * - business: Company details
 * - story: Your origin story and mission
 * - accessibility: How people can reach you
 */

export const profile = {
  role: '⚠️ Your role or title',
  title: 'Sir/Dr.',
  given_name: '⚠️ Your given name',
  surname: '⚠️ Your surname',
  avatar: {
    src: '/images/team/founder-avatar.jpeg',
    alt: '⚠️ Replace image of my dog with your own',
  },
  portrait: {
    src: '/images/team/founder-portrait.jpeg',
    alt: '⚠️ Same as above',
  },
  // {OPTIMIZE}: If metrics indicate strong messaging, invest in founder story video
  // videos: {
  //   src: '/videos/founder-message.mp4',
  //   alt: '⚠️ Video description',
  // },
} satisfies FounderProfile;

export const business = {
  name: '⚠️ Product name',
  legal_name: '⚠️ Legal entity name',
  founding_year: 2025,
  location: '⚠️ City, Country',
  logo: 'favicon-96x96.png',
} satisfies BusinessInfo;

export const story = {
  greeting: "⚠️ Hi, I'm [Name]; brief intro and hook",
  background: [
    '⚠️ First paragraph of your story',
    '⚠️ Second paragraph detailing your journey',
    '⚠️ Third paragraph explaining what changed',
  ],
  mission: '⚠️ Your mission in one sentence',
  challenge: '⚠️ Your challenge or call-to-action for the reader',
} satisfies FounderStory;

export const accessibility = {
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
} satisfies FounderAccessibility;
