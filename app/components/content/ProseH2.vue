<!-- components/content/ProseH2.vue -->
<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>

<template>
  <LayoutHeading
    :text="props.id"
    :level="2"
    variant="section"
  >
    <slot />
  </LayoutHeading>
</template>
