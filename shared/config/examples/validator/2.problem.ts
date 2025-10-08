import type { CustomerProfile, ProblemSolution } from '#types';
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const solution = {
  statement:
    'Technical experts with valuable skills are paralyzed by deep psychological barriers that prevent them from launching, validating, and monetizing their expertise',
  claim: 'Ship signal, not perfection—validate in days, not months',
  pitch:
    'Pre-built template forces immediate public deployment with placeholder content, breaking psychological barriers and replacing private iteration with rapid public feedback loops',
  promise:
    'Deploy your validation page in under 1 hour, gather real feedback within 48 hours',
} satisfies ProblemSolution; // is this used at all?? should it be

export const customerProfile = {
  id: 'technical-experts',
  label: 'Struggling Founders',
  description:
    "You have domain expertise and proven skills but something is holding you back from achieving the level of 'success' you desire. You've tried before but it didn't work out, you tried again - that one hurt a bit more, but what others don't understand is that you cannot simply 'quit', your brain is different - and that's OK!",

  context: [
    '3-10+ years domain experience',
    'People will pay for you services',
    '9-5 for life, are you joking!?',
    'Ideas are not the problem, saying no is',
  ],

  pains: [
    {
      label: 'Chasing unicorns',
      impact:
        'Leads founders down a high-risk, investor-driven path that most don’t actually want',
      cost: 'Startup culture glorifies unicorn status, pushing founders to gamble years of time and little to no income for the tiny chance of a massive payout. With investors, the pressure only doubles.',
      reality:
        'Define your own "enough": the income, freedom, and team size that give you the life you want and build it; chasing the unicorn should never cost you everything.',
    },
    {
      label: 'Imposter syndrome',
      impact: 'Prevents ever feeling "ready" to launch',
      cost: 'Trapped in tutorial hell and credential-seeking. Never feel qualified despite years of experience. The bar for "good enough" keeps rising.',
      reality:
        'No one ever feels fully ready. The only way to build credibility is by shipping and learning in public. Experience compounds faster through doing than through more courses.',
    },
    {
      label: 'Fear of judgment',
      impact: 'Can\'t ship until "everyone will like it"',
      cost: "Self-worth tied to external approval. Iterate endlessly in private because launching means risking criticism. One negative comment feels like proof you're a fraud. Stuck in perfectionist loop.",
      reality:
        'Judgment is inevitable. What matters is the small percentage of people who resonate with your work. Even the most successful products have critics.',
    },
    {
      label: 'Fear of success',
      impact: 'prevents completion when close to finish line',
      cost: 'Terrified of spotlight, expectations, and responsibility that follow success. Subconsciously create blockers when 90% done because "I\'m not ready for what comes next."',
      reality:
        'Success doesn’t arrive all at once. Growth is gradual and manageable. You’ll adapt to new responsibilities the same way you’ve adapted to every past challenge; step by step.',
    },
    {
      label: "Can't articulate value",
      impact: 'Blocks monetization even if you launch',
      cost: "Unclear on your unique positioning or why customers should choose you. Can't explain what problem you solve or who it's for. Resulting in generic messaging, confused offers, and underpricing.",
      reality:
        'Clarity comes from testing in the market, not from perfect planning. Simple offers launched quickly give you real feedback, and you can refine pricing and messaging based on what resonates.',
    },
  ],
} satisfies CustomerProfile;
