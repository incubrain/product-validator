<!-- playground/pages/categories/[slug].vue - Updated with useI18nContent -->
<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const slug = route.params.slug as string

// ✅ Use direct query for categories (single collection)
const { data: category, pending, error, refresh } = await useLazyAsyncData(
  `category-${slug}`,
  () => queryCollection('categories').where().first(),
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
  title: resolvedCategory.value?.title ? `${resolvedCategory.value.title} | Categories` : `Category: ${slug}`,
}))
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-gray-800 pb-6">
      <UBadge
        variant="soft"
        color="secondary"
        size="sm"
        class="mb-4"
      >
        Category Test
      </UBadge>
      <h1 class="text-2xl font-bold text-white mb-2">
        Category Content Test
      </h1>
      <p class="text-gray-400">
        Testing category display with i18n fields from slug="{{ slug }}"
      </p>
    </div>

    <!-- Language Switcher -->
    <div class="flex justify-between items-center">
      <ILanguageSwitcher
        variant="buttons"
        size="sm"
      />
      <div class="text-sm text-gray-500">
        Collection: <code class="px-2 py-1 bg-gray-800 rounded">categories</code>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton class="h-12 w-16" />
      <USkeleton class="h-8 w-1/2" />
      <USkeleton class="h-4 w-3/4" />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="'Failed to load category'"
      :description="error.message"
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

    <!-- Empty State -->
    <UAlert
      v-else-if="!resolvedCategory"
      color="warning"
      variant="soft"
      :title="'Category not found'"
      :description="`No category found for slug '${slug}'`"
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

    <!-- Category Content -->
    <div
      v-else
      class="space-y-6"
    >
      <!-- Category Header -->
      <UCard>
        <div class="flex items-start gap-4">
          <div
            v-if="resolvedCategory.icon"
            class="p-3 rounded-lg bg-primary-500/10"
          >
            <UIcon
              :name="resolvedCategory.icon"
              class="w-8 h-8 text-primary-400"
            />
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-white mb-2">
              {{ resolvedCategory.title }}
            </h1>
            <p
              v-if="resolvedCategory.description"
              class="text-lg text-gray-300"
            >
              {{ resolvedCategory.description }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- Category Details -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-white">
            Category Details
          </h3>
        </template>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-400">Slug:</span>
              <code class="ml-2 px-2 py-1 bg-gray-800 rounded text-gray-300">
                {{ resolvedCategory.slug }}
              </code>
            </div>
            <div>
              <span class="text-gray-400">Language:</span>
              <span class="ml-2 text-gray-300">{{ $i18n.locale.toUpperCase() }}</span>
            </div>
            <div>
              <span class="text-gray-400">Icon:</span>
              <span class="ml-2 text-gray-300">{{ resolvedCategory.icon || 'None' }}</span>
            </div>
            <div>
              <span class="text-gray-400">Color:</span>
              <span class="ml-2 text-gray-300">{{ resolvedCategory.color || 'Default' }}</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Raw Data (Debug) -->
      <UCard class="bg-gray-900">
        <template #header>
          <span class="text-sm text-gray-400">🔍 Raw Category Data (Debug)</span>
        </template>
        <pre class="text-xs text-gray-300 overflow-auto">{{ JSON.stringify(category, null, 2) }}</pre>
      </UCard>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center pt-6 border-t border-gray-800">
      <NuxtLinkLocale to="/">
        <UButton
          variant="ghost"
          size="sm"
        >
          ← Back to Tests
        </UButton>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
