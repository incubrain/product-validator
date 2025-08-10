<!-- playground/pages/pages/[slug].vue - Traditional Page Test -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Set page title
useHead({
  title: `Page: ${slug} | i18n Layer Test`,
})
</script>

<template>
  <div class="space-y-6">
    <!-- Test Header -->
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h1 class="text-2xl font-bold text-green-900 mb-2">
        📄 Traditional Page Test
      </h1>
      <p class="text-green-700">
        Testing <code class="bg-green-100 px-2 py-1 rounded">IbContentRenderer</code>
        with collection="pages" and slug="{{ slug }}"
      </p>
      <p class="text-sm text-green-600 mt-2">
        This should load content from <code>content/en/pages/{{ slug }}.md</code>
        or <code>content/mr/pages/{{ slug }}.md</code> based on current locale.
      </p>
    </div>

    <!-- Content Data Fetcher for YAML Pages -->
    <IContentFetcher
      collection="pages"
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
              ❌ Page Content Error
            </h3>
          </template>
          <div class="space-y-3">
            <p class="text-red-600 text-sm">
              Failed to load page: {{ error.message }}
            </p>
            <p class="text-xs text-red-500">
              Expected file: content/{{ $i18n.locale }}/pages/{{ slug }}.yml
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
              📄 Page Not Found
            </h3>
            <p class="text-amber-700 text-sm">
              No page found for slug "{{ slug }}" in {{ $i18n.locale.toUpperCase() }}
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
        <div class="yaml-page-content">
          <!-- Page Header -->
          <div
            v-if="content.title"
            class="mb-8"
          >
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              {{ content.title }}
            </h1>
            <p
              v-if="content.subtitle"
              class="text-xl text-gray-600 mb-4"
            >
              {{ content.subtitle }}
            </p>
            <p
              v-if="content.description"
              class="text-gray-700"
            >
              {{ content.description }}
            </p>
          </div>

          <!-- Page Content (from YAML content field) -->
          <div
            v-if="content.content"
            class="space-y-8"
          >
            <div
              v-for="(sectionContent, sectionKey) in content.content"
              :key="sectionKey"
              class="section"
            >
              <h2 class="text-2xl font-semibold mb-4 capitalize">
                {{ sectionKey }}
              </h2>

              <!-- Handle different content types -->
              <div
                v-if="typeof sectionContent === 'string'"
                class="prose"
              >
                {{ sectionContent }}
              </div>

              <div
                v-else-if="Array.isArray(sectionContent)"
                class="space-y-2"
              >
                <div
                  v-for="(item, index) in sectionContent"
                  :key="index"
                  class="p-3 bg-gray-50 rounded"
                >
                  {{ typeof item === 'object' ? JSON.stringify(item) : item }}
                </div>
              </div>

              <div
                v-else-if="typeof sectionContent === 'object'"
                class="bg-gray-50 p-4 rounded"
              >
                <div
                  v-for="(value, key) in sectionContent"
                  :key="key"
                  class="mb-2"
                >
                  <strong class="text-gray-700">{{ key }}:</strong>
                  <span class="ml-2">{{ typeof value === 'object' ? JSON.stringify(value) : value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Fallback: Show raw content if structure is unexpected -->
          <div
            v-else
            class="bg-gray-50 p-4 rounded"
          >
            <h3 class="font-medium mb-2">
              Raw Page Data:
            </h3>
            <pre class="text-xs overflow-auto">{{ JSON.stringify(content, null, 2) }}</pre>
          </div>

          <!-- Debug info -->
          <details
            v-if="content.slugs"
            class="mt-8 text-xs text-gray-500"
          >
            <summary class="cursor-pointer">
              🔗 Cross-language slugs
            </summary>
            <pre class="mt-2 bg-gray-100 p-2 rounded">{{ JSON.stringify(content.slugs, null, 2) }}</pre>
          </details>
        </div>
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
        Collection: <code class="bg-gray-100 px-2 py-1 rounded">pages</code>
      </div>
    </div>
  </div>
</template>
