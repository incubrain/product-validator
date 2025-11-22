<!-- components/DevTools.vue -->
<script setup lang="ts">
if (!import.meta.dev) {
  throw new Error('DevTools should only be used in development');
}

const { currentStage, hasActiveOverrides } = useDevTools();
</script>

<template>
  <ClientOnly>
    <!-- Stage Indicator -->
    <div
      class="fixed top-1 left-1 z-999 pointer-events-none flex gap-2 items-center"
    >
      <div
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-elevated/90 backdrop-blur-sm shadow-lg border border-default"
      >
        <div class="flex items-center gap-1.5">
          <UIcon
            name="i-lucide-layers"
            class="text-xs"
            :class="hasActiveOverrides ? 'text-warning' : 'text-muted'"
          />
          <span
            class="text-sm font-mono font-medium"
            :class="hasActiveOverrides ? 'text-warning' : 'text-default'"
          >
            {{ currentStage }}
          </span>
        </div>
      </div>
      <div class="text-lg text-center text-muted/60 font-mono">⌘⇧→</div>
    </div>
  </ClientOnly>
</template>