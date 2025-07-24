<script setup lang="ts">
const { public: config } = useRuntimeConfig()

const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Blog', to: '/blog' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: 'i-lucide-linkedin',
    to: 'https://linkedin.com/company/incubrain',
    target: '_blank',
  },
  {
    label: 'GitHub',
    icon: 'i-lucide-github',
    to: 'https://github.com/incubrain',
    target: '_blank',
  },
  {
    label: 'Twitter',
    icon: 'i-lucide-twitter',
    to: 'https://twitter.com/incubrain',
    target: '_blank',
  },
]
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
              <Logo size="md" />
            </div>
            <p class="text-muted max-w-md leading-relaxed">
              AI automation specialists with space tech expertise. Stop losing money to manual
              processes.
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
                label="WhatsApp"
                color="primary"
                variant="outline"
                size="sm"
                leading-icon="i-lucide-message-circle"
                :to="`https://wa.me/${config.whatsappNumber}?text=Hi! I'm interested in AI automation consultation.`"
                target="_blank"
                class="w-full sm:w-auto"
              />
              <div class="text-sm text-muted space-y-2">
                <p>
                  <a
                    :href="`mailto:${config.contactEmail}`"
                    class="hover:text-primary transition-colors"
                  >
                    {{ config.contactEmail }}
                  </a>
                </p>
                <p>
                  <a
                    href="https://maps.google.com/?q=Pune,Maharashtra,India"
                    target="_blank"
                    class="hover:text-primary transition-colors"
                  >
                    Pune, Maharashtra, India
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
              © 2023-{{ currentYear }} {{ config.companyName || 'Incubrain ltd.' }} All rights
              reserved.
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
