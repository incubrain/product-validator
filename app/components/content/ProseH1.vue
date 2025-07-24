<!-- components/content/ProseH1.vue -->
<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <LayoutHeading :id="props.id" base="h1" variant="hero">
    <slot />
  </LayoutHeading>
  </template>