<!-- app/components/i/nav/Header.vue -->
<script setup lang="ts">
import { getMainNavigation, getCTAButtons } from '#shared/config/navigation'
import { businessConfig } from '#shared/config/business'

const navigationItems = getMainNavigation()
const ctaButtons = getCTAButtons()

const isMobileMenuOpen = ref(false)

// Generate CTA URL based on action type
const getCTAUrl = (action: string) => {
  switch (action) {
    case 'whatsapp_consultation':
      return `${businessConfig.contact.primary}?text=Hi! I'm interested in AI automation consultation.`
    case 'template_download':
      return businessConfig.contact.secondary
    default:
      return businessConfig.contact.primary
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-md border-b border-default">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <ContentLogo size="md" />
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
          <UButton
            :label="ctaButtons.primary.label"
            color="primary"
            variant="solid"
            size="sm"
            class="hidden md:inline-flex font-bold"
            :to="getCTAUrl(ctaButtons.primary.action)"
            target="_blank"
            :trailing-icon="ctaButtons.primary.icon"
          />

          <div class="flex items-center space-x-2 sm:hidden">
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
