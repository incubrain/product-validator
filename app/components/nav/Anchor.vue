<!-- components/INavAnchor.vue -->
<script setup lang="ts">
import { CONFIG } from '#shared/config/navigation';

interface Props {
  id: SectionAnchor;
}

const props = defineProps<Props>();

const getStickyOffset = (withOffset = true) => {
  const banner =
    CONFIG.banner.enabled && CONFIG.banner.sticky
      ? `${CONFIG.banner.height}+`
      : '';

  const navbar =
    CONFIG.navbar.enabled && CONFIG.navbar.sticky
      ? `${CONFIG.navbar.height}+`
      : '';

  if (!withOffset) {
    return `calc(${banner}${navbar})`;
  }

  return `calc(${banner}${navbar}${CONFIG.anchor.offset})`;
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
