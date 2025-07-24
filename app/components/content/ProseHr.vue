<!-- components/content/ProseHr.vue -->
<script setup lang="ts">
import Logo from '~/components/Logo.vue'
</script>

<template>
  <div class="my-section flex items-center justify-center">
    <div class="flex-1 border-t border-muted" />
    <div class="px-6">
      <Logo
        size="sm"
        :show-text="false"
      />
    </div>
    <div class="flex-1 border-t border-muted" />
  </div>
</template>
