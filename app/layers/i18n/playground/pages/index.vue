<!-- playground/pages/index.vue - Home Page with Tests -->
<script setup lang="ts">
const { t } = useI18n()
const { formatters, switchLocaleWithAnalytics } = useI18nEnhanced()

// Test data
const price = 2999.99
const currentDate = new Date()

// Test collection links
const testLinks = [
  {
    title: 'Blog Post Test',
    description: 'Test IbContentRenderer with blog content',
    to: '/blog/ai-revolution',
    collection: 'blog',
  },
  {
    title: 'Category Test',
    description: 'Test category display with i18n fields',
    to: '/categories/ai-automation',
    collection: 'categories',
  },
  {
    title: 'Traditional Page Test',
    description: 'Test IbContentRenderer with markdown pages',
    to: '/pages/about',
    collection: 'pages',
  },
]
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ t('test.welcome') }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ t('test.description') }}
      </p>
      <div class="flex justify-center space-x-4">
        <ILanguageSwitcher variant="buttons" />
      </div>
    </div>

    <!-- Formatter Tests -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">
          🔧 i18n Enhanced Utilities Test
        </h2>
      </template>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium mb-3">
            Formatters
          </h3>
          <div class="space-y-2 text-sm">
            <p><strong>Currency:</strong> {{ formatters.currency(price, 'INR') }}</p>
            <p><strong>Date:</strong> {{ formatters.date(currentDate) }}</p>
            <p><strong>Number:</strong> {{ formatters.number(12345.67) }}</p>
            <p><strong>Relative Time:</strong> {{ formatters.relativeTime(-1, 'day') }}</p>
            <p><strong>List:</strong> {{ formatters.list(['Apple', 'Banana', 'Orange']) }}</p>
          </div>
        </div>

        <div>
          <h3 class="font-medium mb-3">
            Language Switching
          </h3>
          <div class="space-y-3">
            <UButton
              variant="outline"
              size="sm"
              @click="switchLocaleWithAnalytics('mr')"
            >
              Switch to Marathi
            </UButton>
            <UButton
              variant="outline"
              size="sm"
              @click="switchLocaleWithAnalytics('en')"
            >
              Switch to English
            </UButton>
            <p class="text-sm text-gray-600">
              Check console for analytics events
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Collection Tests -->
    <div>
      <h2 class="text-2xl font-bold mb-6">
        Collection Tests
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <UCard
          v-for="test in testLinks"
          :key="test.to"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">
                {{ test.title }}
              </h3>
              <UBadge variant="outline">
                {{ test.collection }}
              </UBadge>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-gray-600 text-sm">
              {{ test.description }}
            </p>
            <NuxtLinkLocale :to="test.to">
              <UButton
                variant="outline"
                size="sm"
              >
                Test {{ test.collection }}
              </UButton>
            </NuxtLinkLocale>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Language Switcher Variants -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">
          🎛️ Language Switcher Variants
        </h2>
      </template>

      <div class="space-y-6">
        <div>
          <h3 class="font-medium mb-3">
            Buttons
          </h3>
          <ILanguageSwitcher variant="buttons" />
        </div>

        <div>
          <h3 class="font-medium mb-3">
            Dropdown
          </h3>
          <ILanguageSwitcher variant="dropdown" />
        </div>

        <div>
          <h3 class="font-medium mb-3">
            Minimal
          </h3>
          <ILanguageSwitcher variant="minimal" />
        </div>
      </div>
    </UCard>
  </div>
</template>
