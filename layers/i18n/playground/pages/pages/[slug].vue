<!-- playground/pages/pages/[slug].vue - Updated with useI18nContent -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// ✅ Use our new composable
const { content, pending, error, refresh } = useI18nContent({
  collection: 'pages',
  autoSEO: true,
  autoI18nParams: true,
})

// Set page title
useHead(() => ({
  title: content.value?.title ? `${content.value.title} | Pages` : `Page: ${slug}`,
}))
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-gray-800 pb-6">
      <UBadge
        variant="soft"
        color="success"
        size="sm"
        class="mb-4"
      >
        Page Test
      </UBadge>
      <h1 class="text-2xl font-bold text-white mb-2">
        Traditional Page Test
      </h1>
      <p class="text-gray-400">
        Testing <code class="px-2 py-1 bg-gray-800 rounded text-sm">useI18nContent</code>
        with collection="pages" and slug="{{ slug }}"
      </p>
    </div>

    <!-- Language Switcher -->
    <div class="flex justify-between items-center">
      <ILanguageSwitcher
        variant="buttons"
        size="sm"
      />
      <div class="text-sm text-gray-500">
        Collection: <code class="px-2 py-1 bg-gray-800 rounded">pages</code>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-5/6" />
        <USkeleton class="h-4 w-4/6" />
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="'Failed to load page'"
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
      v-else-if="!content"
      color="warning"
      variant="soft"
      :title="'Page not found'"
      :description="`No page found for slug '${slug}' in ${$i18n.locale.toUpperCase()}`"
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

    <!-- Page Content -->
    <article
      v-else
      class="space-y-6"
    >
      <!-- Page Header -->
      <header class="space-y-3">
        <h1 class="text-3xl font-bold text-white">
          {{ content.title }}
        </h1>
        <p
          v-if="content.subtitle"
          class="text-xl text-gray-300"
        >
          {{ content.subtitle }}
        </p>
        <p
          v-if="content.description"
          class="text-gray-400"
        >
          {{ content.description }}
        </p>
      </header>

      <!-- Page Sections -->
      <div
        v-if="content.content"
        class="space-y-6"
      >
        <UCard
          v-for="(sectionContent, sectionKey) in content.content"
          :key="sectionKey"
        >
          <template #header>
            <h2 class="text-xl font-semibold text-white capitalize">
              {{ sectionKey }}
            </h2>
          </template>

          <!-- String content -->
          <div
            v-if="typeof sectionContent === 'string'"
            class="prose prose-invert max-w-none"
          >
            <p>{{ sectionContent }}</p>
          </div>

          <!-- Array content -->
          <div
            v-else-if="Array.isArray(sectionContent)"
            class="space-y-3"
          >
            <UCard
              v-for="(item, index) in sectionContent"
              :key="index"
              class="bg-gray-800"
            >
              {{ typeof item === 'object' ? JSON.stringify(item, null, 2) : item }}
            </UCard>
          </div>

          <!-- Object content -->
          <div
            v-else-if="typeof sectionContent === 'object'"
            class="space-y-2"
          >
            <div
              v-for="(value, key) in sectionContent"
              :key="key"
              class="flex gap-3"
            >
              <span class="font-medium text-gray-300 min-w-24">{{ key }}:</span>
              <span class="text-gray-400">
                {{ typeof value === 'object' ? JSON.stringify(value) : value }}
              </span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Fallback: Raw content -->
      <UCard
        v-else
        class="bg-gray-900"
      >
        <template #header>
          <h3 class="font-medium text-white">
            Raw Page Data
          </h3>
        </template>
        <pre class="text-xs text-gray-300 overflow-auto">{{ JSON.stringify(content, null, 2) }}</pre>
      </UCard>

      <!-- Cross-language Debug -->
      <UCard
        v-if="content.slugs"
        class="bg-gray-900"
      >
        <template #header>
          <span class="text-sm text-gray-400">🔗 Cross-language slugs</span>
        </template>
        <pre class="text-xs text-gray-300">{{ JSON.stringify(content.slugs, null, 2) }}</pre>
      </UCard>
    </article>

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
