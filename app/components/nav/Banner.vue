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
    color="neutral"
    :actions="[
      {
        label: `${offer.cta.label} ${offer.price}`,
        to: offer.cta.href,
        target: offer.cta.href?.startsWith('http') ? '_blank' : undefined,
        trailingIcon: offer.cta.icon,
        color: 'primary',
        size: 'xs',
        variant: 'solid',
      },
    ]"
    :ui="{
      icon: 'size-5 shrink-0 text-error pointer-events-none',
    }"
    close
  />
</template>
