<!-- app/components/i/layout/PageColumnsWrapper.vue -->
<script setup lang="ts">
import type { PageColumnsProps } from '@nuxt/ui';
import { pageColumnsWrapperStyles } from '#theme';
import type { PageColumnsWrapperVariants } from '#theme';

interface PageColumnsWrapperProps extends /* @vue-ignore */ PageColumnsProps {
  preset?: PageColumnsWrapperVariants['preset'];
  spacing?: PageColumnsWrapperVariants['spacing'];
}

const props = withDefaults(defineProps<PageColumnsWrapperProps>(), {
  preset: 'default',
  spacing: 'normal',
  as: 'div',
});

defineOptions({ inheritAttrs: false });

// Generate UI overrides based on preset
const ui = useTV(pageColumnsWrapperStyles, props);

// Merge preset styles with any custom class prop
const mergedClass = computed(() => {
  return [ui.value.root(), props.class].filter(Boolean).join(' ');
});
</script>

<template>
  <UPageColumns :as="as" :class="mergedClass" v-bind="$attrs">
    <slot />
  </UPageColumns>
</template>
