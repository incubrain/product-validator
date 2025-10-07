<!-- components/INavAnchor.vue -->
<script setup lang="ts">
import { LAYOUT_CONFIG } from '#shared/config/navigation';

interface Props {
  id: SectionAnchor;
}

const props = defineProps<Props>();

const getStickyOffset = (withOffset = true) => {
  const banner =
    LAYOUT_CONFIG.banner.enabled && LAYOUT_CONFIG.banner.sticky
      ? `${LAYOUT_CONFIG.banner.height}+`
      : '';

  const navbar =
    LAYOUT_CONFIG.navbar.enabled && LAYOUT_CONFIG.navbar.sticky
      ? `${LAYOUT_CONFIG.navbar.height}+`
      : '';

  if (!withOffset) {
    return `calc(${banner}${navbar})`;
  }

  return `calc(${banner}${navbar}${LAYOUT_CONFIG.anchor.offset})`;
};

const anchorOffset = computed(() => {
  return getStickyOffset();
});

const cleanId = computed(() => props.id.replace(/^#/, ''));

onMounted(() => {
  const element = document.getElementById(props.id);
  if (element) {
    element.style.scrollMarginTop = anchorOffset.value;
  }
});
</script>

<template>
  <div
    :id="cleanId"
    :style="{
      scrollMarginTop: anchorOffset,
    }"
    class="anchor-target"
  />
</template>

<style scoped>
.anchor-target {
  position: relative;
  pointer-events: none;
}
</style>
