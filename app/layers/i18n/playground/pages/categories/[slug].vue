<!-- playground/pages/categories/[slug].vue - Category Test Page -->
<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const slug = route.params.slug as string

// Fetch category data directly (since IbContentRenderer doesn't handle categories)
const { data: category, pending, error, refresh } = await useLazyAsyncData(
  `category-${slug}`,
  () => queryCollection('categories').where({ slug }).first(),
  { watch: [locale] },
)

// Resolve i18n fields
const resolvedCategory = computed(() => {
  if (!category.value) return null

  const resolved = { ...category.value }

  // Extract current language content
  if (resolved.title?.[locale.value]) {
    resolved.title = resolved.title[locale.value]
  }
  if (resolved.description?.[locale.value]) {
    resolved.description = resolved.description[locale.value]
  }

  return resolved
})

// Set page title
useHead(() => ({
  title: `Category: ${resolvedCategory.value?.title || slug} | i18n Layer Test`,
}))
</script>

<template>
  <div class="space-y-6">
    <!-- Test Header -->
    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h1 class="text-2xl font-bold text-purple-900 mb-2">
        🏷️ Category Content Test
      </h1>
      <p class="text-purple-700">
        Testing category display with i18n fields from slug="{{ slug }}"
      </p>
      <p class="text-sm text-purple-600 mt-2">
        This should load content from <code>content/categories/{{ slug }}.yml</code>
        and extract {{ locale }} language fields.
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="animate-pulse space-y-4"
    >
      <div class="h-12 bg-gray-200 rounded w-16" />
      <div class="h-8 bg-gray-200 rounded w-1/2" />
      <div class="h-4 bg-gray-200 rounded w-3/4" />
    </div>

    <!-- Error State -->
    <UCard
      v-else-if="error"
      class="border-red-200 bg-red-50"
    >
      <template #header>
        <h3 class="text-red-800 font-medium">
          ❌ Category Load Error
        </h3>
      </template>
      <div class="space-y-3">
        <p class="text-red-600 text-sm">
          Failed to load category: {{ error.message }}
        </p>
        <p class="text-xs text-red-500">
          Expected file: content/categories/{{ slug }}.yml
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

    <!-- Empty State -->
    <UCard
      v-else-if="!resolvedCategory"
      class="border-amber-200 bg-amber-50"
    >
      <div class="text-center py-8">
        <h3 class="text-amber-800 font-medium mb-2">
          🏷️ Category Not Found
        </h3>
        <p class="text-amber-700 text-sm">
          No category found for slug "{{ slug }}"
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

    <!-- Category Content -->
    <div
      v-else
      class="space-y-6"
    >
      <!-- Category Header -->
      <div class="flex items-start space-x-4">
        <div
          v-if="resolvedCategory.icon"
          class="p-3 rounded-lg"
          :class="`bg-${resolvedCategory.color || 'gray'}-100`"
        >
          <Icon
            :name="resolvedCategory.icon"
            class="w-8 h-8"
            :class="`text-${resolvedCategory.color || 'gray'}-600`"
          />
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ resolvedCategory.title }}
          </h1>
          <p
            v-if="resolvedCategory.description"
            class="text-lg text-gray-600"
          >
            {{ resolvedCategory.description }}
          </p>
        </div>
      </div>

      <!-- Category Details -->
      <UCard>
        <template #header>
          <h3 class="font-semibold">
            Category Details
          </h3>
        </template>
        <div class="space-y-2 text-sm">
          <p><strong>Slug:</strong> <code class="bg-gray-100 px-2 py-1 rounded">{{ resolvedCategory.slug }}</code></p>
          <p><strong>Icon:</strong> {{ resolvedCategory.icon || 'None' }}</p>
          <p><strong>Color:</strong> {{ resolvedCategory.color || 'Default' }}</p>
          <p><strong>Current Language:</strong> {{ locale.toUpperCase() }}</p>
        </div>
      </UCard>

      <!-- Raw Data (for debugging) -->
      <details class="bg-gray-50 border rounded-lg p-4">
        <summary class="cursor-pointer font-medium text-gray-700">
          🔍 Raw Category Data (Debug)
        </summary>
        <pre class="mt-3 text-xs text-gray-600 overflow-auto">{{ JSON.stringify(category, null, 2) }}</pre>
      </details>
    </div>

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
        Collection: <code class="bg-gray-100 px-2 py-1 rounded">categories</code>
      </div>
    </div>
  </div>
</template>
