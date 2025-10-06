// shared/config/5.founder.ts
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const founder = {
  me: {
    role: 'Product Strategist & Builder',
    title: 'Sir/Dr.',
    first: 'Drew',
    surname: ' MacGibbon',
    avatar: {
      src: '/images/team/founder-avatar.png',
      alt: 'avatar image of Drew MacGibbon',
    },
    portrait: {
      src: '/images/team/founder-portrait.png',
      alt: 'portrait image of Drew MacGibbon',
    },
    videos: {
      src: '/videos/founder-message.mp4',
      alt: 'Video message from Drew MacGibbon',
    },
  },

  business: {
    name: 'Incubrain',
    legal_name: 'Incubrain Pvt. Ltd.',
    founding_year: 2023,
    location: 'Pune, India',
  },

  story: {
    greeting:
      "Hi, I'm Drew; I created this template for myself, it's taken me 13 years and an ADHD diagnosis to figure out what was blocking me from 'success'.",
    background: [
      "My obsession with business (and personal development) started when I was 16, I read all the books, and caught the first wave of YouTube 'gurus'",
      "I was in love!",
      "At 19 I started my first business (PT Studio), and if I'm to be honest - it's the closets I've been to a sustainable business out of 10+ attempts; 2 of which consumed 5 years of my life full-time, never earning a cent.",
      "I've worked 15+ jobs from McDonald's Staff to Frontline Police to Crypto Bro before finding my second love; programming (Nuxt ❤️). Now I could do it all myself; nothing was going to stop me!",
      "That was 6 years ago...",
      "The truth is my brain created excuses not to do the things I knew I should: 'You can do better', 'People wont pay for this yet', 'I need to do this first', 'Just one more feature' the list goes on.",
      "It's painful to admit, but I was addicted to building.",
      "Why now, what's changed? Honestly; I'm tired of being broke when I know I have so much value to give; I'm tired of the excuses that stop me from helping others like me; and I'm tired of not allowing myself to be happy.",
      "It's exhausting and I'm done!!",
    ],
    mission:
      'My mission is to help 100 struggling founders acheive financial freedom so they can build the next wave of world changing products from a strong foundation.',
    challenge:
      "Join me and other founders on this journey",
  },

  accessibility: {
    availability:
      'Active on community channels daily. Building this full-time.',
    links: [
      {
        platform: 'youtube',
        label: 'YouTube',
        url: 'https://www.youtube.com/@Incubrain',
      },
      {
        platform: 'github',
        label: 'GitHub',
        url: 'https://github.com/incubrain',
      },
      {
        platform: 'x',
        label: 'X',
        url: 'https://x.com/incubrain',
      },
    ],
  },
} satisfies FounderSection;
