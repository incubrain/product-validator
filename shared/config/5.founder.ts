// {CONFIG}: Your founder profile and story
import type {
  FounderProfile,
  BusinessInfo,
  FounderStory,
  FounderAccessibility,
} from '#types';

export const profile = {
  role: '⚠️ Your role or title',
  title: 'Sir/Dr.',
  first: '⚠️ Your first name',
  surname: '⚠️ Your last name',
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
} satisfies FounderProfile;

export const business = {
  name: '⚠️ Business name',
  legal_name: '⚠️ Legal entity name',
  founding_year: 2024,
  location: '⚠️ City, Country',
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
