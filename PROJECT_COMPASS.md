# Project Compass: The Product Validator Way

> **"Ship signal, not perfection. Let data guide your decisions."**

This document serves as the north star for the Product Validator project. It outlines our core philosophy, validation framework, and architectural principles. Use this to guide all future development and decision-making.

---

## 🧭 Core Philosophy

### 1. Fail Fast, Fail Early
We believe that the biggest risk for founders is not "can I build it?" but "should I build it?".
- **Goal**: Validate ideas in days/weeks, not months.
- **Mechanism**: A 6-stage validation journey that forces binary decisions (Advance or Pivot) at each gate.
- **Mindset**: A "No" is a successful outcome if it saves months of wasted engineering.

### 2. Identity-First Validation
Most validation frameworks start with the *idea*. We start with the *founder*.
- **Why**: Without identity clarity, every idea looks viable, and founders lack the "veto power" to filter opportunities.
- **Principle**: Know thyself → Know thy customer → Veto ideas instantly.
- **Impact**: Founders can discard 80% of ideas that don't align with their unique edge, values, or network before writing a single line of code.

### 3. Jobs-Style Messaging (Outcomes > Features)
We communicate the *transformation*, not the *transaction*.
- **Rule**: Describe what the user *becomes* or *achieves*, not what the product *does*.
- **Example**:
    - ❌ "4-step email sequence with automated follow-ups"
    - ✅ "Break perfectionist paralysis and validate your idea in 14-22 hours"
- **Benefit**: Messaging remains durable even as the underlying implementation (features) changes.

### 4. Progressive Disclosure
We don't overwhelm early-stage founders (or their users) with everything at once.
- **Mechanism**: The UI adapts to the current validation stage.
- **Implementation**: `NUXT_PUBLIC_VALIDATION_STAGE` controls visibility of sections and features.
- **Effect**: Focus is kept strictly on the metrics that matter for the current stage.

---

## 🚀 The 6-Stage Validation Journey

The project is built around these sequential stages. Development should always respect this progression.

| Stage | Name | Focus | Key Question |
| :--- | :--- | :--- | :--- |
| **1** | **Identity** | Self-knowledge | *Who am I and what is my unique edge?* |
| **2** | **Attention** | Habits & Messaging | *Can I build a consistent habit of showing up?* |
| **3** | **Traffic** | Visitors & Bounce Rate | *Can I drive people to my site?* |
| **4** | **Conversion** | Email Capture | *Do they want the solution enough to sign up?* |
| **5** | **Engagement** | Magnet Completion | *Do they actually use/consume the value?* |
| **6** | **Demand** | Purchase Intent | *Will they pay for the next step?* |

> **Critical Note**: We split "Attention" and "Traffic" to separate the *internal habit* of creating content from the *external result* of driving visitors.

---

## 🏗 Architectural Principles

### 1. Config-Driven Content
- **Location**: `shared/config/`
- **Why**: Separation of concerns. Content lives in typed config files; UI components are pure renderers.
- **Benefit**: Enables rapid iteration on messaging without touching component code.

### 2. Developer Experience = Product Quality
- **Belief**: Tools that help *us* build faster also help *founders* validate faster.
- **Features**:
    - Hot Module Replacement for configs.
    - Type-safe validation stages.
    - Automated pre-deployment checks.
    - "Pit of success" defaults (e.g., automated backups).

### 3. Production-Ready Defaults
- **Stack**: Nuxt 4, Tailwind v4, TypeScript.
- **Standard**: We don't ship "MVP code" in the sense of sloppy code. We ship *minimal* but *robust* code.
- **SEO**: Built-in best practices (meta tags, semantic HTML) because validation requires organic reach.

---

## 🛠 Development Guidelines

When contributing or extending the codebase:

1.  **Check the Compass**: Does this feature help a founder validate faster? If it adds complexity without speed, reject it.
2.  **Respect the Stages**: If adding a feature, define *when* it should appear. Add it to `VISIBILITY_UNLOCK_STAGES` in `settings.ts`.
3.  **Type Everything**: Use the shared types in `shared/types`.
4.  **Keep it Clean**: Follow the directory structure (`app`, `server`, `shared`).
5.  **Update the Guide**: If you change the philosophy or stages, update this document and the `updates` log.

---

## 📚 Key Resources

- **Update Logs**: `content/examples/validator/updates/` (Read these to understand the "why" behind changes)
- **Config**: `shared/config/` (The source of truth for content)
- **Visibility Logic**: `shared/config/settings.ts` & `composables/useSectionVisibility.ts`
