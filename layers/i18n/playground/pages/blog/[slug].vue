<!-- playground/pages/blog/[slug].vue - Updated with useI18nContent -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// ✅ Use our new composable
const { content, pending, error, refresh } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true,
})

// Set page title
useHead(() => ({
  title: content.value?.title ? `${content.value.title} | Blog` : `Blog: ${slug}`,
}))

const format = useI18nFormatters()
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-gray-800 pb-6">
      <UBadge
        variant="soft"
        color="primary"
        size="sm"
        class="mb-4"
      >
        Blog Test
      </UBadge>
      <h1 class="text-2xl font-bold text-white mb-2">
        Blog Content Test
      </h1>
      <p class="text-gray-400">
        Testing <code class="px-2 py-1 bg-gray-800 rounded text-sm">useI18nContent</code>
        with collection="blog" and slug="{{ slug }}"
      </p>
    </div>

    <!-- Language Switcher -->
    <div class="flex justify-between items-center">
      <ILanguageSwitcher
        variant="buttons"
        size="sm"
      />
      <div class="text-sm text-gray-500">
        Collection: <code class="px-2 py-1 bg-gray-800 rounded">blog</code>
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
      :title="'Failed to load blog post'"
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
      :title="'Blog post not found'"
      :description="`No blog post found for slug '${slug}' in ${$i18n.locale.toUpperCase()}`"
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

    <!-- Content -->
    <article
      v-else
      class="space-y-6"
    >
      <!-- Article Header -->
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
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <span v-if="content.author">By {{ content.author }}</span>
          <span v-if="content.publishedAt">{{ format.date(content.publishedAt) }}</span>
          <UBadge
            v-if="content.category"
            variant="soft"
            size="sm"
          >
            {{ content.category }}
          </UBadge>
        </div>
      </header>

      <!-- Article Content -->
      <UCard>
        <div
          v-if="content.body"
          class="prose prose-invert max-w-none"
        >
          <ContentRenderer :value="content" />
        </div>
        <div
          v-else
          class="text-gray-400"
        >
          <p>{{ content.excerpt || 'No content available' }}</p>
        </div>
      </UCard>

      <!-- Tags -->
      <div
        v-if="content.tags?.length"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="tag in content.tags"
          :key="tag"
          variant="outline"
          size="sm"
        >
          {{ tag }}
        </UBadge>
      </div>

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
