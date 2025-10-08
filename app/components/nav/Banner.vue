<!-- Banner.vue - FIXED VERSION -->
<script setup lang="ts">
const props = defineProps<{
  offer: OfferID;
  sticky?: boolean;
}>();

const offer = useFlowOffer(props.offer);

const bannerClasses = computed(() => ({
  'sticky top-0 z-50': props.sticky,
  'relative': !props.sticky,
}));
</script>

<template>
  <UBanner
    :id="`${$config.public.validator.storagePrefix}_${offer.id}`"
    icon="i-lucide-heart"
    :title="offer.description"
    :actions="[
      {
        label: `${offer.cta.label} ${offer.price}/${offer.billingCycle}`,
        to: offer.cta.to,
        target: offer.cta.to?.startsWith('http') ? '_blank' : undefined,
        trailingIcon: offer.cta.icon,
        color: 'secondary',
        size: 'sm',
        variant: 'ghost',
      },
    ]"
    :class="bannerClasses"
    :ui="{
      root: 'bg-default text-muted h-(--ui-banner-height)',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
    close
  />
</template>
