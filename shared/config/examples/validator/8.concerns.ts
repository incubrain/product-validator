// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const concerns = [
  // WARNINGS (4)
  {
    q: 'How much time does this really take?',
    a: 'Minimal deploy: <1 hour. Magnet completion: 15-30 hours over 1-4 weeks (introspection, offer creation, configuration). Validation phase: 1-4 weeks of daily marketing (4-6 hours/day). Most underestimate marketing effort.',
    type: 'warning',
  },
  {
    q: 'Who should NOT use this?',
    a: 'Non-technical founders without dev support, post-PMF companies scaling products, B2B enterprise with long sales cycles, or anyone expecting passive validation without marketing effort.',
    type: 'warning',
  },
  {
    q: 'What are the technical requirements?',
    a: "Basic dev setup: Node.js, Git, text editor. Entry-level technical skills needed—if you can follow documentation and edit config files, you're good. Deploy to Vercel/Netlify/Railway. No advanced coding required.",
    type: 'warning',
  },
  {
    q: "This won't fix my procrastination, right?",
    a: "Correct. This removes friction and forces structure, but you still need to execute. If focus or follow-through is your blocker, address that separately—template can't solve execution issues.",
    type: 'warning',
  },

  // OBJECTIONS (13)
  {
    q: 'Why not use ClickFunnels/Kajabi? They have proven templates',
    a: 'They cost $147-399/month forever, assume you have a validated offer, provide no service-to-product guidance, and lock you into their platform. When you need custom features or want to migrate, you rebuild from scratch. This costs $0-50 one-time and you own the code.',
    type: 'objection',
  },
  {
    q: 'I need a full product, not just a landing page',
    a: 'This tests demand BEFORE building the product. If validation fails, you saved months. If validation succeeds, you build what people actually want—not assumptions. Landing page first, product second. Reverse this and you waste time on features nobody needs.',
    type: 'objection',
  },
  {
    q: 'What if I validate and it fails? Wasted time?',
    a: 'That\'s the point—fail fast in days, not months. Validation prevents building products nobody wants (42% of startup failures per CB Insights). "Failed" validation saves you from wasting months on wrong direction. Evidence-based pivot is success.',
    type: 'objection',
  },
  {
    q: "Webflow/Carrd is easier and I don't need to code",
    a: 'True for simple pages. But no-code platforms have monthly costs, vendor lock-in, no validation methodology, and limited customization. When you validate and need to scale/pivot, platform limitations hurt. This gives you technical ownership from day one.',
    type: 'objection',
  },
  {
    q: 'I can just build a landing page myself in a weekend',
    a: 'True, but you\'ll spend weeks on analytics setup, conversion optimization, copywriting strategy, distribution planning, and feedback systems. This gives you the complete validation framework immediately—plus forces you to ship "good enough" instead of perfecting.',
    type: 'objection',
  },
  {
    q: 'The founder just cracked this 3 weeks ago—too fresh?',
    a: "Transparent: I'm 3 weeks into weekly shipping after 13 years of failure. This isn't a proven 5-year method—it's me building in public, applying what I learned from $350k of mistakes. You're getting early-adopter access, not a finished product. If you want established systems, look elsewhere.",
    type: 'objection',
  },
  {
    q: 'Why would I pay $50 when the template is free?',
    a: "Template is free forever. $50 Accelerator gets you: structured validation methodology, YouTube critique opportunity (public value), 2 founders get 1-month 1:1 coaching (worth $2k), 30-day roadmap, asset database, AI prompts. You're paying for guidance, not access.",
    type: 'objection',
  },
  {
    q: "I don't have an audience, how will I validate?",
    a: "Magnet includes guerrilla marketing playbook: community submission tactics, outreach templates, distribution channels. Baseline goal is 10 visitors/day via free methods (Reddit, forums, direct outreach, Twitter). You don't need an existing audience.",
    type: 'objection',
  },
  {
    q: "I've tried validation before and it didn't work",
    a: 'Common issue: validating the wrong signal. Most test "would you use this?" instead of "would you pay for this?" This template forces you to test actual interest (email signup, consultation booking) not hypothetical enthusiasm. Plus, expert critique catches positioning issues early.',
    type: 'objection',
  },

  // SUPPORT (1)
  {
    q: 'What support is available?',
    a: 'Free template: GitHub issues, YouTube comments. Magnet users: Whop community chat (daily responses). Accelerator: Priority support. Direct hire: $27/hr custom dev. Response time: 24-48hrs for community, same-day for paid tiers.',
    type: 'support',
  },

  // GENERAL (2)
  {
    q: 'Is the template free and open-source?',
    a: 'Yes. MIT license—free for personal and commercial use forever. Magnet/Accelerator are optional paid services built around the free template. Fork it, modify it, use it however you want.',
    type: 'general',
  },
  {
    q: 'What support is available?',
    a: 'Free template: GitHub issues, YouTube comments. Magnet users: Whop community chat (daily responses). Accelerator: Priority support. Direct hire: $27/hr custom dev. Response time: 24-48hrs for community, same-day for paid tiers.',
    type: 'general',
  },
] satisfies FaqItem[];
