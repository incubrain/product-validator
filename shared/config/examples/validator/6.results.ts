import type { Testimonial, ProofTrack } from '#types';
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const proof: ProofTrack[] = [
  {
    label: 'Proven Method',
    badgeColor: 'secondary',
    items: [
      {
        name: 'Buffer: 60M+ users',
        logo: 'https://cdn.brandfetch.io/buffer.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2010',
      },
      {
        name: 'Dropbox: $2B+ valuation',
        logo: 'https://cdn.brandfetch.io/dropbox.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2007',
      },
      {
        name: 'Pebble: $10M+ from 69k backers',
        logo: 'https://cdn.brandfetch.io/pebble.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2012',
      },
      {
        name: 'Slack: $27B valuation',
        logo: 'https://cdn.brandfetch.io/slack.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2014',
      },
      {
        name: 'Pinterest: 500M+ users',
        logo: 'https://cdn.brandfetch.io/pinterest.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2012',
      },
      {
        name: 'Spotify: $70B valuation',
        logo: 'https://cdn.brandfetch.io/spotify.com/w/100/h/100?c=1idC13RnP4eaEvuuG55',
        note: '2015',
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    type: 'testimonial',
    name: 'Your Name',
    role: 'Example Testimonial*',
    quote:
      "This template includes a testimonials section. Share your results on X and they'll be featured here.",
    link: 'https://x.com/incubrain',
    highlight: true,
  },
  {
    type: 'testimonial',
    quote:
      'Finally shipped after 6 months of "perfecting" my side project. The template forced me to focus on what actually matters.',
    name: 'Alex Chen',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    type: 'testimonial',
    quote:
      'Deployed on Tuesday, had 200 email signups by Friday. Sometimes you just need to hit publish and see what happens.',
    name: 'Taylor Kim',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
  },
  {
    type: 'testimonial',
    quote:
      'My perfectionist brain hated this template at first. Then I realized that was exactly the point.',
    name: 'Jordan Rivera',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
  },
  {
    type: 'testimonial',
    quote:
      'Stopped overthinking and started shipping. Three validation pages later, I found my winning idea.',
    name: 'Sarah Chen',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=44',
  },
  {
    type: 'testimonial',
    quote:
      'The template forced me out of perfectionist mode. Best $50 I spent on my startup journey.',
    name: 'Marcus Rodriguez',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
  },
] satisfies Testimonial[];

