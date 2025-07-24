<!-- components/content/ProseBlockquote.vue -->
<template>
  <blockquote class="relative my-8 px-6 py-5 rounded-lg bg-gradient-to-r from-secondary/5 to-secondary/10 border-l-4 border-secondary/30">
    <!-- Quote icon - properly spaced, no overlap -->
    <UIcon
      name="i-lucide-quote"
      class="absolute top-4 left-4 size-6 text-secondary/40"
    />

    <!-- Content wrapper with proper left margin for icon -->
    <div class="ml-8">
      <!-- Quote content -->
      <div class="text-lg italic text-highlighted leading-relaxed font-medium">
        <slot />
      </div>
    </div>
  </blockquote>
</template>

  <style scoped>
  @reference "@/assets/css/main.css";

  /* Target attribution lines (starting with —) */
  blockquote :deep(p:last-child) {
    @apply text-sm text-muted not-italic mt-3;
  }

  /* Ensure quote content is prominent */
  blockquote :deep(p:not(:last-child)) {
    @apply text-lg text-highlighted font-medium mb-3;
  }

  /* Remove default margins for cleaner spacing */
  blockquote :deep(p:first-child) {
    @apply mt-0;
  }

  blockquote :deep(p:last-child) {
    @apply mb-0;
  }
  </style>
