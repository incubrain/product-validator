<!-- components/FeedbackModal.vue -->
<script setup lang="ts">
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <IModalWindowed
    title="Thank you for your interest!"
    description=""
    @close="emit('close')"
  >
    <slot />
  </IModalWindowed>
</template>
