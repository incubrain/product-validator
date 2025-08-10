<!-- playground/pages/blog/[slug].vue - Blog Test Page -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Set page title
useHead({
  title: `Blog: ${slug} | i18n Layer Test`,
})
</script>

<template>
  <div class="space-y-6">
    <!-- Test Header -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h1 class="text-2xl font-bold text-blue-900 mb-2">
        🗞️ Blog Content Test
      </h1>
      <p class="text-blue-700">
        Testing <code class="bg-blue-100 px-2 py-1 rounded">IbContentRenderer</code>
        with collection="blog" and slug="{{ slug }}"
      </p>
      <p class="text-sm text-blue-600 mt-2">
        This should load content from <code>content/en/blog/{{ slug }}.md</code>
        or <code>content/mr/blog/{{ slug }}.md</code> based on current locale.
      </p>
    </div>

    <!-- Content Data Fetcher with Custom Rendering -->
    <IContentFetcher
      collection="blog"
      :auto-seo="true"
    >
      <template #loading>
        <div class="animate-pulse space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4" />
          <div class="h-4 bg-gray-200 rounded w-1/2" />
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded" />
            <div class="h-4 bg-gray-200 rounded w-5/6" />
            <div class="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </template>

      <template #error="{ error, refresh }">
        <UCard class="border-red-200 bg-red-50">
          <template #header>
            <h3 class="text-red-800 font-medium">
              ❌ Blog Content Error
            </h3>
          </template>
          <div class="space-y-3">
            <p class="text-red-600 text-sm">
              Failed to load blog post: {{ error.message }}
            </p>
            <p class="text-xs text-red-500">
              Expected file: content/{{ $i18n.locale }}/blog/{{ slug }}.md
            </p>
            <UButton
              variant="outline"
              size="sm"
              @click="refresh()"
            >
              Try Again
            </UButton>
          </div>
        </UCard>
      </template>

      <template #empty>
        <UCard class="border-amber-200 bg-amber-50">
          <div class="text-center py-8">
            <h3 class="text-amber-800 font-medium mb-2">
              📝 Blog Post Not Found
            </h3>
            <p class="text-amber-700 text-sm">
              No blog post found for slug "{{ slug }}" in {{ $i18n.locale.toUpperCase() }}
            </p>
            <NuxtLinkLocale
              to="/"
              class="inline-block mt-4"
            >
              <UButton
                variant="outline"
                size="sm"
              >
                ← Back to Home
              </UButton>
            </NuxtLinkLocale>
          </div>
        </UCard>
      </template>

      <template #content="{ content, pending, error, refresh }">
        <ContentRenderer :value="content" />

        <!-- Debug info -->
        <details
          v-if="content.slugs"
          class="mt-8 text-xs text-gray-500 not-prose"
        >
          <summary class="cursor-pointer">
            🔗 Cross-language slugs
          </summary>
          <pre class="mt-2 bg-gray-100 p-2 rounded">{{ JSON.stringify(content.slugs, null, 2) }}</pre>
        </details>
      </template>
    </IContentFetcher>

    <!-- Navigation -->
    <div class="flex justify-between items-center pt-6 border-t">
      <NuxtLinkLocale to="/">
        <UButton
          variant="outline"
          size="sm"
        >
          ← Back to Tests
        </UButton>
      </NuxtLinkLocale>

      <div class="text-sm text-gray-500">
        Collection: <code class="bg-gray-100 px-2 py-1 rounded">blog</code>
      </div>
    </div>
  </div>
</template>
