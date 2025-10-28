<script setup lang="ts">
const siteConfig = useSiteConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteConfig.name}` : siteConfig.name;
  },
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});

useSeoMeta({
  description: siteConfig.description,
  ogTitle: siteConfig.name,
  ogDescription: siteConfig.description,
  ogImage: `${siteConfig.url}/og-image.png`,
  twitterCard: 'summary_large_image',
});

// Dev shortcuts
if (import.meta.dev && import.meta.client) {
  const { clearAllStorage } = useDevTools();
  const { $exitIntent } = useNuxtApp();
  const { revokeAccess } = useGatedAccess();
  defineShortcuts({
    meta_shift_r: clearAllStorage, // {DX}: cmd+shft+r to clear session/local storage + refresh
    meta_shift_e: () => $exitIntent.fire(true), // {DX}: cmd+shft+e to manually trigger intent trigger for testing
    meta_shift_x: () => revokeAccess,
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
