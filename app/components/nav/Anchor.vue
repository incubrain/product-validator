<!-- components/nav/Anchor.vue -->
<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';

interface Props {
  id: SectionAnchor;
}

const props = defineProps<Props>();

const getStickyOffset = () => {
  const banner = CONVERSION.banner?.sticky ? 'var(--ui-banner-height)+' : '';

  const navbar = CONVERSION.navbar?.sticky ? 'var(--ui-header-height)+' : '';

  const offset = '--spacing(12)';

  return `calc(${banner}${navbar}${offset})`;
};

const anchorOffset = getStickyOffset();
const cleanId = computed(() => props.id.replace(/^#/, ''));

onMounted(() => {
  const element = document.getElementById(props.id);
  if (element) {
    element.style.scrollMarginTop = anchorOffset;
  }
});
</script>

<template>
  <div
    :id="cleanId"
    :style="{ scrollMarginTop: anchorOffset }"
    class="anchor-target"
  />
</template>

<style scoped>
.anchor-target {
  position: relative;
  pointer-events: none;
}
</style>
