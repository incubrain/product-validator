# Founder Funnel

> **Own your funnel. Open-source landing page with built-in gated content delivery for founders.**

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fincubrain%2Ffounder-funnel)
&nbsp;&nbsp;
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usbhW2?referralCode=gvXQKE)

</div>

---

## What Is This?

A landing page template for founders who want to validate ideas and capture leads — without monthly fees or vendor lock-in.

**Built with:** Nuxt 4 · Tailwind v4 · TypeScript · Nuxt UI

---

## Why Use This?

**The problem:** Landing page tools charge monthly fees, lock your content in their platform, and make migration painful.

**Founder Funnel:**

- **Free forever** — Clone it, own it, deploy anywhere
- **All-in-one** — Landing page + email capture + gated content delivery
- **No dependencies to start** — Works out of the box, add integrations when needed
- **Stage-based visibility** — Show/hide sections as your product evolves

---

## Core Features

### Landing Page
Conversion-optimized sections: hero, problem/solution, process, offer, testimonials, FAQ. All content managed via simple YAML and Markdown files.

### Gated Content Delivery
Capture emails → grant access to sequential content. Built-in progress tracking and completion states.

### Stage-Based Visibility
Configure which sections appear at each stage of your product. Waitlist shows countdown and waitlist. Launch shows full offer. Growth adds testimonials and social proof.

### Fake Door Testing
Test demand before building. Collect "interested" signups, then flip a switch to enable real access when ready.

### Zero Lock-In
Your code, your data, your hosting. Swap analytics, email providers, or payment systems anytime.

---

## Quick Start

```bash
git clone https://github.com/incubrain/founder-funnel your-project
cd your-project
pnpm install
cp .example.env .env
pnpm dev
```

Open `http://localhost:3000` — replace placeholder content with your own.

---

## Understanding the Codebase

Instead of docs that go stale, use [Repomix](https://github.com/yamadashy/repomix) to bundle the codebase and ask an LLM to explain it:

```bash
npx repomix
```

This generates a single file with the full codebase context. Paste it into Claude or ChatGPT and ask whatever you need.

---

## Example Configurations

The template includes example configurations showing different use cases:

- **Founder Funnel** — Simple 3-stage setup (waitlist → launch → growth)

Switch between them via `NUXT_PUBLIC_CONFIG_SOURCE` in your `.env`.

---

## Who This Is For

**Good fit:**
- Founders validating SaaS or digital product ideas
- Technical founders who want to own their stack
- Anyone tired of monthly landing page fees

**Not a fit:**
- Non-technical users needing drag-and-drop builders
- Anyone wanting a fully managed no-code solution

---

## Future Considerations

Things we're exploring — nothing fixed:

- A/B testing
- NuxtHub integration
- More example configurations
- Feedback collection
- Payment intent tracking
- Admin dashboard

---

## Contributing

Bug fixes, documentation improvements, and new example configurations welcome.

---

## License

MIT — Use for personal or commercial projects.

**One restriction:** Don't clone this and sell it as a competing template product.

---

**Ship today. Own forever.**