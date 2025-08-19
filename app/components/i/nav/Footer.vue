<!-- app/components/i/nav/Footer.vue -->
<script setup lang="ts">
import { getSocialLinks, getQuickLinks, getCTAButtons } from '#shared/config/navigation'
import { businessConfig } from '#shared/config/business'

const currentYear = new Date().getFullYear()

const socialLinks = getSocialLinks()
const quickLinks = getQuickLinks()
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
  <footer class="bg-elevated border-t border-default">
    <UContainer>
      <div class="py-8 md:py-12">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Brand & Description -->
          <div class="space-y-4 sm:col-span-2 lg:col-span-1">
            <div class="flex items-center space-x-2">
              <ContentLogo size="md" />
            </div>
            <p class="text-muted max-w-md leading-relaxed">
              {{ businessConfig.business.description }}. {{ businessConfig.business.tagline }}.
            </p>
            <div class="flex space-x-3 pt-2">
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
                <UIcon
                  :name="social.icon"
                  class="size-4"
                />
              </UButton>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-highlighted text-base">
              Quick Links
            </h3>
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

          <!-- Contact Info -->
          <div class="space-y-4">
            <h3 class="font-semibold text-highlighted text-base">
              Get In Touch
            </h3>
            <div class="space-y-4">
              <UButton
                :label="ctaButtons.primary.label"
                color="primary"
                variant="outline"
                size="sm"
                :leading-icon="ctaButtons.primary.icon"
                :to="getCTAUrl(ctaButtons.primary.action)"
                target="_blank"
                class="w-full sm:w-auto"
              />
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
                    {{ businessConfig.business.location.city }}, {{ businessConfig.business.location.state }}, {{ businessConfig.business.location.country }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-default">
          <div
            class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          >
            <p class="text-sm text-muted text-center sm:text-left">
              © 2023-{{ currentYear }} {{ businessConfig.business.legal_name }} All rights reserved.
            </p>
            <p class="text-sm text-muted text-center sm:text-right font-medium">
              Build the future or be left behind.
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
