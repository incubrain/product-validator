<!-- components/nav/Banner.vue -->
<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';

const props = defineProps<{
  sticky?: boolean;
}>();

const { getProduct } = useContentCache();
const { data: product } = await getProduct(STAGE_CONFIG.products.secondary);
const cta = computed(() => product.value?.ctas.funnel);


const configSource = useRuntimeConfig().public.configSource

const bannerClasses = computed(() => ({
  'sticky top-0 z-50': props.sticky,
  'relative': !props.sticky,
}));
</script>

<template>
  <UBanner
    v-if="product && cta"
    icon="i-lucide-heart"
    :title="product.description"
    :to="cta.to"
    :target="cta.to?.startsWith('http') ? '_blank' : undefined"
    :actions="[
      {
        to: cta.to,
        target: cta.to?.startsWith('http') ? '_blank' : undefined,
        label: cta.label,
        trailingIcon: cta.icon,
        color: 'secondary',
        size: 'sm',
        variant: 'ghost',
      },
    ]"
    close
    :class="bannerClasses"
    :ui="{
      root: 'hover:bg-default bg-primary-950/60 text-muted h-(--ui-banner-height) backdrop-blur-3xl',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
  />
</template>
