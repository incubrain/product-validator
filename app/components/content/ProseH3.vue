<!-- components/content/ProseH3.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading :id="props.id" :level="3">
    <slot />
  </LayoutHeading>
  </template>