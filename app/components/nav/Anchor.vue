<!-- components/INavAnchor.vue -->
<script setup lang="ts">
import { getStickyOffset } from '#shared/config/navigation';

interface Props {
  id: SectionAnchor;
}

const props = defineProps<Props>();

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
