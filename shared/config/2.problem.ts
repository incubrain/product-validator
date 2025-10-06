// {CONFIG}: Define your target customer profile and their core pain points

export const problem = {
  statement: '⚠️ One-sentence problem statement',

  solution: {
    claim: '⚠️ Your bold claim or promise',
    pitch: '⚠️ Explanation of your claim in 1-2 sentences',
    promise: '⚠️ Minimum outcome you guarantee',
  },

  customerProfile: {
    id: 'your-customer-segment',
    label: '⚠️ Customer Segment Name',
    description:
      '⚠️ Detailed persona description including identity traits, background, and current situation',

    context: {
      experience: '⚠️ Years of experience or skill level',
      situation: '⚠️ Current state or position',
      blocker: '⚠️ Primary obstacle preventing progress',
      stage: '⚠️ Where they are in their journey',
    },

    pains: [
      {
        label: '⚠️ First major pain point',
        severity: '⚠️ How critical this issue is and why',
        cost: '⚠️ What this pain costs them in time, money, or opportunity',
      },
    ],
  },
} satisfies ProblemConfig;
