<!-- components/content/ProseH6.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading
    :id="props.id"
    :level="6"
  >
    <slot />
  </LayoutHeading>
</template>
