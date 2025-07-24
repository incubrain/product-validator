<!-- components/content/ProseH4.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading :id="props.id" :level="4">
    <slot />
  </LayoutHeading>
  </template>