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
const { content, pending, error, refresh } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
  paramMap: {
    slug: 'slug',
    category: { field: 'categoryStem', collection: 'categories', targetField: 'slug' },
  },
})

useHead(() => ({
  title: content.value?.title
    ? `${content.value.title} | ${categoryParam.value || 'Blog'}`
    : `Blog: ${slugParam.value}`,
}))

// Show debug only in dev or with ?debug
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
            i18n Content System Demo
          </h1>
        </div>
      </template>

      <div class="text-sm text-gray-300 space-y-4">
        <p class="text-base font-medium text-white">
          This page demonstrates our intelligent i18n content system with automatic URL localization and SEO optimization.
        </p>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <h3 class="font-medium text-emerald-400">
              useI18nContent
            </h3>
            <ul class="text-xs space-y-1 text-gray-400">
              <li>• Fetches content by slug for current locale</li>
              <li>• Auto-discovers translations via filename STEM</li>
              <li>• Handles collection-backed params (categories)</li>
              <li>• Canonicalizes URLs based on content metadata</li>
            </ul>
          </div>

          <div class="space-y-2">
            <h3 class="font-medium text-blue-400">
              useI18nContentParams
            </h3>
            <ul class="text-xs space-y-1 text-gray-400">
              <li>• Maps route params to localized equivalents</li>
              <li>• Resolves category slugs from linked collections</li>
              <li>• Enables seamless language switching</li>
              <li>• Maintains URL structure across locales</li>
            </ul>
          </div>

          <div class="space-y-2">
            <h3 class="font-medium text-purple-400">
              useI18nContentSEO
            </h3>
            <ul class="text-xs space-y-1 text-gray-400">
              <li>• Auto-generates hreflang tags</li>
              <li>• Sets proper HTML lang/dir attributes</li>
              <li>• Injects meta descriptions from content</li>
              <li>• Creates OpenGraph tags for sharing</li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-900 p-3 rounded-lg">
          <h4 class="font-medium text-white mb-2">
            Language Switching Flow:
          </h4>
          <p class="text-xs text-gray-300">
            When you switch from English → Marathi: <br>
            <code class="text-emerald-300">/blog/technology/post</code> →
            <code class="text-emerald-300">/mr/blooga/tantrajnaana/poosta</code>
          </p>
          <p class="text-xs text-gray-400 mt-1">
            System automatically resolves category "technology" → "tantrajantra" and post slug via STEM matching
          </p>
        </div>
      </div>
    </UCard>

    <!-- Canonicalization Demo -->
    <UCard class="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-700/30">
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold text-white">✨ Auto-Canonicalization Demo</span>
          <UBadge
            variant="soft"
            size="xs"
            color="success"
          >
            Live Feature
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-sm text-gray-300">
          Our system automatically redirects malformed URLs to canonical ones. Try the wrong category below:
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <h4 class="font-medium text-emerald-400">
              Wrong Category URL
            </h4>
            <div class="bg-gray-900 p-3 rounded text-xs font-mono">
              <span class="text-red-300">/blog/wrong-category/{{ slugParam }}</span>
            </div>
            <NuxtLinkLocale
              :to="`/blog/wrong-category/${slugParam}`"
              class="inline-block"
            >
              <UButton
                size="xs"
                variant="outline"
                color="error"
              >
                Test Wrong URL →
              </UButton>
            </NuxtLinkLocale>
          </div>

          <div class="space-y-2">
            <h4 class="font-medium text-blue-400">
              Canonical Result
            </h4>
            <div class="bg-gray-900 p-3 rounded text-xs font-mono">
              <span class="text-emerald-300">/blog/{{ categoryParam }}/{{ slugParam }}</span>
            </div>
            <p class="text-xs text-gray-400">
              System auto-redirects via 301 redirect for SEO compliance
            </p>
          </div>
        </div>

        <div class="bg-emerald-900/20 border border-emerald-700/30 rounded p-3">
          <div class="flex items-start gap-2">
            <span class="text-emerald-400">🔍</span>
            <div class="text-xs text-emerald-200">
              <strong>SEO Benefit:</strong> Search engines consolidate all link equity to the canonical URL,
              preventing duplicate content penalties while maintaining user accessibility.
            </div>
          </div>
        </div>
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
            {{ categoryParam || 'uncategorised' }}
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
    </article>
  </div>
</template>
