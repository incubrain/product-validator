<!-- app/components/section/CTA.vue -->
<script setup lang="ts">
export interface CTAContent {
  title: string;
  subtitle: string;
  features: string[];
  price: string;
  cta?: 'primary' | 'secondary' | 'tertiary'; // References our CTA config
  ctaOverrides?: {
    label?: string;
    target?: string;
    icon?: string;
  };
}

export interface CTAProps {
  content: CTAContent;
}

defineProps<CTAProps>();
</script>

<template>
  <UPageSection :ui="{ container: 'py-16 sm:py-24 lg:py-32' }">
    <UPricingPlan
      orientation="horizontal"
      variant="soft"
      highlight
      :title="content.title"
      :description="content.subtitle"
      :price="content.price"
      :features="content.features"
      :ui="{
        root: 'min-h-[320px] ring-secondary',
        footer: 'items-start lg:items-center',
      }"
    >
      <template #button>
        <IButton action="paid" location="pricing" />
      </template>
    </UPricingPlan>
  </UPageSection>
</template>
