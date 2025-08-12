---
title: "The AI Revolution is Here"
subtitle: "How our i18n + Content layer works (with real code you can copy-paste)"
excerpt: "A concise, practical walkthrough of the i18n content layer: fetching, translations, SEO, params, and formatters—using filename STEMs for a great DX."
category: "ai-automation"
isPublic: true
author: "Tech Writer"
publishedAt: "2024-01-15"
featured: true
tags: ["AI", "Technology", "Innovation", "Future"]
slug: "ai-revolution"
---

# The AI Revolution is Here

This article doubles as a **live example**. You’re viewing content fetched by `useI18nContent` and rendered with `ContentRenderer`. Below we explain what happens under the hood and how to use each composable.

## Under the hood (what & why)

- **Fetch by slug + locale**  
  We load the current-locale document by its `slug` (URL). Drafts stay hidden via `isPublic: true`.

- **Translations by filename STEM**  
  Files across locales share the same **filename** (the *STEM*), e.g.  
  `blog_en/ai-revolution.md` and `blog_mr/ai-revolution.md`.  
  This lets us discover translations at runtime—no build-time slug maps.

- **Category is a URL concern**  
  We canonicalize the URL to `/blog/<categorySlug>/<slug>` so links stay stable; content fetch logic never depends on category.

- **SEO + cross-locale params**  
  `useI18nContentSEO` wires hreflang/meta; `useI18nContentParams` makes language switching instant and correct.

---

## Standards (must follow)

1. **Identical filenames (STEM) across locales.**  
   Example: `ai-revolution.md` in both `blog_en/` and `blog_mr/`.
2. **Public gating:** set `isPublic: true` to expose content.
3. **Per-locale directories:** collections live under `en/`, `mr/`, etc.
4. **Fetch by slug + locale only.** Don’t key fetches by category.
5. **If you show category in URLs,** include `categorySlug` (or a `category` we can slugify).

---

## Quick start (copy this)

```vue
<script setup lang="ts">
// In a page like /blog/[category]/[slug].vue
const { content, translations, pending, error } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
})
</script>
<!-- Render -->
<ContentRenderer v-if="content?.body" :value="content" />
```

Composables you can use

1. useI18nContent — fetch + translation discovery

```typescript
const {
  content,            // current-locale doc
  translations,       // { 'mr': { slug, title, id }, ... }
  pending,
  error,
  refresh,
  hasTranslation,     // (code) => boolean
  getTranslationSlug, // (code) => string | undefined
  missingTranslations // computed string[]
} = useI18nContent({ collection: 'blog' })
```

Notes
	•	Background translation lookup uses the filename STEM; only isPublic docs are returned.
	•	Cache keys are per (collection, locale, slug) to prevent stale bleed.

2. useI18nContentParams — cross-locale route params

```typescript
// Usually auto-enabled via useI18nContent({ autoI18nParams: true })
// Manual usage:
useI18nContentParams({ content, translations })

// Result: route params map kept in sync, so language switching is instant
// Example shape: { en: { slug: 'ai-revolution' }, mr: { slug: 'ai-kranti' } }
```

3. useI18nContentSEO — hreflang + meta

```ts
// Usually auto-enabled via useI18nContent({ autoSEO: true })
// Manual usage:
useI18nContentSEO({ content })

// Sets <html lang/dir>, link[hreflang], and basic meta (description, og:title)
```

4. useI18nFormatters — locale-aware formatting

```ts
const fmt = useI18nFormatters()

fmt.value.currency(2999.99, 'INR') // ₹2,999.99 (in mr) / ₹2,999.99 (in en-IN)
fmt.value.number(12345.67)         // 12,345.67
fmt.value.date(new Date(), { dateStyle: 'medium' }) // locale date
fmt.value.list(['A','B','C'])      // “A, B, and C” (locale conjunctions)
```


5. useI18nText — pick text by locale (simple helper)
```ts
const title = useI18nText({
  en: 'Welcome',
  mr: 'स्वागत'
})
// title.value is the right string for the current locale, with fallback
```

Canonicalization example (category + slug)

```ts
const effectiveCategorySlug = content.value?.categorySlug
  || slugify(content.value?.category)

if (route.params.category !== effectiveCategorySlug) {
  navigateTo(`/blog/${effectiveCategorySlug}/${content.value.slug}`)
}
```

We keep fetching keyed to slug + locale. Category is validated only for URL hygiene.


Debugging
	•	Add ?debug to the URL (or run in dev) to see a compact debug card.
	•	Missing translation? Check the filename STEM and isPublic.


TL;DR
	•	One filename per content item across locales = no guesswork.
	•	Public gating keeps drafts private.
	•	Auto SEO/params reduces boilerplate.
	•	Great DX: search by filename with ⌘P or Studio ⌘K across locales.
