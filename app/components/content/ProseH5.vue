<!-- components/content/ProseH5.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading :id="props.id" :level="5">
    <slot />
  </LayoutHeading>
  </template>