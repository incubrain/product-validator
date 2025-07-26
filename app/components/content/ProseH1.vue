<!-- components/content/ProseH1.vue -->
<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>

<template>
  <LayoutHeading
    :text="props.id"
    :level="1"
    variant="hero"
  >
    <slot />
  </LayoutHeading>
</template>
