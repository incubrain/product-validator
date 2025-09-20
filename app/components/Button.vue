<!-- components/Button.vue -->
<script setup lang="ts">
interface Props {
  offer: 'paid' | 'free' | 'social';
  location: string;
  disabled?: boolean;
  showGuarantee?: boolean;
  guaranteePosition?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showGuarantee: false,
  guaranteePosition: 'below',
  class: '',
});

const { executeAction } = useAction();

// Get offers from overview.ts
const offers = useFlowSection('offers');

// Map offer types to actual offers
const selectedOffer = computed(() => {
  switch (props.offer) {
    case 'paid':
      return offers?.[0]; // First offer is paid
    case 'free':
      return offers?.find((o) => o.price === 'Free') || offers?.[1];
    case 'social':
      // For social, we'll use founder info or create a simple YouTube CTA
      return {
        id: 'social',
        name: 'Watch Critiques',
        cta: {
          label: 'Watch Critiques',
          href: 'https://www.youtube.com/@Incubrain',
          icon: 'i-lucide-youtube',
          variant: 'solid',
          color: 'error',
        },
      };
    default:
      return offers?.[0];
  }
});

const handleClick = async () => {
  if (props.disabled) return;
  await executeAction(props.offer, props.location, selectedOffer.value);
};
</script>

<template>
  <div
    :class="
      guaranteePosition === 'right'
        ? 'flex items-center gap-3'
        : 'relative inline-block'
    "
  >
    <UButton
      v-if="selectedOffer"
      :variant="selectedOffer.cta.variant || 'solid'"
      :color="selectedOffer.cta.color || 'primary'"
      :trailing-icon="selectedOffer.cta.icon"
      :to="selectedOffer.cta.href"
      :target="
        selectedOffer.cta.href?.startsWith('http') ? '_blank' : undefined
      "
      :disabled="disabled"
      :class="['justify-between', props.class]"
      @click="handleClick"
    >
      {{ selectedOffer.cta.label }}
    </UButton>

    <!-- Guarantee text -->
    <div
      v-if="showGuarantee && selectedOffer?.guarantee"
      :class="[
        'text-xs text-muted whitespace-nowrap',
        guaranteePosition === 'below'
          ? 'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pointer-events-none'
          : 'flex-shrink-0',
      ]"
    >
      {{ selectedOffer.guarantee }}
    </div>
  </div>
</template>
