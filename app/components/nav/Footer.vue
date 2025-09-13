<!-- app/components/i/nav/Footer.vue -->
<script setup lang="ts">
import {
  getSocialLinks,
  getQuickLinks,
  getCTAButtons,
} from '#shared/config/navigation';
import { businessConfig } from '#shared/config/business';

const currentYear = new Date().getFullYear();

const socialLinks = getSocialLinks();
const quickLinks = getQuickLinks();
const ctaButtons = getCTAButtons();

// Generate CTA URL based on action type
const getCTAUrl = (action: string) => {
  switch (action) {
    case 'whatsapp_consultation':
      return `${businessConfig.contact.primary}?text=Hi! I'm interested in AI automation consultation.`;
    case 'template_download':
      return businessConfig.contact.secondary;
    default:
      return businessConfig.contact.primary;
  }
};
</script>

<template>
  <UFooter
    :ui="{
      root: 'bg-default',
      top: 'py-0 lg:py-0 border-t border-default',
      container: 'py-6 lg:py-4 grid grid-cols-1 lg:grid-cols-3 gap-8',
      bottom: 'bg-muted border-t border-default py-6',
    }"
  >
    <template #top>
      <UContainer class="py-8 lg:py-12 rounded-t-lg">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div
            class="flex gap-2 border border-dashed items-center rounded-md border-secondary p-4"
          >
            <div class="space-y-4">
              <ILogo size="md" />
              <div
                class="text-toned max-w-md leading-relaxed font-family-written text-lg"
              >
                {{ businessConfig.business.description }}.
                {{ businessConfig.business.tagline }}.
              </div>
            </div>
            <div class="flex flex-col space-x-3">
              <div>
                <UButton
                  v-for="social in socialLinks"
                  :key="social.label"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  square
                  :to="social.to"
                  :target="social.target"
                  :aria-label="social.label"
                  class="hover:text-primary transition-colors"
                >
                  <UIcon :name="social.icon" class="size-4" />
                </UButton>
              </div>
              <UButton
                :label="`${ctaButtons.primary.label}`"
                color="secondary"
                variant="link"
                :leading-icon="ctaButtons.primary.icon"
                :to="getCTAUrl(ctaButtons.primary.action)"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </template>

    <template #left>
      <!-- Quick Links -->
      <div class="space-y-4">
        <h3 class="font-semibold">Quick Links</h3>
        <nav class="flex flex-col space-y-3">
          <ULink
            v-for="link in quickLinks"
            :key="link.label"
            :to="link.to"
            class="text-muted hover:text-primary transition-colors text-sm"
          >
            {{ link.label }}
          </ULink>
        </nav>
      </div>
    </template>

    <!-- Center slot (default) -->
    <div class="flex gap-4 w-full flex-grow justify-center items-center"></div>

    <template #right>
      <!-- Contact Info -->
      <div class="space-y-4">
        <h3 class="font-semibold">Contact</h3>
        <div class="text-sm text-muted space-y-2">
          <p>
            <a
              :href="`mailto:${businessConfig.contact.email}`"
              class="hover:text-primary transition-colors"
            >
              {{ businessConfig.contact.email }}
            </a>
          </p>
          <p>
            <a
              :href="`https://maps.google.com/?q=${businessConfig.business.location.city},${businessConfig.business.location.state},${businessConfig.business.location.country}`"
              target="_blank"
              class="hover:text-primary transition-colors"
            >
              {{ businessConfig.business.location.city }},
              {{ businessConfig.business.location.state }}
            </a>
          </p>
        </div>
      </div>
    </template>

    <template #bottom>
      <UContainer>
        <div
          class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <p class="text-sm text-muted text-center sm:text-left">
            © 2023-{{ currentYear }}
            {{ businessConfig.business.legal_name.toUpperCase() }}.
          </p>
          <p class="text-sm text-muted text-center sm:text-right font-medium">
            Let's build the future together.
          </p>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
