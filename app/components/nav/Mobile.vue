<!-- app/components/i/nav/Mobile.vue -->
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { getCTAButtons } from '#shared/config/navigation'
import { businessConfig } from '#shared/config/business'

interface Props {
  navigationItems: NavigationMenuItem[]
}

defineProps<Props>()

const isOpen = defineModel<boolean>('open', { default: false })
const ctaButtons = getCTAButtons()

const closeMenu = () => {
  isOpen.value = false
}

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
  <div class="flex flex-col justify-between h-full">
    <nav class="flex flex-col space-y-1">
      <!-- Main Navigation Items -->
      <template
        v-for="item in navigationItems"
        :key="item.label"
      >
        <!-- Parent Item -->
        <ULink
          :to="item.to"
          class="flex items-center space-x-3 px-3 py-3 rounded-lg text-toned hover:text-primary hover:bg-elevated transition-colors"
          @click="closeMenu"
        >
          <UIcon
            :name="item.icon"
            class="size-4"
          />
          <span class="font-medium">{{ item.label }}</span>
        </ULink>

        <!-- Child Items -->
        <div
          v-if="item.children"
          class="pl-4 space-y-1"
        >
          <ULink
            v-for="child in item.children"
            :key="child.label"
            :to="child.to"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted hover:text-primary hover:bg-elevated transition-colors"
            @click="closeMenu"
          >
            <UIcon
              :name="child.icon || 'i-lucide-circle'"
              class="size-3"
            />
            <span class="text-sm">{{ child.label }}</span>
          </ULink>
        </div>
      </template>
    </nav>

    <div class="space-y-4 text-center">
      <UButton
        :label="ctaButtons.primary.label"
        color="primary"
        variant="solid"
        size="lg"
        block
        :to="getCTAUrl(ctaButtons.primary.action)"
        target="_blank"
        :trailing-icon="ctaButtons.primary.icon"
        @click="closeMenu"
      />

      <div class="text-sm text-dimmed space-y-1">
        <p>{{ businessConfig.business.location.city }}, {{ businessConfig.business.location.state }}</p>
        <p>{{ businessConfig.contact.email }}</p>
      </div>
    </div>
  </div>
</template>
