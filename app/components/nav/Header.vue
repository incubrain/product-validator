<!-- app/components/i/nav/Header.vue -->
<script setup lang="ts">
import { getMainNavigation, getCTAButtons } from '#shared/config/navigation'
import { businessConfig } from '#shared/config/business'

const navigationItems = getMainNavigation()
const ctaButtons = getCTAButtons()

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
  <UHeader
    mode="slideover"
    :ui="{
      root: 'bg-muted/80 backdrop-blur-md border-b border-default',
      container: 'h-16',
      body: 'h-full max-h-[calc(100vh-var(--ui-header-height))] overflow-hidden',
    }"
  >
    <template #title>
      <ILogo size="md" />
    </template>

    <UNavigationMenu
      class="flex flex-grow mx-auto max-w-xl justify-center items-center"
      :items="navigationItems"
      color="neutral"
      content-orientation="horizontal"
    />

    <template #right>
      <IThemeSlideover />
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
    </template>

    <template #body>
      <INavMobile :navigation-items="navigationItems" />
    </template>
  </UHeader>
</template>
