<!-- components/nav/Banner.vue -->
<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';

const props = defineProps<{
  sticky?: boolean;
}>();

// Fetch offer from collection by ID
const { getOffer } = useContentCache();
const { data: offer } = await getOffer(STAGE_CONFIG.offers.secondary);

const configSource = useRuntimeConfig().public.configSource

const bannerClasses = computed(() => ({
  'sticky top-0 z-50': props.sticky,
  'relative': !props.sticky,
}));
</script>

<template>
  <UBanner
    :id="`${configSource}_${offer.slug}`"
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
      root: 'hover:bg-default bg-primary-950/60 text-muted h-(--ui-banner-height) backdrop-blur-3xl',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
    close
  />
</template>
