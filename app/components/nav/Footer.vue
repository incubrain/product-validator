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
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t border-default/60 pt-4',
      container:
        'py-8 lg:py-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-x-3',
      top: 'py-8 lg:py-12',
      bottom: 'py-8 lg:py-12 bg-muted border-t',
      left: 'order-1 flex items-center justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0',
      center:
        'order-2 flex flex-col sm:flex-row items-start justify-start lg:items-center lg:justify-center gap-4 mt-6 lg:mt-0 w-full lg:w-auto',
      right:
        'order-3 flex items-center justify-start lg:justify-end lg:flex-1 gap-x-1.5',
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
      class="grid grid-cols-2 gap-8 lg:gap-12"
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
      <CardFounder />
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
