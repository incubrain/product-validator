<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-home',
  },
  {
    label: 'Showcase',
    icon: 'i-lucide-layout-template',
    to: '/showcase',
    children: [
      {
        label: 'Overview',
        to: '/showcase',
        description: 'Template system overview',
        icon: 'i-lucide-eye',
      },
      {
        label: 'Layout Components',
        to: '/showcase/center',
        description: 'Layout system demos',
        icon: 'i-lucide-layout',
      },
      {
        label: 'Grid System',
        to: '/showcase/grid',
        description: 'Grid layout examples',
        icon: 'i-lucide-grid-3x3',
      },
      {
        label: 'Split Layouts',
        to: '/showcase/split',
        description: 'Split section demos',
        icon: 'i-lucide-columns',
      },
      {
        label: 'Stack Layouts',
        to: '/showcase/stack',
        description: 'Vertical stacking demos',
        icon: 'i-lucide-layers',
      },
    ],
  },
])

const isMobileMenuOpen = ref(false)
const { public: config } = useRuntimeConfig()
</script>

<template>
  <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-md border-b border-default">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <ILogo size="md" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex relative w-full">
          <UNavigationMenu
            class="flex flex-grow mx-auto max-w-xl justify-center items-center"
            :items="navigationItems"
            color="neutral"
            content-orientation="horizontal"
          />
        </nav>

        <!-- Desktop CTA + Mobile Menu Button -->
        <div class="flex items-center space-x-4 relative">
          <INavSearch
            variant="button"
            size="sm"
            placeholder="Search..."
            class="hidden sm:block"
          />
          <UButton
            label="Free Consultation"
            color="primary"
            variant="solid"
            size="sm"
            class="hidden md:inline-flex"
            :to="`https://wa.me/${config.whatsappNumber}?text=Hi! I'm interested in AI automation consultation.`"
            target="_blank"
            trailing-icon="i-lucide-external-link"
          />

          <div class="flex items-center space-x-2 sm:hidden">
            <INavSearch
              variant="button"
              size="sm"
              placeholder=""
            />
            <UButton
              variant="ghost"
              color="neutral"
              size="sm"
              square
              aria-label="Open mobile menu"
              @click="isMobileMenuOpen = true"
            >
              <UIcon
                name="i-lucide-menu"
                class="size-4"
              />
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Mobile Navigation Component -->
    <INavMobile
      v-model:open="isMobileMenuOpen"
      :navigation-items="navigationItems"
    />
  </header>
</template>
