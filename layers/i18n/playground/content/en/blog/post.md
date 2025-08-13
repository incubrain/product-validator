---
slug: "post"
categoryStem: "technology"
status: "published"
audience: "beginner"
layout: "article"
authors:
  - name: "drew-macgibbon"
    role: "creator"
createdAt: "2024-01-15"
updatedAt: "2024-01-15"
tags:
  - "technology"
  - "innovation"
  - "future"
  - "guide"
version: "1.0.0"
duration: 6
image:
  src: "example.jpg"
  alt: "Illustration showing localized content and STEM-based routing"
title: "Complete Guide to Our i18n Content System"
excerpt: "Deep dive into our STEM-based i18n architecture with real examples from blog posts, static pages, and category management."
description: "Master our multilingual content system with practical examples showing how useI18nContent, STEM matching, and automatic URL localization work together."
---

This article is a **live demonstration** of our i18n content system. You're viewing content fetched by `useI18nContent`, with automatic translation discovery, URL localization, and SEO optimization working behind the scenes.

## System Architecture Overview

Our i18n system is built around three core concepts that work together seamlessly:

### 1. STEM-Based Translation Discovery
Files share identical names across locales, creating an automatic translation bridge:
```
content/en/blog/ai-revolution.md    ← Same STEM
content/mr/blog/ai-revolution.md    ← Same STEM
```

### 2. Smart URL Localization  
URLs adapt to each language while maintaining content relationships:
```
English: /blog/technology/ai-revolution
Marathi: /blog/tantrajantra/ai-kranti
```

### 3. Automatic Parameter Resolution
Route parameters get resolved per-locale through collection lookups:
```javascript
// Category "technology" becomes "tantrajantra" in Marathi
paramMap: {
  category: { 
    field: 'categoryStem', 
    collection: 'categories', 
    targetField: 'slug' 
  }
}
```

---

## Real Examples from Our Pages

### Blog Posts: Complex Multi-Parameter Routing

Our blog system handles the most complex scenario with category + slug resolution:

```vue
<!-- pages/blog/[category]/[slug].vue -->
<script setup lang="ts">
const { content, translations, pending, error } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
  paramMap: {
    slug: 'slug',
    category: { 
      field: 'categoryStem', 
      collection: 'categories', 
      targetField: 'slug' 
    },
  },
})

// Canonicalize URLs based on content metadata
const effectiveCategorySlug = computed(() =>
  content.value?.categorySlug || deriveSlug(content.value?.category)
)

// Auto-redirect if URL category doesn't match content
watchEffect(async () => {
  if (content.value && categoryParam.value !== effectiveCategorySlug.value) {
    await navigateTo(`/blog/${effectiveCategorySlug.value}/${content.value.slug}`)
  }
})
</script>
```

**What happens here:**
- Fetches post by `slug` for current locale
- Discovers translations via filename STEM matching
- Resolves category parameter through `categories` collection lookup
- Auto-redirects if URL category doesn't match content metadata
- Enables seamless language switching with correct URLs

### Static Pages: Simplified Single-Parameter Flow

Static pages use a much simpler pattern without category resolution:

```vue
<!-- pages/pages/[slug].vue -->
<script setup lang="ts">
const { content, pending, error, refresh } = useI18nContent({
  collection: 'pages',
  autoSEO: true,
  autoI18nParams: true,
})
</script>
```

**Perfect for:**
- About pages (`/pages/about` → `/paane/about`)
- Contact forms
- Privacy policies
- Terms of service

### Category Management: STEM System Visualization

Our categories page shows the STEM system in action:

```vue
<!-- pages/categories.vue -->
<script setup lang="ts">
// Load all categories for all locales
await Promise.all(
  locales.value.map(async (loc) => {
    const items = await queryCollection(`categories_${loc.code}`)
      .where('status', '=', 'published')
      .select('id', 'slug', 'title', 'status')
      .all()

    for (const item of items) {
      const stem = stemFromId(item.id, loc.code) // Extract STEM from filename
      if (!stems.value[stem]) stems.value[stem] = {}
      stems.value[stem][loc.code] = {
        slug: item.slug,
        title: item.title,
      }
    }
  })
)
</script>
```

**Demonstrates:**
- How STEM grouping works across all locales
- Content coverage visualization
- Translation completeness checking

---

## Core Composables Explained

### useI18nContent: The Foundation

```typescript
const {
  content,            // Current locale document
  translations,       // { 'mr': { slug, title, id }, ... }
  pending,           // Loading state
  error,             // Error state
  refresh,           // Manual refresh function
  hasTranslation,    // (code: string) => boolean
  getTranslationSlug, // (code: string) => string | undefined
  missingTranslations // Computed list of missing locales
} = useI18nContent({
  collection: 'blog',        // Target collection
  autoSEO: true,            // Enable automatic SEO
  autoI18nParams: true,     // Enable parameter mapping
  paramMap: {               // Route parameter configuration
    slug: 'slug',
    category: { 
      field: 'categoryStem', 
      collection: 'categories', 
      targetField: 'slug' 
    }
  }
})
```

