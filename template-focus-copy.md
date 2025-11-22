---

## Plan 2: Landing Page Content Update

**Goal:** Rewrite all landing page content to focus on the Lead Funnel Template value proposition, removing validation methodology messaging.

---

### Phase 1: Messaging Foundation

**New positioning statement:**
> "Own Your Lead Funnel — An open-source landing page template with built-in gated content delivery for technical founders."

**Primary value props:**
1. Deploy in 10 minutes, own forever
2. Landing page + gated content in one system
3. No third-party dependencies to start
4. Stage-based progressive disclosure (ship minimal, add as you validate)
5. Modern tech stack (Nuxt 4, Tailwind v4, TypeScript)

**Target user:**
- Technical founders who want to own their funnel
- Developers tired of SaaS subscription overhead
- Builders who want flexibility to add integrations as needed

---

### Phase 2: Content Files to Update

**`pages/index.md`** — Complete rewrite:
- Hero: "Own Your Lead Funnel" messaging
- Problem: SaaS lock-in, monthly costs, feature bloat
- Solution: Open-source template with everything included
- Process: Deploy → Configure → Capture → Deliver
- Offer: Free template + optional implementation help

**`config/site.yml`** — Update:
- Business description alignment with new positioning

**`offers/magnet.yml`** — Rewrite:
- Change from "Validation Kit" to template-focused offer
- Features list updated for template benefits
- CTA focused on getting the template

**`offers/direct.yml`** — Update:
- Implementation help positioning
- Clearer scope of what's included

**`faq/*.yml`** — Complete rewrite:
- Remove validation methodology questions
- Add template-focused questions:
  - Technical requirements
  - Deployment options
  - Customization capabilities
  - Integration possibilities
  - Comparison to alternatives

**`features/benefits.yml`** — Rewrite:
- Template features, not validation stages
- Focus on: deployment speed, ownership, flexibility, DX, cost savings

**`features/process.yml`** — Rewrite:
- Template usage process, not validation methodology
- Steps: Clone → Configure → Deploy → Iterate

**`results/customers.yml`** — Remove or replace:
- Remove enterprise logos (Buffer, Dropbox, etc.)
- Replace with actual template users or remove section entirely until real testimonials exist

**`results/testimonials.yml`** — Update:
- Remove placeholder testimonials
- Either leave empty or add real feedback when available

**`team/founder.yml`** — Simplify:
- Brief founder intro
- Focus on technical credibility
- Remove deep personal story (move to course site)

**`updates/*.md`** — Audit:
- Keep technical changelog entries
- Remove or move methodology-focused entries

---

### Phase 3: Component Updates

**Hero section (`app/components/section/Hero.vue`):**
- Review badge, title, description rendering
- Ensure countdown/CTA logic still makes sense for template positioning

**Problem/Solution section:**
- Update to address SaaS lock-in, cost, complexity problems
- Solution focused on template benefits

**Process section:**
- Update to show template deployment/usage process

**Offer section:**
- Ensure it renders updated offer content correctly

**Results section:**
- Hide or simplify until real testimonials exist

**Concerns/FAQ section:**
- Will render new FAQ content automatically

---

### Phase 4: Remove Methodology-Specific UI

**Review and potentially remove:**
- Validation stage indicator in DevTools (or make generic)
- Any hardcoded references to "identity", "attention", "traffic", "conversion", "engagement", "demand" as stage names
- Methodology-specific copy in components

**Keep but generalize:**
- Stage-based visibility system (powerful feature)
- Progress tracking in gated content
- Event tracking system

---

### Phase 5: Final Review

**Consistency check:**
- All copy refers to "lead funnel template" not "validation system"
- No orphaned methodology references
- CTAs aligned with new offer structure
- FAQ answers make sense for template users

**Technical check:**
- All content files valid YAML/Markdown
- No broken references to removed content
- Stage configuration still works with generic names

---

### Deliverables

1. Rewritten `pages/index.md` with template-focused messaging
2. Updated offer files (`magnet.yml`, `direct.yml`)
3. New FAQ content for template users
4. Updated features/benefits content
5. Cleaned up results section (removed fake social proof)
6. Simplified founder profile
7. Consistent messaging across all content files