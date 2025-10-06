<script setup lang="ts">
interface Update {
  version: string;
  date: string;
  title: string;
  summary: string;
  content: string;
}

useHead({
  title: 'Updates - Product Validator',
  meta: [
    {
      name: 'description',
      content:
        'Strategic decisions and philosophical shifts behind the Product Validator template.',
    },
  ],
});

const authors = [
  {
    name: 'Drew MacGibbon',
    avatar: {
      src: '/images/team/founder-avatar.png',
      alt: 'Drew MacGibbon',
    },
    to: 'https://github.com/incubrain',
    target: '_blank',
  },
];

const updates: Update[] = [
  {
    version: 'v0.2.1',
    date: '2025-10-06',
    title: 'Ruthless Focus on Today',
    summary:
      'Stripped away complexity, noise, and future-proofing. Only what validates today matters.',
    content: `
## The Validation Lifecycle

**Launch → Validate** → *(Monetize → Optimize → Scale)*

Everything in brackets is tomorrow's problem. Until you validate demand, monetization strategy is theoretical. Optimization is premature. Scale is irrelevant.

This template forces you to solve today's problem: **Does anyone want this?**

## Removed Paid Product Complexity

Original template included three paid tiers (low/mid/high-ticket). All removed from initial launch.

**Why?** You're building a ladder before proving people want to climb. Ship the free magnet first. Gather real feedback. *Then* build the paid offer based on actual pain points—not assumptions about what "might" work.

The flow is: Launch → Validate → Decide what to build.

Not: Theorize → Build everything → Hope it works.

## Noise & Friction Elimination

Every element that adds cognitive load got cut:
- **Videos removed from requirements** — Production is time-intensive and blocks launch. Ship text + images. Add video polish after validation proves the messaging works.
- **Multi-column responsive layouts** — Killed complexity. Everything stacks vertically on mobile. If it works on the smallest screen, it works everywhere.
- **Design optimization** — Not a Day 1 priority. Good enough is enough. Perfect is the enemy of shipped.

**The principle:** Complexity compounds. A decision to create multi-column sections means scaling across breakpoints. Focus on mobile-first single column? Minimal work, universal compatibility.

Small decisions like orientation, image placement, video inclusion—these add friction without meaningful validation value. Until you know what converts, you're guessing.

## Copy Over Everything Else

Writing copy forces clarity. You can't articulate value if you don't understand it yourself.

Copy is:
- Easy to write
- Easy to change  
- High-return investment (helps you *think*)

Design, videos, imagery—these are optimization tasks. They matter *after* you prove the message resonates. Before validation, they're distractions that sink ships before they reach the ocean.

**Design is a trap.** People obsess over looks when messaging is the real blocker. If someone doesn't resonate with your product, it's not the design—it's unclear value communication.

You need good copy to get to good design. Not the other way around.

## The Philosophy Shift

Stop solving tomorrow's problems. Be *aware* of the future, but don't build for it yet.

Launch → Validate → Decide → Monetize/Pivot.

In that order. Always.
    `,
  },
  {
    version: 'v0.2.0',
    date: '2025-09-21',
    title: 'From Template to Validation System',
    summary:
      'Shifted from "how do I make this look good?" to "what evidence do I need to decide?"',
    content: `
## The Core Problem

Most founders (including me) confuse "looking professional" with "being ready to validate."

Design becomes a procrastination tool. "Just one more iteration on the hero section..." while the real question—**does anyone want this?**—goes unanswered.

Version 0.1 was a landing page template.  
Version 0.2 is a **validation methodology** that happens to include a template.

## Why Competitors Miss This

Platforms like ClickFunnels, Unbounce, Leadpages—they skip validation and push you straight to market.

**Their business model:**
1. Monthly subscriptions (whether you succeed or fail)
2. Sales commissions (the faster you sell, the faster they profit)

They're incentivized to get you selling *immediately*, not validating *correctly*.

They're not bad tools. They're just solving a different problem: "How do we scale revenue?" not "Should we build this?"

**This template is the headless version of those platforms—for the stages they neglect.**

We don't help you scale. We help you *decide if you should*.

## The Data Structure Advantage

This isn't just a template. It's a structured framework for product ideation.

Eight config files guide you through:
- Problem definition
- Solution articulation  
- Process clarity
- Value positioning
- Objection handling

Each section asks the right questions in the right order. You're not just "filling in content"—you're **clarifying your thinking** in a way that produces validation-ready messaging.

## Product Model Evolution

Original model: Four product tiers (magnet/low/mid/high) all mapped upfront.

**New model:**
1. Free magnet → validate interest
2. Low-ticket ($50-100) → validate willingness to pay
3. Mid/high-ticket → only after low-ticket proves demand

Philosophy: Don't build the ladder until you prove people want to climb.

## Why This Matters

Validation isn't about features. It's about **forcing yourself to think clearly before building**.

The template structure itself prevents premature optimization. You can't skip to monetization. You can't jump to scale. The flow is fixed: validate first, build second.
    `,
  },
  {
    version: 'v0.1.0',
    date: '2025-09-15',
    title: 'Just Launch It',
    summary:
      'First public release. Built for myself first. Imperfect, but in the wild.',
    content: `
## I Am My Own Customer

This template exists because I needed it. I am the target market.

For 13+ years, I've been the struggling founder—trying to launch, getting stuck in cycles of overthinking, rebuilding, perfecting, never shipping. ADHD compounded the pattern. Analysis paralysis became my default state.

I've lost income and earning potential equivalent to $350k+ by investing 5+ years full-time into products that never materialized. Not because they were bad ideas. Because I never validated them.

**This template is my system for breaking that cycle.**

## Why "Be Your Own Customer" Works

When you're building for yourself, messaging becomes easier. You know the pain. You lived it. You can write with vulnerability because it's *your* story.

Vulnerability builds trust. It's authentic. It strips away the slimy feeling of "marketing" because you're not selling—you're sharing.

If you're willing to own your identity, your struggles, your uniqueness—and articulate *why* you wish this product existed before you built it—you'll resonate with others facing the same pain.

Some will connect. Some won't. That's validation working as intended.

## The Trap I Kept Falling Into

Build first. Validate later (or never).

That's how ghost products happen. Months of effort that no one touches.

I'd polish features, perfect designs, ship "almost ready" products that never reached enough people to matter. Perfectionism became a socially acceptable way to avoid the one thing that creates value:

**Getting the idea in front of real humans and learning fast.**

## Why This Template Forces a Different Path

1. **Structured clarity** — Writing copy for this template forces you to articulate value. You can't BS your way through eight sections. Either you know what you're offering, or the gaps become obvious.

2. **Social + landing page in parallel** — Yes, you can validate on social media. But scattered posts don't give the full picture. This landing page is the *complete story*—the hub your social content drives to.

3. **Guided ideation** — The template structure tells you what information you need. Use that to guide your social posts. Gather feedback. Iterate the landing page. Repeat.

You're not choosing between social validation OR a landing page. You're doing both. The template just gives you a structured framework instead of guessing what to post.

## Why I'm Shipping This Now

I'm not "cured" of imposter syndrome. I still battle my brain daily. This isn't a finished system—it's a work-in-progress foundation to prevent me from falling back into self-defeating cycles.

But I'm shipping it anyway.

Because the goal isn't to "build faster." It's to **decide faster**—with confidence—so I can either double down or walk away early without sunk costs.

If it's not perfect? Good. That's the whole point.

**Target market:** The struggling founder. 3-10+ years trying to build. Stuck in mental loops. Knows they're capable but can't break through.

**Mission:** Help 100 founders achieve financial freedom so they can pursue other interests from a strong foundation.

This template is step one.
    `,
  },
];
</script>

