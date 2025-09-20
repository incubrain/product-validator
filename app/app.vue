<script setup lang="ts">
// Dev shortcuts
if (import.meta.dev && import.meta.client) {
  const { clearAllStorage } = useDevTools();
  const { $exitIntent } = useNuxtApp();
  defineShortcuts({
    meta_shift_r: clearAllStorage,
    meta_shift_e: () => $exitIntent.fire(true), // Manual exit intent trigger for testing
  });
}
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
/* Vue Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 0.01ms !important;
  }

  .page-enter-from,
  .page-leave-to {
    transform: none !important;
  }
}
</style>
