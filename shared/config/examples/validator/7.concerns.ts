import type { FaqItem } from '#types';
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const concerns = [
  // ============================================================================
  // WARNINGS (3) - Down from 4
  // ============================================================================
  {
    q: 'How much time does this really take?',
    a: 'Stage 1 (Deploy Minimal): <10 minutes to go live. Stage 2 (Traffic Validation): 1-2 weeks driving 10+ daily visitors through guerrilla marketing (expect 4-6 hours/day on outreach, community engagement, direct messaging). Stage 3 (Conversion Validation): 2-4 weeks refining offer and adding full sections based on feedback. Stage 4 (Engagement): 2-4 weeks building and delivering validated magnet. Stage 5 (Monetization): Ongoing feedback calls and upsells. Total: 6-12 weeks to validated business model. Most founders underestimate the marketing effort—validation is 80% marketing, 20% building.',
    type: 'warning',
  },
  {
    q: 'Who should NOT use this?',
    a: "Non-technical founders without dev support or willingness to learn basics, post-PMF companies already scaling validated products, B2B enterprise with 12+ month sales cycles, or anyone expecting passive validation without daily marketing effort. If you can't commit 4-6 hours/day to marketing during validation phases, this won't work.",
    type: 'warning',
  },
  {
    q: 'What are the technical requirements?',
    a: "Basic dev setup: Node.js, Git, text editor. Entry-level technical skills needed—if you can edit config files and use AI (ChatGPT/Claude) to understand a codebase, you're qualified. No advanced coding required. This is about execution and marketing, not technical complexity.",
    type: 'warning',
  },

  // ============================================================================
  // OBJECTIONS (5) - Down from 13
  // ============================================================================
  {
    q: 'Why not use ClickFunnels, Kajabi, or other funnel/no-code platforms?',
    a: 'Cost: $147-399/month forever vs $0-50 one-time. Lock-in: They own your data and design—migrating means rebuilding from scratch. Assumption: They assume you have a validated offer and know how to market. Reality: 42% of startups fail building products nobody wants (CB Insights). Platforms skip validation methodology entirely. This gives you: (1) Stage-by-stage validation framework with success metrics, (2) Technical ownership from day one, (3) Free forever, (4) Guidance from idea → validated business. No-code is faster for simple pages, but when you need custom features or want to scale, platform limitations hurt. Start with ownership.',
    type: 'objection',
  },
  {
    q: 'I can build a landing page myself. Why use a template?',
    a: "True—but this isn't just a landing page. It's a complete validation system: staged rollout (5 phases), conversion-optimized sections, analytics integration, email capture, feedback systems, guerrilla marketing playbook, success metrics framework, and strategic guidance. 200+ hours of research and iteration compressed into a free template. You could rebuild it, but why? It's open-source—fork it, customize it, make it yours. Focus your time on marketing and validation, not reinventing infrastructure.",
    type: 'objection',
  },
  {
    q: "What if I validate and it fails? Isn't that wasted time?",
    a: "That's the entire point—fail fast in weeks, not months. Each stage has clear success metrics: Traffic (<10/day = pivot channel), Conversion (<5% = refine offer), Engagement (<20% = improve magnet), Monetization (<10% interest = revisit pain points). You iterate within each stage until you hit thresholds, then advance. Failed validation prevents building products nobody wants—it's not wasted time, it's compressed learning. Evidence-based pivots are success.",
    type: 'objection',
  },
  {
    q: "I don't have an audience. How can I validate without traffic?",
    a: "Most founders start with zero audience—that's why Stage 2 focuses entirely on guerrilla marketing. Baseline goal: 10 visitors/day through free channels (Reddit communities, niche forums, direct outreach, Twitter/X engagement, cold email). Magnet includes distribution playbook: community submission tactics, outreach templates, where to find your early adopters. Validation forces you to learn one marketing channel deeply. If you can't drive 10 visitors/day, you can't build a business—better to learn that in Week 1 than Month 6.",
    type: 'objection',
  },
  {
    q: "I've tried validation before and got no traction. Why will this work?",
    a: "Common failure: validating hypothetical interest ('Would you use this?') instead of real commitment (email signup, consultation booking, payment intent). This template forces concrete actions at each stage with measurable thresholds. Plus: expert feedback calls catch positioning issues early, staged rollout prevents overwhelm, success metrics show exactly where you're stuck, and the framework guides iteration until validation or evidence-based pivot. It's not about trying harder—it's about testing the right signals with clear decision criteria.",
    type: 'objection',
  },

  // ============================================================================
  // SUPPORT (2) - Unchanged
  // ============================================================================
  {
    q: 'What support is available?',
    a: 'Free template: GitHub issues, YouTube tutorials, community Discord. Magnet users: Priority community support (24-48hr response). Accelerator: Weekly group calls + async support. Direct hire: $27/hr custom development and strategic guidance. All tiers get access to the validation framework and marketing playbooks.',
    type: 'support',
  },
  {
    q: 'Where is the documentation?',
    a: 'Currently: README setup guide + inline code comments + YouTube walkthrough series. Comprehensive docs coming after template refinement (Q2 2025). For now: AI assistants (ChatGPT/Claude) can explain any part of the codebase—this is intentionally designed to be AI-readable.',
    type: 'support',
  },

  // ============================================================================
  // GENERAL (1) - Unchanged
  // ============================================================================
  {
    q: 'Is the template free and open-source?',
    a: 'Yes. MIT license—free for personal and commercial use forever. Magnet/Accelerator are optional paid services built around the free template. Fork it, modify it, sell products built with it—total ownership. The validation framework, marketing playbooks, and strategic guidance are included free.',
    type: 'general',
  },
] satisfies FaqItem[];
