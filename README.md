# Product Validator

> **⚠️ WORK IN PROGRESS** — Active development on main branch. Breaking changes
> may occur as we rapidly iterate toward product-market fit. Star & watch for
> updates.

---

> **Validation-First Template** — Ship a landing page in <10 minutes, validate
> with data in weeks, not months.

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fincubrain%2Fproduct-validator)
&nbsp;&nbsp;
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usbhW2?referralCode=gvXQKE)

**[→ View Live Demo](https://product-validator.incubrain.org)**

</div>

---

A minimal, production-ready **Nuxt 4 + Tailwind v4 + TypeScript** template
designed to help struggling founders break perfectionist cycles and validate
business models through metrics-driven action.

**Core Philosophy:** Ship signal, not perfection. Let data guide your decisions.

---

## 🚀 Built With

<table>
<tr>
<td align="center" width="25%">
<a href="https://nuxt.com"><strong>Nuxt 4</strong></a><br/>
Vue framework with<br/>best-in-class DX
</td>
<td align="center" width="25%">
<a href="https://tailwindcss.com"><strong>Tailwind v4</strong></a><br/>
CSS-first utility<br/>framework
</td>
<td align="center" width="25%">
<a href="https://www.typescriptlang.org"><strong>TypeScript</strong></a><br/>
Full type safety<br/>throughout
</td>
<td align="center" width="25%">
<a href="https://ui.nuxt.com"><strong>Nuxt UI</strong></a><br/>
Production-ready<br/>components
</td>
</tr>
</table>

---

## ✨ Why This Template Exists

Most founders get stuck in perfectionist loops:

- "Just one more feature..."
- "I need to research more first..."
- "It's not ready to show anyone yet..."

**This template forces a different path:**

1. **Deploy with placeholders** (break the "not ready" barrier)
2. **Replace with your content** (positioning, offer, value proposition)
3. **Drive traffic** (validate attention before building)
4. **Track metrics** (data-driven decisions at each stage)
5. **Build only what's validated** (stop guessing, start measuring)

**Result:** Know if people want your solution before investing months building
it.

### **Core Features**

**Metrics-Driven Framework:**

- ✅ 5-stage validation journey with clear thresholds
- ✅ Progressive disclosure (UI adapts to validation stage)
- ✅ Data-driven decision framework
- ✅ Conversion-optimized components (exit-intent, CTAs)
- ✅ Provider-agnostic analytics events
- ✅ Type-safe configuration system

**Developer Experience:**

- ✅ Hot Module Replacement for config changes
- ✅ Inline documentation in config files
- ✅ Type-safe validation stage system
- ✅ One-click deployment (Vercel/Railway)
- ✅ Pre-configured analytics (Umami) - easily swap via
  [Nuxt Scripts](https://scripts.nuxt.com/scripts)

---

## 🎯 5-Stage Validation Journey

The template guides you through a metrics-driven validation process. Set your
current stage via `NUXT_PUBLIC_VALIDATION_STAGE` environment variable.

**⚠️ Important:** Always start with `attention` unless you already have an
established traffic source and marketing experience. Each stage builds on the
previous one.

---

### **Stage 1: Attention**

**Question:** Can you drive traffic and capture attention?  
**Metric:** Daily visitors + bounce rate  
**Time:** 1-2 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=attention`

**Thresholds & Actions:**

| Signal      | Range     | Meaning                  | Action                                  |
| ----------- | --------- | ------------------------ | --------------------------------------- |
| **Weak**    | <10/day   | No traffic strategy      | Learn one channel, test different hooks |
| **Average** | 10-30/day | Growing traction         | Refine messaging, optimize bounce rate  |
| **Strong**  | >30/day   | Validated traffic source | Progress to Stage 2                     |

**Decision Point:**

- Strong signal → Move to conversion stage
- Weak signal after 4+ weeks → Pivot traffic strategy or reconsider market
- Average signal → Continue iterating

---

### **Stage 2: Conversion**

**Question:** Do visitors want your solution enough to exchange their email?  
**Metric:** Email capture rate (visitors → signups)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=conversion`

**Thresholds & Actions:**

| Signal      | Range | Meaning             | Action                                     |
| ----------- | ----- | ------------------- | ------------------------------------------ |
| **Weak**    | <5%   | Positioning unclear | Refine offer, test new messaging           |
| **Average** | 5-15% | Good interest       | A/B test improvements, gather feedback     |
| **Strong**  | >15%  | Strong signal       | Build the lead magnet, progress to Stage 3 |

**Decision Point:**

- Strong signal → Build magnet and move to engagement stage
- Weak signal after 10+ tests → Revisit positioning or pivot
- Average signal → Continue optimizing conversion elements

---

### **Stage 3: Engagement**

**Question:** Do they complete what you deliver?  
**Metric:** Magnet completion rate (signups → completed)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=engagement`

**Thresholds & Actions:**

| Signal      | Range  | Meaning             | Action                                       |
| ----------- | ------ | ------------------- | -------------------------------------------- |
| **Weak**    | <20%   | Content lacks value | Improve magnet quality, shorten content      |
| **Average** | 20-40% | Decent engagement   | Refine delivery, add more value              |
| **Strong**  | >40%   | High completion     | Schedule feedback calls, progress to Stage 4 |

**Decision Point:**

- Strong signal → Schedule calls with completers, move to demand stage
- Weak signal → Content mismatch, rebuild magnet based on feedback
- Average signal → Optimize delivery and follow-up sequence

---

### **Stage 4: Demand**

**Question:** Will they pay for a solution to their next pain point?  
**Metric:** Purchase intent rate (completers → expressed interest)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=demand`

**Thresholds & Actions:**

| Signal      | Range  | Meaning                    | Action                                   |
| ----------- | ------ | -------------------------- | ---------------------------------------- |
| **Weak**    | <10%   | Offer misaligned           | Revisit pain points, adjust pricing      |
| **Average** | 10-20% | Some interest              | Refine offer packaging, test pricing     |
| **Strong**  | >20%   | Strong monetization signal | Close initial sales, progress to Stage 5 |

**Decision Point:**

- Strong signal → Start building full product/service, move to build stage
- Weak signal → Offer doesn't solve real pain point, pivot or abandon
- Average signal → Continue optimizing offer and pricing

---

### **Stage 5: Build Prep**

**Question:** Can you optimize the full funnel and scale confidently?  
**Metric:** Full-funnel conversion (visitors → paying customers)  
**Time:** Ongoing  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=build_prep`

**Thresholds & Actions:**

| Signal      | Range | Meaning                  | Action                                    |
| ----------- | ----- | ------------------------ | ----------------------------------------- |
| **Weak**    | <1%   | Funnel leaks             | Identify drop-off points, optimize stages |
| **Average** | 1-3%  | Solid foundation         | Continue optimization, add testimonials   |
| **Strong**  | >3%   | Validated business model | Scale traffic with confidence             |

**Focus Areas:**

- Optimize all previous stages (attention → demand)
- Add testimonials and social proof
- Create media assets (demo videos, case studies)
- Refine messaging based on validated feedback
- Scale traffic and optimize conversion at each stage

---

### Local Development

```bash
# Clone repository
git clone https://github.com/incubrain/product-validator your-project
cd your-project

# Install dependencies
pnpm install

# Copy example environment file
cp example.env .env

# Start dev server
pnpm dev
```

Visit `http://localhost:3000` to see placeholder site.

---

### Next Steps After Deployment

1. **Setup environment variables** - Copy `example.env` to `.env` (local) or
   configure in your deployment provider's environment settings
2. **Replace placeholder content** in `shared/config/` files
3. **Setup analytics** (Umami pre-configured, swap easily via
   [Nuxt Scripts](https://scripts.nuxt.com/scripts))
4. **Start with Stage 1** and progress based on metrics

## 📚 Configuration

All landing page content is managed through structured config files in
`shared/config/`.

### Config Files Structure

```
shared/config/
├── 1.flow.ts               # Overall page structure & section config
├── 2.problem-solution.ts   # Problem/solution cards
├── 4.process.ts            # 5-stage validation journey content
├── 5.founder.ts            # Your story & positioning
├── 6.offers.ts             # Lead magnet + paid service
├── 7.results.ts            # Testimonials & social proof
├── 8.concerns.ts           # FAQ & objections
└── navigation.ts           # Primary/secondary CTA configuration
```

**Progressive Disclosure:** Sections appear/hide based on your validation stage
(set via ENV), keeping focus on what matters now.

---

## 🔍 Who This Is For

### Ideal For

✅ Technical founders stuck in "almost ready" mode for 3-10+ years  
✅ Founders with domain expertise who struggle to identify what to build  
✅ Those who keep rebuilding instead of validating  
✅ People tired of perfectionist loops preventing launches  
✅ Founders willing to market and drive traffic to test

### Not Ideal For

❌ Post-PMF companies scaling existing products  
❌ B2B enterprise with 6-12 month sales cycles  
❌ Non-technical founders without dev support  
❌ Anyone expecting passive validation without marketing effort  
❌ Those unwilling to make decisions based on data

---

## ⚡ Quick Reference

| Action             | Command / Location                                                    |
| ------------------ | --------------------------------------------------------------------- |
| **Deploy**         | Push to main branch (auto-deploy on Railway/Vercel)                   |
| **Configure**      | Update files in `shared/config/`                                      |
| **Set Stage**      | Update `NUXT_PUBLIC_VALIDATION_STAGE` in ENV                          |
| **Track Metrics**  | Setup analytics ([Umami](https://umami.is) recommended)               |
| **Swap Analytics** | Use any provider via [Nuxt Scripts](https://scripts.nuxt.com/scripts) |

---

## 🔎 Quick Navigation

Use inline tags to find what you need quickly:

**Search:** `Cmd+Shift+F` (VS Code)

**Tags:**

- `{CONFIG}:` → Things you must update
- `{DECISION}:` → Why something was implemented this way
- `{DX}:` → Developer experience tips
- `{OPTIMIZE}:` → Post-validation improvements

---

## 🤝 Contributing

This template evolves based on real founder feedback.

**Ways to contribute:**

- Share your validation results (anonymized if needed)
- Report bugs or unclear documentation
- Suggest improvements based on your experience
- Submit case studies of successful validations

**Not accepting:** Feature requests that add complexity before validation.

---

## 📄 License

MIT License with restriction: You may use this template for personal or
commercial projects, but you may not clone this template and build a competing
business offering the same or substantially similar template as a product or
service.

---

**Focus:** Ship signal, not perfection. Validate with data, build with
confidence.
