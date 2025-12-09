<!-- components/nav/Banner.vue -->
<script setup lang="ts">
import NAVIGATION from '#shared/config/navigation';

const props = withDefaults(
  defineProps<{
    sticky?: boolean;
  }>(),
  {
    sticky: true,
  },
);

const cta = NAVIGATION.ctas.banner;

const bannerClasses = computed(() => ({
  'fixed top-0 z-50': props.sticky,
  'relative': !props.sticky,
}));
</script>

<template>
  <UBanner
    v-if="cta"
    :title="cta.label"
    :class="[bannerClasses, $attrs.class]"
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
    :ui="{
      root: 'hover:bg-default bg-primary-950/60 text-muted h-(--ui-banner-height) backdrop-blur-3xl',
      title: 'text-sm text-muted font-medium truncate pl-3',
      icon: 'size-5 shrink-0 text-error pointer-events-none',
      close: 'text-muted hover:bg-muted cursor-pointer',
    }"
  />
</template>
