<!-- playground/pages/blog/[category]/[slug].vue -->
<script setup lang="ts">
const route = useRoute()

const categoryParam = computed(() => {
  const raw = route.params.category as string | string[] | undefined
  return Array.isArray(raw) ? raw[0] : (raw || '')
})
const slugParam = computed(() => {
  const raw = route.params.slug as string | string[] | undefined
  return Array.isArray(raw) ? raw.join('/') : (raw || '')
})

// Fetch current-locale post by slug (public only), discover translations by filename
const {
  content,
  translations,
  pending,
  error,
  refresh,
} = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
})

// Fallback: derive categorySlug from "category" if the document doesn’t provide one
const deriveSlug = (s?: string) =>
  (s ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const effectiveCategorySlug = computed(() =>
  content.value?.categorySlug || deriveSlug(content.value?.category),
)

// Canonicalize: if URL category != content’s effective category slug → redirect
watchEffect(async () => {
  const c = content.value
  if (!c || !effectiveCategorySlug.value) return
  if (categoryParam.value && categoryParam.value !== effectiveCategorySlug.value) {
    await navigateTo(`/blog/${effectiveCategorySlug.value}/${c.slug}`)
  }
})

useHead(() => ({
  title: content.value?.title
    ? `${content.value.title} | ${effectiveCategorySlug.value || 'Blog'}`
    : `Blog: ${slugParam.value}`,
}))

// Show debug only in dev or with ?debug
const showDebug = computed(() => import.meta.dev || route.query.debug !== undefined)
const fmt = useI18nFormatters()
</script>

<template>
  <div class="space-y-8">
    <!-- Intro / What’s happening -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UBadge
            variant="soft"
            size="xs"
          >
            Blog
          </UBadge>
          <h1 class="text-xl font-semibold text-white">
            Category + Slug Example
          </h1>
        </div>
      </template>

      <div class="text-sm text-gray-300 space-y-3">
        <p>
          This page fetches a blog post by <code>slug</code> for the current locale, discovers translations
          by <strong>filename (STEM)</strong>, and canonicalizes the URL category using the document’s
          <code>categorySlug</code> (or a derived slug from <code>category</code>).
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <h3 class="font-medium text-white">
              Fetch & translations
            </h3>
            <pre class="text-xs bg-gray-900 p-3 rounded overflow-x-auto text-gray-200"><code>const { content, translations } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true
})</code></pre>
          </div>

          <div class="space-y-2">
            <h3 class="font-medium text-white">
              Canonicalization
            </h3>
            <pre class="text-xs bg-gray-900 p-3 rounded overflow-x-auto text-gray-200"><code>const effectiveCategorySlug =
  content.categorySlug || slugify(content.category)

if (route.params.category !== effectiveCategorySlug) {
  navigateTo(`/blog/${effectiveCategorySlug}/${content.slug}`)
}</code></pre>
          </div>
        </div>

        <ul class="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li>Filenames must match across locales (STEM) → reliable translation lookup.</li>
          <li><code>isPublic</code> gates visibility; drafts stay hidden.</li>
          <li>Fetch keys vary by <code>(collection, locale, slug)</code> to avoid stale cache.</li>
          <li>Category is a URL concern; content remains keyed by <code>slug + locale</code>.</li>
        </ul>
      </div>
    </UCard>

    <!-- Loading -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton class="h-8 w-2/3" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-4 w-4/5" />
    </div>

    <!-- Error -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      title="Failed to load blog post"
      :description="String(error?.message || error || 'Unknown error')"
    >
      <template #actions>
        <UButton
          variant="outline"
          size="xs"
          @click="refresh()"
        >
          Retry
        </UButton>
      </template>
    </UAlert>

    <!-- Empty -->
    <UAlert
      v-else-if="!content"
      color="warning"
      variant="soft"
      :title="'Blog post not found'"
      :description="`No blog post for slug '${slugParam}' in ${$i18n.locale.toUpperCase()}`"
    >
      <template #actions>
        <NuxtLinkLocale to="/">
          <UButton
            variant="outline"
            size="xs"
          >
            Back to Home
          </UButton>
        </NuxtLinkLocale>
      </template>
    </UAlert>

    <!-- Content (English-focused for now) -->
    <article
      v-else
      class="space-y-6"
    >
      <header class="space-y-2">
        <div class="flex items-center gap-2">
          <UBadge
            variant="soft"
            size="xs"
          >
            {{ effectiveCategorySlug || 'uncategorised' }}
          </UBadge>
        </div>
        <h2 class="text-3xl font-bold text-white">
          {{ content.title }}
        </h2>
        <p
          v-if="content.subtitle"
          class="text-gray-300"
        >
          {{ content.subtitle }}
        </p>
        <div class="text-sm text-gray-400 flex gap-4">
          <span v-if="content.author">By {{ content.author }}</span>
          <span v-if="content.publishedAt">{{ fmt.date(content.publishedAt) }}</span>
        </div>
      </header>

      <UCard>
        <div
          v-if="content.body"
          class="prose prose-invert max-w-none"
        >
          <!-- Markdown can include supporting code blocks that explain composables usage -->
          <ContentRenderer
            :value="content"
            class="prose"
          />
        </div>
        <div
          v-else
          class="text-gray-400"
        >
          <p>{{ content.excerpt || 'No content available' }}</p>
        </div>
      </UCard>

      <!-- Clean Debug (optional) -->
      <UCard
        v-if="showDebug"
        class="bg-gray-950/60 border-gray-800"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-400">Debug</span>
            <UBadge
              size="xs"
              variant="soft"
            >
              {{ Object.keys(translations || {}).length }} translations
            </UBadge>
          </div>
        </template>
        <div class="grid md:grid-cols-3 gap-3 text-xs text-gray-400">
          <div><strong>URL category:</strong> {{ categoryParam }}</div>
          <div><strong>Derived categorySlug:</strong> {{ effectiveCategorySlug || 'N/A' }}</div>
          <div><strong>Canonical:</strong> {{ categoryParam === effectiveCategorySlug ? 'OK' : 'Will redirect' }}</div>
        </div>
      </UCard>
    </article>
  </div>
</template>
