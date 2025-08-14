<!-- components/content/ProseHr.vue -->
<script setup lang="ts">
import ILogo from '~/components/i/Logo.vue'
</script>

<template>
  <div class="my-section flex items-center justify-center">
    <div class="flex-1 border-t border-muted" />
    <div class="px-6">
      <ILogo
        size="sm"
        :show-text="false"
      />
    </div>
    <div class="flex-1 border-t border-muted" />
  </div>
</template>
