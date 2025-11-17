<!-- components/DevTools.vue -->
<script setup lang="ts">
// Only render in dev mode
if (!import.meta.dev) {
  throw new Error('DevTools should only be used in development');
}

const { validationStage, hasActiveOverrides, envValues } = useDevTools();
</script>

<template>
  <ClientOnly>
    <div
      class="fixed top-1 left-1 z-999 pointer-events-none flex gap-2 items-center justify-center"
    >
      <!-- Stage indicator -->
      <div
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-elevated/90 backdrop-blur-sm shadow-lg border border-default"
      >
        <!-- Current stage -->
        <div class="flex items-center gap-1.5">
          <UIcon
            name="i-heroicons-arrow-path"
            class="text-xs"
            :class="hasActiveOverrides ? 'text-warning' : 'text-muted'"
          />
          <span
            class="text-sm font-mono font-medium"
            :class="hasActiveOverrides ? 'text-warning' : 'text-default'"
          >
            {{ validationStage }}
          </span>
        </div>
      </div>
      <div class="text-lg text-center text-muted/60 font-mono">⌘⇧→</div>
    </div>
  </ClientOnly>
</template>
