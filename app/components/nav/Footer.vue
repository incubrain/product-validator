<!-- components/nav/Footer.vue -->
<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';

const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();

const currentYear = new Date().getFullYear();

const { showFeature } = useSectionVisibility();

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
      center: 'order-2 flex items-center justify-center mt-3 lg:mt-0',
      right:
        'order-3 flex items-center justify-start lg:justify-end lg:flex-1 gap-x-1.5',
    }"
  >
    <template v-if="showFeature('footerFounder')" #left>
      <div class="flex flex-col items-start gap-4">
        <ILogo size="md" />
        <div class="space-y-2">
          <p class="text-muted leading-relaxed font-written text-sm max-w-md">
            {{ configData?.business?.mission }}.
          </p>
        </div>
      </div>
    </template>

    <template v-if="showFeature('footerFounder')" #right>
      <ICardFounder />
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
          <IConvertButton
            :product-id="STAGE_CONFIG.products.secondary"
            location="footer"
            cta-name="funnel"
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
