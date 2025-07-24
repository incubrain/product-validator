<!-- components/content/ProseH2.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading :id="props.id" base="h2" variant="section">
    <slot />
  </LayoutHeading>
  </template>