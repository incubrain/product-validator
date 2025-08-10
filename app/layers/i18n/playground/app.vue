<!-- playground/app.vue - Updated with Layout -->
<script setup lang="ts">
const { t } = useI18n()
const { formatters } = useI18nEnhanced()

// Sample navigation items
const navigation = computed(() => [
  { name: t('nav.home', 'fallback', {}), to: '/' },
  { name: 'Blog Test', to: '/blog/ai-revolution' },
  { name: 'Category Test', to: '/categories/ai-automation' },
  { name: 'Page Test', to: '/pages/about' },
])
</script>

<template>
  <UApp>
    <!-- Header with Navigation -->
    <header class="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <UContainer>
        <nav class="flex items-center justify-between py-4">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-4">
            <NuxtLinkLocale
              to="/"
              class="text-xl font-bold text-gray-900"
            >
              i18n Layer Test
            </NuxtLinkLocale>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLinkLocale
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="text-gray-600 hover:text-gray-900 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              {{ item.name }}
            </NuxtLinkLocale>
          </div>

          <!-- Language Switcher -->
          <div class="flex items-center space-x-4">
            <ILanguageSwitcher variant="buttons" />
          </div>
        </nav>
      </UContainer>
    </header>

    <!-- Main Content -->
    <main>
      <UContainer class="py-8">
        <NuxtPage />
      </UContainer>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-gray-50 mt-16">
      <UContainer>
        <div class="py-8 text-center text-gray-600">
          <p>i18n Layer Playground - Testing Nuxt Content + i18n Integration</p>
          <p class="text-sm mt-2">
            Current Time: {{ formatters.date(new Date(), { timeStyle: 'medium' }) }}
          </p>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>
