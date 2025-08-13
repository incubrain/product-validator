<!-- playground/app.vue - Updated with Dark Theme Layout -->
<script setup lang="ts">
import { useDebugModal } from '#imports'

const format = useI18nFormatters()
const { locale, locales, setLocale } = useI18n()
const env = useRuntimeConfig().public

const toMap = {
  about: {
    en: '/pages/about',
    mr: '/mr/paane/baddala',
  },
  blog: {
    en: '/blog/technology/post',
    mr: '/mr/blooga/tantrajnaana/poosta',
  },
  data: {
    en: '/data',
    mr: '/mr/mahiti',
  },
}

// Navigation items
const navigation = computed(() => [
  { name: 'nav.home', to: '/' },
  { name: 'nav.blog', to: toMap.blog[locale.value] },
  { name: 'nav.data', to: toMap.data[locale.value] },
  { name: 'nav.page', to: toMap.about[locale.value] },
])

// DEBUG MODAL CONTROLS
const {
  isDebugMode,
  toggleDebugModal,
} = useDebugModal()
</script>

<template>
  <UApp>
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <UContainer>
        <nav class="flex items-center justify-between py-4">
          <!-- Logo/Brand -->
          <NuxtLinkLocale
            to="home"
            class="text-xl font-bold text-white hover:text-primary-400 transition-colors"
          >
            i18n Layer
          </NuxtLinkLocale>

          <!-- Navigation Links (Desktop) -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLinkLocale
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="text-gray-300 hover:text-white transition-colors text-sm"
              active-class="text-primary-400 font-medium"
            >
              {{ $t(item.name) }}
            </NuxtLinkLocale>
          </div>

          <!-- Language Switcher -->
          <div class="flex items-center gap-2">
            <UButton
              v-if="isDebugMode"
              icon="i-lucide-bug"
              label="Debug"
              size="xs"
              variant="ghost"
              color="error"
              @click="() => toggleDebugModal()"
            />
            <ILanguageSwitcher
              variant="minimal"
              size="sm"
              :ui="{ root: 'opacity-70 hover:opacity-100' }"
            />
          </div>
        </nav>
      </UContainer>
    </header>

    <!-- Main Content -->
    <main class="min-h-screen bg-gray-950">
      <UContainer class="py-8">
        <NuxtPage />
      </UContainer>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800 bg-gray-900">
      <UContainer>
        <div class="py-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-center md:text-left">
              <p class="text-gray-300 text-sm">
                i18n Layer Playground
              </p>
              <p class="text-gray-500 text-xs mt-1">
                Testing Nuxt Content + i18n Integration
              </p>
            </div>

            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span>{{ format.date(new Date(), { timeStyle: 'short' }) }}</span>
              <span>•</span>
              <span>{{ $i18n.locale.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>