### useI18nContentParams: URL Parameter Magic

```typescript
// Auto-enabled via useI18nContent({ autoI18nParams: true })
// Resolves route parameters for each locale:

// Input: categoryStem: "technology" 
// Output: { 
//   en: { category: "technology" }, 
//   mr: { category: "tantrajantra" } 
// }

// This enables language switching with correct URLs:
// EN: /blog/technology/ai-revolution
// MR: /blog/tantrajantra/ai-kranti
```

### useI18nContentSEO: Search Engine Optimization

```typescript
// Auto-enabled via useI18nContent({ autoSEO: true })
// Automatically generates:

<html lang="en" dir="ltr">           // Proper language attributes
<link rel="alternate" hreflang="mr" href="/mr/blog/..."> // Translation links
<meta name="description" content="...">                  // Content description
<meta property="og:title" content="...">                 // Social sharing
```

### useI18nFormatters: Locale-Aware Formatting

```typescript
const fmt = useI18nFormatters()

// Currency formatting (respects locale)
fmt.value.currency(2999.99, 'INR') 
// → EN: ₹2,999.99 | MR: ₹२,९९९.९९

// Number formatting
fmt.value.number(12345.67)
// → EN: 12,345.67 | MR: १२,३४५.६७

// Date formatting
fmt.value.date(new Date(), { dateStyle: 'medium' })
// → EN: Jan 15, 2024 | MR: १५ जाने, २०२४

// List formatting with proper conjunctions
fmt.value.list(['React', 'Vue', 'Nuxt'])
// → EN: "React, Vue, and Nuxt" | MR: "React, Vue, आणि Nuxt"
```

---

## Implementation Standards

### File Organization Rules
```
content/
├── en/
│   ├── blog/
│   │   └── ai-revolution.md     ← STEM: "ai-revolution.md"
│   ├── pages/
│   │   └── about.md            ← STEM: "about.md"
│   └── categories/
│       └── technology.md       ← STEM: "technology.md"
└── mr/
    ├── blog/
    │   └── ai-revolution.md     ← Same STEM, different content
    ├── pages/
    │   └── about.md            ← Same STEM, different content
    └── categories/
        └── technology.md       ← Same STEM, different slug
```

### Required Frontmatter
```yaml
---
slug: "unique-url-slug"           # URL identifier
status: "published"              # Visibility gate
categoryStem: "technology"       # For blog posts (optional)
title: "Article Title"
description: "SEO description"
---
```

### Collection Naming Convention
- Collections: `blog_en`, `blog_mr`, `pages_en`, `pages_mr`
- Query by: `queryCollection('blog_en').where('slug', '=', slug)`
- Status filter: Always include `.where('status', '=', 'published')`

---

## Debugging & Troubleshooting

### Debug Mode
Add `?debug` to any URL to see detailed system information:
- Current parameters and their resolution
- Translation discovery status  
- STEM matching results
- SEO tag generation

### Common Issues

**Missing Translations?**
- Check filename STEM matches exactly across locales
- Verify `status: 'published'` in frontmatter
- Ensure collection naming follows convention

**URL Canonicalization Loops?**
- Verify `categorySlug` matches derived category slug
- Check `paramMap` configuration for collection-backed parameters

**Language Switching Broken?**
- Confirm `autoI18nParams: true` is enabled
- Verify translation parameters are resolving correctly

---

## Performance Considerations

### Caching Strategy
- Content cached per `(collection, locale, slug)` key
- Translation lookups happen in background
- Parameter resolution cached per locale

### Optimization Tips
- Use `selectFields` to limit data fetching
- Enable `autoSEO` and `autoI18nParams` for most use cases
- Leverage STEM grouping for batch operations

---

## TL;DR: Quick Integration

**For blog posts with categories:**
```vue
const { content, translations } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
  paramMap: {
    slug: 'slug',
    category: { field: 'categoryStem', collection: 'categories', targetField: 'slug' }
  }
})
```

**For static pages:**
```vue
const { content } = useI18nContent({
  collection: 'pages',
  autoSEO: true,
  autoI18nParams: true,
})
```

**Key principles:**
1. **Identical filenames = automatic translation discovery**
2. **Status gating keeps drafts private**
3. **STEM matching eliminates manual configuration**
4. **Automatic URL localization and canonicalization**
5. **SEO optimization works out of the box**

This system provides powerful multilingual capabilities while maintaining excellent developer experience through convention over configuration.