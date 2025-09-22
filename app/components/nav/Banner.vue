<!-- Banner.vue - FIXED VERSION -->
<script setup lang="ts">
import type { OfferID } from '#shared/config/overview';

const STORAGE_PREFIX = 'validator';

const props = defineProps<{
  offer: OfferID;
}>();

const offer = useFlowOffer(props.offer);

const storageKey = `${STORAGE_PREFIX}_course-support`;
</script>

<template>
  <UBanner
    :id="storageKey"
    icon="i-lucide-heart"
    :title="offer.description"
    :actions="[
      {
        label: `${offer.cta.label} ${offer.price}`,
        to: offer.cta.to,
        target: offer.cta.to?.startsWith('http') ? '_blank' : undefined,
        trailingIcon: offer.cta.icon,
        color: 'secondary',
        size: 'sm',
        variant: 'ghost',
      },
    ]"
    :ui="{
      root: 'bg-default text-muted',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
    close
  />
</template>
