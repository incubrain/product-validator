// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const solution = {
  // What this approach delivers
  outcomes: [
    {
      title: 'Ship Now',
      description:
        'Deploy a placeholder site in <1 hour, destroy the "I\'m not ready yet" excuse!',
      icon: 'i-lucide-rocket',
    },
    {
      title: 'Weekly Itterations',
      description:
        'Normalize imperfection, publish weekly updates and share your progress',
      icon: 'i-lucide-eye',
    },
    {
      title: 'Rip Off the Band-Aid',
      description:
        "The most painful and valuable feedback is your first, I'll try not to make you cry",
      icon: 'i-lucide-bandage',
    },
    {
      title: 'You Have Value',
      description:
        'You are the product, lean into your uniqueness + skills to find your USP',
      icon: 'i-lucide-compass',
    },
    {
      title: 'Scaling Guidance',
      description:
        'Scale at your pace with one-on-one or group coaching to support your journey.',
      icon: 'i-lucide-trending-up',
    },
    {
      title: "You're Not Alone",
      description:
        'Join a community of founders sharing their learnings and hold eachother accountable',
      icon: 'i-lucide-users',
    },
  ],

  // Why alternatives fail for validation
  alternatives: [
    {
      id: 'diy',
      title: 'DIY',
      problem:
        "Underestimate time cost thinking 'I can build it' without factoring in technical debt + unknowns",
      cost: '$5k–20k+ lost earning potential',
      why_fails:
        'What appears simple likely took 1000s of focused manhours and many itterations',
    },
    {
      id: 'nocode',
      title: 'No-Code Platforms',
      problem:
        'Generalist approach, vendor lock-in, monthly costs, design > messaging mentality',
      cost: '$600-2400+/year + template',
      why_fails: 'Flashy design focus which doesn\'t matter untill you are scaling an already profitable buisniess',
      examples: ['Carrd', 'Webflow', 'Unicorn Platform'],
    },
    {
      id: 'conversion-platforms',
      title: 'Conversion/Funnel Platforms',
      problem:
        'Vendor lock-in, partner bias, lack of flexability, frustrating devex, fly before you walk',
      cost: '$1080-6000+/year forever',
      why_fails:
        'Paying for 20 products when you just need 3, Skips validation & productisation statges, high risk for founders in validation stage',
      examples: ['ClickFunnels', 'Unbounce', 'Kajabi'],
    },
  ],

  // Why trust this specific approach
  credibility: {
    affiliations: [
      {
        name: 'Nuxt',
        logo: 'i-logos-nuxt-icon',
        note: 'v4',
      },
      {
        name: 'Nuxt UI',
        logo: 'i-logos-nuxt-icon',
        note: 'v4',
      },
      {
        name: 'Tailwind',
        logo: 'i-logos-tailwindcss-icon',
        note: 'v4',
      },
      {
        name: 'Tailwind Variants',
        logo: 'i-lucide-trending-up-down',
        note: 'Latest',
      },
      {
        name: 'TypeScript',
        logo: 'i-logos-typescript-icon',
        note: 'v5.8+',
      },
    ],
  },
} satisfies SolutionSection;
