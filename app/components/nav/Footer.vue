<!-- components/nav/Footer.vue -->
<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';

const founder = useFlowSection('founder');
const currentYear = new Date().getFullYear();

const copyrightYear = computed(() =>
  founder.value.business.founding_year === currentYear
    ? `${currentYear}`
    : `${founder.value.business.founding_year} - ${currentYear}`,
);
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t',
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
    <!-- TOP: Brand + Description + Founder Card -->
    <template #left>
      <div class="flex flex-col items-start gap-4">
        <ILogo size="md" />
        <div class="space-y-2">
          <p class="text-muted leading-relaxed font-written text-sm max-w-md">
            {{ founder.story.mission }}.
          </p>
        </div>
      </div>
    </template>

    <template #right>
      <IFounderCard />
    </template>

    <!-- BOTTOM: Copyright + CTA -->
    <template #bottom>
      <UContainer class="flex justify-between w-full items-center">
        <p class="text-sm text-muted whitespace-nowrap">
          © {{ copyrightYear }}
          {{ founder.business.legal_name }}
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
          <IButtonCTA :offer-id="CONVERSION.secondary" location="footer" />
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
