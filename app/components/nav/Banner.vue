<!-- components/nav/Banner.vue -->
<script setup lang="ts">
const props = defineProps<{
  offerId: OfferID;
  sticky?: boolean;
}>();

const offer = useFlowOffer(props.offerId);
const { configSource } = useDevTools();

const bannerClasses = computed(() => ({
  'sticky top-0 z-50': props.sticky,
  'relative': !props.sticky,
}));
</script>

<template>
  <UBanner
    :id="`${configSource}_${offer.id}`"
    icon="i-lucide-heart"
    :title="offer.description"
    :to="offer.cta.to"
    :target="offer.cta.to?.startsWith('http') ? '_blank' : undefined"
    :actions="[
      {
        to: offer.cta.to,
        target: offer.cta.to?.startsWith('http') ? '_blank' : undefined,
        label: offer.cta.label,
        trailingIcon: offer.cta.icon,
        color: 'secondary',
        size: 'sm',
        variant: 'ghost',
      },
    ]"
    :class="bannerClasses"
    :ui="{
      root: 'bg-default hover:bg-primary/10 backdrop-blur-3xl text-muted h-(--ui-banner-height)',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
    close
  />
</template>
