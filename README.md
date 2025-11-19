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

## 🚀 Built For Developers

<table>
<tr>
<td align="center" width="20%">
<a href="https://nuxt.com"><strong>Nuxt 4</strong></a><br/>Best DX
</td>
<td align="center" width="20%">
<a href="https://tailwindcss.com"><strong>Tailwind v4</strong></a><br/>
CSS Styling
</td>
<td align="center" width="20%">
<a href="https://www.typescriptlang.org"><strong>TypeScript</strong></a><br/>
Duhh
</td>
<td align="center" width="20%">
<a href="https://ui.nuxt.com"><strong>Nuxt UI</strong></a><br/>
Components Lib
</td>
<td align="center" width="20%">
<a href="https://content.nuxt.com/docs/studio"><strong>Nuxt Studio</strong></a><br/>
Visual Editor
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

- ✅ staged validation journey with sequential progression
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
- ✅ Visual content editing via
  [Nuxt Studio](https://content.nuxt.com/docs/studio) (alpha)

---

## 🎯 6-Stage Validation Journey

The template guides you through a metrics-driven validation process. Set your
current stage via `NUXT_PUBLIC_VALIDATION_STAGE` environment variable.

**⚠️ Important:** Always start with `identity`. This foundation stage enables
rapid idea vetting and prevents wasted validation effort. Each stage builds on
the previous one.

---

### **Identity**

**Question:** Who am I and what unique value do I bring?  
**Focus:** Values, competitive edge, network, voice, decision framework  
**Time:** 1-2 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=identity`

**Purpose:** Self-knowledge enables rapid idea vetting. By establishing your
values, competitive edge, network, and authentic voice, you can evaluate ideas
in minutes instead of months. Identity clarity = validation velocity.

---

### **Attention**

**Question:** Can you build consistent communication habits?  
**Focus:** Social engagement, content cadence, messaging consistency  
**Time:** 1-2 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=attention`

**Purpose:** Building the habit of showing up regularly with valuable content.
This stage validates your ability to communicate consistently before investing
in traffic generation.

---

### **Traffic**

**Question:** Can you drive visitors and maintain message continuity?  
**Focus:** Daily visitors, bounce rate, message alignment  
**Time:** 1-2 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=traffic`

**Purpose:** Converting attention into site visitors. High bounce rates signal
misalignment between your outreach messaging and landing page content.

---

### **Conversion**

**Question:** Do visitors want your solution enough to exchange their email?  
**Focus:** Email capture rate (visitors → signups)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=conversion`

**Purpose:** Testing whether visitors want your solution enough to exchange
contact information. Strong conversion rates validate positioning and offer
clarity.

---

### **Engagement**

**Question:** Do they complete what you deliver?  
**Focus:** Magnet completion rate (signups → completed)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=engagement`

**Purpose:** Validating whether your delivered content provides real value. High
completion rates signal strong product-market fit for your lead magnet.

---

### **Demand**

**Question:** Will they pay for a solution to their next pain point?  
**Focus:** Purchase intent rate (completers → expressed interest)  
**Time:** 2-4 weeks  
**ENV:** `NUXT_PUBLIC_VALIDATION_STAGE=demand`

**Purpose:** Testing willingness to pay for solutions. Strong purchase intent
validates real business opportunity beyond free content engagement.

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
2. **Replace placeholder content** in `content/` files (Markdown & YAML)
3. **Setup analytics** (Umami pre-configured, swap easily via
   [Nuxt Scripts](https://scripts.nuxt.com/scripts))
4. **Start with Identity stage** and progress sequentially through validation

## 📚 Configuration

All landing page content is managed through structured files in the `content/` directory, powered by **Nuxt Content**.

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

| Action             | Command / Location                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Deploy**         | Push to main branch (auto-deploy on Railway/Vercel)                                                    |
| **Configure**      | Update files in `content/`                                                                             |
| **Set Stage**      | Update `NUXT_PUBLIC_VALIDATION_STAGE` in ENV (identity/attention/traffic/conversion/engagement/demand) |
| **Track Metrics**  | Setup analytics ([Umami](https://umami.is) recommended)                                                |
| **Swap Analytics** | Use any provider via [Nuxt Scripts](https://scripts.nuxt.com/scripts)                                  |

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
