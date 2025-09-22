<!-- components/nav/Footer.vue -->
<script setup lang="ts">

const business = useFlowSection('founder').business;
const currentYear = new Date().getFullYear();

const copyrightYear = computed(() =>
  business.founding_year === currentYear
    ? `${currentYear}`
    : `${business.founding_year} - ${currentYear}`,
);
</script>

<template>
  <UFooter
    :ui="{
      container:
        'border-2 border-dashed rounded-t-lg border-b-0 decoration-dashed md:flex lg:items-start',
      bottom: 'bg-muted border-t ',
      left: 'flex items-center md:items-start justify-start md:justify-start md:flex-1 gap-x-1.5 mt-3 md:mt-0 md:order-1',
      right:
        'md:flex-1 flex items-center justify-start md:justify-end gap-x-1.5 md:order-3',
    }"
  >
    <!-- TOP: Brand + Description + Founder Card -->
    <template #left>
      <div class="flex flex-col items-start gap-4">
        <ILogo size="md" />
        <div class="space-y-2">
          <p class="text-muted leading-relaxed font-written text-sm max-w-md">
            {{ business.description }}. {{ business.tagline }}.
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
          {{ business.legal_name }}
        </p>

        <div class="flex items-center gap-3">
          <IButton offer="direct" location="footer" />
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