<template>
  <UPage>
    <UPageHero
      icon="i-lucide-lightbulb"
      title="Updates"
      description="Strategic decisions and philosophical shifts behind the template"
      headline="Think different, ship faster"
      :links="[
        {
          label: 'Follow on YouTube',
          to: 'https://www.youtube.com/@Incubrain',
          color: 'primary',
          icon: 'i-lucide-youtube',
          target: '_blank',
        },
        {
          label: 'Follow on GitHub',
          color: 'neutral',
          variant: 'ghost',
          to: 'https://github.com/incubrain/product-validator',
          icon: 'i-lucide-github',
          target: '_blank',
        },
      ]"
      class="bg-muted border-b"
    />

    <UPageBody>
      <UContainer>
        <UChangelogVersions :indicator="false">
          <UChangelogVersion
            v-for="update in updates"
            :key="update.version"
            :title="update.title"
            :description="update.summary"
            :date="update.date"
            :authors="authors"
            :badge="undefined"
            :ui="{
              indicator:
                'sticky top-(--ui-header-height) pt-4 -mt-4 flex flex-col items-end',
            }"
          >
            <template #title>
              <h2 class="text-3xl font-bold pb-4">
                {{ update.title }}
              </h2>
            </template>

            <template #indicator>
              <UBadge :label="update.version" variant="soft" />
              <span class="text-sm text-muted">
                {{
                  new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </span>
            </template>

            <template #body>
              <div class="prose prose-invert max-w-none pt-6">
                <MDC :value="update.content" />
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
