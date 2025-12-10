<!-- components/nav/Footer.vue -->
<script setup lang="ts">
import { NAVIGATION } from '#shared/config/navigation';

const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();

const currentYear = new Date().getFullYear();

const copyrightYear = computed(() =>
  configData.value?.business.founding_year === currentYear
    ? `${currentYear}`
    : `${configData.value?.business.founding_year} - ${currentYear}`,
);

const socialLinks = computed(
  () =>
    configData.value?.socials?.map((link) => ({
      label: link.label,
      icon: `i-lucide-${link.platform}`,
      to: link.url,
      target: link.url.startsWith('https') ? '_blank' : '_self',
    })) || [],
);
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t border-default/60',
      container:
        'py-8 lg:py-12 flex flex-col lg:flex-row lg:items-start lg:justify-between  gap-8 lg:gap-12',
      top: 'py-8 lg:py-12',
      bottom: 'py-8 lg:py-12 bg-muted border-t',
      left: 'order-1 flex items-center justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0',
      center:
        'order-2 flex flex-col sm:flex-row items-start justify-start lg:flex-1 lg:items-center lg:justify-center gap-4 mt-6 lg:mt-0 w-full lg:w-auto',
      right:
        'order-3 items-center justify-start lg:justify-end flex flex-col lg:flex-1 gap-4',
    }"
  >
    <template #left>
      <div class="flex flex-col items-start gap-4">
        <Logo size="md" />
        <div class="space-y-2">
          <p class="text-muted leading-relaxed font-written text-sm max-w-md">
            {{ configData?.business?.mission }}.
          </p>
        </div>
      </div>
    </template>

    <div
      v-if="NAVIGATION.footerLinks?.length"
      class="grid grid-cols-2 mx-auto gap-8 lg:gap-12 w-full"
    >
      <div
        v-for="group in NAVIGATION.footerLinks"
        :key="group.label"
        class="flex flex-col gap-4"
      >
        <span class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ group.label }}
        </span>
        <div class="flex flex-col gap-3">
          <UButton
            v-for="link in group.children"
            :key="link.to"
            :to="link.to"
            :label="link.label"
            variant="link"
            color="neutral"
            class="text-sm text-muted hover:text-primary transition-colors p-0 justify-start h-auto"
            :ui="{ base: 'justify-start' }"
          />
        </div>
      </div>
    </div>

    <template #right>
      <div class="flex flex-col gap-4">
        <span class="text-sm font-semibold text-gray-900 dark:text-white"
          >Follow Us</span
        >
        <span class="w-auto lg:justify-end gap-3 flex">
          <UButton
            v-for="social in socialLinks"
            :key="social.label"
            :icon="social.icon"
            color="secondary"
            variant="soft"
            size="md"
            class="rounded-full p-2"
            :to="social.to"
            :target="social.target"
            :aria-label="social.label"
          />
        </span>
      </div>
    </template>

    <template #bottom>
      <UContainer
        class="flex flex-col gap-4 lg:flex-row justify-between w-full items-start lg:items-center"
      >
        <p class="text-sm text-muted whitespace-nowrap">
          © {{ copyrightYear }}
          {{ configData?.business.legal_name }}
        </p>

        <div class="flex items-center gap-3">
          <UButton
            v-if="$config.public.analyticsLink"
            :to="$config.public.analyticsLink"
            external
            target="_blank"
            icon="i-lucide-bar-chart-3"
            variant="ghost"
            size="sm"
            color="neutral"
            aria-label="View Analytics Dashboard"
          />
          <ConvertButton
            cta-type="footer"
            location="footer"
            color="secondary"
            variant="solid"
            class="font-black"
            size="sm"
          />
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
